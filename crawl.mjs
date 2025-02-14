import fs from "fs";
import { spawn } from "child_process";

const outDir = "src/shared/translations/";
const recommendationsFile = "recommended-instances.json";
const instanceStatsFile = "src/shared/instance_stats.ts";
const min_monthly_users = 5;

fs.mkdirSync(outDir, { recursive: true });

// crawl instance stats
try {
  const recommended_instances = JSON.parse(
    fs.readFileSync(recommendationsFile, "utf8"),
  );
  var all_recommended = [];
  for (var k in recommended_instances) {
    if (k != "exclude") {
      all_recommended.push(...recommended_instances[k]);
    }
  }
  // Run Rust crawler with given params. Then pipe output directly into jq, to filter
  // out fields with lots of data which we dont need. This is necessary because otherwise
  // Javascript may crash when loading the crawl output.
  // Filters all instances with closed registrations or those with open registrations
  // (often used by bots). Instances with few active users are also excluded.
  const run = spawn(
    "sh",
    [
      "-c",
      `cargo run --release -- --json --start-instances ${all_recommended} \
      --exclude-instances ${recommended_instances.exclude} | \
      jq 'del(.instance_details[].federated_instances, \
        .instance_details[].site_info.all_languages, \
        .instance_details[].site_info.discussion_languages, \
        .instance_details[].site_info.admins, 
        .instance_details[].site_info.taglines, \
        .instance_details[].site_info.custom_emojis, \
        .instance_details[].site_info.site_view.site.public_key, \
        .instance_details[].site_info.site_view.local_site_rate_limit, \
        .instance_details[].site_info.site_view.local_site.application_question, \
        .instance_details[].site_info.site_view.local_site.legal_information, \
        .instance_details[].site_info.site_view.local_site.slur_filter_regex)' | \
        jq '.instance_details |= map(select(.site_info.site_view.local_site.registration_mode | contains ("RequireApplication")))' | \
        jq '.instance_details |= map(select(.site_info.site_view.counts.users_active_month > ${min_monthly_users}))'`,
    ],
    {
      cwd: "lemmy-stats-crawler",
      encoding: "utf8",
    },
  );
  let savedOutput = "";

  run.stdout.on("data", data => {
    const strData = data.toString();
    process.stdout.write(strData);
    savedOutput += strData;
  });

  run.stderr.on("data", data => {
    const strData = data.toString();
    process.stdout.write(strData);
  });

  run.on("close", _exitCode => {
    var stats = JSON.parse(savedOutput);
    stats.instance_details = stats.instance_details
      // Exclude large instances which represent more than 30% of all active users
      .filter(i => {
        let active_users_percent =
          i.site_info.site_view.counts.users_active_month /
          stats.users_active_month;
        return active_users_percent < 0.3;
      });

    let stats2 = {
      stats: stats,
      recommended: recommended_instances,
    };

    let data = `export const instance_stats = \n `;
    data += JSON.stringify(stats2, null, 2) + ";";
    fs.writeFileSync(instanceStatsFile, data);
  });
  run.await;
} catch (err) {
  console.error(err);
}

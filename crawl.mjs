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
    fs.readFileSync(recommendationsFile, "utf8")
  );
  var all_recommended = [];
  for (var k in recommended_instances) {
    if (k != "exclude") {
      all_recommended.push(...recommended_instances[k]);
    }
  }
  const run = spawn(
    "cargo",
    [
      "run",
      "--",
      "--json",
      "--max-crawl-distance", "0",
      "--start-instances",
      all_recommended,
      "--exclude-instances",
      recommended_instances.exclude,
    ],
    {
      cwd: "lemmy-stats-crawler",
      encoding: "utf8",
    }
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

  run.on("close", exitCode => {
    var stats = JSON.parse(savedOutput);
    // Crawl results from all instances include tons of data which needs to be compiled.
    // If it is too much data it breaks the build, so we need to exclude as much as possible.
    stats.instance_details = stats.instance_details
    // Exclude instances with closed registration
    .filter(
      i =>
        i.site_info.site_view.local_site.registration_mode != "closed"
    )
    // Exclude instances with few active users
    .filter(
      i =>
        i.site_info.site_view.counts.users_active_month >
        min_monthly_users
    );
    // Exclude unnecessary data
    stats.instance_details.forEach(i => {
      delete i.site_info.admins;
      delete i.site_info.all_languages;
      delete i.site_info.discussion_languages;
      delete i.site_info.taglines;
      delete i.site_info.custom_emojis;
      delete i.federated_instances;
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

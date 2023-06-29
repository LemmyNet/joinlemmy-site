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
    stats = stats.instance_details
    .filter(
      i =>
        i.site_info.site_view.local_site.registration_mode != "closed"
    )
    .filter(
      i =>
        i.site_info.site_view.counts.users_active_month >
        min_monthly_users
    );

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

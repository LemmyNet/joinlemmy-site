import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { spawnSync } from 'child_process';

const outDir = "src/shared/translations/";
const recommendationsFile = "recommended-instances.json";
const instanceStatsFile = "src/shared/instance_stats.ts";

fs.mkdirSync(outDir, { recursive: true });

// crawl instance stats
try {
  const recommended_instances = JSON.parse(fs.readFileSync(recommendationsFile, "utf8"));
  var all_recommended = [];
  for (var k in recommended_instances) {
    if (k != "exclude") {
    all_recommended.push(...recommended_instances[k]);
    }
  }
  const run = spawnSync("cargo", 
  ["run", "--", "--start-instances", all_recommended, "--exclude", recommended_instances.exclude], {
    cwd: "../lemmy-stats-crawler/",
    encoding : 'utf8' 
  });
  //console.log("crawler run output: ", run.output);
  const stats = JSON.parse(run.stdout);

  let stats2 = {
    stats: stats,
    recommended: recommended_instances
  }

  let data = `export const instance_stats = \n `;
  data += JSON.stringify(stats2, null, 2) + ";";
  fs.writeFileSync(instanceStatsFile, data);
} catch (err) {
  console.error(err);
}

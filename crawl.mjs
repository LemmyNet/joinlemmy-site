import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { spawnSync } from "child_process";

const outDir = "src/shared/translations/";
const recommendationsFile = "recommended-instances.json";
const instanceStatsFile = "src/shared/instance_stats.ts";

mkdirSync(outDir, { recursive: true });

// crawl instance stats
try {
  const recommended_instances = JSON.parse(
    readFileSync(recommendationsFile, "utf8"),
  );
  var all_recommended = [];
  for (var k in recommended_instances) {
    if (k != "exclude") {
      all_recommended.push(...recommended_instances[k]);
    }
  }
  // Run the crawler with start instances and blocked instances. The parameter --joinlemmy-output
  // makes it exclude some output data which is not needed here. This is done in Rust because `jq`
  // uses excessive memory and crashes.
  const crawl = spawnSync(
    "sh",
    [
      "-c",
      `cargo run --release -- --start-instances ${all_recommended} --out-path ../crawl-results \
      --exclude-instances ${recommended_instances.exclude}`,
    ],
    {
      cwd: "lemmy-stats-crawler",
      encoding: "utf8",
    },
  );

  if (crawl.stderr) {
    process.stdout.write(crawl.stderr);
  }

  // Convert stats to json to be compiled directly into the code. Not using JSON.parse here as it
  // uses too much memory and crashes.
  spawnSync("gunzip", ["crawl-results/instances/joinlemmy.json.gz"]);
  let crawlOutput = readFileSync("crawl-results/instances/joinlemmy.json");
  let data = `export const instance_stats = {stats: ${crawlOutput}, recommended : ${JSON.stringify(recommended_instances)}};\n `;
  writeFileSync(instanceStatsFile, data);
} catch (err) {
  console.error(err);
}

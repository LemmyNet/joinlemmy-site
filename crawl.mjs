import fs from "fs";
import { spawn } from "child_process";

const outDir = "src/shared/translations/";
const recommendationsFile = "recommended-instances.json";
const instanceStatsFile = "src/shared/instance_stats.ts";

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
  // Run the crawler with start instances and blocked instances. The parameter --joinlemmy-output
  // makes it exclude some output data which is not needed here. This is done in Rust because `jq`
  // uses excessive memory and crashes.
  const run = spawn(
    "sh",
    [
      "-c",
      `cargo run --release -- --joinlemmy-output --start-instances ${all_recommended} \
      --exclude-instances ${recommended_instances.exclude} --max-crawl-distance 0`,
    ],
    {
      cwd: "lemmy-stats-crawler",
      encoding: "utf8",
    },
  );
  let savedOutput = "";

  run.stdout.on("data", data => {
    const strData = data.toString();
    savedOutput += strData;
  });

  run.stderr.on("data", data => {
    const strData = data.toString();
    process.stdout.write(strData);
  });

  run.on("close", _exitCode => {
    // Convert stats to json to be compiled directly into the code. Not using JSON.parse here as it
    // uses too much memory and crashes.
    let data = `export const instance_stats = {stats: ${savedOutput}, recommended : ${JSON.stringify(recommended_instances)}};\n `;
    fs.writeFileSync(instanceStatsFile, data);
  });
  run.await;
} catch (err) {
  console.error(err);
}

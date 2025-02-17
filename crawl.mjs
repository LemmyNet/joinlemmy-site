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
  // Run Rust crawler with given params. Then pipe output directly into jq, to filter
  // out fields with lots of data which we dont need. This is necessary because otherwise
  // Javascript may crash when loading the crawl output.
  // Filters all instances with closed registrations or those with open registrations
  // (often used by bots). Instances with few active users are also excluded.
  const run = spawn(
    "sh",
    [
      "-c",
      `cargo run --release -- --max-crawl-distance 0 --joinlemmy-output --json --start-instances ${all_recommended} \
      --exclude-instances ${recommended_instances.exclude}`,
    ],
    {
      cwd: "lemmy-stats-crawler",
      encoding: "utf8",
    },
  );
  let savedOutput = "";

  run.stdout.on("data", data => {
    const strData = data.toString();
    //process.stdout.write(strData);
    savedOutput += strData;
  });

  run.stderr.on("data", data => {
    const strData = data.toString();
    process.stdout.write(strData);
  });

  run.on("close", _exitCode => {
    let data = `export const instance_stats = {stats: ${savedOutput}, recommended : ${JSON.stringify(recommended_instances)}};\n `;
    fs.writeFileSync(instanceStatsFile, data);
  });
  run.await;
} catch (err) {
  console.error(err);
}

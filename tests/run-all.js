const { spawnSync } = require("node:child_process");
const path = require("node:path");

const tests = ["smoke.test.js", "unit.test.js"];
let failed = false;

for (const file of tests) {
  const fullPath = path.join(__dirname, file);
  const result = spawnSync(process.execPath, [fullPath], { stdio: "inherit" });
  if (result.status !== 0) failed = true;
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("All tests passed.");
}

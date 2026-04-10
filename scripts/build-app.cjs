const { spawnSync } = require("node:child_process");

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env
  });

  return result.status ?? 1;
}

process.exit(run("npx", ["next", "build"]));

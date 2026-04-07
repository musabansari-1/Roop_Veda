const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env
  });

  return result.status ?? 1;
}

function runCapture(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8",
    shell: true,
    env: process.env
  });
}

if (run("npm", ["run", "prisma:prepare"]) !== 0) {
  process.exit(1);
}

const prismaClientPath = path.join(
  __dirname,
  "..",
  "node_modules",
  ".prisma",
  "client",
  "index.js"
);
const clientExists = fs.existsSync(prismaClientPath);
const generateResult = runCapture("npx", ["prisma", "generate"]);

if ((generateResult.status ?? 1) !== 0) {
  const output = `${generateResult.stdout ?? ""}\n${generateResult.stderr ?? ""}`;
  const isWindowsEngineLock =
    clientExists &&
    output.includes("EPERM: operation not permitted, rename") &&
    output.includes("node_modules");

  if (!isWindowsEngineLock) {
    process.stdout.write(generateResult.stdout ?? "");
    process.stderr.write(generateResult.stderr ?? "");
    process.exit(generateResult.status ?? 1);
  }

  console.warn(
    "[build] Prisma generate hit a Windows engine file lock; continuing with the existing generated client."
  );
}

process.stdout.write(generateResult.stdout ?? "");
process.stderr.write(generateResult.stderr ?? "");

process.exit(run("npx", ["next", "build"]));

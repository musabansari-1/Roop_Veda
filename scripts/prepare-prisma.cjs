const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(__dirname, "..", ".env");

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");

  for (const rawLine of envFile.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const provider = (process.env.DATABASE_PROVIDER || "sqlite").toLowerCase();
const allowedProviders = new Set(["sqlite", "postgresql"]);

if (!allowedProviders.has(provider)) {
  console.error(
    `[prisma] Unsupported DATABASE_PROVIDER "${provider}". Use "sqlite" or "postgresql".`
  );
  process.exit(1);
}

const prismaDir = path.join(__dirname, "..", "prisma");
const schemaFileName =
  provider === "postgresql" ? "schema.postgres.prisma" : `schema.${provider}.prisma`;
const sourcePath = path.join(prismaDir, schemaFileName);
const targetPath = path.join(prismaDir, "schema.prisma");

fs.copyFileSync(sourcePath, targetPath);
console.log(`[prisma] Prepared ${path.basename(sourcePath)} -> schema.prisma`);

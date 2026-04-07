const fs = require("node:fs");
const path = require("node:path");

const provider = (process.env.DATABASE_PROVIDER || "sqlite").toLowerCase();
const allowedProviders = new Set(["sqlite", "postgresql"]);

if (!allowedProviders.has(provider)) {
  console.error(
    `[prisma] Unsupported DATABASE_PROVIDER "${provider}". Use "sqlite" or "postgresql".`
  );
  process.exit(1);
}

const prismaDir = path.join(__dirname, "..", "prisma");
const sourcePath = path.join(prismaDir, `schema.${provider}.prisma`);
const targetPath = path.join(prismaDir, "schema.prisma");

fs.copyFileSync(sourcePath, targetPath);
console.log(`[prisma] Prepared ${path.basename(sourcePath)} -> schema.prisma`);

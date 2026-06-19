#!/usr/bin/env node

import { execSync } from "child_process";
import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const appName = process.argv[2];

function printUsage() {
  console.log("\nUsage: npx prasanga-init <AppName>\n");
  console.log("Example:");
  console.log("  npx prasanga-init MyNewApp\n");
}

if (!appName || appName.startsWith("-")) {
  printUsage();
  process.exit(1);
}

if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(appName)) {
  console.error("\n❌ Invalid app name. Use letters, numbers, hyphens, or underscores.\n");
  process.exit(1);
}

const targetDir = resolve(process.cwd(), appName);

if (existsSync(targetDir)) {
  console.error(`\n❌ Folder "${appName}" already exists.\n`);
  process.exit(1);
}

const templateDir = join(__dirname, "template");

if (!existsSync(templateDir)) {
  console.error("\n❌ Template not found in prasanga-init package.\n");
  process.exit(1);
}

console.log(`\n🚀 Creating Prasanga app: ${appName}\n`);

try {
  cpSync(templateDir, targetDir, { recursive: true });

  const pkgPath = join(targetDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.name = appName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  const appJsonPath = join(targetDir, "app.json");
  const appJson = JSON.parse(readFileSync(appJsonPath, "utf8"));
  appJson.expo.name = appName;
  appJson.expo.slug = pkg.name;
  writeFileSync(appJsonPath, `${JSON.stringify(appJson, null, 2)}\n`);

  console.log("📦 Installing dependencies (prasanga-ui + Expo)...\n");
  execSync("npm install --legacy-peer-deps", { cwd: targetDir, stdio: "inherit" });

  console.log("\n✅ Done! Your Prasanga app is ready.\n");
  console.log("Next steps:");
  console.log(`  cd ${appName}`);
  console.log("  npx expo start\n");
  console.log("📚 Docs: https://prasangakit.smmv.shop");
  console.log("📦 UI:   https://www.npmjs.com/package/prasanga-ui\n");
} catch (error) {
  console.error("\n❌ Failed to create app:", error.message || error);
  process.exit(1);
}

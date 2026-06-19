#!/usr/bin/env node
// Dev wrapper — published CLI lives in prasanga-init/cli.js
import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const cli = join(dirname(fileURLToPath(import.meta.url)), "prasanga-init", "cli.js");
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);

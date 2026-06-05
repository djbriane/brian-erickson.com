#!/usr/bin/env node

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const ghostExportPath = join(repoRoot, "specs/refs/brian-erickson.ghost.2026-06-05.json");
const ghostImagesPath = join(repoRoot, "specs/refs/original-site/ghost-images");

if (!existsSync(ghostExportPath)) {
  throw new Error(`Ghost export not found: ${ghostExportPath}`);
}

if (!existsSync(ghostImagesPath)) {
  throw new Error(`Ghost images directory not found: ${ghostImagesPath}`);
}

console.log("Ghost migration script scaffolded. Full migration implementation is the next build slice.");
console.log(`Ghost export: ${ghostExportPath}`);
console.log(`Ghost images: ${ghostImagesPath}`);

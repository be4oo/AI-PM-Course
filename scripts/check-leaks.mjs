#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const termsPath = resolve(".leakcheck-terms");

let rawTerms;
try {
  rawTerms = await readFile(termsPath, "utf8");
} catch (error) {
  if (error.code === "ENOENT") {
    console.warn("Leak check warning: .leakcheck-terms is missing; skipping.");
    process.exit(0);
  }
  throw error;
}

const terms = rawTerms
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));

const staged = spawnSync("git", ["diff", "--cached", "--quiet"]);
if (staged.status !== 0 && staged.status !== 1) {
  console.error("Leak check failed: could not inspect staged changes.");
  process.exit(2);
}

const args = staged.status === 1 ? ["diff", "--cached"] : ["diff", "HEAD"];
const diffResult = spawnSync("git", args, { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
if (diffResult.status !== 0) {
  console.error("Leak check failed: git diff could not be read.");
  process.exit(2);
}

const hits = [];
let currentFile = "unknown";
for (const line of diffResult.stdout.split(/\r?\n/)) {
  if (line.startsWith("+++ b/")) currentFile = line.slice(6);
  if (!line.startsWith("+") || line.startsWith("+++")) continue;
  const lower = line.toLowerCase();
  for (const term of terms) {
    if (lower.includes(term.toLowerCase())) hits.push({ file: currentFile, term });
  }
}

if (hits.length > 0) {
  for (const { file, term } of hits) console.error(`${file}: matched leak term "${term}"`);
  process.exit(1);
}

console.log(`Leak check passed: ${terms.length} term(s), no matches.`);

#!/usr/bin/env node
/* eslint-env node */
import fs from "node:fs";
import path from "node:path";

function readArg(flag, fallback = null) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] || fallback;
}

const manifestPath = readArg("--manifest", "docs/ci/artifact-manifest.json");
const mode = (readArg("--mode", process.env.ARTIFACT_CHECK_MODE || "advisory") || "advisory").toLowerCase();
const isStrict = mode === "strict";

if (!fs.existsSync(manifestPath)) {
  console.error(
    `Artifact verifier setup error: manifest not found at "${manifestPath}". Copy docs/ci/artifact-manifest.example.json to docs/ci/artifact-manifest.json.`
  );
  process.exit(2);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  console.error(`Artifact verifier setup error: invalid JSON in "${manifestPath}".`);
  console.error(String(error.message || error));
  process.exit(2);
}

const weeklyArtifacts = manifest.weeklyArtifacts || {};
const required = [
  { key: "decisionMemo", label: "Decision memo" },
  { key: "workingBuild", label: "Working build" },
  { key: "evalReport", label: "Eval report" },
  { key: "retrospective", label: "Retrospective" },
];

let missingConfig = false;
for (const item of required) {
  if (!weeklyArtifacts[item.key] || !Array.isArray(weeklyArtifacts[item.key].patterns)) {
    console.error(`Config error: weeklyArtifacts.${item.key}.patterns is required.`);
    missingConfig = true;
  }
}
if (missingConfig) process.exit(2);

function listMatches(patterns = []) {
  const results = [];
  for (const rawPattern of patterns) {
    const normalized = rawPattern.replace(/\\/g, "/");
    if (normalized.endsWith("/**")) {
      const dir = normalized.slice(0, -3);
      const absDir = path.resolve(dir);
      if (fs.existsSync(absDir)) {
        const stack = [absDir];
        while (stack.length > 0) {
          const current = stack.pop();
          for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) stack.push(full);
            else results.push(path.relative(process.cwd(), full).replace(/\\/g, "/"));
          }
        }
      }
      continue;
    }

    if (normalized.includes("*")) {
      const prefix = normalized.split("*")[0];
      const absPrefix = path.resolve(prefix || ".");
      const searchRoot = fs.existsSync(absPrefix) && fs.statSync(absPrefix).isDirectory()
        ? absPrefix
        : path.resolve(path.dirname(prefix || "."));
      if (!fs.existsSync(searchRoot)) continue;
      const needle = normalized.replace("*", "");
      const stack = [searchRoot];
      while (stack.length > 0) {
        const current = stack.pop();
        for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
          const full = path.join(current, entry.name);
          if (entry.isDirectory()) stack.push(full);
          else {
            const rel = path.relative(process.cwd(), full).replace(/\\/g, "/");
            if (rel.includes(needle)) results.push(rel);
          }
        }
      }
      continue;
    }

    const absFile = path.resolve(normalized);
    if (fs.existsSync(absFile)) {
      results.push(path.relative(process.cwd(), absFile).replace(/\\/g, "/"));
    }
  }
  return [...new Set(results)];
}

console.log(`Artifact verification mode: ${mode}`);

let failed = false;
for (const item of required) {
  const config = weeklyArtifacts[item.key];
  const minMatches = Number(config.minMatches || 1);
  const matches = listMatches(config.patterns || []);
  const ok = matches.length >= minMatches;
  const level = ok ? "PASS" : isStrict ? "FAIL" : "WARN";
  if (!ok && isStrict) failed = true;

  console.log(`\n[${level}] ${item.label}`);
  console.log(`  Required: >= ${minMatches} match(es)`);
  console.log(`  Patterns: ${(config.patterns || []).join(" | ")}`);
  if (matches.length > 0) {
    console.log(`  Found (${matches.length}):`);
    matches.forEach((m) => console.log(`    - ${m}`));
  } else {
    console.log("  Found (0): none");
  }
}

if (failed) {
  console.error("\nArtifact verification failed in strict mode.");
  process.exit(1);
}

if (isStrict) {
  console.log("\nArtifact verification passed in strict mode.");
} else {
  console.log("\nArtifact verification completed in advisory mode.");
}

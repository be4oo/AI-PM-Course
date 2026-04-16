import fs from "node:fs";
import path from "node:path";
import { loadDotEnv } from "./env-loader.mjs";
import { curriculum } from "../src/data/curriculum.js";
import { getFreshnessBadgeData } from "../src/utils/freshness.js";

loadDotEnv();

const baselinePath = path.resolve("src/data/liveBaseline.js");
const file = fs.readFileSync(baselinePath, "utf8");
const match = file.match(/LIVE_BASELINE_LAST_UPDATED\s*=\s*"(\d{4}-\d{2}-\d{2})"/);

if (!match) {
  console.error("Freshness check failed: LIVE_BASELINE_LAST_UPDATED not found.");
  process.exit(1);
}

const lastUpdated = new Date(`${match[1]}T00:00:00Z`);
const now = new Date();
const days = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
const threshold = Number(process.env.FRESHNESS_SLA_DAYS || 30);

if (days > threshold) {
  console.error(
    `Freshness check failed: baseline is ${days} days old (SLA ${threshold} days). Update src/data/liveBaseline.js`
  );
  process.exit(1);
}

console.log(
  `Freshness check passed: baseline is ${days} days old (SLA ${threshold} days).`
);

const invalidLessons = [];
const missingLessons = [];
const missingBudget = Number(process.env.FRESHNESS_MAX_MISSING_LAST_VERIFIED || 49);

for (const module of curriculum) {
  for (const lesson of module.lessons) {
    const rawMeta = lesson.meta || {};
    const freshness = getFreshnessBadgeData(rawMeta);
    if (freshness.status === "invalid") {
      invalidLessons.push(`${module.module} ${lesson.id} (${lesson.title})`);
    }
    if (rawMeta.lastVerified === undefined || rawMeta.lastVerified === null || rawMeta.lastVerified === "") {
      missingLessons.push(`${module.module} ${lesson.id} (${lesson.title})`);
    }
  }
}

if (invalidLessons.length > 0) {
  console.error(
    `Freshness check failed: invalid lastVerified metadata in ${invalidLessons.length} lesson(s):\n- ${invalidLessons.join("\n- ")}`
  );
  process.exit(1);
}

if (missingLessons.length > missingBudget) {
  console.error(
    `Freshness check failed: missing lastVerified metadata in ${missingLessons.length} lesson(s), budget is ${missingBudget}.\n- ${missingLessons.join("\n- ")}`
  );
  process.exit(1);
}

if (missingLessons.length > 0) {
  console.warn(
    `Freshness warning: ${missingLessons.length} lesson(s) still missing raw lastVerified metadata (budget ${missingBudget}).`
  );
}

console.log("Freshness check passed: lesson-level freshness metadata validated against raw lesson metadata.");

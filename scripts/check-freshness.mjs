import fs from "node:fs";
import path from "node:path";
import { loadDotEnv } from "./env-loader.mjs";

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

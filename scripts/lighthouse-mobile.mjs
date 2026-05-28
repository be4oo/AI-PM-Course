#!/usr/bin/env node
/**
 * Lighthouse mobile-preset audit — asserts LCP < 2.5s on the production build.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md
 *   - SC-007: "LCP under 2.5 seconds under the Lighthouse mobile preset
 *             (Moto G Power emulation, 4× CPU throttle, Slow 4G network)"
 *   - Clarification §4 (2026-05-26): device/network profile pinned to mobile preset
 *
 * Plan reference: specs/001-course-page-redesign/plan.md → research R6.
 *
 * Usage:
 *   npm run perf:lighthouse                  # default: http://localhost:4173/course
 *   npm run perf:lighthouse -- <url>         # custom target
 *   PERF_URL=https://x/y npm run perf:lighthouse
 *
 * Prereq: a server must be serving the production build. Typical local flow:
 *   npm run build && npm run preview &  # vite preview defaults to 4173
 *   npm run perf:lighthouse
 *
 * Dependencies: `lighthouse` and `chrome-launcher` are NOT yet in devDependencies.
 * If they are absent, this script prints an install hint and exits 2 so CI fails
 * loudly rather than silently passing.
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const TARGET_URL =
  process.env.PERF_URL ||
  process.argv[2] ||
  "http://localhost:4173/course";

const LCP_BUDGET_MS = 2500;

const c = {
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
};

async function loadLighthouse() {
  try {
    const lighthouse = (await import("lighthouse")).default;
    const chromeLauncher = await import("chrome-launcher");
    return { lighthouse, chromeLauncher };
  } catch {
    console.error(
      c.yellow("⚠ lighthouse + chrome-launcher are not installed."),
      "\nInstall with: " +
        c.green("npm install --save-dev lighthouse chrome-launcher") +
        "\n\nThis script is a release-readiness gate; it is intentionally non-silent so CI cannot pass it without the real audit.",
    );
    process.exit(2);
  }
}

async function main() {
  const { lighthouse, chromeLauncher } = await loadLighthouse();

  console.log(c.dim("─".repeat(70)));
  console.log(`Lighthouse mobile-preset audit — ${TARGET_URL}`);
  console.log(c.dim("Preset: Moto G Power emulation · 4× CPU throttle · Slow 4G"));
  console.log(c.dim("─".repeat(70)));

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  try {
    const result = await lighthouse(TARGET_URL, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      preset: "mobile", // pins emulation profile per spec Clarification §4
      onlyAudits: [
        "largest-contentful-paint",
        "cumulative-layout-shift",
        "first-contentful-paint",
        "total-blocking-time",
        "speed-index",
      ],
    });

    const audits = result?.lhr?.audits ?? {};
    const lcpMs = audits["largest-contentful-paint"]?.numericValue;

    const fmt = (k, label, unit = "ms") => {
      const v = audits[k]?.numericValue;
      return v == null ? `  ${label.padEnd(28)}  —` : `  ${label.padEnd(28)}  ${v.toFixed(0)} ${unit}`;
    };

    console.log(fmt("largest-contentful-paint", "Largest Contentful Paint"));
    console.log(fmt("first-contentful-paint",   "First Contentful Paint"));
    console.log(fmt("speed-index",              "Speed Index"));
    console.log(fmt("total-blocking-time",      "Total Blocking Time"));
    console.log(fmt("cumulative-layout-shift",  "Cumulative Layout Shift", ""));
    console.log(c.dim("─".repeat(70)));

    if (lcpMs == null) {
      console.error(c.red("✗ Lighthouse did not produce an LCP value."));
      process.exit(1);
    }

    if (lcpMs > LCP_BUDGET_MS) {
      console.error(
        c.red(`✗ LCP ${lcpMs.toFixed(0)}ms exceeds the ${LCP_BUDGET_MS}ms budget (spec SC-007).`),
      );
      process.exit(1);
    }

    console.log(
      c.green(`✓ LCP ${lcpMs.toFixed(0)}ms within ${LCP_BUDGET_MS}ms budget.`),
    );
  } finally {
    await chrome.kill();
  }
}

main().catch((err) => {
  console.error(c.red("✗ lighthouse-mobile.mjs crashed:"), err);
  process.exit(2);
});

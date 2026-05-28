#!/usr/bin/env node
/**
 * Bundle size audit — fails the build if any JS chunk under `dist/assets/`
 * exceeds 500 KB gzipped.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md
 *   - SC-007: "every emitted Vite chunk at under 500 KB gzipped"
 *   - Clarification §1 (2026-05-26): gzipped, per emitted Vite chunk
 *
 * Plan reference: specs/001-course-page-redesign/plan.md → research R6.
 *
 * Run after `vite build`. Wired via `postbuild` in package.json so the CI
 * gate is automatic.
 */

import { readdir, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS_DIR = resolve(REPO_ROOT, "dist", "assets");
const LIMIT_BYTES = 500 * 1024; // 500 KB gzipped, per spec

/** ANSI helpers — kept local to avoid a dependency. */
const c = {
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
};

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** Recursively list every `.js` file under a directory. */
async function listJsFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return out;
    throw err;
  }
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listJsFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = await listJsFiles(ASSETS_DIR);
  if (files.length === 0) {
    console.error(c.red("✗"), `No JS chunks found under ${ASSETS_DIR}. Did 'vite build' run?`);
    process.exit(2);
  }

  const rows = [];
  let worstOverByPercent = 0;
  let anyOver = false;

  for (const file of files) {
    const buf = await readFile(file);
    const gz = gzipSync(buf);
    const over = gz.length > LIMIT_BYTES;
    if (over) {
      anyOver = true;
      worstOverByPercent = Math.max(worstOverByPercent, gz.length / LIMIT_BYTES);
    }
    rows.push({ file: file.replace(REPO_ROOT + "/", ""), raw: buf.length, gz: gz.length, over });
  }

  rows.sort((a, b) => b.gz - a.gz);

  console.log(c.dim("─".repeat(70)));
  console.log(`Bundle audit — gzipped per-chunk budget: ${fmtKb(LIMIT_BYTES)}`);
  console.log(c.dim("─".repeat(70)));
  for (const r of rows) {
    const status = r.over ? c.red("OVER") : c.green("  ok");
    console.log(`  ${status}  ${fmtKb(r.gz).padStart(9)}  ${c.dim("(raw " + fmtKb(r.raw) + ")")}  ${r.file}`);
  }
  console.log(c.dim("─".repeat(70)));

  if (anyOver) {
    const pct = ((worstOverByPercent - 1) * 100).toFixed(1);
    console.error(c.red(`✗ Bundle audit failed: at least one chunk exceeds the ${fmtKb(LIMIT_BYTES)} gzipped budget (worst by +${pct}%).`));
    console.error(c.dim("  See specs/001-course-page-redesign/spec.md §SC-007."));
    process.exit(1);
  }

  console.log(c.green(`✓ All ${rows.length} chunk(s) within budget.`));
}

main().catch((err) => {
  console.error(c.red("✗ check-bundle.mjs crashed:"), err);
  process.exit(2);
});

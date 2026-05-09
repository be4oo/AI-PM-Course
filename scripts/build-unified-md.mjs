#!/usr/bin/env node
// Regenerates docs/UNIFIED_AI_PM_CURRICULUM.md from src/data/curriculum.js.
// Source of truth: src/data/curriculum.js. Run: npm run docs:unified
// CI freshness check: npm run docs:unified:check (fails if regeneration would change the file)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { curriculum } from "../src/data/curriculum.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const TARGET = path.join(REPO_ROOT, "docs", "UNIFIED_AI_PM_CURRICULUM.md");
const SOURCE_REL = "src/data/curriculum.js";

const checkOnly = process.argv.includes("--check");

function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderLesson(lesson) {
  const parts = [];
  parts.push(`### Lesson ${lesson.id} — ${lesson.title}`);
  parts.push("");
  if (lesson.type) parts.push(`*Type:* \`${lesson.type}\``);
  if (lesson.meta?.lastVerified) parts.push(`*Last verified:* ${lesson.meta.lastVerified}`);
  parts.push("");
  parts.push(lesson.content || "");
  if (lesson.quiz?.q) {
    parts.push("");
    parts.push(`**Quiz.** ${lesson.quiz.q}`);
    if (lesson.quiz.a) parts.push(`> ${lesson.quiz.a}`);
  }
  if (lesson.apply) {
    parts.push("");
    parts.push(`**Apply.** ${lesson.apply}`);
  }
  if (Array.isArray(lesson.keys) && lesson.keys.length > 0) {
    parts.push("");
    parts.push("**Key takeaways:**");
    for (const k of lesson.keys) parts.push(`- ${k}`);
  }
  if (lesson.meta) {
    const m = lesson.meta;
    const metaLines = [];
    if (Array.isArray(m.sources) && m.sources.length) metaLines.push(`- *Sources:* ${m.sources.join("; ")}`);
    if (m.artifact) metaLines.push(`- *Artifact:* \`${m.artifact}\``);
    if (Array.isArray(m.failureModes) && m.failureModes.length) {
      metaLines.push(`- *Failure modes:* ${m.failureModes.join("; ")}`);
    }
    if (Array.isArray(m.redTeam) && m.redTeam.length) {
      metaLines.push(`- *Red-team:* ${m.redTeam.join("; ")}`);
    }
    if (metaLines.length) {
      parts.push("");
      parts.push(metaLines.join("\n"));
    }
  }
  return parts.join("\n");
}

function renderModule(mod) {
  const parts = [];
  parts.push(`## ${mod.module} — ${mod.title}`);
  parts.push("");
  if (mod.week) parts.push(`*${mod.week} · Tag: ${mod.tag || "—"}*`);
  parts.push("");
  for (const lesson of mod.lessons || []) {
    parts.push(renderLesson(lesson));
    parts.push("");
    parts.push("---");
    parts.push("");
  }
  return parts.join("\n");
}

function buildToc() {
  const lines = ["## Table of Contents", ""];
  for (const mod of curriculum) {
    const heading = `${mod.module} — ${mod.title}`;
    lines.push(`- [${heading}](#${slug(heading)})`);
    for (const lesson of mod.lessons || []) {
      const sub = `Lesson ${lesson.id} — ${lesson.title}`;
      lines.push(`  - [${sub}](#${slug(sub)})`);
    }
  }
  lines.push("");
  return lines.join("\n");
}

function buildDoc() {
  const totalLessons = curriculum.reduce((n, m) => n + (m.lessons?.length || 0), 0);
  const header = [
    "# UNIFIED AI PM CURRICULUM",
    "",
    `<!-- AUTO-GENERATED FROM ${SOURCE_REL} — DO NOT EDIT BY HAND. Run \`npm run docs:unified\` to regenerate. -->`,
    "",
    `**Source of truth:** \`${SOURCE_REL}\` · **Modules:** ${curriculum.length} · **Lessons:** ${totalLessons}`,
    "",
    "This document is regenerated from the JS curriculum data that drives the GitHub Pages site. If you find a discrepancy, the JS file wins. The companion audit `docs/curriculum-gap-analysis-2026-05-08.md` tracks the rationale for this single-source-of-truth approach.",
    "",
  ].join("\n");

  const body = curriculum.map(renderModule).join("\n");
  return `${header}\n${buildToc()}\n${body}\n`;
}

const generated = buildDoc();

if (checkOnly) {
  if (!fs.existsSync(TARGET)) {
    console.error(`docs:unified:check failed — ${path.relative(REPO_ROOT, TARGET)} does not exist. Run \`npm run docs:unified\`.`);
    process.exit(1);
  }
  const onDisk = fs.readFileSync(TARGET, "utf8");
  if (onDisk !== generated) {
    console.error(
      `docs:unified:check failed — ${path.relative(REPO_ROOT, TARGET)} is stale relative to ${SOURCE_REL}. Run \`npm run docs:unified\` and commit the result.`
    );
    process.exit(1);
  }
  console.log(`docs:unified:check passed — ${path.relative(REPO_ROOT, TARGET)} is in sync with ${SOURCE_REL}.`);
  process.exit(0);
}

fs.writeFileSync(TARGET, generated, "utf8");
const totalLessons = curriculum.reduce((n, m) => n + (m.lessons?.length || 0), 0);
console.log(`docs:unified — wrote ${path.relative(REPO_ROOT, TARGET)} (${curriculum.length} modules, ${totalLessons} lessons).`);

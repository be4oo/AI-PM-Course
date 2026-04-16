import fs from "node:fs";
import path from "node:path";
import { curriculum } from "../src/data/curriculum.js";
import { COURSE_BENCHMARK } from "../src/data/courseContent.js";
import { buildLessonMetadata } from "../src/data/lessonMetadata.js";
import { getFreshnessAuditRows } from "../src/utils/freshness.js";

const reportPath = path.resolve("docs/freshness-report.md");
const now = new Date();

const enrichedCurriculum = curriculum.map((module) => ({
  ...module,
  lessons: module.lessons.map((lesson) => ({
    ...lesson,
    meta: buildLessonMetadata({
      lesson,
      moduleTitle: module.title,
      benchmarkDate: COURSE_BENCHMARK.auditDate,
    }),
  })),
}));

const rows = getFreshnessAuditRows(enrichedCurriculum, now);
const stale = rows.filter((row) => row.status === "stale");
const aging = rows.filter((row) => row.status === "aging");
const unverified = rows.filter((row) => row.status === "unverified");
const invalid = rows.filter((row) => row.status === "invalid");

const lines = [
  "# Freshness Sweep Report",
  "",
  `Generated: ${now.toISOString()}`,
  "",
  `- Total lessons: ${rows.length}`,
  `- Stale: ${stale.length}`,
  `- Aging: ${aging.length}`,
  `- Unverified: ${unverified.length}`,
  `- Invalid date: ${invalid.length}`,
  "",
  "## Attention Needed",
];

const flagged = rows.filter((row) => ["stale", "unverified", "invalid"].includes(row.status));
if (flagged.length === 0) {
  lines.push("", "No lessons currently require freshness remediation.");
} else {
  lines.push("", "| Module | Lesson | Status | Days | Reason |");
  lines.push("|---|---|---|---:|---|");
  for (const row of flagged) {
    lines.push(
      `| ${row.module} | ${row.lessonId} ${row.lessonTitle} | ${row.label} | ${row.daysOld ?? "-"} | ${row.reason} |`
    );
  }
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");

console.log(`Freshness sweep complete: wrote ${reportPath}`);

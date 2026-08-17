/**
 * Derive the right-rail outline from a lesson's content.
 *
 * Spec ref: FR-005 (right rail scroll-tracking outline), FR-007 (outline click
 * smooth-scroll), §Edge Cases ("Right-rail outline on a lesson with no
 * headings: outline shows the lesson title as the single anchor").
 *
 * The lesson's body is a `RichContent` array of blocks. The data shape used
 * across the course is heterogeneous (current legacy curriculum has fields
 * like `apply`, `quiz`, `keyPoints`, …); this function is intentionally
 * permissive — it walks any string-keyed block and pulls heading-like entries.
 *
 * Heuristic for "this is a heading":
 *   1. block.kind === "heading" with `.id` and `.label`/`.text`
 *   2. block.id + block.label (any block that *looks* like a section anchor)
 *   3. for plain objects without kind/id, skip (prose, code, lists, etc.)
 *
 * Returns an empty-but-nonzero outline (the lesson title as the single anchor)
 * when no headings are discovered, per the spec edge case.
 */

import { parseLessonContent } from "./parseLessonContent.js";
import { anchorIdFor } from "./slug.js";

// Re-export so existing importers (`ReadingColumn`, tests) keep working after
// the slug helper moved to its own module to break the import cycle.
export { anchorIdFor };

/**
 * @typedef {Object} OutlineEntry
 * @property {string} id     stable DOM anchor for `getElementById`
 * @property {string} label  human-readable label
 * @property {number} depth  1 for top-level, 2 for sub-sections (best-effort)
 */

/**
 * @param {{ id?: string, title?: string, body?: unknown }} lesson
 * @returns {OutlineEntry[]}
 */
export function outlineFromLesson(lesson, { includeFallback = true } = {}) {
  if (!lesson || typeof lesson !== "object") return [];
  const out = [];

  // Prefer a structured `body`; otherwise derive headings from the legacy
  // markdown `content` string so the right-rail outline + scroll tracking
  // light up for the live (un-normalized) curriculum too.
  const body = Array.isArray(lesson.body)
    ? lesson.body
    : typeof lesson.content === "string"
    ? parseLessonContent(lesson.content)
    : null;
  if (Array.isArray(body)) {
    for (const block of body) {
      const entry = entryFromBlock(block);
      if (entry) out.push(entry);
    }
  }

  // Spec edge case: lesson with no headings still gets one anchor (the title).
  if (includeFallback && out.length === 0 && (lesson.id || lesson.title)) {
    out.push({
      id: anchorIdFor(lesson.id ?? lesson.title),
      label: lesson.title ?? lesson.id ?? "Lesson",
      depth: 1,
    });
  }

  return out;
}

/* ----------------------------------------------------------------------- */

function entryFromBlock(block) {
  if (!block || typeof block !== "object") return null;
  const id = pickString(block.id, block.anchor);
  const label = pickString(block.label, block.heading, block.title, block.text);
  const kind = String(block.kind ?? block.type ?? "").toLowerCase();
  const isHeading = kind === "heading" || kind === "section" || kind === "h2" || kind === "h3";

  if (isHeading && label) {
    return {
      id: id ?? anchorIdFor(label),
      label,
      depth: kind === "h3" ? 2 : 1,
    };
  }
  // Permissive: anything with both an id AND a label is treated as an anchor.
  if (id && label) {
    return { id, label, depth: 1 };
  }
  return null;
}

function pickString(...candidates) {
  for (const c of candidates) {
    if (typeof c === "string" && c.length > 0) return c;
  }
  return null;
}

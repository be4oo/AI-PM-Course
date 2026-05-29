/**
 * parseLessonContent — turn a lesson's markdown `content` string into the
 * RichContent block array the editorial-dark ReadingColumn renders.
 *
 * WHY THIS EXISTS
 * ---------------
 * The live curriculum (`src/data/curriculum.js`) stores each lesson body as a
 * single markdown string, not the structured `body` array the new shell was
 * designed around. The shell's `deriveBodyFromLegacy` shipped as a stopgap
 * that dumped the whole string into ONE prose paragraph — so headings, lists,
 * and tables rendered as raw `**markdown**`. This module finishes that bridge.
 *
 * It is a faithful extraction of the legacy `renderText` parser that the old
 * learn view used (App.jsx), re-expressed as a PURE data transform (no JSX)
 * so the ReadingColumn can apply editorial styling and the outline can read
 * the same headings. Patterns handled — and ONLY these, matching the real
 * curriculum strings:
 *   - standalone `**Bold line**`            → heading (depth 1)
 *   - `**Case study — …**` heading + body   → casestudy callout
 *   - `- ` / `• ` / `N. ` runs             → list (ul / ol)
 *   - `| a | b |` runs                      → table
 *   - a lone `` `code` `` line              → code block
 *   - everything else                       → prose paragraph
 * Inline `**bold**` and `` `code` `` spans are tokenised within prose, list
 * items, and table cells.
 *
 * Pure + framework-free so it is trivially unit-testable.
 */

import { anchorIdFor } from "./slug.js";

/**
 * @typedef {{ text: string, bold?: boolean, code?: boolean }} InlineSpan
 */

/**
 * Tokenise a single line of markdown into inline spans.
 * Handles `**bold**` and `` `code` `` (bold wins on overlap; good enough for
 * the curriculum, which never nests the two).
 *
 * @param {string} line
 * @returns {InlineSpan[]}
 */
export function inlineSpans(line) {
  const spans = [];
  // Split on bold first; odd indices are the bolded captures.
  const boldParts = String(line ?? "").split(/\*\*(.*?)\*\*/g);
  boldParts.forEach((part, i) => {
    if (part === "") return;
    if (i % 2 === 1) {
      spans.push({ text: part, bold: true });
      return;
    }
    // Within a non-bold run, split out inline code spans.
    const codeParts = part.split(/`([^`]+)`/g);
    codeParts.forEach((seg, j) => {
      if (seg === "") return;
      spans.push(j % 2 === 1 ? { text: seg, code: true } : { text: seg });
    });
  });
  return spans.length ? spans : [{ text: String(line ?? "") }];
}

/** Flatten inline spans back to their plain (marker-free) text. */
function plainText(spans) {
  return spans.map((s) => s.text).join("");
}

// A heading is a line that is ENTIRELY one bold run, optionally followed by a
// single trailing colon (the curriculum writes case-study labels as
// `**Case study — …**:`). Returns the inner text, or null if not a heading.
function boldHeadingText(line) {
  const m = line.match(/^\*\*(.+?)\*\*:?$/);
  if (!m) return null;
  if (m[1].includes("**")) return null; // guards against `**a** mid **b**`
  return m[1].trim();
}

function parseTable(buffer) {
  const rows = buffer.map((r) =>
    r
      .split("|")
      .filter((_, i, a) => i > 0 && i < a.length - 1)
      .map((c) => c.trim()),
  );
  if (rows.length === 0) return null;
  const headers = rows[0].map((c) => inlineSpans(c));
  // rows[1] is the `---|---` separator; data starts at index 2.
  const body = rows.slice(2).map((row) => row.map((c) => inlineSpans(c)));
  return { kind: "table", headers, rows: body };
}

/**
 * Parse a markdown content string into editorial-dark RichContent blocks.
 *
 * @param {string} content
 * @returns {Array<object>}
 */
export function parseLessonContent(content) {
  if (typeof content !== "string" || content.trim() === "") return [];

  const lines = content.split("\n");
  const blocks = [];
  let tableBuffer = [];
  let listBuffer = null; // { kind: "ul" | "ol", items: [] }
  let caseStudy = null; // accumulating { kind: "casestudy", label, lines: [] }

  const flushTable = () => {
    if (!tableBuffer.length) return;
    const table = parseTable(tableBuffer);
    if (table) pushBlock(table);
    tableBuffer = [];
  };
  const flushList = () => {
    if (listBuffer && listBuffer.items.length) blocks.push(listBuffer);
    listBuffer = null;
  };
  const flushCaseStudy = () => {
    if (!caseStudy) return;
    blocks.push({
      kind: "casestudy",
      label: caseStudy.label,
      spans: inlineSpans(caseStudy.lines.join(" ").trim()),
    });
    caseStudy = null;
  };
  // Case-study body lines are captured separately, so pushBlock routes prose
  // into the open case study when one is active.
  const pushBlock = (block) => {
    if (caseStudy && block.kind === "prose") {
      caseStudy.lines.push(block._raw ?? "");
      return;
    }
    flushCaseStudy();
    blocks.push(block);
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("|")) {
      flushList();
      tableBuffer.push(line);
      continue;
    }
    flushTable();

    if (line.startsWith("```")) {
      flushList();
      continue;
    }

    const heading = boldHeadingText(line);
    if (heading !== null) {
      flushList();
      const label = heading;
      if (/^case study/i.test(label)) {
        flushCaseStudy();
        caseStudy = { kind: "casestudy", label, lines: [] };
        continue;
      }
      pushBlock({ kind: "heading", id: anchorIdFor(label), label, depth: 1 });
      continue;
    }

    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    const ulMatch = line.match(/^[-•]\s+(.*)$/);
    if (olMatch || ulMatch) {
      const kind = olMatch ? "ol" : "ul";
      const raw = (olMatch ? olMatch[1] : ulMatch[1]).trim();
      if (!listBuffer || listBuffer.kind !== kind) {
        flushList();
        listBuffer = { kind, items: [] };
      }
      const spans = inlineSpans(raw);
      listBuffer.items.push({ text: plainText(spans), spans });
      continue;
    }
    flushList();

    if (line === "" || line === "---") continue;

    if (line.startsWith("`") && line.endsWith("`") && !line.slice(1, -1).includes("`")) {
      pushBlock({ kind: "code", text: line.slice(1, -1) });
      continue;
    }

    const spans = inlineSpans(line);
    pushBlock({ kind: "prose", text: plainText(spans), spans, _raw: line });
  }

  flushTable();
  flushList();
  flushCaseStudy();

  // Strip the internal `_raw` helper before returning.
  return blocks.map((block) => {
    const copy = { ...block };
    delete copy._raw;
    return copy;
  });
}

/**
 * CommandPalette — ⌘K search for lessons + section headings.
 *
 * Spec / plan refs:
 *   - FR-020: search lessons by title and section heading; selecting a
 *             result navigates to that lesson and section.
 *   - FR-027: course audit + source library remain reachable.
 *   - Plan R7: legacy `view:` entries surface ONLY when the query starts
 *             with `>` — this keeps benchmark/audit reachable (Principle I)
 *             without dragging them back into the default search list.
 *
 * Index strategy:
 *   - Lesson entries:  `{ kind: "lesson",  lessonId,            label }`
 *   - Section entries: `{ kind: "section", lessonId, sectionId, label }`
 *   - View entries:    `{ kind: "view",    viewId,              label }` — hidden by default
 *
 * Rendered inside the shared ToolModal (or a host overlay). The palette
 * itself doesn't own a portal — keep the host responsible for mounting.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { outlineFromLesson } from "../lib/outlineFromLesson.js";
import { LEGACY_VIEW_ENTRIES } from "./legacyViewEntries.js";

const MAX_RESULTS = 20;

export function CommandPalette({
  open,
  curriculum = [],
  onPickLesson,
  onPickSection,
  onPickLegacyView,
  onClose,
}) {
  // State derived from props — React's documented pattern for "reset state
  // when a prop changes" is to call setState during render with a guard. This
  // is materially different from setState-in-effect (which the linter
  // correctly flags) because the call happens *during* render, not in an
  // effect body. See react.dev/learn/you-might-not-need-an-effect.
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastOpen, setLastOpen] = useState(open);
  const inputRef = useRef(null);

  // Reset query on every open=true transition.
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) setQuery("");
  }

  // Build the index once per curriculum.
  const index = useMemo(() => buildIndex(curriculum), [curriculum]);

  // Filter on query change.
  const results = useMemo(() => filter(index, query), [index, query]);

  // Clamp activeIndex into the current results range, in render. No setState
  // needed — the clamped value flows straight through.
  const effectiveActiveIndex = activeIndex >= results.length ? 0 : activeIndex;

  // Autofocus the input when opening — focus is a DOM side effect, not state,
  // so an effect is the correct tool here.
  useEffect(() => {
    if (open) {
      queueMicrotask(() => inputRef.current?.focus?.());
    }
  }, [open]);

  if (!open) return null;

  function onKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(() => Math.min(effectiveActiveIndex + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(() => Math.max(0, effectiveActiveIndex - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      pick(results[effectiveActiveIndex]);
    }
  }

  function pick(entry) {
    if (!entry) return;
    if (entry.kind === "lesson")  return onPickLesson?.(entry.lessonId);
    if (entry.kind === "section") return onPickSection?.(entry.lessonId, entry.sectionId);
    if (entry.kind === "view")    return onPickLegacyView?.(entry.viewId);
  }

  return (
    <div role="combobox" aria-haspopup="listbox" aria-expanded={true} aria-label="Search palette" style={paletteStyle}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search lessons · use > for views (audit, sources, …)"
        style={inputStyle}
        data-testid="palette-input"
        aria-autocomplete="list"
        aria-controls="palette-listbox"
      />
      <ul
        id="palette-listbox"
        role="listbox"
        aria-label="Search results"
        style={resultsStyle}
        data-testid="palette-results"
      >
        {results.length === 0 ? (
          <li role="presentation" style={emptyStyle} data-testid="palette-empty">
            No matches. Try a lesson title or section heading.
            Use <code style={inlineCodeStyle}>{">"}</code> to surface course
            views like <code style={inlineCodeStyle}>{">"} audit</code> or <code style={inlineCodeStyle}>{">"} sources</code>.
          </li>
        ) : (
          results.map((entry, i) => {
            const isActive = i === effectiveActiveIndex;
            return (
              <li
                role="option"
                key={entry.id}
                aria-selected={isActive}
                data-testid={`palette-result-${entry.kind}`}
                data-target-id={entry.lessonId ?? entry.viewId}
                data-section-id={entry.sectionId}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pick(entry)}
                style={{
                  ...resultRowStyle,
                  ...(isActive ? resultRowActiveStyle : null),
                }}
              >
                <span style={resultKindStyle}>{kindLabel(entry.kind)}</span>
                <span style={resultLabelStyle}>{entry.label}</span>
                {entry.hint ? <span style={resultHintStyle}>{entry.hint}</span> : null}
              </li>
            );
          })
        )}
      </ul>
      <p style={footerStyle}>
        <kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> to move ·{" "}
        <kbd style={kbdStyle}>Enter</kbd> to select ·{" "}
        <kbd style={kbdStyle}>Esc</kbd> to close — {onClose ? "" : ""}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Index + filter
 * ------------------------------------------------------------------------- */

function buildIndex(curriculum) {
  const entries = [];
  for (const mod of curriculum) {
    for (const lesson of mod.lessons ?? []) {
      entries.push({
        id: `lesson:${lesson.id}`,
        kind: "lesson",
        lessonId: lesson.id,
        label: lesson.title ?? lesson.id,
        hint: mod.name ?? "",
      });
      const sections = outlineFromLesson(lesson);
      for (const sec of sections) {
        entries.push({
          id: `section:${lesson.id}#${sec.id}`,
          kind: "section",
          lessonId: lesson.id,
          sectionId: sec.id,
          label: sec.label,
          hint: lesson.title ?? "",
        });
      }
    }
  }
  return entries;
}

function filter(index, rawQuery) {
  const trimmed = rawQuery?.trim() ?? "";
  const isLegacy = trimmed.startsWith(">");
  const q = (isLegacy ? trimmed.slice(1) : trimmed).trim().toLowerCase();

  if (isLegacy) {
    return rank(LEGACY_VIEW_ENTRIES.map((v) => ({
      id: `view:${v.viewId}`,
      kind: "view",
      viewId: v.viewId,
      label: v.label,
      hint: v.hint,
    })), q).slice(0, MAX_RESULTS);
  }

  if (q.length === 0) {
    return index.slice(0, MAX_RESULTS);
  }
  return rank(index, q).slice(0, MAX_RESULTS);
}

function rank(entries, q) {
  const lc = q.toLowerCase();
  const scored = [];
  for (const e of entries) {
    const label = e.label.toLowerCase();
    const hint = (e.hint ?? "").toLowerCase();
    if (label === lc) scored.push([0, e]);
    else if (label.startsWith(lc)) scored.push([1, e]);
    else if (label.includes(lc)) scored.push([2, e]);
    else if (hint.includes(lc)) scored.push([3, e]);
  }
  scored.sort((a, b) => a[0] - b[0]);
  return scored.map(([, e]) => e);
}

function kindLabel(kind) {
  return kind === "lesson" ? "Lesson"
    : kind === "section" ? "Section"
    : kind === "view"    ? "View"
    : "";
}

/* ---------------------------------------------------------------------------
 * Styles
 * ------------------------------------------------------------------------- */

const paletteStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  fontFamily: "var(--sans)",
  color: "var(--ink)",
  minInlineSize: "min(640px, 100%)",
};

const inputStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink)",
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  padding: "0.65rem 0.85rem",
  inlineSize: "100%",
};

const resultsStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.1rem",
  maxBlockSize: "60vh",
  overflowY: "auto",
};

const resultRowStyle = {
  display: "grid",
  gridTemplateColumns: "5rem 1fr auto",
  gap: "0.75rem",
  alignItems: "baseline",
  padding: "0.45rem 0.6rem",
  borderRadius: "0.2rem",
  cursor: "pointer",
};
const resultRowActiveStyle = {
  background: "rgba(255,255,255,0.04)",
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "calc(0.6rem - 2px)",
};
const resultKindStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};
const resultLabelStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
};
const resultHintStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.78rem",
  color: "var(--ink-dim)",
  textAlign: "end",
};

const emptyStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  color: "var(--ink-dim)",
  padding: "0.5rem 0.6rem",
};
const inlineCodeStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.85rem",
  padding: "0 0.2rem",
  border: "1px solid var(--rule)",
  borderRadius: "0.15rem",
};

const footerStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
  margin: 0,
  marginBlockStart: "0.25rem",
};
const kbdStyle = {
  display: "inline-block",
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  border: "1px solid var(--rule)",
  borderRadius: "0.15rem",
  padding: "0 0.3rem",
};

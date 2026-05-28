/**
 * ProfileModal — cohort stats, bookmarks, recent completions, and
 * hidden-but-reachable links to the legacy benchmark/source surfaces.
 *
 * Spec refs:
 *   - FR-009 #1: "Profile & cohort" is the first item in the account menu
 *   - FR-027: redesign MUST preserve audit + source-library surfaces somewhere
 *     reachable from the app; this modal is one of the two entry points
 *     (the other is the command palette `>` prefix, T061).
 *   - Constitution Principle I (Benchmark Transparency, NON-NEGOTIABLE):
 *     the redesign cannot retire the audit/source surfaces; this modal is
 *     the contract proof that they remain reachable.
 *
 * The modal is render-only. State (cohort label, lessons, progress) flows
 * in from CourseShell. `openLegacyView(viewId)` is the navigation seam back
 * to the legacy view router in App.jsx — the modal closes itself, then
 * calls openLegacyView with one of: "audit", "sources", "cohort",
 * "coverage", "community", "changelog", "live", "templates", "ops",
 * "glossary", "cheatsheets", "tools", "exec", "reviews".
 */

import { useMemo } from "react";

const RECENT_COMPLETIONS_LIMIT = 5;

export function ProfileModal({
  titleId,
  label = "Profile & cohort",
  description,
  cohortLabel,
  curriculum = [],
  completedLessonIds,
  bookmarkedLessonIds,
  onJumpToLesson,
  onOpenLegacyView,
  onClose,
}) {
  const completed = toSet(completedLessonIds);
  const bookmarks = toSet(bookmarkedLessonIds);

  const stats = useMemo(() => computeStats(curriculum, completed), [curriculum, completed]);
  const recent = useMemo(() => recentCompletions(curriculum, completed, RECENT_COMPLETIONS_LIMIT), [curriculum, completed]);
  const bookmarkedLessons = useMemo(() => flattenBookmarks(curriculum, bookmarks), [curriculum, bookmarks]);

  function jumpAndClose(lessonId) {
    onJumpToLesson?.(lessonId);
    onClose?.();
  }

  function openLegacy(viewId) {
    onOpenLegacyView?.(viewId);
    onClose?.();
  }

  return (
    <div>
      <h2 id={titleId} style={titleStyle}>{label}</h2>
      {cohortLabel ? <p style={cohortStyle} data-testid="profile-cohort">{cohortLabel}</p> : null}
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <section aria-label="Stats" style={statsRowStyle} data-testid="profile-stats">
        <Stat label="Lessons complete" value={`${stats.done} / ${stats.total}`} />
        <Stat label="Modules touched" value={`${stats.modulesTouched} / ${stats.modulesTotal}`} />
        <Stat label="Bookmarks" value={bookmarkedLessons.length} />
      </section>

      <Group label="Recent completions" testid="profile-recent">
        {recent.length === 0 ? (
          <p style={emptyHintStyle}>No completions yet — finish a lesson to populate this list.</p>
        ) : (
          <ul style={lessonListStyle}>
            {recent.map((lesson) => (
              <li key={lesson.id}>
                <LessonRow lesson={lesson} onSelect={() => jumpAndClose(lesson.id)} />
              </li>
            ))}
          </ul>
        )}
      </Group>

      <Group label="Bookmarks" testid="profile-bookmarks">
        {bookmarkedLessons.length === 0 ? (
          <p style={emptyHintStyle}>No bookmarks yet — press <kbd style={kbdStyle}>b</kbd> on any lesson.</p>
        ) : (
          <ul style={lessonListStyle}>
            {bookmarkedLessons.map((lesson) => (
              <li key={lesson.id}>
                <LessonRow lesson={lesson} onSelect={() => jumpAndClose(lesson.id)} />
              </li>
            ))}
          </ul>
        )}
      </Group>

      {/* FR-027 + Constitution Principle I: audit + sources reachable from
          here even though they are intentionally absent from the learner
          sidebar (FR-002). Per Plan R7, the command palette `>` prefix is
          the second entry point. */}
      <Group label="Benchmark & sources" testid="profile-benchmark">
        <p style={emptyHintStyle}>
          The course audit and source library remain available — they sit
          behind these entries so they don't clutter the reading surface.
        </p>
        <div style={legacyLinkRowStyle}>
          <button
            type="button"
            onClick={() => openLegacy("audit")}
            style={legacyLinkStyle}
            data-testid="profile-legacy-audit"
          >
            → Course audit
          </button>
          <button
            type="button"
            onClick={() => openLegacy("sources")}
            style={legacyLinkStyle}
            data-testid="profile-legacy-sources"
          >
            → Source library
          </button>
          <button
            type="button"
            onClick={() => openLegacy("changelog")}
            style={legacyLinkStyle}
            data-testid="profile-legacy-changelog"
          >
            → Changelog
          </button>
        </div>
      </Group>

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="profile-close">
          Close
        </button>
      </div>
    </div>
  );
}

/* ===========================================================================
 * Subcomponents + helpers
 * ========================================================================= */

function Stat({ label, value }) {
  return (
    <div style={statBlockStyle}>
      <p style={statValueStyle}>{value}</p>
      <p style={statLabelStyle}>{label}</p>
    </div>
  );
}

function Group({ label, testid, children }) {
  return (
    <section style={groupStyle} data-testid={testid}>
      <p style={groupLabelStyle}>{label}</p>
      {children}
    </section>
  );
}

function LessonRow({ lesson, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-testid="profile-lesson-link"
      data-lesson-id={lesson.id}
      style={lessonRowStyle}
    >
      <span style={lessonModuleStyle}>{lesson.moduleName}</span>
      <span style={lessonTitleStyle}>{lesson.title ?? lesson.id}</span>
    </button>
  );
}

function toSet(value) {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value);
  return new Set();
}

function computeStats(curriculum, completed) {
  let total = 0;
  let done = 0;
  let modulesTouched = 0;
  for (const mod of curriculum) {
    let moduleHadDone = false;
    for (const lesson of mod.lessons ?? []) {
      total += 1;
      if (completed.has(lesson.id)) {
        done += 1;
        moduleHadDone = true;
      }
    }
    if (moduleHadDone) modulesTouched += 1;
  }
  return { total, done, modulesTouched, modulesTotal: curriculum.length };
}

function recentCompletions(curriculum, completed, limit) {
  // The legacy app does not record per-lesson completion timestamps in a
  // form available to this modal; "recent" here is "completed lessons in
  // reverse curriculum order" (a stable proxy until lessonCompletedAt is
  // surfaced through CourseShell). Cap at `limit`.
  const out = [];
  for (let m = curriculum.length - 1; m >= 0 && out.length < limit; m--) {
    const mod = curriculum[m];
    const lessons = mod.lessons ?? [];
    for (let l = lessons.length - 1; l >= 0 && out.length < limit; l--) {
      if (completed.has(lessons[l].id)) {
        out.push({ ...lessons[l], moduleName: mod.name ?? `Module ${m + 1}` });
      }
    }
  }
  return out;
}

function flattenBookmarks(curriculum, bookmarks) {
  const out = [];
  for (const mod of curriculum) {
    for (const lesson of mod.lessons ?? []) {
      if (bookmarks.has(lesson.id)) {
        out.push({ ...lesson, moduleName: mod.name ?? "" });
      }
    }
  }
  return out;
}

/* ===== styles ===== */

const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  margin: 0,
  marginBottom: "0.2rem",
};
const cohortStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "1rem",
};
const subhintStyle = {
  fontFamily: "var(--sans)",
  fontStyle: "italic",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "1rem",
};

const statsRowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "0.75rem",
  marginBlockEnd: "1rem",
};
const statBlockStyle = {
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.75rem",
};
const statValueStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  margin: 0,
  lineHeight: 1.1,
};
const statLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
};

const groupStyle = { marginBlock: "1rem" };
const groupLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.5rem",
};

const lessonListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};
const lessonRowStyle = {
  appearance: "none",
  background: "transparent",
  border: "none",
  color: "var(--ink)",
  inlineSize: "100%",
  textAlign: "start",
  padding: "0.3rem 0.5rem",
  cursor: "pointer",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "0.5rem",
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.75rem",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
};
const lessonModuleStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
  whiteSpace: "nowrap",
};
const lessonTitleStyle = {};

const emptyHintStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  color: "var(--ink-dim)",
  margin: 0,
  paddingInlineStart: "0.75rem",
  borderInlineStart: "2px solid var(--rule)",
};
const kbdStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  border: "1px solid var(--rule)",
  borderRadius: "0.2rem",
  padding: "0 0.3rem",
};

const legacyLinkRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.3rem",
  marginBlockStart: "0.4rem",
};
const legacyLinkStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  borderRadius: "0.3rem",
  padding: "0.35rem 0.6rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
};

const actionsRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "1rem",
};
const primaryButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--accent)",
  color: "var(--ink)",
  padding: "0.5rem 0.85rem",
  borderRadius: "0.3rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
};

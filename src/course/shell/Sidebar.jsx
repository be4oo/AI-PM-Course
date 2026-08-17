/**
 * Sidebar — the left column of the course shell.
 *
 * Spec refs:
 *   - FR-002: sidebar contains, in order, a single progress meter, the
 *     module list with collapsible lessons, and a Practice rail with
 *     EXACTLY four tools (Spaced, Adversarial, Capstone, Knowledge map).
 *     No author or audit tools may appear.
 *   - FR-004: module color appears ONLY as a 2px marker (border-inline-start).
 *   - FR-017: completion indicator on each lesson is a single visual signal,
 *             not a checkbox + radio + button trio.
 *   - User Story 2 acceptance: active lesson visually distinguished;
 *     per-module progress only appears on hover/expansion.
 *
 * Author / audit views (Audit, Sources, Cohort, Coverage, Community,
 * Glossary, Cheatsheets, Tools, Exec, Live, Changelog, Reviews,
 * Templates, Ops) are intentionally absent here — they're reachable via
 * the command palette `>` prefix (Phase 6) and from the Profile modal.
 *
 * Pure presentational. All state changes via callbacks.
 */

import { useState } from "react";
import { PRACTICE_TOOLS } from "../tools/practiceTools.js";
import { moduleColor } from "../lib/moduleColor.js";

export function Sidebar({
  curriculum = [],
  activeModuleIndex = 0,
  activeLessonIndex = 0,
  completedLessonIds,
  onSelectLesson,
  onOpenTool,
  activeTrackId,
  tracks = [],
  onSwitchTrack,
  className,
  // When rendered inside the mobile drawer, enlarge tap targets to ≥44px.
  // The dense desktop sidebar keeps its compact rows (touch=false).
  touch = false,
}) {
  const completed = toSet(completedLessonIds);
  const { total, done } = countProgress(curriculum, completed);
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <nav aria-label="Course navigation" className={className} style={navStyle}>
      <TrackSwitcher
        activeTrackId={activeTrackId}
        tracks={tracks}
        onSwitchTrack={onSwitchTrack}
        touch={touch}
      />
      <ProgressMeter percent={pct} done={done} total={total} />
      <ModuleList
        curriculum={curriculum}
        activeModuleIndex={activeModuleIndex}
        activeLessonIndex={activeLessonIndex}
        completed={completed}
        onSelectLesson={onSelectLesson}
        touch={touch}
      />
      <PracticeRail onOpenTool={onOpenTool} touch={touch} />
    </nav>
  );
}

const TOUCH_TARGET = { minBlockSize: "44px" };

function TrackSwitcher({ activeTrackId, tracks, onSwitchTrack, touch }) {
  if (!activeTrackId || tracks.length < 2 || typeof onSwitchTrack !== "function") return null;
  const activeTrack = tracks.find((track) => track.id === activeTrackId);
  const inactiveTrack = tracks.find((track) => track.id !== activeTrackId);
  if (!activeTrack || !inactiveTrack) return null;

  return (
    <section aria-label="Course track" style={trackSectionStyle}>
      <span style={trackLabelStyle}>{activeTrack.label}</span>
      <button
        type="button"
        onClick={() => onSwitchTrack(inactiveTrack.id)}
        style={touch ? { ...trackButtonStyle, ...TOUCH_TARGET } : trackButtonStyle}
        aria-label={`Switch to ${inactiveTrack.label}`}
      >
        Switch to {inactiveTrack.label}
      </button>
    </section>
  );
}

/* ===========================================================================
 * Progress meter — a single course-aggregate signal (FR-002).
 * ========================================================================= */

function ProgressMeter({ percent, done, total }) {
  return (
    <section aria-label="Course progress" style={meterSectionStyle}>
      <p style={labelStyle}>Progress</p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${done} of ${total} lessons complete`}
        style={meterTrackStyle}
      >
        <div style={{ ...meterFillStyle, inlineSize: `${percent}%` }} />
      </div>
      <p style={meterCaptionStyle}>
        <span style={meterPercentStyle}>{percent}%</span>
        <span> · {done} of {total} lessons</span>
      </p>
    </section>
  );
}

/* ===========================================================================
 * Module list — collapsible. Active module starts expanded; others collapse
 * on first render. User Story 2 #2: click toggles expand/collapse without
 * navigating away from the current lesson.
 * ========================================================================= */

function ModuleList({
  curriculum,
  activeModuleIndex,
  activeLessonIndex,
  completed,
  onSelectLesson,
  touch = false,
}) {
  const [expanded, setExpanded] = useState(() => {
    // Start with only the active module expanded.
    const initial = {};
    initial[activeModuleIndex] = true;
    return initial;
  });

  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section aria-label="Modules" style={moduleListSectionStyle}>
      <p style={labelStyle}>Modules</p>
      <ol style={moduleListStyle}>
        {curriculum.map((mod, mi) => {
          const isActiveModule = mi === activeModuleIndex;
          const isExpanded = expanded[mi] ?? isActiveModule;
          const markerColor = moduleColor(mi);
          const moduleProgress = moduleCompletionPct(mod, completed);
          const moduleLabel = mod.module ?? `Module ${mi + 1}`;
          const moduleTitle = mod.title ?? mod.name ?? moduleLabel;

          return (
            <li key={mod.id ?? mi}>
              <button
                type="button"
                onClick={() => toggle(mi)}
                aria-expanded={isExpanded}
                aria-controls={`course-module-${mi}-lessons`}
                data-testid="course-module-toggle"
                style={{
                  ...moduleHeaderStyle,
                  ...(touch ? TOUCH_TARGET : null),
                  borderInlineStartColor: markerColor,
                  fontWeight: isActiveModule ? 600 : 400,
                }}
              >
                <span style={moduleNumberStyle}>{String(mi + 1).padStart(2, "0")}</span>
                <span style={moduleCopyStyle}>
                  <span data-testid="course-module-label" style={moduleLabelStyle}>{moduleLabel}</span>
                  <span data-testid="course-module-title" style={moduleNameStyle}>{moduleTitle}</span>
                </span>
                <span
                  aria-hidden="true"
                  style={{ ...chevronStyle, transform: isExpanded ? "rotate(90deg)" : "none" }}
                >
                  ›
                </span>
                {/* Per-module progress is only revealed on expansion (FR-002 / US2 #4):
                    we render it inline so it appears once the module is expanded. */}
                {isExpanded ? (
                  <span style={moduleProgressBadgeStyle} data-testid="course-module-progress">
                    {moduleProgress}%
                  </span>
                ) : null}
              </button>
              {isExpanded ? (
                <ol
                  id={`course-module-${mi}-lessons`}
                  style={lessonListStyle}
                >
                  {(mod.lessons ?? []).map((lesson, li) => {
                    const isActiveLesson = isActiveModule && li === activeLessonIndex;
                    const isComplete = completed.has(lesson.id);
                    return (
                      <li key={lesson.id ?? li}>
                        <button
                          type="button"
                          onClick={() => onSelectLesson?.(mi, li)}
                          aria-current={isActiveLesson ? "true" : undefined}
                          data-testid="course-lesson-link"
                          data-completed={isComplete ? "true" : undefined}
                          style={{
                            ...lessonRowStyle,
                            ...(touch ? TOUCH_TARGET : null),
                            ...(isActiveLesson ? lessonRowActiveStyle : null),
                          }}
                        >
                          <span
                            aria-hidden="true"
                            data-testid="course-lesson-status"
                            style={{
                              ...statusDotStyle,
                              // SINGLE completion indicator (FR-017):
                              // - completed: filled accent dot
                              // - active:    accent ring
                              // - default:   muted hairline dot
                              background: isComplete ? "var(--accent)" : "transparent",
                              border: isComplete
                                ? "1px solid var(--accent)"
                                : isActiveLesson
                                ? "1px solid var(--accent)"
                                : "1px solid var(--rule)",
                            }}
                          />
                          <span style={lessonTitleStyle}>{lesson.title ?? lesson.id ?? "Untitled"}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ===========================================================================
 * Practice rail — exactly four tools, sourced from the frozen registry.
 * SC-008 enforcement is in practiceTools.test.js; this component is the
 * UI surface of that constraint.
 * ========================================================================= */

function PracticeRail({ onOpenTool, touch = false }) {
  return (
    <section aria-label="Practice tools" style={practiceSectionStyle}>
      <p style={labelStyle}>Practice</p>
      <ul style={practiceListStyle} data-testid="course-practice-rail">
        {PRACTICE_TOOLS.map((tool) => (
          <li key={tool.id}>
            <button
              type="button"
              onClick={() => onOpenTool?.(tool.id, "sidebar")}
              data-testid="course-practice-item"
              data-tool-id={tool.id}
              style={touch ? { ...practiceItemStyle, ...TOUCH_TARGET } : practiceItemStyle}
              title={tool.description}
            >
              <span style={practiceItemLabelStyle}>{tool.label}</span>
              <span style={practiceItemHintStyle}>{tool.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ===========================================================================
 * Helpers
 * ========================================================================= */

function toSet(value) {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value);
  return new Set();
}

function countProgress(curriculum, completed) {
  let total = 0;
  let done = 0;
  for (const mod of curriculum) {
    for (const lesson of mod.lessons ?? []) {
      total += 1;
      if (completed.has(lesson.id)) done += 1;
    }
  }
  return { total, done };
}

function moduleCompletionPct(mod, completed) {
  const lessons = mod.lessons ?? [];
  if (lessons.length === 0) return 0;
  const done = lessons.filter((l) => completed.has(l.id)).length;
  return Math.round((done / lessons.length) * 100);
}

/* ===========================================================================
 * Styles — token-bound; no `background` ever set to a module-color token
 * (the ESLint guard would reject it; the live CSS would too).
 * ========================================================================= */

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  color: "var(--ink, #ece7d8)",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
};

const labelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.5rem",
};

const trackSectionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  paddingBlockEnd: "0.75rem",
  borderBlockEnd: "1px solid var(--rule)",
};
const trackLabelStyle = {
  fontFamily: "var(--display)",
  fontSize: "1rem",
  color: "var(--ink)",
};
const trackButtonStyle = {
  appearance: "none",
  alignSelf: "flex-start",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink-dim)",
  cursor: "pointer",
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  lineHeight: 1.35,
  maxInlineSize: "100%",
  overflowWrap: "anywhere",
  padding: "0.3rem 0.5rem",
  textAlign: "start",
};

/* Progress meter */
const meterSectionStyle = { display: "flex", flexDirection: "column" };
const meterTrackStyle = {
  blockSize: "4px",
  background: "var(--rule)",
  borderRadius: "999px",
  overflow: "hidden",
};
const meterFillStyle = {
  blockSize: "100%",
  background: "var(--accent)",
};
const meterCaptionStyle = {
  marginTop: "0.4rem",
  marginBottom: 0,
  fontSize: "0.8rem",
  color: "var(--ink-dim)",
  display: "flex",
  alignItems: "baseline",
  gap: "0.25rem",
};
const meterPercentStyle = {
  color: "var(--ink)",
  fontFamily: "var(--mono)",
  fontSize: "0.95rem",
};

/* Module list */
const moduleListSectionStyle = { display: "flex", flexDirection: "column" };
const moduleListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
};
const moduleHeaderStyle = {
  appearance: "none",
  display: "grid",
  gridTemplateColumns: "1.75rem 1fr auto auto",
  alignItems: "center",
  gap: "0.5rem",
  background: "transparent",
  border: "none",
  borderInlineStart: "2px solid var(--rule)",
  paddingBlock: "0.4rem",
  paddingInlineStart: "0.6rem",
  paddingInlineEnd: "0.5rem",
  inlineSize: "100%",
  color: "var(--ink)",
  textAlign: "start",
  cursor: "pointer",
  fontSize: "0.9rem",
};
const moduleNumberStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
};
const moduleCopyStyle = {
  display: "flex",
  flexDirection: "column",
  minInlineSize: 0,
};
const moduleLabelStyle = {
  color: "var(--ink-dim)",
  fontFamily: "var(--mono)",
  fontSize: "0.65rem",
  letterSpacing: "0.06em",
  lineHeight: 1.3,
  textTransform: "uppercase",
};
const moduleNameStyle = {
  fontFamily: "var(--display)",
  fontSize: "0.95rem",
  lineHeight: 1.3,
  minInlineSize: 0,
  overflowWrap: "anywhere",
  whiteSpace: "normal",
};
const chevronStyle = {
  fontFamily: "var(--mono)",
  color: "var(--ink-dim)",
  transition: "transform 150ms ease",
};
const moduleProgressBadgeStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
  gridColumn: "1 / -1", // wraps under the row when expanded
  textAlign: "end",
};

const lessonListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  marginInlineStart: "0.6rem",
  display: "flex",
  flexDirection: "column",
};
const lessonRowStyle = {
  appearance: "none",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  gap: "0.5rem",
  background: "transparent",
  border: "none",
  paddingBlock: "0.3rem",
  paddingInlineStart: "1rem",
  borderInlineStart: "2px solid transparent",
  color: "var(--ink-dim)",
  textAlign: "start",
  inlineSize: "100%",
  cursor: "pointer",
  fontSize: "0.85rem",
};
const lessonRowActiveStyle = {
  color: "var(--ink)",
  borderInlineStart: "2px solid var(--accent)",
};
const statusDotStyle = {
  inlineSize: "0.55rem",
  blockSize: "0.55rem",
  borderRadius: "999px",
};
const lessonTitleStyle = { fontFamily: "var(--sans)", lineHeight: 1.35 };

/* Practice rail */
const practiceSectionStyle = { display: "flex", flexDirection: "column" };
const practiceListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
};
const practiceItemStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  borderRadius: "0.3rem",
  padding: "0.45rem 0.6rem",
  textAlign: "start",
  inlineSize: "100%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "0.15rem",
};
const practiceItemLabelStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  fontWeight: 500,
};
const practiceItemHintStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.75rem",
  color: "var(--ink-dim)",
  lineHeight: 1.3,
};

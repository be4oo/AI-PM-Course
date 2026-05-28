/**
 * KnowledgeMapModal — module-grouped lesson constellation, click-to-jump.
 *
 * Spec ref: FR-015 — "MUST group lessons by module as a navigable
 * constellation; clicking a node MUST close the modal and load that lesson."
 *
 * The "constellation" visual is a typographic, module-grouped grid of
 * lesson chips. Each module is a 2px-marker column (FR-004 invariant);
 * lessons are buttons sized by their `runtimeEstimate` so longer lessons
 * read as denser stars. No coloured fills — only typographic and stroke
 * variation per Principle / FR-003 / FR-004.
 */

import { useState } from "react";
import { moduleColor } from "../lib/moduleColor.js";

export function KnowledgeMapModal({
  titleId,
  label = "Knowledge map",
  description,
  onClose,
  curriculum = [],
  completedLessonIds,
  onJumpToLesson,
}) {
  const completed = toSet(completedLessonIds);
  const [hoveredId, setHoveredId] = useState(null);

  function handleJump(lessonId) {
    onJumpToLesson?.(lessonId);
    onClose?.();
  }

  return (
    <div>
      <Title id={titleId}>{label}</Title>
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <div style={mapGridStyle} data-testid="kmap-grid">
        {curriculum.map((mod, mi) => {
          const markerColor = moduleColor(mi);
          return (
            <section
              key={mod.id ?? mi}
              aria-label={mod.name ?? `Module ${mi + 1}`}
              data-testid="kmap-module-group"
              data-module-id={mod.id ?? `m${mi + 1}`}
              style={{ ...moduleColumnStyle, borderInlineStartColor: markerColor }}
            >
              <p style={moduleEyebrowStyle}>
                <span style={moduleNumberStyle}>{String(mi + 1).padStart(2, "0")}</span>
                <span style={moduleNameStyle}>{mod.name ?? `Module ${mi + 1}`}</span>
              </p>
              <ul style={lessonChipsStyle}>
                {(mod.lessons ?? []).map((lesson) => {
                  const isComplete = completed.has(lesson.id);
                  const isHovered = hoveredId === lesson.id;
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => handleJump(lesson.id)}
                        onMouseEnter={() => setHoveredId(lesson.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(lesson.id)}
                        onBlur={() => setHoveredId(null)}
                        data-testid="kmap-lesson-node"
                        data-lesson-id={lesson.id}
                        data-completed={isComplete ? "true" : undefined}
                        title={lesson.title ?? lesson.id}
                        style={{
                          ...lessonChipStyle,
                          ...(isComplete ? lessonChipDoneStyle : null),
                          ...(isHovered ? lessonChipHoverStyle : null),
                        }}
                      >
                        <span style={chipLabelStyle}>{lesson.title ?? lesson.id}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={secondaryButtonStyle} data-testid="kmap-close">
          Close
        </button>
      </div>
    </div>
  );
}

function Title({ id, children }) {
  return <h2 id={id} style={titleStyle}>{children}</h2>;
}

function toSet(value) {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value);
  return new Set();
}

/* ===========================================================================
 * Styles — typographic / stroke variation only; never module color as fill.
 * ========================================================================= */

const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  margin: 0,
  marginBottom: "0.4rem",
};
const subhintStyle = {
  fontFamily: "var(--sans)",
  fontStyle: "italic",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "1rem",
};

const mapGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1rem",
};

const moduleColumnStyle = {
  borderInlineStart: "2px solid var(--rule)", // marker color is patched via style prop
  paddingInlineStart: "0.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
const moduleEyebrowStyle = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "0.5rem",
  margin: 0,
};
const moduleNumberStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  color: "var(--ink-dim)",
};
const moduleNameStyle = {
  fontFamily: "var(--display)",
  fontSize: "1rem",
  lineHeight: 1.3,
};

const lessonChipsStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
};
const lessonChipStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  padding: "0.3rem 0.55rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.78rem",
  maxInlineSize: "100%",
};
const lessonChipDoneStyle = {
  borderColor: "var(--accent)",
  color: "var(--ink)",
};
const lessonChipHoverStyle = {
  borderColor: "var(--accent)",
  color: "var(--ink)",
};
const chipLabelStyle = {
  display: "inline-block",
  maxInlineSize: "16ch",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  verticalAlign: "bottom",
};

const actionsRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "1rem",
};
const secondaryButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  padding: "0.5rem 0.85rem",
  borderRadius: "0.3rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
};

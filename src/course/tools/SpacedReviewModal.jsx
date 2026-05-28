/**
 * SpacedReviewModal — flashcard session body for the shared ToolModal.
 *
 * Spec ref: FR-012 — "Spaced review modal MUST present a flashcard session
 * with a reveal action and four grading buttons (Forgot, Hard, Good, Easy),
 * and MUST present a session-summary screen on completion."
 *
 * Data shape — data-model.md SpacedSession:
 *   queue:    Array<Flashcard>  (Flashcard = { id, front, back, lessonId? })
 *   index:    number            0-based
 *   revealed: boolean
 *   grades:   Array<"forgot"|"hard"|"good"|"easy">
 *   phase:    "in-progress" | "summary"
 *
 * Queue is supplied by props. The modal does NOT build the queue itself —
 * the orchestrator (CourseShell, or a future review-queue hook) does. This
 * keeps the body pure and testable.
 *
 * Empty queue: shows a friendly empty state with a primary "Close" action.
 */

import { useState, useMemo } from "react";

const GRADES = Object.freeze([
  { id: "forgot", label: "Forgot", hint: "didn't recall" },
  { id: "hard",   label: "Hard",   hint: "got it with effort" },
  { id: "good",   label: "Good",   hint: "recalled cleanly" },
  { id: "easy",   label: "Easy",   hint: "too easy" },
]);

export function SpacedReviewModal({
  titleId,
  label = "Spaced review",
  description,
  queue = [],
  onComplete,
  onClose,
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [grades, setGrades] = useState([]);

  const total = queue.length;
  const card = queue[index] ?? null;
  const phase = useMemo(() => {
    if (total === 0) return "empty";
    if (index >= total) return "summary";
    return "in-progress";
  }, [total, index]);

  function gradeAndAdvance(gradeId) {
    if (phase !== "in-progress") return;
    const nextGrades = [...grades, gradeId];
    setGrades(nextGrades);
    setRevealed(false);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex >= total) {
      onComplete?.(nextGrades);
    }
  }

  /* ===== empty queue ===== */
  if (phase === "empty") {
    return (
      <div>
        <Title id={titleId}>{label}</Title>
        {description ? <p style={subhintStyle}>{description}</p> : null}
        <p style={emptyStyle}>
          No flashcards are due right now. Finish a lesson and come back —
          new cards land here automatically.
        </p>
        <div style={summaryActionsStyle}>
          <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="spaced-close">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ===== summary ===== */
  if (phase === "summary") {
    const counts = GRADES.reduce((acc, g) => {
      acc[g.id] = grades.filter((x) => x === g.id).length;
      return acc;
    }, {});
    return (
      <div>
        <Title id={titleId}>{label} · summary</Title>
        <p style={subhintStyle}>
          {total} card{total === 1 ? "" : "s"} reviewed.
        </p>
        <ul style={summaryListStyle} data-testid="spaced-summary">
          {GRADES.map((g) => (
            <li key={g.id} style={summaryRowStyle}>
              <span style={summaryLabelStyle}>{g.label}</span>
              <span style={summaryCountStyle}>{counts[g.id] ?? 0}</span>
            </li>
          ))}
        </ul>
        <div style={summaryActionsStyle}>
          <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="spaced-close">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ===== in progress ===== */
  return (
    <div>
      <Title id={titleId}>{label}</Title>
      <p style={progressLineStyle} data-testid="spaced-progress">
        Card {index + 1} of {total}
      </p>

      <section aria-label="Flashcard" style={cardStyle}>
        <p style={frontStyle} data-testid="spaced-front">{card.front}</p>
        {revealed ? (
          <p style={backStyle} data-testid="spaced-back">{card.back}</p>
        ) : null}
      </section>

      {!revealed ? (
        <div style={revealRowStyle}>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            style={primaryButtonStyle}
            data-testid="spaced-reveal"
          >
            Reveal answer
          </button>
        </div>
      ) : (
        <div role="group" aria-label="Grade this card" style={gradeRowStyle}>
          {GRADES.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => gradeAndAdvance(g.id)}
              data-testid={`spaced-grade-${g.id}`}
              style={gradeButtonStyle}
              title={g.hint}
            >
              <span style={gradeLabelStyle}>{g.label}</span>
              <span style={gradeHintStyle}>{g.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===========================================================================
 * Subcomponents + styles
 * ========================================================================= */

function Title({ id, children }) {
  return <h2 id={id} style={titleStyle}>{children}</h2>;
}

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
const emptyStyle = {
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  lineHeight: 1.55,
  margin: 0,
  marginBottom: "1rem",
};
const progressLineStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.75rem",
};

const cardStyle = {
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "1rem",
  paddingBlock: "0.5rem",
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
const frontStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.25rem",
  margin: 0,
  lineHeight: 1.3,
};
const backStyle = {
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  color: "var(--ink-dim)",
  margin: 0,
  lineHeight: 1.5,
};

const revealRowStyle = { display: "flex", justifyContent: "flex-end" };
const gradeRowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "0.4rem",
};
const gradeButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  padding: "0.5rem 0.6rem",
  borderRadius: "0.3rem",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.15rem",
  textAlign: "start",
};
const gradeLabelStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
  fontWeight: 500,
};
const gradeHintStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.75rem",
  color: "var(--ink-dim)",
};

const summaryListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  marginBlock: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};
const summaryRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.75rem",
  paddingBlock: "0.3rem",
};
const summaryLabelStyle = { fontFamily: "var(--sans)", fontSize: "0.95rem" };
const summaryCountStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.95rem",
  color: "var(--ink)",
};
const summaryActionsStyle = { display: "flex", justifyContent: "flex-end" };
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

/**
 * RightRail — on-lesson outline + study-mode pills + lesson actions + next-due review.
 *
 * Spec refs:
 *   - FR-005: scroll-tracking outline, study-mode pills (Skim/Deep/Exec),
 *             inline lesson actions (bookmark/listen/copy), next-due-review
 *             affordance that opens the Spaced review modal
 *   - FR-007: outline click smooth-scrolls to anchor (FR-023a downgrades to instant)
 *   - FR-023a: `prefers-reduced-motion: reduce` ⇒ scroll-behavior auto
 *
 * Pure presentational. Outline state from `useScrollOutline` (caller).
 * Actions arrive as props (bookmark toggle, listen toggle, copy permalink,
 * openSpacedReview) so the rail does not own persistence — CourseShell owns it.
 */

import { outlineFromLesson } from "../lib/outlineFromLesson.js";

const STUDY_MODES = Object.freeze([
  { id: "skim", label: "Skim" },
  { id: "deep", label: "Deep" },
  { id: "exec", label: "Exec" },
]);

export function RightRail({
  lesson,
  activeSectionId,
  onSectionSelect,
  studyMode = "deep",
  onStudyModeChange,
  isBookmarked = false,
  onToggleBookmark,
  onListen,
  isListening = false,
  onCopyLink,
  copyFeedback = false,
  nextDueLabel,
  onOpenSpacedReview,
  className,
  // Enlarge tap targets to ≥44px when rendered inside the mobile outline drawer.
  touch = false,
}) {
  if (!lesson) return null;

  const outline = outlineFromLesson(lesson);
  const TOUCH_TARGET = touch ? { minBlockSize: "44px", display: "flex", alignItems: "center" } : null;

  return (
    <nav aria-label="On this lesson" className={className} style={railStyle}>
      {/* Study-mode pills */}
      <section aria-label="Study mode" style={pillRowWrapStyle}>
        <p style={labelStyle}>Mode</p>
        <div role="radiogroup" aria-label="Study mode" style={pillRowStyle}>
          {STUDY_MODES.map((mode) => (
            <button
              type="button"
              key={mode.id}
              role="radio"
              aria-checked={studyMode === mode.id}
              onClick={() => onStudyModeChange?.(mode.id)}
              style={{ ...(studyMode === mode.id ? pillActiveStyle : pillStyle), ...TOUCH_TARGET, ...(TOUCH_TARGET ? { justifyContent: "center" } : null) }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </section>

      {/* Outline */}
      <section aria-label="Outline" style={outlineSectionStyle}>
        <p style={labelStyle}>Outline</p>
        <ul style={outlineListStyle}>
          {outline.map((entry) => {
            const isActive = entry.id === activeSectionId;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  data-testid="course-outline-item"
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => {
                    if (onSectionSelect) {
                      e.preventDefault();
                      onSectionSelect(entry.id);
                    }
                  }}
                  style={{
                    ...outlineLinkStyle,
                    ...(isActive ? outlineLinkActiveStyle : null),
                    ...TOUCH_TARGET,
                    paddingInlineStart: entry.depth === 2 ? "1rem" : "0",
                  }}
                >
                  {entry.label}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Lesson actions */}
      <section aria-label="Lesson actions" style={actionsSectionStyle}>
        <p style={labelStyle}>Actions</p>
        <div style={actionRowStyle}>
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-pressed={isBookmarked}
            data-testid="course-action-bookmark"
            style={{ ...actionButtonStyle, ...TOUCH_TARGET }}
            title="Bookmark"
          >
            {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
          <button
            type="button"
            onClick={onListen}
            aria-pressed={isListening}
            data-testid="course-action-listen"
            style={{ ...actionButtonStyle, ...TOUCH_TARGET }}
            title={isListening ? "Pause audio" : "Listen"}
          >
            {isListening ? "❚❚ Listening" : "▶ Listen"}
          </button>
          <button
            type="button"
            onClick={onCopyLink}
            data-testid="course-action-copy"
            style={{ ...actionButtonStyle, ...TOUCH_TARGET }}
            title="Copy permalink"
          >
            {copyFeedback ? "✓ Copied" : "⎘ Copy link"}
          </button>
        </div>
      </section>

      {/* Next-due review */}
      {nextDueLabel ? (
        <section aria-label="Next due review" style={nextDueSectionStyle}>
          <p style={labelStyle}>Next due review</p>
          <button
            type="button"
            onClick={onOpenSpacedReview}
            data-testid="course-next-due-review"
            style={nextDueButtonStyle}
          >
            {nextDueLabel}
          </button>
        </section>
      ) : null}
    </nav>
  );
}

/* ===========================================================================
 * Styles
 * ========================================================================= */

const railStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  color: "var(--ink, #ece7d8)",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  position: "sticky",
  insetBlockStart: "2rem",
  alignSelf: "start",
};

const labelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.4rem",
};

/* Study-mode pills */
const pillRowWrapStyle = { display: "flex", flexDirection: "column" };
const pillRowStyle = {
  display: "inline-flex",
  gap: "0.25rem",
  padding: "0.25rem",
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.5rem",
};
const pillBaseStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid transparent",
  color: "var(--ink-dim)",
  padding: "0.25rem 0.6rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontFamily: "var(--mono)",
};
const pillStyle = { ...pillBaseStyle };
const pillActiveStyle = {
  ...pillBaseStyle,
  color: "var(--ink)",
  borderColor: "var(--accent)",
};

/* Outline */
const outlineSectionStyle = { display: "flex", flexDirection: "column" };
const outlineListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
};
const outlineLinkStyle = {
  display: "block",
  color: "var(--ink-dim)",
  textDecoration: "none",
  paddingBlock: "0.2rem",
  borderInlineStart: "2px solid transparent",
  paddingInlineStart: "0.5rem",
  cursor: "pointer",
  fontSize: "0.9rem",
  lineHeight: 1.4,
};
const outlineLinkActiveStyle = {
  color: "var(--ink)",
  borderInlineStart: "2px solid var(--accent)",
};

/* Actions */
const actionsSectionStyle = { display: "flex", flexDirection: "column" };
const actionRowStyle = { display: "flex", flexDirection: "column", gap: "0.4rem" };
const actionButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  padding: "0.4rem 0.6rem",
  borderRadius: "0.3rem",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontFamily: "var(--sans)",
  textAlign: "start",
};

/* Next-due review */
const nextDueSectionStyle = { display: "flex", flexDirection: "column" };
const nextDueButtonStyle = {
  ...actionButtonStyle,
  borderColor: "var(--accent)",
  color: "var(--ink)",
  fontWeight: 500,
};

/* scrollToSection is exported from src/course/shell/scrollToSection.js
   (kept separate so React Fast Refresh accepts this as a component-only module). */

/**
 * UpdatedBadge
 *
 * Shows a purple "UPDATED" chip when a lesson's content was meaningfully
 * revised *after* the learner first completed it. This is a learner-state
 * signal — distinct from FreshnessBadge, which signals source staleness.
 *
 * Renders nothing when:
 *  - updatedAt is absent (lesson has not been revised)
 *  - completedAt is absent (learner has not completed the lesson yet)
 *  - updatedAt <= completedAt (learner already completed the latest version)
 *
 * The badge clears automatically the next time the learner completes the
 * lesson, because a new completedAt timestamp will be written that is
 * greater than updatedAt.
 */
export function UpdatedBadge({ updatedAt, completedAt, compact = false }) {
  if (!updatedAt || !completedAt) return null;

  const updated = new Date(updatedAt);
  const completed = new Date(completedAt);

  if (isNaN(updated.getTime()) || isNaN(completed.getTime())) return null;
  if (updated <= completed) return null;

  return (
    <span
      title={`New content added on ${updatedAt} — re-read to clear this badge`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        border: "1px solid #7C3AED99",
        color: "#FFFFFF",
        background: "#7C3AED",
        fontSize: compact ? 10 : 11,
        fontFamily: "var(--font-mono)",
        letterSpacing: compact ? 0.5 : 1.1,
        padding: compact ? "2px 6px" : "3px 8px",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />
      UPDATED
    </span>
  );
}

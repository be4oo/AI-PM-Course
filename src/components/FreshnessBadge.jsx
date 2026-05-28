import { getFreshnessBadgeData } from "../utils/freshness";

const STATUS_GLYPH = {
  fresh: "✓",
  aging: "•",
  stale: "!",
  unverified: "?",
  invalid: "×",
};

export function FreshnessBadge({ meta, now, compact = false }) {
  const badge = getFreshnessBadgeData(meta, now);
  const glyph = STATUS_GLYPH[badge.status] || "•";
  const caption =
    badge.daysOld === null ? badge.reason : `${badge.daysOld} days since verification`;
  const ariaLabel = `Freshness: ${badge.label}. ${caption}.`;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      title={caption}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        border: `1px solid ${badge.color}66`,
        color: badge.color,
        fontSize: compact ? 10 : 11,
        fontFamily: "var(--font-mono)",
        letterSpacing: compact ? 0.5 : 1.1,
        padding: compact ? "2px 6px" : "3px 8px",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: badge.color,
          color: "#0b0b14",
          fontSize: compact ? 9 : 10,
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        {glyph}
      </span>
      {badge.label}
      {!compact && badge.daysOld !== null ? <span style={{ opacity: 0.9 }}>{badge.daysOld}d</span> : null}
    </span>
  );
}

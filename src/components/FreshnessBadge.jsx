import { getFreshnessBadgeData } from "../utils/freshness";

export function FreshnessBadge({ meta, now, compact = false }) {
  const badge = getFreshnessBadgeData(meta, now);
  const caption =
    badge.daysOld === null ? badge.reason : `${badge.daysOld} days since verification`;

  return (
    <span
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
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.color }} />
      {badge.label}
      {!compact && badge.daysOld !== null ? <span style={{ opacity: 0.9 }}>{badge.daysOld}d</span> : null}
    </span>
  );
}

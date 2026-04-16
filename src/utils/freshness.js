const DAY_MS = 24 * 60 * 60 * 1000;
const QUARTER_TO_MONTH = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };

function toUtcDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();

  const quarterMatch = raw.match(/^(\d{4})-Q([1-4])$/i);
  if (quarterMatch) {
    const year = Number(quarterMatch[1]);
    const quarter = `Q${quarterMatch[2].toUpperCase()}`;
    const month = QUARTER_TO_MONTH[quarter];
    return new Date(Date.UTC(year, month - 1, 1));
  }

  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return new Date(Date.UTC(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3])));
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function wholeDaysBetween(fromDate, toDate) {
  return Math.max(0, Math.floor((toDate.getTime() - fromDate.getTime()) / DAY_MS));
}

export function getFreshnessBadgeData(meta = {}, now = new Date()) {
  const lastVerified = meta.lastVerified;
  const freshnessWindow = Number(meta.freshnessWindow || 180);

  if (lastVerified === undefined || lastVerified === null || lastVerified === "") {
    return {
      status: "unverified",
      label: "UNVERIFIED",
      color: "#FF7A59",
      daysOld: null,
      reason: "Missing lastVerified metadata",
    };
  }

  const verifiedDate = toUtcDate(lastVerified);
  if (!verifiedDate) {
    return {
      status: "invalid",
      label: "INVALID DATE",
      color: "#FF3B5C",
      daysOld: null,
      reason: `Could not parse lastVerified: ${String(lastVerified)}`,
    };
  }

  const daysOld = wholeDaysBetween(verifiedDate, now);
  const warningStart = Math.max(30, Math.floor(freshnessWindow / 2));
  if (daysOld >= freshnessWindow) {
    return {
      status: "stale",
      label: "STALE",
      color: "#FF3B5C",
      daysOld,
      reason: `Older than freshness window (${freshnessWindow}d)`,
    };
  }
  if (daysOld >= warningStart) {
    return {
      status: "aging",
      label: "AGING",
      color: "#FFB800",
      daysOld,
      reason: `Approaching freshness window (${freshnessWindow}d)`,
    };
  }
  return {
    status: "fresh",
    label: "FRESH",
    color: "#00E676",
    daysOld,
    reason: "Within freshness window",
  };
}

export function sortChangelogEntries(entries = []) {
  return [...entries].sort((a, b) => {
    const aDate = new Date(a.date || 0).getTime();
    const bDate = new Date(b.date || 0).getTime();
    return bDate - aDate;
  });
}

export function getFreshnessAuditRows(curriculum, now = new Date()) {
  const rows = [];
  for (const module of curriculum || []) {
    for (const lesson of module.lessons || []) {
      const freshness = getFreshnessBadgeData(lesson.meta || {}, now);
      rows.push({
        module: module.module,
        moduleTitle: module.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        status: freshness.status,
        label: freshness.label,
        daysOld: freshness.daysOld,
        reason: freshness.reason,
      });
    }
  }
  return rows;
}

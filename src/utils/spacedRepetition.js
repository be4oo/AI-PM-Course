// Spaced-repetition primitives for the in-app "weak concepts" review queue.
//
// Each concept is a plain object {
//   lessonKey, lessonId, title, prompt,
//   level: number,        // doubles/quadruples between reviews
//   nextReview: number    // ms-since-epoch when due again
// }
//
// The functions here are pure (the App.jsx caller owns the React state).

const DAY_MS = 24 * 60 * 60 * 1000;

export const SR_DIFFICULTIES = ["forgot", "hard", "good", "easy"];

/**
 * Compute the next state of a weak concept after the learner grades a review.
 *
 * Forgot   → reset level to 0, retry in ~1 hour
 * Hard     → keep level, retry in 1 day
 * Good     → level + 1, retry in 2^level days
 * Easy     → level + 2, retry in 4^level days
 */
export function rateWeakConcept(item, difficulty, nowMs = Date.now()) {
  const baseLevel = item?.level ?? 0;
  let level = baseLevel;
  let delayDays;

  switch (difficulty) {
    case "forgot":
      level = 0;
      delayDays = 0.04; // ~1 hour
      break;
    case "hard":
      delayDays = 1;
      break;
    case "good":
      level = baseLevel + 1;
      delayDays = Math.pow(2, level);
      break;
    case "easy":
      level = baseLevel + 2;
      delayDays = Math.pow(4, level);
      break;
    default:
      // Unknown grade: leave the item unchanged.
      return item;
  }

  return {
    ...item,
    level,
    nextReview: nowMs + delayDays * DAY_MS,
  };
}

/**
 * Fill in default `level` / `nextReview` for a legacy concept that was saved
 * before the SR fields existed.
 */
export function migrateWeakConcept(wc, nowMs = Date.now()) {
  if (!wc || typeof wc !== "object") return wc;
  return {
    ...wc,
    level: wc.level ?? 0,
    nextReview: wc.nextReview ?? nowMs,
  };
}

/**
 * Append a concept to the queue, deduplicating by `lessonKey`. Returns the
 * original list reference unchanged when the concept is already present.
 */
export function addWeakConcept(list, entry) {
  if (!entry?.lessonKey) return list;
  if (list.some((existing) => existing.lessonKey === entry.lessonKey)) return list;
  return [...list, entry];
}

/**
 * Pure position helpers for the lesson player. The caller still owns the
 * React state — these functions just answer "what's the next/previous
 * coordinate?" given the current one and the curriculum shape.
 *
 * Coordinates are { mi, li } (module-index, lesson-index).
 */

/**
 * Resolve the lesson coordinate immediately after the given one. Returns null
 * if we're already at the very last lesson of the very last module.
 *
 * @param {object} pos               — current { mi, li }
 * @param {object[]} curriculum      — module list with .lessons.length
 */
export function nextLessonPosition(pos, curriculum) {
  const { mi, li } = pos;
  const mod = curriculum[mi];
  if (!mod) return null;
  if (li < mod.lessons.length - 1) return { mi, li: li + 1 };
  if (mi < curriculum.length - 1) return { mi: mi + 1, li: 0 };
  return null;
}

/**
 * Resolve the lesson coordinate immediately before the given one. Returns
 * null if we're already at the first lesson of the first module.
 */
export function prevLessonPosition(pos, curriculum) {
  const { mi, li } = pos;
  if (li > 0) return { mi, li: li - 1 };
  if (mi > 0) {
    const prev = curriculum[mi - 1];
    return { mi: mi - 1, li: prev.lessons.length - 1 };
  }
  return null;
}

/**
 * True when the current lesson is the last lesson of a module that has more
 * modules after it — i.e. moving forward would cross a module boundary.
 */
export function isAtModuleBoundary(pos, curriculum) {
  const { mi, li } = pos;
  const mod = curriculum[mi];
  if (!mod) return false;
  return li === mod.lessons.length - 1 && mi < curriculum.length - 1;
}

/**
 * One-time legacy → `course/*` storage migration.
 *
 * Spec/plan refs:
 *   - data-model.md §"Storage key registry" + §migration plan
 *   - tasks.md §T081 (closes coverage gap C2 from /speckit-analyze)
 *
 * Today's app stores everything as a single blob under `localStorage.ai-pm-progress`
 * (see src/App.jsx). The new course shell uses a namespaced layout:
 *
 *   course/completed/v1   JSON Array<string>   completed lesson IDs
 *   course/bookmarks/v1   JSON Array<string>   bookmarked lesson IDs
 *   course/last-read/v1   string | null        last-read lesson ID
 *   course/study-mode/v1  "skim"|"deep"|"exec"
 *   course/streak/v1      { current, best, lastReadDate }
 *   course/tweaks/v1      { accent, display, density }
 *
 * The migration:
 *   1. Runs at most ONCE per device (idempotent guard: course/migration/v1).
 *   2. Only writes a target key if the target is currently empty (never
 *      clobbers data already in the new namespace).
 *   3. Leaves the legacy blob in place (App.jsx still reads it for non-learn
 *      views; the redesign coexists with the legacy until Phase 8).
 *   4. Resolves `lastReadLessonId` from legacy `activeMod` + `activeLesson`
 *      via the supplied curriculum; null if it can't be resolved.
 */

import { TWEAKS_DEFAULTS } from "./designTokens.js";

export const MIGRATION_GUARD_KEY = "course/migration/v1";
export const LEGACY_BLOB_KEY     = "ai-pm-progress";

export const COURSE_KEYS = Object.freeze({
  completed:  "course/completed/v1",
  bookmarks:  "course/bookmarks/v1",
  lastRead:   "course/last-read/v1",
  studyMode:  "course/study-mode/v1",
  streak:     "course/streak/v1",
  tweaks:     "course/tweaks/v1",
});

/**
 * @typedef {Object} MigrationResult
 * @property {boolean} ran                whether this invocation actually wrote anything
 * @property {boolean} alreadyMigrated    true if the guard key was already set
 * @property {string[]} written           the course/* keys that received data
 * @property {string|null} error          human-readable error (or null)
 */

/**
 * @param {object} [opts]
 * @param {Storage} [opts.storage]       defaults to window.localStorage
 * @param {Array<{id: string, lessons: Array<{id: string}>}>} [opts.curriculum]
 *   supplied so the migration can resolve legacy (activeMod, activeLesson)
 *   indices into a stable lesson ID.
 * @returns {MigrationResult}
 */
export function migrateLegacyStorage(opts = {}) {
  const storage = opts.storage ?? safeLocalStorage();
  if (!storage) return { ran: false, alreadyMigrated: false, written: [], error: "localStorage unavailable" };

  // Idempotency: already migrated?
  if (storage.getItem(MIGRATION_GUARD_KEY) != null) {
    return { ran: false, alreadyMigrated: true, written: [], error: null };
  }

  // Read legacy blob
  const rawBlob = storage.getItem(LEGACY_BLOB_KEY);
  if (!rawBlob) {
    // No legacy data — mark migration done so we don't re-check on every mount.
    storage.setItem(MIGRATION_GUARD_KEY, new Date().toISOString());
    return { ran: false, alreadyMigrated: false, written: [], error: null };
  }

  let legacy;
  try {
    legacy = JSON.parse(rawBlob);
  } catch (err) {
    return { ran: false, alreadyMigrated: false, written: [], error: `Legacy blob is not valid JSON: ${err.message}` };
  }
  if (!legacy || typeof legacy !== "object") {
    return { ran: false, alreadyMigrated: false, written: [], error: "Legacy blob is not an object." };
  }

  const written = [];
  const writeIfEmpty = (key, value) => {
    if (storage.getItem(key) != null) return; // never clobber existing
    storage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    written.push(key);
  };

  // ----- completed / bookmarks -----
  if (Array.isArray(legacy.completed)) {
    writeIfEmpty(COURSE_KEYS.completed, [...new Set(legacy.completed.filter(isNonEmptyString))]);
  }
  if (Array.isArray(legacy.bookmarks)) {
    writeIfEmpty(COURSE_KEYS.bookmarks, [...new Set(legacy.bookmarks.filter(isNonEmptyString))]);
  }

  // ----- last-read: prefer explicit lesson ID, else resolve from indices -----
  let lastReadId = null;
  if (isNonEmptyString(legacy.lastReadLessonId)) {
    lastReadId = legacy.lastReadLessonId;
  } else if (
    Array.isArray(opts.curriculum) &&
    Number.isInteger(legacy.activeMod) &&
    Number.isInteger(legacy.activeLesson)
  ) {
    const mod = opts.curriculum[legacy.activeMod];
    const lesson = mod?.lessons?.[legacy.activeLesson];
    if (lesson?.id) lastReadId = lesson.id;
  }
  writeIfEmpty(COURSE_KEYS.lastRead, lastReadId);

  // ----- study mode -----
  if (["skim", "deep", "exec"].includes(legacy.studyMode)) {
    writeIfEmpty(COURSE_KEYS.studyMode, legacy.studyMode);
  } else {
    writeIfEmpty(COURSE_KEYS.studyMode, "deep");
  }

  // ----- streak -----
  if (legacy.streak && typeof legacy.streak === "object") {
    writeIfEmpty(COURSE_KEYS.streak, {
      current:      clamp01_366(legacy.streak.current),
      best:         clamp01_366(legacy.streak.best),
      lastReadDate: isIsoDate(legacy.streak.lastReadDate) ? legacy.streak.lastReadDate : null,
    });
  } else {
    writeIfEmpty(COURSE_KEYS.streak, { current: 0, best: 0, lastReadDate: null });
  }

  // ----- tweaks: legacy never stored these; seed defaults -----
  writeIfEmpty(COURSE_KEYS.tweaks, { ...TWEAKS_DEFAULTS });

  // Set the guard last so partial-migration is recoverable on a future load.
  storage.setItem(MIGRATION_GUARD_KEY, new Date().toISOString());

  return { ran: written.length > 0, alreadyMigrated: false, written, error: null };
}

/* ---------------- helpers ---------------- */

function safeLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    // Probe — Safari private mode throws on setItem.
    const probe = `__course_probe_${Math.random()}`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

function isNonEmptyString(s) {
  return typeof s === "string" && s.length > 0;
}

function isIsoDate(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function clamp01_366(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return 0;
  return Math.min(366, Math.max(0, Math.floor(n)));
}

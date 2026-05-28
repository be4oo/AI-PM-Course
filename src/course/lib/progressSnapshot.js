/**
 * Progress Snapshot — Export / Import shape for learner state.
 *
 * Contract:  specs/001-course-page-redesign/contracts/progress-snapshot.schema.json
 * Spec:      FR-010 (export/import), SC-005 (round-trip equality)
 *
 * Schema-versioned: unknown major versions are rejected; same major with
 * extra fields is tolerated (forward-compatible reads).
 *
 * Validation here is hand-rolled rather than pulling in `ajv` or similar —
 * the schema is small, the dependency cost would dwarf the validator, and
 * SC-007 cares about bundle size. The unit tests (T022) enforce parity with
 * the JSON Schema file.
 */

import {
  ACCENT_VARIANT_IDS,
  DISPLAY_OPTIONS,
  DENSITY_OPTIONS,
  TWEAKS_DEFAULTS,
} from "./designTokens.js";

export const SCHEMA_ID = "course-progress/v1";
export const STUDY_MODES = Object.freeze(["skim", "deep", "exec"]);

/* ---------------------------------------------------------------------------
 * buildSnapshot — produce a v1 export from in-memory state.
 * ------------------------------------------------------------------------- */

/**
 * @typedef {Object} LearnerState
 * @property {Iterable<string>} completedLessonIds
 * @property {Iterable<string>} bookmarkedLessonIds
 * @property {string|null}      lastReadLessonId
 * @property {"skim"|"deep"|"exec"} studyMode
 * @property {{accent: string, display: string, density: string}} tweaks
 * @property {{current: number, best: number, lastReadDate: string|null}} streak
 */

/**
 * @param {LearnerState} state
 * @param {{ now?: () => Date }} [opts] — injectable clock for testability
 * @returns {object} schema-conformant snapshot
 */
export function buildSnapshot(state, { now = () => new Date() } = {}) {
  return {
    schema: SCHEMA_ID,
    exportedAt: now().toISOString(),
    completedLessonIds:  [...new Set(state.completedLessonIds ?? [])],
    bookmarkedLessonIds: [...new Set(state.bookmarkedLessonIds ?? [])],
    lastReadLessonId: state.lastReadLessonId ?? null,
    studyMode: STUDY_MODES.includes(state.studyMode) ? state.studyMode : "deep",
    tweaks: {
      accent:  ACCENT_VARIANT_IDS.includes(state.tweaks?.accent)  ? state.tweaks.accent  : TWEAKS_DEFAULTS.accent,
      display: DISPLAY_OPTIONS.includes(state.tweaks?.display)    ? state.tweaks.display : TWEAKS_DEFAULTS.display,
      density: DENSITY_OPTIONS.includes(state.tweaks?.density)    ? state.tweaks.density : TWEAKS_DEFAULTS.density,
    },
    streak: {
      current:      clampStreak(state.streak?.current),
      best:         clampStreak(state.streak?.best),
      lastReadDate: isIsoDate(state.streak?.lastReadDate) ? state.streak.lastReadDate : null,
    },
  };
}

/* ---------------------------------------------------------------------------
 * parseSnapshot — read a snapshot back into state, validating + filtering.
 * ------------------------------------------------------------------------- */

/**
 * @typedef {Object} ParseResult
 * @property {boolean} ok
 * @property {LearnerState|null} state          parsed state (or null on failure)
 * @property {string|null}      error           human-readable error (or null)
 * @property {number}           droppedLessons  count of unknown lesson IDs dropped (when knownLessonIds supplied)
 */

/**
 * @param {string|object} input               JSON string OR parsed object
 * @param {{ knownLessonIds?: Set<string> }} [opts]  if supplied, unknown lesson IDs are dropped (per FR-010 Edge Cases)
 * @returns {ParseResult}
 */
export function parseSnapshot(input, { knownLessonIds } = {}) {
  let raw;
  if (typeof input === "string") {
    try {
      raw = JSON.parse(input);
    } catch (err) {
      return fail(`Invalid JSON: ${err.message}`);
    }
  } else if (input && typeof input === "object") {
    raw = input;
  } else {
    return fail("Snapshot must be a JSON string or parsed object.");
  }

  // ----- schema discriminator -----
  if (raw.schema !== SCHEMA_ID) {
    const parts = String(raw.schema ?? "").split("/");
    const major = parts[1]?.match(/^v(\d+)$/)?.[1];
    const expectedMajor = SCHEMA_ID.split("/")[1].replace(/^v/, "");
    if (major && major !== expectedMajor) {
      return fail(
        `Unsupported schema version "${raw.schema}". This build reads "${SCHEMA_ID}". Update the app or use a compatible export.`,
      );
    }
    return fail(`Missing or unrecognized schema discriminator (expected "${SCHEMA_ID}").`);
  }

  // ----- shape -----
  if (!Array.isArray(raw.completedLessonIds))  return fail("completedLessonIds must be an array.");
  if (!Array.isArray(raw.bookmarkedLessonIds)) return fail("bookmarkedLessonIds must be an array.");
  if (raw.lastReadLessonId !== null && typeof raw.lastReadLessonId !== "string") {
    return fail("lastReadLessonId must be a string or null.");
  }
  if (!STUDY_MODES.includes(raw.studyMode))    return fail(`studyMode must be one of ${STUDY_MODES.join(", ")}.`);
  if (!raw.tweaks || typeof raw.tweaks !== "object") return fail("tweaks must be an object.");
  if (!ACCENT_VARIANT_IDS.includes(raw.tweaks.accent))  return fail(`tweaks.accent must be one of ${ACCENT_VARIANT_IDS.join(", ")}.`);
  if (!DISPLAY_OPTIONS.includes(raw.tweaks.display))    return fail(`tweaks.display must be one of ${DISPLAY_OPTIONS.join(", ")}.`);
  if (!DENSITY_OPTIONS.includes(raw.tweaks.density))    return fail(`tweaks.density must be one of ${DENSITY_OPTIONS.join(", ")}.`);
  if (!raw.streak || typeof raw.streak !== "object")    return fail("streak must be an object.");

  // ----- filter unknown lesson IDs (not a schema failure; counted) -----
  let droppedLessons = 0;
  let completed  = raw.completedLessonIds.filter(isNonEmptyString);
  let bookmarks  = raw.bookmarkedLessonIds.filter(isNonEmptyString);
  let lastRead   = raw.lastReadLessonId;

  if (knownLessonIds instanceof Set) {
    const beforeCompleted = completed.length;
    const beforeBookmarks = bookmarks.length;
    completed = completed.filter((id) => knownLessonIds.has(id));
    bookmarks = bookmarks.filter((id) => knownLessonIds.has(id));
    droppedLessons += (beforeCompleted - completed.length) + (beforeBookmarks - bookmarks.length);
    if (lastRead && !knownLessonIds.has(lastRead)) {
      droppedLessons += 1;
      lastRead = null;
    }
  }

  return {
    ok: true,
    error: null,
    droppedLessons,
    state: {
      completedLessonIds: completed,
      bookmarkedLessonIds: bookmarks,
      lastReadLessonId: lastRead,
      studyMode: raw.studyMode,
      tweaks: { ...raw.tweaks },
      streak: {
        current:      clampStreak(raw.streak.current),
        best:         clampStreak(raw.streak.best),
        lastReadDate: isIsoDate(raw.streak.lastReadDate) ? raw.streak.lastReadDate : null,
      },
    },
  };
}

/* ---------------------------------------------------------------------------
 * helpers
 * ------------------------------------------------------------------------- */

function clampStreak(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return 0;
  const v = Math.floor(n);
  if (v < 0) return 0;
  if (v > 366) return 366;
  return v;
}

function isIsoDate(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function isNonEmptyString(s) {
  return typeof s === "string" && s.length > 0;
}

function fail(error) {
  return { ok: false, state: null, error, droppedLessons: 0 };
}

import { migrateLegacyModuleStorage } from "./moduleStorage";

export const PROGRESS_STORAGE_KEY = "ai-pm-progress";

/**
 * Read raw saved progress as a string.
 *
 * Tries the host-shell `window.storage` first (which returns `{ value }`),
 * then falls back to `window.localStorage`. Returns null if neither has data.
 *
 * @param {object} options
 * @param {object|null} options.storage  — usually `window.storage`
 * @param {Storage|null} options.localStorage
 */
export async function readProgress({ storage, localStorage } = {}) {
  if (storage) {
    try {
      const res = await storage.get(PROGRESS_STORAGE_KEY);
      const value = res?.value;
      if (typeof value === "string" && value.length > 0) return value;
    } catch (err) {
      console.warn("[persistence] storage.get failed", err);
    }
  }
  if (localStorage) {
    try {
      const value = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (typeof value === "string" && value.length > 0) return value;
    } catch (err) {
      console.warn("[persistence] localStorage.getItem failed", err);
    }
  }
  return null;
}

/**
 * Parse a raw progress string. Validates JSON + object shape and runs the
 * legacy 8.5 → 8-5 module-key migration. Never throws.
 *
 * @returns {{ ok: true, data: object } | { ok: false, reason: string }}
 */
export function parseProgress(raw) {
  if (typeof raw !== "string" || !raw) return { ok: false, reason: "empty" };
  let loaded;
  try {
    loaded = JSON.parse(raw);
  } catch (err) {
    return { ok: false, reason: `not valid JSON: ${err.message}` };
  }
  if (!loaded || typeof loaded !== "object" || Array.isArray(loaded)) {
    return { ok: false, reason: "unexpected shape" };
  }
  const { payload } = migrateLegacyModuleStorage(loaded);
  return { ok: true, data: payload };
}

/**
 * Serialize the in-memory state object to a JSON string ready for storage.
 * Sets are converted to arrays so they round-trip through JSON.
 */
export function serializeProgress(state) {
  const next = { ...state };
  if (state.completed instanceof Set) next.completed = [...state.completed];
  if (state.bookmarks instanceof Set) next.bookmarks = [...state.bookmarks];
  return JSON.stringify(next);
}

/**
 * Write a serialized payload to storage. Tries host-shell `window.storage`
 * first, falls back to `window.localStorage`. Catches per-call errors so a
 * full disk / private browsing mode does not crash the save path.
 */
export async function writeProgress(payload, { storage, localStorage } = {}) {
  if (storage) {
    try {
      await storage.set(PROGRESS_STORAGE_KEY, payload);
      return "storage";
    } catch (err) {
      console.warn("[persistence] storage.set failed", err);
    }
  }
  if (localStorage) {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, payload);
      return "localStorage";
    } catch (err) {
      console.warn("[persistence] localStorage.setItem failed", err);
    }
  }
  return null;
}

/**
 * Resolve a `#lesson-<id>` URL hash into module/lesson indices. Returns null
 * when the hash is missing or does not match a known lesson.
 */
export function resolveLessonHash(hash, curriculum) {
  if (typeof hash !== "string" || !hash.startsWith("#lesson-")) return null;
  const lessonId = hash.slice("#lesson-".length);
  if (!lessonId) return null;
  for (let m = 0; m < curriculum.length; m++) {
    const li = curriculum[m].lessons.findIndex((l) => l.id === lessonId);
    if (li !== -1) return { mi: m, li };
  }
  return null;
}

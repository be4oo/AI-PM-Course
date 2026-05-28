/**
 * useActiveLesson — single source of truth for "which lesson is shown."
 *
 * Spec ref: FR-006 (sidebar click loads lesson, resets scroll, updates state,
 * deep-link), FR-007 (outline-click scroll), FR-018 (persist last-read).
 *
 * Data flow:
 *   - In v1, App.jsx still owns activeMod/activeLesson (legacy contract).
 *     This hook is the *adapter* between App.jsx setters and the URL hash +
 *     `course/last-read/v1` localStorage key. CourseShell passes activeMod /
 *     activeLesson / navigateToLesson in as props; the hook surfaces a
 *     normalized {moduleIndex, lessonIndex, lessonId, sectionId} read shape
 *     and a `goToLesson(id|indices)` write shape.
 *
 * URL hash format (preserved from legacy):
 *   #lesson-<lessonId>            — lesson anchor
 *   #lesson-<lessonId>#<section>  — lesson + section (custom convention; uses
 *                                    "$" as separator since hash can't nest)
 *
 * Storage key: `course/last-read/v1`
 */

import { useCallback, useEffect } from "react";

export const LAST_READ_KEY = "course/last-read/v1";
const HASH_PREFIX = "#lesson-";
const SECTION_SEP = "$";

/**
 * @typedef {Object} ActiveLessonAPI
 * @property {number}      moduleIndex
 * @property {number}      lessonIndex
 * @property {string|null} lessonId
 * @property {string|null} sectionId
 * @property {(id: string | { moduleIndex: number, lessonIndex: number, sectionId?: string }) => void} goToLesson
 */

/**
 * @param {object} params
 * @param {Array<{id: string, lessons: Array<{id: string}>}>} params.curriculum
 * @param {number} params.activeMod
 * @param {number} params.activeLesson
 * @param {(modIdx: number, lessonIdx: number, opts?: object) => void} params.navigateToLesson
 *   supplied by App.jsx — keeps legacy state in sync
 * @returns {ActiveLessonAPI}
 */
export function useActiveLesson({ curriculum, activeMod, activeLesson, navigateToLesson }) {
  const currentModule = curriculum?.[activeMod];
  const currentLesson = currentModule?.lessons?.[activeLesson];
  const lessonId = currentLesson?.id ?? null;

  // Re-read section from hash on each render — cheap, avoids useMemo dep warning.
  const sectionId = readSectionFromHash();

  // Persist last-read on every change.
  useEffect(() => {
    if (!lessonId) return;
    writeStorage(LAST_READ_KEY, lessonId);
  }, [lessonId]);

  // Sync hash on lesson/section change.
  useEffect(() => {
    if (!lessonId) return;
    const target = sectionId ? `${HASH_PREFIX}${lessonId}${SECTION_SEP}${sectionId}` : `${HASH_PREFIX}${lessonId}`;
    if (typeof window !== "undefined" && window.location.hash !== target) {
      // history.replaceState avoids polluting back-stack on every scroll.
      window.history.replaceState(null, "", target);
    }
  }, [lessonId, sectionId]);

  // Listen for external hash changes (deep-links from other surfaces).
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onHashChange = () => {
      const { lessonId: targetLesson, sectionId: targetSection } = readHash();
      if (!targetLesson || !curriculum) return;
      const { moduleIndex, lessonIndex } = locate(curriculum, targetLesson);
      if (moduleIndex < 0) return;
      navigateToLesson(moduleIndex, lessonIndex, { sectionId: targetSection ?? null });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [curriculum, navigateToLesson]);

  const goToLesson = useCallback(
    (target) => {
      if (!curriculum) return;
      if (typeof target === "string") {
        const { moduleIndex, lessonIndex } = locate(curriculum, target);
        if (moduleIndex >= 0) navigateToLesson(moduleIndex, lessonIndex);
        return;
      }
      if (target && typeof target === "object") {
        const { moduleIndex, lessonIndex, sectionId: nextSection = null } = target;
        navigateToLesson(moduleIndex, lessonIndex, { sectionId: nextSection });
      }
    },
    [curriculum, navigateToLesson],
  );

  return {
    moduleIndex: activeMod,
    lessonIndex: activeLesson,
    lessonId,
    sectionId,
    goToLesson,
  };
}

/* ----------------------------------------------------------------------- */

function readHash() {
  if (typeof window === "undefined") return { lessonId: null, sectionId: null };
  const hash = window.location.hash || "";
  if (!hash.startsWith(HASH_PREFIX)) return { lessonId: null, sectionId: null };
  const after = hash.slice(HASH_PREFIX.length);
  const sepIdx = after.indexOf(SECTION_SEP);
  if (sepIdx === -1) return { lessonId: after, sectionId: null };
  return {
    lessonId: after.slice(0, sepIdx),
    sectionId: after.slice(sepIdx + 1) || null,
  };
}

function readSectionFromHash() {
  return readHash().sectionId;
}

function locate(curriculum, lessonId) {
  for (let m = 0; m < curriculum.length; m++) {
    const lessons = curriculum[m]?.lessons ?? [];
    const li = lessons.findIndex((l) => l.id === lessonId);
    if (li !== -1) return { moduleIndex: m, lessonIndex: li };
  }
  return { moduleIndex: -1, lessonIndex: -1 };
}

function writeStorage(key, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private-mode failures
  }
}

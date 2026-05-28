/**
 * useTweaks — local-storage-backed Tweaks state for the course shell.
 *
 * Spec ref: FR-018 (persistence), FR-025 (4 enumerated accents, 2 displays,
 * 2 densities), Plan R3 (data-* attributes on shell root drive CSS swaps).
 *
 * Storage key: `course/tweaks/v1`  (data-model.md §Storage key registry)
 *
 * Returned tuple: `[tweaks, setTweaks]`
 *   tweaks    — current preferences (always one of the enumerated values)
 *   setTweaks — partial setter; merges with current, validates, persists
 *
 * Side effect: writes `data-accent`, `data-display`, `data-density` to the
 * supplied root ref (or document root if no ref) so tokens.css can flip
 * variables live. Falls back to defaults on read errors (FR-025 invariant:
 * never crash on a stale stored value).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  TWEAKS_DEFAULTS,
  ACCENT_VARIANT_IDS,
  DISPLAY_OPTIONS,
  DENSITY_OPTIONS,
} from "../lib/designTokens.js";

export const TWEAKS_STORAGE_KEY = "course/tweaks/v1";

/**
 * @param {React.RefObject<HTMLElement>} [rootRef] element to receive data-* attrs.
 *   If omitted, the document.documentElement is used.
 * @returns {[
 *   { accent: string, display: string, density: string },
 *   (partial: Partial<{accent: string, display: string, density: string}>) => void,
 * ]}
 */
export function useTweaks(rootRef) {
  const [tweaks, setTweaksState] = useState(() => readFromStorage());

  // The previous-value ref protects against writing data-* attrs when nothing
  // changed (avoids spurious StyleRecalc cycles during high-frequency renders).
  const prevRef = useRef(null);

  // Apply data-* attributes whenever tweaks change.
  useEffect(() => {
    const root = rootRef?.current ?? (typeof document !== "undefined" ? document.documentElement : null);
    if (!root) return;
    if (prevRef.current && shallowEqual(prevRef.current, tweaks)) return;
    root.setAttribute("data-accent",  tweaks.accent);
    root.setAttribute("data-display", tweaks.display);
    root.setAttribute("data-density", tweaks.density);
    prevRef.current = tweaks;
  }, [tweaks, rootRef]);

  const setTweaks = useCallback((partial) => {
    setTweaksState((prev) => {
      const merged = sanitize({ ...prev, ...(partial ?? {}) });
      // Persist (best-effort; localStorage may be unavailable in private mode).
      writeToStorage(merged);
      return merged;
    });
  }, []);

  return [tweaks, setTweaks];
}

/* ----------------------------------------------------------------------- */

function sanitize(t) {
  return {
    accent:  ACCENT_VARIANT_IDS.includes(t?.accent)  ? t.accent  : TWEAKS_DEFAULTS.accent,
    display: DISPLAY_OPTIONS.includes(t?.display)    ? t.display : TWEAKS_DEFAULTS.display,
    density: DENSITY_OPTIONS.includes(t?.density)    ? t.density : TWEAKS_DEFAULTS.density,
  };
}

function readFromStorage() {
  if (typeof window === "undefined" || !window.localStorage) return { ...TWEAKS_DEFAULTS };
  try {
    const raw = window.localStorage.getItem(TWEAKS_STORAGE_KEY);
    if (!raw) return { ...TWEAKS_DEFAULTS };
    return sanitize(JSON.parse(raw));
  } catch {
    return { ...TWEAKS_DEFAULTS };
  }
}

function writeToStorage(tweaks) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(TWEAKS_STORAGE_KEY, JSON.stringify(tweaks));
  } catch {
    // localStorage may be full or blocked (Safari private mode); silent.
  }
}

function shallowEqual(a, b) {
  return a && b && a.accent === b.accent && a.display === b.display && a.density === b.density;
}

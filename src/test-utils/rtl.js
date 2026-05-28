/**
 * RTL parity test helper.
 *
 * Toggles `document.documentElement.dir` (and `lang` when supplied) so course
 * components can be rendered under `dir="ltr"` and `dir="rtl"` from inside a
 * Vitest jsdom test.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md
 *   - FR-028:  RTL parity for the three-column shell and module marker side
 *   - FR-019:  shortcuts operate in reading order under both directions
 *   - Constitution Principle IV (Bilingual & MENA-Inclusive by Default)
 *
 * Usage in a test:
 *   import { setDir, withDir } from "@/test-utils/rtl";
 *
 *   await withDir("rtl", () => {
 *     render(<CourseShell .../>);
 *     // assertions: sidebar lives on inline-end, marker mirrors, …
 *   });
 *
 *   // Or imperatively:
 *   const restore = setDir("rtl", { lang: "ar" });
 *   try { ... } finally { restore(); }
 */

/**
 * Set the document direction (and optionally lang).
 *
 * @param {"ltr" | "rtl"} dir
 * @param {{ lang?: string }} [opts]
 * @returns {() => void} restore function
 */
export function setDir(dir, opts = {}) {
  if (typeof document === "undefined" || !document.documentElement) {
    throw new Error('setDir requires jsdom (run vitest with --environment=jsdom or use the "@vitest-environment jsdom" pragma)');
  }
  if (dir !== "ltr" && dir !== "rtl") {
    throw new Error(`setDir: dir must be "ltr" or "rtl"; received ${String(dir)}`);
  }
  const root = document.documentElement;
  const prevDir = root.getAttribute("dir");
  const prevLang = root.getAttribute("lang");

  root.setAttribute("dir", dir);
  if (opts.lang !== undefined) root.setAttribute("lang", opts.lang);

  return function restore() {
    if (prevDir == null) root.removeAttribute("dir");
    else root.setAttribute("dir", prevDir);
    if (opts.lang !== undefined) {
      if (prevLang == null) root.removeAttribute("lang");
      else root.setAttribute("lang", prevLang);
    }
  };
}

/**
 * Run a scoped block under a specific direction, restoring on completion
 * (even if the block throws).
 *
 * @template T
 * @param {"ltr" | "rtl"} dir
 * @param {() => T | Promise<T>} fn
 * @param {{ lang?: string }} [opts]
 * @returns {Promise<T>}
 */
export async function withDir(dir, fn, opts) {
  const restore = setDir(dir, opts);
  try {
    return await fn();
  } finally {
    restore();
  }
}

/** Convenience: assert a logical layout property mirrors as expected. */
export function expectedMarkerSide(dir) {
  return dir === "rtl" ? "right" : "left";
}

/**
 * Module marker color tokens — 12 desaturated hues used ONLY as 2px markers.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md §FR-004
 *   "Module color MUST appear only as a 2px marker (e.g., a left rule on the
 *    active item or a tab indicator) and MUST NOT be used as a background
 *    fill on cards, callouts, or panels."
 *
 * Enforcement (defense in depth):
 *   - Build-time:   eslint.config.js rule scoped to src/course/** rejects
 *                   `background[-color]: var(--module-*)` in JS/JSX.
 *   - Runtime test: tasks T028 / T037 assert no computed background-color
 *                   matches a module-marker token under the shell tree.
 *
 * Curriculum has 12 modules → exactly 12 entries. Adding a 13th requires
 * extending this palette AND the spec.
 */

/**
 * The 12 module marker colors. Picked to be visually distinguishable on
 * `--bg: #0e0d0b` AND `--bg-elev: #161412` while staying low-saturation so
 * they read as markers, not as primary UI accents.
 *
 * @type {ReadonlyArray<string>}
 */
export const MODULE_MARKER_PALETTE = Object.freeze([
  "#c98a4b", // 0  copper          (intentionally matches the default Tweaks accent — module 1 is the on-ramp)
  "#8aa07c", // 1  sage
  "#7896a8", // 2  ink-blue
  "#a09689", // 3  iron
  "#b89a5a", // 4  ochre
  "#a07f95", // 5  mauve
  "#6f9a92", // 6  teal
  "#b07857", // 7  rust
  "#9a8e72", // 8  olive
  "#7e8aa3", // 9  slate
  "#a39167", // 10 brass
  "#82a292", // 11 jade
]);

/** Number of modules the palette can address without amendment. */
export const MAX_MODULES = MODULE_MARKER_PALETTE.length;

/**
 * Return the marker color for a module index.
 *
 * Stable, deterministic, modular-arithmetic safety net for >12 modules:
 * the index wraps so the app never crashes; a `console.warn` (in dev only)
 * signals the palette needs extending.
 *
 * @param {number} moduleIndex 0-based index of the module
 * @returns {string} CSS color value
 */
export function moduleColor(moduleIndex) {
  if (
    typeof moduleIndex !== "number" ||
    !Number.isFinite(moduleIndex) ||
    moduleIndex < 0
  ) {
    return MODULE_MARKER_PALETTE[0];
  }
  const idx = Math.floor(moduleIndex);
  if (idx >= MAX_MODULES) {
    const isDev =
      typeof import.meta !== "undefined" &&
      (import.meta.env?.DEV === true || import.meta.env?.MODE === "development");
    if (isDev) {
      console.warn(
        `[moduleColor] index ${idx} exceeds palette size ${MAX_MODULES}; wrapping. Extend MODULE_MARKER_PALETTE if a 13th module shipped.`,
      );
    }
    return MODULE_MARKER_PALETTE[idx % MAX_MODULES];
  }
  return MODULE_MARKER_PALETTE[idx];
}

/**
 * CSS-variable name convention. `--module-0`, `--module-1`, ... `--module-11`.
 * The token values themselves are emitted in `src/course/styles/tokens.css`.
 *
 * @param {number} moduleIndex
 * @returns {string}
 */
export function moduleColorVar(moduleIndex) {
  const idx = Math.max(0, Math.floor(moduleIndex)) % MAX_MODULES;
  return `--module-${idx}`;
}

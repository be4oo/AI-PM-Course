/**
 * Editorial-dark design tokens for the course shell.
 *
 * These are *runtime* references — they mirror the CSS custom properties
 * defined in `src/course/styles/tokens.css`. The single source of truth for
 * each token is the CSS file (so live Tweaks swaps work without JS); this
 * module exists so JS-side tests, the contrast suite, and any component that
 * needs to *describe* a token can reference it by name.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md
 *   - FR-003 (typography), FR-021 (contrast), FR-025 (4 accents enumerated)
 *   - Clarifications §2 (per-variant contrast required)
 * Plan reference: plan.md research R3.
 */

/** Base editorial-dark palette. CSS authoritative; values mirrored here for tests. */
export const BASE_TOKENS = Object.freeze({
  bg:     "#0e0d0b", // near-black surface
  bgElev: "#161412", // elevated surface (modal, palette)
  ink:    "#ece7d8", // warm cream body text
  inkDim: "#b6ad97", // secondary text
  rule:   "#2a2622", // hairline rules
});

/**
 * The four allowed Tweaks accent variants.
 *
 * Order matters: copper is the default. Adding a fifth variant requires:
 *   1. amending spec FR-025 (which currently forbids that),
 *   2. extending this constant, AND
 *   3. extending the per-variant contrast evidence (FR-021).
 *
 * The contrast test (T067) iterates this constant — adding an entry without
 * shipping the matching evidence will fail the build.
 */
export const ACCENT_VARIANTS = Object.freeze({
  copper:    { id: "copper",    label: "Copper",   value: "#c98a4b" },
  sage:      { id: "sage",      label: "Sage",     value: "#8aa07c" },
  "ink-blue":{ id: "ink-blue",  label: "Ink blue", value: "#7896a8" },
  iron:      { id: "iron",      label: "Iron",     value: "#a09689" },
});

export const ACCENT_VARIANT_IDS = Object.freeze(Object.keys(ACCENT_VARIANTS));

/** Tweaks defaults — written to localStorage on first visit. */
export const TWEAKS_DEFAULTS = Object.freeze({
  accent: "copper",
  display: "serif", // alternative: "sans"
  density: "roomy", // alternative: "compact"
});

/** Display + density enumerations for validation in useTweaks. */
export const DISPLAY_OPTIONS = Object.freeze(["serif", "sans"]);
export const DENSITY_OPTIONS = Object.freeze(["roomy", "compact"]);

/** Font stacks (mirror tokens.css; useful for fallback assertions). */
export const FONT_STACKS = Object.freeze({
  serif: "'Newsreader', ui-serif, Georgia, serif",
  sans:  "'Geist', ui-sans-serif, system-ui, sans-serif",
  mono:  "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
});

/**
 * @param {string} id  candidate accent id
 * @returns {boolean}  true iff `id` is one of the four enumerated variants
 */
export function isValidAccent(id) {
  return Object.prototype.hasOwnProperty.call(ACCENT_VARIANTS, id);
}

/**
 * @param {string} id
 * @returns {{ id: string, label: string, value: string }}
 */
export function accent(id) {
  if (!isValidAccent(id)) {
    // Defensive fallback: never crash the shell on a stale stored value.
    return ACCENT_VARIANTS[TWEAKS_DEFAULTS.accent];
  }
  return ACCENT_VARIANTS[id];
}

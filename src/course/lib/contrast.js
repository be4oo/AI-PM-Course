/**
 * Contrast helpers — WCAG 2.1 relative-luminance + contrast-ratio.
 *
 * Algorithms per https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 * Used by the per-variant contrast test (T067, SC-006).
 */

/**
 * Parse a hex color (#rrggbb or #rgb) into [r, g, b] in 0..255.
 * @param {string} hex
 * @returns {[number, number, number]}
 */
export function hexToRgb(hex) {
  if (typeof hex !== "string") throw new TypeError("hex must be a string");
  let v = hex.trim().replace(/^#/, "");
  if (v.length === 3) v = v.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(v)) throw new TypeError(`Invalid hex color: ${hex}`);
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

/**
 * WCAG relative luminance for an sRGB color.
 * @param {[number, number, number]} rgb 0..255
 * @returns {number} 0..1
 */
export function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG contrast ratio between two colors (any order — symmetric).
 * @param {string} hexA
 * @param {string} hexB
 * @returns {number}  1..21
 */
export function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexToRgb(hexA));
  const b = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

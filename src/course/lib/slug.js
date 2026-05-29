/**
 * anchorIdFor — convert any string into a DOM-safe anchor id (slug).
 *
 * Extracted into its own dependency-free module so both `outlineFromLesson`
 * and `parseLessonContent` can import it without forming an import cycle
 * (outlineFromLesson now also reads parseLessonContent for content-derived
 * headings).
 *
 * @param {string} s
 * @returns {string}
 */
export function anchorIdFor(s) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

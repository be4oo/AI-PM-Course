/**
 * Vitest jsdom viewport helper.
 *
 * Snaps the jsdom environment to one of the four supported viewport widths
 * (375 / 768 / 1024 / 1440) and registers a matching `matchMedia` stub so
 * components using `(min-width: 1024px)`-style queries behave correctly in
 * tests.
 *
 * Spec reference: specs/001-course-page-redesign/spec.md
 *   - SC-003: no horizontal scroll at 375 / 768 / 1024 / 1440
 *   - SC-004: keyboard shortcuts produce documented effect at every supported width
 *   - FR-024: three-tier layout (≥1024 / 768–1023 / <768)
 *
 * Usage in a test:
 *   import { setViewport, VIEWPORTS, withViewport } from "@/test-utils/viewport";
 *
 *   setViewport(1024);                       // snap globally
 *   await withViewport(375, () => render(<Foo />));  // scoped + restored
 *
 *   describe.each(VIEWPORTS)("at %ipx", (w) => { ... });
 */

/** The four widths that are part of the spec's contract. */
export const VIEWPORTS = Object.freeze([375, 768, 1024, 1440]);

/** Standard heights paired to each width (mobile portrait / tablet / desktop). */
const HEIGHTS = { 375: 812, 768: 1024, 1024: 768, 1440: 900 };

function matches(query, width) {
  // Minimal CSS media-query parser: supports
  //   (min-width: Npx)  (max-width: Npx)
  //   (prefers-reduced-motion: reduce)   -> always false here; see rtl.js / a dedicated helper for that
  const minMatch = query.match(/\(min-width:\s*(\d+)px\)/);
  const maxMatch = query.match(/\(max-width:\s*(\d+)px\)/);
  let result = true;
  if (minMatch) result = result && width >= Number(minMatch[1]);
  if (maxMatch) result = result && width <= Number(maxMatch[1]);
  // Unknown features evaluate to false rather than throwing — matches browser behavior.
  if (!minMatch && !maxMatch) {
    if (/prefers-reduced-motion/.test(query)) return false;
    return false;
  }
  return result;
}

/**
 * Set the jsdom viewport to a specific width. Also stubs `matchMedia` so
 * media queries resolve against this width.
 *
 * @param {number} width  one of VIEWPORTS (or any positive integer)
 * @returns {() => void}  restore function returning the previous viewport
 */
export function setViewport(width) {
  if (typeof window === "undefined") {
    throw new Error("setViewport requires jsdom (run vitest with --environment=jsdom)");
  }
  const prev = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    matchMedia: window.matchMedia,
  };
  const height = HEIGHTS[width] ?? 900;
  Object.defineProperty(window, "innerWidth",  { configurable: true, writable: true, value: width });
  Object.defineProperty(window, "innerHeight", { configurable: true, writable: true, value: height });
  window.matchMedia = (query) => {
    const m = matches(query, width);
    return {
      matches: m,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
  // Notify any resize listeners attached to window.
  window.dispatchEvent(new Event("resize"));

  return function restore() {
    Object.defineProperty(window, "innerWidth",  { configurable: true, writable: true, value: prev.innerWidth });
    Object.defineProperty(window, "innerHeight", { configurable: true, writable: true, value: prev.innerHeight });
    window.matchMedia = prev.matchMedia;
    window.dispatchEvent(new Event("resize"));
  };
}

/**
 * Run a scoped block at a specific viewport, automatically restoring the
 * previous viewport on completion (even if the block throws).
 *
 * @template T
 * @param {number} width
 * @param {() => T | Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function withViewport(width, fn) {
  const restore = setViewport(width);
  try {
    return await fn();
  } finally {
    restore();
  }
}

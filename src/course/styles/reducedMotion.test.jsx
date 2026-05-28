/**
 * @vitest-environment jsdom
 *
 * Reduced-motion gate — FR-023a (release gate).
 *
 * Validates the two halves of the contract:
 *   1. The CSS rule under @media (prefers-reduced-motion: reduce) zeroes
 *      transitions/animations for every `.course-shell *` descendant and
 *      sets `scroll-behavior: auto`.
 *   2. The JS `scrollToSection` helper honours the same media query by
 *      switching to `behavior: "auto"` (covered already in T029 — repeated
 *      here as a release-gate cross-check).
 *
 * jsdom doesn't implement a real layout engine, so we can't read computed
 * `transition-duration` from a CSSStyleDeclaration. Instead we parse the
 * CSS source for the @media block + the !important transition resets,
 * which is the actual contract: as long as the rule is present and well-
 * formed, browsers will apply it.
 */

import { describe, it, expect, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scrollToSection } from "../shell/scrollToSection.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS_PATH = path.resolve(__dirname, "./course.module.css");
const CSS = fs.readFileSync(CSS_PATH, "utf8");

describe("course.module.css — reduced-motion @media block (FR-023a)", () => {
  it("declares the @media (prefers-reduced-motion: reduce) block", () => {
    expect(CSS).toMatch(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
  });

  it("zeroes transition-duration inside the block (universal selector + !important)", () => {
    const block = extractReducedMotionBlock(CSS);
    expect(block).toMatch(/transition-duration:\s*0\.01ms\s*!important/);
  });

  it("zeroes animation-duration inside the block", () => {
    const block = extractReducedMotionBlock(CSS);
    expect(block).toMatch(/animation-duration:\s*0\.01ms\s*!important/);
  });

  it("forces scroll-behavior: auto inside the block", () => {
    const block = extractReducedMotionBlock(CSS);
    expect(block).toMatch(/scroll-behavior:\s*auto\s*!important/);
  });

  it("scopes the rules to the .course-shell tree (no leak to legacy views)", () => {
    const block = extractReducedMotionBlock(CSS);
    expect(block).toMatch(/\.shell/);
    // The block's selectors must descend from `.shell` (the CSS-module class
    // applied alongside `.course-shell`). The legacy view selectors live
    // outside this block entirely.
    expect(block).not.toMatch(/\bhtml\b/);
    expect(block).not.toMatch(/\bbody\s*\{/);
  });
});

describe("scrollToSection — runtime reduced-motion downgrade", () => {
  it("uses behavior: auto when the prefers-reduced-motion media query matches", () => {
    const el = document.createElement("h2");
    el.id = "rm-section";
    document.body.appendChild(el);
    const scrollSpy = vi.fn();
    el.scrollIntoView = scrollSpy;

    const originalMM = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((q) => ({
      matches: /prefers-reduced-motion/.test(q) && /reduce/.test(q),
      media: q,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    scrollToSection("rm-section");
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "auto", block: "start" });

    window.matchMedia = originalMM;
    document.body.removeChild(el);
  });
});

/* ---------------------------------------------------------------------------
 * helpers
 * ------------------------------------------------------------------------- */

function extractReducedMotionBlock(css) {
  const start = css.search(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
  if (start < 0) return "";
  // Find the matching closing brace of the @media block.
  let depth = 0;
  let i = css.indexOf("{", start);
  if (i < 0) return "";
  const open = i;
  for (; i < css.length; i++) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(open, i + 1);
    }
  }
  return css.slice(open);
}

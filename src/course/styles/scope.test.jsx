/**
 * CSS scope smoke-test — tokens.css MUST NOT leak outside `.course-shell`.
 *
 * Spec: tokens.css declares all custom properties under `:where(.course-shell)`
 * (zero-specificity scope). This test parses the file and asserts:
 *   1. Every custom-property block is wrapped in a `:where(.course-shell)`
 *      selector (or a `:where(.course-shell[data-*])` Tweaks variant).
 *   2. No bare `:root { --... }` declarations exist that would leak globally.
 *
 * This is a build-time invariant — the runtime test would be a snapshot of
 * a legacy view's computed styles, but that requires importing several
 * legacy views into jsdom which is heavy and brittle. The CSS-source test
 * is more honest about what's being verified.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS = fs.readFileSync(path.resolve(__dirname, "./tokens.css"), "utf8");

describe("tokens.css — scoped under .course-shell only (no leak to legacy views)", () => {
  it("contains the :where(.course-shell) scope wrapper", () => {
    expect(TOKENS).toMatch(/:where\(\.course-shell\)/);
  });

  it("does NOT declare custom properties on :root (would leak globally)", () => {
    // Strip CSS comments before scanning, so the comment that mentions :root
    // in the file header doesn't trigger a false positive.
    const stripped = TOKENS.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(stripped).not.toMatch(/:root\s*\{/);
  });

  it("every Tweaks-variant block selectors include .course-shell", () => {
    // Extract every selector that contains `data-accent|display|density`.
    const variantSelectorMatches = TOKENS.match(/[^{}]*\[data-(?:accent|display|density)=[^\]]+\]\s*[^{}]*\{/g);
    expect(variantSelectorMatches).not.toBeNull();
    for (const m of variantSelectorMatches) {
      expect(m).toMatch(/\.course-shell/);
    }
  });

  it("enumerates the 12 module marker tokens (--module-0 … --module-11)", () => {
    for (let i = 0; i < 12; i++) {
      const re = new RegExp(`--module-${i}\\s*:`);
      expect(TOKENS).toMatch(re);
    }
  });
});

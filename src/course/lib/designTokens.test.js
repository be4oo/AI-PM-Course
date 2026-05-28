/**
 * designTokens + moduleColor invariants.
 *
 * Spec refs:
 *   - FR-004: module marker palette is a fixed set
 *   - FR-025: exactly 4 enumerated Tweaks accent variants
 *   - SC-008 ties the same invariant on the Practice rail (tested in T032)
 */

import { describe, it, expect } from "vitest";
import {
  BASE_TOKENS,
  ACCENT_VARIANTS,
  ACCENT_VARIANT_IDS,
  TWEAKS_DEFAULTS,
  DISPLAY_OPTIONS,
  DENSITY_OPTIONS,
  isValidAccent,
  accent,
} from "./designTokens.js";
import {
  MODULE_MARKER_PALETTE,
  MAX_MODULES,
  moduleColor,
  moduleColorVar,
} from "./moduleColor.js";

const HEX = /^#[0-9a-f]{6}$/i;

describe("designTokens", () => {
  it("base palette uses 6-digit hex values", () => {
    for (const [, value] of Object.entries(BASE_TOKENS)) {
      expect(value).toMatch(HEX);
    }
  });

  it("exposes exactly 4 enumerated Tweaks accent variants", () => {
    expect(ACCENT_VARIANT_IDS).toHaveLength(4);
    expect([...ACCENT_VARIANT_IDS].sort()).toEqual(
      ["copper", "ink-blue", "iron", "sage"].sort(),
    );
  });

  it("every accent variant has a hex value and unique label", () => {
    const labels = new Set();
    for (const id of ACCENT_VARIANT_IDS) {
      const v = ACCENT_VARIANTS[id];
      expect(v.id).toBe(id);
      expect(v.value).toMatch(HEX);
      expect(typeof v.label).toBe("string");
      expect(labels.has(v.label)).toBe(false);
      labels.add(v.label);
    }
  });

  it("TWEAKS_DEFAULTS reference only enumerated values", () => {
    expect(ACCENT_VARIANT_IDS).toContain(TWEAKS_DEFAULTS.accent);
    expect(DISPLAY_OPTIONS).toContain(TWEAKS_DEFAULTS.display);
    expect(DENSITY_OPTIONS).toContain(TWEAKS_DEFAULTS.density);
  });

  it("isValidAccent / accent fallback to default on unknown id", () => {
    expect(isValidAccent("copper")).toBe(true);
    expect(isValidAccent("neon")).toBe(false);
    expect(accent("neon").id).toBe(TWEAKS_DEFAULTS.accent);
  });
});

describe("moduleColor", () => {
  it("has exactly 12 marker entries", () => {
    expect(MODULE_MARKER_PALETTE).toHaveLength(12);
    expect(MAX_MODULES).toBe(12);
  });

  it("marker palette is all 6-digit hex with no duplicates", () => {
    const seen = new Set();
    for (const v of MODULE_MARKER_PALETTE) {
      expect(v).toMatch(HEX);
      expect(seen.has(v)).toBe(false);
      seen.add(v);
    }
  });

  it("moduleColor returns the matching slot for valid indices", () => {
    for (let i = 0; i < 12; i++) {
      expect(moduleColor(i)).toBe(MODULE_MARKER_PALETTE[i]);
    }
  });

  it("wraps past the palette size with a wrap-around (warn only)", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(moduleColor(13)).toBe(MODULE_MARKER_PALETTE[1]);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("falls back to index 0 for invalid inputs", () => {
    expect(moduleColor(-1)).toBe(MODULE_MARKER_PALETTE[0]);
    expect(moduleColor(NaN)).toBe(MODULE_MARKER_PALETTE[0]);
    expect(moduleColor("two")).toBe(MODULE_MARKER_PALETTE[0]);
  });

  it("moduleColorVar names follow the --module-N convention", () => {
    expect(moduleColorVar(0)).toBe("--module-0");
    expect(moduleColorVar(11)).toBe("--module-11");
    expect(moduleColorVar(13)).toBe("--module-1"); // wraps
  });
});

import { vi } from "vitest";

/**
 * @vitest-environment jsdom
 *
 * Self-test for the viewport helper. The helper itself is test infrastructure,
 * so this is a smoke test that locks in the contract.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { setViewport, withViewport, VIEWPORTS } from "./viewport.js";

describe("viewport helper", () => {
  beforeEach(() => {
    // Restore a known good default between tests.
    setViewport(1024);
  });

  it("exports the four supported viewports as a frozen array", () => {
    expect(VIEWPORTS).toEqual([375, 768, 1024, 1440]);
    expect(Object.isFrozen(VIEWPORTS)).toBe(true);
  });

  it("snaps window.innerWidth to the requested width", () => {
    setViewport(375);
    expect(window.innerWidth).toBe(375);
    setViewport(1440);
    expect(window.innerWidth).toBe(1440);
  });

  it("evaluates min-width media queries against the active viewport", () => {
    setViewport(1024);
    expect(window.matchMedia("(min-width: 1024px)").matches).toBe(true);
    expect(window.matchMedia("(min-width: 1280px)").matches).toBe(false);

    setViewport(375);
    expect(window.matchMedia("(min-width: 1024px)").matches).toBe(false);
    expect(window.matchMedia("(max-width: 768px)").matches).toBe(true);
  });

  it("restore() reverts width and matchMedia to the prior state", () => {
    setViewport(1024);
    const restore = setViewport(375);
    expect(window.innerWidth).toBe(375);
    restore();
    expect(window.innerWidth).toBe(1024);
    expect(window.matchMedia("(min-width: 1024px)").matches).toBe(true);
  });

  it("withViewport restores even when the body throws", async () => {
    setViewport(1024);
    await expect(
      withViewport(375, () => {
        expect(window.innerWidth).toBe(375);
        throw new Error("simulated");
      }),
    ).rejects.toThrow("simulated");
    expect(window.innerWidth).toBe(1024);
  });

  it.each(VIEWPORTS)("works for the supported viewport %i", async (width) => {
    await withViewport(width, () => {
      expect(window.innerWidth).toBe(width);
    });
  });
});

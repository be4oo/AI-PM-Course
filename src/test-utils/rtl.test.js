/**
 * @vitest-environment jsdom
 *
 * Self-test for the RTL helper. Locks in the contract for course-shell tests.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { setDir, withDir, expectedMarkerSide } from "./rtl.js";

describe("rtl helper", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("dir");
    document.documentElement.removeAttribute("lang");
  });

  it("sets dir on the document element", () => {
    setDir("rtl");
    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
  });

  it("rejects invalid directions", () => {
    expect(() => setDir("ttb")).toThrow(/ltr.*rtl/);
  });

  it("sets lang when supplied", () => {
    setDir("rtl", { lang: "ar" });
    expect(document.documentElement.getAttribute("lang")).toBe("ar");
  });

  it("restore() reverts both dir and lang to prior state", () => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
    const restore = setDir("rtl", { lang: "ar" });
    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
    restore();
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("restore() removes attrs that did not exist before", () => {
    const restore = setDir("rtl", { lang: "ar" });
    restore();
    expect(document.documentElement.hasAttribute("dir")).toBe(false);
    expect(document.documentElement.hasAttribute("lang")).toBe(false);
  });

  it("withDir restores even when the body throws", async () => {
    await expect(
      withDir("rtl", () => {
        expect(document.documentElement.getAttribute("dir")).toBe("rtl");
        throw new Error("simulated");
      }),
    ).rejects.toThrow("simulated");
    expect(document.documentElement.hasAttribute("dir")).toBe(false);
  });

  it("expectedMarkerSide flips with direction", () => {
    expect(expectedMarkerSide("ltr")).toBe("left");
    expect(expectedMarkerSide("rtl")).toBe("right");
  });
});

import { describe, expect, it } from "vitest";
import {
  isAtModuleBoundary,
  nextLessonPosition,
  prevLessonPosition,
} from "./lessonNavigation";

const curriculum = [
  { lessons: [{ id: "1.1" }, { id: "1.2" }] },
  { lessons: [{ id: "2.1" }] },
  { lessons: [{ id: "3.1" }, { id: "3.2" }, { id: "3.3" }] },
];

describe("nextLessonPosition", () => {
  it("advances within a module", () => {
    expect(nextLessonPosition({ mi: 0, li: 0 }, curriculum)).toEqual({ mi: 0, li: 1 });
  });

  it("crosses a module boundary at end-of-module", () => {
    expect(nextLessonPosition({ mi: 0, li: 1 }, curriculum)).toEqual({ mi: 1, li: 0 });
  });

  it("returns null at the very last lesson of the curriculum", () => {
    expect(nextLessonPosition({ mi: 2, li: 2 }, curriculum)).toBeNull();
  });

  it("returns null for an unknown module index", () => {
    expect(nextLessonPosition({ mi: 99, li: 0 }, curriculum)).toBeNull();
  });
});

describe("prevLessonPosition", () => {
  it("steps back within a module", () => {
    expect(prevLessonPosition({ mi: 2, li: 2 }, curriculum)).toEqual({ mi: 2, li: 1 });
  });

  it("crosses backwards into the previous module's last lesson", () => {
    expect(prevLessonPosition({ mi: 1, li: 0 }, curriculum)).toEqual({ mi: 0, li: 1 });
    expect(prevLessonPosition({ mi: 2, li: 0 }, curriculum)).toEqual({ mi: 1, li: 0 });
  });

  it("returns null at the very first lesson", () => {
    expect(prevLessonPosition({ mi: 0, li: 0 }, curriculum)).toBeNull();
  });
});

describe("isAtModuleBoundary", () => {
  it("is true at the last lesson of a non-final module", () => {
    expect(isAtModuleBoundary({ mi: 0, li: 1 }, curriculum)).toBe(true);
    expect(isAtModuleBoundary({ mi: 1, li: 0 }, curriculum)).toBe(true);
  });

  it("is false mid-module", () => {
    expect(isAtModuleBoundary({ mi: 2, li: 0 }, curriculum)).toBe(false);
    expect(isAtModuleBoundary({ mi: 2, li: 1 }, curriculum)).toBe(false);
  });

  it("is false at the very last lesson of the very last module", () => {
    expect(isAtModuleBoundary({ mi: 2, li: 2 }, curriculum)).toBe(false);
  });

  it("is false for an unknown module", () => {
    expect(isAtModuleBoundary({ mi: 99, li: 0 }, curriculum)).toBe(false);
  });
});

import { describe, expect, it, vi } from "vitest";
import {
  applyImportedProgress,
  snapshotFileName,
} from "./progressSnapshot";
import { buildProgressSnapshot } from "../data/learningExperience";

describe("snapshotFileName", () => {
  it("uses YYYY-MM-DD date prefix", () => {
    const name = snapshotFileName(new Date("2026-04-17T10:30:00Z"));
    expect(name).toBe("ai-pm-progress-2026-04-17.json");
  });
});

describe("applyImportedProgress", () => {
  function buildSetters() {
    return {
      setCompleted: vi.fn(),
      setBookmarks: vi.fn(),
      setActiveMod: vi.fn(),
      setActiveLesson: vi.fn(),
      setReviewChecks: vi.fn(),
      setCapstoneNotes: vi.fn(),
      setStudyMode: vi.fn(),
      setLessonStates: vi.fn(),
      setWeakConcepts: vi.fn(),
    };
  }

  it("returns the parser error for malformed input", () => {
    const result = applyImportedProgress("{not json", buildSetters());
    expect(result.ok).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("hydrates Set fields, primitives, and runs the 8.5 → 8-5 migration", () => {
    const setters = buildSetters();
    const snapshot = buildProgressSnapshot({
      completed: ["8.5-8.5.1", "1-1.1"],
      bookmarks: ["1-1.2"],
      activeMod: 3,
      activeLesson: 2,
      capstoneNotes: "ship it",
      studyMode: "deep",
    });
    const result = applyImportedProgress(snapshot, setters);
    expect(result.ok).toBe(true);

    expect(setters.setCompleted).toHaveBeenCalledOnce();
    const completedArg = setters.setCompleted.mock.calls[0][0];
    expect(completedArg).toBeInstanceOf(Set);
    expect(completedArg.has("8-5-8.5.1")).toBe(true);
    expect(completedArg.has("1-1.1")).toBe(true);

    expect(setters.setActiveMod).toHaveBeenCalledWith(3);
    expect(setters.setActiveLesson).toHaveBeenCalledWith(2);
    expect(setters.setCapstoneNotes).toHaveBeenCalledWith("ship it");
    expect(setters.setStudyMode).toHaveBeenCalledWith("deep");
  });

  it("only invokes setters for keys present in the snapshot", () => {
    const setters = buildSetters();
    const snapshot = buildProgressSnapshot({ activeMod: 1 });
    applyImportedProgress(snapshot, setters);
    expect(setters.setActiveMod).toHaveBeenCalled();
    expect(setters.setCompleted).not.toHaveBeenCalled();
    expect(setters.setBookmarks).not.toHaveBeenCalled();
    expect(setters.setStudyMode).not.toHaveBeenCalled();
  });

  it("migrates legacy weakConcepts to fill level/nextReview defaults", () => {
    const setters = buildSetters();
    const now = Date.now();
    const snapshot = buildProgressSnapshot({
      weakConcepts: [{ lessonKey: "1-1.1", title: "X" }],
    });
    applyImportedProgress(snapshot, setters);
    const arg = setters.setWeakConcepts.mock.calls[0][0];
    expect(arg).toHaveLength(1);
    expect(arg[0].level).toBe(0);
    expect(arg[0].nextReview).toBeGreaterThanOrEqual(now);
  });

  it("missing setter keys do not throw", () => {
    const minimal = { setCompleted: vi.fn() };
    const snapshot = buildProgressSnapshot({
      completed: ["1-1.1"],
      activeMod: 5,
      studyMode: "fast",
    });
    const result = applyImportedProgress(snapshot, minimal);
    expect(result.ok).toBe(true);
    expect(minimal.setCompleted).toHaveBeenCalledOnce();
  });
});

import { describe, expect, it } from "vitest";
import {
  LESSON_PROGRESS_STATES,
  lessonRuntimeEstimate,
  ensureLessonFrame,
  defaultArtifactChecklist,
  parseProgressSnapshot,
  buildProgressSnapshot,
} from "./learningExperience";

describe("learningExperience", () => {
  it("provides deterministic runtime fallback", () => {
    const lesson = { type: "strategy", apply: "Do the thing." };
    const runtime = lessonRuntimeEstimate(lesson);
    expect(runtime.readMin).toBeGreaterThan(0);
    expect(runtime.exerciseMin).toBeGreaterThan(0);
    expect(runtime.totalMin).toBe(runtime.readMin + runtime.exerciseMin);
  });

  it("enforces lesson frame minimum contract", () => {
    const frame = ensureLessonFrame("Module X", { title: "Test Lesson", content: "", keys: [] }, null);
    expect(frame.concept.length).toBeGreaterThan(0);
    expect(frame.takeaways.length).toBeGreaterThan(0);
    expect(frame.leadershipNote.length).toBeGreaterThan(0);
    expect(frame.toolingLab.tools.length).toBeGreaterThan(0);
    expect(frame.reviewQuestion.length).toBeGreaterThan(0);
  });

  it("creates artifact checklist with stable items", () => {
    const frame = ensureLessonFrame("Module X", { title: "Y", content: "Z", keys: [] }, null);
    const checklist = defaultArtifactChecklist(frame);
    expect(checklist).toHaveLength(3);
    expect(checklist.every((item) => item.done === false)).toBe(true);
  });

  it("round-trips progress snapshot payload and validates schema", () => {
    const raw = buildProgressSnapshot({ lessonStates: { "1-1.1": LESSON_PROGRESS_STATES[1] } });
    const parsed = parseProgressSnapshot(raw);
    expect(parsed.ok).toBe(true);
    expect(parsed.data.lessonStates["1-1.1"]).toBe("Read");
  });

  it("rejects malformed import payload safely", () => {
    const parsed = parseProgressSnapshot("{");
    expect(parsed.ok).toBe(false);
    expect(parsed.reason.length).toBeGreaterThan(0);
  });
});

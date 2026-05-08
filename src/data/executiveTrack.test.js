import { describe, expect, it } from "vitest";
import { EXECUTIVE_TRACK } from "./executiveTrack";
import { curriculum } from "./curriculum";

describe("EXECUTIVE_TRACK", () => {
  it("has top-level title, audience, and promise strings", () => {
    expect(EXECUTIVE_TRACK.title).toBeTruthy();
    expect(EXECUTIVE_TRACK.audience).toBeTruthy();
    expect(EXECUTIVE_TRACK.promise).toBeTruthy();
  });

  it("has modules with titles, lesson lists, and outcomes", () => {
    expect(EXECUTIVE_TRACK.modules.length).toBeGreaterThan(0);
    for (const m of EXECUTIVE_TRACK.modules) {
      expect(m.title).toBeTruthy();
      expect(Array.isArray(m.lessons)).toBe(true);
      expect(m.lessons.length).toBeGreaterThan(0);
      expect(Array.isArray(m.outcomes)).toBe(true);
      expect(m.outcomes.length).toBeGreaterThan(0);
    }
  });

  it("module titles are unique", () => {
    const titles = EXECUTIVE_TRACK.modules.map((m) => m.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("every referenced lesson id resolves to a real lesson", () => {
    const knownLessonIds = new Set(
      curriculum.flatMap((mod) => mod.lessons.map((l) => l.id))
    );
    const broken = [];
    for (const m of EXECUTIVE_TRACK.modules) {
      for (const lessonId of m.lessons) {
        if (!knownLessonIds.has(lessonId)) {
          broken.push(`${m.title}: ${lessonId}`);
        }
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("has leadership questions worded as questions", () => {
    expect(EXECUTIVE_TRACK.leadershipQuestions.length).toBeGreaterThan(0);
    for (const q of EXECUTIVE_TRACK.leadershipQuestions) {
      expect(q).toMatch(/\?$/);
    }
  });
});

import { describe, expect, it } from "vitest";
import { curriculum } from "./curriculum";
import { mobileCurriculum } from "./curriculum-mobile";

const LESSON_TYPES = new Set(["concept", "framework", "technical", "systems", "practice"]);

describe("mobile curriculum data integrity", () => {
  it("is non-empty and every module has lessons", () => {
    expect(mobileCurriculum.length).toBeGreaterThan(0);
    for (const module of mobileCurriculum) {
      expect(module.id).toMatch(/^mob-\d+$/);
      expect(module.lessons.length).toBeGreaterThan(0);
    }
  });

  it("has every required lesson field and valid ids, types, and dates", () => {
    for (const module of mobileCurriculum) {
      for (const lesson of module.lessons) {
        expect(lesson.id).toMatch(/^mob-\d+\.\d+$/);
        expect(lesson.title).toBeTruthy();
        expect(LESSON_TYPES.has(lesson.type)).toBe(true);
        expect(typeof lesson.content).toBe("string");
        expect(lesson.quiz).toEqual({ q: expect.any(String), a: expect.any(String) });
        expect(typeof lesson.apply).toBe("string");
        expect(Array.isArray(lesson.keys)).toBe(true);
        expect(lesson.meta?.lastVerified).toBeTruthy();
        expect(Number.isNaN(Date.parse(lesson.meta.lastVerified))).toBe(false);
      }
    }
  });

  it("has no module or lesson id collisions with the AI PM curriculum", () => {
    const modules = [...curriculum, ...mobileCurriculum];
    const moduleIds = modules.map((module) => module.id);
    const lessonIds = modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));

    expect(new Set(moduleIds).size).toBe(moduleIds.length);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
  });
});

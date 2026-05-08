import { describe, expect, it } from "vitest";
import { curriculum } from "./curriculum";
import { getFreshnessBadgeData } from "../utils/freshness";

describe("curriculum data integrity", () => {
  it("has at least one module and every module has lessons", () => {
    expect(curriculum.length).toBeGreaterThan(0);
    for (const module of curriculum) {
      expect(module.id, `module ${module.module} missing id`).toBeDefined();
      expect(module.title).toBeTruthy();
      expect(Array.isArray(module.lessons)).toBe(true);
      expect(module.lessons.length).toBeGreaterThan(0);
    }
  });

  it("lesson ids are globally unique across modules", () => {
    const seen = new Map();
    for (const module of curriculum) {
      for (const lesson of module.lessons) {
        expect(lesson.id, `module ${module.module} has a lesson with no id`).toBeTruthy();
        if (seen.has(lesson.id)) {
          throw new Error(
            `Duplicate lesson id "${lesson.id}" in ${module.module}; first seen in ${seen.get(lesson.id)}`
          );
        }
        seen.set(lesson.id, module.module);
      }
    }
  });

  it("every lesson has the required fields", () => {
    for (const module of curriculum) {
      for (const lesson of module.lessons) {
        expect(lesson.title, `${lesson.id} missing title`).toBeTruthy();
        expect(lesson.type, `${lesson.id} missing type`).toBeTruthy();
        expect(typeof lesson.content, `${lesson.id} content not a string`).toBe("string");
      }
    }
  });

  it("any lesson with meta.lastVerified parses cleanly (no invalid status)", () => {
    const now = new Date();
    const broken = [];
    for (const module of curriculum) {
      for (const lesson of module.lessons) {
        if (!lesson.meta?.lastVerified) continue;
        const badge = getFreshnessBadgeData(lesson.meta, now);
        if (badge.status === "invalid") {
          broken.push(`${lesson.id}: ${badge.reason}`);
        }
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });
});

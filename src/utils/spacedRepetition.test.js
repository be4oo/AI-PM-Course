import { describe, expect, it } from "vitest";
import {
  SR_DIFFICULTIES,
  addWeakConcept,
  migrateWeakConcept,
  rateWeakConcept,
} from "./spacedRepetition";

const NOW = new Date("2026-04-17T00:00:00Z").getTime();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const baseItem = {
  lessonKey: "1-1.1",
  lessonId: "1.1",
  title: "AI Paradigm Shift",
  prompt: "What is a Type B PM?",
  level: 2,
  nextReview: NOW - DAY,
};

describe("rateWeakConcept", () => {
  it("forgot resets level to 0 and schedules ~1 hour later", () => {
    const out = rateWeakConcept(baseItem, "forgot", NOW);
    expect(out.level).toBe(0);
    // 0.04 days = 57.6 minutes -> within tolerance of 1 hour
    expect(out.nextReview).toBeGreaterThan(NOW + 30 * 60 * 1000);
    expect(out.nextReview).toBeLessThan(NOW + 90 * 60 * 1000);
  });

  it("hard keeps level and schedules 1 day later", () => {
    const out = rateWeakConcept(baseItem, "hard", NOW);
    expect(out.level).toBe(baseItem.level);
    expect(out.nextReview).toBe(NOW + DAY);
  });

  it("good increments level by 1; delay is 2^newLevel days", () => {
    const out = rateWeakConcept(baseItem, "good", NOW);
    expect(out.level).toBe(3);
    expect(out.nextReview).toBe(NOW + 8 * DAY); // 2^3
  });

  it("easy increments level by 2; delay is 4^newLevel days", () => {
    const out = rateWeakConcept(baseItem, "easy", NOW);
    expect(out.level).toBe(4);
    expect(out.nextReview).toBe(NOW + Math.pow(4, 4) * DAY);
  });

  it("treats missing level as 0", () => {
    const fresh = { lessonKey: "x" };
    const out = rateWeakConcept(fresh, "good", NOW);
    expect(out.level).toBe(1);
    expect(out.nextReview).toBe(NOW + 2 * DAY);
  });

  it("returns the original item for unknown grades", () => {
    const out = rateWeakConcept(baseItem, "wat", NOW);
    expect(out).toBe(baseItem);
  });

  it("preserves unrelated fields", () => {
    const out = rateWeakConcept(baseItem, "good", NOW);
    expect(out.lessonKey).toBe(baseItem.lessonKey);
    expect(out.title).toBe(baseItem.title);
    expect(out.prompt).toBe(baseItem.prompt);
  });

  it("exports the four supported difficulty grades", () => {
    expect(SR_DIFFICULTIES).toEqual(["forgot", "hard", "good", "easy"]);
  });
});

describe("migrateWeakConcept", () => {
  it("fills in level=0 and nextReview=now when missing", () => {
    const out = migrateWeakConcept({ lessonKey: "1-1.1" }, NOW);
    expect(out.level).toBe(0);
    expect(out.nextReview).toBe(NOW);
  });

  it("leaves existing level and nextReview untouched", () => {
    const existing = { lessonKey: "1-1.1", level: 3, nextReview: NOW + 5 * DAY };
    const out = migrateWeakConcept(existing, NOW);
    expect(out.level).toBe(3);
    expect(out.nextReview).toBe(NOW + 5 * DAY);
  });

  it("returns non-object inputs unchanged", () => {
    expect(migrateWeakConcept(null, NOW)).toBeNull();
    expect(migrateWeakConcept(undefined, NOW)).toBeUndefined();
  });
});

describe("addWeakConcept", () => {
  const list = [
    { lessonKey: "1-1.1", title: "A" },
    { lessonKey: "1-1.2", title: "B" },
  ];

  it("appends a new entry", () => {
    const next = addWeakConcept(list, { lessonKey: "2-2.1", title: "C" });
    expect(next).toHaveLength(3);
    expect(next[2].lessonKey).toBe("2-2.1");
  });

  it("returns the original list when a concept with that lessonKey already exists", () => {
    const next = addWeakConcept(list, { lessonKey: "1-1.1", title: "duplicate" });
    expect(next).toBe(list);
  });

  it("ignores entries without a lessonKey", () => {
    const next = addWeakConcept(list, { title: "no key" });
    expect(next).toBe(list);
  });
});

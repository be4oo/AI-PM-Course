/**
 * progressSnapshot — schema + round-trip contract.
 *
 * Spec/contract refs:
 *   - SC-005 (round-trip equality)
 *   - FR-010 (export/import) + Edge Cases (malformed JSON, unknown lesson IDs)
 *   - contracts/progress-snapshot.schema.json
 */

import { describe, it, expect } from "vitest";
import { buildSnapshot, parseSnapshot, SCHEMA_ID, STUDY_MODES } from "./progressSnapshot.js";

const FIXED_NOW = new Date("2026-05-26T11:30:00.000Z");

const STATE = {
  completedLessonIds: ["m1-l1", "m1-l2", "m2-l1"],
  bookmarkedLessonIds: ["m2-l3"],
  lastReadLessonId: "m2-l1",
  studyMode: "deep",
  tweaks: { accent: "copper", display: "serif", density: "roomy" },
  streak: { current: 11, best: 11, lastReadDate: "2026-05-26" },
};

describe("buildSnapshot", () => {
  it("emits the documented schema discriminator", () => {
    const snap = buildSnapshot(STATE, { now: () => FIXED_NOW });
    expect(snap.schema).toBe(SCHEMA_ID);
  });

  it("emits exportedAt as ISO 8601 UTC", () => {
    const snap = buildSnapshot(STATE, { now: () => FIXED_NOW });
    expect(snap.exportedAt).toBe("2026-05-26T11:30:00.000Z");
  });

  it("dedupes completed and bookmarked IDs", () => {
    const snap = buildSnapshot({
      ...STATE,
      completedLessonIds: ["a", "a", "b"],
      bookmarkedLessonIds: ["x", "x"],
    });
    expect(snap.completedLessonIds).toEqual(["a", "b"]);
    expect(snap.bookmarkedLessonIds).toEqual(["x"]);
  });

  it("falls back to 'deep' study mode on unknown values", () => {
    const snap = buildSnapshot({ ...STATE, studyMode: "WRONG" });
    expect(snap.studyMode).toBe("deep");
  });

  it("falls back to defaults for unknown tweaks values", () => {
    const snap = buildSnapshot({
      ...STATE,
      tweaks: { accent: "neon", display: "italic", density: "wide" },
    });
    expect(snap.tweaks).toEqual({ accent: "copper", display: "serif", density: "roomy" });
  });

  it("clamps streak.current/best to 0..366", () => {
    const snap = buildSnapshot({
      ...STATE,
      streak: { current: -3, best: 99999, lastReadDate: "2026-05-26" },
    });
    expect(snap.streak.current).toBe(0);
    expect(snap.streak.best).toBe(366);
  });

  it("nulls a non-ISO lastReadDate", () => {
    const snap = buildSnapshot({
      ...STATE,
      streak: { current: 1, best: 1, lastReadDate: "not-a-date" },
    });
    expect(snap.streak.lastReadDate).toBeNull();
  });
});

describe("parseSnapshot", () => {
  it("round-trips a valid snapshot — SC-005", () => {
    const snap = buildSnapshot(STATE, { now: () => FIXED_NOW });
    const result = parseSnapshot(JSON.stringify(snap));
    expect(result.ok).toBe(true);
    expect(result.state.completedLessonIds).toEqual(STATE.completedLessonIds);
    expect(result.state.bookmarkedLessonIds).toEqual(STATE.bookmarkedLessonIds);
    expect(result.state.lastReadLessonId).toBe(STATE.lastReadLessonId);
    expect(result.state.studyMode).toBe(STATE.studyMode);
    expect(result.state.tweaks).toEqual(STATE.tweaks);
    expect(result.state.streak).toEqual(STATE.streak);
  });

  it("accepts a parsed object directly", () => {
    const snap = buildSnapshot(STATE);
    const result = parseSnapshot(snap);
    expect(result.ok).toBe(true);
    expect(result.error).toBeNull();
  });

  it("rejects malformed JSON with a readable error", () => {
    const result = parseSnapshot("{not-json");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/Invalid JSON/);
  });

  it("rejects an unsupported major schema version", () => {
    const result = parseSnapshot({ ...buildSnapshot(STATE), schema: "course-progress/v2" });
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/Unsupported schema version/);
  });

  it("rejects a missing schema discriminator", () => {
    const snap = buildSnapshot(STATE);
    delete snap.schema;
    const result = parseSnapshot(snap);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/Missing or unrecognized schema/);
  });

  it("counts and drops unknown lesson IDs when knownLessonIds supplied", () => {
    const snap = buildSnapshot({
      ...STATE,
      completedLessonIds: ["m1-l1", "ghost-a", "ghost-b"],
      bookmarkedLessonIds: ["m2-l3", "ghost-c"],
      lastReadLessonId: "ghost-c",
    });
    const result = parseSnapshot(snap, {
      knownLessonIds: new Set(["m1-l1", "m2-l3"]),
    });
    expect(result.ok).toBe(true);
    expect(result.droppedLessons).toBe(4); // 2 completed + 1 bookmark + 1 lastRead
    expect(result.state.completedLessonIds).toEqual(["m1-l1"]);
    expect(result.state.bookmarkedLessonIds).toEqual(["m2-l3"]);
    expect(result.state.lastReadLessonId).toBeNull();
  });

  it("rejects shape violations (non-array completedLessonIds)", () => {
    const snap = buildSnapshot(STATE);
    snap.completedLessonIds = "oops";
    const result = parseSnapshot(snap);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/completedLessonIds must be an array/);
  });

  it.each(STUDY_MODES)("accepts study mode %s", (mode) => {
    const snap = buildSnapshot({ ...STATE, studyMode: mode });
    const r = parseSnapshot(snap);
    expect(r.ok).toBe(true);
    expect(r.state.studyMode).toBe(mode);
  });

  it("validates accent / display / density against enums", () => {
    const snap = buildSnapshot(STATE);
    snap.tweaks.accent = "WRONG";
    const r = parseSnapshot(snap);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/tweaks\.accent/);
  });
});

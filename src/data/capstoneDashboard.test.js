import { describe, expect, it } from "vitest";
import {
  CAPSTONE_MILESTONES,
  CAPSTONE_READINESS_BANDS,
} from "./capstoneDashboard";

describe("CAPSTONE_MILESTONES", () => {
  it("milestone weights sum to 100", () => {
    const total = CAPSTONE_MILESTONES.reduce((sum, m) => sum + m.weight, 0);
    expect(total).toBe(100);
  });

  it("milestone ids are unique", () => {
    const ids = CAPSTONE_MILESTONES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every milestone has the required shape", () => {
    for (const m of CAPSTONE_MILESTONES) {
      expect(m.id).toBeTruthy();
      expect(m.title).toBeTruthy();
      expect(m.description).toBeTruthy();
      expect(typeof m.weight).toBe("number");
      expect(m.weight).toBeGreaterThan(0);
    }
  });
});

describe("CAPSTONE_READINESS_BANDS", () => {
  it("are sorted descending by min so .find() picks the highest match", () => {
    for (let i = 1; i < CAPSTONE_READINESS_BANDS.length; i++) {
      expect(CAPSTONE_READINESS_BANDS[i - 1].min).toBeGreaterThan(
        CAPSTONE_READINESS_BANDS[i].min
      );
    }
  });

  it("includes a 0-floor band so any score 0..100 has a matching band", () => {
    const floor = CAPSTONE_READINESS_BANDS[CAPSTONE_READINESS_BANDS.length - 1];
    expect(floor.min).toBe(0);
    for (const score of [0, 25, 59, 60, 75, 89, 90, 100]) {
      const band = CAPSTONE_READINESS_BANDS.find((b) => score >= b.min);
      expect(band, `no band for score ${score}`).toBeDefined();
    }
  });

  it("every band has label and color", () => {
    for (const b of CAPSTONE_READINESS_BANDS) {
      expect(b.label).toBeTruthy();
      expect(b.color).toMatch(/^#[0-9A-Fa-f]{3,8}$/);
    }
  });
});

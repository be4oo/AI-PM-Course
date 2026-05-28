import { describe, expect, it } from "vitest";
import { COVERAGE_MATRIX, COVERAGE_STATUS } from "./coverageMatrix";

describe("coverageMatrix", () => {
  it("exposes the three known status values", () => {
    expect(COVERAGE_STATUS).toEqual({
      covered: "covered",
      partial: "partial",
      missing: "missing",
    });
  });

  it("every row has the required shape", () => {
    expect(COVERAGE_MATRIX.length).toBeGreaterThan(0);
    for (const row of COVERAGE_MATRIX) {
      expect(row.area).toBeTruthy();
      expect(row.notes).toBeTruthy();
      expect(row.ownerRole).toBeTruthy();
      expect(row.cadence).toBeTruthy();
      expect(row.verificationMethod).toBeTruthy();
    }
  });

  it("every status maps to a known COVERAGE_STATUS value", () => {
    const allowed = new Set(Object.values(COVERAGE_STATUS));
    const broken = COVERAGE_MATRIX.filter((row) => !allowed.has(row.status));
    expect(broken.map((r) => `${r.area}: ${r.status}`)).toEqual([]);
  });

  it("area labels are unique", () => {
    const areas = COVERAGE_MATRIX.map((r) => r.area);
    expect(new Set(areas).size).toBe(areas.length);
  });
});

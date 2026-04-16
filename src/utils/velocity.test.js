import { describe, expect, it } from "vitest";
import { createHistoryEntry } from "./reviewHistory";
import { buildVelocityScore, buildVelocitySnapshot } from "./velocity";

function makeEntry(scoreBase) {
  return createHistoryEntry({
    submission: { artifactTitle: `Artifact ${scoreBase}`, content: "Problem, eval, risk, launch" },
    result: {
      summary: "Review result",
      scores: {
        problemFraming: scoreBase,
        systemDesign: scoreBase,
        trustDesign: scoreBase,
        evaluationQuality: scoreBase,
        safetyControls: scoreBase,
        operationalReadiness: scoreBase,
      },
    },
  });
}

describe("velocity", () => {
  it("returns a calibration message when there are fewer than two reviews", () => {
    const snapshot = buildVelocitySnapshot([makeEntry(2)]);
    expect(snapshot.hasEnoughHistory).toBe(false);
  });

  it("returns a trend but no stable grade when there are only two reviews", () => {
    const history = [makeEntry(1), makeEntry(2)];
    const snapshot = buildVelocitySnapshot(history);
    const score = buildVelocityScore(history);
    expect(snapshot.hasEnoughHistory).toBe(true);
    expect(score.score).toBeNull();
  });

  it("assigns a higher velocity score to improving histories", () => {
    const score = buildVelocityScore([makeEntry(1), makeEntry(2), makeEntry(3)]);
    expect(score.score).toBeGreaterThanOrEqual(2);
  });

  it("flags remediation targets when a dimension stays low for three reviews", () => {
    const history = [
      createHistoryEntry({
        submission: { artifactTitle: "One", content: "x" },
        result: {
          summary: "One",
          scores: {
            problemFraming: 1,
            systemDesign: 3,
            trustDesign: 3,
            evaluationQuality: 3,
            safetyControls: 3,
            operationalReadiness: 3,
          },
        },
      }),
      createHistoryEntry({
        submission: { artifactTitle: "Two", content: "x" },
        result: {
          summary: "Two",
          scores: {
            problemFraming: 1,
            systemDesign: 3,
            trustDesign: 3,
            evaluationQuality: 3,
            safetyControls: 3,
            operationalReadiness: 3,
          },
        },
      }),
      createHistoryEntry({
        submission: { artifactTitle: "Three", content: "x" },
        result: {
          summary: "Three",
          scores: {
            problemFraming: 1,
            systemDesign: 3,
            trustDesign: 3,
            evaluationQuality: 3,
            safetyControls: 3,
            operationalReadiness: 3,
          },
        },
      }),
    ];
    const snapshot = buildVelocitySnapshot(history);
    expect(snapshot.remediationTargets).toContain("Problem Framing and Value");
  });
});

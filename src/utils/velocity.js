import { REVIEW_DIMENSIONS } from "../data/reviewerPersonas";
import { normalizeReviewHistory } from "./reviewHistory";

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function buildVelocitySnapshot(history) {
  const complete = normalizeReviewHistory(history).filter(
    (entry) => entry.result?.status === "complete"
  );

  if (complete.length < 2) {
    return {
      hasEnoughHistory: false,
      message: "Submit at least two reviews to unlock trend lines.",
      points: [],
      rollingAverages: [],
      remediationTargets: [],
    };
  }

  const points = complete.map((entry, index) => ({
    index: index + 1,
    id: entry.id,
    createdAt: entry.createdAt,
    scores: entry.result.scores,
    average: average(Object.values(entry.result.scores || {})),
  }));

  const rollingAverages = points.map((point, index) => {
    const window = points.slice(Math.max(0, index - 2), index + 1);
    return {
      ...point,
      rollingAverage: Number(average(window.map((item) => item.average)).toFixed(2)),
    };
  });

  const remediationTargets = REVIEW_DIMENSIONS.filter((dimension) => {
    const tail = points.slice(-3);
    if (tail.length < 3) return false;
    return tail.every((point) => (point.scores?.[dimension.id] ?? 0) < 2);
  }).map((dimension) => dimension.label);

  return {
    hasEnoughHistory: true,
    message:
      complete.length < 3
        ? "You have enough history for a trend line, but not enough for a stable velocity grade yet."
        : "",
    points,
    rollingAverages,
    remediationTargets,
  };
}

export function buildVelocityScore(history) {
  const snapshot = buildVelocitySnapshot(history);
  if (!snapshot.hasEnoughHistory || snapshot.points.length < 3) {
    return {
      score: null,
      label: "Insufficient history",
      reason: "Need at least three completed reviews before assigning a velocity score.",
    };
  }

  const first = snapshot.points[0]?.average ?? 0;
  const last = snapshot.points[snapshot.points.length - 1]?.average ?? 0;
  const improvement = last - first;

  let score = 1;
  if (improvement >= 1.5) score = 4;
  else if (improvement >= 1.0) score = 3;
  else if (improvement >= 0.5) score = 2;

  return {
    score,
    label: `Velocity ${score}/4`,
    reason:
      improvement > 0
        ? "Recent rubric scores are improving over repeated submissions."
        : "Recent rubric scores are flat or regressing, so the review loop still needs reinforcement.",
  };
}

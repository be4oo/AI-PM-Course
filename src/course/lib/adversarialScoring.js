/**
 * Adversarial Review scoring — extracted from src/App.jsx so the redesign
 * can consume it without a circular import.
 *
 * Spec/plan refs:
 *   - FR-013: Adversarial review modal returns a scored rubric verdict on submission
 *   - Plan R8: scorer remains local (no model call); Principle III not triggered
 *
 * Source of truth used to live inline in src/App.jsx (REVIEW_SIGNAL_MAP +
 * scoreArtifactAgainstRubric + buildReviewNarrative + resolveArtifactContent).
 * This file is the canonical home going forward; App.jsx will be wired to
 * re-export from here in T044 (US3 wiring) to keep behavior identical during
 * the transition.
 */

import {
  buildPersonaWeightRows,
  REVIEW_DIMENSIONS,
} from "../../data/reviewerPersonas.js";
import { buildStructuredReviewError } from "../../utils/reviewHistory.js";

/* ---------------------------------------------------------------------------
 * Signal map — keyword vocabulary per rubric dimension.
 * Identical to App.jsx's legacy REVIEW_SIGNAL_MAP; changes must be coordinated
 * with the legacy App.jsx copy until that copy is removed in Phase 8.
 * ------------------------------------------------------------------------- */
export const REVIEW_SIGNAL_MAP = Object.freeze({
  problemFraming:       ["problem", "user", "roi", "metric", "value", "outcome", "success"],
  systemDesign:         ["architecture", "context", "tool", "routing", "model", "retrieval", "workflow"],
  trustDesign:          ["human", "approval", "trust", "explain", "fallback", "confidence", "ux"],
  evaluationQuality:    ["eval", "dataset", "test", "rubric", "judge", "regression", "benchmark"],
  safetyControls:       ["risk", "safety", "guardrail", "abuse", "attack", "policy", "escalation"],
  operationalReadiness: ["launch", "rollout", "incident", "owner", "monitor", "observability", "cost"],
});

function clampScore(value) {
  return Math.max(0, Math.min(4, Math.round(value)));
}

/**
 * Score an artifact's text against the persona-weighted rubric.
 *
 * @param {string} text       artifact contents (may be paste or fetched body)
 * @param {string} personaId  one of the reviewer-persona ids
 * @returns {Record<string, number>}  { dimensionId → 0..4 score }
 */
export function scoreArtifactAgainstRubric(text, personaId) {
  const lower = String(text ?? "").toLowerCase();
  const weights = buildPersonaWeightRows(personaId);
  const scoreEntries = weights.map((dimension) => {
    const vocabulary = REVIEW_SIGNAL_MAP[dimension.id] ?? [];
    const matches = vocabulary.filter((keyword) => lower.includes(keyword)).length;
    const baseScore = text && text.length < 300 ? 1 : Math.min(4, 1 + Math.floor(matches / 2));
    return [dimension.id, clampScore(baseScore * dimension.weight)];
  });
  return Object.fromEntries(scoreEntries);
}

/**
 * Generate a narrative for the rubric verdict.
 *
 * @param {Record<string, number>} scores  output of scoreArtifactAgainstRubric
 * @param {{ name: string }} persona       persona meta
 * @returns {{ strengths: string[], gaps: string[], requiredActions: object[], summary: string }}
 */
export function buildReviewNarrative(scores, persona) {
  const sorted = REVIEW_DIMENSIONS.map((dimension) => ({
    ...dimension,
    score: scores[dimension.id] ?? 0,
  })).sort((a, b) => b.score - a.score);

  const strengths = sorted.slice(0, 3).map(
    (dimension) => `${dimension.label} is more explicit than the rest of the artifact.`,
  );
  const gaps = sorted.slice(-3).map(
    (dimension) => `${dimension.label} still lacks enough concrete evidence for a confident launch review.`,
  );
  const requiredActions = sorted.slice(-3).map((dimension) => ({
    action: `Strengthen ${dimension.label.toLowerCase()} with specific evidence and named owners.`,
    owner: "Learner",
    evidence: `Update the artifact with proof for ${dimension.label.toLowerCase()}.`,
  }));

  return {
    strengths,
    gaps,
    requiredActions,
    summary: `${persona.name} review: strongest signal is ${sorted[0].label.toLowerCase()}, while the main risk is ${sorted[sorted.length - 1].label.toLowerCase()}.`,
  };
}

/**
 * Resolve an artifact submission to concrete text content.
 *
 * Handles both `sourceType: "paste"` (text in-memory) and `sourceType: "url"`
 * (raw GitHub URL fetched on demand). On fetch failure, returns a structured
 * error per spec Edge Case behavior.
 *
 * @param {{ sourceType: "paste"|"url", content?: string, artifactUrl?: string }} submission
 * @returns {Promise<{ ok: true, content: string } | { ok: false, error: object }>}
 */
export async function resolveArtifactContent(submission) {
  if (submission?.sourceType === "paste") {
    return { ok: true, content: submission.content ?? "" };
  }

  if (!submission?.artifactUrl) {
    return {
      ok: false,
      error: buildStructuredReviewError(
        "missing_url",
        "No artifact URL was provided.",
        "Paste the artifact directly or provide a fetchable raw GitHub URL.",
        submission,
      ),
    };
  }

  try {
    const response = await fetch(submission.artifactUrl);
    if (!response.ok) {
      return {
        ok: false,
        error: buildStructuredReviewError(
          "fetch_failed",
          `Could not retrieve the artifact (${response.status}).`,
          "Use a raw GitHub URL or paste the artifact directly.",
          submission,
        ),
      };
    }
    const content = await response.text();
    return { ok: true, content };
  } catch {
    return {
      ok: false,
      error: buildStructuredReviewError(
        "fetch_failed",
        "Could not retrieve the artifact.",
        "Use a raw GitHub URL or paste the artifact directly.",
        submission,
      ),
    };
  }
}

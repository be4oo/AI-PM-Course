import { DEFAULT_REVIEWER_PERSONA_ID, REVIEW_DIMENSIONS } from "../data/reviewerPersonas";

export const REVIEW_HISTORY_VERSION = 1;
export const MAX_REVIEW_ARTIFACT_CHARS = 15000;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function summarizeArtifact(text, limit = 280) {
  return cleanString(text).replace(/\s+/g, " ").slice(0, limit);
}

export function buildDefaultReviewDraft(overrides = {}) {
  return {
    sourceType: "paste",
    artifactType: "prd",
    personaId: DEFAULT_REVIEWER_PERSONA_ID,
    content: "",
    artifactUrl: "",
    artifactTitle: "",
    learnerNotes: "",
    lessonId: "",
    moduleId: "",
    capstoneMilestoneId: "",
    ...overrides,
  };
}

export function normalizeReviewSubmission(input = {}) {
  const sourceType = cleanString(input.sourceType) || "paste";
  const artifactType = cleanString(input.artifactType) || "prd";
  const content = typeof input.content === "string" ? input.content : "";

  return {
    version: REVIEW_HISTORY_VERSION,
    submittedAt: cleanString(input.submittedAt) || new Date().toISOString(),
    sourceType,
    artifactType,
    personaId: cleanString(input.personaId) || DEFAULT_REVIEWER_PERSONA_ID,
    artifactTitle: cleanString(input.artifactTitle) || "Untitled artifact",
    artifactUrl: cleanString(input.artifactUrl),
    content,
    contentLength: content.length,
    learnerNotes: cleanString(input.learnerNotes),
    context: {
      lessonId: cleanString(input.lessonId),
      moduleId: cleanString(input.moduleId),
      capstoneMilestoneId: cleanString(input.capstoneMilestoneId),
    },
  };
}

export function buildStructuredReviewError(code, message, remediation, submission) {
  return {
    status: "error",
    code,
    message,
    remediation,
    scoredAt: new Date().toISOString(),
    submission,
  };
}

export function normalizeScores(scores = {}) {
  return REVIEW_DIMENSIONS.reduce((acc, dimension) => {
    const raw = scores[dimension.id];
    const value = Number.isFinite(raw) ? raw : 0;
    acc[dimension.id] = Math.max(0, Math.min(4, Math.round(value)));
    return acc;
  }, {});
}

export function normalizeReviewResult(result = {}) {
  if (result.status === "error") return result;

  return {
    status: "complete",
    scoredAt: cleanString(result.scoredAt) || new Date().toISOString(),
    summary: cleanString(result.summary),
    scores: normalizeScores(result.scores),
    strengths: Array.isArray(result.strengths) ? result.strengths.filter(Boolean).slice(0, 3) : [],
    gaps: Array.isArray(result.gaps) ? result.gaps.filter(Boolean).slice(0, 3) : [],
    requiredActions: Array.isArray(result.requiredActions)
      ? result.requiredActions
          .filter((action) => action?.action)
          .slice(0, 3)
          .map((action) => ({
            action: cleanString(action.action),
            owner: cleanString(action.owner) || "Learner",
            evidence: cleanString(action.evidence),
          }))
      : [],
  };
}

export function createHistoryEntry({ submission, result }) {
  const normalizedSubmission = normalizeReviewSubmission(submission);
  const normalizedResult = normalizeReviewResult(result);
  const { content, ...submissionMetadata } = normalizedSubmission;
  return {
    id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    version: REVIEW_HISTORY_VERSION,
    createdAt: normalizedResult.scoredAt || normalizedSubmission.submittedAt,
    submission: {
      ...submissionMetadata,
      contentPreview: summarizeArtifact(content),
      contentHashHint: `${normalizedSubmission.contentLength}:${summarizeArtifact(
        content,
        42
      )}`,
    },
    result: normalizedResult,
  };
}

export function isReviewHistoryEntry(entry) {
  return Boolean(
    entry &&
      typeof entry === "object" &&
      typeof entry.id === "string" &&
      entry.submission &&
      entry.result &&
      typeof entry.submission.personaId === "string" &&
      typeof entry.submission.sourceType === "string" &&
      typeof entry.result.status === "string"
  );
}

export function normalizeReviewHistory(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(isReviewHistoryEntry);
}

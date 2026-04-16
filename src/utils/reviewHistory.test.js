import { describe, expect, it } from "vitest";
import {
  buildDefaultReviewDraft,
  buildStructuredReviewError,
  createHistoryEntry,
  normalizeReviewHistory,
  normalizeReviewSubmission,
  summarizeArtifact,
} from "./reviewHistory";

describe("reviewHistory", () => {
  it("builds a stable default draft with the default persona", () => {
    const draft = buildDefaultReviewDraft({ lessonId: "2.3" });
    expect(draft.personaId.length).toBeGreaterThan(0);
    expect(draft.lessonId).toBe("2.3");
    expect(draft.sourceType).toBe("paste");
  });

  it("normalizes a submission shape", () => {
    const submission = normalizeReviewSubmission({
      artifactTitle: "  PRD  ",
      content: "hello",
      personaId: "eval-engineer",
    });
    expect(submission.artifactTitle).toBe("PRD");
    expect(submission.contentLength).toBe(5);
    expect(submission.personaId).toBe("eval-engineer");
  });

  it("creates history entries for complete reviews", () => {
    const entry = createHistoryEntry({
      submission: {
        artifactTitle: "Memo",
        content: "Problem framing, eval, launch readiness",
      },
      result: {
        summary: "Solid baseline with missing safety proof.",
        scores: {
          problemFraming: 3,
          systemDesign: 2,
          trustDesign: 2,
          evaluationQuality: 3,
          safetyControls: 1,
          operationalReadiness: 2,
        },
        strengths: ["Clear problem framing"],
        gaps: ["Missing safety escalation"],
        requiredActions: [{ action: "Add escalation owner", owner: "Learner" }],
      },
    });

    expect(entry.id).toContain("review-");
    expect(entry.result.status).toBe("complete");
    expect(entry.submission.contentPreview.length).toBeGreaterThan(0);
    expect("content" in entry.submission).toBe(false);
  });

  it("keeps only valid history entries during normalization", () => {
    const valid = createHistoryEntry({
      submission: { artifactTitle: "X", content: "Y" },
      result: { summary: "Ok", scores: {} },
    });
    const normalized = normalizeReviewHistory([valid, null, { foo: "bar" }]);
    expect(normalized).toHaveLength(1);
    expect(normalized[0].id).toBe(valid.id);
  });

  it("represents structured errors without pretending to score", () => {
    const submission = normalizeReviewSubmission({ artifactTitle: "Broken URL" });
    const error = buildStructuredReviewError(
      "fetch_failed",
      "Could not retrieve the artifact.",
      "Use a raw GitHub URL or paste the artifact directly.",
      submission
    );
    expect(error.status).toBe("error");
    expect(error.code).toBe("fetch_failed");
  });

  it("summarizes long artifacts for compact persistence", () => {
    expect(summarizeArtifact("a".repeat(400)).length).toBeLessThanOrEqual(280);
  });
});

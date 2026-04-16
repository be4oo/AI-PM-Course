import { describe, expect, it } from "vitest";
import {
  buildCohortStorageKey,
  buildLessonStorageKey,
  buildReviewStorageKey,
  migrateLegacyModuleStorage,
  moduleStorageSlug,
} from "./moduleStorage";

describe("moduleStorage", () => {
  it("normalizes module 8.5 and keeps other module ids intact", () => {
    expect(moduleStorageSlug("8.5")).toBe("8-5");
    expect(moduleStorageSlug(7)).toBe("7");
    expect(moduleStorageSlug("12")).toBe("12");
  });

  it("builds all persisted keys from the normalized module slug", () => {
    expect(buildLessonStorageKey("8.5", "8.5.1")).toBe("8-5-8.5.1");
    expect(buildReviewStorageKey("8.5", "weekly-review")).toBe("8-5-weekly-review");
    expect(buildCohortStorageKey("8.5", "office-hours")).toBe("8-5-office-hours");
  });

  it("migrates legacy keys without changing values and is idempotent", () => {
    const legacy = {
      completed: ["8.5-8.5.1", "12-12.1"],
      bookmarks: ["8.5-8.5.2"],
      lessonStates: { "8.5-8.5.1": "Read", "12-12.1": "Mastered" },
      reviewChecks: { "8.5-peer-review": true },
      reviewEvidence: { "8.5-peer-review": "Evidence" },
      cohortChecks: { "8.5-office-hours": true },
      cohortEvidence: { "8.5-office-hours": "Evidence" },
      artifactChecks: { "8.5-8.5.2": [{ id: "a", done: true }] },
      reviewSimulatorDraft: { lessonId: "8.5-8.5.1" },
      reviewSimulatorHistory: [
        {
          id: "review-1",
          submission: {
            personaId: "senior-ai-pm",
            sourceType: "paste",
            context: { lessonId: "8.5-8.5.1" },
          },
          result: { status: "complete" },
        },
      ],
      weakConcepts: [{ lessonKey: "8.5-8.5.1", title: "X" }],
      moduleIntroSeen: { "8.5": true, 12: false },
      moduleOutroReady: { "8.5": true },
    };

    const once = migrateLegacyModuleStorage(legacy);
    expect(once.migrated).toBe(true);
    expect(once.payload.completed).toContain("8-5-8.5.1");
    expect(once.payload.bookmarks).toContain("8-5-8.5.2");
    expect(once.payload.lessonStates["8-5-8.5.1"]).toBe("Read");
    expect(once.payload.reviewEvidence["8-5-peer-review"]).toBe("Evidence");
    expect(once.payload.reviewSimulatorDraft.lessonId).toBe("8-5-8.5.1");
    expect(once.payload.reviewSimulatorHistory[0].submission.context.lessonId).toBe("8-5-8.5.1");
    expect(once.payload.moduleIntroSeen["8.5"]).toBe(true);

    const twice = migrateLegacyModuleStorage(once.payload);
    expect(twice.migrated).toBe(false);
    expect(twice.payload).toEqual(once.payload);
  });
});

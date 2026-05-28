import { describe, expect, it } from "vitest";
import { buildLessonMetadata } from "./lessonMetadata";

describe("buildLessonMetadata", () => {
  it("fills defaults for a concept lesson and merges per-lesson meta", () => {
    const meta = buildLessonMetadata({
      lesson: { id: "1.1", title: "Hello World", type: "concept" },
      moduleTitle: "Strategy",
      benchmarkDate: "2026-04-11",
    });
    expect(meta.lastVerified).toBe("2026-04-11");
    expect(meta.moduleContext).toBe("Strategy");
    expect(meta.artifact).toBe("/docs/artifacts/module-1.1-hello-world.md");
    expect(meta.sources).toEqual([
      "Official product/vendor docs",
      "Peer benchmark or case study",
    ]);
    expect(meta.rubric.length).toBeGreaterThan(0);
    expect(meta.failureModes.length).toBeGreaterThan(0);
    expect(meta.redTeam.length).toBeGreaterThan(0);
  });

  it("falls back to framework presets when type is missing", () => {
    const meta = buildLessonMetadata({
      lesson: { id: "x.1", title: "Untyped" },
      moduleTitle: "M",
      benchmarkDate: "2026-05-01",
    });
    expect(meta.sources).toEqual([
      "Primary framework reference",
      "Applied implementation guide",
    ]);
  });

  it("per-lesson meta overrides defaults", () => {
    const meta = buildLessonMetadata({
      lesson: {
        id: "2.1",
        title: "Tokens",
        type: "technical",
        meta: {
          lastVerified: "2026-Q2",
          sources: ["Custom only"],
          extra: "value",
        },
      },
      moduleTitle: "Models",
      benchmarkDate: "2026-04-11",
    });
    expect(meta.lastVerified).toBe("2026-Q2");
    expect(meta.sources).toEqual(["Custom only"]);
    expect(meta.extra).toBe("value");
    // unspecified-by-lesson keys still come from presets
    expect(meta.rubric.length).toBeGreaterThan(0);
  });

  it("slugifies titles with punctuation safely", () => {
    const meta = buildLessonMetadata({
      lesson: { id: "3.4", title: "RAG vs. Fine-Tune: 2026 Edition!", type: "framework" },
      moduleTitle: "Context",
      benchmarkDate: "2026-04-11",
    });
    expect(meta.artifact).toBe(
      "/docs/artifacts/module-3.4-rag-vs-fine-tune-2026-edition.md"
    );
  });

  it("truncates very long title slugs", () => {
    const longTitle = "a".repeat(200);
    const meta = buildLessonMetadata({
      lesson: { id: "9.9", title: longTitle, type: "systems" },
      moduleTitle: "M",
      benchmarkDate: "2026-04-11",
    });
    const slug = meta.artifact.replace("/docs/artifacts/module-9.9-", "").replace(".md", "");
    expect(slug.length).toBeLessThanOrEqual(72);
  });
});

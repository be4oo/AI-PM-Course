import { describe, expect, it } from "vitest";
import { buildLessonClipboardText } from "./lessonCopy";

const baseArgs = () => ({
  lesson: { id: "1.1", title: "AI Paradigm Shift", type: "concept" },
  mod: { title: "Strategy", module: "MODULE 1", week: "WEEK 1" },
  lessonFrame: {
    concept: "Concept body.",
    takeaways: ["Takeaway A", "Takeaway B"],
    leadershipNote: "",
    toolingLab: null,
    reviewQuestion: "What's a Type B PM?",
    artifactTarget: "/docs/x.md",
  },
  lessonMeta: {
    sources: ["Source A", "Source B"],
    lastVerified: "2026-04-11",
    artifact: "/docs/artifacts/1.1.md",
  },
  whyThisMatters: "It changes how PMs work.",
  workedExample: {
    title: "Klarna agent",
    bullets: ["Bullet 1", "Bullet 2"],
  },
  redFlags: ["Hallucinated tool calls", "No fallback"],
});

describe("buildLessonClipboardText", () => {
  it("renders the canonical sections in order", () => {
    const text = buildLessonClipboardText(baseArgs());
    const expected = [
      "# LESSON: AI Paradigm Shift",
      "## CONCEPT",
      "## KEY TAKEAWAYS",
      "## WHY THIS MATTERS",
      "## WORKED EXAMPLE: Klarna agent",
      "## METADATA",
    ];
    let lastIndex = -1;
    for (const heading of expected) {
      const idx = text.indexOf(heading);
      expect(idx, `missing ${heading}`).toBeGreaterThan(-1);
      expect(idx, `${heading} out of order`).toBeGreaterThan(lastIndex);
      lastIndex = idx;
    }
  });

  it("uppercases the lesson type", () => {
    const text = buildLessonClipboardText(baseArgs());
    expect(text).toContain("Type: CONCEPT");
  });

  it("renders takeaways as → bullets", () => {
    const text = buildLessonClipboardText(baseArgs());
    expect(text).toContain("→ Takeaway A");
    expect(text).toContain("→ Takeaway B");
  });

  it("omits LEADERSHIP NOTE when empty", () => {
    const text = buildLessonClipboardText(baseArgs());
    expect(text).not.toContain("## LEADERSHIP NOTE");
  });

  it("includes the leadership note when provided", () => {
    const args = baseArgs();
    args.lessonFrame.leadershipNote = "Govern this every week.";
    const text = buildLessonClipboardText(args);
    expect(text).toContain("## LEADERSHIP NOTE");
    expect(text).toContain("Govern this every week.");
  });

  it("includes a tooling lab section with steps and artifact path", () => {
    const args = baseArgs();
    args.lessonFrame.toolingLab = {
      title: "Lab",
      tools: ["Promptfoo", "Langfuse"],
      steps: ["Step one", "Step two"],
      artifactPath: "/docs/lab.md",
    };
    const text = buildLessonClipboardText(args);
    expect(text).toContain("## TOOLING LAB: Lab");
    expect(text).toContain("Tools: Promptfoo | Langfuse");
    expect(text).toContain("• Step one");
    expect(text).toContain("• Step two");
    expect(text).toContain("Artifact path: /docs/lab.md");
  });

  it("renders red flags as a single pipe-joined line", () => {
    const text = buildLessonClipboardText(baseArgs());
    expect(text).toContain("Red flags: Hallucinated tool calls | No fallback");
  });

  it("omits the red-flag line when there are none", () => {
    const args = baseArgs();
    args.redFlags = [];
    const text = buildLessonClipboardText(args);
    expect(text).not.toContain("Red flags:");
  });

  it("falls back to the artifactTarget when meta.artifact is missing", () => {
    const args = baseArgs();
    args.lessonMeta.artifact = undefined;
    const text = buildLessonClipboardText(args);
    expect(text).toContain("Artifact: /docs/x.md");
  });

  it("renders sources joined with ' · '", () => {
    const text = buildLessonClipboardText(baseArgs());
    expect(text).toContain("Sources: Source A · Source B");
  });

  it("survives a missing lesson.type without throwing", () => {
    const args = baseArgs();
    delete args.lesson.type;
    const text = buildLessonClipboardText(args);
    expect(text).toContain("Type: ");
  });
});

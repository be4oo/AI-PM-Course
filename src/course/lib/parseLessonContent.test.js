import { describe, it, expect } from "vitest";
import { parseLessonContent, inlineSpans } from "./parseLessonContent.js";

describe("inlineSpans", () => {
  it("splits bold runs", () => {
    expect(inlineSpans("a **b** c")).toEqual([
      { text: "a " },
      { text: "b", bold: true },
      { text: " c" },
    ]);
  });

  it("splits inline code", () => {
    expect(inlineSpans("push to `/docs/x.md`")).toEqual([
      { text: "push to " },
      { text: "/docs/x.md", code: true },
    ]);
  });

  it("returns a single plain span for plain text", () => {
    expect(inlineSpans("plain")).toEqual([{ text: "plain" }]);
  });
});

describe("parseLessonContent", () => {
  it("returns [] for empty / non-string input", () => {
    expect(parseLessonContent("")).toEqual([]);
    expect(parseLessonContent(undefined)).toEqual([]);
    expect(parseLessonContent("   \n  ")).toEqual([]);
  });

  it("turns a standalone bold line into a heading with a slug id", () => {
    const [block] = parseLessonContent("**The nine shifts**");
    expect(block).toMatchObject({
      kind: "heading",
      label: "The nine shifts",
      id: "the-nine-shifts",
      depth: 1,
    });
  });

  it("does NOT treat a paragraph with mid-line bold as a heading", () => {
    const blocks = parseLessonContent("This has **bold** in the middle.");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].kind).toBe("prose");
    expect(blocks[0].spans).toEqual([
      { text: "This has " },
      { text: "bold", bold: true },
      { text: " in the middle." },
    ]);
  });

  it("groups consecutive `- ` lines into one ul", () => {
    const blocks = parseLessonContent("- one\n- two\n- three");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].kind).toBe("ul");
    expect(blocks[0].items.map((i) => i.text)).toEqual(["one", "two", "three"]);
  });

  it("groups numbered lines into one ol and keeps bold spans in items", () => {
    const blocks = parseLessonContent("1. **First** item\n2. Second");
    expect(blocks[0].kind).toBe("ol");
    expect(blocks[0].items[0].spans).toEqual([
      { text: "First", bold: true },
      { text: " item" },
    ]);
  });

  it("parses a pipe table into headers + rows", () => {
    const md = "| Skill | Score |\n|---|---|\n| Context engineering | |\n| Evals | 3 |";
    const blocks = parseLessonContent(md);
    expect(blocks).toHaveLength(1);
    const t = blocks[0];
    expect(t.kind).toBe("table");
    expect(t.headers.map((h) => h[0].text)).toEqual(["Skill", "Score"]);
    expect(t.rows).toHaveLength(2);
    expect(t.rows[0][0][0].text).toBe("Context engineering");
    expect(t.rows[1][1][0].text).toBe("3");
  });

  it("captures a Case study bold-heading + following prose as a casestudy block", () => {
    const md = "**Case study — Klarna**:\nKlarna deployed an AI agent handling 2/3 of conversations.";
    const blocks = parseLessonContent(md);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].kind).toBe("casestudy");
    expect(blocks[0].label).toBe("Case study — Klarna");
    expect(blocks[0].spans[0].text).toContain("Klarna deployed");
  });

  it("renders a realistic multi-block lesson without leaking raw markdown", () => {
    const md = [
      "**Where AI creates value**",
      "",
      "AI removed every safety net PMs hid behind.",
      "",
      "- **Zone 1** — Automation",
      "- Zone 2 — Augmentation",
      "",
      "If deterministic, use `rules/SQL`. Don't LLM it.",
    ].join("\n");
    const blocks = parseLessonContent(md);
    const kinds = blocks.map((b) => b.kind);
    expect(kinds).toEqual(["heading", "prose", "ul", "prose"]);
    // No block should carry a raw ** marker in its plain text.
    const flat = JSON.stringify(blocks);
    expect(flat).not.toContain("**");
    // Internal helper field must not leak.
    expect(blocks.every((b) => !("_raw" in b))).toBe(true);
  });
});

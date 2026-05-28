/**
 * @vitest-environment jsdom
 *
 * ReadingColumn contract tests.
 *
 * Spec refs:
 *   - FR-003: serif title, calm sans body, no coloured callout boxes
 *   - FR-004: module color appears nowhere as a background fill
 *   - FR-026: every artifact link the lesson supplies is rendered
 *   - FR-028a: `mena-note` renders when supplied; absent when not (no empty container)
 */

import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { ReadingColumn } from "./ReadingColumn.jsx";
import { MODULE_MARKER_PALETTE } from "../lib/moduleColor.js";

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  // Apply the course-shell class so token CSS variables resolve like in app.
  container.className = "course-shell";
  document.body.appendChild(container);
});

async function render(ui) {
  let root;
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
  return {
    rerender: async (next) => {
      await act(async () => {
        root.render(next);
      });
    },
  };
}

const moduleObj = { id: "m1", name: "Module 1: Framing AI products" };

const baseLesson = {
  id: "m1-l1",
  title: "Why eval discipline matters",
  subtitle: "From vibes to verifiable",
  body: [
    { kind: "heading", id: "what-is-eval", label: "What is an eval?" },
    { kind: "prose", text: "An eval is a falsifiable test of model behavior." },
    { kind: "takeaways", label: "Takeaways", items: ["Define success first", "Measure twice"] },
    { kind: "leadership-note", text: "Evals defend the product when launches go sideways." },
  ],
};

describe("ReadingColumn — FR-028a mena-note", () => {
  it("renders the mena-note block when supplied", async () => {
    const lesson = {
      ...baseLesson,
      body: [
        ...baseLesson.body,
        { kind: "mena-note", label: "MENA context", text: "GCC data-residency rules apply.", dir: "ltr" },
      ],
    };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    const note = container.querySelector('[data-testid="mena-note"]');
    expect(note).not.toBeNull();
    expect(note.textContent).toContain("GCC data-residency rules apply.");
  });

  it("renders nothing for the mena slot when the lesson does not supply one", async () => {
    await render(<ReadingColumn lesson={baseLesson} module={moduleObj} moduleIndex={0} />);
    expect(container.querySelector('[data-testid="mena-note"]')).toBeNull();
  });

  it("propagates dir and lang to the mena-note element when supplied", async () => {
    const lesson = {
      ...baseLesson,
      body: [
        { kind: "mena-note", label: "ملاحظة", text: "محلية", dir: "rtl", lang: "ar" },
      ],
    };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    const note = container.querySelector('[data-testid="mena-note"]');
    expect(note.getAttribute("dir")).toBe("rtl");
    expect(note.getAttribute("lang")).toBe("ar");
  });
});

describe("ReadingColumn — FR-004 module color is never a background fill", () => {
  it("no element under the column has a computed inline-style background-color matching a module-marker token", async () => {
    await render(<ReadingColumn lesson={baseLesson} module={moduleObj} moduleIndex={0} />);
    const all = container.querySelectorAll("*");
    const markerColors = new Set(MODULE_MARKER_PALETTE.map((c) => c.toLowerCase()));
    for (const el of all) {
      const bg = (el.style?.backgroundColor || "").toLowerCase();
      const bgShorthand = (el.style?.background || "").toLowerCase();
      // Only flag *fills* — a `background: transparent` or empty value is fine.
      expect(markerColors.has(bg)).toBe(false);
      // Also catch `background: var(--module-N)` if it ever leaks via shorthand.
      for (const c of markerColors) {
        expect(bgShorthand.includes(c)).toBe(false);
      }
    }
  });

  it("module marker is applied as border-inline-start, never as background", async () => {
    await render(<ReadingColumn lesson={baseLesson} module={moduleObj} moduleIndex={2} />);
    // The eyebrow's sigil holds the marker color.
    const eyebrow = container.querySelector("p");
    const sigil = eyebrow.querySelector("span");
    expect(sigil).not.toBeNull();
    // Style-set inline values include borderInlineStartColor in the inline style.
    const inline = sigil.getAttribute("style") || "";
    expect(inline.toLowerCase()).toContain("border-inline-start-color");
    expect(inline.toLowerCase()).not.toContain("background");
  });
});

describe("ReadingColumn — FR-026 artifact links", () => {
  it("renders the single-artifact case", async () => {
    const lesson = {
      ...baseLesson,
      artifact: { label: "AI PRD template", href: "/templates/ai-prd.md", description: "Markdown PRD" },
    };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    const links = container.querySelectorAll('[data-testid="course-artifact-link"]');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/templates/ai-prd.md");
    expect(links[0].textContent).toContain("AI PRD template");
  });

  it("renders every artifact when multiple are supplied (FR-026 multi-artifact ordering)", async () => {
    const lesson = {
      ...baseLesson,
      artifacts: [
        { label: "First", href: "/a" },
        { label: "Second", href: "/b" },
        { label: "Third", href: "/c" },
      ],
    };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    const links = container.querySelectorAll('[data-testid="course-artifact-link"]');
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["/a", "/b", "/c"]);
  });

  it("renders nothing for the artifact stripe when no artifact is supplied", async () => {
    await render(<ReadingColumn lesson={baseLesson} module={moduleObj} moduleIndex={0} />);
    expect(container.querySelectorAll('[data-testid="course-artifact-link"]')).toHaveLength(0);
  });

  it("opens external artifact links in a new tab with rel=noreferrer", async () => {
    const lesson = {
      ...baseLesson,
      artifact: { label: "External", href: "https://example.com/x" },
    };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    const a = container.querySelector('[data-testid="course-artifact-link"]');
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toBe("noreferrer");
  });
});

describe("ReadingColumn — body rendering basics", () => {
  it("renders the lesson title as an h1 with the expected anchor id", async () => {
    await render(<ReadingColumn lesson={baseLesson} module={moduleObj} moduleIndex={0} />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain("Why eval discipline matters");
    expect(h1.getAttribute("id")).toBe("what-is-eval"); // first outline entry wins
  });

  it("falls back to the lesson summary when no body is supplied", async () => {
    const lesson = { id: "x", title: "Legacy lesson", summary: "Summary text." };
    await render(<ReadingColumn lesson={lesson} module={moduleObj} moduleIndex={0} />);
    expect(container.textContent).toContain("Summary text.");
  });

  it("shows the empty state when no lesson is supplied", async () => {
    await render(<ReadingColumn lesson={null} module={null} moduleIndex={0} />);
    expect(container.textContent).toContain("Select a lesson");
  });
});

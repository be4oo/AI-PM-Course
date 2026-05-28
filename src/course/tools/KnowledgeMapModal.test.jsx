/**
 * @vitest-environment jsdom
 *
 * KnowledgeMapModal contract tests.
 *
 * Spec ref: FR-015 — module-grouped lesson constellation; click-to-jump
 *           closes the modal AND navigates.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { KnowledgeMapModal } from "./KnowledgeMapModal.jsx";

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
});

async function render(ui) {
  let root;
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
  return {};
}

const curriculum = [
  {
    id: "m1",
    name: "Framing AI products",
    lessons: [
      { id: "m1-l1", title: "Why evals matter" },
      { id: "m1-l2", title: "Defining success" },
    ],
  },
  {
    id: "m2",
    name: "Eval discipline",
    lessons: [
      { id: "m2-l1", title: "Rubric design" },
      { id: "m2-l2", title: "Promptfoo basics" },
      { id: "m2-l3", title: "Regression checks" },
    ],
  },
];

describe("KnowledgeMapModal — grouping (FR-015)", () => {
  it("groups lessons by module", async () => {
    await render(<KnowledgeMapModal titleId="t" curriculum={curriculum} />);
    const groups = container.querySelectorAll('[data-testid="kmap-module-group"]');
    expect(groups).toHaveLength(2);
    expect(groups[0].getAttribute("data-module-id")).toBe("m1");
    expect(groups[1].getAttribute("data-module-id")).toBe("m2");
  });

  it("renders every lesson as a node", async () => {
    await render(<KnowledgeMapModal titleId="t" curriculum={curriculum} />);
    const nodes = container.querySelectorAll('[data-testid="kmap-lesson-node"]');
    expect(nodes).toHaveLength(5); // 2 + 3
    expect(Array.from(nodes).map((n) => n.getAttribute("data-lesson-id"))).toEqual([
      "m1-l1",
      "m1-l2",
      "m2-l1",
      "m2-l2",
      "m2-l3",
    ]);
  });

  it("marks completed lessons via data-completed", async () => {
    await render(
      <KnowledgeMapModal
        titleId="t"
        curriculum={curriculum}
        completedLessonIds={new Set(["m1-l1", "m2-l2"])}
      />,
    );
    const nodes = container.querySelectorAll('[data-testid="kmap-lesson-node"]');
    expect(nodes[0].getAttribute("data-completed")).toBe("true");
    expect(nodes[1].hasAttribute("data-completed")).toBe(false);
    expect(nodes[3].getAttribute("data-completed")).toBe("true");
  });
});

describe("KnowledgeMapModal — click-to-jump", () => {
  it("clicking a node invokes onJumpToLesson then onClose", async () => {
    const calls = [];
    const onJumpToLesson = vi.fn((id) => calls.push(["jump", id]));
    const onClose = vi.fn(() => calls.push(["close"]));
    await render(
      <KnowledgeMapModal
        titleId="t"
        curriculum={curriculum}
        onJumpToLesson={onJumpToLesson}
        onClose={onClose}
      />,
    );
    const nodes = container.querySelectorAll('[data-testid="kmap-lesson-node"]');
    await act(async () => {
      nodes[2].dispatchEvent(new MouseEvent("click", { bubbles: true })); // m2-l1
    });
    expect(onJumpToLesson).toHaveBeenCalledWith("m2-l1");
    expect(onClose).toHaveBeenCalled();
    // Jump must happen before close so the navigation lands.
    expect(calls).toEqual([["jump", "m2-l1"], ["close"]]);
  });

  it("Close button invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<KnowledgeMapModal titleId="t" curriculum={curriculum} onClose={onClose} />);
    await act(async () => {
      container.querySelector('[data-testid="kmap-close"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

describe("KnowledgeMapModal — module marker as 2px (FR-004)", () => {
  it("module column uses border-inline-start, never background", async () => {
    await render(<KnowledgeMapModal titleId="t" curriculum={curriculum} />);
    const groups = container.querySelectorAll('[data-testid="kmap-module-group"]');
    for (const g of groups) {
      const inline = (g.getAttribute("style") || "").toLowerCase();
      expect(inline).toContain("border-inline-start-color");
      expect(inline.includes("background-color")).toBe(false);
    }
  });
});

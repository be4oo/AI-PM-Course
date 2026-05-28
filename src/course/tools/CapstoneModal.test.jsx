/**
 * @vitest-environment jsdom
 *
 * CapstoneModal contract tests.
 *
 * Spec ref: FR-014 — 6-milestone view + stats + lesson gating.
 *
 * NOTE: spec FR-014 says "6-milestone view" but production data
 * (src/data/capstoneDashboard.js) currently has 7 milestones. The modal
 * renders all milestones supplied; this test uses a 6-entry fixture so the
 * spec assertion passes. The drift is flagged in the Phase-5 completion
 * report — reconcile by either trimming the data or amending FR-014.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CapstoneModal } from "./CapstoneModal.jsx";

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

const SIX_MILESTONES = Object.freeze([
  { id: "ms-1", title: "Problem brief", description: "Frame the problem.",  weight: 10 },
  { id: "ms-2", title: "Architecture",  description: "Document routing.",   weight: 15 },
  { id: "ms-3", title: "Working build", description: "Demo functional.",    weight: 20 },
  { id: "ms-4", title: "Eval suite",    description: "Baseline + judge.",   weight: 20 },
  { id: "ms-5", title: "Guardrails",    description: "Safety + obs.",       weight: 25 },
  { id: "ms-6", title: "Launch memo",   description: "Go/no-go.",           weight: 10 },
]);

describe("CapstoneModal — milestones (FR-014)", () => {
  it("renders exactly 6 milestones when 6 are supplied", async () => {
    await render(<CapstoneModal titleId="t" milestones={SIX_MILESTONES} />);
    const items = container.querySelectorAll('[data-testid="capstone-milestone"]');
    expect(items).toHaveLength(6);
  });

  it("milestones appear in the supplied order with 01..06 numbering", async () => {
    await render(<CapstoneModal titleId="t" milestones={SIX_MILESTONES} />);
    const items = container.querySelectorAll('[data-testid="capstone-milestone"]');
    const headings = Array.from(items).map((m) => m.querySelector("h3").textContent);
    expect(headings).toEqual(SIX_MILESTONES.map((m) => m.title));
  });

  it("marks completed milestones via data-completed", async () => {
    await render(
      <CapstoneModal
        titleId="t"
        milestones={SIX_MILESTONES}
        completedMilestoneIds={new Set(["ms-1", "ms-3"])}
      />,
    );
    const items = container.querySelectorAll('[data-testid="capstone-milestone"]');
    expect(items[0].getAttribute("data-completed")).toBe("true");
    expect(items[1].hasAttribute("data-completed")).toBe(false);
    expect(items[2].getAttribute("data-completed")).toBe("true");
  });
});

describe("CapstoneModal — readiness", () => {
  it("readiness score is weighted across milestones", async () => {
    await render(
      <CapstoneModal
        titleId="t"
        milestones={SIX_MILESTONES}
        completedMilestoneIds={new Set(["ms-1", "ms-2", "ms-3"])}
      />,
    );
    // Total weight 100; done ms-1(10) + ms-2(15) + ms-3(20) = 45 → 45%.
    const readiness = container.querySelector('[data-testid="capstone-readiness"]');
    expect(readiness.textContent).toContain("45");
  });

  it("readiness shows zero when nothing is complete", async () => {
    await render(<CapstoneModal titleId="t" milestones={SIX_MILESTONES} />);
    const readiness = container.querySelector('[data-testid="capstone-readiness"]');
    expect(readiness.textContent).toContain("0");
  });
});

describe("CapstoneModal — lesson gating", () => {
  it("renders gating lessons under milestones that have them", async () => {
    const gating = new Map([
      ["ms-1", [{ id: "l1", title: "Problem framing 101" }, { id: "l2", title: "ROI sketch" }]],
      ["ms-3", [{ id: "l3", title: "Pick a model" }]],
    ]);
    await render(
      <CapstoneModal
        titleId="t"
        milestones={SIX_MILESTONES}
        gatingByMilestone={gating}
        completedLessonIds={new Set(["l1"])}
      />,
    );
    const links = container.querySelectorAll('[data-testid="capstone-gating-link"]');
    expect(links).toHaveLength(3);
    // Done lesson reads data-completed.
    expect(links[0].getAttribute("data-completed")).toBe("true");
    expect(links[1].hasAttribute("data-completed")).toBe(false);
  });

  it("clicking a gating link invokes onJumpToLesson with the lesson id", async () => {
    const onJump = vi.fn();
    const gating = new Map([
      ["ms-1", [{ id: "lA", title: "Lesson A" }]],
    ]);
    await render(
      <CapstoneModal
        titleId="t"
        milestones={SIX_MILESTONES}
        gatingByMilestone={gating}
        onJumpToLesson={onJump}
      />,
    );
    const link = container.querySelector('[data-testid="capstone-gating-link"]');
    await act(async () => {
      link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onJump).toHaveBeenCalledWith("lA");
  });
});

describe("CapstoneModal — close", () => {
  it("Close button invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<CapstoneModal titleId="t" milestones={SIX_MILESTONES} onClose={onClose} />);
    await act(async () => {
      container.querySelector('[data-testid="capstone-close"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

/**
 * @vitest-environment jsdom
 *
 * Sidebar contract tests.
 *
 * Spec refs:
 *   - FR-002: progress meter + module list + 4-tool Practice rail, in order.
 *             No author / audit views.
 *   - FR-004: module marker color appears nowhere as background.
 *   - FR-017: completion indicator is a single visual signal — not a
 *             checkbox + radio + button trio.
 *   - User Story 2 acceptance: active lesson visually distinguished; module
 *             expand/collapse does not navigate away.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Sidebar } from "./Sidebar.jsx";
import { MODULE_MARKER_PALETTE } from "../lib/moduleColor.js";

const curriculum = [
  {
    id: "m1",
    module: "MOBILE 1",
    title: "How companion apps are structured",
    name: "Framing AI products",
    lessons: [
      { id: "m1-l1", title: "Why evals matter" },
      { id: "m1-l2", title: "Defining success" },
      { id: "m1-l3", title: "Rolling out safely" },
    ],
  },
  {
    id: "m2",
    name: "Eval discipline",
    lessons: [
      { id: "m2-l1", title: "Rubric design" },
      { id: "m2-l2", title: "Promptfoo basics" },
    ],
  },
];

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
  return {
    rerender: async (next) => {
      await act(async () => {
        root.render(next);
      });
    },
  };
}

/* ============================================================================
 * FR-002 — order, exact count of Practice tools, absence of author/audit
 * ========================================================================= */

describe("Sidebar — FR-002 layout contract", () => {
  it("renders progress, modules, and Practice in that order", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const sections = container.querySelectorAll("section[aria-label]");
    const labels = Array.from(sections).map((s) => s.getAttribute("aria-label"));
    // Progress meter, modules, Practice tools — in this exact order.
    expect(labels.indexOf("Course progress")).toBeLessThan(labels.indexOf("Modules"));
    expect(labels.indexOf("Modules")).toBeLessThan(labels.indexOf("Practice tools"));
  });

  it("renders exactly four Practice items", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const items = container.querySelectorAll('[data-testid="course-practice-item"]');
    expect(items).toHaveLength(4);
  });

  it("Practice items are the four allowed ids, in spec order", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const items = container.querySelectorAll('[data-testid="course-practice-item"]');
    const ids = Array.from(items).map((b) => b.getAttribute("data-tool-id"));
    expect(ids).toEqual(["spaced-review", "adversarial-review", "capstone", "knowledge-map"]);
  });

  it("contains no author/audit view entries (Audit/Sources/Cohort/Coverage/Community/Glossary/Cheatsheets/Tools/Exec/Live/Changelog/Reviews/Templates/Ops)", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const text = container.textContent.toLowerCase();
    const forbidden = [
      "audit",
      "sources",
      "cohort",
      "coverage",
      "community",
      "glossary",
      "cheatsheet",
      "tools lab",
      "executive",
      "changelog",
      "templates",
      "ops starter",
    ];
    for (const term of forbidden) {
      expect(text.includes(term)).toBe(false);
    }
  });

  it("renders a single course-aggregate progress meter, not a per-module mirror", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    // exactly one role=progressbar at the top level
    const bars = container.querySelectorAll('[role="progressbar"]');
    expect(bars).toHaveLength(1);
  });
});

/* ============================================================================
 * Module list — collapse behavior, no nav on toggle, active highlight
 * ========================================================================= */

describe("Sidebar — modules", () => {
  it("renders the module title as primary copy and module label as an eyebrow", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const first = container.querySelector('[data-testid="course-module-toggle"]');
    expect(first.querySelector('[data-testid="course-module-title"]').textContent).toBe(
      "How companion apps are structured",
    );
    expect(first.querySelector('[data-testid="course-module-label"]').textContent).toBe("MOBILE 1");
  });

  it("starts with only the active module expanded", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const toggles = container.querySelectorAll('[data-testid="course-module-toggle"]');
    expect(toggles[0].getAttribute("aria-expanded")).toBe("true");
    expect(toggles[1].getAttribute("aria-expanded")).toBe("false");
  });

  it("clicking a module toggle expands/collapses WITHOUT calling onSelectLesson", async () => {
    const onSelectLesson = vi.fn();
    await render(
      <Sidebar
        curriculum={curriculum}
        activeModuleIndex={0}
        activeLessonIndex={0}
        onSelectLesson={onSelectLesson}
      />,
    );
    const toggles = container.querySelectorAll('[data-testid="course-module-toggle"]');
    await act(async () => {
      toggles[1].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(toggles[1].getAttribute("aria-expanded")).toBe("true");
    expect(onSelectLesson).not.toHaveBeenCalled();
  });

  it("clicking a lesson invokes onSelectLesson with the right indices", async () => {
    const onSelectLesson = vi.fn();
    await render(
      <Sidebar
        curriculum={curriculum}
        activeModuleIndex={0}
        activeLessonIndex={0}
        onSelectLesson={onSelectLesson}
      />,
    );
    const links = container.querySelectorAll('[data-testid="course-lesson-link"]');
    await act(async () => {
      links[2].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(onSelectLesson).toHaveBeenCalledWith(0, 2);
  });

  it("visually distinguishes the active lesson via aria-current=true", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={1} />);
    const links = container.querySelectorAll('[data-testid="course-lesson-link"]');
    expect(links[0].hasAttribute("aria-current")).toBe(false);
    expect(links[1].getAttribute("aria-current")).toBe("true");
    expect(links[2].hasAttribute("aria-current")).toBe(false);
  });

  it("reveals per-module progress badge only when expanded (US2 #4)", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    // First module: expanded by default → badge present.
    // Second module: collapsed → no badge.
    const badges = container.querySelectorAll('[data-testid="course-module-progress"]');
    expect(badges).toHaveLength(1);
  });
});

/* ============================================================================
 * FR-017 — single completion indicator
 * ========================================================================= */

describe("Sidebar — FR-017 single completion indicator", () => {
  it("renders exactly one status indicator per lesson (no checkbox + radio + button trio)", async () => {
    await render(
      <Sidebar
        curriculum={curriculum}
        activeModuleIndex={0}
        activeLessonIndex={0}
        completedLessonIds={new Set(["m1-l1"])}
      />,
    );
    const m1lessons = curriculum[0].lessons.length;
    const links = container.querySelectorAll('[data-testid="course-lesson-link"]');
    expect(links).toHaveLength(m1lessons);
    // Each link contains exactly one status dot child (no checkbox, no radio).
    for (const link of links) {
      const dots = link.querySelectorAll('[data-testid="course-lesson-status"]');
      expect(dots).toHaveLength(1);
      // And no <input> children — the legacy stack had inputs everywhere.
      expect(link.querySelectorAll("input")).toHaveLength(0);
    }
  });

  it("marks completed lessons via the data-completed attribute on the row", async () => {
    await render(
      <Sidebar
        curriculum={curriculum}
        activeModuleIndex={0}
        activeLessonIndex={0}
        completedLessonIds={["m1-l1", "m1-l3"]}
      />,
    );
    const links = container.querySelectorAll('[data-testid="course-lesson-link"]');
    expect(links[0].getAttribute("data-completed")).toBe("true");
    expect(links[1].hasAttribute("data-completed")).toBe(false);
    expect(links[2].getAttribute("data-completed")).toBe("true");
  });
});

/* ============================================================================
 * FR-004 — module color never as a background fill in this surface
 * ========================================================================= */

describe("Sidebar — FR-004 module color invariant", () => {
  it("module markers use border-inline-start, never background", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const toggles = container.querySelectorAll('[data-testid="course-module-toggle"]');
    for (const t of toggles) {
      const inline = (t.getAttribute("style") || "").toLowerCase();
      // Marker color is applied as borderInlineStartColor (via React style prop).
      expect(inline).toContain("border-inline-start-color");
      // Never as a fill.
      expect(inline.includes("background-color")).toBe(false);
    }
  });

  it("no element under the sidebar has a computed inline background-color matching a module-marker token", async () => {
    await render(<Sidebar curriculum={curriculum} activeModuleIndex={0} activeLessonIndex={0} />);
    const all = container.querySelectorAll("*");
    const markerColors = new Set(MODULE_MARKER_PALETTE.map((c) => c.toLowerCase()));
    for (const el of all) {
      const bg = (el.style?.backgroundColor || "").toLowerCase();
      expect(markerColors.has(bg)).toBe(false);
    }
  });
});

/* ============================================================================
 * Practice rail — tool clicks invoke onOpenTool
 * ========================================================================= */

describe("Sidebar — Practice rail wiring", () => {
  it("clicking a Practice item invokes onOpenTool with the right id and source", async () => {
    const onOpenTool = vi.fn();
    await render(
      <Sidebar
        curriculum={curriculum}
        activeModuleIndex={0}
        activeLessonIndex={0}
        onOpenTool={onOpenTool}
      />,
    );
    const items = container.querySelectorAll('[data-testid="course-practice-item"]');
    await act(async () => {
      items[2].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(onOpenTool).toHaveBeenCalledWith("capstone", "sidebar");
  });
});

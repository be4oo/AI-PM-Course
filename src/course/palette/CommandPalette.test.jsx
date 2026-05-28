/**
 * @vitest-environment jsdom
 *
 * CommandPalette contract tests.
 *
 * Spec / plan refs:
 *   - FR-020: ⌘K palette searches lessons + section headings; Enter navigates.
 *   - FR-027 + Plan R7: legacy view: entries (audit, sources, …) appear
 *     ONLY when the query starts with `>`.
 *   - Constitution Principle I: audit/sources reachable but hidden from the
 *     default search surface.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CommandPalette } from "./CommandPalette.jsx";
import { LEGACY_VIEW_ENTRIES } from "./legacyViewEntries.js";

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
      {
        id: "m1-l1",
        title: "Why eval discipline matters",
        body: [
          { kind: "heading", id: "what-is-eval", label: "What is an eval?" },
          { kind: "heading", id: "rubric-shape", label: "Rubric shape" },
        ],
      },
      {
        id: "m1-l2",
        title: "Defining product success",
        body: [{ kind: "heading", id: "what-counts", label: "What counts as success" }],
      },
    ],
  },
  {
    id: "m2",
    name: "Eval discipline",
    lessons: [
      { id: "m2-l1", title: "Audit baselines", body: [] },
    ],
  },
];

function typeQuery(value) {
  const input = container.querySelector('[data-testid="palette-input"]');
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

/* ============================================================================
 * Default state — lessons and sections, no views
 * ========================================================================= */

describe("CommandPalette — default surface (no >)", () => {
  it("empty query lists lesson + section entries from the curriculum", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    const results = container.querySelectorAll('[role="option"]');
    expect(results.length).toBeGreaterThan(0);

    // No legacy view entry appears by default.
    const viewResults = container.querySelectorAll('[data-testid="palette-result-view"]');
    expect(viewResults).toHaveLength(0);

    // Lessons + sections both present.
    expect(container.querySelectorAll('[data-testid="palette-result-lesson"]').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('[data-testid="palette-result-section"]').length).toBeGreaterThan(0);
  });

  it("filters to lessons matching a plain query (no > prefix)", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    await act(async () => typeQuery("eval"));
    const labels = Array.from(
      container.querySelectorAll('[role="option"]'),
    ).map((li) => li.textContent.toLowerCase());
    // At least one match should contain "eval".
    expect(labels.some((l) => l.includes("eval"))).toBe(true);
    // No view entries leak in for a plain query — even though "Course audit"
    // contains the word "audit" and our curriculum has an "Audit baselines"
    // lesson, plain "audit" should match the lesson but NOT the view entry.
    await act(async () => typeQuery("audit"));
    const viewMatches = container.querySelectorAll('[data-testid="palette-result-view"]');
    expect(viewMatches).toHaveLength(0);
  });
});

/* ============================================================================
 * > prefix surfaces legacy views (Principle I)
 * ========================================================================= */

describe("CommandPalette — > prefix legacy views (FR-027 + R7)", () => {
  it("a bare > query lists every legacy view entry", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    await act(async () => typeQuery(">"));
    const viewResults = container.querySelectorAll('[data-testid="palette-result-view"]');
    expect(viewResults.length).toBe(LEGACY_VIEW_ENTRIES.length);
    // Audit and Sources are present.
    const ids = Array.from(viewResults).map((li) => li.getAttribute("data-target-id"));
    expect(ids).toContain("audit");
    expect(ids).toContain("sources");
  });

  it("`> audit` ranks Course audit to the top", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    await act(async () => typeQuery("> audit"));
    const first = container.querySelector('[data-testid="palette-result-view"]');
    expect(first.getAttribute("data-target-id")).toBe("audit");
  });

  it("> queries never produce lesson/section entries", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    await act(async () => typeQuery("> sources"));
    expect(container.querySelectorAll('[data-testid="palette-result-lesson"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-testid="palette-result-section"]')).toHaveLength(0);
  });
});

/* ============================================================================
 * Selection wiring
 * ========================================================================= */

describe("CommandPalette — selection", () => {
  it("clicking a lesson entry invokes onPickLesson with its id", async () => {
    const onPickLesson = vi.fn();
    await render(
      <CommandPalette open curriculum={curriculum} onPickLesson={onPickLesson} />,
    );
    const first = container.querySelector('[data-testid="palette-result-lesson"]');
    await act(async () => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onPickLesson).toHaveBeenCalledWith(first.getAttribute("data-target-id"));
  });

  it("clicking a section entry invokes onPickSection with lessonId + sectionId", async () => {
    const onPickSection = vi.fn();
    await render(
      <CommandPalette open curriculum={curriculum} onPickSection={onPickSection} />,
    );
    const sec = container.querySelector('[data-testid="palette-result-section"]');
    await act(async () => {
      sec.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onPickSection).toHaveBeenCalledWith(
      sec.getAttribute("data-target-id"),
      sec.getAttribute("data-section-id"),
    );
  });

  it("clicking a > view entry invokes onPickLegacyView with the view id", async () => {
    const onPickLegacyView = vi.fn();
    await render(
      <CommandPalette open curriculum={curriculum} onPickLegacyView={onPickLegacyView} />,
    );
    await act(async () => typeQuery("> audit"));
    const view = container.querySelector('[data-testid="palette-result-view"]');
    await act(async () => {
      view.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onPickLegacyView).toHaveBeenCalledWith("audit");
  });

  it("Enter selects the active row (keyboard nav)", async () => {
    const onPickLesson = vi.fn();
    await render(
      <CommandPalette open curriculum={curriculum} onPickLesson={onPickLesson} />,
    );
    const input = container.querySelector('[data-testid="palette-input"]');
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(onPickLesson).toHaveBeenCalled();
  });

  it("ArrowDown moves the active row down", async () => {
    await render(<CommandPalette open curriculum={curriculum} />);
    const input = container.querySelector('[data-testid="palette-input"]');
    const firstActive = container.querySelectorAll('[role="option"]')[0];
    expect(firstActive.getAttribute("aria-selected")).toBe("true");
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    });
    const items = container.querySelectorAll('[role="option"]');
    expect(items[0].getAttribute("aria-selected")).toBe("false");
    expect(items[1].getAttribute("aria-selected")).toBe("true");
  });
});

describe("CommandPalette — open=false renders nothing", () => {
  it("renders null when closed", async () => {
    await render(<CommandPalette open={false} curriculum={curriculum} />);
    expect(container.querySelector('[data-testid="palette-input"]')).toBeNull();
  });
});

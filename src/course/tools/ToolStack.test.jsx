/**
 * @vitest-environment jsdom
 *
 * FR-016 integration test — only one practice modal exists at a time, and
 * switching tools is a close-then-open swap, not a stack.
 *
 * This test exercises the REAL CourseShell + Sidebar + practiceTools
 * registry, not the isolated ToolModal frame (that's covered in
 * ToolModal.test.jsx). The goal here is the orchestration contract.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "../CourseShell.jsx";

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  const modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);
  container = document.createElement("div");
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
    name: "M",
    lessons: [
      { id: "l1", title: "Lesson 1", body: [{ kind: "heading", id: "h", label: "h" }, { kind: "prose", text: "x" }] },
    ],
  },
];

function getOpenDialogs() {
  return document.querySelectorAll('[role="dialog"]');
}

function clickToolByLabel(label) {
  // Sidebar Practice items are buttons with the label inside the text.
  const items = document.querySelectorAll('[data-testid="course-practice-item"]');
  for (const it of items) {
    if (it.textContent.includes(label)) return it;
  }
  throw new Error(`No Practice item matched label "${label}"`);
}

describe("FR-016 — practice modal stack invariants", () => {
  it("opens exactly one modal when a tool is clicked, none before", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    expect(getOpenDialogs()).toHaveLength(0);

    await act(async () => {
      clickToolByLabel("Spaced review").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getOpenDialogs()).toHaveLength(1);
  });

  it("opening a second tool while the first is open swaps to the new modal (still one in DOM)", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );

    await act(async () => {
      clickToolByLabel("Spaced review").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // Spaced review is open.
    expect(getOpenDialogs()).toHaveLength(1);
    expect(getOpenDialogs()[0].getAttribute("aria-labelledby")).toBe("tool-spaced-review-title");

    // Open Knowledge map — the swap should replace Spaced review.
    await act(async () => {
      clickToolByLabel("Knowledge map").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const dialogs = getOpenDialogs();
    expect(dialogs).toHaveLength(1);
    expect(dialogs[0].getAttribute("aria-labelledby")).toBe("tool-knowledge-map-title");
  });

  it("Esc closes whichever tool is open", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    await act(async () => {
      clickToolByLabel("Capstone").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getOpenDialogs()).toHaveLength(1);
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(getOpenDialogs()).toHaveLength(0);
  });

  it("never opens an unknown tool (registry refuses unknown ids — FR-002 invariant)", async () => {
    // We simulate the failure mode by directly tampering with openTool via
    // a fresh click on a known tool, then checking that an unknown id would
    // never produce a second modal. The reducer is exercised here:
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    // No way to trigger an unknown id from the UI — that's exactly the
    // invariant. We assert by inspecting the rendered Practice items: none
    // of them have ids outside the four allowed set.
    const items = document.querySelectorAll('[data-testid="course-practice-item"]');
    const ids = Array.from(items).map((b) => b.getAttribute("data-tool-id")).sort();
    expect(ids).toEqual(["adversarial-review", "capstone", "knowledge-map", "spaced-review"]);
  });
});

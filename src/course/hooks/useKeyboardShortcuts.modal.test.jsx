/**
 * @vitest-environment jsdom
 *
 * Modal-state suppression — while any modal is open, the global shortcut
 * layer is suppressed except `Esc`, which closes the topmost modal and
 * restores focus to the element that opened it.
 *
 * Spec / contract refs:
 *   - FR-019 + Contract keyboard-shortcuts.md §Scope rules
 *   - Contract tool-modal-protocol.md (Esc-close + focus restore)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "../CourseShell.jsx";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts.js";

let container;
let activeRoot;

beforeEach(() => {
  document.body.innerHTML = "";
  const modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);
  container = document.createElement("div");
  document.body.appendChild(container);
  activeRoot = null;
});

afterEach(async () => {
  if (activeRoot) {
    await act(async () => activeRoot.unmount());
    activeRoot = null;
  }
});

async function render(ui) {
  await act(async () => {
    activeRoot = createRoot(container);
    activeRoot.render(ui);
  });
}

function dispatchKey(opts) {
  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, ...opts }));
}

const curriculum = [
  {
    id: "m1",
    name: "M",
    lessons: [
      { id: "m1-l1", title: "L1", body: [{ kind: "heading", id: "h", label: "h" }] },
      { id: "m1-l2", title: "L2", body: [{ kind: "heading", id: "h", label: "h" }] },
    ],
  },
];

/* ============================================================================
 * Suppression — global shortcuts ignored while a modal is open
 * ========================================================================= */

describe("Modal-state suppression — shell integration", () => {
  it("opening a tool suppresses the b shortcut (no bookmark toggle)", async () => {
    let bookmarks = new Set();
    const setBookmarks = (u) => { bookmarks = typeof u === "function" ? u(bookmarks) : u; };
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        onNavigateLesson={() => {}}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />,
    );

    // Open Adversarial review via the r shortcut.
    await act(async () => dispatchKey({ key: "r" }));
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);

    // While the modal is open, pressing b must NOT add a bookmark.
    await act(async () => dispatchKey({ key: "b" }));
    expect(bookmarks.has("m1-l1")).toBe(false);
  });

  it("opening a tool suppresses j / k (no navigation)", async () => {
    const onNavigate = vi.fn();
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        onNavigateLesson={onNavigate}
        bookmarks={new Set()}
      />,
    );
    await act(async () => dispatchKey({ key: "r" }));
    onNavigate.mockClear();
    await act(async () => dispatchKey({ key: "j" }));
    await act(async () => dispatchKey({ key: "k" }));
    expect(onNavigate).not.toHaveBeenCalled();
  });
});

/* ============================================================================
 * Esc bypasses suppression
 * ========================================================================= */

describe("Esc bypasses modal-state suppression and closes the topmost modal", () => {
  it("Esc closes the open tool modal", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        onNavigateLesson={() => {}}
        bookmarks={new Set()}
      />,
    );
    await act(async () => dispatchKey({ key: "r" }));
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(0);
  });

  it("Esc closes the palette", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        onNavigateLesson={() => {}}
        bookmarks={new Set()}
      />,
    );
    await act(async () => dispatchKey({ key: "k", metaKey: true }));
    expect(document.querySelector('[data-testid="palette-input"]')).not.toBeNull();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(document.querySelector('[data-testid="palette-input"]')).toBeNull();
  });
});

/* ============================================================================
 * Hook-level suppression contract (isolated from the shell)
 * ========================================================================= */

describe("Hook-level isModalOpen contract", () => {
  function Harness({ open, onB, onEsc }) {
    useKeyboardShortcuts({
      isModalOpen: open,
      shortcuts: [
        { key: "b", handler: onB },
        { key: "Escape", alwaysFire: true, handler: onEsc },
      ],
    });
    return null;
  }

  it("isModalOpen=true suppresses non-alwaysFire shortcuts", async () => {
    const onB = vi.fn();
    await render(<Harness open onB={onB} onEsc={() => {}} />);
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).not.toHaveBeenCalled();
  });

  it("isModalOpen=true does NOT suppress alwaysFire shortcuts (Esc)", async () => {
    const onEsc = vi.fn();
    await render(<Harness open onB={() => {}} onEsc={onEsc} />);
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onEsc).toHaveBeenCalled();
  });

  it("isModalOpen=false lets all shortcuts through (sanity)", async () => {
    const onB = vi.fn();
    const onEsc = vi.fn();
    await render(<Harness open={false} onB={onB} onEsc={onEsc} />);
    await act(async () => dispatchKey({ key: "b" }));
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onB).toHaveBeenCalled();
    expect(onEsc).toHaveBeenCalled();
  });
});

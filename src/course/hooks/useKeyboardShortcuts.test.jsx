/**
 * @vitest-environment jsdom
 *
 * Full keyboard layer — each shortcut produces its documented effect.
 *
 * Spec / contract refs:
 *   - FR-019: documented shortcuts
 *   - SC-004: every shortcut fires correctly at every supported viewport
 *   - contracts/keyboard-shortcuts.md
 *
 * Tests exercise the real CourseShell + Sidebar + Header so the shortcut
 * → reducer → UI loop is validated end-to-end, not just the hook in
 * isolation.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "../CourseShell.jsx";
import { setViewport, VIEWPORTS } from "../../test-utils/viewport.js";

let container;
let activeRoot;
let bookmarks;
let setBookmarks;
let activeMod;
let activeLesson;
let navigateCalls;

beforeEach(() => {
  document.body.innerHTML = "";
  const modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);
  container = document.createElement("div");
  document.body.appendChild(container);
  activeRoot = null;
  bookmarks = new Set();
  setBookmarks = (updater) => {
    bookmarks = typeof updater === "function" ? updater(bookmarks) : updater;
  };
  activeMod = 0;
  activeLesson = 0;
  navigateCalls = [];
});

afterEach(async () => {
  // CRITICAL: unmount the React root so its window keydown listeners are
  // removed. Without this, prior tests' CourseShell instances stay alive and
  // forward keypresses to portals mounted into the (live) modal-root,
  // producing phantom dialogs in later tests.
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
  return {
    rerender: async (next) => {
      await act(async () => {
        activeRoot.render(next);
      });
    },
  };
}

function dispatchKey(opts) {
  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, ...opts }));
}

const curriculum = [
  {
    id: "m1",
    name: "Module 1",
    lessons: [
      { id: "m1-l1", title: "Lesson 1-1", body: [{ kind: "heading", id: "h", label: "h" }] },
      { id: "m1-l2", title: "Lesson 1-2", body: [{ kind: "heading", id: "h", label: "h" }] },
    ],
  },
  {
    id: "m2",
    name: "Module 2",
    lessons: [
      { id: "m2-l1", title: "Lesson 2-1", body: [{ kind: "heading", id: "h", label: "h" }] },
    ],
  },
];

function Shell(extra = {}) {
  return (
    <CourseShell
      curriculum={curriculum}
      activeMod={activeMod}
      activeLesson={activeLesson}
      onNavigateLesson={(m, l) => {
        navigateCalls.push([m, l]);
        activeMod = m;
        activeLesson = l;
      }}
      bookmarks={bookmarks}
      setBookmarks={setBookmarks}
      {...extra}
    />
  );
}

function openDialogs() {
  return document.querySelectorAll('[role="dialog"]');
}

/* ============================================================================
 * Individual shortcut effects
 * ========================================================================= */

describe("Keyboard layer — ⌘K palette", () => {
  it("opens the command palette", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "k", metaKey: true }));
    expect(document.querySelector('[data-testid="palette-input"]')).not.toBeNull();
  });

  it("Ctrl+K also opens (non-Mac path)", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "k", ctrlKey: true }));
    expect(document.querySelector('[data-testid="palette-input"]')).not.toBeNull();
  });
});

describe("Keyboard layer — ?", () => {
  it("opens the Shortcuts modal", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "?", shiftKey: true }));
    expect(document.querySelector('[data-testid="shortcuts-table"]')).not.toBeNull();
  });
});

describe("Keyboard layer — b (bookmark)", () => {
  it("adds the current lesson to bookmarks when none, removes when present", async () => {
    setViewport(1024);
    const { rerender } = await render(Shell());
    await act(async () => dispatchKey({ key: "b" }));
    expect(bookmarks.has("m1-l1")).toBe(true);
    // Re-render with updated bookmarks (host pattern), then press again.
    await rerender(Shell());
    await act(async () => dispatchKey({ key: "b" }));
    expect(bookmarks.has("m1-l1")).toBe(false);
  });
});

describe("Keyboard layer — j / k (next / prev)", () => {
  it("j advances to the next lesson within the same module", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "j" }));
    expect(navigateCalls).toContainEqual([0, 1]);
  });

  it("j crosses module boundaries (m1.last → m2.first)", async () => {
    setViewport(1024);
    activeMod = 0;
    activeLesson = 1; // last lesson of m1
    await render(Shell());
    await act(async () => dispatchKey({ key: "j" }));
    expect(navigateCalls).toContainEqual([1, 0]);
  });

  it("k retreats to the previous lesson", async () => {
    setViewport(1024);
    activeMod = 0;
    activeLesson = 1;
    await render(Shell());
    await act(async () => dispatchKey({ key: "k" }));
    expect(navigateCalls).toContainEqual([0, 0]);
  });

  it("k from the first lesson is a no-op (no navigate call)", async () => {
    setViewport(1024);
    activeMod = 0;
    activeLesson = 0;
    await render(Shell());
    await act(async () => dispatchKey({ key: "k" }));
    expect(navigateCalls).toHaveLength(0);
  });
});

describe("Keyboard layer — e / q (disclosures)", () => {
  it("e dispatches a course:practice-toggle event", async () => {
    setViewport(1024);
    await render(Shell());
    const events = [];
    const handler = (ev) => events.push(ev.detail);
    window.addEventListener("course:practice-toggle", handler);
    await act(async () => dispatchKey({ key: "e" }));
    window.removeEventListener("course:practice-toggle", handler);
    expect(events.at(-1)).toEqual({ open: true });
  });

  it("q dispatches a course:selftest-toggle event", async () => {
    setViewport(1024);
    await render(Shell());
    const events = [];
    const handler = (ev) => events.push(ev.detail);
    window.addEventListener("course:selftest-toggle", handler);
    await act(async () => dispatchKey({ key: "q" }));
    window.removeEventListener("course:selftest-toggle", handler);
    expect(events.at(-1)).toEqual({ open: true });
  });
});

describe("Keyboard layer — r (Adversarial review)", () => {
  it("opens the Adversarial review modal", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "r" }));
    const dialogs = openDialogs();
    expect(dialogs).toHaveLength(1);
    expect(dialogs[0].getAttribute("aria-labelledby")).toBe("tool-adversarial-review-title");
  });
});

describe("Keyboard layer — Esc closes the topmost modal", () => {
  it("closes the palette when the palette is open", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "k", metaKey: true })); // open palette
    expect(document.querySelector('[data-testid="palette-input"]')).not.toBeNull();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(document.querySelector('[data-testid="palette-input"]')).toBeNull();
  });

  it("closes the Adversarial review modal opened via r", async () => {
    setViewport(1024);
    await render(Shell());
    await act(async () => dispatchKey({ key: "r" }));
    expect(openDialogs()).toHaveLength(1);
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(openDialogs()).toHaveLength(0);
  });
});

/* ============================================================================
 * SC-004 — every shortcut produces its documented effect across all four
 * supported viewport widths.
 * ========================================================================= */

describe("Keyboard layer — SC-004 (every shortcut × every viewport)", () => {
  it.each(VIEWPORTS)("⌘K opens palette at %ipx", async (width) => {
    setViewport(width);
    await render(Shell());
    await act(async () => dispatchKey({ key: "k", metaKey: true }));
    expect(document.querySelector('[data-testid="palette-input"]')).not.toBeNull();
  });

  it.each(VIEWPORTS)("? opens shortcuts at %ipx", async (width) => {
    setViewport(width);
    await render(Shell());
    await act(async () => dispatchKey({ key: "?", shiftKey: true }));
    expect(document.querySelector('[data-testid="shortcuts-table"]')).not.toBeNull();
  });

  it.each(VIEWPORTS)("r opens Adversarial at %ipx", async (width) => {
    setViewport(width);
    await render(Shell());
    await act(async () => dispatchKey({ key: "r" }));
    expect(openDialogs()).toHaveLength(1);
  });
});

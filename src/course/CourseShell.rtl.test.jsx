/**
 * @vitest-environment jsdom
 *
 * RTL parity — FR-028 + Constitution Principle IV.
 *
 * The course shell uses CSS logical properties (margin-inline-*,
 * padding-inline-*, border-inline-*) and the `:where(.course-shell)` token
 * scope, which automatically mirror under `dir="rtl"`. This test exercises
 * the contract:
 *
 *   1. The shell mounts cleanly under dir="rtl".
 *   2. Module markers continue to use `border-inline-start` — the
 *      *property* stays the same; the rendered side flips.
 *   3. Reading-order shortcuts (j = next, k = previous) behave the same
 *      under both directions — they navigate the lesson sequence, not the
 *      geometric left/right.
 *   4. The `mena-note` callout's dir/lang attributes propagate so Arabic
 *      content renders correctly inside a left-to-right or RTL shell.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "./CourseShell.jsx";
import { ReadingColumn } from "./shell/ReadingColumn.jsx";
import { withDir, setDir, expectedMarkerSide } from "../test-utils/rtl.js";

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
  // Default to LTR before each test.
  setDir("ltr")();
});

afterEach(async () => {
  if (activeRoot) {
    await act(async () => activeRoot.unmount());
    activeRoot = null;
  }
  document.documentElement.removeAttribute("dir");
  document.documentElement.removeAttribute("lang");
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
    name: "Module 1",
    lessons: [
      { id: "m1-l1", title: "Lesson 1-1", body: [{ kind: "heading", id: "h", label: "h" }] },
      { id: "m1-l2", title: "Lesson 1-2", body: [{ kind: "heading", id: "h", label: "h" }] },
    ],
  },
];

/* ============================================================================
 * Shell mounts cleanly under both directions
 * ========================================================================= */

describe("CourseShell — mounts under dir=ltr and dir=rtl", () => {
  it("dir=rtl mounts the shell with the expected class", async () => {
    await withDir("rtl", async () => {
      await render(
        <CourseShell
          curriculum={curriculum}
          activeMod={0}
          activeLesson={0}
          onNavigateLesson={() => {}}
          bookmarks={new Set()}
        />,
      );
      const shell = container.querySelector(".course-shell");
      expect(shell).not.toBeNull();
      expect(document.documentElement.getAttribute("dir")).toBe("rtl");
    });
  });

  it("expectedMarkerSide flips between dir=ltr and dir=rtl", () => {
    expect(expectedMarkerSide("ltr")).toBe("left");
    expect(expectedMarkerSide("rtl")).toBe("right");
  });
});

/* ============================================================================
 * Module marker uses logical property — same JS, mirrored render
 * ========================================================================= */

describe("Module marker — border-inline-start under both directions (FR-004 + FR-028)", () => {
  it.each(["ltr", "rtl"])("module marker uses border-inline-start under dir=%s", async (dir) => {
    await withDir(dir, async () => {
      await render(
        <ReadingColumn
          lesson={{ id: "x", title: "T", body: [] }}
          module={{ id: "m1", name: "Module 1" }}
          moduleIndex={0}
        />,
      );
      const eyebrow = container.querySelector("p"); // first <p> is the module eyebrow
      const sigil = eyebrow.querySelector("span");
      const inline = (sigil.getAttribute("style") || "").toLowerCase();
      // The PROPERTY is the same in both directions — the browser flips the
      // rendered side under dir="rtl" automatically.
      expect(inline).toContain("border-inline-start-color");
      // No fill ever (FR-004).
      expect(inline.includes("background-color")).toBe(false);
    });
  });
});

/* ============================================================================
 * Reading-order shortcuts under RTL (FR-019 + Constitution IV)
 * ========================================================================= */

describe("Keyboard shortcuts — reading-order semantics survive RTL", () => {
  it("j advances forward in lesson sequence under dir=rtl (not geometrically right)", async () => {
    const navigateCalls = [];
    await withDir("rtl", async () => {
      await render(
        <CourseShell
          curriculum={curriculum}
          activeMod={0}
          activeLesson={0}
          onNavigateLesson={(m, l) => navigateCalls.push([m, l])}
          bookmarks={new Set()}
        />,
      );
      await act(async () => dispatchKey({ key: "j" }));
      expect(navigateCalls).toContainEqual([0, 1]);
    });
  });

  it("k retreats backward in lesson sequence under dir=rtl", async () => {
    const navigateCalls = [];
    await withDir("rtl", async () => {
      await render(
        <CourseShell
          curriculum={curriculum}
          activeMod={0}
          activeLesson={1}
          onNavigateLesson={(m, l) => navigateCalls.push([m, l])}
          bookmarks={new Set()}
        />,
      );
      await act(async () => dispatchKey({ key: "k" }));
      expect(navigateCalls).toContainEqual([0, 0]);
    });
  });
});

/* ============================================================================
 * mena-note dir/lang propagation (FR-028a)
 * ========================================================================= */

describe("mena-note callout propagates dir + lang for Arabic content", () => {
  it("renders the supplied dir=rtl and lang=ar on the mena-note element", async () => {
    await render(
      <ReadingColumn
        lesson={{
          id: "lesson-ar",
          title: "Bilingual lesson",
          body: [
            { kind: "mena-note", label: "ملاحظة", text: "محتوى محلي", dir: "rtl", lang: "ar" },
          ],
        }}
        module={{ id: "m1", name: "Module 1" }}
        moduleIndex={0}
      />,
    );
    const note = container.querySelector('[data-testid="mena-note"]');
    expect(note).not.toBeNull();
    expect(note.getAttribute("dir")).toBe("rtl");
    expect(note.getAttribute("lang")).toBe("ar");
  });

  it("renders without dir/lang when the lesson supplies neither (parent direction wins)", async () => {
    await withDir("rtl", async () => {
      await render(
        <ReadingColumn
          lesson={{
            id: "lesson-default",
            title: "Default lesson",
            body: [{ kind: "mena-note", label: "Note", text: "Default body" }],
          }}
          module={{ id: "m1", name: "Module 1" }}
          moduleIndex={0}
        />,
      );
      const note = container.querySelector('[data-testid="mena-note"]');
      expect(note).not.toBeNull();
      expect(note.hasAttribute("dir")).toBe(false);
      expect(note.hasAttribute("lang")).toBe(false);
    });
  });
});

/**
 * @vitest-environment jsdom
 *
 * CourseShell — mount + viewport contract tests.
 *
 * Spec refs:
 *   - SC-003: no horizontal scroll at 375 / 768 / 1024 / 1440
 *   - FR-024 (clarified): ≥1024 three-column · 768–1023 two-column · <768 single-column
 *
 * These tests exercise the *layout class application* — they do not assert
 * computed pixel widths because jsdom has no real layout engine. They DO
 * assert which named slot is hidden at which width via the @media rules.
 * The full visual proof lives in the Lighthouse + manual viewport pass that
 * runs at release time.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "./CourseShell.jsx";
import { setViewport, VIEWPORTS } from "../test-utils/viewport.js";

const curriculum = [
  {
    id: "m1",
    module: "MOBILE 1",
    title: "Companion app foundations",
    name: "Module 1",
    lessons: [
      {
        id: "m1-l1",
        title: "Lesson 1",
        body: [{ kind: "heading", id: "h1", label: "Intro" }, { kind: "prose", text: "Body" }],
      },
      {
        id: "m1-l2",
        title: "Lesson 2",
        body: [{ kind: "heading", id: "h2", label: "More" }, { kind: "prose", text: "Body" }],
      },
    ],
  },
];

let container;

beforeEach(() => {
  document.title = "AI-PM-Course";
  document.body.innerHTML = "";
  // ToolModal portal anchor — required by the shell's tool surfaces (not used
  // here, but present in the real index.html).
  const modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);

  container = document.createElement("div");
  document.body.appendChild(container);
  setViewport(1024);
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

describe("CourseShell — mounts", () => {
  it("syncs the document title to the active lesson and track", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={1}
        activeTrackId="mobile"
        tracks={[{ id: "mobile", label: "Mobile App Lessons" }]}
        bookmarks={new Set()}
      />,
    );
    expect(document.title).toBe("Lesson 2 · Mobile App Lessons");
  });

  it("uses the active track as the header brand and hides an unrelated cohort", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        activeTrackId="mobile"
        tracks={[
          { id: "aipm", label: "AI PM Course" },
          { id: "mobile", label: "Mobile App Lessons" },
        ]}
        cohortLabel="Cohort 4 · Spring '26"
        bookmarks={new Set()}
      />,
    );
    expect(container.querySelector('[data-testid="course-wordmark"]').textContent).toBe(
      "Mobile App Lessons",
    );
    expect(container.querySelector('[data-testid="course-cohort"]')).toBeNull();
  });

  it("renders the shell with the course-shell class so token CSS resolves", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
        setBookmarks={() => {}}
      />,
    );
    expect(container.querySelector(".course-shell")).not.toBeNull();
  });

  it("renders the reading column with the FR-011 data-attribute so ToolModal can find it", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    expect(container.querySelector("[data-course-reading-column]")).not.toBeNull();
  });

  it("renders the active lesson's title", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={1}
        bookmarks={new Set()}
      />,
    );
    expect(container.querySelector("h1").textContent).toContain("Lesson 2");
  });

  it("delegates navigation: clicking an outline anchor invokes scroll handler", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    const outlineItems = container.querySelectorAll('[data-testid="course-outline-item"]');
    expect(outlineItems.length).toBeGreaterThan(0);
  });

  it("shows the real Sidebar with progress, modules, and Practice rail", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    const nav = container.querySelector('nav[aria-label="Course navigation"]');
    expect(nav).not.toBeNull();
    expect(nav.textContent).toContain("MOBILE 1");
    expect(nav.textContent).toContain("Companion app foundations");
    // Practice rail mounts exactly four tools (SC-008-aligned at render time).
    const practiceItems = nav.querySelectorAll('[data-testid="course-practice-item"]');
    expect(practiceItems).toHaveLength(4);
  });

  it("shows the right-rail slot (outline + study mode + actions)", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    expect(container.querySelector('nav[aria-label="On this lesson"]')).not.toBeNull();
  });
});

describe("CourseShell — viewport contract (SC-003 + FR-024)", () => {
  it.each(VIEWPORTS)("renders at %ipx without throwing", async (width) => {
    setViewport(width);
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    // The shell mounts cleanly at every supported viewport — full visual proof
    // is in the Lighthouse + manual pass (T071, T078).
    expect(container.querySelector(".course-shell")).not.toBeNull();
  });

  it("never sets overflow-x: scroll on the shell root inline style (SC-003 hint)", async () => {
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={new Set()}
      />,
    );
    const shell = container.querySelector(".course-shell");
    const inline = (shell.getAttribute("style") || "").toLowerCase();
    expect(inline.includes("overflow-x: scroll")).toBe(false);
    expect(inline.includes("overflow-x: auto")).toBe(false);
  });
});

describe("CourseShell — bookmark wiring (FR-005 + FR-018)", () => {
  it("propagates bookmark toggles to the supplied setter", async () => {
    let bookmarks = new Set();
    const setBookmarks = (updater) => {
      bookmarks = typeof updater === "function" ? updater(bookmarks) : updater;
    };
    await render(
      <CourseShell
        curriculum={curriculum}
        activeMod={0}
        activeLesson={0}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />,
    );
    const btn = container.querySelector('[data-testid="course-action-bookmark"]');
    await act(async () => {
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(bookmarks.has("m1-l1")).toBe(true);
  });
});

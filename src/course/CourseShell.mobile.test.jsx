/**
 * @vitest-environment jsdom
 *
 * CourseShell — mobile navigation (FR-024).
 *
 * The CSS module hides the sidebar <768px and the right rail <1024px; these
 * tests verify the off-canvas drawers that surface them. jsdom has no layout
 * engine, so we drive the tier via the matchMedia stub in setViewport and
 * assert the JS behavior (toggle presence, drawer open/close, navigation).
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CourseShell } from "./CourseShell.jsx";
import { setViewport } from "../test-utils/viewport.js";

const curriculum = [
  {
    id: "m1",
    name: "Module 1",
    lessons: [
      { id: "m1-l1", title: "Lesson One", content: "**Intro**\nBody.", keys: ["k"] },
      { id: "m1-l2", title: "Lesson Two", content: "**More**\nBody." },
    ],
  },
];

let container;
let root;
let restoreViewport;

beforeEach(() => {
  document.body.innerHTML = "";
  const modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => root?.unmount());
  restoreViewport?.();
});

async function render(ui) {
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
}
const baseProps = { curriculum, activeMod: 0, activeLesson: 0, bookmarks: new Set(), setBookmarks: () => {} };

describe("CourseShell — mobile drawers <768px", () => {
  beforeEach(() => { restoreViewport = setViewport(375); });

  it("shows the hamburger nav toggle and outline toggle in the header", async () => {
    await render(<CourseShell {...baseProps} />);
    expect(container.querySelector('[data-testid="course-nav-toggle"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-outline-toggle"]')).not.toBeNull();
  });

  it("opens a nav drawer containing the sidebar when the hamburger is tapped", async () => {
    await render(<CourseShell {...baseProps} />);
    expect(container.querySelector('[data-testid="course-mobile-drawer"]')).toBeNull();
    await act(async () => container.querySelector('[data-testid="course-nav-toggle"]').click());
    const drawer = container.querySelector('[data-testid="course-mobile-drawer"]');
    expect(drawer).not.toBeNull();
    // The drawer hosts the real sidebar (module list + practice rail).
    expect(drawer.querySelector('nav[aria-label="Course navigation"]')).not.toBeNull();
    expect(drawer.querySelectorAll('[data-testid="course-practice-item"]')).toHaveLength(4);
  });

  it("selecting a lesson in the drawer navigates and closes the drawer", async () => {
    const nav = [];
    await render(<CourseShell {...baseProps} onNavigateLesson={(m, l) => nav.push([m, l])} />);
    await act(async () => container.querySelector('[data-testid="course-nav-toggle"]').click());
    const drawer = container.querySelector('[data-testid="course-mobile-drawer"]');
    const links = drawer.querySelectorAll('[data-testid="course-lesson-link"]');
    await act(async () => links[1].click());
    expect(nav).toContainEqual([0, 1]);
    expect(container.querySelector('[data-testid="course-mobile-drawer"]')).toBeNull();
  });

  it("opens an outline drawer when the outline toggle is tapped", async () => {
    await render(<CourseShell {...baseProps} />);
    await act(async () => container.querySelector('[data-testid="course-outline-toggle"]').click());
    const drawer = container.querySelector('[data-testid="course-mobile-drawer"][data-side="end"]');
    expect(drawer).not.toBeNull();
    expect(drawer.querySelector('nav[aria-label="On this lesson"]')).not.toBeNull();
  });

  it("does not render the desktop sidebar below 768px (drawer is the only copy)", async () => {
    await render(<CourseShell {...baseProps} />);
    // No drawer open → no live Sidebar nav anywhere (desktop slot gated off).
    expect(container.querySelector('nav[aria-label="Course navigation"]')).toBeNull();
  });

  it("emits no duplicate DOM ids while the nav drawer is open", async () => {
    await render(<CourseShell {...baseProps} />);
    await act(async () => container.querySelector('[data-testid="course-nav-toggle"]').click());
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("CourseShell — desktop ≥1024px", () => {
  beforeEach(() => { restoreViewport = setViewport(1440); });

  it("does not render mobile nav/outline toggles", async () => {
    await render(<CourseShell {...baseProps} />);
    expect(container.querySelector('[data-testid="course-nav-toggle"]')).toBeNull();
    expect(container.querySelector('[data-testid="course-outline-toggle"]')).toBeNull();
  });
});

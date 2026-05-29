/**
 * @vitest-environment jsdom
 *
 * MobileDrawer — off-canvas drawer chrome (FR-024).
 * Verifies: closed → no DOM; open → panel + backdrop + close; Esc closes;
 * backdrop click closes; body scroll-locks while open and restores on close.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MobileDrawer } from "./MobileDrawer.jsx";

let container;
let root;

beforeEach(() => {
  document.body.innerHTML = "";
  document.body.style.overflow = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => root?.unmount());
});

async function render(ui) {
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
}

describe("MobileDrawer", () => {
  it("renders nothing when closed", async () => {
    await render(<MobileDrawer open={false} label="Nav" onClose={() => {}}>x</MobileDrawer>);
    expect(container.querySelector('[data-testid="course-mobile-drawer"]')).toBeNull();
  });

  it("renders panel, backdrop, close button, and children when open", async () => {
    await render(<MobileDrawer open side="start" label="Course navigation" onClose={() => {}}><p>DRAWER BODY</p></MobileDrawer>);
    expect(container.querySelector('[data-testid="course-mobile-drawer"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-mobile-drawer-backdrop"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-mobile-drawer-close"]')).not.toBeNull();
    const panel = container.querySelector('aside[aria-label="Course navigation"]');
    expect(panel).not.toBeNull();
    expect(panel.textContent).toContain("DRAWER BODY");
  });

  it("closes on Escape", async () => {
    let closed = false;
    await render(<MobileDrawer open label="Nav" onClose={() => { closed = true; }}>x</MobileDrawer>);
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(closed).toBe(true);
  });

  it("closes on backdrop click", async () => {
    let closed = false;
    await render(<MobileDrawer open label="Nav" onClose={() => { closed = true; }}>x</MobileDrawer>);
    const backdrop = container.querySelector('[data-testid="course-mobile-drawer-backdrop"]');
    await act(async () => {
      backdrop.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(closed).toBe(true);
  });

  it("close button invokes onClose", async () => {
    let closed = false;
    await render(<MobileDrawer open label="Nav" onClose={() => { closed = true; }}>x</MobileDrawer>);
    await act(async () => {
      container.querySelector('[data-testid="course-mobile-drawer-close"]').click();
    });
    expect(closed).toBe(true);
  });

  it("locks body scroll while open and restores it on close", async () => {
    await render(<MobileDrawer open label="Nav" onClose={() => {}}>x</MobileDrawer>);
    expect(document.body.style.overflow).toBe("hidden");
    await act(async () => root.render(<MobileDrawer open={false} label="Nav" onClose={() => {}}>x</MobileDrawer>));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("anchors to the inline-end edge when side='end'", async () => {
    await render(<MobileDrawer open side="end" label="Outline" onClose={() => {}}>x</MobileDrawer>);
    const panel = container.querySelector('aside[aria-label="Outline"]');
    expect(panel.style.insetInlineEnd).toBe("0px");
  });
});

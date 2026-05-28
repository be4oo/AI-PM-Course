/**
 * @vitest-environment jsdom
 *
 * MobileChrome contract tests.
 *
 * Spec ref: FR-024 (clarified): below 768px the layout MUST collapse to a
 * single reading column with both the sidebar and outline accessible via
 * toggles. Edge Case: Practice rail + account menu remain reachable.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MobileChrome } from "./MobileChrome.jsx";
import { setViewport } from "../../test-utils/viewport.js";

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
  setViewport(375);
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

const sidebar = <div data-testid="fake-sidebar">SIDEBAR</div>;
const outline = <div data-testid="fake-outline">OUTLINE</div>;

describe("MobileChrome — default state", () => {
  it("renders both panels in the DOM, both hidden by default at 375px", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const sidebarPanel = container.querySelector('[data-testid="course-mobile-sidebar"]');
    const outlinePanel = container.querySelector('[data-testid="course-mobile-outline"]');
    expect(sidebarPanel).not.toBeNull();
    expect(outlinePanel).not.toBeNull();
    expect(sidebarPanel.getAttribute("aria-hidden")).toBe("true");
    expect(outlinePanel.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders both triggers (hamburger + outline)", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    expect(container.querySelector('[data-testid="course-mobile-hamburger"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-mobile-outline-toggle"]')).not.toBeNull();
  });

  it("no backdrop visible until a panel opens", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    expect(container.querySelector('[data-testid="course-mobile-backdrop"]')).toBeNull();
  });
});

describe("MobileChrome — hamburger opens the sidebar", () => {
  it("clicking the hamburger sets aria-expanded=true and aria-hidden=false on the sidebar", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const hamburger = container.querySelector('[data-testid="course-mobile-hamburger"]');
    await act(async () => {
      hamburger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(hamburger.getAttribute("aria-expanded")).toBe("true");
    const sidebarPanel = container.querySelector('[data-testid="course-mobile-sidebar"]');
    expect(sidebarPanel.getAttribute("aria-hidden")).toBe("false");
    // Outline stays closed.
    const outlinePanel = container.querySelector('[data-testid="course-mobile-outline"]');
    expect(outlinePanel.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders a backdrop when a panel is open", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const hamburger = container.querySelector('[data-testid="course-mobile-hamburger"]');
    await act(async () => {
      hamburger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(container.querySelector('[data-testid="course-mobile-backdrop"]')).not.toBeNull();
  });

  it("backdrop click closes the open panel", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const hamburger = container.querySelector('[data-testid="course-mobile-hamburger"]');
    await act(async () => {
      hamburger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    const backdrop = container.querySelector('[data-testid="course-mobile-backdrop"]');
    await act(async () => {
      // mousedown on backdrop closes (target === currentTarget).
      const ev = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
      backdrop.dispatchEvent(ev);
    });
    expect(container.querySelector('[data-testid="course-mobile-sidebar"]').getAttribute("aria-hidden")).toBe("true");
  });
});

describe("MobileChrome — outline toggle", () => {
  it("clicking the outline toggle opens the outline panel only", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const toggle = container.querySelector('[data-testid="course-mobile-outline-toggle"]');
    await act(async () => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    const outlinePanel = container.querySelector('[data-testid="course-mobile-outline"]');
    const sidebarPanel = container.querySelector('[data-testid="course-mobile-sidebar"]');
    expect(outlinePanel.getAttribute("aria-hidden")).toBe("false");
    expect(sidebarPanel.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("MobileChrome — keyboard reachability (FR-022)", () => {
  it("Esc closes the open panel", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const hamburger = container.querySelector('[data-testid="course-mobile-hamburger"]');
    await act(async () => {
      hamburger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(container.querySelector('[data-testid="course-mobile-sidebar"]').getAttribute("aria-hidden")).toBe("false");
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(container.querySelector('[data-testid="course-mobile-sidebar"]').getAttribute("aria-hidden")).toBe("true");
  });

  it("triggers carry button semantics (tab-reachable by default)", async () => {
    await render(<MobileChrome sidebar={sidebar} outline={outline} />);
    const hamburger = container.querySelector('[data-testid="course-mobile-hamburger"]');
    const toggle = container.querySelector('[data-testid="course-mobile-outline-toggle"]');
    expect(hamburger.tagName).toBe("BUTTON");
    expect(toggle.tagName).toBe("BUTTON");
    // Neither carries tabindex=-1.
    expect(hamburger.getAttribute("tabindex")).toBeNull();
    expect(toggle.getAttribute("tabindex")).toBeNull();
  });
});

/**
 * @vitest-environment jsdom
 *
 * Header contract tests.
 *
 * Spec refs:
 *   - FR-008: wordmark, cohort subtitle (≥1024px), ⌘K trigger, streak chip,
 *             avatar — none wrap at 375/768/1024/1440.
 *   - FR-009: avatar opens AccountMenu with six items in exact order.
 *   - SC-003: page exhibits no horizontal scroll at the four widths.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./Header.jsx";
import { setViewport, VIEWPORTS } from "../../test-utils/viewport.js";
import { ACCOUNT_MENU_ITEMS } from "../account/accountMenuItems.js";

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
 * Wordmark + cohort subtitle visibility
 * ========================================================================= */

describe("Header — wordmark and cohort (FR-008)", () => {
  it("renders the italic-roman wordmark with ai + PM elements", async () => {
    setViewport(1440);
    await render(<Header cohortLabel="Cohort 4 · Spring '26" />);
    const wordmark = container.querySelector('[data-testid="course-wordmark"]');
    expect(wordmark).not.toBeNull();
    expect(wordmark.textContent).toContain("ai");
    expect(wordmark.textContent).toContain("PM");
  });

  it("shows the cohort subtitle at ≥1024px", async () => {
    setViewport(1024);
    await render(<Header cohortLabel="Cohort 4 · Spring '26" />);
    const cohort = container.querySelector('[data-testid="course-cohort"]');
    expect(cohort).not.toBeNull();
    expect(cohort.style.display).not.toBe("none");
  });

  it("hides the cohort subtitle below 1024px", async () => {
    setViewport(768);
    await render(<Header cohortLabel="Cohort 4 · Spring '26" />);
    const cohort = container.querySelector('[data-testid="course-cohort"]');
    expect(cohort).not.toBeNull();
    expect(cohort.style.display).toBe("none");
  });

  it("hides the cohort subtitle at 375px", async () => {
    setViewport(375);
    await render(<Header cohortLabel="Cohort 4 · Spring '26" />);
    const cohort = container.querySelector('[data-testid="course-cohort"]');
    expect(cohort.style.display).toBe("none");
  });
});

/* ============================================================================
 * Non-wrap contract — every header element stays on one row
 * ========================================================================= */

describe("Header — non-wrap contract (FR-008 + SC-003)", () => {
  it.each(VIEWPORTS)("at %ipx the header is a single nowrap row", async (width) => {
    setViewport(width);
    await render(<Header cohortLabel="Cohort 4 · Spring '26" streakDays={11} />);
    const header = container.querySelector('[data-testid="course-header"]');
    // The header style is inline: whiteSpace nowrap + grid auto/1fr/auto means
    // contents cannot wrap to a second visual line. Assert the inline style.
    const inline = (header.getAttribute("style") || "").toLowerCase();
    expect(inline).toContain("white-space: nowrap");
    expect(inline.includes("flex-wrap: wrap")).toBe(false);
  });
});

/* ============================================================================
 * ⌘K palette trigger
 * ========================================================================= */

describe("Header — ⌘K palette trigger", () => {
  it("renders a Search button with a kbd label", async () => {
    setViewport(1024);
    await render(<Header />);
    const trigger = container.querySelector('[data-testid="course-palette-trigger"]');
    expect(trigger).not.toBeNull();
    expect(trigger.textContent.toLowerCase()).toContain("search");
    expect(trigger.querySelector("kbd")).not.toBeNull();
  });

  it("clicking the trigger invokes onOpenPalette", async () => {
    setViewport(1024);
    const onOpenPalette = vi.fn();
    await render(<Header onOpenPalette={onOpenPalette} />);
    await act(async () => {
      container.querySelector('[data-testid="course-palette-trigger"]').dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });
    expect(onOpenPalette).toHaveBeenCalled();
  });
});

/* ============================================================================
 * Streak chip
 * ========================================================================= */

describe("Header — streak chip", () => {
  it("renders the streak chip when streakDays is supplied", async () => {
    setViewport(1024);
    await render(<Header streakDays={11} />);
    const chip = container.querySelector('[data-testid="course-streak-chip"]');
    expect(chip).not.toBeNull();
    expect(chip.textContent).toContain("11");
  });

  it("omits the streak chip when streakDays is not supplied", async () => {
    setViewport(1024);
    await render(<Header />);
    expect(container.querySelector('[data-testid="course-streak-chip"]')).toBeNull();
  });
});

/* ============================================================================
 * Avatar + AccountMenu (FR-009)
 * ========================================================================= */

describe("Header — avatar opens AccountMenu (FR-009)", () => {
  it("clicking the avatar opens the AccountMenu", async () => {
    setViewport(1024);
    await render(<Header />);
    expect(container.querySelector('[data-testid="account-menu"]')).toBeNull();
    await act(async () => {
      container.querySelector('[data-testid="course-avatar"]').dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });
    expect(container.querySelector('[data-testid="account-menu"]')).not.toBeNull();
  });

  it("menu items appear in the spec-mandated order", async () => {
    setViewport(1024);
    await render(<Header />);
    await act(async () => {
      container.querySelector('[data-testid="course-avatar"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const items = container.querySelectorAll('[role="menuitem"]');
    const labels = Array.from(items).map((b) => b.textContent.trim());
    expect(labels).toEqual(ACCOUNT_MENU_ITEMS.map((i) => i.label));
  });

  it("selecting an item invokes onSelectAccountItem with the item's id and closes the menu", async () => {
    setViewport(1024);
    const onSelectAccountItem = vi.fn();
    await render(<Header onSelectAccountItem={onSelectAccountItem} />);
    await act(async () => {
      container.querySelector('[data-testid="course-avatar"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="account-menu-export"]').dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });
    expect(onSelectAccountItem).toHaveBeenCalledWith("export");
    expect(container.querySelector('[data-testid="account-menu"]')).toBeNull();
  });
});

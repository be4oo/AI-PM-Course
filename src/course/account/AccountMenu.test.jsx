/**
 * @vitest-environment jsdom
 *
 * AccountMenu — six items in exact order.
 *
 * Spec ref: FR-009 — exact item count, exact order, exact labels.
 * Tests T060 lock the contract in. Adding / reordering items requires a
 * spec amendment because both the Header (T056) and CourseShell (T057)
 * route on item ids.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { AccountMenu } from "./AccountMenu.jsx";
import { ACCOUNT_MENU_ITEMS } from "./accountMenuItems.js";

const SPEC_ORDER = Object.freeze([
  "Profile & cohort",
  "Export progress",
  "Import progress",
  "Display & settings",
  "Keyboard shortcuts",
  "Sign out",
]);

const SPEC_IDS = Object.freeze([
  "profile",
  "export",
  "import",
  "display",
  "shortcuts",
  "sign-out",
]);

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

describe("AccountMenu — FR-009 contract", () => {
  it("ACCOUNT_MENU_ITEMS has exactly six entries", () => {
    expect(ACCOUNT_MENU_ITEMS).toHaveLength(6);
  });

  it("ACCOUNT_MENU_ITEMS exposes ids and labels in the spec-mandated order", () => {
    expect(ACCOUNT_MENU_ITEMS.map((i) => i.id)).toEqual([...SPEC_IDS]);
    expect(ACCOUNT_MENU_ITEMS.map((i) => i.label)).toEqual([...SPEC_ORDER]);
  });

  it("the constant array (and each entry) is frozen so callers cannot mutate it", () => {
    expect(Object.isFrozen(ACCOUNT_MENU_ITEMS)).toBe(true);
    for (const item of ACCOUNT_MENU_ITEMS) {
      expect(Object.isFrozen(item)).toBe(true);
    }
  });

  it("renders exactly six menuitems in spec order", async () => {
    await render(<AccountMenu />);
    const items = container.querySelectorAll('[role="menuitem"]');
    expect(items).toHaveLength(6);
    expect(Array.from(items).map((b) => b.textContent.trim())).toEqual([...SPEC_ORDER]);
  });

  it("the host menu carries role=menu and an aria-label for assistive tech", async () => {
    await render(<AccountMenu />);
    const menu = container.querySelector('[data-testid="account-menu"]');
    expect(menu.getAttribute("role")).toBe("menu");
    expect(menu.getAttribute("aria-label")).toBe("Account");
  });

  it("each item exposes a stable data-testid keyed to its id", async () => {
    await render(<AccountMenu />);
    for (const id of SPEC_IDS) {
      expect(container.querySelector(`[data-testid="account-menu-${id}"]`)).not.toBeNull();
    }
  });

  it("clicking an item invokes onSelect with its id", async () => {
    const onSelect = vi.fn();
    await render(<AccountMenu onSelect={onSelect} />);
    await act(async () => {
      container
        .querySelector('[data-testid="account-menu-import"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onSelect).toHaveBeenCalledWith("import");
  });

  it("Esc inside the menu invokes onDismiss", async () => {
    const onDismiss = vi.fn();
    await render(<AccountMenu onDismiss={onDismiss} />);
    const menu = container.querySelector('[data-testid="account-menu"]');
    await act(async () => {
      menu.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(onDismiss).toHaveBeenCalled();
  });
});

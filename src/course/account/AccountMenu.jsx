/**
 * AccountMenu — six items in exact order.
 *
 * Spec ref: FR-009 — clicking the avatar MUST open an account menu with
 * exactly six items in this order:
 *   1. Profile & cohort
 *   2. Export progress
 *   3. Import progress
 *   4. Display & settings
 *   5. Keyboard shortcuts
 *   6. Sign out
 *
 * The order is part of the contract (User Story 4 acceptance #2). Tests
 * (T060) lock it in; do not reorder without amending the spec.
 *
 * The menu owns no state — it is a stateless list of items rendered into a
 * popover. The parent (Header) controls visibility.
 */

import { ACCOUNT_MENU_ITEMS } from "./accountMenuItems.js";

export function AccountMenu({ onSelect, onDismiss }) {
  return (
    <div
      role="menu"
      aria-label="Account"
      data-testid="account-menu"
      style={menuStyle}
      onKeyDown={(e) => {
        if (e.key === "Escape") onDismiss?.();
      }}
    >
      <ul style={listStyle}>
        {ACCOUNT_MENU_ITEMS.map((item) => (
          <li key={item.id} role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => onSelect?.(item.id)}
              data-testid={`account-menu-${item.id}`}
              style={itemStyle}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const menuStyle = {
  background: "var(--bg-elev)",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  minInlineSize: "12rem",
  // Never exceed the viewport on a 320px phone (the popover anchors to the
  // avatar near the inline-end edge, so an uncapped 12rem+ menu could clip).
  maxInlineSize: "min(15rem, calc(100vw - 1rem))",
  padding: "0.25rem",
  color: "var(--ink)",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.5)",
};
const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
};
const itemStyle = {
  appearance: "none",
  background: "transparent",
  border: "none",
  color: "var(--ink)",
  textAlign: "start",
  inlineSize: "100%",
  // ≥44px tap target (WCAG 2.5.5) — items were ~28px.
  display: "flex",
  alignItems: "center",
  minBlockSize: "44px",
  padding: "0.5rem 0.7rem",
  borderRadius: "0.2rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
};

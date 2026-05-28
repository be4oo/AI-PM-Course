/**
 * Account menu items — the FR-009 contract (six items, fixed order).
 *
 * Lives in its own file so React Fast Refresh keeps AccountMenu.jsx as a
 * component-only module. The constant is frozen; tests + CourseShell
 * import from here.
 */

/** @type {ReadonlyArray<{id: string, label: string}>} */
export const ACCOUNT_MENU_ITEMS = Object.freeze([
  Object.freeze({ id: "profile",    label: "Profile & cohort" }),
  Object.freeze({ id: "export",     label: "Export progress" }),
  Object.freeze({ id: "import",     label: "Import progress" }),
  Object.freeze({ id: "display",    label: "Display & settings" }),
  Object.freeze({ id: "shortcuts",  label: "Keyboard shortcuts" }),
  Object.freeze({ id: "sign-out",   label: "Sign out" }),
]);

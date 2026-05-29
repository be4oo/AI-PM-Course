/**
 * MobileDrawer — generic off-canvas panel for narrow viewports.
 *
 * Surfaces the sidebar (module nav + practice tools) and the right-rail
 * outline as slide-in drawers below their inline breakpoints (FR-024), so a
 * phone user can still navigate, open tools, and reach the outline. Mirrors
 * the design bundle's mobile sidebar drawer (course.css `.side` / `.side.open`
 * / `.side-backdrop` + `.menu-btn`) while staying token-bound and RTL-safe via
 * logical insets.
 *
 * Owns the chrome (backdrop, Esc-close, focus-trap, body scroll-lock, focus
 * restore); CourseShell owns open/close state and decides the panel contents.
 * Rendered inside the `.course-shell` subtree (not portalled) so design tokens
 * resolve. Returns null when closed — no off-screen DOM, no focus leak.
 */

import { useEffect, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap.js";

export function MobileDrawer({ open, side = "start", label, onClose, children }) {
  const panelRef = useRef(null);

  // Esc closes the drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Body scroll-lock while the drawer is open (audit: page scrolled behind the
  // panel). Save + restore the prior value so we never clobber another lock.
  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap (captures + restores the trigger internally, like ToolModal).
  useFocusTrap({ active: open, containerRef: panelRef });

  if (!open) return null;

  return (
    <div data-testid="course-mobile-drawer" data-side={side}>
      <div
        role="presentation"
        data-testid="course-mobile-drawer-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
        style={backdropStyle}
      />
      <aside
        ref={panelRef}
        aria-label={label}
        style={{
          ...panelStyle,
          insetInlineStart: side === "start" ? 0 : "auto",
          insetInlineEnd: side === "end" ? 0 : "auto",
        }}
      >
        <div style={panelHeadStyle}>
          <span style={panelLabelStyle}>{label}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-testid="course-mobile-drawer-close"
            style={closeButtonStyle}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div style={panelBodyStyle}>{children}</div>
      </aside>
    </div>
  );
}

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(8, 7, 6, 0.55)",
  backdropFilter: "blur(2px)",
  zIndex: 900,
};
const panelStyle = {
  position: "fixed",
  insetBlockStart: 0,
  insetBlockEnd: 0,
  inlineSize: "min(86vw, 340px)",
  background: "var(--bg-elev)",
  color: "var(--ink)",
  borderInline: "1px solid var(--rule)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  zIndex: 950,
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
};
const panelHeadStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  paddingBlock: "0.75rem",
  paddingInline: "1rem",
  borderBlockEnd: "1px solid var(--rule)",
};
const panelLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
};
const closeButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink)",
  cursor: "pointer",
  minInlineSize: "44px",
  minBlockSize: "44px",
  display: "inline-grid",
  placeItems: "center",
  fontFamily: "var(--mono)",
  fontSize: "1rem",
};
const panelBodyStyle = {
  flex: 1,
  overflow: "auto",
  padding: "1rem",
};

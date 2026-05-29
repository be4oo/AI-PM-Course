/**
 * ToolModal — shared frame for the four Practice tools.
 *
 * Contract: specs/001-course-page-redesign/contracts/tool-modal-protocol.md
 * Spec ref: FR-011 (modal over current lesson), FR-016 (one-at-a-time),
 *           FR-023 (focus trap + aria announcement)
 *
 * Responsibilities (owned by the frame, not the body):
 *   - Portal mount into #course-modal-root
 *   - Focus trap via useFocusTrap; focus-restore to the trigger
 *   - Esc close + backdrop click close (configurable via dismissOnBackdrop)
 *   - Body scroll lock (saved + restored on close)
 *   - Reading-column scroll position save/restore (per spec FR-011)
 *   - ARIA: role="dialog", aria-modal=true, aria-labelledby
 *   - One-at-a-time invariant: the frame surfaces a counter in dev so
 *     accidental stacking is visible before it ships.
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import {
  bumpOpenModalCount,
  decrementOpenModalCount,
} from "./ToolModal.testing.js";

const MODAL_ROOT_ID = "course-modal-root";

// Close affordance pinned to the dialog's top inline-end corner. Absolute so it
// never disrupts the body's flow; out of flow means tool headings keep their
// own layout. Esc + backdrop-tap remain the primary dismissals.
const modalCloseStyle = {
  position: "absolute",
  insetBlockStart: "0.5rem",
  insetInlineEnd: "0.5rem",
  appearance: "none",
  background: "var(--bg-elev, #161412)",
  border: "1px solid var(--rule, #2a2622)",
  borderRadius: "0.3rem",
  color: "var(--ink, #ece7d8)",
  cursor: "pointer",
  minInlineSize: "40px",
  minBlockSize: "40px",
  display: "inline-grid",
  placeItems: "center",
  fontFamily: "var(--mono, monospace)",
  fontSize: "0.9rem",
  zIndex: 2,
};
const READING_COLUMN_SELECTOR = "[data-course-reading-column]";

const IS_DEV =
  typeof import.meta !== "undefined" &&
  (import.meta.env?.DEV === true || import.meta.env?.MODE === "development");

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {string}  props.titleId                ID applied to the visible heading inside `children`
 * @param {string}  [props.ariaLabel]            fallback when no visible title
 * @param {boolean} [props.dismissOnBackdrop=true]
 * @param {() => void} props.onClose             invoked on Esc, backdrop click, or programmatic close
 * @param {React.ReactNode} props.children       tool body (renders the heading with id=titleId)
 */
export function ToolModal({
  open,
  titleId,
  ariaLabel,
  dismissOnBackdrop = true,
  onClose,
  children,
}) {
  const containerRef = useRef(null);
  const savedScrollRef = useRef(0);
  const savedBodyOverflowRef = useRef("");
  const readingColumnRef = useRef(null);

  // ---- Lifecycle: enter ----
  useEffect(() => {
    if (!open) return undefined;

    // FR-016 invariant tracking (dev-mode visibility).
    const count = bumpOpenModalCount();
    if (count > 1 && IS_DEV) {
      console.warn("[ToolModal] More than one modal is open simultaneously. Spec FR-016 requires close-then-open.");
    }

    // Save reading-column scroll position (spec FR-011).
    if (typeof document !== "undefined") {
      const reading = document.querySelector(READING_COLUMN_SELECTOR);
      if (reading) {
        readingColumnRef.current = reading;
        savedScrollRef.current = reading.scrollTop || 0;
      }
    }

    // Body lock — save before locking so we restore the user's previous value.
    if (typeof document !== "undefined") {
      savedBodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      decrementOpenModalCount();

      // Restore body overflow.
      if (typeof document !== "undefined") {
        document.body.style.overflow = savedBodyOverflowRef.current;
      }

      // Restore reading-column scroll position.
      if (readingColumnRef.current) {
        readingColumnRef.current.scrollTop = savedScrollRef.current;
      }
    };
  }, [open]);

  // ---- Esc-close ----
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

  // ---- Focus trap (captures and restores the trigger internally) ----
  useFocusTrap({
    active: open,
    containerRef,
  });

  if (!open) return null;

  const portalRoot = typeof document !== "undefined" ? document.getElementById(MODAL_ROOT_ID) : null;
  if (!portalRoot) {
    if (IS_DEV) {
      console.warn(`[ToolModal] #${MODAL_ROOT_ID} not found in DOM. Add it as a sibling of #root in index.html.`);
    }
    return null;
  }

  const onBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget && dismissOnBackdrop) {
      onClose?.();
    }
  };

  // Inline styles intentionally — the editorial-dark backdrop. CSS-module
  // styling will land alongside the first tool body component in Phase 5.
  return createPortal(
    <div
      onMouseDown={onBackdropMouseDown}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8, 7, 6, 0.72)",
        backdropFilter: "blur(2px)",
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        {...(titleId ? { "aria-labelledby": titleId } : { "aria-label": ariaLabel })}
        style={{
          position: "relative",
          background: "var(--bg-elev, #161412)",
          color: "var(--ink, #ece7d8)",
          border: "1px solid var(--rule, #2a2622)",
          borderRadius: "0.5rem",
          minWidth: "min(640px, 100%)",
          maxWidth: "min(1024px, 100%)",
          maxHeight: "calc(100dvh - 2rem)",
          overflow: "auto",
          // Reclaim ~16px of usable width on a 320px phone vs a flat 1.5rem.
          padding: "clamp(1rem, 4vw, 1.5rem)",
        }}
      >
        <button
          type="button"
          onClick={() => onClose?.()}
          aria-label="Close"
          data-testid="course-modal-close"
          style={modalCloseStyle}
        >
          <span aria-hidden="true">✕</span>
        </button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
}

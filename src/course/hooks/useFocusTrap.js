/**
 * useFocusTrap — trap keyboard focus inside a container, restore on cleanup.
 *
 * Spec/contract refs:
 *   - FR-023: modal MUST trap focus while open, restore focus to trigger on close
 *   - contracts/tool-modal-protocol.md: shared frame owns focus-trap
 *
 * Behavior:
 *   1. On mount with `active === true`, move focus to `initialFocus` (or the
 *      first tabbable element inside `containerRef`).
 *   2. While active, intercept Tab / Shift+Tab so focus cycles inside the
 *      container. Browser default focus order is preserved within the
 *      container itself.
 *   3. On unmount or when `active` flips to false, restore focus to
 *      `restoreFocus` if it is still in the DOM and focusable; otherwise
 *      focus falls back to the body (no throw).
 *
 * NOT included here:
 *   - Esc close behavior — owned by ToolModal (a separate keydown handler).
 *   - body-scroll lock — owned by ToolModal.
 */

import { useEffect } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled]):not([type=\"hidden\"])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex=\"-1\"])",
  "[contenteditable=\"true\"]",
].join(",");

/**
 * @param {object} params
 * @param {boolean} params.active                          whether the trap is engaged
 * @param {React.RefObject<HTMLElement>} params.containerRef
 * @param {HTMLElement | null} [params.initialFocus]       element to focus on open;
 *                                                         defaults to first tabbable
 * @param {React.RefObject<HTMLElement | null>} [params.restoreFocusRef]
 *   ref whose `.current` is the element to restore focus to on close.
 *   Read inside the effect (never during render). Defaults to capturing
 *   `document.activeElement` at the moment the trap activates.
 */
export function useFocusTrap({ active, containerRef, initialFocus, restoreFocusRef }) {
  useEffect(() => {
    if (!active) return undefined;
    const container = containerRef?.current;
    if (!container) return undefined;

    const previouslyFocused =
      restoreFocusRef?.current ??
      (typeof document !== "undefined" ? document.activeElement : null);

    // Focus initial element (or first tabbable).
    const target = initialFocus ?? firstTabbable(container);
    if (target && typeof target.focus === "function") {
      // Defer to next tick so React has committed the DOM.
      queueMicrotask(() => target.focus());
    }

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const tabbables = tabbablesIn(container);
      if (tabbables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !container.contains(activeEl)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      // Restore focus, defensively.
      if (
        previouslyFocused &&
        typeof previouslyFocused.focus === "function" &&
        document.contains(previouslyFocused)
      ) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocus, restoreFocusRef]);
}

/* ----------------------------------------------------------------------- */

function tabbablesIn(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

function firstTabbable(container) {
  return tabbablesIn(container)[0] ?? null;
}

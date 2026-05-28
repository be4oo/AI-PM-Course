/**
 * useKeyboardShortcuts — register a set of shortcut handlers with the
 * suppression rules from contracts/keyboard-shortcuts.md.
 *
 * Skeleton in Phase 2; full layer is plugged in by Phase 7 (T063).
 *
 * Contract:
 *   - Global shortcuts fire ONLY when no input/textarea/contenteditable is focused.
 *   - When `isModalOpen`, all global shortcuts are suppressed EXCEPT those
 *     marked `alwaysFire` (typically Esc).
 *   - Esc behavior is owned by the modal itself; this hook does not implement
 *     close-on-Esc but DOES allow registering Esc handlers via alwaysFire.
 *
 * Shortcut spec format:
 *   { key: "k", meta: true,        handler, alwaysFire?: boolean }
 *   { key: "?", shift: true,       handler }
 *   { key: "Escape",               handler, alwaysFire: true }
 *
 * Matching: case-insensitive on `key`. `meta` matches Cmd on Mac / Ctrl on
 * Win/Linux. Multiple matchers may share a key — first matching handler wins.
 */

import { useEffect } from "react";

/**
 * @typedef {Object} ShortcutSpec
 * @property {string} key                          KeyboardEvent.key, case-insensitive
 * @property {boolean} [meta]                      require Cmd (Mac) / Ctrl (Win/Linux)
 * @property {boolean} [shift]                     require Shift
 * @property {boolean} [alt]                       require Alt
 * @property {boolean} [alwaysFire]                fire even when a modal is open or an input is focused
 * @property {(event: KeyboardEvent) => void} handler
 * @property {string} [description]                shown in the Shortcuts modal
 */

/**
 * @param {object} params
 * @param {ShortcutSpec[]} params.shortcuts
 * @param {boolean} [params.isModalOpen]   suppress non-alwaysFire shortcuts while a modal is open
 * @param {boolean} [params.enabled=true]
 */
export function useKeyboardShortcuts({ shortcuts, isModalOpen = false, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined;
    if (typeof window === "undefined") return undefined;

    const onKeyDown = (event) => {
      for (const spec of shortcuts ?? []) {
        if (!matchesSpec(event, spec)) continue;

        // Always-fire shortcuts (Esc) bypass suppression entirely.
        if (spec.alwaysFire) {
          spec.handler(event);
          return;
        }
        // Modal-open suppression.
        if (isModalOpen) return;
        // Input-focus suppression.
        if (isEditableFocused()) return;

        spec.handler(event);
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts, isModalOpen, enabled]);
}

/* ----------------------------------------------------------------------- */

function matchesSpec(event, spec) {
  if (!spec || typeof spec.key !== "string") return false;
  if (String(event.key).toLowerCase() !== spec.key.toLowerCase()) return false;
  if (!!spec.meta  !== (event.metaKey || event.ctrlKey)) return false;
  if (!!spec.shift !==  event.shiftKey) return false;
  if (!!spec.alt   !==  event.altKey)   return false;
  return true;
}

/** True when the focused element accepts text input. */
export function isEditableFocused() {
  if (typeof document === "undefined") return false;
  const el = document.activeElement;
  if (!el || el === document.body) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
    // Some inputs (button, submit, hidden) aren't really editable.
    const type = String(el.type ?? "").toLowerCase();
    if (tag === "INPUT" && ["button", "submit", "reset", "hidden", "checkbox", "radio"].includes(type)) {
      return false;
    }
    return true;
  }
  if (el.isContentEditable) return true;
  // jsdom doesn't always reflect contenteditable into the property, so also
  // accept the raw attribute. Browsers honour the property; jsdom honours the
  // attribute — checking both is correct on both surfaces.
  const ce = el.getAttribute?.("contenteditable");
  if (ce === "" || ce === "true" || ce === "plaintext-only") return true;
  return false;
}

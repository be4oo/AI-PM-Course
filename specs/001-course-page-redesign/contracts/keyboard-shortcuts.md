# Keyboard Shortcut Contract

**Feature**: 001-course-page-redesign
**Status**: STABLE — changes require an ADR + spec amendment.

This document is a **contract**: learners will memorize these. Changing a key or its meaning is a breaking change that triggers a MINOR version bump on the course constitution and a release note.

---

## Scope rules

- Shortcuts fire **only when no input/textarea/contenteditable element is focused**, with the single exception of `Esc` (which always closes the topmost modal regardless of focus).
- `⌘K` is equivalent to `Ctrl+K` on non-Mac platforms; the UI label shows the platform-correct symbol.
- Inside an open modal, only `Esc` and the modal's own internal shortcuts (if any) fire; the global layer is suppressed.

## Shortcuts

| Key | Action | Scope | Notes |
|---|---|---|---|
| `⌘K` / `Ctrl+K` | Open command palette | Page (any state) | Closes any other modal first. |
| `?` | Open Keyboard shortcuts help modal | Page | |
| `b` | Toggle bookmark on the current lesson | Page | No effect if no current lesson (impossible at runtime). |
| `j` | Navigate to the next lesson (crossing module boundaries) | Page | Last lesson of last module → no-op + brief visual nudge. |
| `k` | Navigate to the previous lesson (crossing module boundaries) | Page | First lesson of first module → no-op + brief visual nudge. |
| `e` | Toggle the Practice disclosure on the current lesson | Page | No effect if the lesson has no Practice block. |
| `q` | Toggle the Self-test disclosure on the current lesson | Page | No effect if the lesson has no Self-test block. |
| `r` | Open the Adversarial review modal | Page | Closes any other modal first. |
| `Esc` | Close the topmost modal | Always | Restores focus to the element that opened the modal. |

## Discoverability

- A `⌘K` chip is rendered in the header.
- A `?` chip is rendered in the shortcuts modal footer.
- The shortcuts modal is the **only** authoritative list shown to users; this contract file is authoritative for engineering.

## Test obligations

For each shortcut:
1. A Vitest + jsdom test asserting the shortcut produces the documented effect when fired with no focus on an input.
2. A test asserting the shortcut is suppressed when a `<textarea>` or `<input>` is focused (except `Esc`).
3. A test asserting modal-open state suppresses the global layer except `Esc`.

The four supported viewport widths (375 / 768 / 1024 / 1440) are exercised with the `vitest --environment jsdom` viewport mock helper; SC-004 requires 100% trial pass.

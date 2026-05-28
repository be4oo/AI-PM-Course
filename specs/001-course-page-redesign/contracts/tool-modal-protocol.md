# Tool Modal Protocol

**Feature**: 001-course-page-redesign
**Status**: STABLE — every Practice tool MUST implement this contract.

A Practice tool is one of: Spaced review, Adversarial review, Capstone, Knowledge map. All four open as full-page modals over the reading column. This document is the contract between the shared `<ToolModal>` frame and the tool's body component.

---

## Lifecycle

```text
                  ┌──────────────┐
                  │   closed     │
                  └──────┬───────┘
                         │ openTool(toolId, openedFrom)
                         ▼
                  ┌──────────────┐    Esc / backdrop / explicit close
   (any state)──▶ │    open      │──────────────────────────────────▶ closed
                  │  (one only)  │
                  └──────┬───────┘
                         │ openTool(otherId)
                         ▼
                  ┌──────────────┐
                  │  swap-open   │   (closes previous, opens new — FR-016)
                  └──────────────┘
```

Only one tool can be open at a time. Calling `openTool` while another modal is open implicitly closes the previous one before mounting the new body.

---

## ToolModal frame responsibilities

The shared `<ToolModal>` frame owns all of:

| Concern | Behavior |
|---|---|
| Portal mount | Renders into `#course-modal-root`. |
| Focus trap | On open, focus moves to the first interactive element inside the modal; `Tab` and `Shift+Tab` cycle inside the modal only. |
| Focus restore | On close, focus returns to `restoreFocusEl` (the trigger that opened the modal). |
| Scroll save/restore | Saves `.course-reading-column` `scrollTop` on open; restores it on close. |
| Escape close | `Esc` always closes the topmost modal and emits `onClose`. |
| Backdrop click | Backdrop click closes the modal (configurable per body via `dismissOnBackdrop` prop, default `true`). |
| ARIA | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the body-supplied `titleId`. |
| Body lock | While open, `<body>` gets `overflow: hidden` (saved + restored). |
| One-at-a-time | The frame refuses to mount a second instance; the orchestrating reducer must close-then-open. |

---

## Tool body responsibilities

Each tool body MUST:

1. Render a unique heading with the `id` supplied to `<ToolModal titleId>`.
2. Provide its own internal navigation (e.g., flashcard prev/next, milestone select).
3. Not call `document.body.style.overflow` — the frame already owns this.
4. Not call `focus()` on the body's mount — the frame already does this on the first focusable.
5. Emit an `onComplete` event when the user's work is "done" (e.g., the spaced session is finished). The frame then transitions to a summary phase if the body provides a `Summary` component, or closes if not.

## Props contract

```ts
type ToolModalProps = {
  open: boolean;
  titleId: string;
  ariaLabel?: string;          // fallback when no visible title
  dismissOnBackdrop?: boolean; // default true
  onClose: () => void;
  children: React.ReactNode;
};
```

```ts
type ToolBodyProps<Payload> = {
  payload: Payload;             // see data-model.md → ToolSession.payload sub-shapes
  onPayloadChange: (next: Payload) => void;
  onComplete: () => void;       // signals the body's "happy path" terminal state
};
```

---

## Test obligations

For each of the four Practice tools:
1. A test that opening from sidebar mounts the modal and traps focus.
2. A test that `Esc` closes and restores focus to the originating trigger.
3. A test that opening a different tool while one is open closes the first before mounting the second (FR-016).
4. A test that the reading column scroll position is preserved across an open/close cycle.

---

## Out of scope

- Inline panels, drawers, side-sheets — not used by this contract. If a future tool needs a non-modal surface, it requires a contract amendment.
- Server-side state for tool sessions. Tool sessions are transient; closing a modal discards the session.

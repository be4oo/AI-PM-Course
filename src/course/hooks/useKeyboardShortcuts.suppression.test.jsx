/**
 * @vitest-environment jsdom
 *
 * Input-focus suppression — global shortcut layer is silent while a text
 * input, textarea, or contenteditable element is focused.
 *
 * Spec / contract refs:
 *   - FR-019: "shortcuts when no text input is focused"
 *   - contracts/keyboard-shortcuts.md §Scope rules
 *   - SC-004: the suppression contract must hold at 375/768/1024/1440
 *
 * Esc is exempt — it always fires (alwaysFire on the shortcut spec).
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts.js";
import { setViewport, VIEWPORTS } from "../../test-utils/viewport.js";

let container;
let activeRoot;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  document.body.appendChild(container);
  activeRoot = null;
});

afterEach(async () => {
  if (activeRoot) {
    await act(async () => activeRoot.unmount());
    activeRoot = null;
  }
});

async function render(ui) {
  await act(async () => {
    activeRoot = createRoot(container);
    activeRoot.render(ui);
  });
}

function dispatchKey(opts) {
  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, ...opts }));
}

/** Harness that exposes a fixed shortcut layer and an editable element. */
function Harness({ onB, onEsc, kind = "input" }) {
  const inputRef = useRef(null);
  useKeyboardShortcuts({
    shortcuts: [
      { key: "b", handler: onB },
      { key: "Escape", alwaysFire: true, handler: onEsc },
    ],
  });
  return (
    <div>
      {kind === "input" ? <input ref={inputRef} data-testid="text-input" /> : null}
      {kind === "textarea" ? <textarea ref={inputRef} data-testid="textarea" /> : null}
      {kind === "contenteditable" ? (
        <div ref={inputRef} contentEditable suppressContentEditableWarning data-testid="ce" />
      ) : null}
      {/* Plain element to focus when we want the layer to fire freely. */}
      <button data-testid="button">btn</button>
    </div>
  );
}

/* ============================================================================
 * Baseline — layer fires when no editable is focused.
 * ========================================================================= */

describe("Suppression baseline (no editable focused)", () => {
  it("b fires when only a plain button is focused", async () => {
    const onB = vi.fn();
    await render(<Harness onB={onB} onEsc={() => {}} />);
    container.querySelector('[data-testid="button"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).toHaveBeenCalledTimes(1);
  });
});

/* ============================================================================
 * Input / textarea / contenteditable suppression
 * ========================================================================= */

describe("Suppression when an <input> is focused", () => {
  it("b is suppressed while the input is focused", async () => {
    const onB = vi.fn();
    await render(<Harness onB={onB} onEsc={() => {}} kind="input" />);
    container.querySelector('[data-testid="text-input"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).not.toHaveBeenCalled();
  });

  it("Esc still fires while the input is focused (alwaysFire)", async () => {
    const onB = vi.fn();
    const onEsc = vi.fn();
    await render(<Harness onB={onB} onEsc={onEsc} kind="input" />);
    container.querySelector('[data-testid="text-input"]').focus();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onEsc).toHaveBeenCalled();
  });
});

describe("Suppression when a <textarea> is focused", () => {
  it("b is suppressed", async () => {
    const onB = vi.fn();
    await render(<Harness onB={onB} onEsc={() => {}} kind="textarea" />);
    container.querySelector('[data-testid="textarea"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).not.toHaveBeenCalled();
  });

  it("Esc still fires", async () => {
    const onEsc = vi.fn();
    await render(<Harness onB={() => {}} onEsc={onEsc} kind="textarea" />);
    container.querySelector('[data-testid="textarea"]').focus();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onEsc).toHaveBeenCalled();
  });
});

describe("Suppression when a contenteditable element is focused", () => {
  it("b is suppressed", async () => {
    const onB = vi.fn();
    await render(<Harness onB={onB} onEsc={() => {}} kind="contenteditable" />);
    container.querySelector('[data-testid="ce"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).not.toHaveBeenCalled();
  });

  it("Esc still fires", async () => {
    const onEsc = vi.fn();
    await render(<Harness onB={() => {}} onEsc={onEsc} kind="contenteditable" />);
    container.querySelector('[data-testid="ce"]').focus();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onEsc).toHaveBeenCalled();
  });
});

/* ============================================================================
 * SC-004 × four viewports
 * ========================================================================= */

describe("Suppression — SC-004 (every viewport)", () => {
  it.each(VIEWPORTS)("input suppresses b at %ipx", async (width) => {
    setViewport(width);
    const onB = vi.fn();
    await render(<Harness onB={onB} onEsc={() => {}} kind="input" />);
    container.querySelector('[data-testid="text-input"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).not.toHaveBeenCalled();
  });

  it.each(VIEWPORTS)("Esc bypasses input suppression at %ipx", async (width) => {
    setViewport(width);
    const onEsc = vi.fn();
    await render(<Harness onB={() => {}} onEsc={onEsc} kind="input" />);
    container.querySelector('[data-testid="text-input"]').focus();
    await act(async () => dispatchKey({ key: "Escape" }));
    expect(onEsc).toHaveBeenCalled();
  });
});

/* ============================================================================
 * Hidden / non-text inputs do NOT suppress (per Contract scope rules)
 * ========================================================================= */

describe("Suppression scope — only text-editable elements suppress", () => {
  function CheckHarness({ onB }) {
    useKeyboardShortcuts({ shortcuts: [{ key: "b", handler: onB }] });
    return <input type="checkbox" data-testid="checkbox" />;
  }
  it("a focused checkbox does NOT suppress the layer", async () => {
    const onB = vi.fn();
    await render(<CheckHarness onB={onB} />);
    container.querySelector('[data-testid="checkbox"]').focus();
    await act(async () => dispatchKey({ key: "b" }));
    expect(onB).toHaveBeenCalled();
  });
});

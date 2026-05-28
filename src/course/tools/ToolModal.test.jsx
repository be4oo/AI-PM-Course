/**
 * @vitest-environment jsdom
 *
 * ToolModal — frame contract tests.
 *
 * Spec/contract refs:
 *   - FR-011 / FR-016 / FR-023
 *   - contracts/tool-modal-protocol.md
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ToolModal } from "./ToolModal.jsx";
import { getOpenModalCount, resetOpenModalCount } from "./ToolModal.testing.js";

/* ---------------------------------------------------------------------------
 * Test fixtures
 * ------------------------------------------------------------------------- */

let container;
let modalRoot;
let readingColumn;

function setupDom() {
  document.body.innerHTML = "";
  modalRoot = document.createElement("div");
  modalRoot.id = "course-modal-root";
  document.body.appendChild(modalRoot);

  // Reading-column scroll target the modal restores after close.
  readingColumn = document.createElement("div");
  readingColumn.setAttribute("data-course-reading-column", "");
  Object.defineProperty(readingColumn, "scrollTop", {
    configurable: true,
    writable: true,
    value: 0,
  });
  document.body.appendChild(readingColumn);

  container = document.createElement("div");
  document.body.appendChild(container);
}

async function render(ui) {
  let root;
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
  return {
    unmount: async () => {
      await act(async () => {
        root.unmount();
      });
    },
    rerender: async (next) => {
      await act(async () => {
        root.render(next);
      });
    },
  };
}

beforeEach(() => {
  resetOpenModalCount();
  setupDom();
});

/* ---------------------------------------------------------------------------
 * Body harness
 * ------------------------------------------------------------------------- */

function Body() {
  return (
    <>
      <h2 id="t-title">Spaced review</h2>
      <button type="button">First</button>
      <button type="button">Second</button>
      <button type="button">Last</button>
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

describe("ToolModal", () => {
  it("mounts a dialog with role=dialog and aria-labelledby pointing at the body title", async () => {
    await render(
      <ToolModal open titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );

    const dialog = modalRoot.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-labelledby")).toBe("t-title");
  });

  it("does not render when open is false", async () => {
    await render(
      <ToolModal open={false} titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );
    expect(modalRoot.querySelector('[role="dialog"]')).toBeNull();
  });

  it("falls back to aria-label when no titleId is supplied", async () => {
    await render(
      <ToolModal open ariaLabel="Knowledge map" onClose={() => {}}>
        <div>body</div>
      </ToolModal>,
    );
    const dialog = modalRoot.querySelector('[role="dialog"]');
    expect(dialog.getAttribute("aria-label")).toBe("Knowledge map");
    expect(dialog.hasAttribute("aria-labelledby")).toBe(false);
  });

  it("Esc invokes onClose (FR-023 + Contract §lifecycle)", async () => {
    const onClose = vi.fn();
    await render(
      <ToolModal open titleId="t-title" onClose={onClose}>
        <Body />
      </ToolModal>,
    );

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("backdrop click invokes onClose when dismissOnBackdrop is true (default)", async () => {
    const onClose = vi.fn();
    await render(
      <ToolModal open titleId="t-title" onClose={onClose}>
        <Body />
      </ToolModal>,
    );

    // The presentation wrapper is modalRoot's only child; dispatch mousedown
    // on it (not on the inner dialog) to simulate a backdrop click.
    const backdrop = modalRoot.firstChild;
    await act(async () => {
      const ev = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
      backdrop.dispatchEvent(ev);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("backdrop click is ignored when dismissOnBackdrop=false", async () => {
    const onClose = vi.fn();
    await render(
      <ToolModal open titleId="t-title" onClose={onClose} dismissOnBackdrop={false}>
        <Body />
      </ToolModal>,
    );
    const backdrop = modalRoot.firstChild;
    await act(async () => {
      backdrop.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks <body> scroll while open and restores on close", async () => {
    document.body.style.overflow = "auto";
    const { rerender } = await render(
      <ToolModal open titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    await rerender(
      <ToolModal open={false} titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );
    expect(document.body.style.overflow).toBe("auto");
  });

  it("preserves the reading column scrollTop across open/close (FR-011)", async () => {
    readingColumn.scrollTop = 412;
    const { rerender } = await render(
      <ToolModal open titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );

    // While open, simulate that the modal's own scroll behavior modifies the
    // reading column (shouldn't happen, but the contract guarantees restore).
    readingColumn.scrollTop = 0;

    await rerender(
      <ToolModal open={false} titleId="t-title" onClose={() => {}}>
        <Body />
      </ToolModal>,
    );
    expect(readingColumn.scrollTop).toBe(412);
  });

  it("FR-016: refuses to mount a second modal (warns in dev; count tops at 2)", async () => {
    // Two ToolModal instances open at the same time should never happen in
    // production code (the orchestrator must close-then-open) but the frame
    // surfaces the violation via its open-modal counter.
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    function Stack() {
      return (
        <>
          <ToolModal open titleId="t1" onClose={() => {}}>
            <h2 id="t1">A</h2>
            <button>a</button>
          </ToolModal>
          <ToolModal open titleId="t2" onClose={() => {}}>
            <h2 id="t2">B</h2>
            <button>b</button>
          </ToolModal>
        </>
      );
    }
    await render(<Stack />);
    expect(getOpenModalCount()).toBe(2);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("swap-open: closing modal A then opening modal B leaves the counter at 1", async () => {
    function Switcher() {
      const [tool, setTool] = useState("a");
      useEffect(() => {
        // Schedule a swap: close a, open b, on next tick.
        if (tool === "a") {
          const id = setTimeout(() => setTool("b"), 0);
          return () => clearTimeout(id);
        }
      }, [tool]);
      return (
        <ToolModal open titleId={`title-${tool}`} onClose={() => {}}>
          <h2 id={`title-${tool}`}>{tool}</h2>
          <button>{tool}</button>
        </ToolModal>
      );
    }
    await render(<Switcher />);
    // Let the useEffect-driven setTimeout resolve.
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5));
    });
    expect(getOpenModalCount()).toBe(1);
  });
});

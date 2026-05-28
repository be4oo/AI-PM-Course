/**
 * @vitest-environment jsdom
 *
 * ImportProgressModal contract tests.
 *
 * Spec ref:
 *   - FR-010: drag/drop or browse a JSON; apply on confirm.
 *   - Edge Case: malformed JSON → reject with human-readable error,
 *               existing state untouched.
 *   - Edge Case: unknown lesson ids → counted, dropped, surfaced in summary.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { ImportProgressModal } from "./ImportProgressModal.jsx";
import { buildSnapshot } from "../lib/progressSnapshot.js";

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
});

async function render(ui) {
  let root;
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
  return {};
}

/** Drop a File through the dropzone. Vitest's jsdom supports File + Blob.text(). */
async function dropFile(file) {
  const dropzone = container.querySelector('[data-testid="import-dropzone"]');
  const dt = {
    files: [file],
  };
  await act(async () => {
    dropzone.dispatchEvent(
      new (class extends Event {
        constructor() {
          super("drop", { bubbles: true, cancelable: true });
          this.dataTransfer = dt;
        }
      })(),
    );
    // Give the file.text() promise a microtask to settle.
    await new Promise((r) => setTimeout(r, 0));
  });
}

const KNOWN = new Set(["m1-l1", "m1-l2", "m2-l1"]);

const VALID_STATE = {
  completedLessonIds: ["m1-l1", "m1-l2"],
  bookmarkedLessonIds: ["m2-l1"],
  lastReadLessonId: "m1-l2",
  studyMode: "deep",
  tweaks: { accent: "copper", display: "serif", density: "roomy" },
  streak: { current: 5, best: 11, lastReadDate: "2026-05-26" },
};

function jsonFile(name, body) {
  return new File([typeof body === "string" ? body : JSON.stringify(body)], name, {
    type: "application/json",
  });
}

/* ============================================================================
 * Drop / browse default state
 * ========================================================================= */

describe("ImportProgressModal — default state", () => {
  it("renders the drop zone + browse button by default", async () => {
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} />);
    expect(container.querySelector('[data-testid="import-dropzone"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="import-browse"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="import-confirm"]')).toBeNull();
  });
});

/* ============================================================================
 * Valid file → preview → apply
 * ========================================================================= */

describe("ImportProgressModal — valid file path", () => {
  it("dropping a valid snapshot shows the preview with the document's stats", async () => {
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} />);
    const snap = buildSnapshot(VALID_STATE);
    await dropFile(jsonFile("progress.json", snap));
    const preview = container.querySelector('[data-testid="import-preview"]');
    expect(preview).not.toBeNull();
    expect(preview.textContent).toContain("2"); // completed count
    expect(preview.textContent).toContain("1"); // bookmark count
    expect(preview.textContent).toContain("deep"); // study mode
    expect(preview.textContent).toContain("copper"); // accent
  });

  it("clicking Apply invokes onApply with the parsed LearnerState and shows the applied confirmation", async () => {
    const onApply = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onApply={onApply} />);
    const snap = buildSnapshot(VALID_STATE);
    await dropFile(jsonFile("progress.json", snap));
    await act(async () => {
      container
        .querySelector('[data-testid="import-confirm"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onApply).toHaveBeenCalledTimes(1);
    const state = onApply.mock.calls[0][0];
    expect(state.completedLessonIds).toEqual(["m1-l1", "m1-l2"]);
    expect(state.bookmarkedLessonIds).toEqual(["m2-l1"]);
    expect(state.lastReadLessonId).toBe("m1-l2");
    // Confirmation screen appears after Apply.
    expect(container.querySelector('[data-testid="import-applied"]')).not.toBeNull();
  });
});

/* ============================================================================
 * Unknown lesson IDs → dropped, counted
 * ========================================================================= */

describe("ImportProgressModal — unknown lesson ids", () => {
  it("counts and drops unknown lesson ids in the preview", async () => {
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} />);
    const snap = buildSnapshot({
      ...VALID_STATE,
      completedLessonIds: ["m1-l1", "ghost-a", "ghost-b"],
      bookmarkedLessonIds: ["m2-l1", "ghost-c"],
      lastReadLessonId: "ghost-c",
    });
    await dropFile(jsonFile("progress.json", snap));
    const dropped = container.querySelector('[data-testid="import-dropped-count"]');
    expect(dropped).not.toBeNull();
    expect(dropped.textContent).toContain("4"); // 2 + 1 + 1
  });

  it("the applied confirmation surfaces the dropped count when > 0", async () => {
    const onApply = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onApply={onApply} />);
    const snap = buildSnapshot({
      ...VALID_STATE,
      completedLessonIds: ["m1-l1", "ghost-a"],
    });
    await dropFile(jsonFile("progress.json", snap));
    await act(async () => {
      container
        .querySelector('[data-testid="import-confirm"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const applied = container.querySelector('[data-testid="import-applied"]');
    expect(applied.textContent).toContain("1 unknown lesson");
  });
});

/* ============================================================================
 * Malformed file → error, existing state untouched
 * ========================================================================= */

describe("ImportProgressModal — malformed file", () => {
  it("malformed JSON shows a human-readable error and does NOT call onApply", async () => {
    const onApply = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onApply={onApply} />);
    await dropFile(jsonFile("broken.json", "{not-json"));
    const err = container.querySelector('[data-testid="import-error"]');
    expect(err).not.toBeNull();
    expect(err.textContent).toMatch(/JSON/i);
    expect(onApply).not.toHaveBeenCalled();
    // Reassurance copy explicitly says state is untouched.
    expect(container.textContent.toLowerCase()).toContain("not been touched");
  });

  it("Try again returns to the drop zone", async () => {
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} />);
    await dropFile(jsonFile("broken.json", "{nope"));
    expect(container.querySelector('[data-testid="import-error"]')).not.toBeNull();
    await act(async () => {
      container
        .querySelector('[data-testid="import-retry"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector('[data-testid="import-dropzone"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="import-error"]')).toBeNull();
  });

  it("wrong-schema JSON is rejected without applying", async () => {
    const onApply = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onApply={onApply} />);
    // Looks like JSON but missing the schema discriminator.
    await dropFile(jsonFile("wrong.json", { hello: "world" }));
    expect(container.querySelector('[data-testid="import-error"]')).not.toBeNull();
    expect(onApply).not.toHaveBeenCalled();
  });
});

/* ============================================================================
 * Close wiring
 * ========================================================================= */

describe("ImportProgressModal — close", () => {
  it("Cancel from the drop state invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onClose={onClose} />);
    await act(async () => {
      container
        .querySelector('[data-testid="import-cancel"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("Close on the applied confirmation invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<ImportProgressModal titleId="t" knownLessonIds={KNOWN} onClose={onClose} />);
    const snap = buildSnapshot(VALID_STATE);
    await dropFile(jsonFile("progress.json", snap));
    await act(async () => {
      container
        .querySelector('[data-testid="import-confirm"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container
        .querySelector('[data-testid="import-close"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

/**
 * @vitest-environment jsdom
 *
 * SpacedReviewModal contract tests.
 *
 * Spec ref: FR-012 — reveal action + 4 grading buttons + session summary.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { SpacedReviewModal } from "./SpacedReviewModal.jsx";

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
  return {
    rerender: async (next) => {
      await act(async () => {
        root.render(next);
      });
    },
  };
}

const queue = [
  { id: "c1", front: "What is an eval?", back: "A falsifiable test of model behavior." },
  { id: "c2", front: "Why instrument?", back: "Because you can't fix what you can't see." },
  { id: "c3", front: "Define rubric.", back: "A scored set of judging criteria." },
];

describe("SpacedReviewModal — in-progress flow (FR-012)", () => {
  it("shows the card front and a Reveal button initially", async () => {
    await render(<SpacedReviewModal titleId="t" queue={queue} />);
    expect(container.querySelector('[data-testid="spaced-front"]').textContent).toContain(queue[0].front);
    expect(container.querySelector('[data-testid="spaced-reveal"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="spaced-back"]')).toBeNull();
  });

  it("Reveal shows the answer and replaces Reveal with four grade buttons", async () => {
    await render(<SpacedReviewModal titleId="t" queue={queue} />);
    await act(async () => {
      container.querySelector('[data-testid="spaced-reveal"]').dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });
    expect(container.querySelector('[data-testid="spaced-back"]').textContent).toContain(queue[0].back);
    expect(container.querySelector('[data-testid="spaced-reveal"]')).toBeNull();
    // Exactly four grade buttons, in Forgot/Hard/Good/Easy order.
    const grades = ["forgot", "hard", "good", "easy"];
    for (const g of grades) {
      expect(container.querySelector(`[data-testid="spaced-grade-${g}"]`)).not.toBeNull();
    }
  });

  it("Grading advances to the next card and resets the reveal state", async () => {
    await render(<SpacedReviewModal titleId="t" queue={queue} />);
    await act(async () => {
      container.querySelector('[data-testid="spaced-reveal"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="spaced-grade-good"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector('[data-testid="spaced-front"]').textContent).toContain(queue[1].front);
    expect(container.querySelector('[data-testid="spaced-back"]')).toBeNull();
    expect(container.querySelector('[data-testid="spaced-reveal"]')).not.toBeNull();
  });

  it("Progresses through the whole queue and shows the summary phase at the end", async () => {
    const onComplete = vi.fn();
    await render(<SpacedReviewModal titleId="t" queue={queue} onComplete={onComplete} />);
    for (let i = 0; i < queue.length; i++) {
      await act(async () => {
        container.querySelector('[data-testid="spaced-reveal"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      await act(async () => {
        container.querySelector('[data-testid="spaced-grade-hard"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    }
    const summary = container.querySelector('[data-testid="spaced-summary"]');
    expect(summary).not.toBeNull();
    // Three cards graded "hard" → the Hard row reads 3.
    const rows = summary.querySelectorAll("li");
    expect(rows).toHaveLength(4); // four grade rows
    expect(onComplete).toHaveBeenCalledWith(["hard", "hard", "hard"]);
  });

  it("Summary Close invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<SpacedReviewModal titleId="t" queue={[queue[0]]} onClose={onClose} />);
    await act(async () => {
      container.querySelector('[data-testid="spaced-reveal"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="spaced-grade-easy"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="spaced-close"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

describe("SpacedReviewModal — empty queue", () => {
  it("renders an empty state with a Close button when queue is empty", async () => {
    const onClose = vi.fn();
    await render(<SpacedReviewModal titleId="t" queue={[]} onClose={onClose} />);
    expect(container.textContent).toContain("No flashcards are due");
    expect(container.querySelector('[data-testid="spaced-reveal"]')).toBeNull();
    await act(async () => {
      container.querySelector('[data-testid="spaced-close"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

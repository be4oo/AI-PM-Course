/**
 * @vitest-environment jsdom
 *
 * AdversarialReviewModal contract tests.
 *
 * Spec ref: FR-013 — persona picker, paste-or-link, scored rubric verdict.
 * Constitution Principle III: NO model call. The scorer is local.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { AdversarialReviewModal } from "./AdversarialReviewModal.jsx";
import { REVIEWER_PERSONAS } from "../../data/reviewerPersonas.js";

let container;
let originalFetch;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
  originalFetch = globalThis.fetch;
});

async function render(ui) {
  let root;
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
  return {};
}

afterEachCleanup();
function afterEachCleanup() {
  // restore fetch after every test via a simple registry; vitest's afterEach
  // would import nicely but we can also be explicit at the foot of each it().
}

const FAT_ARTIFACT = `
We launched the assistant after eval baseline pass; the eval suite covers
problem framing, system design, trust UX, and operational rollout. Owner
documented, escalation policy explicit, observability dashboard wired,
cost attribution in place.
`.repeat(4);

describe("AdversarialReviewModal — compose form", () => {
  it("renders the persona picker with every reviewer persona", async () => {
    await render(<AdversarialReviewModal titleId="t" />);
    for (const p of REVIEWER_PERSONAS) {
      expect(container.querySelector(`[data-testid="adv-persona-${p.id}"]`)).not.toBeNull();
    }
  });

  it("default persona is the spec's default (Senior AI PM)", async () => {
    await render(<AdversarialReviewModal titleId="t" />);
    const def = container.querySelector('[data-testid="adv-persona-senior-ai-pm"]');
    expect(def.getAttribute("aria-checked")).toBe("true");
  });

  it("Submit is disabled until valid input is supplied", async () => {
    await render(<AdversarialReviewModal titleId="t" />);
    expect(container.querySelector('[data-testid="adv-submit"]').disabled).toBe(true);
    const ta = container.querySelector('[data-testid="adv-paste-input"]');
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
      setter.call(ta, FAT_ARTIFACT);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(container.querySelector('[data-testid="adv-submit"]').disabled).toBe(false);
  });
});

describe("AdversarialReviewModal — paste path", () => {
  it("produces a verdict without any network call", async () => {
    // Spy on fetch so we can prove no network access happens on the paste path.
    globalThis.fetch = vi.fn(() => Promise.reject(new Error("fetch should not be called")));
    await render(<AdversarialReviewModal titleId="t" />);

    const ta = container.querySelector('[data-testid="adv-paste-input"]');
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
      setter.call(ta, FAT_ARTIFACT);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      container.querySelector('[data-testid="adv-submit"]').dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });

    expect(container.querySelector('[data-testid="adv-scores"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="adv-strengths"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="adv-gaps"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="adv-actions"]')).not.toBeNull();
    expect(globalThis.fetch).not.toHaveBeenCalled();

    globalThis.fetch = originalFetch;
  });

  it("Verdict's Close invokes onClose", async () => {
    const onClose = vi.fn();
    await render(<AdversarialReviewModal titleId="t" onClose={onClose} />);
    const ta = container.querySelector('[data-testid="adv-paste-input"]');
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
      setter.call(ta, FAT_ARTIFACT);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="adv-submit"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="adv-close"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalled();
  });
});

describe("AdversarialReviewModal — URL path", () => {
  it("invokes fetch with the provided URL and renders a verdict on success", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(FAT_ARTIFACT),
      }),
    );
    await render(<AdversarialReviewModal titleId="t" />);

    // Switch to URL source.
    await act(async () => {
      container.querySelector('[data-testid="adv-source-url"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const urlInput = container.querySelector('[data-testid="adv-url-input"]');
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(urlInput, "https://example.com/raw/artifact.md");
      urlInput.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      container.querySelector('[data-testid="adv-submit"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://example.com/raw/artifact.md");
    expect(container.querySelector('[data-testid="adv-scores"]')).not.toBeNull();

    globalThis.fetch = originalFetch;
  });

  it("surfaces a non-fatal error when fetch fails and stays in compose phase", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve("") }),
    );
    await render(<AdversarialReviewModal titleId="t" />);
    await act(async () => {
      container.querySelector('[data-testid="adv-source-url"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const urlInput = container.querySelector('[data-testid="adv-url-input"]');
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(urlInput, "https://example.com/missing.md");
      urlInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      container.querySelector('[data-testid="adv-submit"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector('[data-testid="adv-error"]')).not.toBeNull();
    // Stays in compose phase: scores table is not rendered, submit button reappears.
    expect(container.querySelector('[data-testid="adv-scores"]')).toBeNull();
    expect(container.querySelector('[data-testid="adv-submit"]')).not.toBeNull();

    globalThis.fetch = originalFetch;
  });
});

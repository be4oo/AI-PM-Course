/**
 * @vitest-environment jsdom
 *
 * RightRail contract tests.
 *
 * Spec refs:
 *   - FR-005: outline list, study-mode pills, lesson actions, next-due-review
 *   - FR-007: outline click scrolls to anchor
 *   - FR-023a: prefers-reduced-motion ⇒ scroll-behavior auto (not smooth)
 *
 * IntersectionObserver / scroll tracking is exercised on the integration
 * level in CourseShell.test.jsx; here we test the rail's local contract.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { RightRail } from "./RightRail.jsx";
import { scrollToSection } from "./scrollToSection.js";

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

const lesson = {
  id: "m1-l1",
  title: "Why eval discipline matters",
  body: [
    { kind: "heading", id: "intro", label: "Intro" },
    { kind: "heading", id: "what-is-eval", label: "What is an eval?" },
    { kind: "heading", id: "next-steps", label: "Next steps" },
  ],
};

describe("RightRail — outline", () => {
  it("renders one outline anchor per body heading", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="intro" />);
    const items = container.querySelectorAll('[data-testid="course-outline-item"]');
    expect(items).toHaveLength(3);
    expect(Array.from(items).map((a) => a.getAttribute("href"))).toEqual([
      "#intro",
      "#what-is-eval",
      "#next-steps",
    ]);
  });

  it("marks the active section with aria-current=true", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="what-is-eval" />);
    const items = container.querySelectorAll('[data-testid="course-outline-item"]');
    expect(items[0].hasAttribute("aria-current")).toBe(false);
    expect(items[1].getAttribute("aria-current")).toBe("true");
    expect(items[2].hasAttribute("aria-current")).toBe(false);
  });

  it("invokes onSectionSelect (preventing navigation) when an outline item is clicked", async () => {
    const onSectionSelect = vi.fn();
    await render(
      <RightRail lesson={lesson} activeSectionId="intro" onSectionSelect={onSectionSelect} />,
    );
    const links = container.querySelectorAll('[data-testid="course-outline-item"]');
    await act(async () => {
      const ev = new MouseEvent("click", { bubbles: true, cancelable: true });
      links[1].dispatchEvent(ev);
    });
    expect(onSectionSelect).toHaveBeenCalledWith("what-is-eval");
  });
});

describe("RightRail — study-mode pills", () => {
  it("renders three pills with role=radio", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="intro" studyMode="deep" />);
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios).toHaveLength(3);
    expect(Array.from(radios).map((b) => b.textContent.trim())).toEqual(["Skim", "Deep", "Exec"]);
  });

  it("marks the active mode with aria-checked=true", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="intro" studyMode="exec" />);
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios[0].getAttribute("aria-checked")).toBe("false");
    expect(radios[1].getAttribute("aria-checked")).toBe("false");
    expect(radios[2].getAttribute("aria-checked")).toBe("true");
  });

  it("invokes onStudyModeChange when a pill is clicked", async () => {
    const onStudyModeChange = vi.fn();
    await render(
      <RightRail lesson={lesson} activeSectionId="intro" studyMode="deep" onStudyModeChange={onStudyModeChange} />,
    );
    const radios = container.querySelectorAll('[role="radio"]');
    await act(async () => {
      radios[0].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(onStudyModeChange).toHaveBeenCalledWith("skim");
  });
});

describe("RightRail — lesson actions", () => {
  it("renders bookmark/listen/copy buttons", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="intro" />);
    expect(container.querySelector('[data-testid="course-action-bookmark"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-action-listen"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="course-action-copy"]')).not.toBeNull();
  });

  it("reflects isBookmarked via aria-pressed", async () => {
    const { rerender } = await render(
      <RightRail lesson={lesson} activeSectionId="intro" isBookmarked={false} />,
    );
    expect(container.querySelector('[data-testid="course-action-bookmark"]').getAttribute("aria-pressed")).toBe("false");
    await rerender(<RightRail lesson={lesson} activeSectionId="intro" isBookmarked={true} />);
    expect(container.querySelector('[data-testid="course-action-bookmark"]').getAttribute("aria-pressed")).toBe("true");
  });
});

describe("RightRail — next-due-review", () => {
  it("renders the next-due-review button when a label is supplied", async () => {
    const onOpen = vi.fn();
    await render(
      <RightRail
        lesson={lesson}
        activeSectionId="intro"
        nextDueLabel="3 cards due"
        onOpenSpacedReview={onOpen}
      />,
    );
    const btn = container.querySelector('[data-testid="course-next-due-review"]');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain("3 cards due");
    await act(async () => {
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(onOpen).toHaveBeenCalled();
  });

  it("does not render the button when no label is supplied", async () => {
    await render(<RightRail lesson={lesson} activeSectionId="intro" />);
    expect(container.querySelector('[data-testid="course-next-due-review"]')).toBeNull();
  });
});

describe("scrollToSection — FR-023a reduced-motion downgrade", () => {
  it("uses smooth scrolling by default", () => {
    const el = document.createElement("h2");
    el.id = "demo-section";
    document.body.appendChild(el);
    el.scrollIntoView = vi.fn();

    scrollToSection("demo-section", { reduceMotion: false });
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("uses instant scrolling when reduceMotion is true", () => {
    const el = document.createElement("h2");
    el.id = "demo-section-2";
    document.body.appendChild(el);
    el.scrollIntoView = vi.fn();

    scrollToSection("demo-section-2", { reduceMotion: true });
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });

  it("respects the prefers-reduced-motion media query when reduceMotion is undefined", () => {
    const el = document.createElement("h2");
    el.id = "demo-section-3";
    document.body.appendChild(el);
    el.scrollIntoView = vi.fn();

    // Stub matchMedia to return true for prefers-reduced-motion.
    const originalMM = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((q) => ({
      matches: /prefers-reduced-motion/.test(q) && /reduce/.test(q),
      media: q,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    scrollToSection("demo-section-3");
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });

    window.matchMedia = originalMM;
  });

  it("no-ops gracefully when the target element does not exist", () => {
    // Should not throw.
    expect(() => scrollToSection("does-not-exist")).not.toThrow();
  });
});

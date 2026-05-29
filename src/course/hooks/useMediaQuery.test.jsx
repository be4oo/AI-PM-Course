/**
 * @vitest-environment jsdom
 *
 * useMediaQuery — viewport-tier hook used to drive the mobile drawers.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useMediaQuery } from "./useMediaQuery.js";
import { setViewport } from "../../test-utils/viewport.js";

let container;
let root;

function Probe({ query }) {
  const matches = useMediaQuery(query, true);
  return <span data-testid="probe">{matches ? "yes" : "no"}</span>;
}

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => root?.unmount());
});

async function render(ui) {
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
}

describe("useMediaQuery", () => {
  it("reflects a matching query at the current viewport", async () => {
    const restore = setViewport(1440);
    await render(<Probe query="(min-width: 1024px)" />);
    expect(container.querySelector('[data-testid="probe"]').textContent).toBe("yes");
    restore();
  });

  it("reflects a non-matching query at a small viewport", async () => {
    const restore = setViewport(375);
    await render(<Probe query="(min-width: 768px)" />);
    expect(container.querySelector('[data-testid="probe"]').textContent).toBe("no");
    restore();
  });

  it("falls back to the default when matchMedia is unavailable", async () => {
    const saved = window.matchMedia;
    // Simulate an environment without matchMedia (SSR / older jsdom).
    delete window.matchMedia;
    await render(<Probe query="(min-width: 768px)" />);
    expect(container.querySelector('[data-testid="probe"]').textContent).toBe("yes"); // defaultValue=true
    window.matchMedia = saved;
  });
});

/**
 * @vitest-environment jsdom
 */

import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./palette/CommandPalette.jsx";
import { Sidebar } from "./shell/Sidebar.jsx";

const tracks = [
  { id: "aipm", label: "AI PM Course" },
  { id: "mobile", label: "Mobile App Lessons" },
];
const curriculum = [
  { id: "mob-1", module: "MOBILE 1", lessons: [{ id: "mob-1.1", title: "Layer cake" }] },
];

let container;

beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  container.className = "course-shell";
  document.body.appendChild(container);
});

async function render(ui) {
  await act(async () => createRoot(container).render(ui));
}

describe("track switch controls", () => {
  it("shows the active track in the sidebar and switches to the inactive track", async () => {
    const onSwitchTrack = vi.fn();
    await render(
      <Sidebar
        curriculum={curriculum}
        activeTrackId="mobile"
        tracks={tracks}
        onSwitchTrack={onSwitchTrack}
      />,
    );

    expect(container.textContent).toContain("Mobile App Lessons");
    expect(container.textContent).toContain("MOBILE 1");
    const button = container.querySelector('button[aria-label="Switch to AI PM Course"]');
    await act(async () => button.click());
    expect(onSwitchTrack).toHaveBeenCalledWith("aipm");
  });

  it("offers only the inactive track in the command palette", async () => {
    const onSwitchTrack = vi.fn();
    await render(
      <CommandPalette
        open
        curriculum={curriculum}
        activeTrackId="aipm"
        tracks={tracks}
        onSwitchTrack={onSwitchTrack}
      />,
    );

    const command = container.querySelector('[data-testid="palette-result-track"]');
    expect(command.textContent).toContain("Switch to Mobile App Lessons");
    expect(container.textContent).not.toContain("Switch to AI PM Course");
    await act(async () => command.click());
    expect(onSwitchTrack).toHaveBeenCalledWith("mobile");
  });
});

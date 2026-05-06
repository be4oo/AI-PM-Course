import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ChangelogView } from "./ChangelogView";

describe("ChangelogView", () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("renders entries newest first when fetch succeeds", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: "older", date: "2026-04-01", title: "Older entry", changeType: "fix", module: "M1", lesson: "1.1", reason: "old" },
        { id: "newer", date: "2026-04-20", title: "Newer entry", changeType: "feat", module: "M2", lesson: "2.1", reason: "new" },
      ],
    });

    render(<ChangelogView onBack={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText("Newer entry")).toBeInTheDocument();
    });
    const titles = screen.getAllByText(/entry$/i).map((node) => node.textContent);
    expect(titles).toEqual(["Newer entry", "Older entry"]);
  });

  it("shows the unavailable card when fetch fails", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("network down"));
    render(<ChangelogView onBack={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText(/Changelog unavailable/i)).toBeInTheDocument();
    });
  });

  it("invokes onBack when the back button is clicked", async () => {
    globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    const onBack = vi.fn();
    render(<ChangelogView onBack={onBack} />);
    const backBtn = screen.getByRole("button", { name: /BACK/i });
    backBtn.click();
    expect(onBack).toHaveBeenCalledOnce();
  });
});

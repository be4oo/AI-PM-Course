import { describe, expect, it } from "vitest";
import { getFreshnessBadgeData, sortChangelogEntries } from "./freshness";

describe("freshness", () => {
  const now = new Date("2026-04-17T00:00:00Z");

  it("parses quarter strings and computes freshness bands", () => {
    const fresh = getFreshnessBadgeData({ lastVerified: "2026-04-11" }, now);
    expect(fresh.status).toBe("fresh");

    const aging = getFreshnessBadgeData({ lastVerified: "2026-Q1" }, now);
    expect(["aging", "stale"]).toContain(aging.status);
  });

  it("handles unverified and invalid dates explicitly", () => {
    expect(getFreshnessBadgeData({}, now).status).toBe("unverified");
    expect(getFreshnessBadgeData({ lastVerified: "not-a-date" }, now).status).toBe("invalid");
  });

  it("respects freshnessWindow overrides", () => {
    const item = getFreshnessBadgeData(
      { lastVerified: "2026-02-01", freshnessWindow: 60 },
      now
    );
    expect(item.status).toBe("stale");
  });

  it("sorts changelog entries newest first", () => {
    const sorted = sortChangelogEntries([
      { date: "2026-04-10", id: "a" },
      { date: "2026-04-16", id: "b" },
      { date: "2026-04-01", id: "c" },
    ]);
    expect(sorted.map((entry) => entry.id)).toEqual(["b", "a", "c"]);
  });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FreshnessBadge } from "./FreshnessBadge";

describe("FreshnessBadge", () => {
  const now = new Date("2026-04-17T00:00:00Z");

  it("renders FRESH for recently verified meta", () => {
    render(<FreshnessBadge meta={{ lastVerified: "2026-04-11" }} now={now} />);
    expect(screen.getByRole("status")).toHaveTextContent(/FRESH/i);
    expect(screen.getByRole("status")).toHaveAccessibleName(/Freshness: FRESH/i);
  });

  it("renders STALE label when window is exceeded", () => {
    render(
      <FreshnessBadge
        meta={{ lastVerified: "2025-01-01", freshnessWindow: 60 }}
        now={now}
      />
    );
    expect(screen.getByRole("status")).toHaveTextContent(/STALE/i);
  });

  it("renders UNVERIFIED when meta is empty", () => {
    render(<FreshnessBadge meta={{}} now={now} />);
    expect(screen.getByRole("status")).toHaveTextContent(/UNVERIFIED/i);
  });

  it("renders INVALID DATE for future-dated lastVerified", () => {
    render(<FreshnessBadge meta={{ lastVerified: "2027-01-01" }} now={now} />);
    expect(screen.getByRole("status")).toHaveTextContent(/INVALID/i);
  });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UpdatedBadge } from "./UpdatedBadge";

describe("UpdatedBadge", () => {
  it("renders nothing when updatedAt is missing", () => {
    const { container } = render(<UpdatedBadge completedAt="2026-04-01" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when learner hasn't completed the lesson", () => {
    const { container } = render(<UpdatedBadge updatedAt="2026-04-10" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when completedAt is newer than updatedAt", () => {
    const { container } = render(
      <UpdatedBadge updatedAt="2026-04-01" completedAt="2026-04-15" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders UPDATED when updatedAt is newer than completedAt", () => {
    render(<UpdatedBadge updatedAt="2026-04-15" completedAt="2026-04-01" />);
    expect(screen.getByText(/UPDATED/i)).toBeInTheDocument();
  });

  it("renders nothing when dates are invalid strings", () => {
    const { container } = render(
      <UpdatedBadge updatedAt="not-a-date" completedAt="also-not" />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

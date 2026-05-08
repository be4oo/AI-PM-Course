import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLessonSearch } from "./useLessonSearch";

const CURRICULUM = [
  {
    id: 1,
    title: "Strategy",
    lessons: [
      { id: "1.1", title: "AI Paradigm Shift", content: "lots about strategy", keys: ["Type B"] },
      { id: "1.2", title: "ROI", content: "unit economics", keys: ["pain score"] },
    ],
  },
  {
    id: 2,
    title: "Models",
    lessons: [
      { id: "2.1", title: "Tokens", content: "embeddings and attention", keys: ["context window"] },
    ],
  },
];

describe("useLessonSearch", () => {
  it("starts hidden with empty query and no results", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));
    expect(result.current.visible).toBe(false);
    expect(result.current.query).toBe("");
    expect(result.current.results).toEqual([]);
  });

  it("toggle() opens the search bar; second toggle clears state", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(true);

    act(() => result.current.setQuery("paradigm"));
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].id).toBe("1.1");

    act(() => result.current.toggle());
    expect(result.current.visible).toBe(false);
    expect(result.current.query).toBe("");
    expect(result.current.results).toEqual([]);
  });

  it("setQuery matches title, content, and keys (case-insensitive)", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));

    act(() => result.current.setQuery("PARADIGM"));
    expect(result.current.results.map((r) => r.id)).toEqual(["1.1"]);

    act(() => result.current.setQuery("embeddings"));
    expect(result.current.results.map((r) => r.id)).toEqual(["2.1"]);

    act(() => result.current.setQuery("Pain Score"));
    expect(result.current.results.map((r) => r.id)).toEqual(["1.2"]);
  });

  it("empty / whitespace query yields no results", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));
    act(() => result.current.setQuery("paradigm"));
    expect(result.current.results.length).toBe(1);
    act(() => result.current.setQuery("   "));
    expect(result.current.results).toEqual([]);
  });

  it("close() resets visibility, query, and results", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));
    act(() => result.current.setVisible(true));
    act(() => result.current.setQuery("tokens"));
    expect(result.current.results.length).toBe(1);

    act(() => result.current.close());
    expect(result.current.visible).toBe(false);
    expect(result.current.query).toBe("");
    expect(result.current.results).toEqual([]);
  });

  it("returns module-relative coordinates so callers can navigate", () => {
    const { result } = renderHook(() => useLessonSearch(CURRICULUM));
    act(() => result.current.setQuery("tokens"));
    const hit = result.current.results[0];
    expect(hit.mi).toBe(1);
    expect(hit.li).toBe(0);
  });
});

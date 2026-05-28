import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLessonAudio } from "./useLessonAudio";

function buildSpeechSynthesisMock() {
  return {
    speak: vi.fn((utterance) => {
      mock.lastUtterance = utterance;
      mock.speaking = true;
    }),
    cancel: vi.fn(() => {
      mock.speaking = false;
      mock.pending = false;
    }),
    pause: vi.fn(() => {
      mock.speaking = false;
    }),
    resume: vi.fn(() => {
      mock.speaking = true;
    }),
    speaking: false,
    pending: false,
    lastUtterance: null,
  };
}

let mock;

describe("useLessonAudio", () => {
  beforeEach(() => {
    mock = buildSpeechSynthesisMock();
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: mock,
    });
    window.SpeechSynthesisUtterance = function (text) {
      this.text = text;
      this.onend = null;
    };
  });

  afterEach(() => {
    delete window.SpeechSynthesisUtterance;
    delete window.speechSynthesis;
    vi.restoreAllMocks();
  });

  it("starts in stopped state and reports total chunks", () => {
    const { result } = renderHook(() => useLessonAudio(["a", "b", "c"]));
    expect(result.current.audioState).toBe("stopped");
    expect(result.current.audioIndex).toBe(0);
    expect(result.current.totalChunks).toBe(3);
  });

  // Stable refs — real App.jsx callers useMemo() the chunks array, so the
  // hook's [chunks] effect cleanup only runs on real lesson nav, not every
  // render. Tests must mirror that.
  const TWO = ["one", "two"];
  const ONE = ["one"];
  const SINGLE_A = ["a"];
  const THREE = ["a", "b", "c"];

  it("play() speaks the chunk and transitions to playing", () => {
    const { result } = renderHook(() => useLessonAudio(TWO));
    act(() => result.current.play(0));
    expect(mock.speak).toHaveBeenCalledOnce();
    expect(mock.lastUtterance.text).toBe("one");
    expect(result.current.audioState).toBe("playing");
    expect(result.current.audioIndex).toBe(0);
  });

  it("play() past the last chunk resets to stopped without speaking", () => {
    const { result } = renderHook(() => useLessonAudio(ONE));
    act(() => result.current.play(5));
    expect(mock.speak).not.toHaveBeenCalled();
    expect(result.current.audioState).toBe("stopped");
    expect(result.current.audioIndex).toBe(0);
  });

  it("pause/resume/stop drive the SpeechSynthesis API and state", () => {
    const { result } = renderHook(() => useLessonAudio(SINGLE_A));
    act(() => result.current.play(0));
    act(() => result.current.pause());
    expect(mock.pause).toHaveBeenCalledOnce();
    expect(result.current.audioState).toBe("paused");

    act(() => result.current.resume());
    expect(mock.resume).toHaveBeenCalledOnce();
    expect(result.current.audioState).toBe("playing");

    act(() => result.current.stop());
    expect(mock.cancel).toHaveBeenCalled();
    expect(result.current.audioState).toBe("stopped");
    expect(result.current.audioIndex).toBe(0);
  });

  it("next() advances; prev() goes back (and stays at 0 from 0)", () => {
    const { result } = renderHook(() => useLessonAudio(THREE));
    act(() => result.current.play(0));
    act(() => result.current.next());
    expect(result.current.audioIndex).toBe(1);
    act(() => result.current.next());
    expect(result.current.audioIndex).toBe(2);
    // next() at last chunk is a no-op (no advance past end)
    act(() => result.current.next());
    expect(result.current.audioIndex).toBe(2);
    act(() => result.current.prev());
    expect(result.current.audioIndex).toBe(1);
  });

  it("changing chunks (lesson nav) cancels speech and resets state", () => {
    const { result, rerender } = renderHook(
      ({ chunks }) => useLessonAudio(chunks),
      { initialProps: { chunks: ["lesson1-a", "lesson1-b"] } }
    );
    act(() => result.current.play(1));
    expect(result.current.audioState).toBe("playing");
    expect(result.current.audioIndex).toBe(1);

    rerender({ chunks: ["lesson2-a"] });
    expect(mock.cancel).toHaveBeenCalled();
    expect(result.current.audioState).toBe("stopped");
    expect(result.current.audioIndex).toBe(0);
  });

  it("reports unsupported and play() is a no-op when constructor missing", () => {
    delete window.SpeechSynthesisUtterance;
    const { result } = renderHook(() => useLessonAudio(["a"]));
    expect(result.current.supported).toBe(false);
    act(() => result.current.play(0));
    expect(mock.speak).not.toHaveBeenCalled();
  });
});

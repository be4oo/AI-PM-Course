import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import { setViewport } from "./test-utils/viewport.js";
import { PROGRESS_STORAGE_KEY } from "./utils/persistence.js";
import { LAST_READ_KEY } from "./course/hooks/useActiveLesson.js";

function deferred() {
  let resolve;
  const promise = new Promise((next) => {
    resolve = next;
  });
  return { promise, resolve };
}

function memoryStorage() {
  const values = new Map();
  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

function installDelayedStorage(savedProgress) {
  const read = deferred();
  const storage = {
    get: vi.fn(() => read.promise),
    set: vi.fn(async (key, value) => window.localStorage.setItem(key, value)),
  };
  Object.defineProperty(window, "storage", {
    configurable: true,
    writable: true,
    value: storage,
  });
  return {
    storage,
    release: () => read.resolve({ value: JSON.stringify(savedProgress) }),
  };
}

beforeEach(() => {
  document.body.innerHTML = '<div id="course-modal-root"></div>';
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: memoryStorage(),
  });
  setViewport(1024);
});

describe("App track hydration", () => {
  it("does not let CourseShell replace the saved mobile track before async hydration", async () => {
    const savedProgress = {
      activeTrack: "mobile",
      activeMod: 0,
      activeLesson: 0,
      completed: [],
      bookmarks: [],
    };
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(savedProgress));
    window.localStorage.setItem(LAST_READ_KEY, JSON.stringify("mob-1.1"));
    window.history.replaceState(null, "", "#lesson-mob-1.1");
    const { storage, release } = installDelayedStorage(savedProgress);

    render(<App />);

    expect(document.querySelector(".course-shell")).toBeNull();
    expect(window.location.hash).toBe("#lesson-mob-1.1");
    expect(window.localStorage.getItem(LAST_READ_KEY)).toBe(JSON.stringify("mob-1.1"));

    await act(async () => release());

    expect(await screen.findByText("Mobile App Lessons")).toBeInTheDocument();
    expect(screen.getByText("MOBILE 1")).toBeInTheDocument();
    expect(window.location.hash).toBe("#lesson-mob-1.1");
    expect(window.localStorage.getItem(LAST_READ_KEY)).toBe(JSON.stringify("mob-1.1"));
    await waitFor(() => {
      const latestWrite = storage.set.mock.calls.at(-1)?.[1];
      expect(JSON.parse(latestWrite).activeTrack).toBe("mobile");
    });
  });

  it("still lets a genuine cross-track startup hash override the saved track", async () => {
    const savedProgress = {
      activeTrack: "mobile",
      activeMod: 0,
      activeLesson: 0,
      completed: [],
      bookmarks: [],
    };
    window.history.replaceState(null, "", "#lesson-1.1");
    const { storage, release } = installDelayedStorage(savedProgress);

    render(<App />);
    expect(window.location.hash).toBe("#lesson-1.1");

    await act(async () => release());

    expect(await screen.findByText("AI PM Course")).toBeInTheDocument();
    expect(window.location.hash).toBe("#lesson-1.1");
    await waitFor(() => {
      const latestWrite = storage.set.mock.calls.at(-1)?.[1];
      expect(JSON.parse(latestWrite).activeTrack).toBe("aipm");
    });
  });
});

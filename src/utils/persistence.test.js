import { describe, expect, it, vi } from "vitest";
import {
  PROGRESS_STORAGE_KEY,
  parseProgress,
  readProgress,
  resolveLessonHash,
  serializeProgress,
  writeProgress,
} from "./persistence";

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
}

describe("persistence utility", () => {
  describe("parseProgress", () => {
    it("returns ok for a valid object payload", () => {
      const r = parseProgress(JSON.stringify({ completed: ["1-1.1"], activeMod: 0 }));
      expect(r.ok).toBe(true);
      expect(r.data.activeMod).toBe(0);
    });

    it("rejects empty input", () => {
      expect(parseProgress("").ok).toBe(false);
      expect(parseProgress(null).ok).toBe(false);
    });

    it("rejects malformed JSON", () => {
      const r = parseProgress("{not json");
      expect(r.ok).toBe(false);
      expect(r.reason).toMatch(/not valid JSON/);
    });

    it("rejects arrays and primitives", () => {
      expect(parseProgress("[]").ok).toBe(false);
      expect(parseProgress('"string"').ok).toBe(false);
      expect(parseProgress("null").ok).toBe(false);
    });

    it("runs the 8.5 → 8-5 migration on parse", () => {
      const raw = JSON.stringify({
        completed: ["8.5-8.5.1"],
        bookmarks: ["8.5-8.5.2"],
      });
      const r = parseProgress(raw);
      expect(r.ok).toBe(true);
      expect(r.data.completed).toContain("8-5-8.5.1");
      expect(r.data.bookmarks).toContain("8-5-8.5.2");
    });
  });

  describe("serializeProgress", () => {
    it("converts Set fields to arrays so JSON round-trips", () => {
      const out = serializeProgress({
        completed: new Set(["1-1.1", "1-1.2"]),
        bookmarks: new Set(["2-2.1"]),
        activeMod: 3,
      });
      const parsed = JSON.parse(out);
      expect(parsed.completed.sort()).toEqual(["1-1.1", "1-1.2"]);
      expect(parsed.bookmarks).toEqual(["2-2.1"]);
      expect(parsed.activeMod).toBe(3);
    });

    it("leaves non-Set fields alone", () => {
      const out = serializeProgress({ completed: ["x"], bookmarks: [], reviewChecks: { a: true } });
      const parsed = JSON.parse(out);
      expect(parsed.reviewChecks).toEqual({ a: true });
    });
  });

  describe("readProgress", () => {
    it("prefers host-shell storage when it returns a string value", async () => {
      const storage = {
        get: vi.fn(async () => ({ value: '{"x":1}' })),
      };
      const localStorage = memoryStorage({ [PROGRESS_STORAGE_KEY]: '{"y":2}' });
      const raw = await readProgress({ storage, localStorage });
      expect(raw).toBe('{"x":1}');
      expect(storage.get).toHaveBeenCalledWith(PROGRESS_STORAGE_KEY);
    });

    it("falls back to localStorage when storage returns nothing", async () => {
      const storage = { get: vi.fn(async () => ({ value: null })) };
      const localStorage = memoryStorage({ [PROGRESS_STORAGE_KEY]: '{"y":2}' });
      const raw = await readProgress({ storage, localStorage });
      expect(raw).toBe('{"y":2}');
    });

    it("returns null when neither store has a value", async () => {
      const raw = await readProgress({ storage: null, localStorage: memoryStorage() });
      expect(raw).toBeNull();
    });

    it("recovers when storage.get throws", async () => {
      const storage = { get: vi.fn(async () => { throw new Error("boom"); }) };
      const localStorage = memoryStorage({ [PROGRESS_STORAGE_KEY]: '{"y":2}' });
      const raw = await readProgress({ storage, localStorage });
      expect(raw).toBe('{"y":2}');
    });
  });

  describe("writeProgress", () => {
    it("writes to host-shell storage when present", async () => {
      const storage = { set: vi.fn(async () => {}) };
      const result = await writeProgress("payload", { storage, localStorage: memoryStorage() });
      expect(result).toBe("storage");
      expect(storage.set).toHaveBeenCalledWith(PROGRESS_STORAGE_KEY, "payload");
    });

    it("falls back to localStorage when storage.set throws (e.g. quota)", async () => {
      const storage = { set: vi.fn(async () => { throw new Error("quota"); }) };
      const localStorage = memoryStorage();
      const result = await writeProgress("payload", { storage, localStorage });
      expect(result).toBe("localStorage");
      expect(localStorage.getItem(PROGRESS_STORAGE_KEY)).toBe("payload");
    });

    it("returns null when both writes fail", async () => {
      const storage = { set: vi.fn(async () => { throw new Error("a"); }) };
      const localStorage = {
        setItem: vi.fn(() => { throw new Error("b"); }),
        getItem: () => null,
      };
      const result = await writeProgress("payload", { storage, localStorage });
      expect(result).toBeNull();
    });
  });

  describe("resolveLessonHash", () => {
    const curriculum = [
      { lessons: [{ id: "1.1" }, { id: "1.2" }] },
      { lessons: [{ id: "2.1" }] },
    ];

    it("maps a known hash to module/lesson indices", () => {
      expect(resolveLessonHash("#lesson-2.1", curriculum)).toEqual({ mi: 1, li: 0 });
      expect(resolveLessonHash("#lesson-1.2", curriculum)).toEqual({ mi: 0, li: 1 });
    });

    it("returns null for unknown lesson ids", () => {
      expect(resolveLessonHash("#lesson-9.9", curriculum)).toBeNull();
    });

    it("returns null for non-lesson hashes / empty / non-strings", () => {
      expect(resolveLessonHash("", curriculum)).toBeNull();
      expect(resolveLessonHash("#other", curriculum)).toBeNull();
      expect(resolveLessonHash(null, curriculum)).toBeNull();
      expect(resolveLessonHash("#lesson-", curriculum)).toBeNull();
    });
  });
});

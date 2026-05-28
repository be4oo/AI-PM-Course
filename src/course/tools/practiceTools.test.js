/**
 * SC-008 build gate — the Practice rail contains exactly four tools.
 *
 * Spec refs:
 *   - FR-002: sidebar contains exactly four Practice items, named explicitly.
 *   - SC-008: an automated check fails the build if a fifth tool is added
 *             without an explicit constitution-aligned justification.
 *
 * If you are reading this because you want to add a fifth tool: STOP, open
 * .specify/memory/constitution.md, and amend the constitution before
 * changing this test. The whole point of the gate is to make that decision
 * visible.
 */

import { describe, it, expect } from "vitest";
import {
  PRACTICE_TOOLS,
  PRACTICE_TOOL_IDS,
  findPracticeTool,
} from "./practiceTools.js";

const ALLOWED_IDS = ["spaced-review", "adversarial-review", "capstone", "knowledge-map"];

describe("Practice rail registry — SC-008 gate", () => {
  it("contains exactly four tools", () => {
    expect(PRACTICE_TOOLS).toHaveLength(4);
  });

  it("contains the exact id set the spec enumerates (no additions, no substitutions)", () => {
    const got = PRACTICE_TOOLS.map((t) => t.id).sort();
    const want = [...ALLOWED_IDS].sort();
    expect(got).toEqual(want);
  });

  it("preserves the spec's display order: Spaced → Adversarial → Capstone → Knowledge map", () => {
    expect(PRACTICE_TOOLS.map((t) => t.id)).toEqual(ALLOWED_IDS);
  });

  it("each entry has the contract shape { id, label, description, Component }", () => {
    for (const tool of PRACTICE_TOOLS) {
      expect(typeof tool.id).toBe("string");
      expect(typeof tool.label).toBe("string");
      expect(tool.label.length).toBeGreaterThan(0);
      expect(typeof tool.description).toBe("string");
      expect(typeof tool.Component).toBe("function");
    }
  });

  it("entries (and the registry) are frozen so callers cannot mutate them", () => {
    expect(Object.isFrozen(PRACTICE_TOOLS)).toBe(true);
    for (const tool of PRACTICE_TOOLS) {
      expect(Object.isFrozen(tool)).toBe(true);
    }
  });

  it("PRACTICE_TOOL_IDS mirrors the registry exactly", () => {
    expect([...PRACTICE_TOOL_IDS].sort()).toEqual([...ALLOWED_IDS].sort());
    expect(PRACTICE_TOOL_IDS.size).toBe(4);
  });

  it("findPracticeTool returns the matching entry for each allowed id", () => {
    for (const id of ALLOWED_IDS) {
      const tool = findPracticeTool(id);
      expect(tool).not.toBeUndefined();
      expect(tool.id).toBe(id);
    }
  });

  it("findPracticeTool returns undefined for unknown ids (never silently falls back)", () => {
    expect(findPracticeTool("audit")).toBeUndefined();
    expect(findPracticeTool("sources")).toBeUndefined();
    expect(findPracticeTool("")).toBeUndefined();
  });
});

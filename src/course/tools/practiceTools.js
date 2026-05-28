/**
 * Practice tools registry — the four learner-facing tools surfaced in the
 * sidebar's Practice rail.
 *
 * Spec ref:
 *   - FR-002: sidebar contains "exactly four tools: Spaced review,
 *             Adversarial review, Capstone, Knowledge map. No author or
 *             audit tools may appear."
 *   - SC-008: an automated check fails the build if a fifth tool is added
 *             without an explicit constitution-aligned justification.
 * Plan ref:
 *   - R10: this constant is the build gate; its companion test
 *     (practiceTools.test.js) is the SC-008 enforcement.
 *
 * Adding a fifth tool requires ALL of:
 *   1. A constitution amendment per .specify/memory/constitution.md
 *      §Governance (the redesign treats four as the contracted set, so this
 *      is a MINOR or MAJOR bump depending on whether existing principles are
 *      affected).
 *   2. Updating this array.
 *   3. Updating practiceTools.test.js to the new count + id set.
 *
 * The Component ref is the tool's modal body. Phase 5 (T043) wired these to
 * the real SpacedReviewModal / AdversarialReviewModal / CapstoneModal /
 * KnowledgeMapModal — each is a controlled body that receives `titleId` and
 * tool-specific props from CourseShell's openTool reducer.
 */

import { SpacedReviewModal } from "./SpacedReviewModal.jsx";
import { AdversarialReviewModal } from "./AdversarialReviewModal.jsx";
import { CapstoneModal } from "./CapstoneModal.jsx";
import { KnowledgeMapModal } from "./KnowledgeMapModal.jsx";

/**
 * @typedef {Object} PracticeTool
 * @property {"spaced-review"|"adversarial-review"|"capstone"|"knowledge-map"} id
 * @property {string} label                    sidebar label (frozen microcopy)
 * @property {string} description              short hint (sidebar / palette)
 * @property {React.ComponentType<any>} Component   modal body component
 */

/** @type {ReadonlyArray<PracticeTool>} */
export const PRACTICE_TOOLS = Object.freeze([
  Object.freeze({
    id: "spaced-review",
    label: "Spaced review",
    description: "Flashcards on the lessons you've finished",
    Component: SpacedReviewModal,
  }),
  Object.freeze({
    id: "adversarial-review",
    label: "Adversarial review",
    description: "Score an artifact against a reviewer persona",
    Component: AdversarialReviewModal,
  }),
  Object.freeze({
    id: "capstone",
    label: "Capstone",
    description: "Track milestones and unlock readiness",
    Component: CapstoneModal,
  }),
  Object.freeze({
    id: "knowledge-map",
    label: "Knowledge map",
    description: "Lessons as a navigable constellation",
    Component: KnowledgeMapModal,
  }),
]);

/**
 * The set of allowed tool IDs. Exposed for tests and runtime guards.
 * @type {ReadonlySet<string>}
 */
export const PRACTICE_TOOL_IDS = Object.freeze(
  new Set(PRACTICE_TOOLS.map((t) => t.id)),
);

/**
 * Look up a tool by id. Returns undefined for unknown ids so callers can
 * gracefully refuse to open them (do NOT silently fall back — opening an
 * unintended tool would violate FR-002).
 *
 * @param {string} id
 * @returns {PracticeTool | undefined}
 */
export function findPracticeTool(id) {
  return PRACTICE_TOOLS.find((t) => t.id === id);
}

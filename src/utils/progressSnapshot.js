import {
  buildDefaultReviewDraft,
  normalizeReviewHistory,
} from "./reviewHistory";
import { migrateLegacyModuleStorage } from "./moduleStorage";
import { migrateWeakConcept } from "./spacedRepetition";
import { parseProgressSnapshot } from "../data/learningExperience";

/**
 * Trigger a browser download of a snapshot string. Pure DOM side-effect, but
 * lifted out of App.jsx so the lesson player doesn't reach into Blob/anchor
 * APIs directly. No-ops outside the browser.
 */
export function triggerSnapshotDownload(fileName, content) {
  if (typeof document === "undefined" || typeof URL === "undefined") return;
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Default file name for an exported progress snapshot, dated YYYY-MM-DD.
 */
export function snapshotFileName(now = new Date()) {
  return `ai-pm-progress-${now.toISOString().slice(0, 10)}.json`;
}

/**
 * Parse a progress-snapshot string and apply it to the given setter bag.
 *
 * Returns { ok: true } on success or { ok: false, reason } if the snapshot
 * is malformed. Setters are called only for keys actually present in the
 * snapshot, so importing a partial snapshot leaves untouched state intact.
 */
export function applyImportedProgress(rawSnapshot, setters) {
  const parsed = parseProgressSnapshot(rawSnapshot);
  if (!parsed.ok) return parsed;

  const { payload: d } = migrateLegacyModuleStorage(parsed.data);

  try {
    if (Array.isArray(d.completed)) setters.setCompleted?.(new Set(d.completed));
    if (Array.isArray(d.bookmarks)) setters.setBookmarks?.(new Set(d.bookmarks));
    if (typeof d.activeMod === "number") setters.setActiveMod?.(d.activeMod);
    if (typeof d.activeLesson === "number") setters.setActiveLesson?.(d.activeLesson);
    if (d.reviewChecks) setters.setReviewChecks?.(d.reviewChecks);
    if (d.cohortChecks) setters.setCohortChecks?.(d.cohortChecks);
    if (d.reviewEvidence) setters.setReviewEvidence?.(d.reviewEvidence);
    if (d.cohortEvidence) setters.setCohortEvidence?.(d.cohortEvidence);
    if (d.communityConfig) setters.setCommunityConfig?.(d.communityConfig);
    if (d.communityAssignments) setters.setCommunityAssignments?.(d.communityAssignments);
    if (d.capstoneChecks) setters.setCapstoneChecks?.(d.capstoneChecks);
    if (typeof d.capstoneNotes === "string") setters.setCapstoneNotes?.(d.capstoneNotes);
    if (d.reviewSimulatorHistory) {
      setters.setReviewSimulatorHistory?.(normalizeReviewHistory(d.reviewSimulatorHistory));
    }
    if (d.reviewSimulatorDraft) {
      setters.setReviewSimulatorDraft?.(buildDefaultReviewDraft(d.reviewSimulatorDraft));
    }
    if (d.reviewSimulatorContext) setters.setReviewSimulatorContext?.(d.reviewSimulatorContext);
    if (d.reviewSimulatorReturnView) setters.setReviewSimulatorReturnView?.(d.reviewSimulatorReturnView);
    if (d.studyMode) setters.setStudyMode?.(d.studyMode);
    if (d.lessonStates) setters.setLessonStates?.(d.lessonStates);
    if (d.moduleIntroSeen) setters.setModuleIntroSeen?.(d.moduleIntroSeen);
    if (d.moduleOutroReady) setters.setModuleOutroReady?.(d.moduleOutroReady);
    if (d.artifactChecks) setters.setArtifactChecks?.(d.artifactChecks);
    if (d.activityLog) setters.setActivityLog?.(d.activityLog);
    if (Array.isArray(d.weakConcepts)) {
      setters.setWeakConcepts?.(d.weakConcepts.map((wc) => migrateWeakConcept(wc)));
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `payload shape is incompatible: ${err.message}` };
  }
}

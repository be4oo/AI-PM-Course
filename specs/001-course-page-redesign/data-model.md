# Phase 1 — Data Model: Editorial-Dark Course Page Redesign

**Feature**: 001-course-page-redesign
**Date**: 2026-05-26

All entities below are **client-side, in-memory** with selective `localStorage` persistence. No new server tables. The model is intentionally close to the existing app's shapes — the redesign reads from the same `curriculum` data module and the same `localStorage` keys today's app already uses.

---

## Lesson

A unit of learning rendered in the reading column.

**Source**: derived from `src/data/curriculum.js` and `src/data/lessonEnhancements.js` (existing). Not duplicated by this feature.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable lesson id (e.g. `m1-l1`). Source of truth for storage keys. |
| `moduleId` | `string` | Foreign key to `Module.id`. |
| `title` | `string` | Rendered as the serif display title. |
| `body` | `RichContent` | An ordered list of section blocks. Allowed block kinds: `heading`, `prose`, `list` (and `ol`), `takeaways`, `leadership-note`, `case-study`, **`mena-note`** (FR-028a — per-lesson Arabic/RTL/MENA context; carries optional `dir`/`lang`), `code`, `image`/`figure`, `artifact-link`. Unknown kinds fall back to plain prose. |
| `sections` | `Array<{ id: string, label: string }>` | Derived from `body` heading blocks. Drives the right-rail outline. |
| `apply` | `RichContent \| null` | Practice block (optional). |
| `quiz` | `RichContent \| null` | Self-test block (optional). |
| `artifact` | `{ label: string, href: string } \| null` | If present, rendered by `ArtifactStripe` in the reading column. |
| `runtimeEstimate` | `number` | Minutes; used by study-mode pills. |

**Validation**:
- `id` must be unique across the curriculum (asserted in a Vitest test).
- Every heading block in `body` must have a stable `id` for outline anchoring.

**State transitions**: none — `Lesson` is immutable course content.

---

## Module

A group of lessons. Read-only for the redesign.

**Source**: `src/data/curriculum.js`.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable module id. |
| `index` | `number` | Display order. |
| `name` | `string` | Sidebar label. |
| `lessons` | `Array<Lesson>` | Ordered. |
| `markerColor` | `string` | One of 12 tokens. Used **only** as a 2px marker per FR-004 and lint rule R4. |

**Validation**:
- `markerColor` MUST come from `MODULE_MARKER_PALETTE` (12 entries).
- `lessons` MUST be non-empty.

**State transitions**: none.

---

## LearnerProgress

Persistent per-device record. Backed by `localStorage`.

| Field | Type | Storage key | Notes |
|---|---|---|---|
| `completedLessonIds` | `Set<string>` | `course/completed/v1` | Set of `Lesson.id`. |
| `bookmarkedLessonIds` | `Set<string>` | `course/bookmarks/v1` | Set of `Lesson.id`. |
| `lastReadLessonId` | `string \| null` | `course/last-read/v1` | Restored on load (SC-001). |
| `studyMode` | `"skim" \| "deep" \| "exec"` | `course/study-mode/v1` | Default `"deep"`. |
| `streak` | `{ current: number, best: number, lastReadDate: string }` | `course/streak/v1` | `lastReadDate` is ISO date (`YYYY-MM-DD`). |
| `tweaks` | `TweaksPreferences` | `course/tweaks/v1` | See entity below. |

**Validation**:
- All `Lesson.id` values referenced MUST exist in the current curriculum at read time. Unknown IDs are dropped with a count surfaced to the importer (Edge Case).
- `studyMode` MUST be one of the three enum values. Unknown values fall back to `"deep"`.
- `streak.current` MUST be ≥ 0 and ≤ 366; values outside are clamped on read.

**State transitions**:

| From | Event | To |
|---|---|---|
| `completed = false` | learner clicks Mark complete | `completed = true`, possibly `streak.current++` if `lastReadDate < today` |
| `completed = true` | learner clicks Mark complete again | `completed = false` |
| `bookmarked = false` | learner presses `b` or clicks bookmark | `bookmarked = true` |
| `bookmarked = true` | same | `bookmarked = false` |
| any | Import progress (valid JSON) | overwritten by import payload (after validation) |
| any | Export progress | unchanged (read-only operation) |

**Edge cases**:
- First load: all sets empty, `streak.current = 0`, `lastReadLessonId = null` ⇒ default to first lesson of first module.
- `lastReadLessonId` points to a deleted lesson: fall through to "first incomplete lesson"; do not crash.

---

## ToolSession

Transient state for an open Practice tool. Not persisted across reloads (closing the modal discards).

| Field | Type | Notes |
|---|---|---|
| `toolId` | `"spaced-review" \| "adversarial-review" \| "capstone" \| "knowledge-map"` | One of the four allowed ids (R10 gate). |
| `openedFrom` | `"sidebar" \| "right-rail" \| "shortcut" \| "palette"` | For telemetry / focus restore. |
| `restoreScrollY` | `number` | Reading column scroll position to restore on close (R1). |
| `restoreFocusEl` | `HTMLElement \| null` | Element that opened the modal. |
| `payload` | `SpacedSession \| AdversarialSession \| CapstoneView \| MapView` | Discriminated by `toolId`. |

**Validation**: only one `ToolSession` may exist at a time (FR-016). Enforced by reducer.

---

## SpacedSession (sub-shape of ToolSession.payload)

| Field | Type | Notes |
|---|---|---|
| `queue` | `Array<Flashcard>` | Built from due-review entries; see `src/data/reviewSystem.js`. |
| `index` | `number` | 0-based index into `queue`. |
| `revealed` | `boolean` | Whether the answer is visible. |
| `grades` | `Array<"forgot" \| "hard" \| "good" \| "easy">` | Length ≤ `index + 1`. |
| `phase` | `"in-progress" \| "summary"` | UI gate. |

---

## AdversarialSession (sub-shape of ToolSession.payload)

| Field | Type | Notes |
|---|---|---|
| `personaId` | `string` | One of the existing reviewer personas in `src/data/reviewerPersonas.js`. |
| `draft` | `{ artifactText?: string, artifactUrl?: string, lessonContext?: string }` | Composer state. |
| `phase` | `"compose" \| "scoring" \| "verdict"` | UI gate. |
| `verdict` | `ScoredRubric \| null` | Output of `scoreArtifactAgainstRubric`. |

---

## CapstoneView (sub-shape of ToolSession.payload)

| Field | Type | Notes |
|---|---|---|
| `milestones` | `Array<{ id, label, status, gatingLessonIds, stats }>` | 6 entries; data sourced from `src/data/capstoneDashboard.js`. |
| `focusMilestoneId` | `string \| null` | Highlighted milestone. |

---

## MapView (sub-shape of ToolSession.payload)

| Field | Type | Notes |
|---|---|---|
| `groups` | `Array<{ moduleId, label, lessons: Array<{ id, label, completed: boolean }> }>` | Source of the constellation render. |
| `highlightedLessonId` | `string \| null` | Hover/focus highlight. |

---

## CommandPaletteEntry

In-memory, rebuilt on every palette open from the current curriculum.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Composite (`lesson:m1-l1`, `section:m1-l1#what-is`, `view:audit`). |
| `kind` | `"lesson" \| "section" \| "view"` | `view` entries are surfaced only when the query starts with `>` (R7). |
| `label` | `string` | Rendered string. |
| `target` | `{ lessonId?: string, sectionId?: string, viewId?: string }` | Navigation payload. |

**Validation**: each `id` MUST be unique across the open palette. The component asserts this in dev mode.

---

## TweaksPreferences

Per spec §FR-025 (clarified 2026-05-26): exactly four enumerated accent
variants. Adding a fifth requires a spec amendment AND a corresponding
update to the per-variant contrast evidence (FR-021 / SC-006).

| Field | Type | Allowed | Default |
|---|---|---|---|
| `accent` | `string` | `"copper" \| "sage" \| "ink-blue" \| "iron"` | `"copper"` |
| `display` | `string` | `"serif" \| "sans"` | `"serif"` |
| `density` | `string` | `"roomy" \| "compact"` | `"roomy"` |

**Validation**: unknown values fall back to the default; never crash the shell.

---

## Relationships

```text
Module 1───* Lesson
Lesson 1───* Section (derived from body)
Lesson 1───? Artifact
Module/Lesson ─── (no FK back) LearnerProgress (ID-only references)
LearnerProgress 1───1 TweaksPreferences
ToolSession is independent; bounded to at most one instance.
CommandPaletteEntry is derived; not persisted.
```

---

## Storage key registry

To prevent collisions with the existing app (which uses `buildLessonStorageKey`, etc.), all new keys for this feature are prefixed `course/`:

| Key | Owner |
|---|---|
| `course/completed/v1` | `LearnerProgress.completedLessonIds` |
| `course/bookmarks/v1` | `LearnerProgress.bookmarkedLessonIds` |
| `course/last-read/v1` | `LearnerProgress.lastReadLessonId` |
| `course/study-mode/v1` | `LearnerProgress.studyMode` |
| `course/streak/v1` | `LearnerProgress.streak` |
| `course/tweaks/v1` | `LearnerProgress.tweaks` |

Migration: on first mount of `CourseShell`, run a one-time read from the *existing* legacy keys (whatever `buildLessonStorageKey` produced) and write to the new namespace if the new namespace is empty. Legacy keys are read-only after migration; no destructive delete in this feature.

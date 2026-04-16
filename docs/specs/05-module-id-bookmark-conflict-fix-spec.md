# Module 8.5 Bookmark Key Conflict Fix — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `docs/plans/ai-native-mobile-lessons-plan.md` (ADR-002)
- `src/App.jsx` (bookmark key construction)
- `src/data/curriculum.js` (Module 8.5 object)

---

## Overview

The existing decision (ADR-002) used `id: "8.5"` with label `"MODULE 8.5"` for the mobile specialization module. Bookmarks and review keys are constructed as `${mod.id}-${lesson.id}`, producing keys like `"8.5-8.5.1"`. Any future storage migration, URL-based routing, CSV export, or key-path parsing will fragment on that dot. This spec defines a non-breaking migration to normalize storage keys to `"8-5"` while keeping `"8.5"` as the visible label.

---

## Actors

- **Course Application**: Persists bookmarks and review state locally
- **Course Author (Beshoy)**: Owns storage key stability
- **AI PM Course Learner**: Must not lose bookmarks or review progress during the migration

---

## Current State

- `src/data/curriculum.js` defines the specialization module with `id: "8.5"`
- `src/App.jsx` constructs bookmark keys as `${mod.id}-${lesson.id}`
- Bookmark keys for this module contain a literal dot: `"8.5-8.5.1"` through `"8.5-8.5.6"`
- No migration layer exists for renaming keys
- Dot-in-key is known to collide with dot-path parsers, URL routing, and some storage serializers

---

## In Scope

- A storage-key normalizer that maps module ID `"8.5"` to storage slug `"8-5"`
- A one-time migration on app load that renames existing bookmark/review keys from `"8.5-*"` to `"8-5-*"`
- Preservation of the visible label `"MODULE 8.5"` in the UI
- Unit tests that verify both old and new keys resolve correctly during migration

## Out of Scope

- Renumbering other modules
- Changing the lesson ID scheme inside the module
- URL routing redesign beyond key normalization

---

## User Stories

### US-001: Normalize Storage Slug Without Breaking the UI

**As a** course author,
**I want to** normalize the internal storage slug for Module 8.5 to `"8-5"`,
**so that** storage keys never contain a literal dot while the UI label stays `"MODULE 8.5"`.

**Acceptance Criteria:**
- [ ] AC-001: A helper `moduleStorageSlug(mod)` is added and used everywhere keys are constructed
- [ ] AC-002: The helper returns `"8-5"` for the module with `id: "8.5"` and returns the untouched `id` for all other modules
- [ ] AC-003: The UI continues to show `"MODULE 8.5"` as the label
- [ ] AC-004: Error state — If `moduleStorageSlug` is bypassed anywhere, a lint rule or test fails

**Priority**: P0 | **Dependencies**: None

---

### US-002: Migrate Existing Bookmarks and Review Keys

**As a** learner,
**I want to** keep my existing bookmarks and review progress after the storage slug change,
**so that** I don't lose state during the migration.

**Acceptance Criteria:**
- [ ] AC-001: On app load, any keys matching `^8\.5-` are renamed to `8-5-` with identical values
- [ ] AC-002: The migration is idempotent and runs only once per device
- [ ] AC-003: Post-migration, lookups using the new slug succeed and old keys are removed
- [ ] AC-004: Error state — If migration fails mid-flight, the old keys remain untouched and the failure is logged

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Prevent Future Dot-in-Key Regressions

**As a** course author,
**I want to** prevent any future module from introducing dot-in-key issues,
**so that** we never repeat this mistake.

**Acceptance Criteria:**
- [ ] AC-001: A unit test asserts that `moduleStorageSlug(m)` never returns a string containing a dot
- [ ] AC-002: A CI check rejects curriculum data where any constructed storage key contains a dot
- [ ] AC-003: Error state — If the rule triggers, the CI job fails with a clear message naming the offending module

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/App.jsx` (bookmark key construction, one-time migration)
- `src/utils/moduleStorage.js` (new helper)
- `src/utils/moduleStorage.test.js` (new tests)
- `src/data/curriculum.js` (no change to `id`, keep display label stable)

---

## Non-Functional Requirements

- **Backward compatibility**: Learners must not lose state
- **Performance**: Migration runs once and is O(n) over stored keys
- **Maintainability**: All key construction must go through the helper

---

## Risks and Unknowns

- If users have state across multiple devices, migration state may be inconsistent — acceptable as long as each device converges independently
- Some third-party analytics may have persisted old key shapes — note as a known observational gap

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Module 8.5 Bookmark Key Conflict Fix
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/05-module-id-bookmark-conflict-fix-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to land this as a 1-hour fix with tests.

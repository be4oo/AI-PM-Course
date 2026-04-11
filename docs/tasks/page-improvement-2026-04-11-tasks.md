# Course Page Improvement 2026-04-11 — Task Board

## Summary
Total Phases: 6 | Total Tasks: 18 | Parallel Tasks: 11 | Est. Complexity: High

Source Plan: `/docs/page-improvement-plan-2026-04-11.md`

Coverage note:
- `docs/specs/` was not found in this repository during pre-flight.
- This board maps all acceptance goals from the source plan into executable tasks.

---

## Phase 1: Runtime Stability & Navigation Foundation — Prerequisite for UX upgrades

- [x] [frontend] [S] TASK-001: Eliminate lesson jump regressions and finalize navigation utility
      Agent: frontend
      Priority: P0
      Deps: None
      Exit: Lesson jumps from sidebar/search preserve scroll; `Next` and `Prev` retain intentional top behavior; lint/build pass.

- [x] [frontend] [P] TASK-002: Add explicit "Back to top of lesson" affordance
      Agent: frontend
      Priority: P1
      Deps: TASK-001
      Exit: Learner can return to top with one click; button appears only when scroll depth threshold is crossed; behavior works on desktop/mobile.

- [x] [infra] [P] TASK-003: Add release verification checklist for stale bundle detection
      Agent: infra
      Priority: P1
      Deps: TASK-001
      Exit: `docs/release-checklist.md` created with hash/version verification steps and cache-busting validation checklist.

---

## Phase 2: Learning Flexibility Layer

- [x] [frontend] [S] TASK-004: Add study modes (`Fast Track`, `Deep Work`, `Executive Review`) to learner state
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      Exit: Study mode selector persisted in local state and reflected in lesson layout/content emphasis.

- [x] [frontend] [P] TASK-005: Add estimated duration metadata per lesson and per exercise
      Agent: frontend
      Priority: P1
      Deps: TASK-004
      Exit: Lesson cards and lesson header show total estimated time + exercise time; missing values use deterministic fallback.

- [x] [frontend] [P] TASK-006: Add "Resume where I left off" and "Continue streak" entry points
      Agent: frontend
      Priority: P1
      Deps: TASK-004
      Exit: Home entry shows quick resume action and streak indicator; click navigates to persisted lesson context.

---

## Phase 3: Motivation, Retention & Speed Mechanics

- [x] [frontend] [S] TASK-007: Implement richer progress states (`Read`, `Practiced`, `Artifact completed`, `Reviewed`)
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: Lesson state machine supports all four statuses and renders state badges in sidebar and lesson header.

- [x] [frontend] [P] TASK-008: Add "Why this matters" blocks to all lessons with missing context
      Agent: frontend
      Priority: P1
      Deps: TASK-007
      Exit: Every lesson has a visible relevance block tied to leadership/shipping outcomes; no lesson renders empty placeholders.

- [x] [frontend] [P] TASK-009: Add retrieval loops (recap cards + pre/post quiz hooks)
      Agent: frontend
      Priority: P1
      Deps: TASK-007
      Exit: Each lesson supports pre-quiz prompt, post-quiz recap card, and tracks weak concepts for review queue input.

- [x] [frontend] [P] TASK-010: Add worked examples and "common mistakes / red flags" block model
      Agent: frontend
      Priority: P1
      Deps: TASK-007
      Exit: At least one worked example structure and one red-flag structure are supported in lesson renderer and demonstrated in seeded lessons.

---

## Phase 4: Course Structure Standardization

- [x] [frontend] [S] TASK-011: Enforce lesson frame contract in data model
      Agent: frontend
      Priority: P0
      Deps: TASK-007
      Exit: Validation utility ensures each lesson has concept, takeaways, leadership note, tooling lab, exercise, artifact target, and review question (with fallback generation where required).

- [x] [frontend] [P] TASK-012: Add module intro pages (ability, artifact, real-org relevance)
      Agent: frontend
      Priority: P1
      Deps: TASK-011
      Exit: Each module has an intro card with three required sections and navigation into the first lesson.

- [x] [frontend] [P] TASK-013: Add module outro pages (summary, checklist, readiness gate)
      Agent: frontend
      Priority: P1
      Deps: TASK-011
      Exit: Module completion route shows progress summary, artifact checklist, and explicit "ready for next module" gate.

---

## Phase 5: Persistence & Productization Readiness

- [x] [frontend] [S] TASK-014: Add progress export/import (JSON) and versioned local schema
      Agent: frontend
      Priority: P0
      Deps: TASK-007
      Exit: User can export progress JSON and re-import with schema version check + migration guard; corrupted imports fail safely.

- [x] [frontend] [P] TASK-015: Add artifact checklist persistence per lesson
      Agent: frontend
      Priority: P1
      Deps: TASK-014
      Exit: Artifact checklist state persists and is visible in dashboard and lesson page.

- [x] [backend] [P] TASK-016: Scaffold Supabase-ready domain schema docs and API contract
      Agent: backend
      Priority: P1
      Deps: TASK-014
      Exit: `docs/architecture/persistence-schema.md` defines `users`, `progress`, `lesson_states`, `artifacts`, `reviews`, `cohort_memberships`, `capstone_submissions` with field-level contract.

- [x] [infra] [P] TASK-017: Add environment/config readiness for future cloud persistence
      Agent: infra
      Priority: P2
      Deps: TASK-016
      Exit: `.env.example` includes Supabase placeholders and docs explain local-only vs cloud persistence modes.

---

## Phase 6: Integration QA & Rollout

- [x] [any] [S] TASK-018: Full regression and acceptance validation for improvement plan
      Agent: any
      Priority: P0
      Deps: TASK-002, TASK-003, TASK-005, TASK-006, TASK-008, TASK-009, TASK-010, TASK-012, TASK-013, TASK-015, TASK-016, TASK-017
      Exit: Lint/build pass; manual QA confirms navigation behavior, study modes, progress states, retrieval loops, module intro/outro, and export/import flow; release checklist completed.

---

## Parallelization Waves (max 3 concurrent agents)

Phase 1:
- Wave A: TASK-002, TASK-003

Phase 2:
- Wave A: TASK-005, TASK-006

Phase 3:
- Wave A: TASK-008, TASK-009, TASK-010

Phase 4:
- Wave A: TASK-012, TASK-013

Phase 5:
- Wave A: TASK-015, TASK-016
- Wave B: TASK-017

---

## Tasks Gate Checklist

- [x] Work divided into logical, dependency-aware phases
- [x] Tasks are atomic and single-responsibility
- [x] Parallelizable tasks tagged `[P]`
- [x] Every task has concrete, testable exit criteria
- [x] All acceptance goals from source plan are mapped

Status: Completed and validated (`lint` + `build` + `test` + QA report).

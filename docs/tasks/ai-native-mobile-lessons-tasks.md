# AI-Native Mobile Curriculum Expansion — Task Board

## Summary
Total Phases: 6 | Total Tasks: 17 | Parallel Tasks: 9 | Est. Complexity: Medium

---

## Phase 1: Topology and Identity Decisions

- [x] [any] [S] TASK-001: Confirm specialization module identity contract
      Agent: any
      Priority: P0
      Deps: None
      Exit: The inserted module contract is fixed for `src/data/curriculum.js` with stable `id`, `week`, `module`, `title`, `tag`, and `accent`

- [x] [frontend] [S] TASK-002: Verify module identity compatibility with runtime keys
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      Exit: Bookmark, review, progress, and navigation code paths are confirmed not to require numeric-only `module.id`

- [x] [frontend] [S] TASK-003: Finalize lesson numbering scheme for the specialization module
      Agent: frontend
      Priority: P0
      Deps: TASK-002
      Exit: New lesson IDs are fixed consistently for curriculum, metadata, artifact paths, and enhancement keys

---

## Phase 2: Core Module Expansions in `curriculum.js`

- [x] [frontend] [P] TASK-004: Expand Module 2 with agent-ready specification lessons
      Agent: frontend
      Priority: P0
      Deps: TASK-003
      Exit: Module 2 contains new lessons for model routing, machine-readable acceptance criteria, and AI PRDs, sequenced after the current foundations

- [x] [frontend] [P] TASK-005: Expand Module 6 with build-loop control lessons
      Agent: frontend
      Priority: P1
      Deps: TASK-003
      Exit: Module 6 contains new lessons for the validation pyramid, golden datasets/evals, and Sprint 0

- [x] [frontend] [P] TASK-006: Expand Module 7 with repo-governed safety lessons
      Agent: frontend
      Priority: P0
      Deps: TASK-003
      Exit: Module 7 contains lessons for AGENTS.md authoring, drift monitoring, kill switches, merge caps, audit-trail review, and the AI risk register

Wave note: Tasks `004`–`006` are Wave A of max-3 parallel work.

- [x] [frontend] [P] TASK-007: Expand Module 9 with launch-control lessons
      Agent: frontend
      Priority: P1
      Deps: TASK-003
      Exit: Module 9 contains lessons for go/no-go evidence and responsible AI checklists

- [x] [frontend] [P] TASK-008: Expand Module 12 with executive operating-model lessons
      Agent: frontend
      Priority: P0
      Deps: TASK-003
      Exit: Module 12 contains lessons for DORA baselines, org design, vendor switching, and executive reporting

Wave note: Tasks `007`–`008` are Wave B after Wave A, keeping parallelism within the max-3 limit.

---

## Phase 3: Insert the Mobile Specialization Module

- [x] [frontend] [S] TASK-009: Insert the specialization module after Module 8
      Agent: frontend
      Priority: P0
      Deps: TASK-004, TASK-005, TASK-006, TASK-007, TASK-008
      Exit: `src/data/curriculum.js` contains the new specialization module in the intended sequence between existing Modules 8 and 9

- [x] [frontend] [S] TASK-010: Populate the specialization module with six mobile-delivery lessons
      Agent: frontend
      Priority: P0
      Deps: TASK-009
      Exit: The specialization module includes lessons for design-token context, token injection consistency, Flutter orchestration, Flutter context engineering, mobile multi-agent orchestration, and BLE/IoT HITL mapping

- [x] [frontend] [S] TASK-011: Verify downstream module ordering after insertion
      Agent: frontend
      Priority: P0
      Deps: TASK-010
      Exit: Modules after the specialization remain correctly ordered and reachable through sequential lesson navigation

---

## Phase 4: Mode-Specific Enhancements in `lessonEnhancements.js`

- [x] [frontend] [P] TASK-012: Add enhancement entries for expanded core-module lessons
      Agent: frontend
      Priority: P1
      Deps: TASK-011
      Exit: Newly added or expanded lessons in Modules 2, 6, 7, 9, and 12 have valid `leadershipNote` and/or `toolingLab` entries where needed

- [x] [frontend] [P] TASK-013: Add enhancement entries for specialization-module lessons
      Agent: frontend
      Priority: P1
      Deps: TASK-011
      Exit: Specialization-module lessons render meaningful deep/executive-mode supplements without missing enhancement keys

---

## Phase 5: Supporting Templates and Artifact Paths

- [x] [any] [P] TASK-014: Identify which new lessons need reusable templates
      Agent: any
      Priority: P1
      Deps: TASK-010
      Exit: A concrete list exists of new lessons that require `docs/templates/*` files rather than inline-only lesson content

- [x] [any] [P] TASK-015: Create missing templates referenced by new lessons
      Agent: any
      Priority: P1
      Deps: TASK-014
      Exit: All template-backed artifact paths referenced by new lesson `apply` or `meta.artifact` fields exist under `docs/templates/`

---

## Phase 6: Validation and QA

- [x] [any] [P] TASK-016: Validate runtime behavior with the inserted module
      Agent: any
      Priority: P0
      Deps: TASK-012, TASK-013, TASK-015
      Exit: Core navigation, bookmarks, progress tracking, and module/lesson counts behave correctly with the expanded curriculum

- [x] [any] [P] TASK-017: Validate rendering modes and artifact references
      Agent: any
      Priority: P0
      Deps: TASK-012, TASK-013, TASK-015
      Exit: New lessons render correctly in fast, deep, and executive modes, and all referenced artifact/template paths are valid

---

```markdown
📋 PM BREAKDOWN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:           AI-Native Mobile Curriculum Expansion
Total Phases:      6
Total Tasks:       17
Parallel Tasks:    9 (4 waves of max 3)
Sequential Tasks:  8
Tasks Location:    docs/tasks/ai-native-mobile-lessons-tasks.md
Status:            ✅ Ready for the AI Development Factory queue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

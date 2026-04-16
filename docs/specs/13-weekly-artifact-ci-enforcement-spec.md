# Weekly Artifact CI Enforcement — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (capstone weekly artifact system)
- `docs/templates/assessment-rubric-operations.md`

---

## Overview

The curriculum prescribes a weekly artifact system (decision memo, working build, eval report, retrospective per week) but there is no enforcement. This spec defines a GitHub Actions workflow that runs on push to a learner's repo and fails the build if the week's artifact set is incomplete. It transforms the "GitHub commits ARE the certification" principle from aspirational to accountable.

---

## Actors

- **AI PM Course Learner**: Pushes weekly artifacts to their capstone repo
- **Course Author (Beshoy)**: Publishes the reusable workflow as a GitHub Action
- **Course Application**: References the workflow in setup instructions

---

## Current State

- The curriculum mandates a weekly artifact set but never enforces it
- Learners can complete lessons without producing artifacts
- No automated CI check exists
- Capstone grading assumes artifacts exist but cannot verify

---

## In Scope

- A reusable GitHub Actions workflow `weekly-artifact-check.yml`
- A spec for the required artifact file shape and paths
- A verifier script that parses the repo and asserts minimum artifact completeness per module
- Two enforcement modes: advisory (warn) and strict (fail)

## Out of Scope

- Content-quality grading (handled by the adversarial cohort simulator)
- GitLab, Bitbucket, or other providers (GitHub first)
- Cloud-hosted CI beyond GitHub Actions

---

## User Stories

### US-001: Publish a Reusable GitHub Actions Workflow

**As a** course author,
**I want to** publish a reusable Actions workflow,
**so that** any learner can copy it into their repo with a single include.

**Acceptance Criteria:**
- [ ] AC-001: Workflow file `weekly-artifact-check.yml` exists in `docs/ci/`
- [ ] AC-002: Workflow runs on push and pull_request
- [ ] AC-003: Workflow invokes a verifier script that reads a configurable manifest
- [ ] AC-004: Error state — If the manifest is missing, the workflow fails with a clear setup message

**Priority**: P0 | **Dependencies**: None

---

### US-002: Verify Weekly Artifact Completeness

**As a** learner,
**I want to** have each push verified against a weekly artifact manifest,
**so that** missing artifacts block merges to main.

**Acceptance Criteria:**
- [ ] AC-001: Verifier checks for: decision memo, working build file or folder, eval report, retrospective
- [ ] AC-002: Verifier respects a manifest that maps module week to required artifact paths
- [ ] AC-003: Verifier supports both advisory and strict mode via env var
- [ ] AC-004: Error state — If any required artifact is missing and mode is strict, the job fails with per-artifact diagnostics

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Document Setup in the Course

**As a** learner,
**I want to** follow clear instructions to enable the CI,
**so that** I can adopt it without debugging infrastructure.

**Acceptance Criteria:**
- [ ] AC-001: Course docs include a one-page setup guide
- [ ] AC-002: Setup guide explains how to switch from advisory to strict mode
- [ ] AC-003: Error state — If setup fails at the first push, diagnostics name the missing step

**Priority**: P1 | **Dependencies**: US-002

---

## Affected Files

- `docs/ci/weekly-artifact-check.yml` (new)
- `docs/ci/verify-artifacts.js` (new)
- `docs/ci/artifact-manifest.example.json` (new)
- `docs/templates/weekly-artifact-setup-guide.md` (new)

---

## Non-Functional Requirements

- **Fail-soft default**: Advisory mode must be the default to avoid learner dropout
- **Portability**: Must run on ubuntu-latest with no external dependencies
- **Maintainability**: Manifest schema must be versioned

---

## Risks and Unknowns

- Strict mode risks high dropout if enabled too early — advisory-first is mandatory
- Some learners won't use GitHub — document fallback manual self-check

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Weekly Artifact CI Enforcement
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/13-weekly-artifact-ci-enforcement-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the workflow, verifier, and manifest schema.

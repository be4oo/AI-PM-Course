# Freshness Score & Course Changelog — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (lesson meta with `lastVerified`)
- `docs/course-audit.md`
- `docs/master-audit-and-implementation-log.md`

---

## Overview

The entire AI field has a half-life of roughly 6 months. The course already has `lastVerified` metadata on some lessons but no aggregate freshness view. This spec adds a per-lesson Freshness Score, a top-nav Changelog view, an automated weekly freshness sweep, and an optional RSS feed for alumni. This is what turns the course from a one-time purchase into an ongoing credibility guarantee.

---

## Actors

- **AI PM Course Learner**: Wants to know what is current and what is stale
- **Course Alumni**: Want to stay current after completing the course
- **Course Author (Beshoy)**: Owns freshness reviews and the changelog
- **Course Application**: Renders freshness scores, changelog, and the RSS feed

---

## Current State

- `lastVerified` exists on some lesson metadata but not all
- No aggregate freshness view exists
- No changelog tracks updates over time
- No alumni notification channel exists
- Audit docs reference freshness as a backlog item but nothing ships it

---

## In Scope

- A Freshness Score computed per lesson from `lastVerified` and `freshnessWindow`
- A top-nav `/changelog` view that lists updates by date, module, and reason
- A weekly automated sweep that flags any lesson older than thresholds
- A basic RSS feed of course updates for alumni
- A `lastVerified` completeness audit and remediation pass

## Out of Scope

- Paid subscription for alumni notifications
- Push notifications or email (RSS only in v1)
- Auto-rewriting stale content — only flagging

---

## User Stories

### US-001: Per-Lesson Freshness Score

**As a** learner,
**I want to** see a freshness score on every lesson,
**so that** I know whether the content is still current.

**Acceptance Criteria:**
- [ ] AC-001: Every lesson renders a freshness badge (green < 90 days, yellow 90–180 days, red > 180 days)
- [ ] AC-002: The badge is computed from `lastVerified` against today's date, using a per-lesson `freshnessWindow` when present
- [ ] AC-003: Lessons without `lastVerified` render an explicit "unverified" badge
- [ ] AC-004: Error state — If `lastVerified` is malformed, the badge shows "invalid date" and logs a warning

**Priority**: P0 | **Dependencies**: None

---

### US-002: Course Changelog View

**As a** learner or alumnus,
**I want to** view a timeline of course updates,
**so that** I can see what changed and why.

**Acceptance Criteria:**
- [ ] AC-001: A `/changelog` route renders entries sorted by date descending
- [ ] AC-002: Each entry lists date, module, lesson, change type (content, metadata, freshness re-verify), and short reason
- [ ] AC-003: Entries are loaded from `src/data/changelog.js`
- [ ] AC-004: Error state — If the changelog file is missing, the view renders a graceful placeholder

**Priority**: P0 | **Dependencies**: None

---

### US-003: Weekly Automated Freshness Sweep

**As a** course author,
**I want to** automate a weekly freshness sweep,
**so that** stale lessons are surfaced in a predictable cadence.

**Acceptance Criteria:**
- [ ] AC-001: A script under `scripts/freshness-sweep.js` reads the curriculum and outputs a report of lessons exceeding configured thresholds
- [ ] AC-002: The sweep runs as a GitHub Actions weekly scheduled job
- [ ] AC-003: The output is committed to `docs/freshness-report.md` with timestamp
- [ ] AC-004: Error state — If the sweep fails, the job exits non-zero with diagnostic output

**Priority**: P1 | **Dependencies**: US-001

---

### US-004: RSS Feed for Alumni

**As an** alumnus,
**I want to** subscribe to an RSS feed of course updates,
**so that** I stay current after completing the course.

**Acceptance Criteria:**
- [ ] AC-001: An `rss.xml` endpoint or static file is generated from changelog entries
- [ ] AC-002: Each RSS item includes title, date, module, summary, and link
- [ ] AC-003: The feed updates automatically when the changelog updates
- [ ] AC-004: Error state — If generation fails, the previous feed is preserved rather than overwritten empty

**Priority**: P2 | **Dependencies**: US-002

---

### US-005: `lastVerified` Completeness Audit

**As a** course author,
**I want to** audit the curriculum for missing or stale `lastVerified` fields,
**so that** the freshness system has complete data to work with.

**Acceptance Criteria:**
- [ ] AC-001: A one-time audit identifies all lessons missing `lastVerified`
- [ ] AC-002: All missing fields are populated in a single commit with today's date and a "baseline verify" note
- [ ] AC-003: A CI check fails the build if any future lesson is committed without `lastVerified`
- [ ] AC-004: Error state — If CI cannot parse a lesson, it fails with a path-specific error message

**Priority**: P0 | **Dependencies**: US-001

---

## Affected Files

- `src/data/changelog.js` (new)
- `src/components/FreshnessBadge.jsx` (new)
- `src/components/ChangelogView.jsx` (new)
- `src/utils/freshness.js` (new)
- `src/utils/freshness.test.js` (new)
- `scripts/freshness-sweep.js` (new)
- `scripts/generate-rss.js` (new)
- `docs/ci/freshness-check.yml` (new)
- `docs/freshness-report.md` (generated)
- `src/data/curriculum.js` (add missing `lastVerified` fields)

---

## Non-Functional Requirements

- **Performance**: Freshness computation must be O(1) per lesson at render time
- **Determinism**: Badge color thresholds must be centralized and tunable
- **Maintainability**: Changelog entries must follow a consistent schema
- **Accessibility**: Badges must use text, not color alone

---

## Risks and Unknowns

- Lesson-level `lastVerified` may be gamed by bulk-updating without real review — require a "verify reason" on each update
- RSS adoption by alumni may be low — ship it anyway as a low-effort addition

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Freshness Score & Course Changelog
User Stories:      5
Acceptance Tests:  19
Out of Scope:      3 items
Spec Location:     docs/specs/20-freshness-score-changelog-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to sequence the audit, badge, changelog, sweep, and RSS work.

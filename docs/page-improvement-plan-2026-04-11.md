# Page Improvement Plan

Last updated: April 11, 2026

## Goal

Improve the course page so it teaches faster, feels more motivating, supports long-running learning journeys, and can evolve from a static GitHub Pages experience into a persistent product with user accounts and saved progress.

## 1) Immediate UX fixes

### Navigation flow
- Preserve reading position when learners jump between lessons from the sidebar or search.
- Keep explicit top-reset behavior only for `Next` and `Prev` progression buttons.
- Add a visible "Back to top of lesson" affordance instead of forcing every lesson jump to reset scroll.

### Runtime stability
- Audit deployed bundle mismatches and stale-cache issues after each Pages release.
- Add a lightweight release checklist to verify the latest deployed asset hash matches the current build.
- Ignore browser-extension `contentScript.js` errors when they are external to the app.

## 2) Best-practice learning improvements

### Make learning more flexible
- Add three study modes:
  - `Fast Track`: 10-15 minute lesson summaries + one key exercise
  - `Deep Work`: full lesson, quiz, tooling lab, artifact
  - `Executive Review`: leadership note + decision memo + governance checklist
- Add estimated duration per lesson and per exercise.
- Add "resume where I left off" and "continue streak" entry points.

### Improve motivation and retention
- Show module milestones and small wins more clearly.
- Add progress states beyond percentage:
  - `Read`
  - `Practiced`
  - `Artifact completed`
  - `Reviewed`
- Add end-of-module reflection prompts and visible capstone momentum.
- Add a "why this matters" box for each lesson tied to real leadership or shipping outcomes.

### Improve learning speed
- Use retrieval practice more intentionally:
  - short recap cards
  - pre-quiz and post-quiz loops
  - spaced review queue for weak lessons
- Add worked examples before blank templates.
- Add "common mistakes" and "red flags" blocks inside the hardest lessons.
- Link each lesson to one concrete artifact so learners always know what they are producing.

## 3) Course structure improvements

### Strengthen the lesson frame
Each lesson should consistently contain:
- concept/core explanation
- key takeaways
- leadership note
- tooling lab
- applied exercise
- artifact target
- review question

### Strengthen motivation design
- Add module opening pages with:
  - what learners will be able to do
  - what artifact they will produce
  - why the module matters in real organizations
- Add module closing pages with:
  - progress summary
  - artifact checklist
  - "ready for next module?" gate

## 4) Product roadmap for persistence

### Phase 1: better local persistence
- Keep browser/local persistence but make it more explicit and reliable.
- Add export/import of learner progress JSON.
- Add artifact checklist state per lesson.

### Phase 2: login and cloud persistence
- Add authentication so learners can save progress across devices.
- Store:
  - current lesson
  - completed lessons
  - quiz states
  - review evidence
  - cohort notes
  - capstone readiness
  - artifact links

### Phase 3: database-backed learning product
- Add a backend and database for:
  - users
  - cohorts
  - progress records
  - artifact submissions
  - evaluator comments
  - review history
- Candidate stack:
  - `Supabase` for auth + Postgres + storage
  - or `Firebase` for faster auth-first rollout
  - or custom backend if later enterprise multi-tenant support is needed

## 5) Recommended login/database design

### What to save
- user profile
- role (`learner`, `reviewer`, `admin`)
- current module/lesson
- completion status
- notes and evidence
- capstone milestone state
- artifact URLs
- review history

### Suggested schema
- `users`
- `progress`
- `lesson_states`
- `artifacts`
- `reviews`
- `cohort_memberships`
- `capstone_submissions`

### Why this matters
- saves progress across devices
- enables real cohort support
- supports instructor/reviewer workflows
- turns the course from static content into a true learning product

## 6) Best-practice pedagogy to add next

- spaced repetition for key concepts
- mastery-based progression instead of read-only progression
- worked examples before open-ended assignments
- multiple representations of the same idea:
  - concept note
  - diagram
  - checklist
  - applied artifact
- immediate feedback loops on quizzes and labs
- visible relevance to real job-to-be-done outcomes

## 7) Prioritized implementation backlog

### Now
- Fix lesson-jump scroll behavior
- Add lesson duration and study modes
- Add stronger progress states per lesson
- Add "why this matters" blocks where missing

### Next
- Add export/import progress
- Add module intro/outro cards
- Add spaced review queue
- Add artifact completion tracker

### Later
- Add login with Supabase auth
- Add Postgres-backed progress and artifact records
- Add reviewer dashboard and cohort workflows
- Add instructor/admin analytics

## 8) Recommendation

The best next product step is:
- keep GitHub Pages for fast public delivery
- design the UI and state model now as if login/database are coming
- then move to `Supabase + auth + Postgres` when you want cross-device persistence and real cohort operations

That gives the fastest path from strong static course to serious learning platform without overbuilding too early.

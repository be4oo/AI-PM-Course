# Course Audit

## Audit objective

Evaluate the current project against the public positioning of the Product Faculty / Maven AI Product Management Certification, then improve the repo so it delivers a stronger self-serve learning experience.

Audit date: April 11, 2026

## Target benchmark used

- Product Faculty course page: https://www.productfaculty.com/ai-certification-v3
- Maven course page: https://maven.com/product-faculty/ai-product-management-certification

Public pages indicated:

- 12 live sessions
- 19 lessons
- emphasis on AI paradigm shift, AI product stack, building AI products, and capstone work
- hands-on learning, case studies, and real-world application

## Current project strengths

- Strong applied orientation with exercises that push learners to produce artifacts
- Better-than-average practical depth on evals, guardrails, RAG, tools, and observability
- Useful Arabic and MENA-specific product management considerations
- Capstone framing is stronger than most course clones because it expects real deliverables
- Glossary, cheat sheets, and tool references already exist

## Gaps found before improvement

1. Product credibility gap
- The repo still used the default Vite README, which weakened trust immediately.

2. Benchmark transparency gap
- The app did not clearly state how it maps to the target certification or what it improves beyond it.

3. Source transparency gap
- Learners could not easily see what was benchmarked, when it was verified, or which sources informed the course.

4. Learning scaffolding gap
- The content was rich, but the product experience behaved like a long content viewer rather than a guided certification-style program.

5. Artifact system visibility gap
- The course talks about shipping artifacts, but the app did not foreground the artifact system as a central learning mechanic.

6. Technical maintainability gap
- Nearly the entire course product lives in one large `src/App.jsx` file, which makes future curriculum updates slower and riskier.

## Improvement standard

To be "same and better" than the target public experience, this project should:

- cover the core strategic and technical domains a modern AI PM needs
- preserve a clear capstone and delivery orientation
- include more explicit operational knowledge for 2026 AI product work
- make auditability and source freshness visible
- help learners produce reusable portfolio artifacts, not just consume lessons

## Improvements implemented

1. Repo trust upgrade
- Replaced the default README with project-specific documentation.

2. Audit artifact
- Added this audit document so the benchmark and improvement logic live in the repo.

3. In-product benchmark visibility
- Added an audit view summarizing how the course compares with the target certification.

4. In-product source transparency
- Added a sources view so learners can inspect benchmark references and current knowledge areas.

5. Stronger certification-style scaffolding
- Added explicit experience pillars and artifact tracks in the product UI.

## Recommended next upgrades

1. Break `src/App.jsx` into:
- curriculum data
- shared renderers
- top-level views
- progress helpers

2. Add downloadable templates for:
- AI PRD
- eval rubric
- rollout checklist
- responsible AI audit
- capstone scorecard

3. Add lesson-level source arrays consistently
- especially for model guidance, governance, and tooling references that can change over time

4. Add a capstone dashboard
- milestone checklist
- artifact completeness
- launch readiness score

5. Add assessment depth
- scenario-based quizzes
- rubric-scored submissions
- comparative case reviews

## Bottom line

The project already had unusually strong substance. The main problem was not lack of knowledge density, but lack of product framing, source transparency, and guided-learning scaffolding. The changes in this pass move it much closer to a credible, benchmarked, self-serve AI PM certification experience.

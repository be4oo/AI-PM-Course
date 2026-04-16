# Assessment Rubric Operations Template (AI PM Course)

## 1) Assessment Metadata
- Week:
- Module:
- Team/Learner:
- Assessor:
- Date (YYYY-MM-DD):
- Artifact set reviewed:
- Review mode: `manual | adversarial-simulator`
- Reviewer persona:
- Context key: `lesson-id | capstone-milestone | general`

## 2) Required Artifacts (Hard Requirement)
- [ ] Decision memo
- [ ] Working build or prototype
- [ ] Evaluation report
- [ ] Eval-debt audit (post-launch or quarterly)
- [ ] Kill-criteria register
- [ ] Prompt registry + change log
- [ ] Cost attribution dashboard (feature or tenant)
- [ ] Red team result
- [ ] Demo and release note
- [ ] Retrospective

If any box is unchecked, overall result is `Fail (incomplete evidence)`.

## 3) Scoring Rubric (0-4 per dimension)
- 0 = Missing
- 1 = Weak
- 2 = Basic
- 3 = Strong
- 4 = Exceptional

### Dimension A: Problem Framing and Value
- Score:
- Machine key: `problemFraming`
- Evidence:
- Notes:

### Dimension B: AI System Design and Grounding
- Score:
- Machine key: `systemDesign`
- Evidence:
- Notes:

### Dimension C: Trust UX and HITL Design
- Score:
- Machine key: `trustDesign`
- Evidence:
- Notes:

### Dimension D: Evaluation Quality
- Score:
- Machine key: `evaluationQuality`
- Evidence:
- Notes:

### Dimension E: Safety and Risk Controls
- Score:
- Machine key: `safetyControls`
- Evidence:
- Notes:

### Dimension F: Operational Readiness
- Score:
- Machine key: `operationalReadiness`
- Evidence:
- Notes:

## 4) Gate Rules
- Gate 1 (Minimum Quality):
- Pass criteria: no dimension below 2.
- Result: Pass / Fail

- Gate 2 (Safety Threshold):
- Pass criteria: Dimension E is 3 or higher.
- Result: Pass / Fail

- Gate 3 (Evaluation Threshold):
- Pass criteria: Dimension D is 3 or higher with reproducible evidence.
- Result: Pass / Fail

- Gate 4 (Operational Threshold):
- Pass criteria: Dimension F is 3 or higher with rollback, monitoring, and explicit kill-criteria ownership.
- Result: Pass / Fail

## 5) Outcome Logic
- If any gate fails: `Fail`
- If all gates pass and average score < 3.0: `Conditional Pass`
- If all gates pass and average score >= 3.0: `Pass`

- Average score:
- Final result: Pass / Conditional Pass / Fail

## 6) Required Feedback Output
- Output mode:
- Summary:
- Top 3 strengths:
1.
2.
3.

- Top 3 gaps:
1.
2.
3.

- Required actions before next milestone:
1. Action:
- Owner:
- Due date:
- Evidence expected:

2. Action:
- Owner:
- Due date:
- Evidence expected:

3. Action:
- Owner:
- Due date:
- Evidence expected:

## 7) Structured Export Contract
- Status: `complete | error`
- Error code:
- Error remediation:
- Scores object:
```json
{
  "problemFraming": 0,
  "systemDesign": 0,
  "trustDesign": 0,
  "evaluationQuality": 0,
  "safetyControls": 0,
  "operationalReadiness": 0
}
```
- Required actions object:
```json
[
  {
    "action": "Add missing evidence",
    "owner": "Learner",
    "evidence": "Updated eval report or design note"
  }
]
```

## 8) Assessor Sign-off
- Assessor name:
- Role:
- Signature/Approval:

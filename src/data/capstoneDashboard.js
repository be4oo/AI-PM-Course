export const CAPSTONE_MILESTONES = [
  {
    id: "problem-brief",
    title: "Problem brief and ROI memo",
    description: "AI-shaped problem selected, quantified, and approved.",
    weight: 10,
  },
  {
    id: "solution-architecture",
    title: "System architecture and model routing",
    description: "Context, tools, memory, and model strategy documented.",
    weight: 15,
  },
  {
    id: "working-build",
    title: "Working AI workflow",
    description: "Core build is functional with reproducible demo flow.",
    weight: 20,
  },
  {
    id: "eval-suite",
    title: "Evaluation suite baseline",
    description: "Golden set + LLM judge/human checks + regression protocol + eval-debt maintenance audit.",
    weight: 20,
  },
  {
    id: "guardrails-observability",
    title: "Guardrails and observability",
    description: "Safety controls and trace/metrics instrumentation configured.",
    weight: 15,
  },
  {
    id: "launch-readiness",
    title: "Rollout and launch readiness",
    description: "Rollout checklist, failure modes, incident plan, and kill-criteria register complete.",
    weight: 10,
  },
  {
    id: "final-demo",
    title: "Final demo and decision memo",
    description: "Demo artifact, retrospective, failure debrief, and go/no-go decision submitted.",
    weight: 10,
  },
];

export const CAPSTONE_READINESS_BANDS = [
  { min: 90, label: "Launch Ready", color: "#00E676" },
  { min: 75, label: "Pilot Ready", color: "#12C48B" },
  { min: 60, label: "Needs Hardening", color: "#FFB800" },
  { min: 0, label: "Not Ready", color: "#FF6B35" },
];

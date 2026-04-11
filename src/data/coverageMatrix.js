export const COVERAGE_STATUS = {
  covered: "covered",
  partial: "partial",
  missing: "missing",
};

export const COVERAGE_MATRIX = [
  {
    area: "Live model/tool freshness layer",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Curriculum Operations Lead",
    cadence: "monthly",
    verificationMethod: "baseline_refresh_checklist",
    notes:
      "Tracked through the live baseline data model with explicit source and check definitions.",
  },
  {
    area: "Weekly critique pressure loop",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Program Lead",
    cadence: "weekly",
    verificationMethod: "weekly_gate_completion_rate",
    notes:
      "Design review, red-team, demo, and release-note cadence are formalized as required steps.",
  },
  {
    area: "Lesson metadata consistency",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Curriculum Editor",
    cadence: "per_lesson_update",
    verificationMethod: "metadata_schema_validation",
    notes:
      "Standards and required fields are documented in metadata standards for uniform lesson quality.",
  },
  {
    area: "Live-course experience parity",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Program Lead",
    cadence: "weekly",
    verificationMethod: "cohort_engagement_and_feedback_metrics",
    notes:
      "In-product cohort simulation and required weekly critique loops are implemented; live cohort facilitation can layer on top.",
  },
  {
    area: "Arabic AI systems depth",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Localization PM",
    cadence: "monthly",
    verificationMethod: "arabic_eval_benchmark_review",
    notes:
      "Curriculum modernization includes Arabic token economics, chunking, reranking, and localization checks.",
  },
  {
    area: "Evaluation and observability modernization",
    status: COVERAGE_STATUS.covered,
    ownerRole: "Evaluation Lead",
    cadence: "weekly",
    verificationMethod: "eval_pipeline_and_trace_audit",
    notes:
      "Deterministic checks, LLM-as-judge, red-team practice, and production tracing are expected baseline.",
  },
];

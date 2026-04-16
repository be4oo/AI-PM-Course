import { LESSON_METADATA_STANDARDS } from "./metadataStandards.js";

const SOURCE_PRESETS = {
  concept: ["Official product/vendor docs", "Peer benchmark or case study"],
  framework: ["Primary framework reference", "Applied implementation guide"],
  technical: ["Official technical documentation", "Recent technical benchmark"],
  systems: ["Operations/architecture reference", "Reliability or governance standard"],
};

const RUBRIC_PRESETS = {
  concept: ["Correct framing", "Business relevance", "Decision clarity"],
  framework: ["Framework correctness", "Applicability", "Actionability"],
  technical: ["Technical correctness", "Tradeoff quality", "Production readiness"],
  systems: ["System completeness", "Risk coverage", "Operational clarity"],
};

const FAILURE_MODE_PRESETS = {
  concept: ["Vague definition with no decision impact", "No measurable success criteria"],
  framework: ["Checklist usage without contextual adaptation", "No explicit tradeoffs"],
  technical: ["Model/tool choice without cost-quality rationale", "No eval or fallback plan"],
  systems: ["No owner/cadence for operations", "No incident or rollback pathway"],
};

const RED_TEAM_PRESETS = {
  concept: ["Challenge assumptions with an opposing PM memo"],
  framework: ["Test the framework on a high-risk edge case"],
  technical: ["Run prompt injection and bad-input scenarios"],
  systems: ["Simulate incident response with missing dependency/tool outage"],
};

function titleToSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function buildLessonMetadata({ lesson, moduleTitle, benchmarkDate }) {
  const lessonType = lesson.type || "framework";
  const generated = {
    sources: SOURCE_PRESETS[lessonType] || SOURCE_PRESETS.framework,
    lastVerified: benchmarkDate,
    artifact: `/docs/artifacts/module-${lesson.id}-${titleToSlug(lesson.title)}.md`,
    rubric:
      RUBRIC_PRESETS[lessonType] ||
      LESSON_METADATA_STANDARDS.artifactStandards.requiredArtifactTypes,
    failureModes: FAILURE_MODE_PRESETS[lessonType] || FAILURE_MODE_PRESETS.framework,
    redTeam: RED_TEAM_PRESETS[lessonType] || RED_TEAM_PRESETS.framework,
    moduleContext: moduleTitle,
  };

  return {
    ...generated,
    ...(lesson.meta || {}),
  };
}

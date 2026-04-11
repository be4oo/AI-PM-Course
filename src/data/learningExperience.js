export const STUDY_MODES = {
  fast: {
    id: "fast",
    label: "Fast Track",
    description: "10-15 min summary with one key exercise.",
  },
  deep: {
    id: "deep",
    label: "Deep Work",
    description: "Full lesson, quiz, tooling lab, and artifact output.",
  },
  executive: {
    id: "executive",
    label: "Executive Review",
    description: "Leadership lens, decision memo, and governance checks.",
  },
};

export const LESSON_PROGRESS_STATES = ["Unread", "Read", "Practiced", "Artifact completed", "Reviewed"];
export const PROGRESS_SCHEMA_VERSION = 2;

const FALLBACK_DURATION_MIN = {
  framework: 14,
  strategy: 13,
  system: 15,
  practice: 18,
  checklist: 10,
  sprint: 20,
  architecture: 17,
  playbook: 15,
  ops: 12,
  lab: 20,
};

const FALLBACK_EXERCISE_MIN = {
  framework: 12,
  strategy: 10,
  system: 15,
  practice: 18,
  checklist: 8,
  sprint: 25,
  architecture: 20,
  playbook: 14,
  ops: 12,
  lab: 25,
};

const FRAME_MINIMUMS = {
  concept: "Clarify the core concept and intended outcome before execution.",
  takeaways: ["One key idea", "One operational decision", "One risk to monitor"],
  leadershipNote: "Tie this lesson to an executive decision and operating model implication.",
  toolingLab: {
    title: "Tooling Lab",
    tools: ["Promptfoo", "Langfuse"],
    steps: ["Define baseline behavior", "Capture evidence", "Record follow-up actions"],
    artifactPath: "/docs/develop/optimization-log.md",
  },
  reviewQuestion: "What decision would change if this lesson failed in production?",
};

export function lessonRuntimeEstimate(lesson) {
  const typeKey = (lesson.type || "").toLowerCase();
  const readMin = lesson.meta?.durationMin || FALLBACK_DURATION_MIN[typeKey] || 12;
  const exerciseMin = lesson.meta?.exerciseMin || (lesson.apply ? (FALLBACK_EXERCISE_MIN[typeKey] || 12) : 0);
  return {
    readMin,
    exerciseMin,
    totalMin: readMin + exerciseMin,
  };
}

export function buildWhyThisMatters(moduleTitle, lesson) {
  if (lesson.meta?.whyThisMatters) return lesson.meta.whyThisMatters;
  return `This lesson sharpens leadership judgment in ${moduleTitle}: better scope choices, clearer risk controls, and faster AI product execution.`;
}

export function buildWorkedExample(lesson) {
  if (lesson.meta?.workedExample) return lesson.meta.workedExample;
  return {
    title: "Worked Example",
    bullets: [
      `Use ${lesson.title} to define one concrete success metric.`,
      "List one failure mode and one guardrail before implementation.",
      "Capture an artifact update that can be reviewed asynchronously.",
    ],
  };
}

export function buildRedFlags(lesson) {
  if (lesson.meta?.redFlags) return lesson.meta.redFlags;
  return [
    "Using generic prompts without structured outputs or evidence tracking.",
    "Declaring success without evaluation data or failure logs.",
    "Treating a single demo result as production readiness.",
  ];
}

export function ensureLessonFrame(moduleTitle, lesson, enhancement) {
  return {
    concept: lesson.content || FRAME_MINIMUMS.concept,
    takeaways: (lesson.keys && lesson.keys.length > 0) ? lesson.keys : FRAME_MINIMUMS.takeaways,
    leadershipNote: enhancement?.leadershipNote || FRAME_MINIMUMS.leadershipNote,
    toolingLab: enhancement?.toolingLab || FRAME_MINIMUMS.toolingLab,
    apply: lesson.apply || "Create one artifact update and attach proof of evaluation.",
    artifactTarget: lesson.meta?.artifact || enhancement?.toolingLab?.artifactPath || FRAME_MINIMUMS.toolingLab.artifactPath,
    reviewQuestion: lesson.quiz?.q || FRAME_MINIMUMS.reviewQuestion,
  };
}

export function defaultArtifactChecklist(frame) {
  return [
    { id: "artifact-created", label: "Artifact created", done: false },
    { id: "evidence-attached", label: "Evidence attached", done: false },
    { id: "review-ready", label: "Review-ready", done: false },
  ].map((item) => ({
    ...item,
    target: frame.artifactTarget,
  }));
}

export function computeStreak(activityLog) {
  const unique = new Set((activityLog || []).map((d) => d.slice(0, 10)));
  if (!unique.size) return 0;
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    if (unique.has(key)) streak += 1;
    else break;
  }
  return streak;
}

export function buildProgressSnapshot(payload) {
  return JSON.stringify({
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    ...payload,
  }, null, 2);
}

export function parseProgressSnapshot(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return { ok: false, reason: "Invalid JSON format." };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, reason: "Payload must be an object." };
  }
  if ((parsed.schemaVersion || 0) < 1) {
    return { ok: false, reason: "Missing or unsupported schema version." };
  }
  return { ok: true, data: parsed };
}

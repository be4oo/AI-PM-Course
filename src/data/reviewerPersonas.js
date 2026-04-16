export const REVIEW_DIMENSIONS = [
  { id: "problemFraming", label: "Problem Framing and Value", rubricKey: "A" },
  { id: "systemDesign", label: "AI System Design and Grounding", rubricKey: "B" },
  { id: "trustDesign", label: "Trust UX and HITL Design", rubricKey: "C" },
  { id: "evaluationQuality", label: "Evaluation Quality", rubricKey: "D" },
  { id: "safetyControls", label: "Safety and Risk Controls", rubricKey: "E" },
  { id: "operationalReadiness", label: "Operational Readiness", rubricKey: "F" },
];

export const REVIEWER_PERSONAS = [
  {
    id: "senior-ai-pm",
    name: "Senior AI PM",
    description: "Balanced launch-board reviewer who scores the artifact across all six rubric dimensions.",
    artifactTypes: ["prd", "memo", "design", "eval", "ops", "strategy"],
    default: true,
    systemPromptAnchor:
      "Review like a senior AI PM operating a release board. Stay evidence-bound, point to concrete missing proof, and avoid style-only feedback.",
    weights: {
      problemFraming: 1.15,
      systemDesign: 1.0,
      trustDesign: 1.0,
      evaluationQuality: 1.05,
      safetyControls: 0.95,
      operationalReadiness: 1.0,
    },
  },
  {
    id: "safety-reviewer",
    name: "Safety Reviewer",
    description: "Pressure-tests misuse risk, oversight design, escalation, and guardrail completeness.",
    artifactTypes: ["design", "prd", "ops", "memo"],
    systemPromptAnchor:
      "Review like a safety lead. Reward explicit misuse controls, escalation owners, and containment evidence. Penalize unsafe ambiguity.",
    weights: {
      problemFraming: 0.8,
      systemDesign: 0.95,
      trustDesign: 1.1,
      evaluationQuality: 0.9,
      safetyControls: 1.35,
      operationalReadiness: 0.9,
    },
  },
  {
    id: "eval-engineer",
    name: "Eval Engineer",
    description: "Biases toward dataset quality, judge reliability, and regression proof.",
    artifactTypes: ["eval", "prd", "ops"],
    systemPromptAnchor:
      "Review like an evaluation engineer. Demand measurable criteria, representative cases, failure slices, and reproducible evidence.",
    weights: {
      problemFraming: 0.85,
      systemDesign: 0.95,
      trustDesign: 0.8,
      evaluationQuality: 1.45,
      safetyControls: 0.85,
      operationalReadiness: 1.1,
    },
  },
  {
    id: "executive-sponsor",
    name: "Executive Sponsor",
    description: "Optimizes for business leverage, clarity of tradeoffs, and launch readiness.",
    artifactTypes: ["memo", "prd", "strategy", "ops"],
    systemPromptAnchor:
      "Review like an executive sponsor. Look for value clarity, tradeoff quality, accountable ownership, and operating evidence before scale.",
    weights: {
      problemFraming: 1.3,
      systemDesign: 0.85,
      trustDesign: 0.85,
      evaluationQuality: 0.9,
      safetyControls: 0.9,
      operationalReadiness: 1.2,
    },
  },
  {
    id: "red-team-attacker",
    name: "Red-Team Attacker",
    description: "Assumes the artifact will be attacked or misused and scores its resilience under adversarial pressure.",
    artifactTypes: ["design", "prd", "ops", "eval"],
    systemPromptAnchor:
      "Review like a red-team attacker. Focus on exploitability, ambiguity, hidden assumptions, and control failure under pressure.",
    weights: {
      problemFraming: 0.85,
      systemDesign: 1.05,
      trustDesign: 1.1,
      evaluationQuality: 1.0,
      safetyControls: 1.3,
      operationalReadiness: 0.9,
    },
  },
];

export const DEFAULT_REVIEWER_PERSONA_ID =
  REVIEWER_PERSONAS.find((persona) => persona.default)?.id || REVIEWER_PERSONAS[0].id;

export function getReviewerPersona(personaId) {
  return (
    REVIEWER_PERSONAS.find((persona) => persona.id === personaId) ||
    REVIEWER_PERSONAS.find((persona) => persona.id === DEFAULT_REVIEWER_PERSONA_ID)
  );
}

export function buildPersonaWeightRows(personaId) {
  const persona = getReviewerPersona(personaId);
  return REVIEW_DIMENSIONS.map((dimension) => ({
    ...dimension,
    weight: persona?.weights?.[dimension.id] ?? 1,
  }));
}

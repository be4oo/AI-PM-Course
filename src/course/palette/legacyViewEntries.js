/**
 * Legacy view entries — surfaced in the command palette ONLY behind the
 * `>` prefix (Plan R7, FR-027). Lives in its own file so React Fast
 * Refresh keeps CommandPalette.jsx as a component-only module.
 */

export const LEGACY_VIEW_ENTRIES = Object.freeze([
  Object.freeze({ viewId: "audit",       label: "Course audit",      hint: "benchmark vs reference course" }),
  Object.freeze({ viewId: "sources",     label: "Source library",    hint: "citations + verification notes" }),
  Object.freeze({ viewId: "changelog",   label: "Changelog",         hint: "what changed and when" }),
  Object.freeze({ viewId: "cohort",      label: "Cohort sim",        hint: "cohort review state" }),
  Object.freeze({ viewId: "coverage",    label: "Coverage matrix",   hint: "what each module covers" }),
  Object.freeze({ viewId: "community",   label: "Community ops",     hint: "facilitator + reviewer assignments" }),
  Object.freeze({ viewId: "live",        label: "Live baseline",     hint: "live data updates" }),
  Object.freeze({ viewId: "templates",   label: "Template downloads",hint: "PRD / rubric / checklist" }),
  Object.freeze({ viewId: "ops",         label: "Ops starter",       hint: "Promptfoo + Langfuse + freshness" }),
  Object.freeze({ viewId: "glossary",    label: "Glossary",          hint: "AI PM vocabulary" }),
  Object.freeze({ viewId: "cheatsheets", label: "Cheatsheets",       hint: "quick references" }),
  Object.freeze({ viewId: "tools",       label: "Tools lab",         hint: "all tools" }),
  Object.freeze({ viewId: "toolmap",     label: "Tool map",          hint: "tools by use case" }),
  Object.freeze({ viewId: "stack",       label: "Must-add tools",    hint: "starter stack" }),
  Object.freeze({ viewId: "exec",        label: "Executive track",   hint: "leadership material" }),
  Object.freeze({ viewId: "reviews",     label: "Review loop",       hint: "reviewer rubric" }),
  Object.freeze({ viewId: "roi",         label: "ROI calculator",    hint: "value model" }),
  Object.freeze({ viewId: "outline",     label: "Course outline",    hint: "full curriculum outline" }),
  Object.freeze({ viewId: "graph",       label: "Knowledge graph",   hint: "lesson concept graph" }),
]);

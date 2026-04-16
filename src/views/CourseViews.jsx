import { useState } from "react";
import {
  GLOSSARY,
  CHEATSHEETS,
  TOOLS,
  COURSE_BENCHMARK,
  EXPERIENCE_PILLARS,
  ARTIFACT_TRACKS,
  SOURCE_LIBRARY,
} from "../data/courseContent";
import { LIVE_BASELINE, LIVE_BASELINE_LAST_UPDATED } from "../data/liveBaseline";
import { REVIEW_SYSTEM } from "../data/reviewSystem";
import { COVERAGE_MATRIX, COVERAGE_STATUS } from "../data/coverageMatrix";
import { COMMUNITY_OPS } from "../data/communityOps";
import {
  CAPSTONE_MILESTONES,
  CAPSTONE_READINESS_BANDS,
} from "../data/capstoneDashboard";
import {
  TOOL_MAP_BY_LESSON,
  MUST_ADD_TOOLS,
  TOOLING_SELECTION_GUIDE,
} from "../data/toolingGuide";
import { EXECUTIVE_TRACK } from "../data/executiveTrack";

export function GlossaryView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#E040FB" }}>GLOSSARY</span>
          <span className="brand-title">AI PM Key Terms ({GLOSSARY.length})</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          {GLOSSARY.map((g, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border-light)", padding: "12px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{g.term}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{g.def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CheatsheetsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FFB800", color: "#2A1A00" }}>REFERENCE</span>
          <span className="brand-title">Cheat Sheets</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          {CHEATSHEETS.map((c, i) => (
            <div key={i} className="exercise-box" style={{ borderLeftColor: "#FFB800", marginBottom: 14 }}>
              <div className="exercise-title" style={{ color: "#FFB800" }}>{c.title}</div>
              {c.items.map((item, j) => (
                <div key={j} className="takeaway-item" style={{ marginBottom: 3 }}>
                  <span style={{ color: "#FFB800", fontSize: 12 }}>-</span>
                  <span style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00E676", color: "#002A12" }}>PRACTICE LAB</span>
          <span className="brand-title">Tools and Setup ({TOOLS.length})</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#00E676", marginBottom: 24 }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              All tools below are free or have free tiers. Each includes a specific practice exercise tied to course lessons.
            </p>
          </div>
          {TOOLS.map((t, i) => (
            <div key={i} className="exercise-box" style={{ borderLeftColor: t.free ? "#00E676" : "#FFB800", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{t.name}</span>
                <span className="tag-badge">{t.cat}</span>
                <span className="tag-badge" style={{ marginLeft: "auto", color: t.free ? "#00E676" : "#FFB800", borderColor: t.free ? "#00E67655" : "#FFB80055" }}>
                  {t.free ? "FREE" : "PAID"}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{t.desc}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                Setup: <code>{t.setup}</code>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Used in: {t.usedIn.join(" | ")}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t.practice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolMapView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#20C997", color: "#032219" }}>TOOL MAP</span>
          <span className="brand-title">Which tools belong in which lessons</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 960 }}>
          {TOOL_MAP_BY_LESSON.map((entry) => (
            <div key={entry.lessonId} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{entry.lessonId}</span>
                <span style={{ color: "var(--text-primary)" }}>{entry.lessonTitle}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Tools: {entry.tools.join(" | ")}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Why: {entry.why}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                How: {entry.how}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MustAddToolsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF7A59" }}>STACK</span>
          <span className="brand-title">Must-add AI PM tools</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 960 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#FF7A59", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#FF7A59" }}>Selection guide</div>
            {TOOLING_SELECTION_GUIDE.map((item) => (
              <div key={item} className="takeaway-item"><span>•</span><span>{item}</span></div>
            ))}
          </div>
          {MUST_ADD_TOOLS.map((tool) => (
            <div key={tool.name} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontWeight: 700 }}>{tool.name}</span>
                <span className="tag-badge">{tool.category}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Use case: {tool.useCase}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Why it matters: {tool.whyItMatters}
              </div>
              <a href={tool.source} target="_blank" rel="noreferrer" style={{ color: "#8FB9FF", fontSize: 12 }}>
                {tool.source}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExecutiveTrackView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#7A5CFF" }}>LEAD</span>
          <span className="brand-title">Executive and leadership track</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 960 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#7A5CFF", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#7A5CFF" }}>{EXECUTIVE_TRACK.title}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
              {EXECUTIVE_TRACK.audience}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {EXECUTIVE_TRACK.promise}
            </div>
          </div>
          {EXECUTIVE_TRACK.modules.map((module) => (
            <div key={module.title} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{module.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Lessons: {module.lessons.join(" | ")}
              </div>
              {module.outcomes.map((outcome) => (
                <div key={outcome} className="takeaway-item"><span>→</span><span>{outcome}</span></div>
              ))}
            </div>
          ))}
          <div className="exercise-box">
            <div className="exercise-title">Leadership questions this course should answer</div>
            {EXECUTIVE_TRACK.leadershipQuestions.map((question) => (
              <div key={question} className="takeaway-item"><span>•</span><span>{question}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuditView({ onBack, curriculumLength, totalLessons, totalExercises }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00C8FF", color: "#00141A" }}>COURSE AUDIT</span>
          <span className="brand-title">Benchmark, gaps, and upgrades</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#00C8FF", background: "#081015", borderColor: "#15303A", marginBottom: 24 }}>
            <div className="exercise-title" style={{ color: "#00C8FF" }}>TARGET</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{COURSE_BENCHMARK.target}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{COURSE_BENCHMARK.targetShape}</div>
          </div>

          <div className="takeaways-box" style={{ borderLeftColor: "#00E676", marginBottom: 12 }}>
            <div className="takeaways-title" style={{ color: "#00E676" }}>WHERE THIS COURSE MATCHES</div>
            {COURSE_BENCHMARK.matchPoints.map((item, i) => (
              <div key={i} className="takeaway-item"><span style={{ color: "#00E676" }}>+</span><span>{item}</span></div>
            ))}
          </div>

          <div className="takeaways-box" style={{ borderLeftColor: "#FFB800", marginBottom: 24 }}>
            <div className="takeaways-title" style={{ color: "#FFB800" }}>WHERE THIS COURSE GOES FURTHER</div>
            {COURSE_BENCHMARK.upgrades.map((item, i) => (
              <div key={i} className="takeaway-item"><span style={{ color: "#FFB800" }}>→</span><span>{item}</span></div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
            {[{ label: "MODULES", val: curriculumLength }, { label: "LESSONS", val: totalLessons }, { label: "APPLIED EXERCISES", val: totalExercises }, { label: "DELIVERABLE TRACKS", val: ARTIFACT_TRACKS.length }].map((s) => (
              <div key={s.label} style={{ border: "1px solid var(--border-light)", padding: "14px" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{s.val}</div>
              </div>
            ))}
          </div>

          <div className="takeaways-box" style={{ borderLeftColor: "#E040FB" }}>
            <div className="takeaways-title" style={{ color: "#E040FB" }}>LEARNING EXPERIENCE PILLARS</div>
            {EXPERIENCE_PILLARS.map((p) => (
              <div key={p.title} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SourcesView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF6B35" }}>SOURCE LIBRARY</span>
          <span className="brand-title">Verification and reference points</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          {SOURCE_LIBRARY.map((s) => (
            <div key={s.title} className="exercise-box" style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                <span className="tag-badge">{s.kind}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>verified {s.verified}</span>
              </div>
              <a href={s.url} target="_blank" rel="noreferrer" style={{ color: "#8FB9FF", fontSize: 12 }}>{s.url}</a>
              <div style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LiveView({ onBack, freshnessAudit }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#0099FF" }}>LIVE BASELINE</span>
          <span className="brand-title">Model and stack freshness queue</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 900 }}>
          <div className="exercise-box" style={{ borderLeftColor: freshnessAudit.isStale ? "#FF6B35" : "#00E676", marginBottom: 14 }}>
            <div className="exercise-title" style={{ color: freshnessAudit.isStale ? "#FF6B35" : "#00E676" }}>
              Freshness status: {freshnessAudit.isStale ? "STALE - UPDATE REQUIRED" : "CURRENT"}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
              Last updated: {LIVE_BASELINE_LAST_UPDATED} | Days since update: {freshnessAudit.daysSinceUpdate} | Refresh SLA: {freshnessAudit.slaDays} days
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 8 }}>
              Automation: run <code>npm run check:freshness</code> locally and use the scheduled workflow at <code>.github/workflows/freshness-check.yml</code>.
            </div>
          </div>
          {LIVE_BASELINE.tracks.map((t) => (
            <div key={t.id} className="exercise-box" style={{ marginBottom: 14 }}>
              <div className="exercise-title">{t.title}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 8 }}>
                Cadence: {t.cadence} | Owner: {t.ownerRole}
              </div>
              {(t.checks || []).map((c, i) => <div key={i} className="takeaway-item"><span>-</span><span>{c}</span></div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommunityOpsView({
  onBack,
  mod,
  communityConfig,
  setCommunityConfig,
  communityAssignments,
  setCommunityAssignments,
  onSave,
}) {
  const [saveText, setSaveText] = useState("SAVE PROGRESS");
  const handleSave = async () => {
    setSaveText("SAVING...");
    await onSave?.();
    setSaveText("✓ SAVED");
    setTimeout(() => setSaveText("SAVE PROGRESS"), 2000);
  };

  const setConfig = (key, value) =>
    setCommunityConfig((prev) => ({ ...prev, [key]: value }));
  const setAssignment = (ritualId, value) =>
    setCommunityAssignments((prev) => ({ ...prev, [ritualId]: value }));

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#2ED3B7", color: "#00231D" }}>COMMUNITY OPS</span>
          <span className="brand-title">External cohort operations board</span>
        </div>
        <div className="header-actions">
          <button className="btn-outline" onClick={handleSave} style={{ color: saveText.includes("✓") ? "#00E676" : "inherit" }}>{saveText}</button>
          <button className="btn-outline" onClick={onBack}>← BACK</button>
        </div>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 980 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#2ED3B7", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#2ED3B7" }}>Module context: {mod.module}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              This board is for real external cohort operations (links, ownership, and ritual outcomes), not only in-app simulation.
            </div>
          </div>

          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Integration links</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["cohortName", "Cohort name"],
                ["facilitator", "Facilitator"],
                ["communityUrl", "Community URL"],
                ["officeHoursUrl", "Office-hours URL"],
                ["demoDayUrl", "Demo-day URL"],
              ].map(([key, label]) => (
                <label key={key} style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                  {label}
                  <input
                    value={communityConfig[key] || ""}
                    onChange={(e) => setConfig(key, e.target.value)}
                    placeholder={`Add ${label.toLowerCase()}`}
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: 6,
                      padding: "8px 10px",
                      fontFamily: "inherit",
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Weekly rituals and assignments</div>
            {COMMUNITY_OPS.weeklyRituals.map((ritual) => (
              <div key={ritual.id} style={{ border: "1px solid var(--border-light)", padding: 10, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{ritual.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{ritual.outcome}</div>
                <input
                  value={communityAssignments[ritual.id] || ""}
                  onChange={(e) => setAssignment(ritual.id, e.target.value)}
                  placeholder="Owner + due date + artifact link"
                  style={{
                    width: "100%",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: 6,
                    padding: "8px 10px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="exercise-box">
            <div className="exercise-title">Required external integrations</div>
            {COMMUNITY_OPS.requiredIntegrations.map((item) => (
              <div key={item} className="takeaway-item"><span>-</span><span>{item}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateDownloadsView({ onBack }) {
  const templates = [
    { title: "AI PRD Template", file: "/templates/ai-prd-template.md" },
    { title: "Evaluation Rubric Template", file: "/templates/eval-rubric-template.md" },
    { title: "Rollout Checklist Template", file: "/templates/rollout-checklist-template.md" },
    { title: "Responsible AI Audit Template", file: "/templates/responsible-ai-audit-template.md" },
  ];
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#F5C542", color: "#2E2300" }}>TEMPLATES</span>
          <span className="brand-title">Downloadable implementation templates</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 760 }}>
          {templates.map((template) => (
            <div key={template.file} className="exercise-box" style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{template.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{template.file}</div>
              <a href={template.file} download className="btn-outline" style={{ display: "inline-block", textDecoration: "none" }}>
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OpsStarterView({ onBack }) {
  const commands = [
    "npm run check:freshness",
    "npm run eval:promptfoo",
    "npm run observability:langfuse:smoke",
  ];
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#8FB9FF", color: "#001B3D" }}>OPS STARTERS</span>
          <span className="brand-title">Promptfoo + Langfuse + freshness automation</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 900 }}>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Runnable commands</div>
            {commands.map((c) => (
              <div key={c} style={{ fontSize: 13, marginBottom: 6 }}><code>{c}</code></div>
            ))}
          </div>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Promptfoo starter</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/evals/promptfoo/promptfooconfig.yaml</code></div>
          </div>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Langfuse starter</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/observability/langfuse/README.md</code></div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/observability/langfuse/langfuse.env.example</code></div>
          </div>
          <div className="exercise-box">
            <div className="exercise-title">Freshness reminders</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/.github/workflows/freshness-check.yml</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CapstoneDashboardView({
  onBack,
  completed,
  totalLessons,
  moduleReadiness,
  capstoneChecks,
  setCapstoneChecks,
  capstoneNotes,
  setCapstoneNotes,
  onOpenSimulator,
  recentSimulatorEntries = [],
  onSave,
}) {
  const [saveText, setSaveText] = useState("SAVE PROGRESS");
  const handleSave = async () => {
    setSaveText("SAVING...");
    await onSave?.();
    setSaveText("✓ SAVED");
    setTimeout(() => setSaveText("SAVE PROGRESS"), 2000);
  };

  const milestoneScore = CAPSTONE_MILESTONES.reduce((sum, item) => sum + (capstoneChecks[item.id] ? item.weight : 0), 0);
  const weightedScore = Math.round(
    milestoneScore * 0.6 + moduleReadiness * 0.3 + Math.round((completed.size / totalLessons) * 100) * 0.1
  );
  const band =
    CAPSTONE_READINESS_BANDS.find((b) => weightedScore >= b.min) ||
    CAPSTONE_READINESS_BANDS[CAPSTONE_READINESS_BANDS.length - 1];

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00D2FF", color: "#00161D" }}>CAPSTONE</span>
          <span className="brand-title">Milestones and readiness scoring</span>
        </div>
        <div className="header-actions">
          <button className="btn-outline" onClick={() => onOpenSimulator?.("launch-readiness")} style={{ color: "#FFD6C7", borderColor: "#FF947044" }}>
            ADVERSARIAL REVIEW
          </button>
          <button className="btn-outline" onClick={handleSave} style={{ color: saveText.includes("✓") ? "#00E676" : "inherit" }}>{saveText}</button>
          <button className="btn-outline" onClick={onBack}>← BACK</button>
        </div>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 980 }}>
          <div className="exercise-box" style={{ borderLeftColor: band.color, marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: band.color }}>
              Readiness Score: {weightedScore}/100 ({band.label})
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Milestone completion: {milestoneScore}% | Module operations readiness: {moduleReadiness}%
            </div>
          </div>
          {CAPSTONE_MILESTONES.map((item) => (
            <div key={item.id} className="exercise-box" style={{ marginBottom: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <input
                  type="checkbox"
                  checked={!!capstoneChecks[item.id]}
                  onChange={() => setCapstoneChecks((p) => ({ ...p, [item.id]: !p[item.id] }))}
                />
                <span style={{ fontWeight: 700 }}>{item.title}</span>
                <span className="tag-badge" style={{ marginLeft: "auto" }}>{item.weight}%</span>
              </label>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.description}</div>
            </div>
          ))}
          <div className="exercise-box">
            <div className="exercise-title">Capstone reviewer notes</div>
            <textarea
              value={capstoneNotes}
              onChange={(e) => setCapstoneNotes(e.target.value)}
              placeholder="Capture launch blockers, risk notes, and sign-off decisions."
              style={{
                width: "100%",
                minHeight: 120,
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-light)",
                borderRadius: 6,
                padding: "10px 12px",
                fontFamily: "inherit",
                fontSize: 13,
              }}
            />
          </div>
          <div className="exercise-box" style={{ borderLeftColor: "#FF9470" }}>
            <div className="exercise-title" style={{ color: "#FF9470" }}>Adversarial cohort history</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
              Use the simulator before marking high-risk milestones complete. The first slice stores local review history so you can track repeat submissions over time.
            </div>
            {recentSimulatorEntries.length > 0 ? (
              recentSimulatorEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} style={{ borderTop: "1px solid var(--border-light)", paddingTop: 8, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 700 }}>
                    {entry.submission?.artifactTitle || "Untitled review"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {entry.result?.status === "complete" ? entry.result.summary : entry.result?.message}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                No capstone-facing adversarial reviews yet. Start with launch readiness or final demo evidence.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsView({
  onBack,
  mod,
  reviewChecks,
  setReviewChecks,
  reviewEvidence,
  setReviewEvidence,
  getReviewKey,
  isModuleReviewComplete,
  onOpenSimulator,
  recentSimulatorEntries = [],
  onSave,
}) {
  const [saveText, setSaveText] = useState("SAVE PROGRESS");
  const handleSave = async () => {
    setSaveText("SAVING...");
    await onSave?.();
    setSaveText("✓ SAVED");
    setTimeout(() => setSaveText("SAVE PROGRESS"), 2000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF3B5C" }}>REVIEW LOOP</span>
          <span className="brand-title">Weekly pressure and critique system</span>
        </div>
        <div className="header-actions">
          <button className="btn-outline" onClick={onOpenSimulator} style={{ color: "#FFD6C7", borderColor: "#FF947044" }}>ADVERSARIAL REVIEW</button>
          <button className="btn-outline" onClick={handleSave} style={{ color: saveText.includes("✓") ? "#00E676" : "inherit" }}>{saveText}</button>
          <button className="btn-outline" onClick={onBack}>← BACK</button>
        </div>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 900 }}>
          {REVIEW_SYSTEM.weeklyCadence.map((r) => {
            const reviewKey = getReviewKey(mod.id, r.stepId);
            return (
              <div key={r.stepId} className="exercise-box" style={{ marginBottom: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <input
                    type="checkbox"
                    checked={!!reviewChecks[reviewKey]}
                    onChange={() => setReviewChecks((p) => ({ ...p, [reviewKey]: !p[reviewKey] }))}
                  />
                  <span style={{ fontWeight: 700 }}>{r.title}</span>
                </label>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                  Required outputs: {r.requiredOutputs.join(" | ")}
                </div>
                <textarea
                  value={reviewEvidence[reviewKey] || ""}
                  onChange={(e) =>
                    setReviewEvidence((p) => ({ ...p, [reviewKey]: e.target.value }))
                  }
                  placeholder="Paste artifact links, notes, or reviewer comments as completion evidence."
                  style={{
                    width: "100%",
                    minHeight: 70,
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: 6,
                    padding: "8px 10px",
                    fontFamily: "inherit",
                    fontSize: 13,
                  }}
                />
              </div>
            );
          })}
          <div className="exercise-box" style={{ borderLeftColor: isModuleReviewComplete(mod.id) ? "#00E676" : "#FF3B5C" }}>
            <div className="exercise-title" style={{ color: isModuleReviewComplete(mod.id) ? "#00E676" : "#FF3B5C" }}>
              Module {mod.id} weekly loop status: {isModuleReviewComplete(mod.id) ? "COMPLETE" : "INCOMPLETE"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Completion requires both the checkbox and written evidence for each ritual.
            </div>
          </div>
          <div className="exercise-box">
            <div className="exercise-title">Template Pack</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              <div>/docs/templates/weekly-design-review.md</div>
              <div>/docs/templates/weekly-red-team.md</div>
              <div>/docs/templates/weekly-demo-release-note.md</div>
              <div>/docs/templates/assessment-rubric-operations.md</div>
            </div>
          </div>
          <div className="exercise-box" style={{ borderLeftColor: "#FF9470" }}>
            <div className="exercise-title" style={{ color: "#FF9470" }}>Recent adversarial reviews</div>
            {recentSimulatorEntries.length > 0 ? (
              recentSimulatorEntries.map((entry) => (
                <div key={entry.id} style={{ borderTop: "1px solid var(--border-light)", paddingTop: 8, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 700 }}>
                    {entry.submission?.artifactTitle || "Untitled review"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {entry.result?.status === "complete" ? entry.result.summary : entry.result?.message}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                No simulator runs yet. Use it when you want rubric-bound critique instead of just checklist completion evidence.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CohortView({
  onBack,
  mod,
  cohortChecks,
  setCohortChecks,
  cohortEvidence,
  setCohortEvidence,
  getCohortKey,
  isModuleCohortComplete,
  onSave,
}) {
  const [saveText, setSaveText] = useState("SAVE PROGRESS");
  const handleSave = async () => {
    setSaveText("SAVING...");
    await onSave?.();
    setSaveText("✓ SAVED");
    setTimeout(() => setSaveText("SAVE PROGRESS"), 2000);
  };

  const items = [
    { id: "peer-checkin", label: "Peer check-in completed (15 min async)." },
    { id: "office-hours", label: "Office-hours question posted with evidence links." },
    { id: "demo-feedback", label: "Demo feedback from at least one reviewer captured." },
  ];
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#7A5CFF" }}>COHORT SIM</span>
          <span className="brand-title">Accountability and live-context simulation</span>
        </div>
        <div className="header-actions">
          <button className="btn-outline" onClick={handleSave} style={{ color: saveText.includes("✓") ? "#00E676" : "inherit" }}>{saveText}</button>
          <button className="btn-outline" onClick={onBack}>← BACK</button>
        </div>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 900 }}>
          {items.map((it) => {
            const cohortKey = getCohortKey(mod.id, it.id);
            return (
              <div key={it.id} className="exercise-box" style={{ marginBottom: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <input
                    type="checkbox"
                    checked={!!cohortChecks[cohortKey]}
                    onChange={() =>
                      setCohortChecks((p) => ({ ...p, [cohortKey]: !p[cohortKey] }))
                    }
                  />
                  <span>{it.label}</span>
                </label>
                <textarea
                  value={cohortEvidence[cohortKey] || ""}
                  onChange={(e) =>
                    setCohortEvidence((p) => ({ ...p, [cohortKey]: e.target.value }))
                  }
                  placeholder="Add supporting evidence (links, comments, reviewer names)."
                  style={{
                    width: "100%",
                    minHeight: 60,
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: 6,
                    padding: "8px 10px",
                    fontFamily: "inherit",
                    fontSize: 13,
                  }}
                />
              </div>
            );
          })}
          <div className="exercise-box" style={{ borderLeftColor: isModuleCohortComplete(mod.id) ? "#00E676" : "#7A5CFF" }}>
            <div className="exercise-title" style={{ color: isModuleCohortComplete(mod.id) ? "#00E676" : "#7A5CFF" }}>
              Module {mod.id} cohort-context status: {isModuleCohortComplete(mod.id) ? "COMPLETE" : "INCOMPLETE"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoverageView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#12C48B", color: "#001910" }}>COVERAGE</span>
          <span className="brand-title">Recommendation completion tracker</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 980 }}>
          <table className="content-table">
            <thead>
              <tr><th>Recommendation</th><th>Status</th><th>Verification Note</th></tr>
            </thead>
            <tbody>
              {COVERAGE_MATRIX.map((r) => (
                <tr key={r.area}>
                  <td>{r.area}</td>
                  <td>
                    <span className="tag-badge" style={{ color: r.status === COVERAGE_STATUS.covered ? "#00E676" : r.status === COVERAGE_STATUS.partial ? "#FFB800" : "#FF6B35" }}>
                      {r.status}
                    </span>
                  </td>
                  <td>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OutlineView({ onBack, curriculum, isDone, goTo, completed, totalLessons, pct, mod }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: mod.accent }}>AI PM COURSE</span>
          <span className="brand-title">SYSTEMS NOTEBOOK</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="outline-container">
        {curriculum.map((m, mi) => (
          <div key={m.id} className="outline-module">
            <div className="outline-module-header" style={{ borderColor: `${m.accent}22` }}>
              <span className="outline-module-week" style={{ color: m.accent }}>{m.week} | {m.module}</span>
              <span className="outline-module-title">{m.title}</span>
              <span className="outline-tag" style={{ color: m.accent, borderColor: m.accent }}>{m.tag}</span>
            </div>
            {m.lessons.map((l, li) => (
              <button key={l.id} className="outline-btn" onClick={() => goTo(mi, li)} style={{ borderLeftColor: isDone(mi, li) ? m.accent : "var(--border-color)" }}>
                <div className="checkbox" style={{ borderColor: isDone(mi, li) ? m.accent : "var(--border-light)", background: isDone(mi, li) ? m.accent : "transparent" }}>
                  {isDone(mi, li) ? "✓" : ""}
                </div>
                <span className="outline-btn-title">{l.id} — {l.title}</span>
                <span className="outline-btn-type">{l.type.toUpperCase()}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="nav-stats" style={{ paddingBottom: 40 }}>
          <span>{completed.size}/{totalLessons} lessons complete</span><span>·</span><span>{pct}% progress</span><span>·</span><span>{curriculum.length} modules</span>
        </div>
      </div>
    </div>
  );
}

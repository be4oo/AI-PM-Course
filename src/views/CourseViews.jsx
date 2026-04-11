import {
  GLOSSARY,
  CHEATSHEETS,
  TOOLS,
  COURSE_BENCHMARK,
  EXPERIENCE_PILLARS,
  ARTIFACT_TRACKS,
  SOURCE_LIBRARY,
} from "../data/courseContent";
import { LIVE_BASELINE } from "../data/liveBaseline";
import { REVIEW_SYSTEM } from "../data/reviewSystem";
import { COVERAGE_MATRIX, COVERAGE_STATUS } from "../data/coverageMatrix";

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

export function LiveView({ onBack }) {
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

export function ReviewsView({
  onBack,
  mod,
  reviewChecks,
  setReviewChecks,
  reviewEvidence,
  setReviewEvidence,
  getReviewKey,
  isModuleReviewComplete,
}) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF3B5C" }}>REVIEW LOOP</span>
          <span className="brand-title">Weekly pressure and critique system</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
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
}) {
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
        <button className="btn-outline" onClick={onBack}>← BACK</button>
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

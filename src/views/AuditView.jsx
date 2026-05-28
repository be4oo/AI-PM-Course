import {
  ARTIFACT_TRACKS,
  COURSE_BENCHMARK,
  EXPERIENCE_PILLARS,
} from "../data/courseContent";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
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

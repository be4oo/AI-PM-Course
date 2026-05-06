import { useState } from "react";
import {
  CAPSTONE_MILESTONES,
  CAPSTONE_READINESS_BANDS,
} from "../data/capstoneDashboard";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(980) }}>
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
              aria-label="Capstone reviewer notes"
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

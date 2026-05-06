import { useState } from "react";
import { REVIEW_SYSTEM } from "../data/reviewSystem";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(900) }}>
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
                  aria-label={`${r.title} evidence`}
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

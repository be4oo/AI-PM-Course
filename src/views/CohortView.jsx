import { useState } from "react";
import { responsiveMaxWidth } from "./viewLayout";

const COHORT_ITEMS = [
  { id: "peer-checkin", label: "Peer check-in completed (15 min async)." },
  { id: "office-hours", label: "Office-hours question posted with evidence links." },
  { id: "demo-feedback", label: "Demo feedback from at least one reviewer captured." },
];

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(900) }}>
          {COHORT_ITEMS.map((it) => {
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
                  aria-label={`${it.label} evidence`}
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

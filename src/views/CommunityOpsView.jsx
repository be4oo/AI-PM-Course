import { useState } from "react";
import { COMMUNITY_OPS } from "../data/communityOps";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(980) }}>
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

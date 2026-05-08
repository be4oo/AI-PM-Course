import { LIVE_BASELINE, LIVE_BASELINE_LAST_UPDATED } from "../data/liveBaseline";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(900) }}>
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

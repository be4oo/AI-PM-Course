import { CHEATSHEETS } from "../data/courseContent";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
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

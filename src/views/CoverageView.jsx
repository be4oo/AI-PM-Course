import { COVERAGE_MATRIX, COVERAGE_STATUS } from "../data/coverageMatrix";
import { responsiveMaxWidth } from "./viewLayout";

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
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(980) }}>
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

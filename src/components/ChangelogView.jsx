import { useEffect, useState } from "react";
import { sortChangelogEntries } from "../utils/freshness";

export function ChangelogView({ onBack }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const response = await fetch("/changelog.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const parsed = await response.json();
        const rows = Array.isArray(parsed) ? parsed : [];
        if (!ignore) setEntries(sortChangelogEntries(rows));
      } catch {
        if (!ignore) setEntries([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00D2FF", color: "#00171D" }}>
            CHANGELOG
          </span>
          <span className="brand-title">Course updates and verification timeline</span>
        </div>
        <button className="btn-outline" onClick={onBack}>
          ← BACK
        </button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 940 }}>
          {!loading && entries.length === 0 ? (
            <div className="exercise-box" style={{ borderLeftColor: "#8FB9FF" }}>
              <div className="exercise-title" style={{ color: "#8FB9FF" }}>
                Changelog unavailable
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                No changelog feed is available right now. Add or restore <code>public/changelog.json</code> to publish updates.
              </div>
            </div>
          ) : null}
          {entries.map((entry) => (
            <div key={entry.id} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{entry.date}</span>
                <span className="tag-badge">{entry.changeType}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  {entry.module} · {entry.lesson}
                </span>
              </div>
              <div style={{ color: "var(--text-primary)", fontSize: 14, marginBottom: 4 }}>{entry.title}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>{entry.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

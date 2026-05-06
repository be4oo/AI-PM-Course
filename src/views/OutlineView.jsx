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

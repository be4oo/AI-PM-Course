/* AI PM Course — components */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─── Icons (inline SVG, mono stroke) ─── */
const Icon = ({ name, size = 14 }) => {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    search: <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
    bookmark: <svg viewBox="0 0 24 24" {...s}><path d="M6 4h12v17l-6-4-6 4z" /></svg>,
    bookmarkFill: <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.4"><path d="M6 4h12v17l-6-4-6 4z" /></svg>,
    play: <svg viewBox="0 0 24 24" {...s}><path d="M7 4v16l13-8z" /></svg>,
    pause: <svg viewBox="0 0 24 24" {...s}><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>,
    copy: <svg viewBox="0 0 24 24" {...s}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M4 16V6a2 2 0 0 1 2-2h10" /></svg>,
    check: <svg viewBox="0 0 24 24" {...s}><path d="m5 12 5 5L20 7" /></svg>,
    chev: <svg viewBox="0 0 24 24" {...s}><path d="m9 6 6 6-6 6" /></svg>,
    chevDn: <svg viewBox="0 0 24 24" {...s}><path d="m6 9 6 6 6-6" /></svg>,
    arrowL: <svg viewBox="0 0 24 24" {...s}><path d="M19 12H5m6-6-6 6 6 6" /></svg>,
    arrowR: <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>,
    stack: <svg viewBox="0 0 24 24" {...s}><path d="m4 7 8-4 8 4-8 4-8-4z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></svg>,
    graph: <svg viewBox="0 0 24 24" {...s}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" /></svg>,
    target: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>,
    flame: <svg viewBox="0 0 24 24" {...s}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-1-2 0-4c1 2 3 1 3-1z" /></svg>,
    review: <svg viewBox="0 0 24 24" {...s}><path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" /></svg>,
    spark: <svg viewBox="0 0 24 24" {...s}><path d="M12 3v4M12 17v4M3 12h4M17 12h4m-2.5-6.5L16 8m-8 8-2.5 2.5M18.5 18.5 16 16M8 8 5.5 5.5" /></svg>,
    book: <svg viewBox="0 0 24 24" {...s}><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2z" /><path d="M8 7h7M8 11h7" /></svg>,
    setting: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.1 16.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8L4.2 7A2 2 0 1 1 7 4.1l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>,
    user: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>,
    download: <svg viewBox="0 0 24 24" {...s}><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" /></svg>,
    upload: <svg viewBox="0 0 24 24" {...s}><path d="M12 20V8m0 0 4 4m-4-4-4 4M5 4h14" /></svg>,
    logout: <svg viewBox="0 0 24 24" {...s}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M9 12h11m-3-3 3 3-3 3" /></svg>,
    keyboard: <svg viewBox="0 0 24 24" {...s}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" /></svg>
  };
  return map[name] || null;
};

/* ─── Account menu ─── */
const AccountMenu = ({ open, onClose, onAction, completed, totalLessons, onOpenTweaks }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {if (ref.current && !ref.current.contains(e.target)) onClose();};
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="acct-menu" ref={ref}>
      <div className="acct-head">
        <div className="av">RC</div>
        <div>
          <div className="name">Rana Cardoo</div>
          <div className="email">rana@cardoo.co</div>
        </div>
      </div>
      <div className="acct-stats">
        <span><strong>{completed}</strong>/{totalLessons} lessons</span>
        <span><strong>11</strong>-day streak</span>
      </div>
      <div className="acct-list">
        <button className="acct-row" onClick={() => {onAction("profile");onClose();}}>
          <span className="ico"><Icon name="user" size={14} /></span> Profile & cohort
        </button>
        <button className="acct-row" onClick={() => {onAction("export");onClose();}}>
          <span className="ico"><Icon name="download" size={14} /></span> Export progress
        </button>
        <button className="acct-row" onClick={() => {onAction("import");onClose();}}>
          <span className="ico"><Icon name="upload" size={14} /></span> Import progress
        </button>
        <div className="acct-sep" />
        <button className="acct-row" onClick={() => {onOpenTweaks?.();onClose();}}>
          <span className="ico"><Icon name="setting" size={14} /></span> Display & settings
        </button>
        <button className="acct-row" onClick={() => {onAction("shortcuts");onClose();}}>
          <span className="ico"><Icon name="keyboard" size={14} /></span> Keyboard shortcuts
        </button>
        <div className="acct-sep" />
        <button className="acct-row danger" onClick={() => {onAction("signout");onClose();}}>
          <span className="ico"><Icon name="logout" size={14} /></span> Sign out
        </button>
      </div>
    </div>);

};

/* ─── Reading-progress strip ─── */
const ReadStrip = ({ scrollRef }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;if (!el) return;
    const h = () => {
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, el.scrollTop / max * 100) : 0);
    };
    el.addEventListener("scroll", h, { passive: true });h();
    return () => el.removeEventListener("scroll", h);
  }, [scrollRef]);
  return <div className="read-strip"><i style={{ width: pct + "%" }} /></div>;
};

/* ─── Sidebar ─── */
const Sidebar = ({ modules, lessons, activeId, completed, onPick, openMods, toggleMod, onTool }) => {
  const totalLessons = useMemo(() => Object.values(lessons).reduce((a, l) => a + l.length, 0), [lessons]);
  const doneCount = completed.size;
  const pct = Math.round(doneCount / totalLessons * 100);
  const curMod = modules.find((m) => (lessons[m.id] || []).some((l) => l.id === activeId));
  const curIdx = curMod ? modules.indexOf(curMod) + 1 : 1;

  return (
    <aside className="side">
      <div className="side-progress">
        <div className="row">
          <div className="pct">{pct}<span style={{ fontSize: 18, color: "var(--ink-3)" }}>%</span></div>
          <div className="label">Progress</div>
        </div>
        <div className="meta"><strong>{doneCount}</strong> of {totalLessons} lessons · Week {curIdx} of 12</div>
        <div className="bar"><i style={{ width: pct + "%" }} /></div>
      </div>

      <div className="side-group">
        <div className="side-group-title"><span>Course</span><span className="num">12 weeks</span></div>
        {modules.map((m) => {
          const lessonList = lessons[m.id] || [];
          const isCurrent = lessonList.some((l) => l.id === activeId);
          const isOpen = openMods.has(m.id);
          const modDone = lessonList.filter((l) => completed.has(l.id)).length;
          return (
            <div key={m.id} className={"mod" + (isOpen ? " open" : "")}>
              <div className={"mod-head" + (isOpen ? " open" : "") + (isCurrent ? " is-current" : "")}
              onClick={() => toggleMod(m.id)}>
                <span className="chevron"><Icon name="chev" size={10} /></span>
                <span className="swatch" style={{ background: m.accent }} />
                <span className="title">{m.title}</span>
                <span className="count">{modDone}/{lessonList.length}</span>
              </div>
              <div className="mod-lessons">
                {lessonList.map((l) =>
                <button key={l.id}
                className={"lesson-btn" + (l.id === activeId ? " active" : "") + (completed.has(l.id) ? " done" : "")}
                onClick={() => onPick(l.id)}>
                    <span className="check">{completed.has(l.id) ? <Icon name="check" size={9} /> : null}</span>
                    <span className="num">{l.id}</span>
                    <span className="ltxt">{l.title}</span>
                  </button>
                )}
              </div>
            </div>);

        })}
      </div>

      <div className="side-group side-tools">
        <div className="side-group-title"><span>Practice</span></div>
        <button className="tool-btn" onClick={() => onTool("review")}>
          <span className="ico"><Icon name="review" size={14} /></span>
          Spaced review
          <span className="badge">4 due</span>
        </button>
        <button className="tool-btn" onClick={() => onTool("adversarial")}>
          <span className="ico"><Icon name="target" size={14} /></span>
          Adversarial review
        </button>
        <button className="tool-btn" onClick={() => onTool("capstone")}>
          <span className="ico"><Icon name="spark" size={14} /></span>
          Capstone tracker
        </button>
        <button className="tool-btn" onClick={() => onTool("graph")}>
          <span className="ico"><Icon name="graph" size={14} /></span>
          Knowledge map
        </button>
      </div>
    </aside>);

};

/* ─── Header ─── */
const Header = ({ onOpenPalette, streak, completed, totalLessons, onOpenTweaks, onMenuAction }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="head">
      <div className="brand" data-comment-anchor="8ebb993a58-div-181-7">
        <span className="brand-mark"><em>ai</em><span className="slash">/</span><span className="pm">PM</span></span>
        <span className="sub">Cohort 4 · Spring '26</span>
      </div>
      <div className="head-search" onClick={onOpenPalette}>
        <span className="ico"><Icon name="search" size={14} /></span>
        <input readOnly placeholder="Jump to lesson, tool, or concept…" />
        <span className="kbd">⌘ K</span>
      </div>
      <div className="head-right">
        <div className="streak" title={`${streak}-day learning streak`}>
          <span className="flame"><Icon name="flame" size={12} /></span>
          <span><strong>{streak}</strong><span className="label"> day</span></span>
        </div>
        <div className="avatar-wrap">
          <button className={"avatar" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen((v) => !v)} title="Account">RC</button>
          <AccountMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onAction={onMenuAction}
            completed={completed}
            totalLessons={totalLessons}
            onOpenTweaks={onOpenTweaks} />
          
        </div>
      </div>
    </header>);

};

/* ─── Right outline ─── */
const Outline = ({ items, activeSection, onJump, bookmarked, onBookmark, onCopy, onListen, listening, studyMode, setStudyMode, dueReview, onTool }) =>
<aside className="outline">
    <div className="outline-title">On this lesson</div>
    <nav className="outline-list">
      {items.map((it) =>
    <button key={it.id}
    className={"outline-item" + (activeSection === it.id ? " active" : "")}
    onClick={() => onJump(it.id)}>
          <span className="dot" /> {it.label}
        </button>
    )}
    </nav>

    <div className="rail-section">
      <h5>Study mode</h5>
      <div className="study-pills">
        {[["fast", "Skim"], ["deep", "Deep"], ["exec", "Exec"]].map(([id, lbl]) =>
      <button key={id} className={"study-pill" + (studyMode === id ? " on" : "")}
      onClick={() => setStudyMode(id)}>{lbl}</button>
      )}
      </div>
    </div>

    <div className="rail-section">
      <h5>Actions</h5>
      <button className={"rail-action" + (bookmarked ? " on" : "")} onClick={onBookmark}>
        <span className="ico"><Icon name={bookmarked ? "bookmarkFill" : "bookmark"} size={14} /></span>
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <button className={"rail-action" + (listening ? " on" : "")} onClick={onListen}>
        <span className="ico"><Icon name={listening ? "pause" : "play"} size={14} /></span>
        {listening ? "Pause overview" : "Listen to overview"}
      </button>
      <button className="rail-action" onClick={onCopy}>
        <span className="ico"><Icon name="copy" size={14} /></span>
        Copy lesson
      </button>
    </div>

    <div className="rail-section">
      <h5>Up next in review</h5>
      <div className="due-card">
        <div className="label">{dueReview.next.due}</div>
        <div className="ttl">{dueReview.next.title}</div>
        <div className="meta">+{dueReview.count - 1} more in your queue</div>
        <button className="btn accent sm" onClick={() => onTool("review")}>Start session</button>
      </div>
    </div>
  </aside>;


/* ─── Lesson sections ─── */
const ShiftBlock = ({ n, title, body }) =>
<div>
    <h3><span className="num">{String(n).padStart(2, "0")}</span>{title}</h3>
    <p>{body}</p>
  </div>;


const Pull = ({ body }) => <div className="pull">{body}</div>;

const CaseStudy = ({ title, body, source }) =>
<div className="note case">
    <div className="note-head"><span className="dot" /> Case study · {title}</div>
    <div className="body">{body}</div>
    <div className="source">— {source}</div>
  </div>;


const Takeaways = ({ items }) =>
<div className="note takeaways" id="takeaways">
    <div className="note-head"><span className="dot" /> Key takeaways</div>
    <div className="body">
      <ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  </div>;


const LeadershipNote = ({ body }) =>
<div className="note" id="leadership">
    <div className="note-head"><span className="dot" style={{ background: "var(--info)" }} /> Leadership note</div>
    <div className="body">{body}</div>
  </div>;


const Disclosure = ({ icon, title, sub, open, onToggle, children }) =>
<div className={"disclosure" + (open ? " open" : "")} id={title.toLowerCase().includes("practice") || title.toLowerCase().includes("apply") ? "apply" : "quiz"}>
    <button className="disclosure-head" onClick={onToggle}>
      <span className="ico"><Icon name={icon} size={14} /></span>
      <span className="title">{title}</span>
      <span className="sub">{sub}</span>
      <span className="chev"><Icon name="chev" size={12} /></span>
    </button>
    <div className="disclosure-body">{children}</div>
  </div>;


/* ─── Adversarial review card ─── */
const ReviewCard = ({ personas, hint, onOpen }) =>
<div className="review-card" id="review">
    <div className="kicker">Adversarial review</div>
    <h4>Submit your artifact to a panel of skeptics</h4>
    <p>{hint}</p>
    <div className="personas">
      {personas.map((p) => <span key={p} className="persona-chip">{p}</span>)}
    </div>
    <button className="btn accent" onClick={onOpen}>Open review panel <Icon name="arrowR" size={13} /></button>
  </div>;


/* ─── Quiz body ─── */
const Quiz = ({ q, a, addedToReview, onAddToReview }) => {
  const [text, setText] = useState("");
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <div className="quiz-q">{q}</div>
      <textarea className="quiz-input" value={text} onChange={(e) => setText(e.target.value)}
      placeholder="Write your expected answer before revealing…" />
      <div className="quiz-actions">
        {!revealed ?
        <button className="btn" onClick={() => setRevealed(true)}>Reveal answer</button> :
        <button className="btn ghost" onClick={() => {setRevealed(false);setText("");}}>Try again</button>}
        {revealed && !addedToReview &&
        <button className="btn ghost" onClick={onAddToReview}>+ Add to spaced review</button>
        }
        {addedToReview &&
        <span style={{ fontSize: 12, color: "var(--ok)", display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Icon name="check" size={12} /> Added to review queue
          </span>
        }
      </div>
      {revealed &&
      <div className="quiz-answer">
          <span className="lbl">Reference answer</span>
          {a}
        </div>
      }
    </div>);

};

/* ─── Cmd palette ─── */
const Palette = ({ open, onClose, lessons, modules, onPick }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {if (open) {setQ("");setTimeout(() => inputRef.current?.focus(), 30);}}, [open]);
  if (!open) return null;
  const all = [];
  modules.forEach((m) => (lessons[m.id] || []).forEach((l) => all.push({ ...l, mod: m.title, modNum: m.num })));
  const term = q.trim().toLowerCase();
  const filtered = term ?
  all.filter((l) => l.title.toLowerCase().includes(term) || l.id.includes(term)) :
  all.slice(0, 10);
  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons…" />
        <div className="palette-results">
          {filtered.map((l) =>
          <button key={l.id} className="palette-row" onClick={() => {onPick(l.id);onClose();}}>
              <span className="num">{l.id}</span>
              <span>{l.title}</span>
              <span className="mod-lbl">M{l.modNum}</span>
            </button>
          )}
          {filtered.length === 0 && <div style={{ padding: 20, color: "var(--ink-3)", fontSize: 13 }}>No matches.</div>}
        </div>
      </div>
    </div>);

};

/* ─── Adversarial Review modal panel ─── */
const ReviewPanel = ({ open, onClose, lesson, personas }) => {
  const [persona, setPersona] = useState(personas?.[0] || "Skeptical CTO");
  const [artifact, setArtifact] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const personaList = personas || ["Skeptical CTO", "Bias auditor", "Frontier-model engineer"];

  if (!open) return null;
  const run = () => {
    setRunning(true);
    setTimeout(() => {
      const len = artifact.trim().length;
      const base = Math.min(4, Math.max(1, Math.round(len / 180)));
      const dims = [
      ["Problem framing", base + (artifact.toLowerCase().includes("user") ? 0 : -1)],
      ["System design", base + (artifact.toLowerCase().includes("context") ? 0 : -1)],
      ["Trust design", base - 1],
      ["Evaluation quality", base + (artifact.toLowerCase().includes("eval") ? 1 : -1)],
      ["Safety controls", base - 1],
      ["Operational readiness", base + (artifact.toLowerCase().includes("owner") ? 0 : -1)]].
      map(([k, v]) => [k, Math.max(0, Math.min(4, v))]);
      setResult({
        persona,
        dims,
        strengths: ["Problem framing is more explicit than the rest of the artifact."],
        gaps: ["Safety controls lack concrete owners and rollback criteria.",
        "Trust design needs evidence of citation/confidence affordances."],
        actions: [
        "Add an owner + escalation path for each guardrail.",
        "Show one screenshot of confidence/citations in your UX.",
        "Quote one golden-set example that proves the eval rubric."]

      });
      setRunning(false);
    }, 900);
  };

  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette" style={{ width: "min(720px, 92vw)", maxHeight: "80vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 14 }}>
          <Icon name="target" size={18} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", fontFamily: "var(--mono)" }}>Adversarial review</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", marginTop: 2 }}>{lesson.title}</div>
          </div>
          <button className="btn ghost sm" onClick={onClose}>Close</button>
        </div>
        <div style={{ padding: "20px 22px", overflowY: "auto", flex: 1 }}>
          {!result &&
          <div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 6, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Reviewer persona</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                {personaList.map((p) =>
              <button key={p} className={"persona-chip"} onClick={() => setPersona(p)}
              style={{ cursor: "pointer", borderColor: persona === p ? "var(--accent)" : "var(--line)", color: persona === p ? "var(--accent)" : "var(--ink-2)" }}>{p}</button>
              )}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 6, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Paste artifact</div>
              <textarea className="quiz-input" style={{ minHeight: 200 }} value={artifact} onChange={(e) => setArtifact(e.target.value)}
            placeholder="Paste the markdown of your PRD, eval rubric, self-audit, or any artifact you want reviewed…" />
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <button className="btn accent" disabled={!artifact.trim() || running} onClick={run}>
                  {running ? "Reviewing…" : `Run ${persona} review`}
                </button>
                <button className="btn ghost" onClick={onClose}>Cancel</button>
              </div>
            </div>
          }
          {result &&
          <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{result.persona}'s verdict</div>
                <button className="btn ghost sm" onClick={() => setResult(null)}>← New review</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {result.dims.map(([k, v]) =>
              <div key={k} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginBottom: 6 }}>{k}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ flex: 1, height: 4, background: "var(--line-soft)", borderRadius: 2 }}>
                        <div style={{ width: v / 4 * 100 + "%", height: "100%", background: v >= 3 ? "var(--ok)" : v >= 2 ? "var(--accent)" : "var(--danger)", borderRadius: 2 }} />
                      </div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-2)" }}>{v}/4</div>
                    </div>
                  </div>
              )}
              </div>
              <Section title="Strengths" items={result.strengths} tone="ok" />
              <Section title="Gaps" items={result.gaps} tone="warn" />
              <Section title="Required actions" items={result.actions} tone="accent" ordered />
            </div>
          }
        </div>
      </div>
    </div>);

};

const Section = ({ title, items, tone, ordered }) =>
<div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 11, color: tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--danger)" : "var(--accent)",
    fontFamily: "var(--mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{title}</div>
    {ordered ?
  <ol style={{ paddingLeft: 22, margin: 0, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6 }}>
        {items.map((i, ix) => <li key={ix} style={{ marginBottom: 6 }}>{i}</li>)}
      </ol> :

  <ul style={{ paddingLeft: 22, margin: 0, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6 }}>
        {items.map((i, ix) => <li key={ix} style={{ marginBottom: 6 }}>{i}</li>)}
      </ul>
  }
  </div>;


/* ─── Generic tool modal — review/capstone/graph/profile/shortcuts ─── */
const ToolModal = ({ tool, onClose, lessons, modules, completed, bookmarks, onPick }) => {
  if (!tool) return null;
  const all = useMemo(() => {
    const out = [];
    modules.forEach(m => (lessons[m.id] || []).forEach(l => out.push({ ...l, modId: m.id, modTitle: m.title, accent: m.accent })));
    return out;
  }, [modules, lessons]);

  const titleMap = {
    review:    { ttl: "Spaced review session", sub: "Cards your future self will thank you for" },
    capstone:  { ttl: "Capstone tracker",      sub: "Ship a production-ready AI product" },
    graph:     { ttl: "Knowledge map",         sub: "How the course concepts connect" },
    profile:   { ttl: "Profile & cohort",      sub: "Your learner snapshot" },
    shortcuts: { ttl: "Keyboard shortcuts",    sub: "Move faster" },
    import:    { ttl: "Import progress",       sub: "Restore from a previous export" },
  };
  const head = titleMap[tool] || { ttl: tool, sub: "" };

  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette tool-modal" style={{ width: "min(760px, 94vw)", maxHeight: "84vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div className="tool-head">
          <div>
            <div className="tool-kicker">{tool.toUpperCase()}</div>
            <div className="tool-ttl">{head.ttl}</div>
            <div className="tool-sub">{head.sub}</div>
          </div>
          <button className="btn ghost sm" onClick={onClose}>Close</button>
        </div>
        <div className="tool-body">
          {tool === "review"    && <ReviewSession all={all} onPick={onPick} onClose={onClose} />}
          {tool === "capstone"  && <CapstoneTracker completed={completed} totalLessons={all.length} />}
          {tool === "graph"     && <KnowledgeMap modules={modules} lessons={lessons} completed={completed} onPick={(id) => { onPick(id); onClose(); }} />}
          {tool === "profile"   && <ProfileView completed={completed} bookmarks={bookmarks} all={all} onPick={(id) => { onPick(id); onClose(); }} />}
          {tool === "shortcuts" && <Shortcuts />}
          {tool === "import"    && <ImportProgress onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

/* ─── Spaced review: simple flashcard session ─── */
const ReviewSession = ({ all, onPick, onClose }) => {
  // Seed a stable mock queue from existing lessons + sample Qs
  const queue = useMemo(() => {
    const pool = [
      { lessonId: "1.1", q: "What's the core difference between a Type A and Type B AI PM?", a: "Type B can ship a working AI prototype solo — they understand context engineering, evals, token economics, and tool orchestration, not just vocabulary.", due: "today" },
      { lessonId: "2.3", q: "Name three product-level metrics specific to an AI feature.", a: "Examples: groundedness rate, escalation rate, time-to-confident-answer, eval-set pass rate, p95 latency, cost per resolved task.", due: "today" },
      { lessonId: "3.1", q: "What belongs in a context window for a retrieval-grounded answer?", a: "System prompt + task instructions + retrieved chunks (with citations) + user message + any tool schemas. Trim memory aggressively — recency over volume.", due: "tomorrow" },
      { lessonId: "6.2", q: "Why is a golden dataset different from a regression test set?", a: "Golden = curated, labeled, human-trusted examples that define \"good.\" Regression set = anything you don't want to silently break. Goldens drive the rubric; regressions catch slips.", due: "in 2 days" },
    ];
    return pool;
  }, [all]);

  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState([]);
  const card = queue[i];
  const done = i >= queue.length;

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--ink)", marginBottom: 8 }}>Session complete</div>
        <div style={{ color: "var(--ink-3)", fontSize: 14, marginBottom: 24 }}>You reviewed {queue.length} cards. Next batch unlocks tomorrow.</div>
        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          {["forgot","hard","good","easy"].map(g => {
            const n = graded.filter(x => x === g).length;
            return (
              <div key={g} style={{ minWidth: 80 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 22, color: "var(--ink)" }}>{n}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{g}</div>
              </div>
            );
          })}
        </div>
        <button className="btn" onClick={onClose}>Back to lesson</button>
      </div>
    );
  }

  const grade = (g) => {
    setGraded(prev => [...prev, g]);
    setRevealed(false);
    setI(i + 1);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Card {i + 1} of {queue.length} · due {card.due}
        </div>
        <button className="btn ghost sm" onClick={() => onPick(card.lessonId)}>↗ Open lesson {card.lessonId}</button>
      </div>
      <div className="flashcard">
        <div className="flash-q">{card.q}</div>
        {revealed && (<div className="flash-a">{card.a}</div>)}
      </div>
      {!revealed ? (
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <button className="btn accent" onClick={() => setRevealed(true)}>Reveal answer</button>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-3)" }}>Write your answer in your head first.</div>
        </div>
      ) : (
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", marginBottom: 10, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>How well did you know it?</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[["forgot","Forgot","~1h"],["hard","Hard","1d"],["good","Good","4d"],["easy","Easy","2w"]].map(([k, label, when]) => (
              <button key={k} className="grade-btn" data-tone={k} onClick={() => grade(k)}>
                <div className="lbl">{label}</div>
                <div className="when">{when}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Capstone tracker ─── */
const CapstoneTracker = ({ completed, totalLessons }) => {
  const milestones = [
    { id: "discovery",  title: "Discovery brief",                 sub: "Problem, users, evidence, ROI",   gated: ["1.1","1.2","1.4","4.1"], status: "complete" },
    { id: "prd",        title: "AI PRD & acceptance criteria",    sub: "Including machine-readable AC",  gated: ["2.3","2.4","2.5"],         status: "in-progress" },
    { id: "evals",      title: "Eval suite & golden dataset",     sub: "≥ 50 examples, scored rubric",    gated: ["6.1","6.2","6.4"],         status: "in-progress" },
    { id: "guardrails", title: "Guardrails & observability",      sub: "SLOs, kill switch, runbook",      gated: ["7.1","7.2","7.3","7.4"],   status: "blocked" },
    { id: "launch",     title: "Launch readiness review",         sub: "Adversarial panel sign-off",      gated: ["9.3"],                     status: "blocked" },
    { id: "demo",       title: "Capstone demo & write-up",        sub: "5-min video + 1-page evidence",   gated: ["10.1"],                    status: "blocked" },
  ];
  const tone = { complete: "ok", "in-progress": "accent", blocked: "muted" };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 22 }}>
        <Stat label="Lessons" value={`${completed.size}/${totalLessons}`} />
        <Stat label="Module readiness" value="42%" />
        <Stat label="Reviews this week" value="3" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {milestones.map((m, i) => (
          <div key={m.id} className={"milestone " + tone[m.status]}>
            <div className="mile-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="mile-body">
              <div className="mile-ttl">{m.title}</div>
              <div className="mile-sub">{m.sub}</div>
              <div className="mile-gated">Unlocks after: {m.gated.join(" · ")}</div>
            </div>
            <div className="mile-status">
              {m.status === "complete" && <span style={{ color: "var(--ok)" }}><Icon name="check" size={14} /> Done</span>}
              {m.status === "in-progress" && <span style={{ color: "var(--accent)" }}>In progress</span>}
              {m.status === "blocked" && <span style={{ color: "var(--ink-4)" }}>Locked</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "12px 14px", background: "var(--bg)" }}>
    <div style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--mono)" }}>{label}</div>
    <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", marginTop: 4, letterSpacing: "-0.01em" }}>{value}</div>
  </div>
);

/* ─── Knowledge map: visual constellation by module ─── */
const KnowledgeMap = ({ modules, lessons, completed, onPick }) => {
  return (
    <div>
      <div style={{ color: "var(--ink-3)", fontSize: 13, marginBottom: 18, lineHeight: 1.55 }}>
        Each ring is a module; each node is a lesson. Filled nodes are complete. Click any to jump.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {modules.slice(0, 10).map(m => {
          const ll = lessons[m.id] || [];
          return (
            <div key={m.id} className="kgraph-mod">
              <div className="kgraph-head">
                <span className="kgraph-dot" style={{ background: m.accent }} />
                <div className="kgraph-mod-title">{m.title}</div>
                <div className="kgraph-mod-num">{m.num}</div>
              </div>
              <div className="kgraph-nodes">
                {ll.map(l => (
                  <button key={l.id} className={"kgraph-node" + (completed.has(l.id) ? " done" : "")}
                    style={{ borderColor: completed.has(l.id) ? m.accent : "var(--line)", background: completed.has(l.id) ? m.accent + "22" : "transparent" }}
                    onClick={() => onPick(l.id)} title={l.title}>
                    <span>{l.id}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Profile snapshot ─── */
const ProfileView = ({ completed, bookmarks, all, onPick }) => {
  const bm = [...bookmarks].map(id => all.find(l => l.id === id)).filter(Boolean);
  const lastDone = [...completed].map(id => all.find(l => l.id === id)).filter(Boolean).slice(-3);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 22 }}>
        <Stat label="Cohort"   value="Spring '26" />
        <Stat label="Lessons"  value={`${completed.size}/${all.length}`} />
        <Stat label="Streak"   value="11d" />
        <Stat label="Bookmarks" value={bookmarks.size} />
      </div>
      <SectionBlock title="Bookmarks">
        {bm.length === 0
          ? <Empty msg="No bookmarks yet. Star lessons you want to revisit." />
          : bm.map(l => (<RowLink key={l.id} l={l} onPick={onPick} />))}
      </SectionBlock>
      <SectionBlock title="Recently completed">
        {lastDone.length === 0
          ? <Empty msg="Nothing completed yet." />
          : lastDone.map(l => (<RowLink key={l.id} l={l} onPick={onPick} />))}
      </SectionBlock>
    </div>
  );
};
const SectionBlock = ({ title, children }) => (
  <div style={{ marginTop: 18 }}>
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{title}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>
  </div>
);
const Empty = ({ msg }) => (<div style={{ fontSize: 13, color: "var(--ink-3)", padding: "10px 0" }}>{msg}</div>);
const RowLink = ({ l, onPick }) => (
  <button onClick={() => onPick(l.id)} style={{ display: "flex", gap: 12, padding: "8px 10px", border: "1px solid var(--line-soft)", borderRadius: 6, background: "transparent", cursor: "pointer", textAlign: "left", color: "var(--ink-2)", fontFamily: "inherit", fontSize: 13.5, alignItems: "center" }}>
    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", minWidth: 36 }}>{l.id}</span>
    <span style={{ flex: 1 }}>{l.title}</span>
    <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{l.modTitle}</span>
  </button>
);

/* ─── Shortcuts ─── */
const Shortcuts = () => {
  const rows = [
    ["⌘ K",         "Search lessons & jump"],
    ["J / K",       "Next / previous lesson"],
    ["B",           "Bookmark current lesson"],
    ["E",           "Toggle Practice exercise"],
    ["Q",           "Toggle Self-test"],
    ["R",           "Open Adversarial review"],
    ["G then R",    "Go to spaced review"],
    ["G then C",    "Go to capstone tracker"],
    ["?",           "Show this help"],
    ["Esc",         "Close panel"],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
      {rows.map(([k, l]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line-soft)", borderRadius: 6 }}>
          <kbd style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "2px 8px", border: "1px solid var(--line)", borderRadius: 4, color: "var(--ink)", background: "var(--bg)", minWidth: 60, textAlign: "center" }}>{k}</kbd>
          <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{l}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Import progress ─── */
const ImportProgress = ({ onClose }) => {
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState("");
  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setStatus(`Loaded ${data.completed?.length || 0} lessons and ${data.bookmarks?.length || 0} bookmarks. (Demo — not applied.)`);
      } catch {
        setStatus("Couldn't parse that file. Expected JSON exported from this course.");
      }
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <div
        className={"dropzone" + (dragOver ? " over" : "")}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files?.[0]); }}
      >
        <Icon name="upload" size={22} />
        <div style={{ marginTop: 12, color: "var(--ink-2)", fontSize: 14 }}>Drop a <code>.json</code> progress file</div>
        <div style={{ marginTop: 6, color: "var(--ink-3)", fontSize: 12 }}>or</div>
        <label className="btn ghost sm" style={{ marginTop: 10, cursor: "pointer" }}>
          Browse files
          <input type="file" accept="application/json" style={{ display: "none" }} onChange={e => onFile(e.target.files?.[0])} />
        </label>
      </div>
      {status && (<div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-2)", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8 }}>{status}</div>)}
    </div>
  );
};

window.AIPM_C = { Icon, AccountMenu, ReadStrip, Sidebar, Header, Outline, ShiftBlock, Pull, CaseStudy, Takeaways, LeadershipNote, Disclosure, ReviewCard, Quiz, Palette, ReviewPanel, ToolModal };
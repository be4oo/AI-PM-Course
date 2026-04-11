import { useState, useEffect, useRef } from "react";
import { REVIEW_SYSTEM } from "./data/reviewSystem";
import { LIVE_BASELINE_LAST_UPDATED } from "./data/liveBaseline";
import { curriculum } from "./data/curriculum";
import { buildLessonMetadata } from "./data/lessonMetadata";
import {
  COURSE_BENCHMARK,
  ARTIFACT_TRACKS,
} from "./data/courseContent";
import {
  GlossaryView,
  CheatsheetsView,
  ToolsView,
  AuditView,
  SourcesView,
  LiveView,
  ReviewsView,
  CohortView,
  CoverageView,
  OutlineView,
  CommunityOpsView,
  TemplateDownloadsView,
  OpsStarterView,
  CapstoneDashboardView,
} from "./views/CourseViews";

/* ═══════════════════════════════════════════
   AI PM COURSE v3.5 — THE DEFINITIVE EDITION
   Based on Product Faculty Certification (Maven)
   Enriched with ChatGPT + Gemini audit feedback
   ═══════════════════════════════════════════ */

export default function AIPMCourseV3() {
  const [activeMod, setActiveMod] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [showApply, setShowApply] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizA, setShowQuizA] = useState(false);
  const [view, setView] = useState("learn"); // learn | outline | glossary | cheatsheets | tools | audit | sources | live | reviews | cohort | coverage | community | templates | ops | capstone
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [reviewChecks, setReviewChecks] = useState({});
  const [cohortChecks, setCohortChecks] = useState({});
  const [reviewEvidence, setReviewEvidence] = useState({});
  const [cohortEvidence, setCohortEvidence] = useState({});
  const [communityConfig, setCommunityConfig] = useState({});
  const [communityAssignments, setCommunityAssignments] = useState({});
  const [capstoneChecks, setCapstoneChecks] = useState({});
  const [capstoneNotes, setCapstoneNotes] = useState("");
  const mainRef = useRef(null);

  // Storage persistence
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage?.get("ai-pm-progress");
        if (r?.value) {
          const d = JSON.parse(r.value);
          if (d.completed) setCompleted(new Set(d.completed));
          if (d.bookmarks) setBookmarks(new Set(d.bookmarks));
          if (d.activeMod !== undefined) setActiveMod(d.activeMod);
          if (d.activeLesson !== undefined) setActiveLesson(d.activeLesson);
          if (d.reviewChecks) setReviewChecks(d.reviewChecks);
          if (d.cohortChecks) setCohortChecks(d.cohortChecks);
          if (d.reviewEvidence) setReviewEvidence(d.reviewEvidence);
          if (d.cohortEvidence) setCohortEvidence(d.cohortEvidence);
          if (d.communityConfig) setCommunityConfig(d.communityConfig);
          if (d.communityAssignments) setCommunityAssignments(d.communityAssignments);
          if (d.capstoneChecks) setCapstoneChecks(d.capstoneChecks);
          if (d.capstoneNotes) setCapstoneNotes(d.capstoneNotes);
        }
      } catch {
        // Storage is optional in this runtime.
      }
    })();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await window.storage?.set("ai-pm-progress", JSON.stringify({
          completed: [...completed],
          bookmarks: [...bookmarks],
          activeMod,
          activeLesson,
          reviewChecks,
          cohortChecks,
          reviewEvidence,
          cohortEvidence,
          communityConfig,
          communityAssignments,
          capstoneChecks,
          capstoneNotes,
        }));
      } catch {
        // Ignore persistence failures and keep the course usable.
      }
    };
    save();
  }, [
    completed,
    bookmarks,
    activeMod,
    activeLesson,
    reviewChecks,
    cohortChecks,
    reviewEvidence,
    cohortEvidence,
    communityConfig,
    communityAssignments,
    capstoneChecks,
    capstoneNotes,
  ]);

  const mod = curriculum[activeMod];
  const lesson = mod.lessons[activeLesson];
  const lessonMeta = buildLessonMetadata({
    lesson,
    moduleTitle: mod.title,
    benchmarkDate: COURSE_BENCHMARK.auditDate,
  });
  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const totalExercises = curriculum.reduce((s, m) => s + m.lessons.filter(l => l.apply).length, 0);
  const lessonTypeCounts = curriculum.reduce((acc, m) => {
    m.lessons.forEach((l) => {
      acc[l.type] = (acc[l.type] || 0) + 1;
    });
    return acc;
  }, {});
  const pct = Math.round((completed.size / totalLessons) * 100);
  const lk = (mi, li) => `${curriculum[mi].id}-${curriculum[mi].lessons[li].id}`;
  const isDone = (mi, li) => completed.has(lk(mi, li));
  const isBm = () => bookmarks.has(`${mod.id}-${lesson.id}`);
  const getReviewKey = (moduleId, stepId) => `${moduleId}-${stepId}`;
  const getCohortKey = (moduleId, key) => `${moduleId}-${key}`;
  const isModuleReviewComplete = (moduleId) =>
    REVIEW_SYSTEM.weeklyCadence.every((s) => {
      const reviewKey = getReviewKey(moduleId, s.stepId);
      return (
        reviewChecks[reviewKey] && (reviewEvidence[reviewKey] || "").trim().length >= 20
      );
    });
  const isModuleCohortComplete = (moduleId) =>
    ["peer-checkin", "office-hours", "demo-feedback"].every((k) => {
      const cohortKey = getCohortKey(moduleId, k);
      return (
        cohortChecks[cohortKey] && (cohortEvidence[cohortKey] || "").trim().length >= 12
      );
    });
  const moduleIds = curriculum.map((m) => m.id);
  const modulesReviewReady = moduleIds.filter((id) => isModuleReviewComplete(id)).length;
  const modulesCohortReady = moduleIds.filter((id) => isModuleCohortComplete(id)).length;
  const moduleReadiness = Math.round(
    ((modulesReviewReady / moduleIds.length) * 60) +
    ((modulesCohortReady / moduleIds.length) * 40)
  );
  const freshnessDate = new Date(`${LIVE_BASELINE_LAST_UPDATED}T00:00:00Z`);
  const nowDate = new Date();
  const daysSinceUpdate = Math.max(
    0,
    Math.floor((nowDate.getTime() - freshnessDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const freshnessAudit = {
    slaDays: 30,
    daysSinceUpdate,
    isStale: daysSinceUpdate > 30,
  };

  const advance = () => {
    const atModuleBoundary = activeLesson === mod.lessons.length - 1 && activeMod < curriculum.length - 1;
    if (atModuleBoundary && !isModuleReviewComplete(mod.id)) {
      setView("reviews");
      return;
    }
    if (atModuleBoundary && !isModuleCohortComplete(mod.id)) {
      setView("cohort");
      return;
    }
    setCompleted(p => new Set([...p, lk(activeMod, activeLesson)]));
    setShowApply(false); setShowQuiz(false); setShowQuizA(false);
    if (activeLesson < mod.lessons.length - 1) setActiveLesson(l => l + 1);
    else if (activeMod < curriculum.length - 1) { setActiveMod(m => m + 1); setActiveLesson(0); }
    mainRef.current?.scrollTo(0, 0);
  };

  const goTo = (mi, li) => { setActiveMod(mi); setActiveLesson(li); setShowApply(false); setShowQuiz(false); setShowQuizA(false); setView("learn"); setSidebarOpen(false); mainRef.current?.scrollTo(0, 0); };

  const toggleBm = () => {
    const k = `${mod.id}-${lesson.id}`;
    setBookmarks(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  const doSearch = (q) => {
    if (!q.trim()) { setSearchResults([]); return; }
    const t = q.toLowerCase();
    const results = [];
    curriculum.forEach((m, mi) => m.lessons.forEach((l, li) => {
      if (l.title.toLowerCase().includes(t) || l.content.toLowerCase().includes(t) || (l.keys && l.keys.some(k => k.toLowerCase().includes(t)))) {
        results.push({ mi, li, title: l.title, mod: m.title, id: l.id });
      }
    }));
    setSearchResults(results);
  };

  const renderText = (text) => {
    const lines = text.split("\n");
    const out = [];
    let tableBuffer = [];

    const flushTable = () => {
      if (!tableBuffer.length) return;
      const rows = tableBuffer.map(r => r.split("|").filter((_, i, a) => i > 0 && i < a.length - 1).map(c => c.trim()));
      out.push(
        <div key={`table-${out.length}`} style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                {rows[0].map((cell, ci) => <th key={ci} style={{ color: mod.accent }}>{cell}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.slice(2).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    };

    lines.forEach((line, i) => {
      if (line.startsWith("|")) { tableBuffer.push(line); return; }
      flushTable();
      if (line.startsWith("```")) return;
      if (line.startsWith("**") && line.endsWith("**") && line.slice(2, -2).indexOf("**") === -1) {
        out.push(<h3 key={`h3-${i}`}>{line.replace(/\*\*/g, "")}</h3>);
        return;
      }
      if (line.startsWith("- ") || line.match(/^\d+\. /)) {
        const content = line.replace(/^- /, "").replace(/^\d+\. /, "");
        const parts = content.split(/\*\*(.*?)\*\*/g);
        out.push(
          <li key={`li-${i}`}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </li>
        );
        return;
      }
      if (line === "" || line === "---") return;
      if (line.startsWith("`") && line.endsWith("`") && !line.slice(1, -1).includes("`")) {
        out.push(<p key={`p-${i}`}><code>{line.slice(1, -1)}</code></p>);
        return;
      }
      const parts = line.split(/\*\*(.*?)\*\*/g);
      out.push(
        <p key={`p-${i}`}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        </p>
      );
    });
    flushTable();
    return out;
  };

  // ──── VIEWS ────

  if (view === "glossary") return <GlossaryView onBack={() => setView("learn")} />;
  if (view === "cheatsheets") return <CheatsheetsView onBack={() => setView("learn")} />;
  if (view === "tools") return <ToolsView onBack={() => setView("learn")} />;
  if (view === "audit") {
    return (
      <AuditView
        onBack={() => setView("learn")}
        curriculumLength={curriculum.length}
        totalLessons={totalLessons}
        totalExercises={totalExercises}
      />
    );
  }
  if (view === "sources") return <SourcesView onBack={() => setView("learn")} />;
  if (view === "live") {
    return <LiveView onBack={() => setView("learn")} freshnessAudit={freshnessAudit} />;
  }
  if (view === "reviews") {
    return (
      <ReviewsView
        onBack={() => setView("learn")}
        mod={mod}
        reviewChecks={reviewChecks}
        setReviewChecks={setReviewChecks}
        reviewEvidence={reviewEvidence}
        setReviewEvidence={setReviewEvidence}
        getReviewKey={getReviewKey}
        isModuleReviewComplete={isModuleReviewComplete}
      />
    );
  }
  if (view === "cohort") {
    return (
      <CohortView
        onBack={() => setView("learn")}
        mod={mod}
        cohortChecks={cohortChecks}
        setCohortChecks={setCohortChecks}
        cohortEvidence={cohortEvidence}
        setCohortEvidence={setCohortEvidence}
        getCohortKey={getCohortKey}
        isModuleCohortComplete={isModuleCohortComplete}
      />
    );
  }
  if (view === "coverage") return <CoverageView onBack={() => setView("learn")} />;
  if (view === "community") {
    return (
      <CommunityOpsView
        onBack={() => setView("learn")}
        mod={mod}
        communityConfig={communityConfig}
        setCommunityConfig={setCommunityConfig}
        communityAssignments={communityAssignments}
        setCommunityAssignments={setCommunityAssignments}
      />
    );
  }
  if (view === "templates") return <TemplateDownloadsView onBack={() => setView("learn")} />;
  if (view === "ops") return <OpsStarterView onBack={() => setView("learn")} />;
  if (view === "capstone") {
    return (
      <CapstoneDashboardView
        onBack={() => setView("learn")}
        completed={completed}
        totalLessons={totalLessons}
        moduleReadiness={moduleReadiness}
        capstoneChecks={capstoneChecks}
        setCapstoneChecks={setCapstoneChecks}
        capstoneNotes={capstoneNotes}
        setCapstoneNotes={setCapstoneNotes}
      />
    );
  }
  if (view === "outline") {
    return (
      <OutlineView
        onBack={() => setView("learn")}
        curriculum={curriculum}
        isDone={isDone}
        goTo={goTo}
        completed={completed}
        totalLessons={totalLessons}
        pct={pct}
        mod={mod}
      />
    );
  }

  // ──── MAIN LEARN VIEW ────
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <span className="brand-badge" style={{ background: mod.accent }}>AI PM COURSE</span>
          <span className="brand-title">v4.0</span>
        </div>
        <div className="header-actions">
          {/* Main utilities */}
          <button className="btn-outline" onClick={() => setShowSearch(s => !s)}>⌕ SEARCH</button>
          <button className="btn-outline" onClick={() => setView("audit")} style={{color: '#00C8FF', borderColor: '#00C8FF44'}}>AUDIT</button>
          <button className="btn-outline" onClick={() => setView("sources")} style={{color: '#FF6B35', borderColor: '#FF6B3544'}}>SRC</button>
          <button className="btn-outline" onClick={() => setView("live")} style={{color: '#0099FF', borderColor: '#0099FF44'}}>LIVE</button>
          <button className="btn-outline" onClick={() => setView("reviews")} style={{color: '#FF3B5C', borderColor: '#FF3B5C44'}}>REV</button>
          <button className="btn-outline" onClick={() => setView("cohort")} style={{color: '#7A5CFF', borderColor: '#7A5CFF44'}}>COHORT</button>
          <button className="btn-outline" onClick={() => setView("coverage")} style={{color: '#12C48B', borderColor: '#12C48B44'}}>COV</button>
          <button className="btn-outline" onClick={() => setView("community")} style={{color: '#2ED3B7', borderColor: '#2ED3B744'}}>COMM</button>
          <button className="btn-outline" onClick={() => setView("ops")} style={{color: '#8FB9FF', borderColor: '#8FB9FF44'}}>OPS</button>
          <button className="btn-outline" onClick={() => setView("templates")} style={{color: '#F5C542', borderColor: '#F5C54244'}}>TMP</button>
          <button className="btn-outline" onClick={() => setView("capstone")} style={{color: '#00D2FF', borderColor: '#00D2FF44'}}>CAP</button>
          <button className="btn-outline" onClick={() => setView("cheatsheets")}>REF</button>
          <button className="btn-outline" onClick={() => setView("tools")} style={{color: '#00E676', borderColor: '#00E67644'}}>LAB</button>
          <button className="btn-outline" onClick={() => setView("glossary")}>ABC</button>
          <button className="btn-outline" onClick={() => setView("outline")}>MAP</button>

          <div className="progress-bar">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%`, background: mod.accent }} />
            </div>
            <span className="progress-text">{pct}%</span>
          </div>
        </div>
      </header>

      {/* Search bar */}
      {showSearch && (
        <div className="search-bar-container" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 20px' }}>
          <input value={searchTerm} onChange={e => { setSearchTerm(e.target.value); doSearch(e.target.value); }} placeholder="Search lessons..." style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-light)', color: '#fff', padding: '10px 14px', borderRadius: '4px', fontFamily: 'var(--font-sans)', outline: 'none' }} autoFocus />
          {searchResults.length > 0 && (
            <div style={{ marginTop: 12, maxHeight: 200, overflowY: "auto" }}>
              {searchResults.slice(0, 8).map((r, i) => (
                <button key={i} onClick={() => { goTo(r.mi, r.li); setShowSearch(false); setSearchTerm(""); setSearchResults([]); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0", cursor: "pointer", fontFamily: "inherit", borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, color: "#888", marginRight: 8, fontFamily: 'var(--font-mono)' }}>{r.id}</span> <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{r.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="main-layout">
        <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          {curriculum.map((m, mi) => (
            <div key={m.id}>
              <div className="module-header" style={{ color: activeMod === mi ? m.accent : 'var(--text-muted)' }}>
                {m.module} · {m.week}
              </div>
              <div className="module-title" style={{ color: activeMod === mi ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {m.title}
              </div>
              {m.lessons.map((l, li) => {
                const isActive = activeMod === mi && activeLesson === li;
                const done = isDone(mi, li);
                return (
                  <button 
                    key={l.id} 
                    className={`lesson-nav-btn ${isActive ? 'active' : ''}`} 
                    onClick={() => goTo(mi, li)}
                    style={{ borderLeftColor: isActive ? m.accent : 'transparent' }}
                  >
                    <div className="checkbox" style={{ borderColor: done ? m.accent : 'var(--border-light)', background: done ? m.accent : 'transparent' }}>
                      {done ? "✓" : ""}
                    </div>
                    <span className="lesson-title" style={{ color: done && !isActive ? 'var(--text-muted)' : '' }}>
                      {l.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <main className="content-area" ref={mainRef}>
          <div className="content-wrapper">
          <div style={{ background: "#0B0B10", border: "1px solid #171726", padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 8, color: mod.accent, letterSpacing: 2 }}>BENCHMARKED COURSE PRODUCT</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700, marginTop: 4 }}>{COURSE_BENCHMARK.target}</div>
              </div>
              <div style={{ fontSize: 8, color: "#667", textAlign: "right" }}>Verified against public pages on {COURSE_BENCHMARK.auditDate}</div>
            </div>
            <div style={{ fontSize: 10, color: "#B5B5C7", lineHeight: 1.7, marginBottom: 10 }}>
              {COURSE_BENCHMARK.targetShape}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>COURSE SHAPE</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{curriculum.length} modules / {totalLessons} lessons</div>
              </div>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>ARTIFACT SYSTEM</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{ARTIFACT_TRACKS.length} repeatable outputs</div>
              </div>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>LESSON MIX</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{Object.keys(lessonTypeCounts).length} learning modes</div>
              </div>
            </div>
          </div>

          <div className="breadcrumb">
            <span style={{ color: mod.accent, fontWeight: 600 }}>{mod.module}</span>
            <span style={{ color: "var(--text-muted)" }}>›</span>
            <span style={{ color: "var(--text-secondary)" }}>{lesson.id}</span>
            <span className="tag-badge" style={{ color: mod.accent, borderColor: `${mod.accent}55` }}>
              {lesson.type.toUpperCase()}
            </span>
            <button onClick={toggleBm} style={{ marginLeft: "auto", background: "none", border: "none", color: isBm() ? "#FFB800" : "var(--text-muted)", cursor: "pointer", fontSize: 20, padding: 0 }}>{isBm() ? "★" : "☆"}</button>
          </div>

          <h1 className="heading-primary">{lesson.title}</h1>

          <div className="reading-content">
            {renderText(lesson.content)}
          </div>

          {/* Key takeaways */}
          {lesson.keys?.length > 0 && (
            <div className="takeaways-box" style={{ borderLeftColor: mod.accent }}>
              <div className="takeaways-title" style={{ color: mod.accent }}>KEY TAKEAWAYS</div>
              {lesson.keys.map((k, i) => (
                <div key={i} className="takeaway-item">
                  <span style={{ color: mod.accent, fontSize: '14px', marginTop: '1px' }}>→</span>
                  <span>{k}</span>
                </div>
              ))}
            </div>
          )}

          <div className="takeaways-box" style={{ borderLeftColor: "#00E676", padding: "16px 24px" }}>
            <div className="takeaways-title" style={{ color: "#00E676" }}>COURSE OUTPUT TARGETS</div>
            {ARTIFACT_TRACKS.map((track, i) => (
              <div key={i} className="takeaway-item" style={{ marginBottom: 4 }}>
                <span style={{ color: "#00E676", fontSize: '12px', marginTop: '3px' }}>{i + 1}.</span>
                <span style={{ color: "var(--text-secondary)" }}>{track}</span>
              </div>
            ))}
          </div>

          {/* Lesson metadata panel */}
          <div className="metadata-panel">
            <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>LESSON METADATA</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {lessonMeta.sources && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Sources:</span> {lessonMeta.sources.join(" · ")}</div>}
              {lessonMeta.lastVerified && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Verified:</span> {lessonMeta.lastVerified}</div>}
              {lessonMeta.artifact && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Artifact:</span> {lessonMeta.artifact}</div>}
              {lessonMeta.rubric && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Rubric:</span> {lessonMeta.rubric.join(" | ")}</div>}
              {lessonMeta.failureModes && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Failure modes:</span> {lessonMeta.failureModes.join(" | ")}</div>}
              {lessonMeta.redTeam && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Red team:</span> {lessonMeta.redTeam.join(" | ")}</div>}
            </div>
          </div>

          {/* Quiz */}
          {lesson.quiz && (
            <button onClick={() => { setShowQuiz(s => !s); setShowQuizA(false); }} className="apply-btn" style={{ borderColor: showQuiz ? "#8B00FF" : 'var(--border-light)', color: showQuiz ? "#8B00FF" : 'var(--text-primary)' }}>
              <span style={{ fontSize: '10px' }}>{showQuiz ? "▼" : "▶"}</span> SELF-TEST QUIZ
            </button>
          )}
          {showQuiz && lesson.quiz && (
            <div className="exercise-box" style={{ borderLeftColor: "#8B00FF" }}>
              <div style={{ fontSize: 16, color: "#D0C8E8", lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>{lesson.quiz.q}</div>
              {!showQuizA ? (
                <button onClick={() => setShowQuizA(true)} className="btn-outline" style={{ background: "#8B00FF", color: "#fff", borderColor: '#8B00FF' }}>REVEAL ANSWER</button>
              ) : (
                <div style={{ fontSize: 15, color: "#A088C8", lineHeight: 1.6, borderTop: "1px solid var(--border-color)", paddingTop: 16, marginTop: 16 }}>{lesson.quiz.a}</div>
              )}
            </div>
          )}

          {/* Apply */}
          <button onClick={() => setShowApply(s => !s)} className="apply-btn" style={{ borderColor: showApply ? mod.accent : 'var(--border-light)', color: showApply ? mod.accent : 'var(--text-primary)' }}>
            <span style={{ fontSize: '10px' }}>{showApply ? "▼" : "▶"}</span> APPLY → PUSH TO GITHUB
            <span style={{ marginLeft: "auto", fontSize: "10px", color: showApply ? mod.accent : "var(--text-muted)" }}>hands-on exercise</span>
          </button>
          {showApply && (
            <div className="exercise-box">
              <div className="exercise-title">EXERCISE</div>
              <div className="exercise-content">
                {renderText(lesson.apply)}
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="nav-footer">
            <button 
              className="btn-nav btn-prev" 
              onClick={() => {
                if (activeLesson > 0) setActiveLesson(l => l - 1);
                else if (activeMod > 0) { setActiveMod(m => m - 1); setActiveLesson(curriculum[activeMod - 1].lessons.length - 1); }
                setShowApply(false); setShowQuiz(false); setShowQuizA(false); mainRef.current?.scrollTo(0, 0);
              }}
            >
              ← PREV
            </button>
            <button 
              className="btn-nav btn-next" 
              onClick={advance}
              style={{ background: mod.accent }}
            >
              {isDone(activeMod, activeLesson) ? "NEXT →" : "MARK COMPLETE + NEXT →"}
            </button>
          </nav>

          <div className="nav-stats">
            <span>{completed.size}/{totalLessons} lessons done</span>
            <span>·</span>
            <span>{curriculum.length} modules</span>
            <span>·</span>
            <span>Capstone: {completed.has(`10-10.1`) ? "✓ SHIPPED" : "pending"}</span>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

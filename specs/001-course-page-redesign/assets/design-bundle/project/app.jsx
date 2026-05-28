/* AI PM Course — main app */

const { useState, useEffect, useRef, useMemo } = React;
const { MODULES, LESSONS, LESSON_CONTENT, LESSON_OUTLINE, DUE_REVIEW } = window.AIPM;
const C = window.AIPM_C;

/* TWEAKS — declared at the top so the host can persist them */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#d18d4f",
  "density": "comfortable",
  "displayFont": "newsreader"
}/*EDITMODE-END*/;

function App() {
  const t = useTweaks ? useTweaks(TWEAK_DEFAULTS) : { tweaks: TWEAK_DEFAULTS };
  const tweaks = t.tweaks || TWEAK_DEFAULTS;

  // apply accent + display font as CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    const fonts = {
      newsreader: '"Newsreader", ui-serif, Georgia, serif',
      geist:      '"Geist", ui-sans-serif, system-ui, sans-serif',
    };
    document.documentElement.style.setProperty("--serif", fonts[tweaks.displayFont] || fonts.newsreader);
    // density
    document.documentElement.style.setProperty("--content-w", tweaks.density === "compact" ? "660px" : "720px");
  }, [tweaks.accent, tweaks.displayFont, tweaks.density]);

  // ─── State ───
  const [activeId, setActiveId] = useState("1.1");
  const [completed, setCompleted] = useState(new Set(["1.2"]));    // seed one
  const [bookmarks, setBookmarks] = useState(new Set());
  const [openMods, setOpenMods] = useState(new Set([1]));
  const [showApply, setShowApply] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [studyMode, setStudyMode] = useState("deep");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(null);   // "review" | "capstone" | "graph" | "profile" | "shortcuts" | "import"
  const [activeSection, setActiveSection] = useState("lede");
  const [toast, setToast] = useState("");
  const [listening, setListening] = useState(false);
  const [addedToReview, setAddedToReview] = useState(false);

  const mainRef = useRef(null);

  // Locate active lesson
  const { mod, lesson, modLessons, lessonIdx, content, outline } = useMemo(() => {
    let foundMod = MODULES[0];
    let foundLessons = LESSONS[1] || [];
    let foundLesson = foundLessons[0];
    let idx = 0;
    for (const m of MODULES) {
      const ll = LESSONS[m.id] || [];
      const i = ll.findIndex(l => l.id === activeId);
      if (i !== -1) {
        foundMod = m; foundLessons = ll; foundLesson = ll[i]; idx = i; break;
      }
    }
    return {
      mod: foundMod, lesson: foundLesson, modLessons: foundLessons, lessonIdx: idx,
      content: LESSON_CONTENT[foundLesson.id] || null,
      outline: LESSON_OUTLINE[foundLesson.id] || [],
    };
  }, [activeId]);

  const prevLesson = useMemo(() => {
    if (lessonIdx > 0) return { ...modLessons[lessonIdx - 1], modTitle: mod.title };
    const mi = MODULES.indexOf(mod);
    if (mi > 0) {
      const pm = MODULES[mi - 1];
      const pl = LESSONS[pm.id] || [];
      return { ...pl[pl.length - 1], modTitle: pm.title };
    }
    return null;
  }, [mod, modLessons, lessonIdx]);
  const nextLesson = useMemo(() => {
    if (lessonIdx < modLessons.length - 1) return { ...modLessons[lessonIdx + 1], modTitle: mod.title };
    const mi = MODULES.indexOf(mod);
    if (mi < MODULES.length - 1) {
      const nm = MODULES[mi + 1];
      return { ...(LESSONS[nm.id] || [])[0], modTitle: nm.title };
    }
    return null;
  }, [mod, modLessons, lessonIdx]);

  // ─── Tracking active section via scroll ───
  useEffect(() => {
    const el = mainRef.current; if (!el) return;
    const onScroll = () => {
      const top = el.scrollTop + 120;
      let cur = outline[0]?.id || "lede";
      for (const o of outline) {
        const n = document.getElementById(o.id);
        if (n && n.offsetTop <= top) cur = o.id;
      }
      setActiveSection(cur);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeId, outline]);

  // ─── Cmd-K palette + keyboard shortcuts ───
  useEffect(() => {
    const onKey = e => {
      // ignore when typing in inputs/textareas
      const target = e.target;
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(true); return; }
      if (e.key === "Escape") { setPaletteOpen(false); setReviewOpen(false); setToolOpen(null); return; }
      if (isInput) return;

      if (e.key === "?")          { setToolOpen("shortcuts"); }
      else if (e.key === "b" || e.key === "B") { toggleBookmark(); }
      else if (e.key === "j")     { if (nextLesson) navTo(nextLesson.id); }
      else if (e.key === "k")     { if (prevLesson) navTo(prevLesson.id); }
      else if (e.key === "e")     { setShowApply(v => !v); }
      else if (e.key === "q")     { setShowQuiz(v => !v); }
      else if (e.key === "r")     { setReviewOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ─── Actions ───
  const navTo = (id) => {
    setActiveId(id); setShowApply(false); setShowQuiz(false); setAddedToReview(false);
    setOpenMods(prev => {
      const n = new Set(prev);
      const m = MODULES.find(m => (LESSONS[m.id] || []).some(l => l.id === id));
      if (m) n.add(m.id);
      return n;
    });
    setTimeout(() => mainRef.current?.scrollTo({ top: 0, behavior: "instant" }), 0);
  };
  const toggleMod = (id) => setOpenMods(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleBookmark = () => {
    setBookmarks(prev => { const n = new Set(prev); n.has(lesson.id) ? n.delete(lesson.id) : n.add(lesson.id); return n; });
    flash(bookmarks.has(lesson.id) ? "Removed bookmark" : "Bookmarked");
  };
  const markComplete = () => {
    setCompleted(prev => { const n = new Set(prev); n.add(lesson.id); return n; });
    if (nextLesson) { flash("Lesson complete"); navTo(nextLesson.id); }
    else flash("Course complete 🎉");
  };
  const handleCopy = () => {
    navigator.clipboard?.writeText(`# ${lesson.title}\n\n${content?.lede || ""}\n\n[Copied from AI/PM]`);
    flash("Lesson copied to clipboard");
  };
  const handleListen = () => { setListening(v => !v); flash(listening ? "Audio paused" : "Listening…"); };
  const onTool = (which) => {
    if (which === "adversarial") setReviewOpen(true);
    else setToolOpen(which);
  };
  const jumpTo = (id) => {
    const n = document.getElementById(id);
    if (n) mainRef.current?.scrollTo({ top: n.offsetTop - 40, behavior: "smooth" });
  };

  // Toast
  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 1800); };

  const isBookmarked = bookmarks.has(lesson.id);
  const isDone = completed.has(lesson.id);
  const modProgress = modLessons.filter(l => completed.has(l.id)).length;

  return (
    <div className="app">
      <C.Header
        onOpenPalette={() => setPaletteOpen(true)}
        streak={11}
        completed={completed.size}
        totalLessons={Object.values(LESSONS).reduce((a, l) => a + l.length, 0)}
        onOpenTweaks={() => window.postMessage({ type: "__activate_edit_mode" }, "*")}
        onMenuAction={(action) => {
          if (action === "export") {
            const blob = new Blob([JSON.stringify({ completed: [...completed], bookmarks: [...bookmarks], activeId, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `ai-pm-progress-${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            flash("Progress exported");
          } else if (action === "import") {
            setToolOpen("import");
          } else if (action === "profile") {
            setToolOpen("profile");
          } else if (action === "shortcuts") {
            setToolOpen("shortcuts");
          } else if (action === "signout") {
            flash("Signed out (demo)");
          }
        }}
      />
      <C.Sidebar
        modules={MODULES}
        lessons={LESSONS}
        activeId={activeId}
        completed={completed}
        onPick={navTo}
        openMods={openMods}
        toggleMod={toggleMod}
        onTool={onTool}
      />
      <main className="main" ref={mainRef} style={{ position: "relative" }}>
        <C.ReadStrip scrollRef={mainRef} />
        <div className="main-inner">

          {/* Module ribbon */}
          <div className="mod-ribbon">
            <div className="mark" style={{ background: mod.accent }} />
            <div>
              <div className="kicker">{mod.num} · {mod.week}</div>
              <div className="title">{mod.title}</div>
            </div>
            <div className="progress">
              <span>{modProgress}/{modLessons.length}</span>
              <span className="mini-bar"><i style={{ width: (modProgress / modLessons.length * 100) + "%" }} /></span>
            </div>
          </div>

          {/* Crumbs */}
          <div className="crumbs">
            <span className="accent-dot" style={{ background: mod.accent }} />
            <span>Module {mod.num}</span>
            <span className="sep">›</span>
            <span>Lesson {lesson.id}</span>
            <span className="tag">{lesson.type}</span>
          </div>

          {/* Title */}
          <h1 className="lesson-h1" id="lede">{lesson.title}</h1>

          {/* Meta + actions */}
          <div className="lesson-meta">
            <span className="item freshness"><span className="pulse" /> Updated {lesson.updated || "this quarter"}</span>
            <span className="sep">·</span>
            <span className="item">{lesson.readMin} min read</span>
            <span className="sep">·</span>
            <span className="item">{lesson.exMin} min practice</span>
            {isDone && (<><span className="sep">·</span><span className="item" style={{ color: "var(--ok)" }}><C.Icon name="check" size={12} /> Completed</span></>)}

            <div className="actions">
              <button className={"icon-btn" + (isBookmarked ? " on" : "")} onClick={toggleBookmark} title="Bookmark">
                <C.Icon name={isBookmarked ? "bookmarkFill" : "bookmark"} size={15} />
              </button>
              <button className={"icon-btn" + (listening ? " on" : "")} onClick={handleListen} title="Listen">
                <C.Icon name={listening ? "pause" : "play"} size={15} />
              </button>
              <button className="icon-btn" onClick={handleCopy} title="Copy lesson">
                <C.Icon name="copy" size={15} />
              </button>
            </div>
          </div>

          {/* Article */}
          {content ? (
            <article className="prose">
              <p className="lede">{content.lede}</p>

              <div id="shifts">
                {content.sections.filter(s => s.kind === "shift").map((s, i) => (
                  <C.ShiftBlock key={i} n={s.n} title={s.title} body={s.body} />
                ))}
              </div>

              {content.sections.filter(s => s.kind === "pull").map((s, i) => (
                <div id={i === 0 ? "pull" : undefined} key={"pull-" + i}><C.Pull body={s.body} /></div>
              ))}

              <div id="case">
                {content.sections.filter(s => s.kind === "case").map((s, i) => (
                  <C.CaseStudy key={"case-" + i} {...s} />
                ))}
              </div>

              <C.Takeaways items={content.takeaways} />

              {studyMode !== "fast" && content.leadership && (
                <C.LeadershipNote body={content.leadership} />
              )}

              {/* Practice */}
              {studyMode !== "exec" && (
                <C.Disclosure
                  icon="stack"
                  title="Practice — Self-audit"
                  sub="≈ 25 min · push to /docs"
                  open={showApply}
                  onToggle={() => setShowApply(v => !v)}
                >
                  <div style={{ marginTop: 8, marginBottom: 6, fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                    {content.apply.title}
                  </div>
                  <div style={{ whiteSpace: "pre-line", fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-2)" }}>
                    {content.apply.body}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <button className="btn ghost sm">Open template</button>
                    <button className="btn ghost sm">Mark practice complete</button>
                  </div>
                </C.Disclosure>
              )}

              {/* Quiz */}
              {studyMode !== "exec" && (
                <C.Disclosure
                  icon="book"
                  title="Self-test"
                  sub="1 question · 2 min"
                  open={showQuiz}
                  onToggle={() => setShowQuiz(v => !v)}
                >
                  <C.Quiz
                    q={content.quiz.q}
                    a={content.quiz.a}
                    addedToReview={addedToReview}
                    onAddToReview={() => { setAddedToReview(true); flash("Added to spaced review"); }}
                  />
                </C.Disclosure>
              )}

              {/* Adversarial review CTA */}
              <C.ReviewCard
                personas={content.review.personas}
                hint={content.review.hint}
                onOpen={() => setReviewOpen(true)}
              />
            </article>
          ) : (
            <div style={{ padding: 60, textAlign: "center", color: "var(--ink-3)" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink-2)", marginBottom: 8 }}>Lesson preview</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
                Full content for <code>{lesson.id}</code> hasn't been authored in this preview. The structure, navigation, and tools are the same — pick <strong>Lesson 1.1</strong> to see the full design.
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="nav-foot">
            {prevLesson ? (
              <a href="#" onClick={(e) => { e.preventDefault(); navTo(prevLesson.id); }}>
                <span className="dir">← Previous</span>
                <div className="ttl"><span className="num">{prevLesson.id}</span>{prevLesson.title}</div>
              </a>
            ) : <span />}
            {nextLesson ? (
              <a href="#" className="right" onClick={(e) => { e.preventDefault(); markComplete(); }}>
                <span className="dir">{isDone ? "Next" : "Mark complete & next"} →</span>
                <div className="ttl"><span className="num">{nextLesson.id}</span>{nextLesson.title}</div>
              </a>
            ) : <span />}
          </div>

        </div>
      </main>
      <C.Outline
        items={outline}
        activeSection={activeSection}
        onJump={jumpTo}
        bookmarked={isBookmarked}
        onBookmark={toggleBookmark}
        onCopy={handleCopy}
        onListen={handleListen}
        listening={listening}
        studyMode={studyMode}
        setStudyMode={setStudyMode}
        dueReview={DUE_REVIEW}
        onTool={onTool}
      />

      <C.Palette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        modules={MODULES}
        lessons={LESSONS}
        onPick={navTo}
      />

      <C.ReviewPanel
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        lesson={lesson}
        personas={content?.review?.personas}
      />

      <C.ToolModal
        tool={toolOpen}
        onClose={() => setToolOpen(null)}
        lessons={LESSONS}
        modules={MODULES}
        completed={completed}
        bookmarks={bookmarks}
        onPick={navTo}
      />

      <div className={"toast" + (toast ? " show" : "")}>{toast}</div>

      {/* Tweaks panel — only the tweaks user explicitly chose to expose */}
      {typeof TweaksPanel !== "undefined" && (
        <TweaksPanel title="Course tweaks">
          {typeof TweakSection !== "undefined" && (
            <>
              <TweakSection title="Brand">
                <TweakColor
                  label="Accent"
                  value={tweaks.accent}
                  onChange={v => t.setTweak("accent", v)}
                  options={["#d18d4f", "#7ba1c7", "#7fb487", "#c089b4", "#e0c46c"]}
                />
                <TweakRadio
                  label="Display font"
                  value={tweaks.displayFont}
                  onChange={v => t.setTweak("displayFont", v)}
                  options={[
                    { value: "newsreader", label: "Serif" },
                    { value: "geist",      label: "Sans" },
                  ]}
                />
              </TweakSection>
              <TweakSection title="Reading">
                <TweakRadio
                  label="Density"
                  value={tweaks.density}
                  onChange={v => t.setTweak("density", v)}
                  options={[
                    { value: "compact",      label: "Compact" },
                    { value: "comfortable",  label: "Roomy" },
                  ]}
                />
              </TweakSection>
            </>
          )}
        </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

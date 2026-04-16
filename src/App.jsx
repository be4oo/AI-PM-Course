import { useState, useEffect, useRef } from "react";
import { REVIEW_SYSTEM } from "./data/reviewSystem";
import { LIVE_BASELINE_LAST_UPDATED } from "./data/liveBaseline";
import { curriculum } from "./data/curriculum";
import { buildLessonMetadata } from "./data/lessonMetadata";
import { LESSON_ENHANCEMENTS } from "./data/lessonEnhancements";
import { FreshnessBadge } from "./components/FreshnessBadge";
import { ChangelogView } from "./components/ChangelogView";
import {
  buildCohortStorageKey,
  buildLessonStorageKey,
  buildReviewStorageKey,
  migrateLegacyModuleStorage,
} from "./utils/moduleStorage";
import { getFreshnessBadgeData } from "./utils/freshness";
import {
  STUDY_MODES,
  LESSON_PROGRESS_STATES,
  lessonRuntimeEstimate,
  buildWhyThisMatters,
  buildWorkedExample,
  buildRedFlags,
  ensureLessonFrame,
  defaultArtifactChecklist,
  computeStreak,
  buildProgressSnapshot,
  parseProgressSnapshot,
} from "./data/learningExperience";
import {
  COURSE_BENCHMARK,
  ARTIFACT_TRACKS,
} from "./data/courseContent";
import {
  GlossaryView,
  CheatsheetsView,
  ToolsView,
  ToolMapView,
  MustAddToolsView,
  ExecutiveTrackView,
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
  const [view, setView] = useState("learn"); // learn | outline | glossary | cheatsheets | tools | toolmap | stack | exec | audit | sources | live | changelog | reviews | cohort | coverage | community | templates | ops | capstone
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [studyMode, setStudyMode] = useState("deep");
  const [lessonStates, setLessonStates] = useState({});
  const [moduleIntroSeen, setModuleIntroSeen] = useState({});
  const [moduleOutroReady, setModuleOutroReady] = useState({});
  const [artifactChecks, setArtifactChecks] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [weakConcepts, setWeakConcepts] = useState([]);
  const [importStatus, setImportStatus] = useState("");
  const [showModuleGateWarning, setShowModuleGateWarning] = useState(false);
  const [streakSecured, setStreakSecured] = useState(false);
  const [showViewsMenu, setShowViewsMenu] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [audioState, setAudioState] = useState("stopped"); // "stopped", "playing", "paused"
  const [audioIndex, setAudioIndex] = useState(0);
  const mainRef = useRef(null);
  const readingStartRef = useRef(null);
  const importFileRef = useRef(null);

  // Storage persistence and Routing Initialization
  useEffect(() => {
    (async () => {
      try {
        let rValue = null;
        if (window.storage) {
          const r = await window.storage.get("ai-pm-progress");
          if (r?.value) rValue = r.value;
        } else {
          rValue = window.localStorage.getItem("ai-pm-progress");
        }

        let loadedMod, loadedLesson;

        if (rValue) {
          const loaded = JSON.parse(rValue);
          const { payload: d } = migrateLegacyModuleStorage(loaded);
          if (d.completed) setCompleted(new Set(d.completed));
          if (d.bookmarks) setBookmarks(new Set(d.bookmarks));
          if (d.activeMod !== undefined) loadedMod = d.activeMod;
          if (d.activeLesson !== undefined) loadedLesson = d.activeLesson;
          if (d.reviewChecks) setReviewChecks(d.reviewChecks);
          if (d.cohortChecks) setCohortChecks(d.cohortChecks);
          if (d.reviewEvidence) setReviewEvidence(d.reviewEvidence);
          if (d.cohortEvidence) setCohortEvidence(d.cohortEvidence);
          if (d.communityConfig) setCommunityConfig(d.communityConfig);
          if (d.communityAssignments) setCommunityAssignments(d.communityAssignments);
          if (d.capstoneChecks) setCapstoneChecks(d.capstoneChecks);
          if (d.capstoneNotes) setCapstoneNotes(d.capstoneNotes);
          if (d.studyMode) setStudyMode(d.studyMode);
          if (d.lessonStates) setLessonStates(d.lessonStates);
          if (d.moduleIntroSeen) setModuleIntroSeen(d.moduleIntroSeen);
          if (d.moduleOutroReady) setModuleOutroReady(d.moduleOutroReady);
          if (d.artifactChecks) setArtifactChecks(d.artifactChecks);
          if (d.activityLog) setActivityLog(d.activityLog);
          if (d.weakConcepts) setWeakConcepts(d.weakConcepts);
        }

        // Apply URL Hash if present (Overrides loaded state)
        const currentHash = window.location.hash;
        if (currentHash && currentHash.startsWith("#lesson-")) {
          const lessonId = currentHash.replace("#lesson-", "");
          for (let m = 0; m < curriculum.length; m++) {
            const lIndex = curriculum[m].lessons.findIndex((l) => l.id === lessonId);
            if (lIndex !== -1) {
              loadedMod = m;
              loadedLesson = lIndex;
              break;
            }
          }
        }

        if (loadedMod !== undefined) setActiveMod(loadedMod);
        if (loadedLesson !== undefined) setActiveLesson(loadedLesson);
      } catch {
        // Storage is optional in this runtime.
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Sync active lesson to URL hash and listen for backward/forward nav
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash && currentHash.startsWith("#lesson-")) {
        const lessonId = currentHash.replace("#lesson-", "");
        for (let m = 0; m < curriculum.length; m++) {
          const lIndex = curriculum[m].lessons.findIndex((l) => l.id === lessonId);
          if (lIndex !== -1) {
            setActiveMod(m);
            setActiveLesson(lIndex);
            break;
          }
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    if (curriculum[activeMod] && curriculum[activeMod].lessons[activeLesson]) {
      const targetHash = `#lesson-${curriculum[activeMod].lessons[activeLesson].id}`;
      // Use replaceState to not spam browser history for each internal app interaction, unless user specifically navigated via hash
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, "", targetHash);
      }
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeMod, activeLesson]);

  useEffect(() => {
    const save = async () => {
      try {
        const payload = JSON.stringify({
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
          studyMode,
          lessonStates,
          moduleIntroSeen,
          moduleOutroReady,
          artifactChecks,
          activityLog,
          weakConcepts,
        });
        if (window.storage) {
          await window.storage.set("ai-pm-progress", payload);
        } else {
          window.localStorage.setItem("ai-pm-progress", payload);
        }
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
    studyMode,
    lessonStates,
    moduleIntroSeen,
    moduleOutroReady,
    artifactChecks,
    activityLog,
    weakConcepts,
  ]);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return undefined;

    const handleScroll = () => {
      setShowBackToTop(mainEl.scrollTop > 320);
    };

    handleScroll();
    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [view, activeMod, activeLesson]);

  const mod = curriculum[activeMod];
  const lesson = mod.lessons[activeLesson];
  const lessonMeta = buildLessonMetadata({
    lesson,
    moduleTitle: mod.title,
    benchmarkDate: COURSE_BENCHMARK.auditDate,
  });
  const lessonEnhancement = LESSON_ENHANCEMENTS[lesson.id];
  const lessonFrame = ensureLessonFrame(mod.title, lesson, lessonEnhancement);
  const lessonRuntime = lessonRuntimeEstimate(lesson);
  const whyThisMatters = buildWhyThisMatters(mod.title, lesson);
  const workedExample = buildWorkedExample(lesson);
  const redFlags = buildRedFlags(lesson);
  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const totalExercises = curriculum.reduce((s, m) => s + m.lessons.filter(l => l.apply).length, 0);
  const lessonTypeCounts = curriculum.reduce((acc, m) => {
    m.lessons.forEach((l) => {
      acc[l.type] = (acc[l.type] || 0) + 1;
    });
    return acc;
  }, {});
  const pct = Math.round((completed.size / totalLessons) * 100);
  const lk = (mi, li) => buildLessonStorageKey(curriculum[mi], curriculum[mi].lessons[li].id);
  const lessonKey = lk(activeMod, activeLesson);
  const isDone = (mi, li) => completed.has(lk(mi, li));
  const lessonProgressState = lessonStates[lessonKey] || LESSON_PROGRESS_STATES[0];
  const streakDays = computeStreak(activityLog);
  const isBm = () => bookmarks.has(buildLessonStorageKey(mod, lesson.id));
  const getReviewKey = (moduleId, stepId) => buildReviewStorageKey(moduleId, stepId);
  const getCohortKey = (moduleId, key) => buildCohortStorageKey(moduleId, key);
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
  const freshness = getFreshnessBadgeData({ lastVerified: LIVE_BASELINE_LAST_UPDATED }, new Date());
  const daysSinceUpdate = freshness.daysOld ?? 0;
  const freshnessAudit = {
    slaDays: 30,
    daysSinceUpdate,
    isStale: freshness.status === "stale" || freshness.status === "invalid",
  };

  const navigateToLesson = (mi, li, options = {}) => {
    const { resetPanels = true, scrollBehavior = "preserve" } = options;
    const nextLessonKey = lk(mi, li);
    setActiveMod(mi);
    setActiveLesson(li);
    setLessonStates((prev) => (
      (prev[nextLessonKey] || LESSON_PROGRESS_STATES[0]) === LESSON_PROGRESS_STATES[0]
        ? { ...prev, [nextLessonKey]: "Read" }
        : prev
    ));
    markActivityToday();
    if (resetPanels) {
      setShowApply(false);
      setShowQuiz(false);
      setShowQuizA(false);
    }
    window.speechSynthesis?.cancel();
    setAudioState("stopped");
    setAudioIndex(0);
    setView("learn");
    setSidebarOpen(false);
    if (scrollBehavior === "top") {
      mainRef.current?.scrollTo(0, 0);
    }
    setShowModuleGateWarning(false);
  };

  const advance = () => {
    const atModuleBoundary = activeLesson === mod.lessons.length - 1 && activeMod < curriculum.length - 1;
    if (atModuleBoundary && !moduleOutroReady[mod.id]) {
      setShowModuleGateWarning(true);
      return;
    }
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
    
    window.speechSynthesis?.cancel();
    setAudioState("stopped");
    setAudioIndex(0);

    if (activeLesson < mod.lessons.length - 1) setActiveLesson(l => l + 1);
    else if (activeMod < curriculum.length - 1) { setActiveMod(m => m + 1); setActiveLesson(0); }
    mainRef.current?.scrollTo(0, 0);
  };

  const scrollLessonToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markActivityToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    setActivityLog((prev) => (prev.includes(today) ? prev : [...prev, today]));
  };

  const setCurrentLessonState = (state) => {
    setLessonStates((prev) => ({ ...prev, [lessonKey]: state }));
    markActivityToday();
  };

  const getLessonArtifactChecklist = (key = lessonKey) => {
    return artifactChecks[key] || defaultArtifactChecklist(lessonFrame);
  };

  const toggleArtifactChecklistItem = (itemId) => {
    setArtifactChecks((prev) => {
      const current = prev[lessonKey] || defaultArtifactChecklist(lessonFrame);
      const updated = current.map((item) => item.id === itemId ? { ...item, done: !item.done } : item);
      const allDone = updated.every((item) => item.done);
      if (allDone) {
        setLessonStates((old) => ({ ...old, [lessonKey]: "Artifact completed" }));
      }
      return { ...prev, [lessonKey]: updated };
    });
  };

  const addWeakConcept = () => {
    const reviewPrompt = lesson.quiz?.q || lessonFrame.reviewQuestion;
    setWeakConcepts((prev) => {
      if (prev.some((entry) => entry.lessonKey === lessonKey)) return prev;
      return [...prev, { lessonKey, lessonId: lesson.id, title: lesson.title, prompt: reviewPrompt }];
    });
  };

  const removeWeakConcept = (key) => {
    setWeakConcepts((prev) => prev.filter((entry) => entry.lessonKey !== key));
  };

  const persistNow = async () => {
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
        studyMode,
        lessonStates,
        moduleIntroSeen,
        moduleOutroReady,
        artifactChecks,
        activityLog,
        weakConcepts,
      }));
    } catch {
      // Ignore
    }
  };

  const exportProgressSnapshot = () => {
    const payload = {
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
      studyMode,
      lessonStates,
      moduleIntroSeen,
      moduleOutroReady,
      artifactChecks,
      activityLog,
      weakConcepts,
    };
    const snapshot = buildProgressSnapshot(payload);
    const blob = new Blob([snapshot], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-pm-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setImportStatus("Progress exported.");
  };

  const onImportProgressFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseProgressSnapshot(text);
    if (!parsed.ok) {
      setImportStatus(`Import failed: ${parsed.reason}`);
      return;
    }
    const { payload: d } = migrateLegacyModuleStorage(parsed.data);
    try {
      if (d.completed) setCompleted(new Set(d.completed));
      if (d.bookmarks) setBookmarks(new Set(d.bookmarks));
      if (typeof d.activeMod === "number") setActiveMod(d.activeMod);
      if (typeof d.activeLesson === "number") setActiveLesson(d.activeLesson);
      if (d.reviewChecks) setReviewChecks(d.reviewChecks);
      if (d.cohortChecks) setCohortChecks(d.cohortChecks);
      if (d.reviewEvidence) setReviewEvidence(d.reviewEvidence);
      if (d.cohortEvidence) setCohortEvidence(d.cohortEvidence);
      if (d.communityConfig) setCommunityConfig(d.communityConfig);
      if (d.communityAssignments) setCommunityAssignments(d.communityAssignments);
      if (d.capstoneChecks) setCapstoneChecks(d.capstoneChecks);
      if (typeof d.capstoneNotes === "string") setCapstoneNotes(d.capstoneNotes);
      if (d.studyMode) setStudyMode(d.studyMode);
      if (d.lessonStates) setLessonStates(d.lessonStates);
      if (d.moduleIntroSeen) setModuleIntroSeen(d.moduleIntroSeen);
      if (d.moduleOutroReady) setModuleOutroReady(d.moduleOutroReady);
      if (d.artifactChecks) setArtifactChecks(d.artifactChecks);
      if (d.activityLog) setActivityLog(d.activityLog);
      if (d.weakConcepts) setWeakConcepts(d.weakConcepts);
      setImportStatus("Progress imported successfully.");
    } catch {
      setImportStatus("Import failed: payload shape is incompatible.");
    }
  };

  const toggleBm = () => {
    const k = buildLessonStorageKey(mod, lesson.id);
    setBookmarks(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  const copyLessonToClipboard = () => {
    const sections = [];
    
    // Header
    sections.push(`# LESSON: ${lesson.title}`);
    sections.push(`Module: ${mod.title} (${mod.module} · ${mod.week})`);
    sections.push(`Type: ${lesson.type.toUpperCase()}`);
    sections.push(`ID: ${lesson.id}`);
    sections.push(`\n---`);

    // Concept
    sections.push(`\n## CONCEPT`);
    sections.push(lessonFrame.concept);

    // Key Takeaways
    if (lessonFrame.takeaways?.length > 0) {
      sections.push(`\n## KEY TAKEAWAYS`);
      lessonFrame.takeaways.forEach(k => sections.push(`→ ${k}`));
    }

    // Leadership Note
    if (lessonFrame.leadershipNote) {
      sections.push(`\n## LEADERSHIP NOTE`);
      sections.push(lessonFrame.leadershipNote);
    }

    // Tooling Lab
    if (lessonFrame.toolingLab) {
      sections.push(`\n## TOOLING LAB: ${lessonFrame.toolingLab.title}`);
      sections.push(`Tools: ${lessonFrame.toolingLab.tools.join(" | ")}`);
      lessonFrame.toolingLab.steps.forEach(step => sections.push(`• ${step}`));
      sections.push(`Artifact path: ${lessonFrame.toolingLab.artifactPath}`);
    }

    // Why This Matters
    sections.push(`\n## WHY THIS MATTERS`);
    sections.push(whyThisMatters);

    // Worked Example
    sections.push(`\n## WORKED EXAMPLE: ${workedExample.title}`);
    workedExample.bullets.forEach(entry => sections.push(`→ ${entry}`));
    if (redFlags.length > 0) {
      sections.push(`\nRed flags: ${redFlags.join(" | ")}`);
    }

    // Metadata
    sections.push(`\n## METADATA`);
    if (lessonMeta.sources) sections.push(`Sources: ${lessonMeta.sources.join(" · ")}`);
    if (lessonMeta.lastVerified) sections.push(`Verified: ${lessonMeta.lastVerified}`);
    if (lessonMeta.artifact || lessonFrame.artifactTarget) sections.push(`Artifact: ${lessonMeta.artifact || lessonFrame.artifactTarget}`);
    sections.push(`Review question: ${lessonFrame.reviewQuestion}`);

    const fullContent = sections.join("\n");
    
    navigator.clipboard.writeText(fullContent).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const getAudioChunks = () => {
    const rawChunks = [
      `Lesson Overview: ${lesson.title}`,
      `Concept. ${lessonFrame.concept}`,
      lessonFrame.takeaways?.length ? `Key Takeaways. ` + lessonFrame.takeaways.join(" ") : "",
      lessonFrame.leadershipNote ? `Leadership Note. ${lessonFrame.leadershipNote}` : "",
      `Why this matters. ${whyThisMatters}`
    ];
    return rawChunks.filter(Boolean).map(c => c.replace(/\*/g, '').replace(/`/g, '').replace(/#/g, ''));
  };

  const playChunk = (index) => {
    const chunks = getAudioChunks();
    if (index >= chunks.length) {
      setAudioState("stopped");
      setAudioIndex(0);
      return;
    }
    window.speechSynthesis?.cancel();
    setAudioIndex(index);
    setAudioState("playing");

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.onend = () => {
      // Browsers often fire onend when canceled, so we check if it finished naturally
      if (window.speechSynthesis.pending || window.speechSynthesis.speaking) return;
      playChunk(index + 1);
    };
    window.speechSynthesis?.speak(utterance);
  };

  const pauseAudio = () => {
    window.speechSynthesis?.pause();
    setAudioState("paused");
  };

  const resumeAudio = () => {
    window.speechSynthesis?.resume();
    setAudioState("playing");
  };

  const stopAudio = () => {
    window.speechSynthesis?.cancel();
    setAudioState("stopped");
    setAudioIndex(0);
  };

  const nextChunk = () => {
    const chunks = getAudioChunks();
    if (audioIndex < chunks.length - 1) playChunk(audioIndex + 1);
  };

  const prevChunk = () => {
    if (audioIndex > 0) playChunk(audioIndex - 1);
    else playChunk(0);
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
  if (view === "toolmap") return <ToolMapView onBack={() => setView("learn")} />;
  if (view === "stack") return <MustAddToolsView onBack={() => setView("learn")} />;
  if (view === "exec") return <ExecutiveTrackView onBack={() => setView("learn")} />;
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
  if (view === "changelog") return <ChangelogView onBack={() => setView("learn")} />;
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
        onSave={persistNow}
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
        onSave={persistNow}
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
        onSave={persistNow}
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
        onSave={persistNow}
      />
    );
  }
  if (view === "outline") {
    return (
      <OutlineView
        onBack={() => setView("learn")}
        curriculum={curriculum}
        isDone={isDone}
        goTo={navigateToLesson}
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
          {/* Always-visible primary utilities */}
          <button className="btn-outline" onClick={() => { setShowSearch(s => !s); setShowViewsMenu(false); }}>⌕ SEARCH</button>
          <button className="btn-outline" onClick={exportProgressSnapshot} style={{ color: "#7BE0AD", borderColor: "#7BE0AD44" }}>EXPORT</button>
          <button className="btn-outline" onClick={() => importFileRef.current?.click()} style={{ color: "#7BB8FF", borderColor: "#7BB8FF44" }}>IMPORT</button>
          <input ref={importFileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={onImportProgressFile} />

          {/* Mega-menu trigger */}
          <div style={{ position: "relative" }}>
            <button
              className="btn-outline"
              onClick={() => { setShowViewsMenu(s => !s); setShowSearch(false); }}
              style={{
                color: showViewsMenu ? '#fff' : '#B0B0C8',
                borderColor: showViewsMenu ? 'rgba(255,255,255,0.3)' : 'var(--border-light)',
                background: showViewsMenu ? 'rgba(255,255,255,0.08)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ fontSize: 15, lineHeight: 1 }}>≡</span> VIEWS &amp; TOOLS
            </button>

            {showViewsMenu && (
              <div
                style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'rgba(12,12,22,0.97)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)', borderRadius: 6, padding: '18px 20px',
                  zIndex: 1000, minWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px',
                }}
              >
                {/* Close on outside click via overlay */}
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: -1 }}
                  onClick={() => setShowViewsMenu(false)}
                />

                {/* CORE VIEWS */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: '#FF3B5C', fontFamily: 'var(--font-mono)', marginBottom: 10, fontWeight: 700 }}>CORE VIEWS</div>
                  {[
                    { label: 'Review Loop',   view: 'reviews',   color: '#FF3B5C' },
                    { label: 'Cohort Sim',    view: 'cohort',    color: '#7A5CFF' },
                    { label: 'Community Ops', view: 'community', color: '#2ED3B7' },
                    { label: 'Course Outline',view: 'outline',   color: '#B0B0C8' },
                    { label: 'Capstone',      view: 'capstone',  color: '#00D2FF' },
                  ].map(({ label, view, color }) => (
                    <button key={view} onClick={() => { setView(view); setShowViewsMenu(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0', color, fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* TOOLING & LABS */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: '#20C997', fontFamily: 'var(--font-mono)', marginBottom: 10, fontWeight: 700 }}>TOOLING &amp; LABS</div>
                  {[
                    { label: 'Tool Map',  view: 'toolmap',   color: '#20C997' },
                    { label: 'Eval Lab',  view: 'tools',     color: '#00E676' },
                    { label: 'Vendor Stack', view: 'stack',  color: '#FF7A59' },
                    { label: 'Templates', view: 'templates', color: '#F5C542' },
                    { label: 'Ops Starter',  view: 'ops',   color: '#8FB9FF' },
                  ].map(({ label, view, color }) => (
                    <button key={view} onClick={() => { setView(view); setShowViewsMenu(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0', color, fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* DATA & AUDITING */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: '#00C8FF', fontFamily: 'var(--font-mono)', marginBottom: 10, fontWeight: 700 }}>DATA &amp; AUDITING</div>
                  {[
                    { label: 'Audit Log',    view: 'audit',    color: '#00C8FF' },
                    { label: 'Live Baseline',view: 'live',     color: '#0099FF' },
                    { label: 'Changelog',    view: 'changelog',color: '#4BC8FF' },
                    { label: 'Coverage Map', view: 'coverage', color: '#12C48B' },
                    { label: 'Sources',      view: 'sources',  color: '#FF6B35' },
                  ].map(({ label, view, color }) => (
                    <button key={view} onClick={() => { setView(view); setShowViewsMenu(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0', color, fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* REFERENCE */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: '#C589FF', fontFamily: 'var(--font-mono)', marginBottom: 10, fontWeight: 700 }}>REFERENCE</div>
                  {[
                    { label: 'Cheatsheets',    view: 'cheatsheets', color: '#C589FF' },
                    { label: 'Glossary',       view: 'glossary',    color: '#B0B0C8' },
                    { label: 'Executive Track',view: 'exec',        color: '#7A5CFF' },
                  ].map(({ label, view, color }) => (
                    <button key={view} onClick={() => { setView(view); setShowViewsMenu(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0', color, fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
                <button key={i} onClick={() => { navigateToLesson(r.mi, r.li); setShowSearch(false); setSearchTerm(""); setSearchResults([]); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0", cursor: "pointer", fontFamily: "inherit", borderBottom: '1px solid var(--border-light)' }}>
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
                const key = lk(mi, li);
                const state = lessonStates[key] || LESSON_PROGRESS_STATES[0];
                const runtime = lessonRuntimeEstimate(l);
                return (
                  <button 
                    key={l.id} 
                    className={`lesson-nav-btn ${isActive ? 'active' : ''}`} 
                    onClick={() => navigateToLesson(mi, li)}
                    style={{ borderLeftColor: isActive ? m.accent : 'transparent' }}
                  >
                    <div className="checkbox" style={{ borderColor: done ? m.accent : 'var(--border-light)', background: done ? m.accent : 'transparent' }}>
                      {done ? "✓" : ""}
                    </div>
                    <span className="lesson-title" style={{ color: done && !isActive ? 'var(--text-muted)' : '' }}>
                      <span>{l.title}</span>
                      <span style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>
                        {runtime.readMin}m read {runtime.exerciseMin ? `+ ${runtime.exerciseMin}m lab` : ""}
                      </span>
                      <span style={{ display: "inline-block", marginTop: 4 }}>
                        <FreshnessBadge
                          meta={buildLessonMetadata({
                            lesson: l,
                            moduleTitle: m.title,
                            benchmarkDate: COURSE_BENCHMARK.auditDate,
                          })}
                          compact
                        />
                      </span>
                      <span style={{ display: "inline-block", fontSize: 10, marginTop: 5, color: "#8CC6FF" }}>{state}</span>
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {Object.values(STUDY_MODES).map((mode) => (
                <button
                  key={mode.id}
                  className="btn-outline"
                  onClick={() => setStudyMode(mode.id)}
                  style={{
                    color: studyMode === mode.id ? "#fff" : "#8A8A8A",
                    borderColor: studyMode === mode.id ? `${mod.accent}77` : "var(--border-light)",
                    background: studyMode === mode.id ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                >
                  {mode.label}
                </button>
              ))}
              <button className="btn-outline" onClick={() => readingStartRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ color: "#C9D2E3" }}>
                ↓ JUMP TO CONTENT
              </button>
              <button className="btn-outline" onClick={() => { markActivityToday(); setStreakSecured(true); setTimeout(() => setStreakSecured(false), 2000); }} style={{ color: streakSecured ? "#00E676" : "#D7E08A" }}>
                {streakSecured ? "✓ STREAK SECURED" : `CONTINUE STREAK (${streakDays}d)`}
              </button>
            </div>
            {importStatus && (
              <div style={{ marginTop: 8, fontSize: 11, color: "#9AB2CC" }}>{importStatus}</div>
            )}
          </div>

          <div className="breadcrumb">
            <span style={{ color: mod.accent, fontWeight: 600 }}>{mod.module}</span>
            <span style={{ color: "var(--text-muted)" }}>›</span>
            <span style={{ color: "var(--text-secondary)" }}>{lesson.id}</span>
            <span className="tag-badge" style={{ color: mod.accent, borderColor: `${mod.accent}55` }}>
              {lesson.type.toUpperCase()}
            </span>
            <button 
              className="btn-outline" 
              onClick={copyLessonToClipboard}
              style={{ 
                fontSize: 10, 
                padding: "2px 8px", 
                marginLeft: "auto", 
                marginRight: 8,
                borderColor: copyFeedback ? "#00E676" : "var(--border-light)",
                color: copyFeedback ? "#00E676" : "inherit"
              }}
            >
              {copyFeedback ? "✓ COPIED" : "COPY LESSON"}
            </button>
            {audioState === "stopped" ? (
              <button 
                className="btn-outline" 
                onClick={() => playChunk(0)}
                style={{ fontSize: 10, padding: "2px 8px", marginRight: 8, borderColor: "var(--border-light)", color: "inherit" }}
              >
                ▶ READ OVERVIEW
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginRight: 8, background: "rgba(255,59,92,0.1)", border: "1px solid #FF3B5C", padding: "2px 6px", borderRadius: 4 }}>
                <span style={{ fontSize: 9, color: "#FF3B5C", marginRight: 4, fontFamily: "var(--font-mono)" }}>[{audioIndex + 1}/{getAudioChunks().length}]</span>
                <button onClick={prevChunk} style={{ background: "none", border: "none", color: "#FF3B5C", cursor: "pointer", fontSize: 10, padding: "0 4px" }}>⏮</button>
                {audioState === "playing" ? (
                  <button onClick={pauseAudio} style={{ background: "none", border: "none", color: "#FF3B5C", cursor: "pointer", fontSize: 10, padding: "0 4px" }}>⏸</button>
                ) : (
                  <button onClick={resumeAudio} style={{ background: "none", border: "none", color: "#FF3B5C", cursor: "pointer", fontSize: 10, padding: "0 4px" }}>▶</button>
                )}
                <button onClick={nextChunk} style={{ background: "none", border: "none", color: "#FF3B5C", cursor: "pointer", fontSize: 10, padding: "0 4px" }}>⏭</button>
                <button onClick={stopAudio} style={{ background: "none", border: "none", color: "#FF3B5C", cursor: "pointer", fontSize: 10, padding: "0 4px", marginLeft: 4 }}>■</button>
              </div>
            )}
            <button onClick={toggleBm} style={{ background: "none", border: "none", color: isBm() ? "#FFB800" : "var(--text-muted)", cursor: "pointer", fontSize: 20, padding: 0 }}>{isBm() ? "★" : "☆"}</button>
          </div>

          <h1 className="heading-primary">{lesson.title}</h1>
          <div style={{ marginBottom: 10 }}>
            <FreshnessBadge meta={lessonMeta} />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
            <span>{STUDY_MODES[studyMode].label}</span>
            <span>·</span>
            <span>{lessonRuntime.readMin}m read + {lessonRuntime.exerciseMin}m exercise</span>
            <span>·</span>
            <span style={{ color: "#8CC6FF" }}>{lessonProgressState}</span>
          </div>

          {activeLesson === 0 && !moduleIntroSeen[mod.id] && (
            <div className="takeaways-box" style={{ borderLeftColor: "#00B2FF" }}>
              <div className="takeaways-title" style={{ color: "#00B2FF" }}>MODULE INTRO</div>
              <div className="takeaway-item"><span>→</span><span>Outcome: Build practical capability across {mod.title}.</span></div>
              <div className="takeaway-item"><span>→</span><span>Artifact: Submit at least one review-ready output from this module.</span></div>
              <div className="takeaway-item"><span>→</span><span>Relevance: Decisions here directly shape AI quality, cost, and trust.</span></div>
              <button className="btn-outline" onClick={() => setModuleIntroSeen((prev) => ({ ...prev, [mod.id]: true }))} style={{ marginTop: 8, color: "#AEE6FF", borderColor: "#00B2FF44" }}>
                START MODULE
              </button>
            </div>
          )}

          <div ref={readingStartRef} style={{ scrollMarginTop: 80 }}></div>
          <div className="reading-content">
            {renderText(lessonFrame.concept)}
          </div>

          {/* Key takeaways */}
          {lessonFrame.takeaways?.length > 0 && (
            <div className="takeaways-box" style={{ borderLeftColor: mod.accent }}>
              <div className="takeaways-title" style={{ color: mod.accent }}>KEY TAKEAWAYS</div>
              {lessonFrame.takeaways.map((k, i) => (
                <div key={i} className="takeaway-item">
                  <span style={{ color: mod.accent, fontSize: '14px', marginTop: '1px' }}>→</span>
                  <span>{k}</span>
                </div>
              ))}
            </div>
          )}

          {studyMode !== "fast" && lessonFrame.leadershipNote && (
            <div className="exercise-box" style={{ borderLeftColor: "#7A5CFF", marginBottom: 14 }}>
              <div className="exercise-title" style={{ color: "#7A5CFF" }}>LEADERSHIP NOTE</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {lessonFrame.leadershipNote}
              </div>
            </div>
          )}

          {studyMode === "deep" && lessonFrame.toolingLab && (
            <div className="exercise-box" style={{ borderLeftColor: "#20C997", marginBottom: 14 }}>
              <div className="exercise-title" style={{ color: "#20C997" }}>
                {lessonFrame.toolingLab.title}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Tools: {lessonFrame.toolingLab.tools.join(" | ")}
              </div>
              {lessonFrame.toolingLab.steps.map((step) => (
                <div key={step} className="takeaway-item">
                  <span style={{ color: "#20C997", fontSize: "12px", marginTop: "2px" }}>•</span>
                  <span style={{ color: "var(--text-secondary)" }}>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
                Artifact path: <code>{lessonFrame.toolingLab.artifactPath}</code>
              </div>
            </div>
          )}

          <div className="takeaways-box" style={{ borderLeftColor: "#F7AD42", marginTop: 10 }}>
            <div className="takeaways-title" style={{ color: "#F7AD42" }}>WHY THIS MATTERS</div>
            <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{whyThisMatters}</div>
          </div>

          {studyMode !== "fast" && (
            <div className="takeaways-box" style={{ borderLeftColor: "#7CD992", marginTop: 10 }}>
              <div className="takeaways-title" style={{ color: "#7CD992" }}>{workedExample.title}</div>
              {workedExample.bullets.map((entry) => (
                <div key={entry} className="takeaway-item">
                  <span style={{ color: "#7CD992", fontSize: "13px" }}>→</span>
                  <span>{entry}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, fontSize: 12, color: "#D48484" }}>
                Red flags: {redFlags.join(" | ")}
              </div>
            </div>
          )}

          <div className="takeaways-box" style={{ borderLeftColor: "#50C9FF", marginTop: 10 }}>
            <div className="takeaways-title" style={{ color: "#50C9FF" }}>LESSON STATE</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {LESSON_PROGRESS_STATES.map((state) => (
                <button
                  key={state}
                  className="btn-outline"
                  onClick={() => setCurrentLessonState(state)}
                  style={{
                    color: lessonProgressState === state ? "#fff" : "#8EAAC5",
                    borderColor: lessonProgressState === state ? "#50C9FF66" : "var(--border-light)",
                    background: lessonProgressState === state ? "rgba(80,201,255,0.12)" : "transparent",
                  }}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          <div className="takeaways-box" style={{ borderLeftColor: "#00E676", padding: "16px 24px" }}>
            <div className="takeaways-title" style={{ color: "#00E676" }}>COURSE OUTPUT TARGETS</div>
            {ARTIFACT_TRACKS.map((track, i) => (
              <div key={i} className="takeaway-item" style={{ marginBottom: 4 }}>
                <span style={{ color: "#00E676", fontSize: '12px', marginTop: '3px' }}>{i + 1}.</span>
                <span style={{ color: "var(--text-secondary)" }}>{track}</span>
              </div>
            ))}
          </div>

          {studyMode === "deep" && (
            <div className="takeaways-box" style={{ borderLeftColor: "#C589FF", marginTop: 10 }}>
              <div className="takeaways-title" style={{ color: "#C589FF" }}>ARTIFACT CHECKLIST</div>
              {getLessonArtifactChecklist().map((item) => (
                <label key={item.id} className="takeaway-item" style={{ alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleArtifactChecklistItem(item.id)}
                    style={{ marginTop: 2 }}
                  />
                  <span>{item.label} <span style={{ color: "var(--text-muted)" }}>({item.target})</span></span>
                </label>
              ))}
            </div>
          )}

          {weakConcepts.length > 0 && (
            <div className="takeaways-box" style={{ borderLeftColor: "#FF7C7C", marginTop: 10 }}>
              <div className="takeaways-title" style={{ color: "#FF7C7C" }}>SPACED REVIEW QUEUE</div>
              {weakConcepts.map((item) => (
                <div key={item.lessonKey} className="takeaway-item" style={{ alignItems: "center" }}>
                  <span style={{ color: "#FF7C7C", fontSize: 11 }}>●</span>
                  <span style={{ flex: 1 }}>{item.lessonId}: {item.prompt}</span>
                  <button className="btn-outline" onClick={() => removeWeakConcept(item.lessonKey)} style={{ fontSize: 10 }}>DONE</button>
                </div>
              ))}
            </div>
          )}

          {/* Lesson metadata panel */}
          <div className="metadata-panel">
            <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>LESSON METADATA</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {lessonMeta.sources && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Sources:</span> {lessonMeta.sources.join(" · ")}</div>}
              {lessonMeta.lastVerified && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Verified:</span> {lessonMeta.lastVerified}</div>}
              {(lessonMeta.artifact || lessonFrame.artifactTarget) && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Artifact:</span> {lessonMeta.artifact || lessonFrame.artifactTarget}</div>}
              {lessonMeta.rubric && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Rubric:</span> {lessonMeta.rubric.join(" | ")}</div>}
              {lessonMeta.failureModes && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Failure modes:</span> {lessonMeta.failureModes.join(" | ")}</div>}
              {lessonMeta.redTeam && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Red team:</span> {lessonMeta.redTeam.join(" | ")}</div>}
              <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Review question:</span> {lessonFrame.reviewQuestion}</div>
            </div>
          </div>

          {/* Quiz */}
          {studyMode !== "executive" && lesson.quiz && (
            <button onClick={() => { setShowQuiz(s => !s); setShowQuizA(false); }} className="apply-btn" style={{ borderColor: showQuiz ? "#8B00FF" : 'var(--border-light)', color: showQuiz ? "#8B00FF" : 'var(--text-primary)' }}>
              <span style={{ fontSize: '10px' }}>{showQuiz ? "▼" : "▶"}</span> SELF-TEST QUIZ
            </button>
          )}
          {studyMode !== "executive" && showQuiz && lesson.quiz && (
            <div className="exercise-box" style={{ borderLeftColor: "#8B00FF" }}>
              <div style={{ fontSize: 16, color: "#D0C8E8", lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>{lesson.quiz.q}</div>
              <div style={{ fontSize: 12, color: "#9FA5D8", marginBottom: 12 }}>
                Pre-quiz cue: write your expected answer first, then compare after reveal.
              </div>
              {!showQuizA ? (
                <button onClick={() => setShowQuizA(true)} className="btn-outline" style={{ background: "#8B00FF", color: "#fff", borderColor: '#8B00FF' }}>REVEAL ANSWER</button>
              ) : (
                <div>
                  <div style={{ fontSize: 15, color: "#A088C8", lineHeight: 1.6, borderTop: "1px solid var(--border-color)", paddingTop: 16, marginTop: 16 }}>{lesson.quiz.a}</div>
                  <div style={{ fontSize: 12, color: "#C6B3E8", marginTop: 10 }}>
                    Post-quiz recap: summarize where your answer differed and one corrective action.
                  </div>
                  <button className="btn-outline" onClick={addWeakConcept} style={{ marginTop: 8, borderColor: "#B171FF66", color: "#C9A3FF" }}>
                    ADD TO REVIEW QUEUE
                  </button>
                </div>
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
                {renderText(lessonFrame.apply)}
              </div>
            </div>
          )}

          {activeLesson === mod.lessons.length - 1 && (
            <div className="takeaways-box" style={{ borderLeftColor: "#00D2FF", marginTop: 12 }}>
              <div className="takeaways-title" style={{ color: "#00D2FF" }}>MODULE OUTRO GATE</div>
              <div className="takeaway-item"><span>→</span><span>Progress summary: {mod.lessons.filter((_, li) => isDone(activeMod, li)).length}/{mod.lessons.length} lessons marked complete.</span></div>
              <div className="takeaway-item"><span>→</span><span>Artifact checklist: {getLessonArtifactChecklist().filter((item) => item.done).length}/{getLessonArtifactChecklist().length} done.</span></div>
              <div className="takeaway-item"><span>→</span><span>Review gate: {isModuleReviewComplete(mod.id) ? "complete" : "pending"} · Cohort gate: {isModuleCohortComplete(mod.id) ? "complete" : "pending"}.</span></div>
              <button
                className="btn-outline"
                onClick={() => setModuleOutroReady((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                style={{ marginTop: 8, color: moduleOutroReady[mod.id] ? "#9BF0C2" : "#B4CFFF", borderColor: moduleOutroReady[mod.id] ? "#2BD68B55" : "#4B8BEA55" }}
              >
                {moduleOutroReady[mod.id] ? "READY FOR NEXT MODULE ✓" : "MARK READY FOR NEXT MODULE"}
              </button>
            </div>
          )}
          {showModuleGateWarning && (
            <div style={{ marginTop: 12, fontSize: 12, color: "#FFB3B3", border: "1px solid #512323", background: "#1A0D0D", padding: "10px 12px" }}>
              Complete the module outro gate before advancing to the next module.
            </div>
          )}

          {/* Nav */}
          <nav className="nav-footer">
            <button 
              className="btn-nav btn-prev" 
              onClick={() => {
                if (activeLesson > 0) navigateToLesson(activeMod, activeLesson - 1, { scrollBehavior: "top" });
                else if (activeMod > 0) { navigateToLesson(activeMod - 1, curriculum[activeMod - 1].lessons.length - 1, { scrollBehavior: "top" }); }
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
          {showBackToTop && (
            <button
              className="back-to-top-btn"
              onClick={scrollLessonToTop}
              aria-label="Back to top of lesson"
            >
              ↑ TOP
            </button>
          )}
        </div>
        </main>
      </div>
    </div>
  );
}

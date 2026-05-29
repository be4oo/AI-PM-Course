/**
 * CourseShell v1 — editorial-dark, reading-first course experience.
 *
 * Spec/plan refs:
 *   - FR-001 / FR-024 three-column shell with two-col 768–1023 + single <768
 *   - FR-006 / FR-007 navigate / scroll-to-section
 *   - FR-011 modal scroll restore (owned by ToolModal frame)
 *   - FR-017 single Mark-complete affordance in the reading column
 *   - FR-018 persistence (delegated to legacy App.jsx setters in v1)
 *   - FR-028 RTL parity via logical-property CSS
 *   - Plan §Structure Decision: mount point that delegates ONLY the
 *     view==="learn" branch from App.jsx; non-learn views unaffected.
 *
 * v1 scope: enough to ship US1's MVP. Sidebar, header, tools, palette, and
 * tweaks are stubbed slots; later phases plug them in. The reading column
 * and the right-rail outline are live so a learner can read a lesson with a
 * working scroll-tracked outline today.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ReadingColumn } from "./shell/ReadingColumn.jsx";
import { RightRail } from "./shell/RightRail.jsx";
import { Sidebar } from "./shell/Sidebar.jsx";
import { Header } from "./shell/Header.jsx";
import { MobileDrawer } from "./shell/MobileDrawer.jsx";
import { useMediaQuery } from "./hooks/useMediaQuery.js";
import { scrollToSection } from "./shell/scrollToSection.js";
import { useActiveLesson } from "./hooks/useActiveLesson.js";
import { useScrollOutline } from "./hooks/useScrollOutline.js";
import { useTweaks } from "./hooks/useTweaks.js";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts.js";
import { outlineFromLesson } from "./lib/outlineFromLesson.js";
import { migrateLegacyStorage } from "./lib/legacyStorageMigration.js";
import { buildSnapshot } from "./lib/progressSnapshot.js";
import { ToolModal } from "./tools/ToolModal.jsx";
import { findPracticeTool } from "./tools/practiceTools.js";
import { ProfileModal } from "./account/ProfileModal.jsx";
import { ImportProgressModal } from "./account/ImportProgressModal.jsx";
import { ShortcutsModal } from "./account/ShortcutsModal.jsx";
import { TweaksPanel } from "./tweaks/TweaksPanel.jsx";
import { CommandPalette } from "./palette/CommandPalette.jsx";
// CSS module is imported for its side-effect of bundling; class names that
// matter to layout are referenced inline below.
import styles from "./styles/course.module.css";
// Token CSS is imported for its side-effect — it defines :where(.course-shell)
// variables; needs to be loaded before the shell renders.
import "./styles/tokens.css";

export function CourseShell({
  curriculum = [],
  activeMod = 0,
  activeLesson = 0,
  onNavigateLesson,
  completed,
  setCompleted,
  bookmarks,
  setBookmarks,
  studyMode = "deep",
  setStudyMode,
  // Phase 6 additions for US4 (header + account)
  cohortLabel = "Cohort 4 · Spring '26",
  streakDays,
  /** Open a legacy non-learn view via App.jsx setView. */
  openLegacyView,
  /** Sign-out hook supplied by App.jsx (no-op if absent). */
  onSignOut,
  // Slots — host can override.
  headerSlot,
  sidebarSlot,
  // markCompleteSlot is consumed by Sidebar internally now; left in the API
  // so a future test/host can inject a custom affordance if needed.
  markCompleteSlot,
}) {
  // ----- One-time legacy storage migration (T081) -----
  const didMigrate = useRef(false);
  useEffect(() => {
    if (didMigrate.current) return;
    didMigrate.current = true;
    migrateLegacyStorage({ curriculum });
  }, [curriculum]);

  // ----- Tweaks live-swap -----
  const shellRef = useRef(null);
  // useTweaks writes data-* attrs onto the supplied ref's current element
  // AND exposes a setter so the TweaksPanel can drive live changes.
  const [tweaks, setTweaks] = useTweaks(shellRef);

  // ----- Active lesson / navigation -----
  const navigateToLessonAdapter = useMemo(
    () => onNavigateLesson ?? (() => {}),
    [onNavigateLesson],
  );
  const active = useActiveLesson({
    curriculum,
    activeMod,
    activeLesson,
    navigateToLesson: navigateToLessonAdapter,
  });
  const moduleObj = curriculum[active.moduleIndex];
  const lesson = moduleObj?.lessons?.[active.lessonIndex] ?? null;

  // Prev / next lesson neighbours (cross-module) for the reading-column footer.
  const { prevLesson, nextLesson } = useMemo(
    () => ({
      prevLesson: neighbourLesson(curriculum, active.moduleIndex, active.lessonIndex, -1),
      nextLesson: neighbourLesson(curriculum, active.moduleIndex, active.lessonIndex, +1),
    }),
    [curriculum, active.moduleIndex, active.lessonIndex],
  );

  // ----- Outline state -----
  const outlineEntries = useMemo(() => outlineFromLesson(lesson), [lesson]);
  const observedSectionId = useScrollOutline({ entries: outlineEntries });
  // Effective active section: hash override (when present) else what the
  // observer last reported.
  const activeSectionId = active.sectionId ?? observedSectionId;

  // ----- Right-rail lesson-action state -----
  const [copyFeedback, setCopyFeedback] = useState(false);
  const isBookmarked = useMemo(() => {
    if (!lesson || !bookmarks) return false;
    if (bookmarks instanceof Set) return bookmarks.has(lesson.id);
    if (Array.isArray(bookmarks)) return bookmarks.includes(lesson.id);
    return false;
  }, [bookmarks, lesson]);

  const onToggleBookmark = () => {
    if (!lesson || typeof setBookmarks !== "function") return;
    setBookmarks((prev) => {
      const set = prev instanceof Set ? new Set(prev) : new Set(prev ?? []);
      if (set.has(lesson.id)) set.delete(lesson.id);
      else set.add(lesson.id);
      return set;
    });
  };

  // ----- Single Mark-complete affordance (FR-017) -----
  // The reading-column footer is the ONLY place a learner toggles completion.
  // The sidebar's status dot is a passive indicator, not a control. The legacy
  // checkbox/radio/module-outro-gate trio is bypassed entirely by this branch.
  const completedSet = useMemo(() => {
    if (completed instanceof Set) return completed;
    if (Array.isArray(completed)) return new Set(completed);
    return new Set();
  }, [completed]);
  const isComplete = lesson ? completedSet.has(lesson.id) : false;
  const onToggleComplete = () => {
    if (!lesson || typeof setCompleted !== "function") return;
    setCompleted((prev) => {
      const set = prev instanceof Set ? new Set(prev) : new Set(prev ?? []);
      if (set.has(lesson.id)) set.delete(lesson.id);
      else set.add(lesson.id);
      return set;
    });
  };
  const resolvedMarkCompleteSlot =
    markCompleteSlot !== undefined
      ? markCompleteSlot
      : lesson
      ? (
          <MarkCompleteButton
            isComplete={isComplete}
            onToggle={onToggleComplete}
            lessonTitle={lesson.title ?? lesson.id ?? "this lesson"}
          />
        )
      : null;
  const onCopyLink = async () => {
    if (typeof window === "undefined" || !lesson) return;
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 1500);
    } catch {
      /* best-effort; some browsers reject without https/user-gesture */
    }
  };

  // ----- Practice-tool modal orchestration -----
  //
  // FR-016 invariant: only one modal is open at any moment. The
  // single-source `activeToolId` state guarantees the close-then-open swap:
  // calling openTool(B) while A is open replaces the id atomically, which
  // unmounts A's ToolModal and mounts B's in one commit. No double-modal
  // window is possible.
  //
  // openTool refuses unknown ids (FR-002): the registry is the only source
  // of truth for which tools may exist. The `openedFrom` parameter is kept
  // for future telemetry / focus-restore tweaks; ignored in v1.
  const [activeToolId, setActiveToolId] = useState(null);
  const openTool = (toolId /* , openedFrom = "sidebar" */) => {
    const tool = findPracticeTool(toolId);
    if (!tool) return;
    setActiveToolId(toolId); // swap-then-open at the React-state level
  };
  const closeTool = () => setActiveToolId(null);
  const activeTool = activeToolId ? findPracticeTool(activeToolId) : null;
  const activeToolTitleId = activeTool ? `tool-${activeTool.id}-title` : undefined;

  // Click handler for nodes inside the Knowledge map and Capstone gating
  // links: navigate and close the modal.
  const jumpToLessonAndClose = (lessonId) => {
    if (!curriculum) return;
    for (let m = 0; m < curriculum.length; m++) {
      const lessons = curriculum[m]?.lessons ?? [];
      const li = lessons.findIndex((l) => l.id === lessonId);
      if (li !== -1) {
        navigateToLessonAdapter(m, li);
        closeTool();
        return;
      }
    }
  };

  // Tool-specific prop bag. Each tool ignores props it doesn't use.
  const toolProps = {
    titleId: activeToolTitleId,
    label: activeTool?.label,
    description: activeTool?.description,
    onClose: closeTool,
    curriculum,
    completedLessonIds: completed,
    onJumpToLesson: jumpToLessonAndClose,
    // Spaced review queue is not yet sourced — empty queue triggers the
    // modal's empty state (Phase 8 / capstone work plugs in the real
    // review-queue hook).
    queue: [],
  };

  // ----- Responsive tiers + mobile drawers (FR-024) -----
  // The CSS module hides the sidebar <768px and the right rail <1024px; these
  // tiers drive the off-canvas drawers that surface them so a phone user can
  // still navigate, open tools, and read the outline. Defaults assume desktop
  // (matchMedia absent in SSR/jsdom) so existing desktop tests are unaffected.
  const sidebarInline = useMediaQuery("(min-width: 768px)", true);
  const outlineInline = useMediaQuery("(min-width: 1024px)", true);
  const [mobileDrawer, setMobileDrawer] = useState(null); // "nav" | "outline" | null
  const closeMobileDrawer = () => setMobileDrawer(null);
  // Auto-close a drawer once its column becomes inline again (e.g. on rotate).
  useEffect(() => {
    if (sidebarInline && mobileDrawer === "nav") setMobileDrawer(null);
    if (outlineInline && mobileDrawer === "outline") setMobileDrawer(null);
  }, [sidebarInline, outlineInline, mobileDrawer]);

  // ----- Palette + account modals -----
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [accountModal, setAccountModal] = useState(null); // "profile"|"import"|"shortcuts"|"tweaks"|null
  const closeAccountModal = () => setAccountModal(null);

  const known = useMemo(() => {
    const set = new Set();
    for (const mod of curriculum) {
      for (const lesson of mod.lessons ?? []) set.add(lesson.id);
    }
    return set;
  }, [curriculum]);

  function handleExport() {
    if (typeof window === "undefined") return;
    const snapshot = buildSnapshot({
      completedLessonIds: completed instanceof Set ? [...completed] : (completed ?? []),
      bookmarkedLessonIds: bookmarks instanceof Set ? [...bookmarks] : (bookmarks ?? []),
      lastReadLessonId: active.lessonId,
      studyMode,
      tweaks,
      streak: { current: streakDays ?? 0, best: streakDays ?? 0, lastReadDate: null },
    });
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-pm-course-progress-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function handleImport(parsedState) {
    // Apply parsed snapshot to the legacy setters (completed/bookmarks)
    // plus shell-level setters (studyMode/tweaks). The CourseShell does not
    // own activeLesson — App.jsx still owns that — so we re-derive the
    // (mod, lesson) indices from `lastReadLessonId` and call
    // navigateToLessonAdapter.
    if (parsedState.completedLessonIds && typeof setCompleted === "function") {
      setCompleted(new Set(parsedState.completedLessonIds));
    }
    if (parsedState.bookmarkedLessonIds && typeof setBookmarks === "function") {
      setBookmarks(new Set(parsedState.bookmarkedLessonIds));
    }
    if (parsedState.studyMode && typeof setStudyMode === "function") {
      setStudyMode(parsedState.studyMode);
    }
    if (parsedState.tweaks) setTweaks(parsedState.tweaks);
    if (parsedState.lastReadLessonId) {
      // Find (mod, lesson) and navigate.
      for (let m = 0; m < curriculum.length; m++) {
        const li = (curriculum[m].lessons ?? []).findIndex((l) => l.id === parsedState.lastReadLessonId);
        if (li !== -1) {
          navigateToLessonAdapter(m, li);
          break;
        }
      }
    }
  }

  function handleAccountSelect(itemId) {
    if (itemId === "profile")   return setAccountModal("profile");
    if (itemId === "export")    return handleExport();
    if (itemId === "import")    return setAccountModal("import");
    if (itemId === "display")   return setAccountModal("tweaks");
    if (itemId === "shortcuts") return setAccountModal("shortcuts");
    if (itemId === "sign-out")  return onSignOut?.();
  }

  function handlePickLesson(lessonId) {
    setPaletteOpen(false);
    jumpToLessonAndClose(lessonId);
  }
  function handlePickSection(lessonId /*, sectionId */) {
    setPaletteOpen(false);
    jumpToLessonAndClose(lessonId);
  }
  function handlePickLegacyView(viewId) {
    setPaletteOpen(false);
    openLegacyView?.(viewId);
  }

  // Account modals are mounted into the same shared ToolModal frame
  // (FR-016 single-modal invariant). The shell ensures at most ONE of
  // {activeToolId, accountModal, paletteOpen} is meaningfully open at any
  // moment — the precedence below is documented:
  //   1. activeToolId      (Practice tool — modal)
  //   2. accountModal      (Profile / Import / Shortcuts / Tweaks)
  //   3. paletteOpen       (⌘K palette)
  const accountModalIsOpen = !!accountModal;
  const anyModalOpen = !!activeToolId || accountModalIsOpen || paletteOpen;

  // ----- Practice / Self-test disclosure toggles (e / q) -----
  // The legacy curriculum carries `apply` and `quiz` blocks per lesson; the
  // editorial-dark reading column does not yet render them inline (deferred).
  // Phase 7 plugs the shortcuts in so the contract holds when the disclosures
  // land — for now they toggle local state that surfaces via dispatched
  // CustomEvents so a future component can subscribe without a re-wire.
  const [showApply, setShowApply] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // ----- Next / Previous lesson navigation (j / k) -----
  // Crosses module boundaries per FR-019 + Contract keyboard-shortcuts.md.
  // Returns false if we're already at the boundary (no wrap), so a future
  // visual nudge can surface that fact.
  const goRelative = (direction) => {
    if (!curriculum?.length) return false;
    let m = active.moduleIndex;
    let l = active.lessonIndex + direction;
    while (curriculum[m]) {
      const lessons = curriculum[m].lessons ?? [];
      if (l >= 0 && l < lessons.length) {
        navigateToLessonAdapter(m, l);
        return true;
      }
      if (direction > 0) {
        m += 1;
        l = 0;
      } else {
        m -= 1;
        l = (curriculum[m]?.lessons?.length ?? 1) - 1;
      }
    }
    return false; // boundary
  };

  // ----- Esc closes the topmost modal -----
  // The ToolModal frame already owns Esc-close while it's mounted, but
  // surfacing it here keeps the keyboard contract self-documenting and
  // covers the palette case (which uses ToolModal too, so this is belt +
  // braces — both fire, both close idempotently).
  const closeTopmostModal = () => {
    if (activeToolId)            closeTool();
    else if (accountModalIsOpen) closeAccountModal();
    else if (paletteOpen)        setPaletteOpen(false);
  };

  // ----- Full keyboard layer (FR-019 + Contract keyboard-shortcuts.md) -----
  const shortcuts = useMemo(
    () => [
      // ⌘K / Ctrl+K — palette
      { key: "k", meta: true, description: "Open command palette",
        handler: () => { closeTool(); closeAccountModal(); setPaletteOpen(true); } },
      // ? — shortcuts help
      { key: "?", shift: true, description: "Open keyboard shortcuts",
        handler: () => { closeTool(); setPaletteOpen(false); setAccountModal("shortcuts"); } },
      // b — bookmark
      { key: "b", description: "Toggle bookmark", handler: onToggleBookmark },
      // j — next lesson (cross-module)
      { key: "j", description: "Next lesson", handler: () => goRelative(+1) },
      // k — previous lesson (cross-module)
      { key: "k", description: "Previous lesson", handler: () => goRelative(-1) },
      // e — toggle Practice disclosure
      { key: "e", description: "Toggle Practice", handler: () => setShowApply((v) => !v) },
      // q — toggle Self-test disclosure
      { key: "q", description: "Toggle Self-test", handler: () => setShowQuiz((v) => !v) },
      // r — Adversarial review
      { key: "r", description: "Open Adversarial review",
        handler: () => { closeAccountModal(); setPaletteOpen(false); openTool("adversarial-review"); } },
      // Esc — close topmost modal (alwaysFire: bypasses input + modal suppression)
      { key: "Escape", alwaysFire: true, description: "Close topmost modal",
        handler: closeTopmostModal },
    ],
    // Re-create the shortcut list when any closure-captured state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeToolId,
      accountModalIsOpen,
      paletteOpen,
      lesson?.id,
      active.moduleIndex,
      active.lessonIndex,
    ],
  );
  useKeyboardShortcuts({ shortcuts, isModalOpen: anyModalOpen });

  // Dispatch the disclosure toggles as DOM events so future reading-column
  // surfaces can subscribe without a prop drill. No-op until consumed.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("course:practice-toggle", { detail: { open: showApply } }));
  }, [showApply]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("course:selftest-toggle", { detail: { open: showQuiz } }));
  }, [showQuiz]);

  // ----- Render -----

  return (
    <div
      ref={shellRef}
      className={`course-shell ${styles.shell}`}
      // RTL parity: respect the parent document's direction. The shell does
      // not force a direction; it just inherits and uses logical properties.
      data-active-section={activeSectionId ?? ""}
    >
      <div className={styles.layout}>
        <aside className={styles.sidebarSlot} aria-label="Course navigation">
          {/* Gate render on the inline tier (not just CSS display:none) so the
              off-canvas drawer copy is the ONLY live Sidebar below 768px — no
              duplicate DOM ids, no wasted render. */}
          {sidebarSlot ?? (sidebarInline ? (
            <Sidebar
              curriculum={curriculum}
              activeModuleIndex={active.moduleIndex}
              activeLessonIndex={active.lessonIndex}
              completedLessonIds={completed}
              onSelectLesson={(mi, li) => navigateToLessonAdapter(mi, li)}
              onOpenTool={openTool}
            />
          ) : null)}
        </aside>

        <main className={styles.readingSlot}>
          <div
            style={{
              marginBlockEnd: "1.5rem",
              // Pin the header on touch tiers (<1024px) so its hamburger +
              // outline toggle — the only mobile nav triggers — stay reachable
              // while the lesson scrolls.
              ...(outlineInline
                ? null
                : {
                    position: "sticky",
                    insetBlockStart: 0,
                    zIndex: 40,
                    background: "var(--bg)",
                    paddingBlock: "0.25rem",
                  }),
            }}
          >
            {headerSlot ?? (
              <Header
                cohortLabel={cohortLabel}
                streakDays={streakDays}
                onOpenPalette={() => setPaletteOpen(true)}
                onSelectAccountItem={handleAccountSelect}
                showNavButton={!sidebarInline}
                onOpenNav={() => setMobileDrawer("nav")}
                showOutlineButton={!outlineInline}
                onOpenOutline={() => setMobileDrawer("outline")}
              />
            )}
          </div>
          <ReadingColumn
            lesson={lesson}
            module={moduleObj}
            moduleIndex={active.moduleIndex}
            markCompleteSlot={resolvedMarkCompleteSlot}
            studyMode={studyMode}
            showApply={showApply}
            onToggleApply={() => setShowApply((v) => !v)}
            showQuiz={showQuiz}
            onToggleQuiz={() => setShowQuiz((v) => !v)}
            onOpenAdversarial={() => openTool("adversarial-review")}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            onNavigateLesson={(mi, li) => navigateToLessonAdapter(mi, li)}
            isNarrow={!sidebarInline}
          />
        </main>

        <aside className={styles.rightRailSlot}>
          {/* Gated on the inline tier — the outline drawer is the only live
              RightRail below 1024px (no duplicate ids / radiogroup). */}
          {outlineInline ? (
            <RightRail
              lesson={lesson}
              activeSectionId={activeSectionId}
              onSectionSelect={(id) => scrollToSection(id)}
              studyMode={studyMode}
              onStudyModeChange={setStudyMode}
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
              onCopyLink={onCopyLink}
              copyFeedback={copyFeedback}
              // Listen + next-due-review wired in later phases.
            />
          ) : null}
        </aside>
      </div>

      {/* Mobile nav drawer (FR-024) — surfaces the sidebar (module nav +
          practice tools) below 768px. Selecting a lesson or opening a tool
          closes it so focus returns to the reading column. */}
      <MobileDrawer
        open={mobileDrawer === "nav"}
        side="start"
        label="Course navigation"
        onClose={closeMobileDrawer}
      >
        <Sidebar
          curriculum={curriculum}
          activeModuleIndex={active.moduleIndex}
          activeLessonIndex={active.lessonIndex}
          completedLessonIds={completed}
          touch
          onSelectLesson={(mi, li) => {
            navigateToLessonAdapter(mi, li);
            closeMobileDrawer();
          }}
          onOpenTool={(toolId, openedFrom) => {
            closeMobileDrawer();
            openTool(toolId, openedFrom);
          }}
        />
      </MobileDrawer>

      {/* Mobile outline drawer (FR-024) — surfaces the right-rail outline +
          study mode + lesson actions below 1024px. */}
      <MobileDrawer
        open={mobileDrawer === "outline"}
        side="end"
        label="On this lesson"
        onClose={closeMobileDrawer}
      >
        <RightRail
          lesson={lesson}
          activeSectionId={activeSectionId}
          touch
          onSectionSelect={(id) => {
            scrollToSection(id);
            closeMobileDrawer();
          }}
          studyMode={studyMode}
          onStudyModeChange={setStudyMode}
          isBookmarked={isBookmarked}
          onToggleBookmark={onToggleBookmark}
          onCopyLink={onCopyLink}
          copyFeedback={copyFeedback}
        />
      </MobileDrawer>

      {/* Active practice tool, if any. ToolModal frame owns focus / scroll /
          aria; the body comes from the frozen practiceTools registry and
          receives the tool-specific prop bag built above. */}
      {activeTool ? (
        <ToolModal
          open
          titleId={activeToolTitleId}
          onClose={closeTool}
        >
          <activeTool.Component {...toolProps} />
        </ToolModal>
      ) : null}

      {/* Account modals — Profile, Import, Shortcuts, Tweaks — share the
          ToolModal frame. Only ever one is open at a time (FR-016). */}
      {accountModal === "profile" ? (
        <ToolModal open titleId="account-profile-title" onClose={closeAccountModal}>
          <ProfileModal
            titleId="account-profile-title"
            cohortLabel={cohortLabel}
            curriculum={curriculum}
            completedLessonIds={completed}
            bookmarkedLessonIds={bookmarks}
            onJumpToLesson={jumpToLessonAndClose}
            onOpenLegacyView={(viewId) => { closeAccountModal(); openLegacyView?.(viewId); }}
            onClose={closeAccountModal}
          />
        </ToolModal>
      ) : null}
      {accountModal === "import" ? (
        <ToolModal open titleId="account-import-title" onClose={closeAccountModal}>
          <ImportProgressModal
            titleId="account-import-title"
            knownLessonIds={known}
            onApply={(state) => { handleImport(state); }}
            onClose={closeAccountModal}
          />
        </ToolModal>
      ) : null}
      {accountModal === "shortcuts" ? (
        <ToolModal open titleId="account-shortcuts-title" onClose={closeAccountModal}>
          <ShortcutsModal titleId="account-shortcuts-title" onClose={closeAccountModal} />
        </ToolModal>
      ) : null}
      {accountModal === "tweaks" ? (
        <ToolModal open titleId="account-tweaks-title" onClose={closeAccountModal}>
          <TweaksPanel
            titleId="account-tweaks-title"
            tweaks={tweaks}
            onChange={(partial) => setTweaks(partial)}
            onClose={closeAccountModal}
          />
        </ToolModal>
      ) : null}

      {/* Command palette — uses ToolModal frame so focus, esc-close,
          scroll-restore are unified across every modal surface. */}
      {paletteOpen ? (
        <ToolModal open ariaLabel="Search palette" onClose={() => setPaletteOpen(false)}>
          <CommandPalette
            open
            curriculum={curriculum}
            onPickLesson={handlePickLesson}
            onPickSection={handlePickSection}
            onPickLegacyView={handlePickLegacyView}
            onClose={() => setPaletteOpen(false)}
          />
        </ToolModal>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * MarkCompleteButton — the single completion affordance for the course shell.
 *
 * FR-017: Lesson completion MUST be controlled by a single affordance per
 * lesson. This is that affordance. The legacy
 * checkbox/radio/module-outro-gate trio is intentionally not present.
 * ------------------------------------------------------------------------- */

/**
 * neighbourLesson — resolve the lesson `direction` (+1 / -1) steps away,
 * crossing module boundaries. Returns `{ moduleIndex, lessonIndex, title }`
 * or null at the course boundary.
 */
function neighbourLesson(curriculum, moduleIndex, lessonIndex, direction) {
  if (!Array.isArray(curriculum) || curriculum.length === 0) return null;
  let m = moduleIndex;
  let l = lessonIndex + direction;
  while (curriculum[m]) {
    const lessons = curriculum[m].lessons ?? [];
    if (l >= 0 && l < lessons.length) {
      const lesson = lessons[l];
      return { moduleIndex: m, lessonIndex: l, title: lesson.title ?? lesson.id ?? "Lesson" };
    }
    if (direction > 0) {
      m += 1;
      l = 0;
    } else {
      m -= 1;
      l = (curriculum[m]?.lessons?.length ?? 1) - 1;
    }
  }
  return null;
}

function MarkCompleteButton({ isComplete, onToggle, lessonTitle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isComplete}
      data-testid="course-mark-complete"
      style={{
        ...markCompleteBaseStyle,
        ...(isComplete ? markCompleteCompletedStyle : markCompletePendingStyle),
      }}
    >
      <span aria-hidden="true" style={markCompleteIconStyle}>
        {isComplete ? "✓" : "○"}
      </span>
      <span>
        {isComplete ? "Completed" : "Mark complete"}
        <span style={markCompleteHintStyle}> · {lessonTitle}</span>
      </span>
    </button>
  );
}

const markCompleteBaseStyle = {
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingBlock: "0.5rem",
  paddingInline: "0.75rem",
  borderRadius: "0.3rem",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
  cursor: "pointer",
};
const markCompletePendingStyle = {
  background: "transparent",
  border: "1px solid var(--accent)",
  color: "var(--ink)",
};
const markCompleteCompletedStyle = {
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink-dim)",
};
const markCompleteIconStyle = {
  fontFamily: "var(--mono)",
  fontSize: "1rem",
  lineHeight: 1,
};
const markCompleteHintStyle = {
  color: "var(--ink-dim)",
  marginInlineStart: "0.25rem",
  fontStyle: "italic",
};

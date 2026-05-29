/**
 * ReadingColumn — center column of the course shell.
 *
 * Spec refs:
 *   - FR-003: serif display title (Newsreader), calm sans body (Geist),
 *             typographic callouts (Takeaways / Leadership note / Case study)
 *             rendered WITHOUT bright accent-fill boxes
 *   - FR-004: module color only as 2px marker (border-inline-start), never as
 *             a background fill
 *   - FR-005: inline lesson actions (bookmark/listen/copy) live in the right rail
 *   - FR-017: single Mark-complete control lives at the bottom of this column
 *             (wired in T035; this v1 just leaves a slot for it)
 *   - FR-026: render every artifact link the lesson supplies (multi-artifact
 *             ordered to match the lesson body order or the artifact array)
 *   - FR-028a: `mena-note` is a first-class block kind, rendered as a
 *             typographic margin-note treatment (not a coloured box)
 *
 * Data shape — the existing curriculum is heterogeneous (`apply`, `quiz`,
 * `keyPoints`, free strings, …). This renderer is intentionally permissive:
 * it accepts a `body` array of blocks whose shape matches data-model.md's
 * RichContent union, AND falls back to rendering the lesson's well-known
 * legacy fields when `body` is missing, so US1 ships even before the
 * curriculum is normalized to the new shape (which is a separate workstream).
 *
 * Pure presentational. State lives in CourseShell / hooks.
 */

import { moduleColor } from "../lib/moduleColor.js";
import { anchorIdFor } from "../lib/outlineFromLesson.js";
import { parseLessonContent } from "../lib/parseLessonContent.js";

export function ReadingColumn({
  lesson,
  module: moduleObj,
  moduleIndex = 0,
  markCompleteSlot,
  className,
  // Optional interactive affordances (wired by CourseShell). All optional so
  // the column renders read-only when a host doesn't supply them.
  studyMode = "deep",
  showApply = false,
  onToggleApply,
  showQuiz = false,
  onToggleQuiz,
  onOpenAdversarial,
  prevLesson,
  nextLesson,
  onNavigateLesson,
}) {
  if (!lesson) {
    return (
      <section
        data-course-reading-column=""
        aria-live="polite"
        className={className}
        style={emptyStyle}
      >
        Select a lesson from the sidebar to begin reading.
      </section>
    );
  }

  // Normalize body. Either a true RichContent array OR derive from legacy fields.
  const body = Array.isArray(lesson.body) ? lesson.body : deriveBodyFromLegacy(lesson);
  // The title gets its OWN anchor, distinct from any content heading id. (It
  // must NOT borrow the first outline entry's id: when the body leads with a
  // lede paragraph, `outline[0]` is the first heading, which also renders its
  // own `<h2 id=…>` — sharing the id would create a duplicate-id collision and
  // break right-rail scroll-tracking.)
  const titleAnchor = anchorIdFor(`lesson-${lesson.id ?? lesson.title ?? "top"}`);
  const markerColor = moduleColor(moduleIndex);

  // Every artifact the lesson supplies (FR-026, clarified for multi-artifact).
  const artifacts = collectArtifacts(lesson);

  return (
    <section
      data-course-reading-column=""
      className={className}
      style={readingStyle}
    >
      {/* Title block — module marker is a 2px inline-start rule, never a fill. */}
      <header style={titleHeaderStyle}>
        <p style={moduleEyebrowStyle}>
          <span
            aria-hidden="true"
            style={{
              ...moduleMarkerDotStyle,
              borderInlineStartColor: markerColor,
            }}
          />
          <span>Module {moduleIndex + 1}</span>
          <span aria-hidden="true" style={crumbSepStyle}>›</span>
          <span>{moduleObj?.name ?? `Module ${moduleIndex + 1}`}</span>
          {lesson.id ? (
            <>
              <span aria-hidden="true" style={crumbSepStyle}>›</span>
              <span>Lesson {lesson.id}</span>
            </>
          ) : null}
          {lesson.type ? <span style={typeTagStyle}>{lesson.type}</span> : null}
        </p>
        <h1 id={titleAnchor} style={titleStyle}>
          {lesson.title ?? lesson.id ?? "Untitled lesson"}
        </h1>
        {lesson.subtitle ? <p style={subtitleStyle}>{lesson.subtitle}</p> : null}
        <LessonMeta lesson={lesson} />
      </header>

      {/* Body blocks. markerColor is intentionally NOT threaded into Block —
          FR-004 forbids using it as a fill, and block-level callouts use
          --accent / --rule instead. */}
      <div style={bodyStyle}>
        {body.map((block, idx) => (
          <Block key={blockKey(block, idx)} block={block} />
        ))}
      </div>

      {/* Artifact stripe (FR-026). */}
      {artifacts.length > 0 ? (
        <aside aria-label="Lesson artifacts" style={artifactStripeStyle}>
          <p style={artifactStripeLabelStyle}>Artifacts</p>
          <ul style={artifactListStyle}>
            {artifacts.map((art, i) => (
              <li key={`${art.href}-${i}`}>
                <a
                  href={art.href}
                  data-testid="course-artifact-link"
                  style={artifactLinkStyle}
                  {...(isExternal(art.href) ? { target: "_blank", rel: "noreferrer" } : null)}
                >
                  {art.label ?? art.href}
                </a>
                {art.description ? <span style={artifactDescStyle}>{art.description}</span> : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {/* Practice + Self-test disclosures. Hidden in Exec study mode (the
          design collapses hands-on work for the executive track). */}
      {studyMode !== "exec" && lesson.apply ? (
        <Disclosure
          title="Practice — Apply this lesson"
          hint="Push the artifact to /docs"
          open={showApply}
          onToggle={onToggleApply}
          testId="course-practice-disclosure"
        >
          <div style={bodyStyle}>
            {parseLessonContent(typeof lesson.apply === "string" ? lesson.apply : "").map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </Disclosure>
      ) : null}

      {studyMode !== "exec" && lesson.quiz?.q ? (
        <Disclosure
          title="Self-test"
          hint="1 question · check yourself"
          open={showQuiz}
          onToggle={onToggleQuiz}
          testId="course-selftest-disclosure"
        >
          <SelfTest quiz={lesson.quiz} />
        </Disclosure>
      ) : null}

      {/* Adversarial-review CTA — the course's differentiator. */}
      {onOpenAdversarial ? (
        <aside style={reviewCardStyle} aria-label="Adversarial review">
          <p style={reviewKickerStyle}>Adversarial review</p>
          <h2 style={reviewTitleStyle}>Submit your artifact to a panel of skeptics</h2>
          <p style={reviewBodyStyle}>
            Run your PRD, eval rubric, or self-audit past a reviewer persona and get a scored verdict
            with required actions.
          </p>
          <button type="button" onClick={onOpenAdversarial} style={reviewButtonStyle} data-testid="course-review-cta">
            Open review panel →
          </button>
        </aside>
      ) : null}

      {/* Mark-complete affordance slot. FR-017's single completion control. */}
      {markCompleteSlot ? <footer style={markCompleteFooterStyle}>{markCompleteSlot}</footer> : null}

      {/* Prev / next lesson navigation (pure navigation — completion stays the
          single Mark-complete control above, per FR-017). */}
      {onNavigateLesson && (prevLesson || nextLesson) ? (
        <nav aria-label="Lesson navigation" style={navFootStyle}>
          {prevLesson ? (
            <button
              type="button"
              onClick={() => onNavigateLesson(prevLesson.moduleIndex, prevLesson.lessonIndex)}
              style={navFootButtonStyle}
              data-testid="course-prev-lesson"
            >
              <span style={navDirStyle}>← Previous</span>
              <span style={navTitleStyle}>{prevLesson.title}</span>
            </button>
          ) : <span />}
          {nextLesson ? (
            <button
              type="button"
              onClick={() => onNavigateLesson(nextLesson.moduleIndex, nextLesson.lessonIndex)}
              style={{ ...navFootButtonStyle, textAlign: "end" }}
              data-testid="course-next-lesson"
            >
              <span style={navDirStyle}>Next →</span>
              <span style={navTitleStyle}>{nextLesson.title}</span>
            </button>
          ) : <span />}
        </nav>
      ) : null}
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Disclosure — collapsible Practice / Self-test panel.
 * ------------------------------------------------------------------------- */
function Disclosure({ title, hint, open, onToggle, testId, children }) {
  return (
    <section style={disclosureStyle} data-testid={testId} data-open={open ? "true" : undefined}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!!open}
        style={disclosureHeadStyle}
      >
        <span style={disclosureTitleStyle}>{title}</span>
        {hint ? <span style={disclosureHintStyle}>{hint}</span> : null}
        <span aria-hidden="true" style={{ ...disclosureChevStyle, transform: open ? "rotate(90deg)" : "none" }}>›</span>
      </button>
      {open ? <div style={disclosureBodyStyle}>{children}</div> : null}
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * SelfTest — reveal-the-answer quiz body.
 * ------------------------------------------------------------------------- */
function SelfTest({ quiz }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ ...ledeStyle, fontSize: "1.15rem" }}>{quiz.q}</p>
      <details style={selfTestDetailsStyle}>
        <summary style={selfTestSummaryStyle}>Reveal reference answer</summary>
        <div style={selfTestAnswerStyle}>{quiz.a}</div>
      </details>
    </div>
  );
}

/**
 * LessonMeta — the freshness + reading-time line under the title.
 *
 * Renders ONLY what the lesson actually carries (FR / no fabrication): a
 * freshness signal from `meta.lastVerified` (or `meta.updatedAt`) and, when
 * present, the read/practice minute estimates. Real curriculum lessons rarely
 * have minute estimates, so those segments are omitted rather than invented.
 */
function LessonMeta({ lesson }) {
  const meta = lesson?.meta ?? {};
  const updated = meta.lastVerified ?? meta.updatedAt ?? null;
  const segments = [];
  if (updated) {
    segments.push(
      <span key="fresh" style={freshnessStyle}>
        <span aria-hidden="true" style={freshnessDotStyle} />
        Updated {updated}
      </span>,
    );
  }
  if (typeof lesson?.readMin === "number") {
    segments.push(<span key="read">{lesson.readMin} min read</span>);
  }
  if (typeof lesson?.exMin === "number") {
    segments.push(<span key="ex">{lesson.exMin} min practice</span>);
  }
  if (segments.length === 0) return null;

  return (
    <div style={metaRowStyle}>
      {segments.map((seg, i) => (
        <span key={i} style={metaSegWrapStyle}>
          {i > 0 ? <span aria-hidden="true" style={crumbSepStyle}>·</span> : null}
          {seg}
        </span>
      ))}
    </div>
  );
}

/* ===========================================================================
 * Block renderer — covers every RichContent kind PLUS the legacy fields.
 * Coloured fills are intentionally absent: every callout is a typographic
 * treatment (border-inline-start rule, italic pull-quote, marginal note).
 * ========================================================================= */

/** Render inline spans ({text, bold, code}) or fall back to a plain string. */
function Inline({ spans, text }) {
  if (!Array.isArray(spans)) return text ?? "";
  return spans.map((span, i) => {
    if (span.code) return <code key={i} style={inlineCodeStyle}>{span.text}</code>;
    if (span.bold) return <strong key={i} style={inlineStrongStyle}>{span.text}</strong>;
    return <span key={i}>{span.text}</span>;
  });
}

function Block({ block }) {
  if (!block) return null;
  if (typeof block === "string") return <p style={proseStyle}>{block}</p>;

  const kind = String(block.kind ?? block.type ?? "prose").toLowerCase();
  switch (kind) {
    case "heading":
    case "section":
    case "h2": {
      const id = block.id ?? anchorIdFor(block.label ?? block.text ?? "");
      return (
        <h2 id={id} style={h2Style}>
          {block.label ?? block.heading ?? block.text}
        </h2>
      );
    }
    case "h3": {
      const id = block.id ?? anchorIdFor(block.label ?? block.text ?? "");
      return (
        <h3 id={id} style={h3Style}>
          {block.label ?? block.heading ?? block.text}
        </h3>
      );
    }
    case "prose":
    case "paragraph": {
      const style = block.lede ? ledeStyle : proseStyle;
      return <p style={style}><Inline spans={block.spans} text={block.text ?? block.body ?? ""} /></p>;
    }
    case "list":
    case "ul":
      return (
        <ul style={listStyle}>
          {(block.items ?? []).map((item, i) => (
            <li key={i} style={listItemStyle}><Inline spans={item?.spans} text={stringFromItem(item)} /></li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol style={listStyle}>
          {(block.items ?? []).map((item, i) => (
            <li key={i} style={listItemStyle}><Inline spans={item?.spans} text={stringFromItem(item)} /></li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {(block.headers ?? []).map((cell, ci) => (
                  <th key={ci} style={tableHeadCellStyle}><Inline spans={cell} /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(block.rows ?? []).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={tableCellStyle}><Inline spans={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    /* ------- Editorial callouts (typographic, NEVER coloured fills) ------- */
    case "takeaways": {
      const items = block.items ?? [];
      return (
        <section aria-label={block.label ?? "Takeaways"} style={takeawaysStyle}>
          <p style={calloutLabelStyle}>{block.label ?? "Takeaways"}</p>
          <ol style={takeawaysListStyle}>
            {items.map((it, i) => (
              <li key={i} style={takeawayItemStyle}><Inline spans={it?.spans} text={stringFromItem(it)} /></li>
            ))}
          </ol>
        </section>
      );
    }
    case "leadership-note":
    case "leadership_note":
    case "leadership": {
      // Italic pull-quote treatment with an inline-start hairline rule.
      return (
        <blockquote style={leadershipNoteStyle}>
          <p style={leadershipLabelStyle}>{block.label ?? "Leadership note"}</p>
          <p style={leadershipBodyStyle}>{block.text ?? block.body ?? ""}</p>
        </blockquote>
      );
    }
    case "case-study":
    case "case_study":
    case "casestudy": {
      // Indented marginal note treatment — not a colored box.
      return (
        <aside aria-label="Case study" style={caseStudyStyle}>
          <p style={calloutLabelStyle}>{block.label ?? "Case study"}</p>
          <div style={caseStudyBodyStyle}><Inline spans={block.spans} text={block.text ?? block.body ?? ""} /></div>
        </aside>
      );
    }
    case "mena-note":
    case "mena_note":
    case "mena": {
      // FR-028a: per-lesson Arabic/RTL/MENA context callout.
      // Typographic margin-note treatment; never a colored box.
      return (
        <aside
          data-testid="mena-note"
          aria-label={block.label ?? "MENA context"}
          lang={block.lang ?? undefined}
          dir={block.dir ?? undefined}
          style={menaNoteStyle}
        >
          <p style={calloutLabelStyle}>{block.label ?? "MENA context"}</p>
          <div>{block.text ?? block.body ?? ""}</div>
        </aside>
      );
    }

    case "code":
    case "pre":
      return (
        <pre style={codeBlockStyle}>
          <code>{block.text ?? block.body ?? ""}</code>
        </pre>
      );
    case "image":
    case "figure":
      return (
        <figure style={figureStyle}>
          <img src={block.src} alt={block.alt ?? ""} style={imageStyle} />
          {block.caption ? <figcaption style={captionStyle}>{block.caption}</figcaption> : null}
        </figure>
      );

    case "artifact-link":
    case "artifact": {
      // Inline artifact link inside the body. Multi-artifact rendering also
      // happens in the ArtifactStripe at the bottom; this inline variant
      // exists so authors can place an artifact mid-flow.
      const { href, label, description } = block;
      if (!href) return null;
      return (
        <p style={artifactInlineWrapStyle}>
          <a
            href={href}
            data-testid="course-artifact-link"
            style={artifactLinkStyle}
            {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : null)}
          >
            {label ?? href}
          </a>
          {description ? <span style={artifactDescStyle}>{description}</span> : null}
        </p>
      );
    }

    default:
      // Unknown blocks fall back to plain prose so the page never crashes.
      return <p style={proseStyle}>{stringFromItem(block)}</p>;
  }
}

/* ===========================================================================
 * Helpers
 * ========================================================================= */

function blockKey(block, idx) {
  if (typeof block === "string") return `s-${idx}-${block.slice(0, 12)}`;
  return block.id ?? `${block.kind ?? block.type ?? "b"}-${idx}`;
}

function stringFromItem(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") return item.text ?? item.label ?? "";
  return String(item ?? "");
}

function isExternal(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

/** Collect artifacts from any of the supported lesson shapes. */
function collectArtifacts(lesson) {
  const out = [];
  if (lesson.artifact && lesson.artifact.href) out.push(lesson.artifact);
  if (Array.isArray(lesson.artifacts)) {
    for (const a of lesson.artifacts) if (a && a.href) out.push(a);
  }
  return out;
}

/**
 * Fallback when curriculum hasn't been normalized to the new RichContent shape.
 *
 * The live curriculum stores `content` as a markdown STRING (with `**bold**`
 * headings, `-`/`N.` lists, and pipe tables) plus `keys` as the takeaway list.
 * `parseLessonContent` turns the string into editorial blocks; the first prose
 * paragraph is promoted to a serif lede. Takeaways read `keys` first (the live
 * field) and fall back to the legacy `keyPoints`.
 */
function deriveBodyFromLegacy(lesson) {
  const body = [];
  if (lesson.summary) body.push({ kind: "prose", text: lesson.summary, lede: true });

  const parsed = lesson.content ? parseLessonContent(lesson.content) : [];
  // Promote the opening paragraph (when content leads with prose) to a lede.
  if (!lesson.summary && parsed[0]?.kind === "prose") parsed[0] = { ...parsed[0], lede: true };
  body.push(...parsed);

  const takeaways = Array.isArray(lesson.keys) && lesson.keys.length > 0
    ? lesson.keys
    : Array.isArray(lesson.keyPoints) && lesson.keyPoints.length > 0
    ? lesson.keyPoints
    : null;
  if (takeaways) body.push({ kind: "takeaways", label: "Key takeaways", items: takeaways });

  return body;
}

/* ===========================================================================
 * Inline styles. Token-bound via CSS variables defined in tokens.css.
 * Inline styles are intentional here — they are *layout-bound to component
 * roles* (e.g., titleStyle) and would not benefit from CSS-module names.
 * No `background[-color]: var(--module-*)` anywhere: ESLint guards this.
 * ========================================================================= */

const readingStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--density-y, 1.5rem)",
  color: "var(--ink, #ece7d8)",
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  lineHeight: 1.6,
};
const emptyStyle = {
  ...readingStyle,
  color: "var(--ink-dim, #b6ad97)",
  fontStyle: "italic",
};

const titleHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  marginBlockEnd: "1rem",
};
const moduleEyebrowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
  color: "var(--ink-dim)",
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  margin: 0,
};
const crumbSepStyle = { color: "var(--rule)" };
const typeTagStyle = {
  marginInlineStart: "auto",
  border: "1px solid var(--rule)",
  borderRadius: "999px",
  padding: "0.05rem 0.55rem",
  textTransform: "lowercase",
  letterSpacing: "0.02em",
  color: "var(--ink-dim)",
};
const metaRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.6rem",
  marginBlockStart: "0.75rem",
  paddingBlockEnd: "0.5rem",
  borderBlockEnd: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  fontSize: "0.8rem",
};
const metaSegWrapStyle = { display: "inline-flex", alignItems: "center", gap: "0.6rem" };
const freshnessStyle = { display: "inline-flex", alignItems: "center", gap: "0.4rem" };
const freshnessDotStyle = {
  inlineSize: "0.4rem",
  blockSize: "0.4rem",
  borderRadius: "999px",
  background: "var(--accent)",
  boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent)",
};
// Module marker: 2px inline-start rule on the eyebrow's leading sigil.
// NEVER a background-color fill (FR-004, ESLint-guarded).
const moduleMarkerDotStyle = {
  display: "inline-block",
  inlineSize: "1.25rem",
  blockSize: "0.75rem",
  borderInlineStart: "2px solid var(--rule)",
};
const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "clamp(2rem, 4vw, 2.75rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
  margin: 0,
};
const subtitleStyle = {
  fontFamily: "var(--display)",
  fontStyle: "italic",
  color: "var(--ink-dim)",
  marginTop: "0.5rem",
  fontSize: "1.125rem",
};

const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--density-y, 1.5rem)",
};

const proseStyle = { margin: 0, fontSize: "1.0625rem", lineHeight: 1.65 };
// Lede — the opening paragraph rendered as a calm serif standfirst (FR-003).
const ledeStyle = {
  margin: 0,
  fontFamily: "var(--display)",
  fontSize: "1.3rem",
  lineHeight: 1.5,
  color: "var(--ink)",
};
const inlineStrongStyle = { color: "var(--ink)", fontWeight: 600 };
const inlineCodeStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.9em",
  background: "var(--bg-elev)",
  padding: "0.05rem 0.3rem",
  borderRadius: "0.2rem",
};
const h2Style = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  lineHeight: 1.2,
  margin: "0.5rem 0 0",
};
const h3Style = {
  fontFamily: "var(--display)",
  fontSize: "1.125rem",
  lineHeight: 1.2,
  margin: "0.5rem 0 0",
};
const listStyle = {
  margin: 0,
  paddingInlineStart: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};
const listItemStyle = { fontSize: "1.0625rem", lineHeight: 1.6 };

/* ----- Callouts (typographic only) ----- */

const calloutLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
};

const takeawaysStyle = {
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
const takeawaysListStyle = {
  margin: 0,
  paddingInlineStart: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};
const takeawayItemStyle = { fontSize: "1rem", lineHeight: 1.55 };

const leadershipNoteStyle = {
  margin: 0,
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "1rem",
  fontStyle: "italic",
  color: "var(--ink-dim)",
};
const leadershipLabelStyle = { ...calloutLabelStyle, marginBottom: "0.25rem" };
const leadershipBodyStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.125rem",
  lineHeight: 1.45,
  margin: 0,
};

const caseStudyStyle = {
  paddingInlineStart: "1rem",
  borderInlineStart: "2px solid var(--rule)",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};
const caseStudyBodyStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.0625rem",
  lineHeight: 1.55,
  color: "var(--ink)",
};

/* ----- Tables (curriculum uses markdown pipe tables) ----- */
const tableWrapStyle = { overflowX: "auto" };
const tableStyle = {
  inlineSize: "100%",
  borderCollapse: "collapse",
  fontSize: "0.95rem",
  fontFamily: "var(--sans)",
};
const tableHeadCellStyle = {
  textAlign: "start",
  padding: "0.5rem 0.75rem",
  borderBlockEnd: "1px solid var(--accent)",
  color: "var(--accent)",
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};
const tableCellStyle = {
  padding: "0.5rem 0.75rem",
  borderBlockEnd: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  verticalAlign: "top",
};

const menaNoteStyle = {
  paddingInlineStart: "1rem",
  borderInlineStart: "2px solid var(--accent)",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const codeBlockStyle = {
  margin: 0,
  padding: "1rem",
  borderInlineStart: "2px solid var(--rule)",
  background: "transparent",
  overflowX: "auto",
  fontFamily: "var(--mono)",
  fontSize: "0.9rem",
  lineHeight: 1.5,
};
const figureStyle = { margin: 0 };
const imageStyle = { maxInlineSize: "100%", height: "auto" };
const captionStyle = { color: "var(--ink-dim)", fontStyle: "italic", marginTop: "0.5rem", fontSize: "0.9rem" };

/* ----- Artifacts ----- */

const artifactStripeStyle = {
  marginBlockStart: "1.5rem",
  paddingBlockStart: "1rem",
  borderBlockStart: "1px solid var(--rule)",
};
const artifactStripeLabelStyle = { ...calloutLabelStyle, marginBottom: "0.4rem" };
const artifactListStyle = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" };
const artifactLinkStyle = { color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" };
const artifactDescStyle = { marginInlineStart: "0.5rem", color: "var(--ink-dim)" };
const artifactInlineWrapStyle = { margin: 0, fontSize: "1.0625rem" };

const markCompleteFooterStyle = {
  marginBlockStart: "2rem",
  paddingBlockStart: "1rem",
  borderBlockStart: "1px solid var(--rule)",
};

/* ----- Disclosures (Practice / Self-test) ----- */
const disclosureStyle = {
  border: "1px solid var(--rule)",
  borderRadius: "0.6rem",
  overflow: "hidden",
  background: "var(--bg-elev)",
};
const disclosureHeadStyle = {
  appearance: "none",
  inlineSize: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  background: "transparent",
  border: "none",
  color: "var(--ink)",
  padding: "0.9rem 1.1rem",
  cursor: "pointer",
  textAlign: "start",
  fontFamily: "var(--sans)",
};
const disclosureTitleStyle = { flex: 1, fontSize: "0.95rem", fontWeight: 500 };
const disclosureHintStyle = { fontSize: "0.78rem", color: "var(--ink-dim)" };
const disclosureChevStyle = {
  fontFamily: "var(--mono)",
  color: "var(--ink-dim)",
  transition: "transform 150ms ease",
};
const disclosureBodyStyle = {
  padding: "0.4rem 1.1rem 1.2rem",
  borderBlockStart: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
};

/* ----- Self-test ----- */
const selfTestDetailsStyle = { borderInlineStart: "2px solid var(--accent)", paddingInlineStart: "0.9rem" };
const selfTestSummaryStyle = {
  cursor: "pointer",
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--accent)",
};
const selfTestAnswerStyle = { marginBlockStart: "0.6rem", color: "var(--ink)", lineHeight: 1.6 };

/* ----- Adversarial review CTA ----- */
const reviewCardStyle = {
  border: "1px solid var(--rule)",
  borderRadius: "0.75rem",
  padding: "1.4rem 1.5rem",
  background: "var(--bg-elev)",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
const reviewKickerStyle = {
  margin: 0,
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--accent)",
};
const reviewTitleStyle = { margin: 0, fontFamily: "var(--display)", fontSize: "1.35rem", lineHeight: 1.2, color: "var(--ink)" };
const reviewBodyStyle = { margin: 0, color: "var(--ink-dim)", lineHeight: 1.55, maxInlineSize: "46ch" };
const reviewButtonStyle = {
  appearance: "none",
  alignSelf: "start",
  marginBlockStart: "0.6rem",
  background: "var(--accent)",
  border: "1px solid var(--accent)",
  color: "var(--bg)",
  borderRadius: "0.35rem",
  padding: "0.5rem 0.9rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  fontWeight: 500,
};

/* ----- Prev / next footer nav ----- */
const navFootStyle = {
  marginBlockStart: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
};
const navFootButtonStyle = {
  appearance: "none",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  padding: "1rem 1.1rem",
  border: "1px solid var(--rule)",
  borderRadius: "0.6rem",
  background: "var(--bg-elev)",
  color: "var(--ink)",
  cursor: "pointer",
  textAlign: "start",
};
const navDirStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
};
const navTitleStyle = { fontFamily: "var(--display)", fontSize: "1.05rem", lineHeight: 1.3 };

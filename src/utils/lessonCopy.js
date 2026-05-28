/**
 * Build the markdown-ish text representation of a lesson that's copied to the
 * clipboard from the lesson player.
 *
 * Pure: depends only on its inputs. The caller is responsible for actually
 * writing the result to navigator.clipboard.
 *
 * @param {object} args
 * @param {object} args.lesson         — curriculum lesson (title, type, id)
 * @param {object} args.mod            — owning module (title, module, week)
 * @param {object} args.lessonFrame    — output of ensureLessonFrame()
 * @param {object} args.lessonMeta     — output of buildLessonMetadata()
 * @param {string} args.whyThisMatters
 * @param {object} args.workedExample  — { title, bullets }
 * @param {string[]} args.redFlags
 * @returns {string}
 */
export function buildLessonClipboardText({
  lesson,
  mod,
  lessonFrame,
  lessonMeta,
  whyThisMatters,
  workedExample,
  redFlags = [],
}) {
  const sections = [];

  sections.push(`# LESSON: ${lesson.title}`);
  sections.push(`Module: ${mod.title} (${mod.module} · ${mod.week})`);
  sections.push(`Type: ${(lesson.type || "").toUpperCase()}`);
  sections.push(`ID: ${lesson.id}`);
  sections.push(`\n---`);

  sections.push(`\n## CONCEPT`);
  sections.push(lessonFrame.concept);

  if (lessonFrame.takeaways?.length > 0) {
    sections.push(`\n## KEY TAKEAWAYS`);
    for (const k of lessonFrame.takeaways) sections.push(`→ ${k}`);
  }

  if (lessonFrame.leadershipNote) {
    sections.push(`\n## LEADERSHIP NOTE`);
    sections.push(lessonFrame.leadershipNote);
  }

  if (lessonFrame.toolingLab) {
    sections.push(`\n## TOOLING LAB: ${lessonFrame.toolingLab.title}`);
    sections.push(`Tools: ${lessonFrame.toolingLab.tools.join(" | ")}`);
    for (const step of lessonFrame.toolingLab.steps) sections.push(`• ${step}`);
    sections.push(`Artifact path: ${lessonFrame.toolingLab.artifactPath}`);
  }

  sections.push(`\n## WHY THIS MATTERS`);
  sections.push(whyThisMatters);

  sections.push(`\n## WORKED EXAMPLE: ${workedExample.title}`);
  for (const entry of workedExample.bullets) sections.push(`→ ${entry}`);
  if (redFlags.length > 0) {
    sections.push(`\nRed flags: ${redFlags.join(" | ")}`);
  }

  sections.push(`\n## METADATA`);
  if (lessonMeta.sources) sections.push(`Sources: ${lessonMeta.sources.join(" · ")}`);
  if (lessonMeta.lastVerified) sections.push(`Verified: ${lessonMeta.lastVerified}`);
  if (lessonMeta.artifact || lessonFrame.artifactTarget) {
    sections.push(`Artifact: ${lessonMeta.artifact || lessonFrame.artifactTarget}`);
  }
  sections.push(`Review question: ${lessonFrame.reviewQuestion}`);

  return sections.join("\n");
}

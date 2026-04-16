import fs from "node:fs";
import path from "node:path";
import { CHANGELOG_ENTRIES } from "../src/data/changelog.js";
import { sortChangelogEntries } from "../src/utils/freshness.js";

const outputPath = path.resolve("public/rss.xml");
const backupPath = path.resolve("public/rss.xml.bak");
const siteUrl = "https://beshoyageeb.github.io/AI-PM-Course";

if (fs.existsSync(outputPath)) {
  fs.copyFileSync(outputPath, backupPath);
}

try {
  const items = sortChangelogEntries(CHANGELOG_ENTRIES)
    .map((entry) => {
      const title = `AI PM Course: ${entry.title}`;
      const link = `${siteUrl}/#changelog-${entry.id}`;
      const description = `${entry.module} · ${entry.lesson} · ${entry.changeType} — ${entry.reason}`;
      const pubDate = new Date(`${entry.date}T00:00:00Z`).toUTCString();
      return [
        "<item>",
        `  <title><![CDATA[${title}]]></title>`,
        `  <link>${link}</link>`,
        `  <guid>${link}</guid>`,
        `  <pubDate>${pubDate}</pubDate>`,
        `  <description><![CDATA[${description}]]></description>`,
        "</item>",
      ].join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>AI PM Course Changelog</title>",
    `<link>${siteUrl}</link>`,
    "<description>Freshness and curriculum updates for AI PM Course alumni</description>",
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rss, "utf8");
  console.log(`RSS generation complete: wrote ${outputPath}`);
} catch (error) {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, outputPath);
  }
  console.error("RSS generation failed and previous feed was restored.");
  throw error;
} finally {
  if (fs.existsSync(backupPath)) {
    fs.unlinkSync(backupPath);
  }
}

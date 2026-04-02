#!/usr/bin/env node
import { load } from 'cheerio';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
if (!url) {
  console.error('Usage: node create-draft.mjs <url>');
  process.exit(1);
}

const response = await fetch(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; janmr-draft-creator/1.0)' },
});
if (!response.ok) {
  console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const html = await response.text();
const $ = load(html);

function meta(property) {
  return (
    $(`meta[property="${property}"]`).attr('content') ||
    $(`meta[name="${property}"]`).attr('content') ||
    ''
  ).trim();
}

// Title
const title =
  meta('og:title') ||
  meta('twitter:title') ||
  $('title').text().trim() ||
  'Untitled';

// Image
const image =
  meta('og:image') ||
  meta('twitter:image') ||
  meta('twitter:image:src') ||
  '';

// Tags: keywords meta → article:tag OG → words from title
let tags = [];
const keywordsMeta = meta('keywords');
if (keywordsMeta) {
  tags = keywordsMeta
    .split(',')
    .map(k => k.trim().toLowerCase().replace(/\s+/g, ''))
    .filter(Boolean)
    .slice(0, 6);
} else {
  const articleTags = [];
  $('meta[property="article:tag"]').each((_, el) => {
    articleTags.push($(el).attr('content').trim().toLowerCase().replace(/\s+/g, ''));
  });
  if (articleTags.length > 0) {
    tags = articleTags.slice(0, 6);
  }
}

// Filename from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60);

const date = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

const tagsYaml = tags.length > 0
  ? tags.map(t => `  - ${t}`).join('\n')
  : '  - ';

const imageLine = image ? `\n![](${image})\n` : '';

const content = `---
date: ${date}
crossPosting:
  bluesky:
  mastodon:
  x:
tags:
${tagsYaml}
---
${title} ${url}
${imageLine}`;

const outPath = join(__dirname, 'drafts', 'other', `${slug}.md`);
writeFileSync(outPath, content);
console.log(`Created: ${outPath}`);

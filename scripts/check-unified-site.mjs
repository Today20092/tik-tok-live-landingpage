/* global console, URL */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run after pnpm build. Shared navigation must survive every step of the journey.
const pages = [
  ['index.html', '/', 'page'],
  ['articles/index.html', '/articles/', 'page'],
  ['articles/why-i-started/index.html', '/articles/', 'location'],
  ['articles/welcome/index.html', '/articles/', 'location'],
  ['search/index.html', '/search/', 'page'],
];
for (const [path, activeHref, activeKind] of pages) {
  const html = await readFile(
    new URL(`../dist/${path}`, import.meta.url),
    'utf8'
  );
  const header = html.match(
    /<header\b[^>]*data-site-header[^>]*>([\s\S]*?)<\/header>/
  )?.[1];
  assert.ok(header, `${path}: shared identity is present`);
  assert.ok(header.includes('Islam with Ayoub'), `${path}: site name`);
  const nav = header.match(
    /<nav\b[^>]*aria-label="Site"[^>]*>([\s\S]*?)<\/nav>/
  )?.[1];
  assert.ok(nav, `${path}: site navigation`);
  const anchors = [...nav.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.deepEqual(
    anchors.map((a) => a[2].trim()),
    ['Links', 'Articles', 'About', 'Search']
  );
  assert.deepEqual(
    anchors.map((a) => a[1].match(/href="([^"]+)"/)?.[1]),
    ['/', '/articles/', '/articles/why-i-started/', '/search/']
  );
  const active = anchors.filter((a) => a[1].includes('aria-current='));
  assert.equal(active.length, 1, `${path}: one active section`);
  assert.ok(active[0][1].includes(`href="${activeHref}"`));
  assert.ok(active[0][1].includes(`aria-current="${activeKind}"`));
  assert.ok(html.includes('data-site-footer'), `${path}: shared footer`);
  assert.ok(
    html.includes('id="main-content"'),
    `${path}: skip-link destination`
  );
  assert.ok(
    !html.includes('data-palette-preview'),
    `${path}: production palette is consistent`
  );
}
const article = await readFile(
  new URL('../dist/articles/why-i-started/index.html', import.meta.url),
  'utf8'
);
const toc = article.match(
  /<nav\b[^>]*aria-labelledby="article-contents-title"[^>]*>([\s\S]*?)<\/nav>/
)?.[1];
assert.ok(toc, 'Long article retains its table of contents');
for (const [, id] of toc.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(article.includes(`id="${id}"`), `Contents target ${id} exists`);
}
assert.ok(
  article.includes('Resources mentioned'),
  'Article offers a path to its resources'
);
const listing = await readFile(
  new URL('../dist/articles/index.html', import.meta.url),
  'utf8'
);
const entries = [...listing.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
assert.ok(entries.length > 0, 'Published articles are listed');
for (const [, entry] of entries) {
  assert.ok(
    /<time\b[^>]*datetime="\d{4}-\d{2}-\d{2}"/.test(entry),
    'Every article has its publication date'
  );
  assert.ok(
    /<p\b[^>]*>\s*\S/.test(entry),
    'Every article has a short description'
  );
  assert.ok(!/bg-card|shadow-|ring-1/.test(entry), 'No article boxes');
}
assert.ok(
  !listing.includes('article-layout'),
  'Comparison controls are removed'
);
console.log(
  'Unified navigation, identity, footer, and article journey checks passed.'
);

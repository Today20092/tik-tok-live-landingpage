/* global process, fetch, URL, console */
import assert from 'node:assert/strict';

// Run with pnpm dev active: node scripts/check-toc.mjs [dev-server-url]
const base = process.argv[2] ?? 'http://127.0.0.1:4321';
async function page(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
}
const draft = await page('/articles/writing-your-first-article/');
const toc = draft.match(/<nav\b[^>]*aria-labelledby="article-contents-title"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
assert.ok(toc, 'Multi-section article needs a table of contents');
const targets = [...toc.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const headings = [...draft.matchAll(/<h2\b[^>]*id="([^"]+)"[^>]*>/g)]
  .map((match) => match[1]).filter((id) => id !== 'article-contents-title');
assert.deepEqual(targets, headings, 'Contents must match rendered h2 targets in order');
assert.equal(targets.length, 2, 'Fixture has two major sections');
const welcome = await page('/articles/welcome/');
assert.ok(!welcome.includes('article-contents-title'), 'Short welcome needs no table of contents');
console.log('Table of contents checks passed.');

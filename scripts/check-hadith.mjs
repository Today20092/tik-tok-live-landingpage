import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const response = await globalThis.fetch(`${process.env.TEST_BASE_URL ?? 'http://127.0.0.1:4321'}/articles/hadith-template/`);
assert.equal(response.status, 200, 'Start pnpm dev before checking the hadith preview');
const html = await response.text();
const entries = JSON.parse(readFileSync('src/data/hadith.json', 'utf8'));
const figures = [...html.matchAll(/<figure[^>]*data-hadith="[^"]+"[^>]*>[\s\S]*?<\/figure>/g)].map(([figure]) => figure);
assert.equal(figures.length, 2);
assert.ok(figures[0].includes(entries['muslim-55a'].arabic));
assert.match(figures[0], /lang="ar" dir="rtl"/);
assert.ok(!figures[1].includes('lang="ar"'), 'English-only variant must omit Arabic');
for (const [index, figure] of figures.entries()) {
  const entry = entries[index === 0 ? 'muslim-55a' : 'muslim-2699a'];
  assert.ok(figure.includes(entry.translation.replaceAll("'", '&#39;')) || figure.includes(entry.translation));
  assert.ok(figure.includes(entry.reference));
  assert.ok(figure.includes(`href="${entry.url}"`));
  assert.equal(figure.includes('Excerpt from the full hadith'), entry.excerpt);
  assert.ok(figure.indexOf('data-hadith-authenticity') > figure.indexOf('</blockquote>'), 'Metadata must follow the quotation');
  const visibleFooter = figure.split('<details')[0];
  assert.equal((visibleFooter.match(/<a\s/g) || []).length, 1, 'Only one source link before expanding details');
  assert.ok(figure.includes('<summary'));
  assert.ok(figure.includes(entry.translationSource));
  assert.ok(figure.includes('Authenticity:'));
  assert.ok(figure.includes(entry.grade.text), 'Show the recorded authenticity');
  assert.ok(figure.includes(entry.grade.attributedTo), 'Attribute the grading');
  assert.ok(figure.includes(`href="${entry.grade.url}"`), 'Link the grading source');
  assert.ok(!figure.includes('<astro-island'));
}
assert.match(html, /noindex/);
console.log('Hadith preview preserves text, references, excerpt labels, and both language variants.');

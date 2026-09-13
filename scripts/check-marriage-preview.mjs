import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import console from 'node:console';
import { URL } from 'node:url';

const response = await globalThis.fetch(`${process.env.TEST_BASE_URL ?? 'http://127.0.0.1:4321'}/articles/preparing-for-marriage/`);
assert.equal(response.status, 200, 'Start pnpm dev before checking this draft');
const html = await response.text();
const disclosure = html.match(/<p[^>]*id="marriage-book-disclosure"[^>]*>([\s\S]*?)<\/p>/)?.[1];
assert.ok(disclosure?.includes('As an Amazon Associate I earn from qualifying purchases.'), 'Disclosure text must stay inside its styled, accessible paragraph');
assert.ok(!disclosure.includes('<p'), 'MDX must not create a nested paragraph');
assert.match(html, /aria-describedby="marriage-book-disclosure"/);
assert.match(html, /rel="sponsored noopener noreferrer"/);
assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), 'Published article must be indexable');
const quranLinks = [...html.matchAll(/href="(https:\/\/quran\.com\/[^"]+)"/g)].map((match) => match[1]);
assert.equal(quranLinks.length, 11, 'Keep all Quran references, including the displayed verse');
assert.ok(quranLinks.every((href) => new URL(href).searchParams.get('translations') === '85'), 'Quran references must select Abdel Haleem');
assert.ok(!html.includes('alazharclasses.com'), 'Quran references should link directly to Quran.com');
for (const [attribute, key, file] of [
  ['data-quran-verse', '28:24', 'quran-verses'],
  ['data-hadith', 'bukhari-5066', 'hadith'],
]) {
  const entry = JSON.parse(readFileSync(`src/data/${file}.json`, 'utf8'))[key];
  const figure = html.match(new RegExp(`<figure[^>]*${attribute}="${key}"[^>]*>[\\s\\S]*?</figure>`))?.[0];
  assert.ok(figure, `Missing reusable quotation: ${key}`);
  assert.ok(figure.includes(entry.translation), `Changed quotation: ${key}`);
  if (entry.arabic) {
    assert.ok(figure.includes(entry.arabic));
    assert.match(figure, /lang="ar" dir="rtl"/);
  }
  assert.match(figure, /excerpt/i);
}
console.log('Marriage article: disclosure markup, affiliate link, quotations, Quran references, and indexability passed.');

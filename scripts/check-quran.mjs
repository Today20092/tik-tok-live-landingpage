import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/articles/why-i-started/index.html', 'utf8');
const verses = JSON.parse(readFileSync('src/data/quran-verses.json', 'utf8'));
for (const key of ['16:125', '61:2', '61:3']) {
  const figure = html.match(
    new RegExp(`<figure[^>]*data-quran-verse="${key}"[^>]*>[\\s\\S]*?</figure>`)
  )?.[0];
  assert.ok(figure, `Missing passage ${key}`);
  assert.match(figure, /lang="ar" dir="rtl"/);
  assert.match(figure, /lang="en" dir="ltr"/);
  assert.ok(figure.includes(verses[key].arabic), `Arabic changed for ${key}`);
  assert.ok(
    figure.includes(verses[key].translation),
    `Translation changed for ${key}`
  );
  assert.ok(
    figure.includes(verses[key].translator),
    `Missing attribution for ${key}`
  );
  assert.ok(
    figure.includes(`href="https://quran.com/${key.replace(':', '/')}${verses[key].translator === 'M. A. S. Abdel Haleem' ? '?translations=85' : ''}"`)
  );
  assert.ok(figure.includes('quotation_arabic'), 'Passages must use the shared Arabic typography');
  assert.match(readFileSync('src/styles/lumos/shared.css', 'utf8'), /\.quotation_arabic\s*\{[^}]*font-family:\s*'Amiri Quran',\s*serif/, 'Shared Arabic typography must use Amiri Quran');
  assert.ok(!figure.includes('<astro-island'), 'Passages must render without hydration');
}
assert.match(html, /<html lang="en">/);
const about = readFileSync('dist/articles/about-me/index.html', 'utf8');
const excerpt = about.match(/<figure[^>]*data-quran-verse="4:29"[^>]*>[\s\S]*?<\/figure>/)?.[0];
assert.ok(excerpt?.includes('4:29 (excerpt)'), 'Partial verses must be labeled as excerpts');
assert.ok(excerpt.includes(verses['4:29'].translation), 'The selected translation must render unchanged');
assert.ok(excerpt.includes(verses['4:29'].arabic), 'The aligned Arabic excerpt must render unchanged');
assert.ok(excerpt.includes('Saheeh International'), 'The selected translator must be credited');
assert.ok(
  !html.includes('Compare Arabic fonts'),
  'Font comparison controls must be removed'
);
console.log(
  'Quran passages preserve checked text, direction, attribution, and exact links.'
);

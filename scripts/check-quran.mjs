import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/articles/why-i-started/index.html', 'utf8');
const verses = JSON.parse(readFileSync('src/data/quran-verses.json', 'utf8'));
for (const key of ['61:2', '61:3']) {
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
    figure.includes(`href="https://quran.com/${key.replace(':', '/')}"`)
  );
  assert.ok(figure.includes('Amiri_Quran'), 'Passages must use Amiri Quran');
  assert.ok(!figure.includes('<astro-island'), 'Passages must render without hydration');
}
assert.match(html, /<html lang="en">/);
assert.ok(
  !html.includes('Compare Arabic fonts'),
  'Font comparison controls must be removed'
);
console.log(
  'Quran passages preserve checked text, direction, attribution, and exact links.'
);

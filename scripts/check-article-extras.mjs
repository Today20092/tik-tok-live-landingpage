import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { URL } from 'node:url';
import console from 'node:console';
import { readingTime } from '../src/lib/reading-time.ts';

assert.equal(readingTime(''), 1);
assert.equal(readingTime('word '.repeat(401)), 3);
assert.equal(readingTime('word '.repeat(190) + '\n<QuranVerse verse="2:261" />'), 2, 'Include displayed scripture in the estimate');
assert.equal(readingTime('Read [this](https://example.com/' + 'path/'.repeat(500) + ')'), 1, 'Do not count link destinations');
const root = new URL('../dist/articles/', import.meta.url);
for (const dir of readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const html = readFileSync(new URL(`${dir.name}/index.html`, root), 'utf8');
  assert.match(html, /About \d+ min read/);
  assert.match(html, /ArticleImageViewer/);
  const related = html.match(/<nav aria-labelledby="read-next"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(related, `${dir.name} needs read-next links`);
  assert.ok(!related.includes(`href="/articles/${dir.name}/"`), 'Never recommend the current article');
  assert.ok(!related.includes('hadith-template') && !related.includes('writing-your-first-article'), 'Never recommend drafts');
}
console.log('Article extras checked: reading estimates, quote text, and published recommendations.');

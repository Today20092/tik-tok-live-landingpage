import assert from 'node:assert/strict';
import console from 'node:console';
import { URL } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';

// Run after pnpm build: node scripts/check-mobile-hub.mjs
const links = JSON.parse(
  readFileSync(
    new URL('../src/content/links/links.json', import.meta.url),
    'utf8'
  )
);
const html = readFileSync(
  new URL('../dist/index.html', import.meta.url),
  'utf8'
);
for (const link of links) {
  assert.ok(
    html.includes(`href="${link.url.replaceAll('&', '&amp;')}"`),
    `Missing resource: ${link.title}`
  );
}
for (const id of ['read', 'copies', 'join', 'watch']) {
  assert.ok(html.includes(`id="${id}"`), `Missing navigation target: ${id}`);
}
assert.ok(!html.includes('aria-label="Compare layouts"'));
assert.ok(!html.includes('role="tab"'));
assert.ok(html.includes('Read the Quran online'));
assert.ok(html.includes('The Clear Quran'));
assert.ok(
  html.includes('For non-Muslims in the USA. One free copy per order.')
);
assert.ok(html.includes('Free PDF'));
assert.ok(html.includes('Free for non-Muslims'));
assert.ok(html.includes('rel="canonical" href="https://islam.ayoubabed.xyz/"'));
assert.ok(html.includes('application/ld+json'));
for (const retired of ['pocket', 'journal', 'focus']) {
  assert.ok(
    !existsSync(new URL(`../dist/${retired}/index.html`, import.meta.url)),
    `${retired}/ was retired and must not be built`
  );
}
assert.ok(
  !existsSync(
    new URL(
      '../dist/articles/writing-your-first-article/index.html',
      import.meta.url
    )
  ),
  'Draft articles must not be built'
);
const articleIndex = readFileSync(
  new URL('../dist/articles/index.html', import.meta.url),
  'utf8'
);
assert.ok(
  !articleIndex.includes('Writing your first article'),
  'Drafts must not appear in the article list'
);
assert.ok(
  articleIndex.includes('https://islam.ayoubabed.xyz/articles/'),
  'Articles need their own canonical URL'
);
console.log(
  'The hub preserves resource links, navigation targets, eligibility, and SEO.'
);

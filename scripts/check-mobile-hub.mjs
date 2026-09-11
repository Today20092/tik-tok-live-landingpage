import assert from 'node:assert/strict';
import console from 'node:console';
import { URL } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';

// Run after npm run build: node scripts/check-mobile-hub.mjs
const links = JSON.parse(
  readFileSync(
    new URL('../src/content/links/links.json', import.meta.url),
    'utf8'
  )
);
for (const variant of ['', 'pocket/', 'journal/', 'focus/']) {
  const html = readFileSync(
    new URL(`../dist/${variant}index.html`, import.meta.url),
    'utf8'
  );
  for (const link of links.filter((item) => item.variant !== 'charity')) {
    assert.ok(
      html.includes(`href="${link.url.replaceAll('&', '&amp;')}"`),
      `Missing resource: ${link.title}`
    );
  }
  assert.ok(
    !html.includes('Choose a design edition'),
    'The comparison UI must not distract visitors'
  );
  for (const id of ['read', 'copies', 'watch', 'more']) {
    assert.ok(html.includes(`id="${id}"`), `Missing navigation target: ${id}`);
  }
  if (variant === '' || variant === 'pocket/') {
    assert.ok(!html.includes('aria-label="Compare layouts"'));
    assert.ok(!html.includes('role="tab"'));
    assert.ok(html.includes('Read Quran in English'));
    assert.ok(html.includes('Request The Clear Quran'));
    assert.ok(html.includes('Free for non-Muslims in the USA. One copy.'));
  } else {
    assert.ok(html.includes('Request a copy'));
    assert.ok(html.includes('USA only. One English copy'));
  }
  assert.ok(
    html.includes('rel="canonical" href="https://islam.ayoubabed.xyz/"')
  );
  assert.ok(html.includes('application/ld+json'));
  assert.ok(html.includes('Free for non-Muslims'));
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
  'All four layouts preserve resource links, navigation targets, eligibility, and SEO.'
);

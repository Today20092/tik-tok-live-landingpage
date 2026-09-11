import assert from 'node:assert/strict';
import console from 'node:console';
import { readdirSync, readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { gunzipSync } from 'node:zlib';

// Verify the actual published index, including exclusions, after pnpm build.
const fragments = new URL('../dist/pagefind/fragment/', import.meta.url);
const pages = readdirSync(fragments)
  .filter((name) => name.endsWith('.pf_fragment'))
  .map((name) => {
    const data = gunzipSync(readFileSync(new URL(name, fragments))).toString();
    return JSON.parse(data.slice('pagefind_dcd'.length));
  });
assert.ok(pages.length >= 2, 'The hub and published article must be indexed');
for (const page of pages) {
  assert.ok(
    page.url === '/' || page.url.startsWith('/articles/'),
    `Unexpected indexed page: ${page.url}`
  );
  assert.ok(
    !page.url.includes('writing-your-first-article'),
    'Drafts must stay out of search'
  );
  assert.ok(
    !page.content.includes('Search the site'),
    'Navigation must stay out of search'
  );
}
const hub = pages.find((page) => page.url === '/');
assert.match(
  hub.content,
  /English Free translation/,
  'Card labels need word boundaries'
);
assert.ok(
  !hub.content.includes('Welcome to Live with Ayoub'),
  'Article teasers must not duplicate article results'
);
const article = pages.find((page) => page.url === '/articles/welcome/');
assert.ok(
  article.content.includes('Eligibility and delivery depend on the provider'),
  'Full article text must be indexed'
);
assert.equal(article.meta.title, 'Welcome to Live with Ayoub');
assert.deepEqual(article.filters.Type, ['Articles']);
assert.deepEqual(hub.filters.Type, ['Resources']);
console.log(
  `Search index checked: ${pages.length} published pages, body text, filters, and exclusions.`
);

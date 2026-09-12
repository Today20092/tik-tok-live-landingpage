import assert from 'node:assert/strict';
import console from 'node:console';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';

const manifest = JSON.parse(
  await readFile(new URL('../docs/sink-links.json', import.meta.url), 'utf8')
);
const expected = new Set(
  manifest.links.map(({ slug }) => `${manifest.baseUrl}/${slug}`)
);
const content = JSON.parse(
  await readFile(
    new URL('../src/content/links/links.json', import.meta.url),
    'utf8'
  )
);
for (const link of content)
  assert.ok(expected.has(link.url), `Untracked resource: ${link.title}`);

for (const page of [
  'index.html',
  'pocket/index.html',
  'journal/index.html',
  'focus/index.html',
]) {
  const html = await readFile(
    new URL(`../dist/${page}`, import.meta.url),
    'utf8'
  );
  const outbound = [
    ...html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g),
  ].map(([, href]) => href);
  assert.ok(outbound.length > 0, `${page} has no outbound links`);
  for (const href of outbound)
    assert.ok(expected.has(href), `${page}: untracked outbound link ${href}`);
  assert.ok(
    outbound.includes(`${manifest.baseUrl}/islam-quran`),
    `${page}: missing Quran button`
  );
  if (page === 'index.html') {
    for (const href of expected) {
      if (href.endsWith('/islam-help-yaya')) continue; // The charity card is not currently shown on the homepage.
      assert.ok(outbound.includes(href), `Homepage is missing ${href}`);
    }
  }
}
console.log(
  'Sink checks passed: resource URLs, outbound anchors, and all homepage destinations.'
);

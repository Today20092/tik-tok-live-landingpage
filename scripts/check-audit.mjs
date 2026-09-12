import assert from 'node:assert/strict';
import console from 'node:console';
import { URL } from 'node:url';
import { readFile, stat } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const readPage = (path) => readFile(new URL(path, dist), 'utf8');
const canonical = 'https://islam.ayoubabed.xyz/';
const headers = await readPage('_headers');
assert.ok(headers.includes("'wasm-unsafe-eval'"), 'Pagefind requires CSP permission for WebAssembly');
assert.ok(headers.includes("worker-src 'self' blob:"), 'Pagefind requires CSP permission for its worker');

const courtyard = await stat(new URL('courtyard.webp', dist));
assert.ok(courtyard.size < 1024 * 1024, 'courtyard.webp must stay below 1 MB');
for (const page of ['journal/index.html', 'focus/index.html']) {
  const html = await readPage(page);
  assert.ok(html.includes('src="/courtyard.webp"'), `${page} must use courtyard.webp`);
  assert.ok(!html.includes('courtyard.png'), `${page} still references courtyard.png`);
  assert.ok(
    /<img src="\/courtyard\.webp"[^>]*fetchpriority="high"/.test(html),
    `${page} courtyard hero must have high fetch priority`
  );
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${page} must keep the homepage canonical`);
}

const parseJsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    ([, json]) => JSON.parse(json)
  );
for (const page of ['articles/about-me/index.html', 'articles/why-i-started/index.html']) {
  const html = await readPage(page);
  const article = parseJsonLd(html).find((item) => item['@type'] === 'Article');
  assert.ok(article, `${page} must contain Article structured data`);
  assert.deepEqual(article.publisher, {
    '@type': 'Person',
    name: 'Ayoub Abedrabbo',
    url: 'https://ayoubabed.xyz/',
  });
  const visibleDates = [...html.matchAll(/<time datetime="([^"]+)">([\s\S]*?)<\/time>/g)];
  assert.ok(
    visibleDates.some(([, datetime]) => datetime === article.datePublished),
    `${page} visible time must match datePublished`
  );
}

console.log('Audit regression checks passed: image asset, loading/canonical output, and article metadata.');

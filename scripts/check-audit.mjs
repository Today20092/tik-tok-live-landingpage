import assert from 'node:assert/strict';
import console from 'node:console';
import { URL } from 'node:url';
import { readFile, stat } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const readPage = (path) => readFile(new URL(path, dist), 'utf8');
const canonical = 'https://islam.ayoubabed.xyz/';
const headers = await readPage('_headers');
assert.ok(
  headers.includes("'wasm-unsafe-eval'"),
  'Pagefind requires CSP permission for WebAssembly'
);
assert.ok(
  headers.includes("worker-src 'self' blob:"),
  'Pagefind requires CSP permission for its worker'
);

for (const page of ['journal/index.html', 'focus/index.html']) {
  const html = await readPage(page);
  const courtyard = html.match(
    /<img\b[^>]*src="([^"]*\/_astro\/courtyard\.[^"]+\.webp)"[^>]*>/
  )?.[0];
  assert.ok(courtyard, `${page} must use an optimized courtyard image`);
  const asset = courtyard.match(/src="([^"]+)"/)[1];
  assert.ok(
    (await stat(new URL(`.${asset}`, dist))).size < 1024 * 1024,
    'courtyard image must stay below 1 MB'
  );
  assert.ok(
    !html.includes('courtyard.png'),
    `${page} still references courtyard.png`
  );
  assert.ok(
    courtyard.includes('fetchpriority="high"') &&
      courtyard.includes('loading="eager"'),
    `${page} courtyard hero must have high fetch priority`
  );
  assert.ok(
    html.includes(`rel="canonical" href="${canonical}"`),
    `${page} must keep the homepage canonical`
  );
}

const homepage = await readPage('index.html');
assert.ok(
  !homepage.includes('src="https://i.ytimg.com/'),
  'Thumbnails must be optimized locally'
);
for (const name of ['ayoub-portrait', 'hqdefault']) {
  const image = homepage.match(
    new RegExp(`<img\\b[^>]*src="[^"]*/_astro/${name}[._][^"]+\\.webp"[^>]*>`)
  )?.[0];
  assert.ok(image, `Homepage must render optimized ${name}`);
  assert.ok(image.includes('srcset='), `${name} must offer responsive sizes`);
}

const parseJsonLd = (html) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    ),
  ].map(([, json]) => JSON.parse(json));
for (const page of [
  'articles/about-me/index.html',
  'articles/why-i-started/index.html',
]) {
  const html = await readPage(page);
  const article = parseJsonLd(html).find((item) => item['@type'] === 'Article');
  assert.ok(article, `${page} must contain Article structured data`);
  assert.deepEqual(article.publisher, {
    '@type': 'Person',
    name: 'Ayoub Abedrabbo',
    url: 'https://ayoubabed.xyz/',
  });
  const visibleDates = [
    ...html.matchAll(/<time datetime="([^"]+)">([\s\S]*?)<\/time>/g),
  ];
  assert.ok(
    visibleDates.some(([, datetime]) => datetime === article.datePublished),
    `${page} visible time must match datePublished`
  );
}

console.log(
  'Audit regression checks passed: image asset, loading/canonical output, and article metadata.'
);

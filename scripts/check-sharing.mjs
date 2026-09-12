/* global console, URL, DOMException */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Run after pnpm build: node scripts/check-sharing.mjs
const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
for (const path of [
  '',
  'articles/',
  'articles/welcome/',
  'articles/why-i-started/',
]) {
  const html = read(`dist/${path}index.html`);
  const canonical = `https://islam.ayoubabed.xyz/${path}`;
  assert.ok(html.includes(`data-url="${canonical}"`));
  assert.ok(
    html.includes('property="og:site_name" content="Islam with Ayoub"')
  );
  assert.ok(html.includes('property="og:image:alt"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(
    html.includes('https://islam.ayoubabed.xyz/islam-with-ayoub-share.png')
  );
  if (path.startsWith('articles/') && path !== 'articles/') {
    assert.ok(html.includes('property="og:type" content="article"'));
    assert.ok(html.includes('property="article:published_time"'));
  }
}
const source = read('src/components/SharePage.astro').match(
  /<script>([\s\S]*?)<\/script>/
)[1];
const script = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
for (const mode of [
  'native',
  'cancel',
  'copy',
  'native-error',
  'clipboard-error',
]) {
  const handlers = {};
  const status = {};
  let copied;
  let shared;
  let selected = false;
  const fallback = {
    hidden: true,
    querySelector: () => ({
      select: () => {
        selected = true;
      },
    }),
  };
  const section = {
    dataset: {
      title: 'Article',
      description: 'Description',
      url: 'https://islam.ayoubabed.xyz/articles/welcome/',
    },
    querySelector: (selector) =>
      selector === '[data-share-status]'
        ? status
        : selector === '[data-share-fallback]'
          ? fallback
          : {
              addEventListener: (_, handler) => {
                handlers[selector] = handler;
              },
            },
  };
  const navigator = {
    clipboard: {
      writeText: async (url) => {
        if (mode === 'clipboard-error') throw Error('Denied');
        copied = url;
      },
    },
    ...(mode === 'copy' || mode === 'clipboard-error'
      ? {}
      : {
          share: async (data) => {
            if (mode === 'cancel')
              throw new DOMException('Cancelled', 'AbortError');
            if (mode === 'native-error') throw Error('Unavailable');
            shared = data;
          },
        }),
  };
  runInNewContext(script, {
    document: { querySelectorAll: () => [section] },
    navigator,
    DOMException,
  });
  await handlers['[data-native-share]']();
  if (mode === 'native') assert.equal(shared.url, section.dataset.url);
  if (mode === 'cancel' || mode === 'native') assert.equal(copied, undefined);
  if (mode === 'copy' || mode === 'native-error')
    assert.equal(copied, section.dataset.url);
  if (mode === 'clipboard-error') assert.ok(!fallback.hidden && selected);
  if (mode === 'native') {
    await handlers['[data-copy-link]']();
    assert.equal(copied, section.dataset.url);
  }
}
console.log(
  'Sharing metadata, native sharing, cancellation, copy, and manual fallback pass.'
);

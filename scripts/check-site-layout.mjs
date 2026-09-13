/* global document, getComputedStyle, requestAnimationFrame */
import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const routes = readdirSync(new URL('../dist/', import.meta.url), { recursive: true })
  .filter(file => /(?:^|[/\\])(?:index|404)\.html$/.test(file))
  .map(file => '/' + file.replaceAll('\\', '/').replace(/index\.html$/, ''));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const route of routes) {
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const dark of [false, true]) {
        for (const size of ['100%', '200%']) {
          await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4321') + route);
          await page.evaluate(() => document.fonts.ready);
          // Start each text-size check on a fresh document to avoid stale rem layout.
          const recommendations = page.getByRole('button', { name: 'Read more', exact: true });
          while (await recommendations.count()) await recommendations.first().click();
          await page.evaluate(() => document.querySelectorAll('details').forEach(el => el.open = true));
          await page.evaluate(({ dark, size }) => {
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.style.fontSize = size;
          }, { dark, size });
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          const problems = await page.evaluate(() => {
            const errors = [];
            if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) errors.push('horizontal overflow: ' + [...document.querySelectorAll('.site-shell *')].filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0,5).map(el => el.className).join(', '));
            for (const el of document.querySelectorAll('.site-shell :is(h1,h2,h3,h4,h5,h6,p)')) {
              if (!el.getClientRects().length) continue;
              if (getComputedStyle(el, '::before').content !== 'none' || getComputedStyle(el, '::after').content !== 'none') errors.push(`trimmed text: ${el.className}`);
            }
            for (const el of document.querySelectorAll('.pocket-hub_title, .learning-videos_h3, .share-page_share-title')) {
              if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) errors.push(`text exceeds box: ${el.className} ${el.scrollWidth}/${el.clientWidth} ${el.scrollHeight}/${el.clientHeight}`);
            }
            return errors;
          });
          assert.deepEqual(problems, [], `${route} ${width}px ${dark ? 'dark' : 'light'} ${size}`);
        }
      }
    }
    console.log(`${route}: full text boxes and expanded content fit at four widths, both themes, and 100%/200% text.`);
  }
} finally {
  await browser.close();
}

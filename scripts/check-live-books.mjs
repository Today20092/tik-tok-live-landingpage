/* global document, window, getComputedStyle */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import console from 'node:console';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';
const routes = process.env.BUILT_SITE ? ['/', '/pocket/'] : ['/', '/reading-preview/note/', '/reading-preview/split/', '/reading-preview/minimal/'];
mkdirSync(new URL('../.scratch/', import.meta.url), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const route of routes) {
    for (const width of [320, 390, 768, 1280]) {
      for (const dark of [false, true]) {
        for (const size of ['100%', '200%']) {
          await page.setViewportSize({ width, height: 900 });
          const response = await page.goto(base + route);
          assert.equal(response.status(), 200);
          await page.evaluate(async ({ dark, size }) => {
            await document.fonts.ready;
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.style.fontSize = size;
          }, { dark, size });
          assert.equal(await page.locator('nav[aria-label="Find what you came for"]').count(), 0);
          assert.equal(await page.locator('#join a[href="https://go.alphabravomedia.co/islam-youtube"]').count(), 1);
          assert.equal(await page.locator('.site-shell h1').count(), 1);
          if (await page.locator('.reading-resources--split').count()) {
            assert.ok(await page.evaluate(() => {
              const header = document.querySelector('.site-header').getBoundingClientRect();
              const cover = document.querySelector('.reading-cover').getBoundingClientRect();
              return cover.top - header.bottom <= parseFloat(getComputedStyle(document.querySelector('.pocket-hub_content')).paddingTop) + 1;
            }), 'Only the intended container padding separates the header and cover');
          }
          await page.getByRole('link', { name: 'My print edition ↗' }).focus();
          assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle !== 'none'), true);
          for (const summary of await page.locator('.reading-resources summary, .live-help_details summary').all()) {
            await summary.focus();
            await page.keyboard.press('Enter');
            assert.equal(await summary.evaluate(el => el.parentElement.open), true);
          }
          assert.match(await page.locator('#copies').innerText(), /Non-Muslims in the USA/);
          for (const shelf of await page.locator('.reading-carousel').all()) {
            const boxes = await shelf.locator('.reading-book').evaluateAll(cards => cards.map(card => {
              const image = card.querySelector('.reading-book-cover').getBoundingClientRect();
              const button = card.querySelector('a').getBoundingClientRect();
              return [image.width, image.height, button.width, button.height, button.top];
            }));
            assert.ok(boxes.every(box => box.every((value, i) => Math.abs(value - boxes[0][i]) <= 1)), 'Image frames and buttons align across each shelf');
            await shelf.locator('a').last().focus();
            assert.ok(await shelf.evaluate(el => el.scrollWidth <= el.clientWidth + 1 || el.scrollLeft > 0), 'Keyboard focus reveals later books');
          }
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1), false, `${route} overflow at ${width}, ${dark}, ${size}`);
          const gap = await page.locator('#start-title').evaluate(el => el.nextElementSibling.getBoundingClientRect().top - el.getBoundingClientRect().bottom);
          assert.equal(await page.locator('.live-help_details summary').evaluate(el => getComputedStyle(el).justifyContent), 'space-between');
          assert.ok(gap >= 15, `Welcome heading gap: ${gap}`);
          if (!route.includes('minimal')) {
            const inset = await page.locator('.reading-cover img').evaluate(el => {
              const image = el.getBoundingClientRect(), box = el.parentElement.getBoundingClientRect();
              return Math.min(image.left - box.left, box.right - image.right);
            });
            assert.ok(inset >= 12, `Cover inset: ${inset}`);
          }
          if ([390, 1280].includes(width) && size === '100%') {
            await page.evaluate(() => { document.querySelectorAll('details').forEach(el => el.open = false); document.activeElement.blur(); window.scrollTo(0, 0); });
            const name = route.split('/').filter(Boolean).at(-1) || 'home';
            await page.screenshot({ path: fileURLToPath(new URL(`../.scratch/reading-${name}-${width}-${dark ? 'dark' : 'light'}.png`, import.meta.url)), fullPage: true });
          }
        }
      }
    }
    console.log(`${route}: layouts, expanded eligibility, keyboard controls, cover spacing and welcome gap pass in both themes at four widths and 200% text.`);
  }
} finally { await browser.close(); }

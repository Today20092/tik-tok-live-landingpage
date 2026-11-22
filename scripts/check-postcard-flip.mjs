/* global document, getComputedStyle */
import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { createRequire } from 'node:module';

// Run after pnpm build, with pnpm preview running.
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + '/printables/', { waitUntil: 'networkidle' });

const card = page.locator('.postcard-flip').first();
await card.scrollIntoViewIfNeeded();

// The first row peeks once when it comes into view, then settles back.
await page.locator('.postcard-flip.is-peeking').first().waitFor({ timeout: 3000 });
await page.waitForFunction(() => !document.querySelector('.postcard-flip.is-peeking'));
assert.equal(await card.getAttribute('aria-pressed'), 'false');
const side = () =>
  card.locator('.postcard-inner').evaluate((el) => getComputedStyle(el).getPropertyValue('--side').trim());

// Tap flips to the back and back again.
await card.click();
assert.equal(await card.getAttribute('aria-pressed'), 'true');
assert.match(await card.getAttribute('aria-label'), /^Show the front: /);
await card.click();
assert.equal(await card.getAttribute('aria-pressed'), 'false');

const box = await card.boundingBox();
const swipe = async (distance) => {
  const y = box.y + box.height / 2;
  const x = box.x + box.width / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + distance, y, { steps: 8 });
  await page.mouse.up();
};

// A short swipe springs back and does not count as a tap.
await swipe(box.width / 8);
assert.equal(await card.getAttribute('aria-pressed'), 'false');

// A long left swipe flips and keeps turning left (two taps left it at 360deg).
await swipe(-box.width / 2);
assert.equal(await card.getAttribute('aria-pressed'), 'true');
assert.equal(await side(), '180deg');

// Keyboard flips too.
await card.focus();
await page.keyboard.press('Enter');
assert.equal(await card.getAttribute('aria-pressed'), 'false');

const backs = await page.locator('.postcard-back').evaluateAll((imgs) =>
  imgs.map((img) => img.getAttribute('src'))
);
assert.equal(backs.length, 16);
for (const src of backs) {
  const res = await page.request.get(base + src);
  assert.equal(res.status(), 200, `Missing back image: ${src}`);
}

await browser.close();
console.log('Postcard flip checks passed.');

/* global document, URL */
import assert from 'node:assert/strict';
import console from 'node:console';
import { createRequire } from 'node:module';
import process from 'node:process';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error));
  const popup = page.locator('#link-preview:popover-open');
  for (const [path, selector, title] of [
    [
      '/articles/preparing-for-marriage/',
      'a[data-footnote-ref]:has(+ .link-preview-trigger)',
      null,
    ],
    [
      '/articles/why-i-started/',
      '#article-body a[href="https://quran.com/51/56"]',
      'Qur’an 51:56',
    ],
    ['/start/', 'a[data-footnote-ref]', 'Note 1'],
  ]) {
    await page.goto(base + path);
    const link = page.locator(selector).first();
    await link
      .locator('xpath=following-sibling::*[1][self::button]')
      .waitFor({ timeout: 5000 });
    console.log(path, selector);
    await page.mouse.move(0, 0);
    await link.hover({ timeout: 5000 });
    await popup.waitFor({ timeout: 3000 });
    assert.ok(await popup.locator('p').textContent());
    if (title) assert.equal(await popup.locator('strong').textContent(), title);
    await page.keyboard.press('Escape');
    await popup.waitFor({ state: 'hidden' });
  }

  for (const path of ['/', '/articles/', '/search/', '/printables/']) {
    await page.goto(base + path);
    assert.equal(
      await page.locator('#link-preview, .link-preview-trigger').count(),
      0,
      path
    );
  }

  await page.goto(base + '/articles/preparing-for-marriage/');
  await page
    .locator('a[data-footnote-ref] + .link-preview-trigger')
    .first()
    .waitFor({ timeout: 5000 });
  assert.equal(
    await page
      .locator('a[data-footnote-ref]')
      .first()
      .locator('xpath=following-sibling::*[1][self::button]')
      .count(),
    0
  );

  await page.goto(base + '/articles/why-i-started/');
  await page
    .locator('a[href="https://quran.com/51/56"] + .link-preview-trigger')
    .first()
    .waitFor({ timeout: 5000 });
  for (const selector of [
    '.article-page_author',
    '[data-contents-link]',
    '.resource-card',
    '[data-quran-verse] a',
    '[data-hadith] a',
    'a[href="https://quran.com/61/2-3"]',
    '[data-footnotes] a',
  ]) {
    assert.equal(
      await page.locator(`${selector} + .link-preview-trigger`).count(),
      0,
      selector
    );
  }

  await page.goto(base + '/start/');
  const note = page.locator('a[data-footnote-ref]').first();
  await note.focus();
  await popup.waitFor({ timeout: 5000 });
  await page.keyboard.press('Enter');
  assert.equal(
    new URL(page.url()).hash,
    await note.evaluate((link) => link.hash)
  );
  assert.equal(
    await page
      .locator(
        '.start-hero_jumps .link-preview-trigger, [data-contents-link] + .link-preview-trigger'
      )
      .count(),
    0
  );

  const touch = await browser.newPage({
    viewport: { width: 390, height: 820 },
    hasTouch: true,
    isMobile: true,
  });
  await touch.goto(base + '/start/');
  const trigger = touch
    .locator('a[data-footnote-ref] + .link-preview-trigger')
    .first();
  await trigger.tap();
  await touch.locator('#link-preview:popover-open').waitFor();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  if (process.env.SCREENSHOT_PATH)
    await touch.screenshot({ path: process.env.SCREENSHOT_PATH });
  await touch.getByRole('button', { name: 'Close preview' }).tap();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  assert.ok(
    await trigger.evaluate((element) => element === document.activeElement)
  );
  assert.deepEqual(errors, []);
  console.log(
    'Link previews support hover, keyboard focus, touch, and dismissal.'
  );
} finally {
  await browser.close();
}

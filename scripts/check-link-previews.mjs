/* global document */
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
    ['/', 'a[data-preview]', 'Meadows of the Righteous'],
    ['/', 'a.learning-videos_watch', 'Stories of the Prophets'],
    ['/articles/preparing-for-marriage/', 'a[data-footnote-ref]', 'Note 1'],
    ['/articles/preparing-for-marriage/', 'a.article-page_author', null],
    ['/start/', '.start-hero_jumps a', 'What Muslims believe'],
    ['/printables/', 'a[href="/start/"]', 'Getting to Know Islam'],
    ['/start/', '#print + p a', 'Getting to Know Islam'],
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

  await page.goto(base + '/start/');
  await page.locator('.start-hero_jumps a').first().focus();
  await popup.waitFor();
  await page.keyboard.press('Enter');
  assert.match(page.url(), /#what-muslims-believe$/);

  const touch = await browser.newPage({
    viewport: { width: 390, height: 820 },
    hasTouch: true,
    isMobile: true,
  });
  await touch.goto(base + '/start/');
  const trigger = touch
    .locator('.start-hero_jumps .link-preview-trigger')
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

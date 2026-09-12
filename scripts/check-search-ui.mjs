/* global document */
import assert from 'node:assert/strict';
import console from 'node:console';
import { createRequire } from 'node:module';
import process from 'node:process';

// Run after pnpm build and pnpm preview. PLAYWRIGHT_MODULE may point to a
// shared Playwright installation instead of adding it to this static site.
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const browser = await chromium.launch();
try {
  for (const { width, theme } of [320, 390, 640, 1280].flatMap(width => ['light', 'dark'].map(theme => ({ width, theme })))) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, colorScheme: theme });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(
      `${process.env.TEST_BASE_URL || 'http://127.0.0.1:4321'}/search/?q=Islam`
    );
    await page
      .locator('astro-island[component-export="default"]:not([ssr])')
      .first()
      .waitFor();
    const input = page.getByRole('searchbox', {
      name: 'Search articles and resources',
    });
    const clear = page.getByRole('button', {
      name: 'Clear search',
      exact: true,
    });
    await page.waitForFunction(
      () => document.querySelectorAll('.pf-result-link').length === 4
    );
    assert.equal(
      await input.inputValue(),
      'Islam',
      'Shared URL restores the field'
    );
    await clear.click();
    assert.equal(await input.inputValue(), '');
    await page.waitForURL((url) => !url.searchParams.has('q'));
    assert.ok(
      await input.evaluate((element) => element === document.activeElement)
    );
    await input.fill('Islam');
    await input.press('Enter');
    await page.waitForURL((url) => url.searchParams.get('q') === 'Islam');
    await page.locator('.pf-dropdown-trigger').click();
    const menu = await page.locator('.pf-dropdown-menu').boundingBox();
    assert.ok(
      menu.x >= 0 && menu.x + menu.width <= width,
      'Filter stays within viewport'
    );
    await page.getByRole('option', { name: /Articles/ }).click();
    await page.waitForFunction(
      () => document.querySelectorAll('.pf-result-link').length === 3
    );
    await page.keyboard.press('Escape');
    await page
      .getByRole('button', { name: 'Clear Content type', exact: true })
      .click();
    await page.waitForFunction(
      () => document.querySelectorAll('.pf-result-link').length === 4
    );
    await input.fill('zzzznonexistentword');
    await page.waitForURL(
      (url) => url.searchParams.get('q') === 'zzzznonexistentword'
    );
    await page.waitForFunction(
      () => document.querySelectorAll('.pf-result-link').length === 0
    );
    assert.deepEqual(errors, [], 'No browser errors');
    console.log(
      `${width}px ${theme}: URL, typing, clear, filters, empty results, and layout passed`
    );
    await page.close();
  }
} finally {
  await browser.close();
}

/* global document, getComputedStyle */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import process from 'node:process';
import console from 'node:console';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const width of [384, 412, 430]) {
    for (const dark of [false, true]) {
      await page.setViewportSize({ width, height: 700 });
      await page.goto('http://127.0.0.1:4336/');
      await page.evaluate(async dark => { await document.fonts.ready; document.documentElement.classList.toggle('dark', dark); }, dark);
      const header = await page.locator('.site-header').boundingBox();
      assert.ok(header.height <= 70, `Header height: ${header.height}`);
      const action = await page.getByRole('link', { name: 'My print edition ↗' }).boundingBox();
      assert.ok(action.y + action.height < 700, `Actions fit at ${width}px`);
      await page.getByRole('link', { name: 'Download free PDF ↗' }).focus();
      assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle !== 'none'), true);
      const menu = page.locator('.site-header_menu summary');
      await menu.focus();
      await page.keyboard.press('Enter');
      assert.ok(await page.getByRole('navigation', { name: 'Mobile site navigation' }).isVisible());
      assert.equal(await page.getByRole('navigation', { name: 'Mobile site navigation' }).getByRole('link').count(), 4);
      await page.keyboard.press('Enter');
      await page.evaluate(() => document.activeElement.blur());
      await page.screenshot({ path: `.scratch/phone-opening-${width}-${dark ? 'dark' : 'light'}.png` });
      console.log(`${width}px ${dark ? 'dark' : 'light'}: header ${Math.round(header.height)}px; actions end at ${Math.round(action.y + action.height)}px; keyboard menu works.`);
    }
  }
  await page.setViewportSize({ width: 320, height: 700 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; document.querySelector('.site-header_menu').open = true; });
  const menuBounds = await page.getByRole('navigation', { name: 'Mobile site navigation' }).boundingBox();
  assert.ok(menuBounds.x >= 0 && menuBounds.x + menuBounds.width <= 320, 'Enlarged menu stays inside the viewport');
} finally { await browser.close(); }

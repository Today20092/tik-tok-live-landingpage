/* global document, getComputedStyle */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import process from 'node:process';
import console from 'node:console';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4322') + '/articles/why-i-started/');
    await page.locator('.section-copy-link').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    for (const dark of [false, true]) {
      for (const size of ['100%', '200%']) {
        await page.evaluate(({ dark, size }) => {
          document.documentElement.classList.toggle('dark', dark);
          document.documentElement.style.fontSize = size;
        }, { dark, size });
        for (const heading of await page.locator('.article-section-heading').all()) {
          const aligned = await heading.evaluate((element) => {
            const text = element.firstElementChild.getBoundingClientRect();
            const icon = element.lastElementChild.getBoundingClientRect();
            return getComputedStyle(element, '::before').content === 'none'
              && getComputedStyle(element, '::after').content === 'none'
              && icon.left >= text.right
              && Math.abs((icon.top + icon.bottom - text.top - text.bottom) / 2) < 1
              && icon.right <= document.documentElement.clientWidth;
          });
          assert.ok(aligned, `${width}px/${dark}/${size}: icon beside heading`);
        }
      }
    }
    const link = page.locator('.section-copy-link').first();
    await link.focus();
    assert.ok(await link.evaluate(e => e === document.activeElement && getComputedStyle(e).outlineStyle !== 'none'));
    await page.close();
  }
  console.log('Article heading icons stay aligned at all widths, themes and text sizes; focus passes.');
} finally {
  await browser.close();
}

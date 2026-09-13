/* global document, getComputedStyle */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { mkdirSync } from 'node:fs';
import process from 'node:process';
import console from 'node:console';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';
mkdirSync(new URL('../.scratch/', import.meta.url), { recursive: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1280]) {
    for (const dark of [false, true]) {
      for (const size of ['100%', '200%']) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base);
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(
          ({ dark, size }) => {
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.style.fontSize = size;
          },
          { dark, size }
        );
        assert.equal(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth >
              document.documentElement.clientWidth + 1
          ),
          false,
          `Overflow at ${width}, ${dark}, ${size}`
        );
        const firstBook = page.locator('.shelf-book').first();
        assert.match(await firstBook.innerText(), /Meadows of the Righteous/);
        assert.equal(
          await firstBook
            .getByRole('link', { name: /Find the free PDF/ })
            .count(),
          1
        );
        assert.equal(
          await firstBook
            .getByRole('link', { name: /Find my edition/ })
            .count(),
          1
        );
        assert.equal(await page.locator('.book-shelf-controls').count(), 0);
        if (width === 390 && size === '100%') {
          const action = await firstBook.getByRole('link', { name: /Find my edition/ }).boundingBox();
          assert.ok(action.y + action.height <= 900, `The print action should fit in the first mobile screen: ${action.y + action.height}`);
        }
        for (const hash of ['books', 'copies', 'start-here']) {
          assert.equal(await page.locator(`[id="${hash}"]`).count(), 1);
          await page.locator(`a[href="#${hash}"]`).first().click();
          assert.equal(new URL(page.url()).hash, `#${hash}`);
        }
        if (size === '100%' && [390, 1280].includes(width)) {
          await page.goto(base);
          await page.evaluate(
            (dark) => document.documentElement.classList.toggle('dark', dark),
            dark
          );
          await page.screenshot({
            path: new URL(
              `../.scratch/live-books-${width}-${dark ? 'dark' : 'light'}.png`,
              import.meta.url
            ).pathname.replace(/^\/(.:)/, '$1'),
            fullPage: true,
          });
        }
      }
    }
  }
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent.trim()),
    'Skip to content'
  );
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: /Find my edition: Meadows/ }).focus();
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.activeElement).outlineStyle !== 'none'
    ),
    true
  );
  console.log(
    'Live books: primary links, section navigation, keyboard focus, and layout pass at four widths, both themes, and 200% text.'
  );
} finally {
  await browser.close();
}

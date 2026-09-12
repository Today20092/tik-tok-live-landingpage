/* global document, getComputedStyle, innerWidth */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import process from 'node:process';
import console from 'node:console';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of ['/', '/articles/', '/articles/80000-hours/']) {
      await page.goto(
        (process.env.TEST_BASE_URL || 'http://127.0.0.1:4322') + route
      );
      await page.evaluate(() => document.fonts.ready);
      for (const theme of ['light', 'dark']) {
        for (const size of ['100%', '200%']) {
          await page.evaluate(
            ({ theme, size }) => {
              document.documentElement.classList.toggle(
                'dark',
                theme === 'dark'
              );
              document.documentElement.style.fontSize = size;
            },
            { theme, size }
          );
          const lists = page.locator('.article-list');
          assert.ok(await lists.count(), `${route}: article list exists`);
          for (const entry of await page.locator('.article-list_entry').all()) {
            const spacing = await entry.evaluate((element) => {
              const title = element.querySelector('.article-list_heading');
              const description = element.querySelector(
                '.article-list_description'
              );
              const time = element.querySelector('.article-list_reading-time');
              return {
                top: parseFloat(getComputedStyle(title).marginTop),
                description:
                  description.getBoundingClientRect().top -
                  title.getBoundingClientRect().bottom,
                time:
                  time.getBoundingClientRect().top -
                  description.getBoundingClientRect().bottom,
                trimmed: getComputedStyle(title, '::after').content,
              };
            });
            assert.equal(
              spacing.top,
              0,
              `${route}: no inherited heading margin`
            );
            assert.ok(
              spacing.description >= 8 && spacing.time >= 8,
              `${route}: text gaps`
            );
            assert.equal(
              spacing.trimmed,
              'none',
              `${route}: normal heading line box`
            );
          }
          assert.ok(
            await page.evaluate(
              () => [...document.querySelectorAll('.article-list, .article-list *')]
                .every((element) => element.getBoundingClientRect().right <= innerWidth + 1)
            ),
            `${route}: article list overflow`
          );
        }
      }
    }
    await page.close();
    console.log(
      `${width}px: article spacing passes in both themes at 100% and 200% text`
    );
  }
} finally {
  await browser.close();
}

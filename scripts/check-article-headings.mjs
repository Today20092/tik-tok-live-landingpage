/* global document, getComputedStyle, navigator */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import process from 'node:process';
import console from 'node:console';
import { mkdirSync } from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const browser = await chromium.launch();
const captures = new URL('../.impeccable/review/', import.meta.url);
mkdirSync(captures, { recursive: true });
try {
  for (const route of ['why-i-started', 'wanting-marriage-trusting-allah']) {
    for (const width of [320, 390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(
        (process.env.TEST_BASE_URL || 'http://127.0.0.1:4322') +
          `/articles/${route}/`
      );
      await page.locator('.section-copy-link').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const dark of [false, true]) {
        for (const size of ['100%', '200%']) {
          await page.evaluate(
            ({ dark, size }) => {
              document.documentElement.classList.toggle('dark', dark);
              document.documentElement.style.fontSize = size;
            },
            { dark, size }
          );
          for (const heading of await page
            .locator('.article-section-heading')
            .all()) {
            const aligned = await heading.evaluate((element) => {
              const text = element.firstElementChild.getBoundingClientRect();
              const icon = element.lastElementChild.getBoundingClientRect();
              return (
                getComputedStyle(element, '::before').content === 'none' &&
                getComputedStyle(element, '::after').content === 'none' &&
                icon.left >= text.right &&
                icon.right <= document.documentElement.clientWidth
              );
            });
            assert.ok(
              aligned,
              `${width}px/${dark}/${size}: copy action does not overlap heading`
            );
          }
          if (route === 'wanting-marriage-trusting-allah' && width === 390) {
            await page
              .locator('#wanting-something-and-asking-for-what-is-best')
              .scrollIntoViewIfNeeded();
            await page.screenshot({
              path: fileURLToPath(
                new URL(
                  `mobile-heading-${dark ? 'dark' : 'light'}-${size === '200%' ? 'large' : 'normal'}.png`,
                  captures
                )
              ),
            });
          }
        }
      }
      const link = page.locator('.section-copy-link').first();
      await link.focus();
      assert.ok(
        await link.evaluate(
          (e) =>
            e === document.activeElement &&
            getComputedStyle(e).outlineStyle !== 'none'
        )
      );
      assert.equal(
        await link.locator('[data-section-copy-label]').textContent(),
        'Copy link'
      );
      assert.match(await link.getAttribute('aria-label'), /^Copy link to /);
      const address = await link.getAttribute('href');
      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: async (value) => {
              document.documentElement.dataset.copiedSectionAddress = value;
            },
          },
        });
      });
      await link.click();
      assert.equal(await link.locator('.section-copy-check').isVisible(), true);
      assert.equal(
        await page.locator('html').getAttribute('data-copied-section-address'),
        address
      );
      await page.evaluate(() => {
        navigator.clipboard.writeText = async () => {
          throw new Error('Clipboard unavailable in this test');
        };
      });
      await link.click();
      assert.match(
        await page.locator('#section-copy-status').innerText(),
        /Copy this section’s address/
      );
      await page.close();
    }
  }
  console.log(
    'Article copy actions fit all widths, themes and text sizes; focus, copied feedback and clipboard fallback pass.'
  );
} finally {
  await browser.close();
}

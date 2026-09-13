/* global document, getComputedStyle, requestAnimationFrame, URL */
import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const routes = ['/books-preview/covers/', '/books-preview/featured/', '/books-preview/compact/'];
  for (const route of routes) {
    const variant = route.includes('featured') ? 'featured' : route.includes('compact') ? 'compact' : route.includes('covers') ? 'covers' : 'live';
    const screenshotName = route === '/' ? 'home' : route === '/pocket/' ? 'pocket' : variant;
    for (const width of [320, 768, 1280]) {
      for (const dark of [false, true]) {
        for (const size of ['100%', '200%']) {
          await page.setViewportSize({ width, height: 900 });
          const response = await page.goto(`${base}${route}`);
          assert.equal(response.status(), 200);
          await page.evaluate(async ({ dark, size }) => {
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.style.fontSize = size;
            await document.fonts.ready;
          }, { dark, size });
          await page.locator('#books').scrollIntoViewIfNeeded();
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          assert.equal(await page.locator('.shelf-book').count(), 7);
          if (variant === 'covers') {
            const sizes = await page.locator('.shelf-book').evaluateAll(cards => cards.map(card => ({ width: card.getBoundingClientRect().width, height: card.getBoundingClientRect().height })));
            assert.ok(sizes.every(size => Math.abs(size.width - sizes[0].width) < 1 && Math.abs(size.height - sizes[0].height) < 1), 'All shelf cards must have equal dimensions');
          }
          assert.equal(await page.locator('#copies').count(), 1);
          assert.match(await page.locator('.shelf-book').first().innerText(), /Meadows of the Righteous[\s\S]*No affiliate links/);
          assert.match(await page.locator('.shelf-book').nth(2).innerText(), /non-Muslims in the USA[\s\S]*One free copy/);
          assert.match(await page.locator('.shelf-book').nth(3).innerText(), /Free for non-Muslims[\s\S]*postage/);
          for (const [url, format] of [['https://amzn.to/4dxs7C8', 'English only'], ['https://amzn.to/4xS97GV', 'Arabic + English'], ['https://amzn.to/4xXs8Yo', 'Online or paperback']]) {
            const card = page.locator('.shelf-book').filter({ has: page.locator(`a[href="${url}"]`) });
            assert.ok((await card.textContent()).includes(format));
            assert.ok((await card.innerText()).includes('Affiliate link'));
          }
          assert.match(await page.locator('.shelf-book').first().innerText(), /Free PDF available[\s\S]*Find the free PDF/);
          const hours = page.locator('.shelf-book').last();
          assert.equal(await hours.locator('.shelf-book-link').first().getAttribute('href'), 'https://80000hours.org/career-guide/');
          assert.equal(await hours.locator('.shelf-book-link-secondary').getAttribute('href'), 'https://amzn.to/4xXs8Yo');
          assert.equal(await page.locator('a.resource-card[href="https://go.alphabravomedia.co/islam-riyad-pdf"]').count(), 0);
          assert.equal(await page.locator('a.resource-card[href="https://go.alphabravomedia.co/islam-career-guide"]').count(), 1);
          const errors = await page.evaluate(() => {
            const problems = [];
            if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) problems.push('Page overflows horizontally: ' + [...document.querySelectorAll('.site-shell *')].filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && !el.closest('.book-shelf-track')).slice(0, 30).map(el => el.className + ':' + Math.round(el.getBoundingClientRect().right)).join(', '));
            for (const element of document.querySelectorAll('.shelf-book-body > *')) {
              if (getComputedStyle(element).display === 'none') continue;
              if (element.scrollWidth > element.clientWidth + 1) problems.push('Text overflows: ' + element.textContent);
            }
            for (const link of document.querySelectorAll('.shelf-book a')) {
              if (link.rel.includes('sponsored') !== (new URL(link.href).hostname === 'amzn.to') || !link.rel.includes('noopener')) problems.push('Incorrect affiliate link relation');
            }
            return problems;
          });
          assert.deepEqual(errors, [], `${route} ${width}px ${dark ? 'dark' : 'light'} ${size}`);
        }
      }
    }
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.goto(`${base}${route}`);
    await page.locator('#books').scrollIntoViewIfNeeded();
    await page.locator('.shelf-book-art img').evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
    });
    await page.locator('#books').screenshot({ path: `.scratch/books-${screenshotName}.png` });
    if (variant === 'covers') {
      await page.getByRole('button', { name: 'Next book', exact: true }).click();
      assert.ok(await page.locator('#book-shelf-track').evaluate(el => el.scrollLeft) > 0);
      await page.getByRole('button', { name: 'Previous book', exact: true }).click();
      assert.ok(await page.locator('#book-shelf-track').evaluate(el => el.scrollLeft <= parseFloat(getComputedStyle(el).paddingInlineStart) + 1));
    }
    await page.locator('.shelf-book-link').first().focus();
    assert.equal(await page.locator('.shelf-book-link').first().evaluate(el => el === document.activeElement), true);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.locator('#books').screenshot({ path: `.scratch/books-${screenshotName}-mobile-dark.png` });
    await page.locator('.shelf-book-link').last().focus();
    assert.equal(await page.locator('.shelf-book-link').last().evaluate(el => el === document.activeElement), true);
    await page.locator('#books').screenshot({ path: `.scratch/books-${screenshotName}-last-mobile.png` });
    console.log(`${route}: widths, themes, enlarged text, eligibility, editions, affiliate links, PDF relocation, keyboard focus, and controls passed.`);
  }
  await page.goto(base);
  assert.equal(await page.locator('#books').count(), 1, 'Homepage has one reading section');
  assert.equal(await page.locator('a[href="https://go.alphabravomedia.co/islam-free-clear-quran"]').count(), 1, 'The free-copy offer appears once in the expandable reading links');
} finally {
  await browser.close();
}

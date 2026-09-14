/* global document, getComputedStyle, requestAnimationFrame */
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import process from 'node:process';
import console from 'node:console';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const articles = readdirSync(new URL('../src/content/articles/', import.meta.url))
  .filter(file => /\.mdx?$/.test(file)).map(file => file.replace(/\.mdx?$/, ''));
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1280, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const article of articles) {
      await page.goto(`${process.env.TEST_BASE_URL || 'http://127.0.0.1:4322'}/articles/${article}/`);
      await page.locator('#article-body').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const dark of [false, true]) {
        for (const size of ['100%', '200%']) {
          await page.evaluate(({ dark, size }) => {
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.style.fontSize = size;
          }, { dark, size });
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          const problems = await page.evaluate(() => {
            const errors = [];
            const header = document.querySelector('.article-page_header');
            const gap = parseFloat(getComputedStyle(header).rowGap);
            const children = [...header.children];
            children.slice(1).forEach((el, index) => {
              const actual = el.getBoundingClientRect().top - children[index].getBoundingClientRect().bottom;
              if (Math.abs(actual - gap) > 1) errors.push(`header gap ${actual}, expected ${gap}`);
            });
            for (const el of document.querySelectorAll('.article-page :is(h1,h2,h3,h4,h5,h6,p)')) {
              if (getComputedStyle(el, '::before').content !== 'none' || getComputedStyle(el, '::after').content !== 'none') errors.push(`trimmed ${el.className || el.tagName}`);
            }
            const blocks = [...document.querySelector('#article-body').children].filter(el => el.getBoundingClientRect().height > 0 && getComputedStyle(el).position !== 'absolute');
            blocks.slice(1).forEach((el, index) => {
              if (el.getBoundingClientRect().top < blocks[index].getBoundingClientRect().bottom - 1) errors.push(`overlapping ${el.tagName}`);
            });
            if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) errors.push('horizontal overflow');
            return errors;
          });
          assert.deepEqual(problems, [], `${article}/${width}/${dark}/${size}`);
        }
      }
    }
    await page.close();
    console.log(`${width}px: all ${articles.length} articles pass header, prose, and overflow checks in both themes at 100% and 200% text.`);
  }
} finally {
  await browser.close();
}

/* global document, getComputedStyle, requestAnimationFrame, window */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import process from 'node:process';
import console from 'node:console';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
try {
  const headerPage = await browser.newPage();
  for (const width of [390, 1280, 1440, 1920]) {
    await headerPage.setViewportSize({ width, height: 960 });
    let expected;
    for (const path of ['', 'articles/', 'articles/about-me/', 'articles/preparing-for-marriage/']) {
      await headerPage.goto(`${base}/${path}`);
      await headerPage.evaluate(() => document.fonts.ready);
      const bounds = await headerPage.locator('.site-header_row').evaluate((el) => {
        const { x, width } = el.getBoundingClientRect();
        return { x, width };
      });
      expected ??= bounds;
      assert.deepEqual(bounds, expected, `Header width stays consistent on ${path} at ${width}px`);
    }
  }
  await headerPage.close();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    reducedMotion: 'reduce',
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${base}/articles/preparing-for-marriage/`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    document
      .querySelector('.article-page')
      ?.classList.contains('has-reading-tools')
  );
  const contents = page.getByRole('navigation', { name: 'On this page' });
  const checkHeader = async (scrolled = false) => {
    const boxes = await page.evaluate(() => {
      const rect = (selector) =>
        document.querySelector(selector).getBoundingClientRect().toJSON();
      return {
        header: rect('[data-site-header]'),
        row: rect('.site-header_row'),
        article: rect('.article-page'),
        contents: rect('.article-page_contents'),
      };
    });
    assert.ok(
      boxes.row.left <= boxes.article.left + 1,
      'Article fits within the shared header left edge'
    );
    assert.ok(
      boxes.row.right >= boxes.article.right - 1,
      'Article fits within the shared header right edge'
    );
    assert.ok(
      boxes.contents.top >= boxes.header.bottom,
      'Contents clears the header'
    );
    if (scrolled) {
      assert.ok(
        Math.abs(boxes.header.top) < 1,
        'Article header stays at the viewport top'
      );
      assert.ok(
        boxes.contents.top - boxes.header.bottom <= 24,
        'Sticky contents keeps a small header gap'
      );
    }
  };
  const checkTargetClearance = async (selector) => {
    assert.ok(
      await page
        .locator(selector)
        .evaluate(
          (el) =>
            el.getBoundingClientRect().top >=
            document.querySelector('[data-site-header]').getBoundingClientRect()
              .bottom
        ),
      `${selector} clears the sticky header`
    );
  };
  await checkHeader();
  assert.ok(
    await page
      .locator('.article-page_contents')
      .evaluate(
        (el) =>
          el.getBoundingClientRect().top <=
          document.querySelector('.article-page_header').getBoundingClientRect()
            .top
      ),
    'Desktop contents starts beside the article header, before scrolling'
  );
  for (const link of await contents.getByRole('link').all()) {
    const href = await link.getAttribute('href');
    assert.ok(
      await page.locator(href).count(),
      `Contents link ${href} has a heading target`
    );
  }
  await contents
    .getByRole('link', { name: 'Start preparing yourself', exact: true })
    .click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('.article-page_contents [aria-current="location"]')
        ?.textContent.trim() === 'Start preparing yourself'
  );
  assert.ok(
    Number(await page.getByRole('progressbar').getAttribute('aria-valuenow')) >
      0
  );
  await checkHeader(true);
  await checkTargetClearance('#start-preparing-yourself');
  const reference = page.locator('[data-footnote-ref]').first();
  const noteId = await reference.getAttribute('href');
  await reference.click();
  assert.equal(new URL(page.url()).hash, noteId);
  await checkTargetClearance(noteId);
  await page
    .locator(noteId)
    .getByRole('link', { name: 'Back to reference 1', exact: true })
    .click();
  assert.equal(
    new URL(page.url()).hash,
    `#${await reference.getAttribute('id')}`
  );
  await checkTargetClearance(`#${await reference.getAttribute('id')}`);

  const checkNotes = async (margin) => {
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        )
    );
    const result = await page.evaluate(() => {
      const body = document
        .getElementById('article-body')
        .getBoundingClientRect();
      const notes = [
        ...document.querySelectorAll('[data-footnotes] > ol > li'),
      ].map((el) => el.getBoundingClientRect());
      const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
      return {
        margin: notes.every((note) => note.left > body.right),
        overlapping: notes.some(
          (note, i) => i > 0 && note.top < notes[i - 1].bottom
        ),
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
        unique: new Set(ids).size === ids.length,
      };
    });
    assert.equal(
      result.margin,
      margin,
      'Notes switch between the margin and native endnotes'
    );
    assert.equal(result.overlapping, false, 'Dense notes must not overlap');
    assert.equal(result.overflow, false, 'No horizontal overflow');
    assert.equal(
      result.unique,
      true,
      'Native heading and footnote IDs remain unique'
    );
  };
  await checkNotes(true);
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await checkNotes(true);
  await page.setViewportSize({ width: 1100, height: 960 });
  await checkNotes(false);
  await checkHeader();
  assert.equal(
    await contents.isVisible(),
    true,
    'Medium desktop retains the contents rail'
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await checkNotes(false);
  assert.equal(
    await page
      .locator('[data-site-header]')
      .evaluate((el) => getComputedStyle(el).position),
    'static',
    'Mobile header keeps its native layout'
  );
  assert.equal(
    await contents.isVisible(),
    false,
    'Mobile contents starts collapsed'
  );
  await page.getByText('On this page', { exact: true }).click();
  assert.equal(await contents.isVisible(), true);
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  await checkNotes(false);
  assert.equal(
    await page
      .locator('[data-site-header]')
      .evaluate((el) => getComputedStyle(el).position),
    'static',
    'Enlarged text restores the normal header'
  );
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '';
  });
  await page.emulateMedia({ media: 'print' });
  await checkNotes(false);
  await page.emulateMedia({ media: 'screen' });
  await checkNotes(true);
  await page.goto(`${base}/articles/article-layout-preview/`);
  await page.evaluate(() => document.fonts.ready);
  await contents
    .getByRole('link', { name: 'Finding your place', exact: true })
    .click();
  const subsection = contents.getByRole('link', {
    name: 'Following a subsection',
    exact: true,
  });
  await subsection.waitFor({ state: 'visible' });
  assert.equal(
    await subsection.isVisible(),
    true,
    'The current section reveals its subsections'
  );
  await subsection.focus();
  await page
    .locator('#reading-notes-together')
    .evaluate((el) => el.scrollIntoView());
  await page.waitForFunction(
    () =>
      document
        .querySelector('.article-page_contents [aria-current]')
        ?.textContent.trim() === 'Reading notes together'
  );
  assert.equal(
    await subsection.isVisible(),
    true,
    'Scrolling cannot hide a focused subsection'
  );
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#following-a-subsection');
  const repeated = page.locator(
    '[data-footnote-ref][href="#user-content-fn-layout"]'
  );
  assert.equal(await repeated.count(), 2);
  for (const citation of await repeated.all()) {
    await citation.click();
    const returnTo = `#${await citation.getAttribute('id')}`;
    await page.locator(`#user-content-fn-layout a[href="${returnTo}"]`).click();
    assert.equal(
      new URL(page.url()).hash,
      returnTo,
      'Each repeated citation has its own return destination'
    );
  }
  await checkNotes(true);
  await page.goto(
    `${base}/articles/article-layout-preview/#user-content-fn-second`
  );
  await page.reload();
  assert.ok(
    await page.locator('#user-content-fn-second').evaluate((el) => {
      const box = el.getBoundingClientRect();
      return (
        box.top >=
          document.querySelector('[data-site-header]').getBoundingClientRect()
            .bottom && box.top < window.innerHeight
      );
    }),
    'An incoming footnote URL lands on its note'
  );
  await page.goto(`${base}/articles/about-me/`);
  await page.waitForFunction(() =>
    document
      .querySelector('.article-page')
      ?.classList.contains('has-reading-tools')
  );
  await checkHeader();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await page.locator('#back-to-top').waitFor({ state: 'visible' });
  assert.ok(
    await page.locator('#back-to-top').evaluate((el) => {
      const box = el.getBoundingClientRect();
      return box.top >= 0 && box.bottom <= window.innerHeight;
    }),
    'Back-to-top remains fixed within the viewport'
  );
  for (const path of ['', 'articles/']) {
    await page.goto(`${base}/${path}`);
    assert.equal(
      await page
        .locator('[data-site-header]')
        .evaluate((el) => getComputedStyle(el).position),
      'static',
      'Other pages retain their normal header'
    );
  }
  await page.goto(`${base}/articles/preparing-for-marriage/#%`);
  await page.reload();
  await page.waitForLoadState('load');
  assert.deepEqual(
    errors,
    [],
    'Malformed URL fragments must not break article tools'
  );
  await page.close();

  const plain = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 960 },
  });
  await plain.goto(`${base}/articles/preparing-for-marriage/`);
  await plain.getByText('On this page', { exact: true }).click();
  assert.equal(
    await plain.getByRole('navigation', { name: 'On this page' }).isVisible(),
    true
  );
  assert.equal(await plain.locator('[data-footnotes] > ol > li').count(), 15);
  assert.notEqual(
    await plain
      .locator('[data-footnotes]')
      .evaluate((el) => getComputedStyle(el).position),
    'absolute'
  );
  await plain.close();
  console.log(
    'Article reader: contents targets, scroll state, footnote round trips, non-overlap, responsive/zoom/print fallback, themes, and no-JS checked.'
  );
} finally {
  await browser.close();
}

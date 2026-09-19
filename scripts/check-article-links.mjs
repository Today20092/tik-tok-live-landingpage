/* global document, window, getComputedStyle */
import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { URL } from 'node:url';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const verses = JSON.parse(readFileSync('src/data/quran-verses.json', 'utf8'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const slug of ['arrogance-and-trusting-allah', 'repairing-trust']) {
    const response = await page.goto(`${base}/articles/${slug}/`);
    assert.equal(response.status(), 200, slug);
    assert.doesNotMatch(
      await page.locator('meta[name="robots"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('content')).join(' ')),
      /noindex/
    );
    const card = page.locator(
      '#article-body aside[aria-label="Related article"] a'
    );
    assert.equal(await card.count(), 1);
    assert.match(await card.innerText(), /Read article.*About.*min read/s);
    assert.equal(
      (
        await page.request.get(
          new URL(await card.getAttribute('href'), base).href
        )
      ).status(),
      200
    );
    assert.equal(
      await page
        .locator('#article-body a[href^="#"]')
        .evaluateAll(
          (links) =>
            links.filter(
              (a) =>
                !document.getElementById(decodeURIComponent(a.hash.slice(1)))
            ).length
        ),
      0,
      'Every footnote and return link resolves'
    );
    if (slug === 'arrogance-and-trusting-allah') {
      for (const key of ['18:68', '2:152', '20:104']) {
        const quote = page.locator(`[data-quran-verse="${key}"]`);
        assert.equal(
          await quote.locator('[lang="ar"]').innerText(),
          verses[key].arabic
        );
        assert.equal(
          await quote.locator('[lang="en"]').innerText(),
          verses[key].translation
        );
        assert.equal(
          await quote.locator('a').getAttribute('href'),
          `https://quran.com/${key.replace(':', '/')}?translations=85`
        );
      }
      assert.match(
        await page.locator('[data-hadith="muslim-91a-pride"]').innerText(),
        /Excerpt from the full hadith/
      );
    }
    if (slug === 'repairing-trust') {
      for (const key of ['61:2-abdel-haleem', '20:114']) {
        const quote = page.locator(`[data-quran-verse="${key}"]`);
        assert.equal(
          await quote.locator('[lang="en"]').innerText(),
          verses[key].translation
        );
        assert.equal(
          await quote.locator('a').getAttribute('href'),
          `https://quran.com/${(verses[key].reference || key).replace(':', '/')}?translations=85`
        );
      }
      assert.equal(
        await page
          .getByRole('link', {
            name: 'Try Effective Trust Repair',
            exact: true,
          })
          .getAttribute('href'),
        'https://programs.clearerthinking.org/effective_trust_repair.html'
      );
    } else {
      assert.match(
        await page.locator('[data-hadith="mishkat-2175-friday"]').innerText(),
        /till the next Friday/
      );
    }
    for (const theme of ['light', 'dark']) {
      for (const [width, textSize] of [
        [390, 100],
        [1280, 100],
        [390, 200],
      ]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(
          ({ theme, textSize }) => {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.style.fontSize = `${textSize}%`;
          },
          { theme, textSize }
        );
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1
          ),
          `${slug} ${theme} ${width}/${textSize}: overflow`
        );
        await card.focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        assert.ok(
          await card.evaluate(
            (a) =>
              a === document.activeElement &&
              getComputedStyle(a).outlineStyle !== 'none'
          ),
          'Keyboard focus is visible'
        );
      }
    }
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '100%';
    });
    const reference = page.locator('#article-body [data-footnote-ref]').first();
    const referenceId = await reference.getAttribute('id');
    const note = await reference.getAttribute('href');
    await reference.click();
    assert.equal(new URL(page.url()).hash, note);
    await page.locator(`${note} [data-footnote-backref]`).first().click();
    assert.equal(new URL(page.url()).hash, `#${referenceId}`);
    assert.ok(
      existsSync(`dist/articles/${slug}/index.html`),
      'Published article is included in the production build'
    );
  }
  await page.goto(`${base}/lumos-preview/`);
  assert.match(
    await page
      .locator('aside[aria-label="Related article"]')
      .nth(1)
      .innerText(),
    /Read article/
  );
  console.log(
    'Published articles, quotations, footnote round trips, both themes, enlarged text, and keyboard focus passed.'
  );
} finally {
  await browser.close();
}

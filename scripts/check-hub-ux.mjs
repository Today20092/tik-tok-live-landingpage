/* global document, localStorage, getComputedStyle, window */
import assert from 'node:assert/strict';
import console from 'node:console';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4330';
const captures = new URL('../.impeccable/review/', import.meta.url);
mkdirSync(captures, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [390, 1440]) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: 'reduce',
      });
      await page.addInitScript(
        (theme) => localStorage.setItem('theme', theme),
        theme
      );
      await page.goto(base);
      for (const destination of [
        'islam-free-clear-quran',
        'islam-quran-project',
      ]) {
        const link = page.locator(
          `.reading-free-copies a[href$="${destination}"]`
        );
        assert.equal(
          await link.isVisible(),
          true,
          'Main Quran options are visible without disclosure'
        );
        assert.equal(
          await link.evaluate((el) => el.closest('details') === null),
          true
        );
      }
      assert.equal(await page.locator('.reading-live-books h2').count(), 2);
      const liveActions = page.locator('.live-session-nav a');
      assert.deepEqual(
        (await liveActions.allTextContents()).map((text) =>
          text.trim().replace(/\s+/g, ' ')
        ),
        ['Follow on TikTok', 'Watch recordings on YouTube', 'Follow on Twitch']
      );
      const liveBoxes = await liveActions.evaluateAll((links) =>
        links.map((link) => {
          const r = link.getBoundingClientRect();
          return { width: r.width, height: r.height, x: r.x, y: r.y };
        })
      );
      assert.ok(
        liveBoxes.every(
          (r) =>
            r.height >= 44 &&
            Math.abs(r.height - liveBoxes[0].height) < 1 &&
            Math.abs(r.width - liveBoxes[0].width) < 1
        ),
        'Live buttons share dimensions and touch targets'
      );
      assert.equal(
        width < 640
          ? liveBoxes[2].y > liveBoxes[1].y && liveBoxes[1].y > liveBoxes[0].y
          : Math.abs(liveBoxes[2].y - liveBoxes[0].y) < 1,
        true
      );
      await page
        .locator('#join')
        .screenshot({
          path: fileURLToPath(
            new URL(`live-actions-${width}-${theme}.png`, captures)
          ),
        });
      for (const action of await liveActions.all()) {
        await action.focus();
        assert.equal(
          await action.evaluate(
            (el) => getComputedStyle(el).outlineStyle !== 'none'
          ),
          true
        );
      }
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      assert.equal(
        await liveActions.evaluateAll((links) =>
          links.every(
            (el) =>
              el.scrollWidth <= el.clientWidth + 1 &&
              el.scrollHeight <= el.clientHeight + 1
          )
        ),
        true,
        'Live-action labels wrap at enlarged text sizes'
      );
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '';
        document.activeElement.blur();
      });
      const playlists = page.locator('[data-learning-videos]');
      assert.equal(
        await playlists.locator('.learning-videos_article').count(),
        2
      );
      assert.equal(
        await playlists
          .getByRole('button', { name: 'Read more', exact: true })
          .count(),
        0
      );
      assert.equal(
        await playlists.locator('astro-island').count(),
        0,
        'Playlist descriptions need no interactive expansion'
      );
      assert.equal(
        await playlists.locator('.learning-videos_note').isVisible(),
        true
      );
      const frames = await playlists
        .locator('.learning-videos_a')
        .evaluateAll((elements) =>
          elements.map((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, width: r.width, height: r.height };
          })
        );
      assert.ok(
        frames.every((r) => Math.abs(r.width / r.height - 16 / 9) < 0.02)
      );
      assert.ok(
        Math.abs(frames[0].width - frames[1].width) < 1 &&
          Math.abs(frames[0].height - frames[1].height) < 1,
        'Playlist thumbnails match'
      );
      assert.equal(
        width < 640
          ? frames[1].y > frames[0].y
          : Math.abs(frames[0].y - frames[1].y) < 1,
        true,
        'Playlists stack on mobile'
      );
      for (const watch of await playlists
        .locator('.learning-videos_watch')
        .all()) {
        assert.match(await watch.innerText(), /Watch playlist on YouTube/);
        assert.ok((await watch.boundingBox()).height >= 44);
        await watch.focus();
        assert.equal(
          await watch.evaluate(
            (el) => getComputedStyle(el).outlineStyle !== 'none'
          ),
          true
        );
      }
      await playlists.scrollIntoViewIfNeeded();
      await page.evaluate(() => document.activeElement.blur());
      await playlists.screenshot({
        path: fileURLToPath(
          new URL(`playlists-${width}-${theme}.png`, captures)
        ),
      });
      const diagram = page.locator('a[href$="islam-drawing-board"]');
      const cardStyle = (el) => {
        const s = getComputedStyle(el);
        return [
          s.backgroundColor,
          s.borderRadius,
          s.borderTopWidth,
          s.padding,
          s.boxShadow,
        ];
      };
      assert.deepEqual(
        await diagram.evaluate(cardStyle),
        await page
          .locator('.reading-free-copies .resource-card')
          .first()
          .evaluate(cardStyle),
        'Diagram and Quran resources share the same card treatment'
      );
      await diagram.screenshot({
        path: fileURLToPath(new URL(`diagram-${width}-${theme}.png`, captures)),
      });
      const print = page.getByRole('link', {
        name: 'My print edition',
        exact: false,
      });
      assert.equal(
        await print.evaluate(
          (el) =>
            parseFloat(getComputedStyle(el).borderTopWidth) >= 1 &&
            getComputedStyle(el).borderTopColor !== 'rgba(0, 0, 0, 0)' &&
            el.getBoundingClientRect().height >= 44
        ),
        true,
        'Print edition has a visible button boundary and touch target'
      );
      const editions = page.locator('.reading-links summary');
      await editions.focus();
      await page.keyboard.press('Enter');
      assert.equal(
        await page
          .getByRole('link', { name: 'View paperback', exact: false })
          .isVisible(),
        true
      );
      const editionsGrid = page.locator('.reading-editions-grid');
      assert.equal(await editionsGrid.locator('.reading-book').count(), 2);
      assert.equal(
        await editionsGrid.evaluate(
          (el) => el.scrollWidth <= el.clientWidth + 1
        ),
        true,
        'Edition choices need no horizontal swipe'
      );
      const covers = await editionsGrid
        .locator('.reading-book')
        .evaluateAll((cards) =>
          cards.map((card) => ({
            x: card.getBoundingClientRect().x,
            y: card.getBoundingClientRect().y,
          }))
        );
      assert.equal(
        width < 640
          ? covers[1].y > covers[0].y
          : Math.abs(covers[1].y - covers[0].y) < 1,
        true,
        'Edition cards stack on mobile and sit together on desktop'
      );
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: fileURLToPath(
          new URL(`editions-${width}-${theme}.png`, captures)
        ),
        fullPage: true,
      });
      await page.keyboard.press('Enter');
      assert.equal(
        await editions.evaluate((el) => el.parentElement.open),
        false,
        'Editions remain keyboard-toggleable'
      );
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
        document.querySelector('.reading-links details').open = true;
      });
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1
        ),
        false,
        'Resource controls fit with enlarged text'
      );
      assert.equal(
        await editionsGrid
          .locator('h3,p,a')
          .evaluateAll((elements) =>
            elements.every((el) => el.scrollWidth <= el.clientWidth + 1)
          ),
        true,
        'Edition text stays inside its card at enlarged sizes'
      );
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '';
        document.querySelector('.reading-links details').open = false;
      });
      assert.equal(
        await page.locator('#start-here').count(),
        0,
        'FAQ is removed'
      );
      const online = page.locator('#copies > .resource-card-primary');
      assert.match(await online.innerText(), /Read the Quran online/);
      assert.equal(await online.isVisible(), true);
      for (const section of ['join', 'watch', 'more']) {
        assert.equal(
          await page.locator(`#${section}`).evaluate((el) => el.tagName),
          'SECTION'
        );
        assert.equal(
          await page.locator(`#${section} a`).first().isVisible(),
          true,
          'Learning resources are visible without expanding a menu'
        );
      }
      for (const [route, name] of [
        ['/', 'home'],
        ['/articles/', 'articles'],
        ['/articles/about-me/', 'about'],
        ['/404.html', '404'],
      ]) {
        await page.goto(base + route);
        await page.evaluate(() => document.fonts.ready);
        if (name === 'articles') {
          assert.equal(
            await page
              .locator('.article-index-search')
              .evaluate(
                (el) =>
                  el.getBoundingClientRect().top -
                    el.previousElementSibling.getBoundingClientRect().bottom >=
                  20
              ),
            true,
            'Article search has breathing room below the introduction'
          );
        }
        assert.equal(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth >
              document.documentElement.clientWidth + 1
          ),
          false
        );
        await page.screenshot({
          path: fileURLToPath(
            new URL(`${name}-${width}-${theme}.png`, captures)
          ),
          fullPage: true,
        });
      }
      await page.goto(base + '/articles/about-me/');
      if (width < 640) await page.locator('.site-header_menu summary').click();
      const nav = page.getByRole('navigation', {
        name: width < 640 ? 'Mobile site navigation' : 'Site',
        exact: true,
      });
      assert.equal(
        await nav.locator('[aria-current="page"]').innerText(),
        'About Ayoub'
      );
      await page.goto(base + '/search/?q=Quran');
      await page.locator('#search:not([hidden])').waitFor();
      await page.locator('.pf-result-link').first().waitFor();
      const input = page.getByRole('searchbox', {
        name: 'Search articles and resources',
      });
      assert.equal(await input.inputValue(), 'Quran');
      await input.fill('zzzznonexistentword');
      await input.press('Enter');
      await page.waitForURL(
        (url) => url.searchParams.get('q') === 'zzzznonexistentword'
      );
      await page.waitForFunction(
        () => document.querySelectorAll('.pf-result-link').length === 0
      );
      assert.equal(
        await page
          .getByRole('link', { name: 'Browse articles', exact: true })
          .isVisible(),
        true
      );
      await page.screenshot({
        path: fileURLToPath(new URL(`search-${width}-${theme}.png`, captures)),
        fullPage: true,
      });
      await page.close();
    }
  }
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(base + '/search/');
  assert.equal(await noScript.locator('#search-status').isVisible(), false);
  assert.equal(await noScript.locator('#search').isVisible(), false);
  assert.equal(await noScript.locator('noscript p').isVisible(), true);
  assert.equal(
    await noScript
      .getByRole('link', { name: 'Browse articles', exact: true })
      .isVisible(),
    true
  );
  await noScript.close();
  const failure = await browser.newPage();
  await failure.route('**/pagefind/pagefind-component-ui.js', (route) =>
    route.abort()
  );
  await failure.goto(base + '/search/');
  await failure.getByText('Search could not load.', { exact: false }).waitFor();
  assert.equal(await failure.locator('#search').isVisible(), false);
  assert.equal(
    await failure
      .getByRole('link', { name: 'Browse articles', exact: true })
      .isVisible(),
    true
  );
  await failure.close();
  console.log(
    'Hub UX: visible resources, navigation, search/empty/failure/no-JS recovery, and desktop/mobile captures pass in both themes.'
  );
} finally {
  await browser.close();
}

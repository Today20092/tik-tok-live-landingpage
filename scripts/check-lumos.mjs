/* global document, window, getComputedStyle, localStorage, requestAnimationFrame */
import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { createRequire } from 'node:module';

// Run after pnpm build, with pnpm preview and pnpm dev running.
// Reuses Playwright through PLAYWRIGHT_MODULE, as check-search-ui.mjs does.
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const dev = process.env.TEST_DEV_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch();
const fingerprint = (page) =>
  page.locator('[data-site-header]').evaluate((header) => {
    const style = getComputedStyle(header);
    const brand = getComputedStyle(header.querySelector('a span'));
    const control = getComputedStyle(
      header.querySelector('[data-theme-control]')
    );
    return {
      font: style.fontFamily,
      color: style.color,
      brandFont: brand.fontFamily,
      brandSize: brand.fontSize,
      controlRadius: control.borderRadius,
      controlHeight: control.minHeight,
    };
  });
const fits = async (page, label) => {
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1
    ),
    `${label}: horizontal overflow`
  );
};
try {
  for (const width of [320, 390, 1280]) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
      });
      await page.addInitScript(
        (theme) => localStorage.setItem('theme', theme),
        theme
      );
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      let expected;
      for (const route of [
        '/',
        '/articles/',
        '/articles/80000-hours/',
        '/search/',
        '/404.html',
        '/pocket/',
        '/journal/',
        '/focus/',
        '/kofi-preview/',
      ]) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await fits(page, `${width}/${theme}${route}`);
        const actual = await fingerprint(page);
        expected ??= actual;
        assert.deepEqual(actual, expected, `${route}: shared shell drift`);
        const supportDock = page.locator('.support-dock');
        assert.equal(await supportDock.count(), 1, `${route}: one monthly support dock`);
        assert.ok(await supportDock.evaluate(el => getComputedStyle(el).backgroundColor === 'rgba(0, 0, 0, 0)' && getComputedStyle(el).borderTopWidth === '0px'), 'Floating wrapper has no bottom bar');
        const supportLink = supportDock.getByRole('link', { name: 'Support monthly', exact: false });
        assert.equal(await supportLink.count(), 1, `${route}: monthly invitation`);
        assert.equal(await supportLink.getAttribute('href'), 'https://go.alphabravomedia.co/islam-kofi');
        for (const size of ['100%', '200%']) {
          await page.goto(base + route, { waitUntil: 'networkidle' });
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(size => document.documentElement.style.fontSize = size, size);
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          await fits(page, `${width}/${theme}${route} ${size}`);
          const { dockBox, linkBox } = await supportDock.evaluate(el => ({
            dockBox: el.getBoundingClientRect().toJSON(),
            linkBox: el.querySelector('a').getBoundingClientRect().toJSON(),
          }));
          assert.ok(linkBox.x >= 0 && linkBox.x + linkBox.width <= width + 1, 'Support link fits viewport');
          assert.ok(dockBox.width < width && dockBox.x > 0, 'Support wrapper stays in the corner');
          if (size === '100%') assert.ok(linkBox.width < 170, 'Floating support button stays compact');
          assert.ok(linkBox.height >= 44 && linkBox.y >= dockBox.y && linkBox.y + linkBox.height <= 901, `${route} ${width}/${theme} ${size}: support touch target ${JSON.stringify({ dockBox, linkBox })}`);
          await supportLink.focus();
          assert.ok(await supportLink.evaluate(el => el === document.activeElement && getComputedStyle(el).outlineStyle !== 'none'), 'Support link has visible keyboard focus');
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
          const footerBox = await page.locator('.site-footer_content').boundingBox();
          assert.ok(footerBox.y + footerBox.height <= dockBox.y, 'Footer content clears support dock');
        }
        assert.equal(
          await page.locator('h1').count(),
          1,
          `${route}: one main heading`
        );
        const variant = page.locator('[data-design]');
        if (await variant.count()) assert.equal(await variant.evaluate(e => getComputedStyle(e).color), actual.color, `${route}: alternate layout follows the selected theme`);
        assert.ok(
          parseFloat(actual.controlHeight) >= 44,
          'Theme control touch target'
        );
        assert.equal(
          await page
            .locator('html')
            .evaluate((e) => e.classList.contains('dark')),
          theme === 'dark',
          'Initial theme restoration'
        );
      }
      // Prove this check detects a real page-local override of shared styling.
      await page.addStyleTag({
        content: '[data-site-header] { font-family:monospace !important; }',
      });
      assert.notDeepEqual(
        await fingerprint(page),
        expected,
        'Intentional cross-page regression must be detected'
      );
      assert.deepEqual(errors, [], 'No browser errors');
      await page.close();
      console.log(
        `${width}px ${theme}: nine routes, monthly support dock at 100%/200%, shared shell, initial theme, touch targets, overflow, regression probe passed`
      );
    }
  }
  const page = await browser.newPage({
    viewport: { width: 390, height: 900 },
    reducedMotion: 'reduce',
  });
  await page.goto(base + '/');
  await page.locator('[data-theme-control]').click();
  const selected = await page
    .locator('html')
    .evaluate((e) => e.classList.contains('dark'));
  await page.goto(base + '/articles/');
  assert.equal(
    await page.locator('html').evaluate((e) => e.classList.contains('dark')),
    selected,
    'Theme persists across navigation'
  );
  await page.keyboard.press('Tab');
  assert.match(
    await page.evaluate(() => document.activeElement.textContent),
    /Skip to content/
  );
  await page.keyboard.press('Enter');
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    'main-content',
    'Skip link moves focus'
  );
  await page.goto(dev + '/lumos-preview/', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: /Enlarge image:/ }).first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  const zoom = page.getByRole('button', { name: 'Zoom into image' });
  await zoom.focus();
  await page.keyboard.press('Enter');
  assert.equal(
    await page
      .getByRole('button', { name: 'Zoom out of image' })
      .getAttribute('aria-pressed'),
    'true'
  );
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  assert.ok(
    await trigger.evaluate((e) => e === document.activeElement),
    'Dialog returns focus'
  );
  await page.goto(base + '/articles/80000-hours/', {
    waitUntil: 'networkidle',
  });
  await page.getByText('On this page', { exact: true }).click();
  const toc = page.getByRole('navigation', { name: 'On this page' });
  assert.ok(await toc.isVisible());
  await toc.locator('a').last().click();
  await page.locator('#back-to-top').click();
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    'article-top'
  );
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  await fits(page, 'Article at 200% text');
  for (const route of [
    '/articles/hadith-template/',
    '/articles/about-me/',
    '/podcast-preview/',
    '/lumos-preview/',
  ]) {
    const response = await page.goto(dev + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route);
    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.fontSize = '200%';
      }, theme);
      await fits(page, `${route} ${theme} at 200%`);
      for (const arabic of await page.locator('[lang="ar"]').all()) {
        assert.equal(await arabic.getAttribute('dir'), 'rtl');
        assert.match(
          await arabic.evaluate((e) => getComputedStyle(e).fontFamily),
          /Amiri Quran/
        );
      }
    }
  }
  await page.evaluate(() =>
    document.documentElement.style.setProperty('--radius-small', '13px')
  );
  for (const card of await page.locator('.resource-card').all())
    assert.equal(
      await card.evaluate((e) => getComputedStyle(e).borderRadius),
      '13px',
      'One token updates both themed reference cards'
    );
  await page.close();
  console.log(
    'Theme persistence, skip navigation, keyboard zoom/Escape/focus, contents, back-to-top, enlarged text, quotation direction and shared-token propagation passed.'
  );
} finally {
  await browser.close();
}

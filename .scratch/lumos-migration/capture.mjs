import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({headless:true});
const root = new URL('./evidence/', import.meta.url);
fs.mkdirSync(root,{recursive:true});
const port = process.argv[2] || '4323';
const label = process.argv[3] || 'baseline';
for(const width of [390,1280]) {
  const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  for(const route of ['', 'articles/why-i-started/', 'search/', ...(process.argv.includes('--all') ? ['articles/80000-hours/', 'pocket/', 'journal/', 'focus/', 'kofi-preview/'] : [])]) {
    await page.goto(`http://127.0.0.1:${port}/${route}`,{waitUntil:'networkidle'});
    for(const theme of ['light','dark']) {
      await page.evaluate(theme=>{document.documentElement.classList.toggle('dark',theme==='dark');document.documentElement.style.colorScheme=theme},theme);
      await page.waitForTimeout(250);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({path:new URL(`${label}-${route.replaceAll('/','-')||'home'}-${width}-${theme}.png`,root).pathname.slice(1),fullPage:true});
    }
  }
  await page.close();
}
await browser.close();
console.log(`${label}: captured home, article, search at 390/1280 in both themes`);

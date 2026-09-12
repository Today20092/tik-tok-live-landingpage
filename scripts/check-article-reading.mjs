import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { URL } from 'node:url';
import console from 'node:console';

// Exercise the shipped script with scroll, resize, and expanding-content events.
const source = readFileSync(new URL('../src/components/ArticleReadingTools.astro', import.meta.url), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)[1];
let height = 4000;
let reducedMotion = false;
let resize;
let click;
let focused = false;
const events = {};
const window = {
  scrollY: 0,
  innerHeight: 800,
  addEventListener: (name, callback) => { events[name] = callback; },
  matchMedia: () => ({ matches: reducedMotion }),
  scrollTo: (options) => { window.lastScroll = options; },
};
class HTMLElement { style = {}; }
const progress = {
  hidden: true,
  firstElementChild: new HTMLElement(),
  setAttribute: (name, value) => { progress[name] = value; },
};
const button = { hidden: true, addEventListener: (_, callback) => { click = callback; } };
const elements = {
  'article-body': { getBoundingClientRect: () => ({ top: 500 - window.scrollY, bottom: 500 + height - window.scrollY }) },
  'article-top': { focus: () => { focused = true; } },
  'reading-progress': progress,
  'back-to-top': button,
};
runInNewContext(script, {
  window, HTMLElement,
  document: { getElementById: (id) => elements[id], body: {} },
  requestAnimationFrame: (callback) => callback(),
  ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} },
});
assert.equal(progress['aria-valuenow'], '0');
assert.equal(button.hidden, true);
window.scrollY = 2100;
events.scroll();
assert.equal(progress['aria-valuenow'], '50');
assert.equal(button.hidden, false);
window.scrollY = 3700;
events.scroll();
assert.equal(progress['aria-valuenow'], '100');
height = 7200;
resize();
assert.equal(progress['aria-valuenow'], '50', 'Expanding content must update the denominator');
window.innerHeight = 1200;
events.resize();
assert.equal(progress['aria-valuenow'], '53');
click({ preventDefault() {} });
assert.equal(focused, true);
assert.equal(window.lastScroll.top, 0);
assert.equal(window.lastScroll.behavior, 'smooth');
reducedMotion = true;
click({ preventDefault() {} });
assert.equal(window.lastScroll.behavior, 'instant');
height = 300;
window.scrollY = 0;
resize();
assert.equal(progress['aria-valuenow'], '100', 'A fully visible short article is complete');
assert.equal(button.hidden, true);
console.log('Article reading controls passed: progress, expanding content, resizing, focus, and reduced motion.');

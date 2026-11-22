import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const css = readFileSync(
  new URL('../src/styles/lumos/tokens.css', import.meta.url),
  'utf8'
);
const global = readFileSync(
  new URL('../src/styles/global.css', import.meta.url),
  'utf8'
);
const tokens = (css) =>
  Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi)].map((m) => [m[1], m[2]])
  );
const rgb = (hex) => hex.match(/[\da-f]{2}/gi).map((c) => parseInt(c, 16));
const luminance = (color) =>
  color
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
const light = tokens(css.match(/\.theme-light\s*\{([^}]+)\}/)[1]);
const palettes = [
  ['light', light],
  // Dark inherits any token it does not override.
  ['dark', { ...light, ...tokens(css.match(/\.theme-dark\s*\{([^}]+)\}/)[1]) }],
];
const patternOpacity = Number(
  global.match(/\[data-site-shell\]::before\s*\{[^}]*opacity:\s*([\d.]+)/)[1]
);
assert.ok(patternOpacity > 0 && patternOpacity <= 1);
for (const [name, colors] of palettes) {
  let minimum = Infinity;
  for (const background of [
    'background',
    'card',
    'secondary',
    'accent',
    'support-hover',
  ]) {
    const bg = rgb(colors[background]);
    const pattern = rgb(colors['pattern-color']);
    for (const foreground of ['foreground', 'muted-foreground', 'primary']) {
      // Include the background where the lattice pattern is painted over it.
      const backgrounds =
        background === 'background'
          ? [
              bg,
              bg.map(
                (v, i) => v * (1 - patternOpacity) + pattern[i] * patternOpacity
              ),
            ]
          : [bg];
      for (const surface of backgrounds) {
        const ratio = contrast(rgb(colors[foreground]), surface);
        assert.ok(
          ratio >= 4.5,
          `${name} ${foreground}/${background}: ${ratio}`
        );
        minimum = Math.min(minimum, ratio);
      }
    }
  }
  assert.ok(
    contrast(rgb(colors['primary-foreground']), rgb(colors.primary)) >= 4.5,
    `${name} primary text`
  );
  for (const surface of ['background', 'card', 'secondary', 'accent', 'popover']) {
    for (const token of ['ring', 'input']) {
      assert.ok(
        contrast(rgb(colors[token]), rgb(colors[surface])) >= 3,
        `${name} ${token}/${surface}`
      );
    }
  }
  console.log(
    `${name}: text minimum ${minimum.toFixed(2)}:1; primary, focus and control checks pass`
  );
}

import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const source = readFileSync(
  new URL('../src/components/PalettePreview.astro', import.meta.url),
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
const palettes = [
  ...[...source.matchAll(/:root\[data-palette='([^']+)'\]\s*\{([^}]+)\}/g)].map(
    (m) => [
      m[1],
      {
        ...(m[1] === 'original'
          ? tokens(global.match(/:root\s*\{([^}]+)\}/)[1])
          : {}),
        ...tokens(m[2]),
      },
    ]
  ),
];
assert.equal(palettes.length, 31);
const patternOpacity = Math.max(
  ...[...source.matchAll(/--pattern-opacity:\s*([\d.]+)/g)].map((m) =>
    Number(m[1])
  )
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
    const bg = rgb(colors[background] ?? '#fff1eb');
    for (const foreground of ['foreground', 'muted-foreground']) {
      // Bound pure black/white pixels at the strongest available pattern setting.
      const backgrounds =
        background === 'background'
          ? [
              bg,
              ...[0, 255].map((noise) =>
                bg.map((v) => v * (1 - patternOpacity) + noise * patternOpacity)
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
  for (const surface of ['background', 'card', 'secondary', 'accent']) {
    assert.ok(
      contrast(rgb(colors.ring), rgb(colors[surface])) >= 3,
      `${name} focus/${surface}`
    );
  }
  assert.ok(
    contrast(rgb(colors.input), rgb(colors.card)) >= 3,
    `${name} control/card`
  );
  console.log(
    `${name}: text minimum ${minimum.toFixed(2)}:1; primary, focus and control checks pass`
  );
}

import assert from 'node:assert/strict';
import { URL } from 'node:url';
import console from 'node:console';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';

const dist = new URL('../dist/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('site.webmanifest', dist), 'utf8'));
for (const icon of [...manifest.icons, { src: 'apple-touch-icon.png', sizes: '180x180' }]) {
  const metadata = await sharp(await readFile(new URL(icon.src, dist))).metadata();
  assert.equal(`${metadata.width}x${metadata.height}`, icon.sizes, icon.src);
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.hasAlpha, false, `${icon.src} should be opaque`);
}
const ico = await readFile(new URL('favicon.ico', dist));
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
for (const [index, size] of [16, 32, 48].entries()) {
  const entry = 6 + index * 16;
  const length = ico.readUInt32LE(entry + 8);
  const offset = ico.readUInt32LE(entry + 12);
  assert.equal(ico[entry], size);
  assert.equal(ico[entry + 1], size);
  const metadata = await sharp(ico.subarray(offset, offset + length)).metadata();
  assert.equal(metadata.width, size);
  assert.equal(metadata.height, size);
}
const pages = (await readdir(dist, { recursive: true })).filter((file) => file.endsWith('.html'));
assert.ok(pages.length > 0);
for (const file of pages) {
  const html = await readFile(new URL(file.replaceAll('\\', '/'), dist), 'utf8');
  for (const name of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'site.webmanifest']) {
    assert.ok(html.includes(name), `${file} is missing ${name}`);
  }
}
console.log(`Favicon dimensions, ICO frames, and links on ${pages.length} pages passed.`);

import { readFile, writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { URL } from 'node:url';
import console from 'node:console';
import sharp from 'sharp';

const publicDir = new URL('../public/', import.meta.url);
const svg = await readFile(new URL('favicon.svg', publicDir));
const render = (size) => sharp(svg).resize(size, size).png().toBuffer();

for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await writeFile(new URL(name, publicDir), await sharp(svg).resize(size, size)
    .flatten({ background: '#335966' }).png().toBuffer());
}
// Keep the complete book inside Android's central 80% safe circle.
await writeFile(new URL('icon-maskable-512.png', publicDir),
  await sharp({ create: { width: 512, height: 512, channels: 3, background: '#335966' } })
    .composite([{ input: await render(384), gravity: 'centre' }]).removeAlpha().png().toBuffer());

// ICO directory followed by PNG frames, supported by modern Windows browsers.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(render));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile(new URL('favicon.ico', publicDir), Buffer.concat([directory, ...frames]));
console.log('Generated browser, Apple, and Android icons from public/favicon.svg.');

/* global console, URL */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Run after pnpm build.
const html = readFileSync(
  new URL('../dist/index.html', import.meta.url),
  'utf8'
);
const section = html.slice(
  html.indexOf('id="watch"'),
  html.indexOf('id="articles-title"')
);
assert.ok(section.includes('Ayoub recommends'));
assert.equal(
  (section.match(/data-slot="collapsible"/g) ?? []).length,
  2,
  'Both recommendations can expand'
);
assert.ok(
  (section.match(/aria-expanded="false"/g) ?? []).length === 2,
  'Recommendations start collapsed'
);
assert.ok(section.includes('Read more'));
assert.ok(section.includes('keeping faith'));
assert.ok(
  section.includes('The AI visuals are imagined scenes, not real footage.')
);
assert.ok(
  !section.includes('video-layout'),
  'The layout comparison is finished'
);
const stories = section.indexOf('PL9821CA747E7E0674');
const biography = section.indexOf('PLlZazEh_c4nScNCvGBn8OEf6ujk-sDUpg');
const tutorial = section.indexOf('HVmHxSztp_A');
assert.ok(
  stories >= 0 && stories < biography && biography < tutorial,
  'Feature Mufti Menk, then the biography, then the tutorial'
);
console.log('Featured recommendation, biography order, and final layout pass.');

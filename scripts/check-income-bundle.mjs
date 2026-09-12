import assert from 'node:assert/strict';
import console from 'node:console';
import { createRequire } from 'node:module';
import { gzipSync } from 'node:zlib';

const { build } = createRequire(import.meta.resolve('astro/package.json'))('esbuild');
const result = await build({
  entryPoints: ['src/components/IncomeWellbeingCharts.tsx'],
  bundle: true, write: false, minify: true, metafile: true,
  platform: 'browser', format: 'esm',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
const retained = Object.values(result.metafile.outputs).flatMap((output) =>
  Object.entries(output.inputs).filter(([, value]) => value.bytesInOutput > 0).map(([path]) => path));
assert.ok(retained.some((path) => /scales\/linear/.test(path)), 'Keep the chosen compact linear scale');
const excluded = retained.filter((path) => /node_modules\/(d3-scale|d3-format|d3-interpolate)\/|scales\/(band|point|ordinal)/.test(path));
assert.deepEqual(excluded, [], 'Do not ship unused scale families');
console.log(`Chart island, React excluded: ${result.outputFiles[0].contents.length} bytes minified; ${gzipSync(result.outputFiles[0].contents).length} bytes gzip. Compact linear only; excluded scale families absent.`);

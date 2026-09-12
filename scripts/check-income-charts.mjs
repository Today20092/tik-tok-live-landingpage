import assert from 'node:assert/strict';
import console from 'node:console';
import { createChartScene } from '@tanstack/charts';
import { incomeChart, lifeSatisfaction, positiveAffect } from '../src/lib/income-charts.ts';

  for (const width of [300, 720]) {
    const scene = createChartScene(incomeChart(), { width, height: 320 });
    assert.equal(scene.points.length, lifeSatisfaction.length + positiveAffect.length);
    assert.deepEqual(scene.scales.x.domain, [10000, 210000]);
    assert.deepEqual(scene.scales.y.domain, [5, 7.6]);
    assert.deepEqual(scene.scales.affect.domain, [50, 91]);
    assert.ok(scene.chart.width > 0);
  }
  assert.equal(createChartScene(incomeChart([], []), { width: 340, height: 320 }).points.length, 0);
console.log('Income chart scenes passed: point counts, separate units, fixed domains, empty data, and mobile/desktop sizing.');

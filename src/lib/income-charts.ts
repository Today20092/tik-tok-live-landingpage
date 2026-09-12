import { defineChart, lineY, ruleX } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

// Income and score are quantitative. Each income identifies one illustrative point.
// These are rounded readings from the guide, not individual survey observations.
export interface IncomePoint { income: number; score: number }
export const lifeSatisfaction: IncomePoint[] = [
  { income: 10000, score: 5.2 },
  { income: 20000, score: 5.6 },
  { income: 40000, score: 6.5 },
  { income: 75000, score: 7 },
  { income: 110000, score: 7.25 },
  { income: 210000, score: 7.5 },
];
export const positiveAffect: IncomePoint[] = [
  { income: 10000, score: 70 },
  { income: 20000, score: 78 },
  { income: 40000, score: 85 },
  { income: 60000, score: 87 },
  { income: 110000, score: 89 },
  { income: 210000, score: 90 },
];

export function incomeChart(lifeRows = lifeSatisfaction, affectRows = positiveAffect) {
  return defineChart({
    marks: [
      ruleX([75000], { id: 'income-reference', stroke: 'var(--muted-foreground)', strokeWidth: 1.5, strokeDasharray: '3 5' }),
      lineY(lifeRows.map((row) => ({ ...row, measure: 'Life satisfaction' })), { id: 'life-satisfaction', x: 'income', y: 'score', points: true, stroke: 'var(--income-life)', strokeWidth: 2 }),
      lineY(affectRows.map((row) => ({ ...row, measure: 'Positive affect' })), { id: 'positive-affect', x: 'income', y: 'score', yScale: 'affect', points: true, stroke: 'var(--income-affect)', strokeWidth: 3.5, strokeDasharray: '8 4' }),
    ],
    scales: {
      x: {
        scale: scaleLinear().domain([10000, 210000]),
        axis: { ticks: { values: [10000, 75000, 150000, 210000], format: (value: number) => `$${value / 1000}k` }, tickLabels: { fontSize: 11 } },
      },
      y: {
        scale: scaleLinear().domain([5, 7.6]),
        grid: true,
        axis: { ticks: { values: [5, 5.5, 6, 6.5, 7, 7.5] }, tickLabels: { fontSize: 11 } },
      },
      affect: {
        channel: 'y', side: 'right',
        scale: scaleLinear().domain([50, 91]),
        axis: { ticks: { values: [50, 60, 70, 80, 90], format: (value: number) => `${value}%` }, tickLabels: { fontSize: 11 } },
      },
    },
    theme: { foreground: 'var(--foreground)', muted: 'var(--muted-foreground)', grid: 'var(--border)', background: 'var(--background)' },
    tooltip: {
      use: tooltip,
      items: [
        { channel: 'x', label: 'Household income', text: (point) => `About $${Number(point.xValue).toLocaleString('en-US')}` },
        { channel: 'y', label: 'Approximate value', text: (point) => `${point.datum.measure}: ${point.yValue}${point.datum.measure === 'Positive affect' ? '%' : ' / 10'}` },
      ],
    },
  });
}

import { Chart } from '@tanstack/charts/react/core';
import { motion } from '@tanstack/charts/motion';
import {
  incomeChart,
  lifeSatisfaction,
  positiveAffect,
} from '@/lib/income-charts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const incomes = [
  ...new Set([...lifeSatisfaction, ...positiveAffect].map((row) => row.income)),
].sort((a, b) => a - b);
const definition = incomeChart();
const renderer = motion({
  initial: 'always',
  transition: { type: 'tween', duration: 450 },
  respectReducedMotion: true,
});

export default function IncomeWellbeingCharts() {
  return (
    <figure
      className="income-wellbeing-chart not-typeset margin-block-8"
      aria-labelledby="income-chart-title"
    >
      <figcaption
        id="income-chart-title"
        className="income-wellbeing-charts_figcaption"
      >
        Household income and wellbeing
      </figcaption>
      <p className="income-wellbeing-charts_p">
        The highlighted line shows everyday positive feelings. Its gains get
        much smaller as income rises.
      </p>
      <p className="income-wellbeing-charts_p-2">
        Tap or hover over a point for its value. Keyboard users can focus the
        chart and use the arrow keys.
      </p>
      <div className="income-wellbeing-charts_div">
        <span className="income-wellbeing-charts_span">
          <span aria-hidden="true" className="income-wellbeing-charts_span-2" />
          Life satisfaction · left axis, out of 10
        </span>
        <span className="income-wellbeing-charts_span-3">
          <span aria-hidden="true" className="income-wellbeing-charts_span-4" />
          Positive affect · right axis, %
        </span>
      </div>
      <Chart
        definition={definition}
        renderer={renderer}
        height={340}
        ariaLabel="Household income and wellbeing. Thin solid line: life satisfaction, left axis showing 5 to 7.6 out of 10. Highlighted dashed line: positive affect, right axis showing 50 to 91 percent. The positive-affect line rises sharply at lower incomes, then flattens. Approximate values are available below."
      />
      <p className="income-wellbeing-charts_p-3">
        Annual pre-tax household income · US dollars, 2009
      </p>
      <p className="income-wellbeing-charts_p-4">
        Around $50,000–$75,000, the positive-affect curve is already much
        flatter than at lower incomes.
      </p>
      <p className="income-wellbeing-charts_p-2">
        The vertical dotted line marks $75,000, near the older study&apos;s
        reported plateau. Newer research does not support a universal cutoff.
        Both vertical axes are cropped and use different units, so the lines’
        heights are not directly comparable.
      </p>
      <details className="income-wellbeing-charts_details">
        <summary className="income-wellbeing-charts_summary">
          Values and source notes
        </summary>
        <Table>
          <TableCaption>
            Approximate chart values. A dash means no estimate was plotted at
            that income.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">
                Household
                <br />
                income
              </TableHead>
              <TableHead scope="col" className="u-text-right">
                Life satisfaction
                <br />
                out of 10
              </TableHead>
              <TableHead scope="col" className="u-text-right">
                Positive affect
                <br />%
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income}>
                <TableHead scope="row">
                  ${income.toLocaleString('en-US')}
                </TableHead>
                <TableCell className="u-text-right">
                  {lifeSatisfaction.find((row) => row.income === income)
                    ?.score ?? '—'}
                </TableCell>
                <TableCell className="u-text-right">
                  {positiveAffect.find((row) => row.income === income)?.score ??
                    '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="u-mt-3">
          Both series are rounded visual estimates from the guide’s figure,
          including income positions. They may differ slightly from the guide’s
          rounded examples in the text. Lines connect these estimates; they are
          not fitted curves or raw survey data.
        </p>
        <p className="u-mt-3">
          Positive affect averages yes/no reports of happiness, enjoyment, and
          smiling or laughter. It is not a life-satisfaction score or the
          percentage of people who are always happy.
        </p>
      </details>
      <p className="income-wellbeing-charts_p-5">
        Source:{' '}
        <a
          className="u-underline"
          href="https://80000hours.org/career-guide/dream-job/#dont-chase-the-money"
        >
          80,000 Hours
        </a>
        , drawing on{' '}
        <a
          className="u-underline"
          href="https://www.princeton.edu/~deaton/downloads/deaton_kahneman_high_income_improves_evaluation_August2010.pdf"
        >
          Kahneman and Deaton, 2010
        </a>
        . The positive-affect plateau is a finding of that study, not a
        universal income ceiling.
      </p>
    </figure>
  );
}

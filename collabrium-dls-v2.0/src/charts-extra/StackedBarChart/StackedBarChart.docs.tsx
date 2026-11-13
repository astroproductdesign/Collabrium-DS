// Documentation for Stacked bar chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with StackedBarChart.usage.md. Not part of the package build.
import { StackedBarChart } from './StackedBarChart';
import { barAccessibility, quarters, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Stacked bar chart';

export const description =
  'Parts within a total, compared across categories. Only the outer end of each stack is rounded, so a bar reads as one thing; the stack always equals the figure it is labelled with.';

export const usage = `import { StackedBarChart } from '@collabrium/ui/charts-extra';

export function Bookings({ data }) {
  return (
    <StackedBarChart
      aria-label="Bookings by source and quarter"
      data={data}
      categoryKey="quarter"
      series={[
        { key: 'newBiz', name: 'New business' },
        { key: 'renewals', name: 'Renewals' },
      ]}
    />
  );
}`;

export const thumbnail = () => (
  <StackedBarChart
    aria-label="Bookings by source and quarter"
    data={quarters}
    categoryKey="quarter"
    series={[
      { key: 'newBiz', name: 'New business' },
      { key: 'renewals', name: 'Renewals' },
      { key: 'expansion', name: 'Expansion' },
    ]}
    legend={false}
  />
);

export const anatomy = sharedAnatomy('Parts stacked end to end, each in its own colour. The last non-zero part of each bar is rounded (4px) on its outer end; every join is square. A Neutral-3 "Remaining" part fills the gap to the total.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Different categories',
    description: 'Genuinely different parts walk the series colours in order. The corner rounding is worked out per bar, so it follows whichever part ends up last.',
    render: () => (
      <StackedBarChart
        aria-label="Bookings by source and quarter"
        data={quarters}
        categoryKey="quarter"
        categoryLabel="Quarter"
        series={[
          { key: 'newBiz', name: 'New business' },
          { key: 'renewals', name: 'Renewals' },
          { key: 'expansion', name: 'Expansion' },
        ]}
        valueFormat={v => '$' + v + 'k'}
      />
    ),
    code: `<StackedBarChart
  aria-label="Bookings by source and quarter"
  data={quarters}
  categoryKey="quarter"
  categoryLabel="Quarter"
  series={[
    { key: 'newBiz', name: 'New business' },
    { key: 'renewals', name: 'Renewals' },
    { key: 'expansion', name: 'Expansion' },
  ]}
  valueFormat={v => '$' + v + 'k'}
/>`,
  },
  {
    id: 'remainder',
    title: 'Up to a goal',
    description: 'Name the key of the figure each bar is labelled with as `totalKey`. What the parts do not account for is drawn in Neutral-3 as "Remaining", so the stack always equals its label.',
    render: () => (
      <StackedBarChart
        aria-label="Bookings against goal by quarter"
        data={quarters}
        categoryKey="quarter"
        categoryLabel="Quarter"
        series={[
          { key: 'newBiz', name: 'New business' },
          { key: 'renewals', name: 'Renewals' },
          { key: 'expansion', name: 'Expansion' },
        ]}
        totalKey="goal"
        remainderName="Still to book"
        valueFormat={v => '$' + v + 'k'}
      />
    ),
    code: `<StackedBarChart
  aria-label="Bookings against goal by quarter"
  data={quarters}
  categoryKey="quarter"
  categoryLabel="Quarter"
  series={[
    { key: 'newBiz', name: 'New business' },
    { key: 'renewals', name: 'Renewals' },
    { key: 'expansion', name: 'Expansion' },
  ]}
  totalKey="goal"
  remainderName="Still to book"
  valueFormat={v => '$' + v + 'k'}
/>`,
  },
  {
    id: 'ramp',
    title: 'Parts of one measure',
    description: 'When the parts are slices of ONE measure, give them a single-hue `ramp` (lightest first) instead of different colours. The legend, the tooltip and the table name each part: colour alone never does.',
    render: () => (
      <StackedBarChart
        aria-label="Bookings by source and quarter, one hue"
        data={quarters}
        categoryKey="quarter"
        series={[
          { key: 'newBiz', name: 'New business' },
          { key: 'renewals', name: 'Renewals' },
          { key: 'expansion', name: 'Expansion' },
        ]}
        ramp="navy"
        orientation="horizontal"
      />
    ),
    code: `<StackedBarChart
  aria-label="Bookings by source and quarter, one hue"
  data={quarters}
  categoryKey="quarter"
  series={[
    { key: 'newBiz', name: 'New business' },
    { key: 'renewals', name: 'Renewals' },
    { key: 'expansion', name: 'Expansion' },
  ]}
  ramp="navy"
  orientation="horizontal"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'The parts of each bar, bottom (or left) to top (or right): `key`, `name` and optional `color`.' },
  { name: 'orientation', options: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Bars standing up, or lying lengthwise with the categories on the left.' },
  { name: 'totalKey', options: 'string', default: '—', description: 'The key of the figure each bar is labelled with. The part not covered by the series is drawn in Neutral-3.' },
  { name: 'remainderName', options: 'string', default: "'Remaining'", description: 'What the uncovered part is called, when `totalKey` is set.' },
  { name: 'ramp', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: '—', description: 'For parts of one measure: a single-hue ramp, lightest first, up to three parts. The legend, tooltip and table must name each part.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;

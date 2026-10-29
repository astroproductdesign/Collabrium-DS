// Documentation for Range chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with RangeChart.usage.md. Not part of the package build.
import { RangeChart } from './RangeChart';
import { sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules, spread } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Range chart';

export const description =
  'A floating band between a low and a high value for each category, such as a min-max variance or a confidence range. Drawn with Recharts.';

export const usage = `import { RangeChart } from '@collabrium/ui/charts-extra';

export function Slippage({ data }) {
  return (
    <RangeChart
      aria-label="Daily slippage range"
      data={data}
      categoryKey="day"
      minKey="low"
      maxKey="high"
      name="Slippage range"
      valueFormat={v => v + '%'}
    />
  );
}`;

export const thumbnail = () => (
  <RangeChart aria-label="Daily slippage range" data={spread} categoryKey="day" minKey="low" maxKey="high" name="Slippage range" color="purple" legend={false} />
);

export const anatomy = sharedAnatomy('A band from the low to the high value: a 12% wash of its colour, with a 2px line on each edge.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'A band per day',
    description: 'Pass the key of the low end and the key of the high end. The tooltip shows both, and the table has a column for each.',
    render: () => (
      <RangeChart
        aria-label="Daily slippage range"
        data={spread}
        categoryKey="day"
        categoryLabel="Day"
        minKey="low"
        maxKey="high"
        name="Slippage range"
        color="purple"
        valueFormat={v => v.toFixed(2) + '%'}
      />
    ),
    code: `<RangeChart
  aria-label="Daily slippage range"
  data={spread}
  categoryKey="day"
  categoryLabel="Day"
  minKey="low"
  maxKey="high"
  name="Slippage range"
  color="purple"
  valueFormat={v => v.toFixed(2) + '%'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'minKey', options: 'string', default: '—', required: true, description: 'The key of the low end of the range in each row.' },
  { name: 'maxKey', options: 'string', default: '—', required: true, description: 'The key of the high end of the range in each row.' },
  { name: 'name', options: 'string', default: '—', required: true, description: 'Names the band in the legend, the tooltip and the table.' },
  { name: 'color', options: 'SeriesColorName', default: "'orange'", description: 'One of the seven DLS series colours: orange, salmonPink, green, navy, amber, purple, turquoise.' },
  { name: 'yAxisStart', options: "'zero' | 'fit'", default: "'zero'", description: 'Where the value axis starts.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;

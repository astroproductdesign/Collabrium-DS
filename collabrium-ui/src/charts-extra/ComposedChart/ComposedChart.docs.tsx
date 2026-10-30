// Documentation for Composed chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with ComposedChart.usage.md. Not part of the package build.
import { ComposedChart } from './ComposedChart';
import { barAccessibility, episodes, quarters, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Composed chart';

export const description =
  'Bars and a line on one canvas, for two measures of the same categories: a count and a rate over it, or a total and its target. Drawn with Recharts. The line can have its own axis on the right.';

export const usage = `import { ComposedChart } from '@collabrium/ui/charts-extra';

export function Rewards({ data }) {
  return (
    <ComposedChart
      aria-label="Rewards and yield by episode"
      data={data}
      categoryKey="episode"
      bars={[{ key: 'rewards', name: 'Rewards (SOL)' }]}
      line={{ key: 'apy', name: 'Yield (%)' }}
      lineFormat={v => v + '%'}
    />
  );
}`;

export const thumbnail = () => (
  <ComposedChart aria-label="Rewards and yield by episode" data={episodes} categoryKey="episode" bars={[{ key: 'rewards', name: 'Rewards', color: 'navy' }]} line={{ key: 'apy', name: 'Yield', color: 'orange' }} legend={false} />
);

export const anatomy = sharedAnatomy('Bars (4px radius on the outer end, at most 24px thick) with a 2px line over them: 3px points with a 2px Neutral-1 ring, 5px on hover. A second value axis on the right when the line has its own scale.');

export const examples: DocsExample[] = [
  {
    id: 'own-axis',
    title: 'A line on its own axis',
    description: 'The line is a rate and the bars a count, so the line gets a second axis on the right: the same hidden border and footnote ticks, and no gridline of its own, because the Neutral-3 hairline is drawn once, on the left.',
    render: () => (
      <ComposedChart
        aria-label="Rewards and yield by episode"
        data={episodes}
        categoryKey="episode"
        categoryLabel="Episode"
        bars={[{ key: 'rewards', name: 'Rewards (SOL)' }]}
        line={{ key: 'apy', name: 'Yield (%)' }}
        lineFormat={v => v + '%'}
      />
    ),
    code: `<ComposedChart
  aria-label="Rewards and yield by episode"
  data={episodes}
  categoryKey="episode"
  categoryLabel="Episode"
  bars={[{ key: 'rewards', name: 'Rewards (SOL)' }]}
  line={{ key: 'apy', name: 'Yield (%)' }}
  lineFormat={v => v + '%'}
/>`,
  },
  {
    id: 'shared-axis',
    title: 'Bars and a target on one axis',
    description: '`lineAxis="shared"` plots the line on the bars\' own scale, for a target or a total in the same units. Several bars sit side by side, each in the next colour; the line takes the colour after them.',
    render: () => (
      <ComposedChart
        aria-label="Bookings by quarter against goal"
        data={quarters}
        categoryKey="quarter"
        categoryLabel="Quarter"
        bars={[
          { key: 'newBiz', name: 'New business', color: 'navy' },
          { key: 'renewals', name: 'Renewals', color: 'green' },
        ]}
        line={{ key: 'goal', name: 'Goal', color: 'orange', dashed: true }}
        lineAxis="shared"
      />
    ),
    code: `<ComposedChart
  aria-label="Bookings by quarter against goal"
  data={quarters}
  categoryKey="quarter"
  categoryLabel="Quarter"
  bars={[
    { key: 'newBiz', name: 'New business', color: 'navy' },
    { key: 'renewals', name: 'Renewals', color: 'green' },
  ]}
  line={{ key: 'goal', name: 'Goal', color: 'orange', dashed: true }}
  lineAxis="shared"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'bars', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per bar in a group: `key`, `name` and optional `color`. The axis on the left starts at zero.' },
  { name: 'line', options: 'ChartSeries', default: '—', required: true, description: 'The line over the bars: `key`, `name`, optional `color` (default the colour after the last bar\'s) and `dashed`.' },
  { name: 'lineAxis', options: "'own' | 'shared'", default: "'own'", description: 'Its own scale on a second axis on the right, or the bars\' axis.' },
  { name: 'lineFormat', options: '(value: number) => string', default: 'valueFormat', description: 'Formats the line\'s values for the right axis, tooltip and table.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;

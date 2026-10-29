// Documentation for Polar area chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with PolarAreaChart.usage.md. Not part of the package build.
import { PolarAreaChart } from './PolarAreaChart';
import { polarAccessibility, regions, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Polar area chart';

export const description =
  'Volume by category when the categories have no order: equal wedges, each reaching as far as its value, on a grid of four rings. Drawn with Recharts.';

export const usage = `import { PolarAreaChart } from '@collabrium/ui/charts-extra';

export function Traffic({ data }) {
  return (
    <PolarAreaChart
      aria-label="Requests by region"
      data={data}
      nameKey="region"
      valueKey="requests"
    />
  );
}`;

export const thumbnail = () => <PolarAreaChart aria-label="Requests by region" data={regions} nameKey="region" valueKey="requests" color="navy" legend={false} />;

export const anatomy = sharedAnatomy('Wedges of equal angle that reach out to their value, in one hue\'s ramp, translucent so the Neutral-3 rings show through, with a 2px Neutral-1 border.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four regions',
    description: 'Every wedge has the same angle; only the reach differs. The outer ring is a round number above the largest value, or `max` when you give one.',
    render: () => <PolarAreaChart aria-label="Requests by region" data={regions} nameKey="region" valueKey="requests" color="navy" valueFormat={v => v + 'M'} />,
    code: `<PolarAreaChart
  aria-label="Requests by region"
  data={regions}
  nameKey="region"
  valueKey="requests"
  color="navy"
  valueFormat={v => v + 'M'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per wedge, in order. Up to four.' },
  { name: 'nameKey', options: 'string', default: '—', required: true, description: 'The key of each wedge\'s name.' },
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each wedge\'s value; it sets how far the wedge reaches.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The hue the wedges walk, lightest first.' },
  { name: 'max', options: 'number', default: 'next round number', description: 'The value at the outer ring.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the rings, tooltip and table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each wedge.' },
];

export const rules = sharedRules();
export const accessibility = polarAccessibility;
export const motion = sharedMotion;

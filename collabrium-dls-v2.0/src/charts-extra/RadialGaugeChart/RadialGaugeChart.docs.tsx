// Documentation for Radial gauge (Charts (extra)), rendered by the docs site.
// Keep it consistent with RadialGaugeChart.usage.md. Not part of the package build.
import { RadialGaugeChart } from './RadialGaugeChart';
import { polarAccessibility, resources, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Radial gauge';

export const description =
  'Several measures against their limits, as concentric rings: each ring is filled to its own value over its own maximum, from the left round to the right. Drawn with Recharts.';

export const usage = `import { RadialGaugeChart } from '@collabrium/ui/charts-extra';

export function Capacity() {
  return (
    <RadialGaugeChart
      aria-label="Cluster resources in use"
      items={[
        { label: 'Compute', value: 28, max: 32 },
        { label: 'Memory', value: 92, max: 128 },
      ]}
    />
  );
}`;

export const thumbnail = () => <RadialGaugeChart aria-label="Cluster resources in use" items={resources.slice(0, 3)} legend={false} />;

export const anatomy = sharedAnatomy('Concentric full rings, outermost first. Each ring is a Neutral-3 track with a coloured bar to value / max, its ends rounded 4px.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Three quotas',
    description: 'Each ring has its own colour from the series order and its own maximum, so the fill is always value over max. The tooltip gives the figure and the `detail` line.',
    render: () => <RadialGaugeChart aria-label="Cluster resources in use" items={resources.slice(0, 3)} />,
    code: `<RadialGaugeChart
  aria-label="Cluster resources in use"
  items={[
    { label: 'Compute', value: 28, max: 32, detail: '28 of 32 cores' },
    { label: 'Memory', value: 92, max: 128, detail: '92 of 128 GB' },
    { label: 'Bandwidth', value: 3.4, max: 6, detail: '3.4 of 6.0 GB/s' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'items', options: 'RadialItem[]', default: '—', required: true, description: 'One ring per item, outermost first, up to five: `label`, `value`, optional `max` (default 100), `detail` and `color`.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the tooltip and the table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which names each ring and shows or hides it.' },
];

export const rules = sharedRules();
export const accessibility = polarAccessibility;
export const motion = sharedMotion;

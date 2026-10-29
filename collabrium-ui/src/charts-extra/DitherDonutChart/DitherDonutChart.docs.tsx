// Documentation for Dither donut chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with DitherDonutChart.usage.md. Not part of the package build.
import { DitherDonutChart } from './DitherDonutChart';
import { plans, polarAccessibility, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Dither donut chart';

export const description =
  'Part of a whole as a ring with a printed texture: one hue, and each slice its own pattern from sparse to dense. Drawn with Recharts.';

export const usage = `import { DitherDonutChart } from '@collabrium/ui/charts-extra';

export function Plans({ data }) {
  return (
    <DitherDonutChart
      aria-label="Members by plan"
      data={data}
      nameKey="plan"
      valueKey="members"
      centerLabel="Members"
    />
  );
}`;

export const thumbnail = () => <DitherDonutChart aria-label="Members by plan" data={plans} nameKey="plan" valueKey="members" color="navy" legend={false} />;

export const anatomy = sharedAnatomy('A ring of up to four slices with a 2px Neutral-1 border between them: all in one hue, each filled with its own pattern (stipple, dots, hatch, checker). The total sits in the centre.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four slices',
    description: 'Every slice is the same hue; the pattern gets denser slice by slice in the place of Donut chart\'s darker tints. Hover a slice to read its value and name in the centre.',
    render: () => <DitherDonutChart aria-label="Members by plan" data={plans} nameKey="plan" valueKey="members" centerLabel="Members" />,
    code: `<DitherDonutChart
  aria-label="Members by plan"
  data={plans}
  nameKey="plan"
  valueKey="members"
  centerLabel="Members"
/>`,
  },
  {
    id: 'hue',
    title: 'Another hue',
    description: '`color` picks one of the five ramp hues. The legend swatches carry the patterns, so the key matches the ring.',
    render: () => <DitherDonutChart aria-label="Members by plan, in navy" data={plans} nameKey="plan" valueKey="members" color="navy" centerLabel="Members" />,
    code: `<DitherDonutChart
  aria-label="Members by plan, in navy"
  data={plans}
  nameKey="plan"
  valueKey="members"
  color="navy"
  centerLabel="Members"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart, e.g. "Members by plan".' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per slice, in order. Up to four.' },
  { name: 'nameKey', options: 'string', default: '—', required: true, description: 'The key of each slice\'s name.' },
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each slice\'s value.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The one hue every slice is drawn in.' },
  { name: 'centerLabel', options: 'string', default: "'Total'", description: 'Caption under the total in the centre.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the centre, tooltip and table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each slice.' },
];

export const rules = sharedRules();
export const accessibility = polarAccessibility;
export const motion = sharedMotion;

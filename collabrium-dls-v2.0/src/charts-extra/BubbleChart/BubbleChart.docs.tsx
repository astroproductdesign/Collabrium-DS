// Documentation for Bubble chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with BubbleChart.usage.md. Not part of the package build.
import { BubbleChart } from './BubbleChart';
import { pools, sharedAccessibility, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Bubble chart';

export const description =
  'Three measures at once: two as position, one as size. Each bubble is a 30% wash of its colour with a 2px border in the full colour. Drawn with Recharts.';

export const usage = `import { BubbleChart } from '@collabrium/ui/charts-extra';

export function Pools({ points }) {
  return (
    <BubbleChart
      aria-label="Pool volume against yield, sized by liquidity"
      series={[{ name: 'Pools', points }]}
      xLabel="24h volume ($M)"
      yLabel="Yield (%)"
      sizeLabel="Liquidity"
    />
  );
}`;

export const thumbnail = () => (
  <BubbleChart aria-label="Pool volume against yield" series={[{ name: 'Pools', points: pools, color: 'navy' }]} xLabel="24h volume ($M)" yLabel="Yield (%)" sizeLabel="Liquidity" legend={false} />
);

export const anatomy = sharedAnatomy('Bubbles: a 30% wash of the series colour, a 2px border in the full colour, and a radius that grows with the third measure (6px to 24px).');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Volume, yield and liquidity',
    description: 'Position gives two measures and size the third. Give every point a `z`; the tooltip and the table give all three figures.',
    render: () => (
      <BubbleChart
        aria-label="Pool volume against yield, sized by liquidity"
        series={[{ name: 'Pools', points: pools, color: 'navy' }]}
        xLabel="24h volume ($M)"
        yLabel="Yield (%)"
        sizeLabel="Liquidity"
        xFormat={v => '$' + v + 'M'}
        yFormat={v => v + '%'}
        sizeFormat={v => '$' + v + 'k'}
      />
    ),
    code: `<BubbleChart
  aria-label="Pool volume against yield, sized by liquidity"
  series={[{ name: 'Pools', points: pools, color: 'navy' }]}
  xLabel="24h volume ($M)"
  yLabel="Yield (%)"
  sizeLabel="Liquidity"
  xFormat={v => '$' + v + 'M'}
  yFormat={v => v + '%'}
  sizeFormat={v => '$' + v + 'k'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'series', options: 'XYSeries[]', default: '—', required: true, description: 'Up to three groups of bubbles: `name`, `points` (`x`, `y`, `z`, optional `name`) and optional `color`.' },
  { name: 'xLabel', options: 'string', default: '—', required: true, description: 'Title of the horizontal axis.' },
  { name: 'yLabel', options: 'string', default: '—', required: true, description: 'Title of the vertical axis.' },
  { name: 'sizeLabel', options: 'string', default: '—', required: true, description: 'Names the third measure, drawn as size.' },
  { name: 'sizeFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats the third measure for the tooltip and table.' },
  { name: 'xFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats horizontal values.' },
  { name: 'yFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats vertical values.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each series.' },
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;

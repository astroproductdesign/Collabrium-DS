// Documentation for Treemap (Charts (extra)), rendered by the docs site.
// Keep it consistent with TreemapChart.usage.md. Not part of the package build.
import { TreemapChart } from './TreemapChart';
import { gridAccessibility, partitions, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Treemap';

export const description =
  'How a total divides into parts, as tiles whose areas are the parts. Larger tiles are darker on a single-hue ramp. Drawn with Recharts.';

export const usage = `import { TreemapChart } from '@collabrium/ui/charts-extra';

export function DiskUse({ data }) {
  return (
    <TreemapChart
      aria-label="Disk use by partition"
      data={data}
      nameKey="name"
      valueKey="size"
      valueFormat={v => v + ' GB'}
    />
  );
}`;

export const thumbnail = () => <TreemapChart aria-label="Disk use by partition" data={partitions} nameKey="name" valueKey="size" color="green" />;

export const anatomy = sharedAnatomy('Tiles with a 4px radius and a 2px Neutral-1 border between them. Each shows its name and, when there is room, its value and share.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four partitions',
    description: 'Tiles are laid out by size, largest first, and the largest is the darkest. A tile too small for text shows none; hover for its value and share, or use the table.',
    render: () => (
      <TreemapChart aria-label="Disk use by partition" data={partitions} nameKey="name" valueKey="size" color="green" valueFormat={v => v + ' GB'} />
    ),
    code: `<TreemapChart
  aria-label="Disk use by partition"
  data={partitions}
  nameKey="name"
  valueKey="size"
  color="green"
  valueFormat={v => v + ' GB'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per tile.' },
  { name: 'nameKey', options: 'string', default: '—', required: true, description: 'The key of each tile\'s name.' },
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each tile\'s value; it sets the tile\'s area.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The hue of the ramp; larger tiles are darker.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the tile, the tooltip and the table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

export const rules = sharedRules();
export const accessibility = gridAccessibility;
export const motion = sharedMotion;

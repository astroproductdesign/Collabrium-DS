// Documentation for Sankey chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with SankeyChart.usage.md. Not part of the package build.
import { SankeyChart } from './SankeyChart';
import { gridAccessibility, routes, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Sankey chart';

export const description =
  'How a quantity splits and merges as it moves between stages: nodes joined by bands whose widths are the flows. Drawn with Recharts.';

export const usage = `import { SankeyChart } from '@collabrium/ui/charts-extra';

export function Routing({ links }) {
  return (
    <SankeyChart
      aria-label="Requests from each source to the leader"
      links={links}
    />
  );
}`;

export const thumbnail = () => <SankeyChart aria-label="Requests from each source to the leader" links={routes} />;

export const anatomy = sharedAnatomy('Nodes (12px-wide, 4px-radius) joined by bands whose widths are the flows. Each source is a series colour and its bands are a 30% wash of it; every node downstream is Obsidian.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Two sources, one leader',
    description: 'Give the flows as `source`, `target` and `value`; the nodes are the names that appear. Hover a band for its flow, or a node for its total.',
    render: () => <SankeyChart aria-label="Requests from each source to the leader" links={routes} valueFormat={v => (v / 1000).toFixed(1) + 'k'} />,
    code: `<SankeyChart
  aria-label="Requests from each source to the leader"
  links={[
    { source: 'Mempool', target: 'Leader slot', value: 48500 },
    { source: 'Direct RPC', target: 'Leader slot', value: 35700 },
    { source: 'Leader slot', target: 'Confirmed', value: 82800 },
    { source: 'Leader slot', target: 'Dropped', value: 1400 },
  ]}
  valueFormat={v => (v / 1000).toFixed(1) + 'k'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'links', options: 'SankeyLink[]', default: '—', required: true, description: 'The flows: `source`, `target` (node names) and `value`. Flows must not loop back.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats flows for the node, tooltip and table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

export const rules = sharedRules();
export const accessibility = gridAccessibility;
export const motion = sharedMotion;

// Documentation for Radar chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with RadarChart.usage.md. Not part of the package build.
import { RadarChart } from './RadarChart';
import { polarAccessibility, sharedAnatomy, sharedMotion, sharedRules, skills } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Radar chart';

export const description =
  'Performance across several dimensions: one polygon per series on a web of rings and spokes, with axes fixed to a rating scale. Drawn with Recharts.';

export const usage = `import { RadarChart } from '@collabrium/ui/charts-extra';

export function Profile({ data }) {
  return (
    <RadarChart
      aria-label="Team against peers on five measures"
      data={data}
      categoryKey="axis"
      series={[{ key: 'team', name: 'Team' }]}
    />
  );
}`;

export const thumbnail = () => <RadarChart aria-label="Team against peers" data={skills} categoryKey="axis" series={[{ key: 'team', name: 'Team' }, { key: 'peer', name: 'Peers' }]} legend={false} />;

export const anatomy = sharedAnatomy('Polygons: a 2px line in the series colour, a 12% wash inside it and 3px ringed points at each axis. Rings and spokes are Neutral-3; the ring values sit on a Neutral-1 backdrop.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One profile',
    description: 'The axes run 0 to 10, the DLS rating scale, not the data\'s own range, so two charts can be compared. Axis names are footnote text in Neutral-5.',
    render: () => <RadarChart aria-label="Team on five measures" data={skills} categoryKey="axis" axisLabel="Measure" series={[{ key: 'team', name: 'Team' }]} />,
    code: `<RadarChart
  aria-label="Team on five measures"
  data={skills}
  categoryKey="axis"
  axisLabel="Measure"
  series={[{ key: 'team', name: 'Team' }]}
/>`,
  },
  {
    id: 'compare',
    title: 'Two profiles',
    description: 'Each series takes the next colour and a 12% wash, so one polygon shows through the other. Click a legend item to hide a polygon.',
    render: () => (
      <RadarChart
        aria-label="Team against peers on five measures"
        data={skills}
        categoryKey="axis"
        series={[
          { key: 'team', name: 'Team', color: 'navy' },
          { key: 'peer', name: 'Peers', color: 'amber' },
        ]}
        height="tall"
      />
    ),
    code: `<RadarChart
  aria-label="Team against peers on five measures"
  data={skills}
  categoryKey="axis"
  series={[
    { key: 'team', name: 'Team', color: 'navy' },
    { key: 'peer', name: 'Peers', color: 'amber' },
  ]}
  height="tall"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per axis. Up to six axes.' },
  { name: 'categoryKey', options: 'string', default: '—', required: true, description: 'The key of each axis\'s name.' },
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per polygon: `key`, `name` and optional `color`.' },
  { name: 'max', options: 'number', default: '10', description: 'The top of every axis: a rating scale, not the data\'s range.' },
  { name: 'axisLabel', options: 'string', default: "'Axis'", description: 'The heading of the axis-name column in the table view.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the ring labels, tooltip and table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each polygon.' },
];

export const rules = sharedRules();
export const accessibility = polarAccessibility;
export const motion = sharedMotion;

// Documentation for Scatter chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with ScatterChart.usage.md. Not part of the package build.
import { ScatterChart } from './ScatterChart';
import { deals, sharedAccessibility, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Scatter chart';

export const description =
  'Two measures plotted against each other, one point per case, with no line between them: for correlation and distribution. Drawn with Recharts.';

export const usage = `import { ScatterChart } from '@collabrium/ui/charts-extra';

export function Deals({ points }) {
  return (
    <ScatterChart
      aria-label="Deal size against days to close"
      series={[{ name: 'Deals', points }]}
      xLabel="Days to close"
      yLabel="Deal size ($k)"
    />
  );
}`;

export const thumbnail = () => (
  <ScatterChart aria-label="Deal size against days to close" series={[{ name: 'Deals', points: deals, color: 'green' }]} xLabel="Days to close" yLabel="Deal size ($k)" legend={false} />
);

export const anatomy = sharedAnatomy('Points of 6px radius (8px on hover) in the series colour with a 1px Neutral-1 border. Nothing connects them. Both axes carry a label2 title in Neutral-5.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One group of points',
    description: 'Each point is a case. The axis titles say what each axis measures; hover a point for both figures.',
    render: () => (
      <ScatterChart aria-label="Deal size against days to close" series={[{ name: 'Deals', points: deals, color: 'green' }]} xLabel="Days to close" yLabel="Deal size ($k)" />
    ),
    code: `<ScatterChart
  aria-label="Deal size against days to close"
  series={[{ name: 'Deals', points: deals, color: 'green' }]}
  xLabel="Days to close"
  yLabel="Deal size ($k)"
/>`,
  },
  {
    id: 'groups',
    title: 'Two groups',
    description: 'Each series takes the next colour. Give a point a `name` to title its tooltip and fill the table\'s Point column.',
    render: () => (
      <ScatterChart
        aria-label="Deal size against days to close, by region"
        series={[
          { name: 'EMEA', points: deals.slice(0, 6).map((p, i) => ({ ...p, name: `Deal E${i + 1}` })) },
          { name: 'APAC', points: deals.slice(6).map((p, i) => ({ ...p, name: `Deal A${i + 1}` })), color: 'navy' },
        ]}
        xLabel="Days to close"
        yLabel="Deal size ($k)"
        xFormat={v => v + ' d'}
        yFormat={v => '$' + v + 'k'}
        height="tall"
      />
    ),
    code: `<ScatterChart
  aria-label="Deal size against days to close, by region"
  series={[
    { name: 'EMEA', points: emea },
    { name: 'APAC', points: apac, color: 'navy' },
  ]}
  xLabel="Days to close"
  yLabel="Deal size ($k)"
  xFormat={v => v + ' d'}
  yFormat={v => '$' + v + 'k'}
  height="tall"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'series', options: 'XYSeries[]', default: '—', required: true, description: 'One entry per group of points: `name`, `points` (`x`, `y`, optional `name`) and optional `color`.' },
  { name: 'xLabel', options: 'string', default: '—', required: true, description: 'Title of the horizontal axis.' },
  { name: 'yLabel', options: 'string', default: '—', required: true, description: 'Title of the vertical axis.' },
  { name: 'xFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats horizontal values for the axis, tooltip and table.' },
  { name: 'yFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats vertical values.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each series.' },
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;

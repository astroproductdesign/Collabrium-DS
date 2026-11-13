// Documentation for Sparkline (Charts (extra)), rendered by the docs site.
// Keep it consistent with SparklineChart.usage.md. Not part of the package build.
import { SparklineChart } from './SparklineChart';
import { iops, readings } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Sparkline';

export const description =
  'A glance at a trend beside a figure that is already on screen: a 2px line with no axes, gridlines, legend, tooltip or table. Drawn with Recharts. It is the DLS\'s sparkline, for the Stat / KPI card\'s reserved slot.';

export const usage = `import { SparklineChart } from '@collabrium/ui/charts-extra';

export function CoreTemperature() {
  return (
    <SparklineChart
      aria-label="Core temperature, last 5 readings"
      values={[38, 41, 39, 44, 42.4]}
      valueFormat={v => v + '°C'}
    />
  );
}`;

export const thumbnail = () => <SparklineChart aria-label="Core temperature" values={readings} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Sparkline',
    element: '<figure>.cui-spark',
    description: 'An image named by `aria-label` plus a one-sentence summary of the trend. It has no card, no legend and no table: it annotates a figure that is already on screen.',
    children: [
      { name: 'Line', description: 'A 2px line in the colour of the element that owns the metric, with the same gentle curve as Line chart.' },
      { name: 'Wash', when: 'fill is on', description: 'The line\'s own colour under it, at 12%.' },
      { name: 'End point', when: 'endPoint is on', description: 'A 3px point with a 2px Neutral-1 ring on the latest value.' },
    ],
  },
];

const row = (children: React.ReactNode) => <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 360 }}>{children}</div>;

export const examples: DocsExample[] = [
  {
    id: 'beside-figure',
    title: 'Beside a figure',
    description: 'The line fills the width it is given and is 32px tall. The figure it annotates sits beside it; the chart itself says nothing the figure does not.',
    render: () =>
      row(
        <>
          <strong>42.4°C</strong>
          <SparklineChart aria-label="Core temperature, last 5 readings" values={readings} valueFormat={v => v + '°C'} />
        </>,
      ),
    code: `<div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 360 }}>
  <strong>42.4°C</strong>
  <SparklineChart
    aria-label="Core temperature, last 5 readings"
    values={readings}
    valueFormat={v => v + '°C'}
  />
</div>`,
  },
  {
    id: 'wash-and-point',
    title: 'Wash and end point',
    description: '`fill` adds the colour as a 12% wash under the line, and `endPoint` marks the latest value with a 3px point. Colour is the owning element\'s: here Green.',
    render: () =>
      row(
        <>
          <strong>48.2k</strong>
          <SparklineChart aria-label="Disk operations per second, last 5 readings" values={iops} color="green" fill endPoint valueFormat={v => v + 'k'} />
        </>,
      ),
    code: `<div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 360 }}>
  <strong>48.2k</strong>
  <SparklineChart
    aria-label="Disk operations per second, last 5 readings"
    values={iops}
    color="green"
    fill
    endPoint
    valueFormat={v => v + 'k'}
  />
</div>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the measure, e.g. "Core temperature, last 5 readings". The chart adds a sentence on the trend after it.' },
  { name: 'values', options: 'number[]', default: '—', required: true, description: 'The values in order, oldest first. At least two.' },
  { name: 'color', options: 'SeriesColorName', default: "'orange'", description: 'One of the seven series colours: the colour of the element that owns the metric.' },
  { name: 'fill', options: 'boolean', default: 'false', description: 'Adds the line\'s colour as a 12% wash under it.' },
  { name: 'endPoint', options: 'boolean', default: 'false', description: 'Marks the latest value with a 3px point.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values in the spoken summary.' },
];

export const rules: DocsRules = {
  do: [
    'Put it beside or under a figure that is already on screen.',
    'Give it the colour of the element that owns the metric.',
    'Name the measure in `aria-label`.',
  ],
  dont: [
    "Don't use it alone: it has no values to read. Use Line chart.",
    "Don't add axes, a legend or a tooltip: it is a glance, not an instrument.",
    "Don't put it in a chart card; it inherits no chart chrome.",
    "Don't use it for more than one series.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [{ keys: 'None', action: 'The sparkline is not interactive and takes no focus.' }],
  notes: [
    'It is an image: `aria-label` names the measure, and the chart adds one sentence, such as "Rising from 38 to 42.4 over 5 points, low 38, high 44."',
    'It has no "View as table", as the DLS says: it annotates a figure that is on screen, and that figure carries the value.',
    'The trend is in the summary, so the picture is never the only way to learn it.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'The sparkline first appears', motion: 'The line draws in. Under reduced motion the finished line appears at once.', token: '--duration-slow (placeholder: the DLS names no chart animation)' },
];

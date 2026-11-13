// Documentation for Gauge arc (Charts (extra)), rendered by the docs site.
// Keep it consistent with GaugeArcChart.usage.md. Not part of the package build.
import { GaugeArcChart } from './GaugeArcChart';
import { polarAccessibility, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Gauge arc';

export const description =
  'One value on a 240° dial, with its reading in the centre: how far a single measure has come toward its limit. Drawn with Recharts.';

export const usage = `import { GaugeArcChart } from '@collabrium/ui/charts-extra';

export function Uptime() {
  return (
    <GaugeArcChart
      aria-label="Uptime this quarter"
      value={99.98}
      name="Uptime"
      caption="SLA met"
      valueFormat={v => v + '%'}
    />
  );
}`;

export const thumbnail = () => <GaugeArcChart aria-label="Uptime this quarter" value={99.98} name="Uptime" caption="SLA met" valueFormat={v => v + '%'} color="green" />;

export const anatomy = sharedAnatomy('A 240° arc: a Neutral-3 track with a coloured bar to value / max, ends rounded 4px. The reading is the h5 value over a caption.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'A percentage',
    description: 'With no `max`, the value is a percentage of 100. The reading in the centre is the same figure the table gives.',
    render: () => <GaugeArcChart aria-label="Uptime this quarter" value={99.98} name="Uptime" caption="SLA met" valueFormat={v => v + '%'} color="green" />,
    code: `<GaugeArcChart
  aria-label="Uptime this quarter"
  value={99.98}
  name="Uptime"
  caption="SLA met"
  valueFormat={v => v + '%'}
  color="green"
/>`,
  },
  {
    id: 'max',
    title: 'Against a maximum',
    description: '`max` is the value that fills the arc: here 6.4 of 10. Past the maximum the arc stays full.',
    render: () => <GaugeArcChart aria-label="Bandwidth in use" value={6.4} max={10} name="Bandwidth" caption="Gbps in use" valueFormat={v => v.toFixed(1)} color="navy" height="tall" />,
    code: `<GaugeArcChart
  aria-label="Bandwidth in use"
  value={6.4}
  max={10}
  name="Bandwidth"
  caption="Gbps in use"
  valueFormat={v => v.toFixed(1)}
  color="navy"
  height="tall"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'value', options: 'number', default: '—', required: true, description: 'The measured value.' },
  { name: 'max', options: 'number', default: '100', description: 'The value that fills the arc.' },
  { name: 'name', options: 'string', default: '—', required: true, description: 'What is measured, for the table and screen readers.' },
  { name: 'caption', options: 'string', default: 'the name', description: 'Written under the value in the centre.' },
  { name: 'color', options: 'SeriesColorName', default: "'orange'", description: 'One of the seven DLS series colours.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats the value.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

const base = sharedRules();
export const rules = {
  do: [...base.do.slice(0, 1), 'Use it for one measure with a natural limit (a quota, a score, a service level).', ...base.do.slice(1)],
  dont: [...base.dont, "Don't use two gauges to compare two values: use Bar chart, or Radial bar group."],
};
export const accessibility = {
  ...polarAccessibility,
  keyboard: [
    { keys: 'Tab', action: 'Moves to the View as table button. The gauge has no interactive parts.' },
    { keys: 'Enter / Space', action: 'On View as table, swaps the plot and the table.' },
  ],
};
export const motion = sharedMotion;

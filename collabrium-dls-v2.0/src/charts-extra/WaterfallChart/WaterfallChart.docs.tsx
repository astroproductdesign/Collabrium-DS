// Documentation for Waterfall chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with WaterfallChart.usage.md. Not part of the package build.
import { WaterfallChart } from './WaterfallChart';
import { barAccessibility, bridge, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Waterfall chart';

export const description =
  'How a total moves between two figures: an opening total, steps that add to it or take from it, and a closing total. Each step floats from where the last one ended.';

export const usage = `import { WaterfallChart } from '@collabrium/ui/charts-extra';

export function Bridge({ data }) {
  return (
    <WaterfallChart
      aria-label="Balance from opening to closing"
      data={data}
      categoryKey="step"
      valueKey="change"
      valueLabel="Balance"
    />
  );
}`;

export const thumbnail = () => (
  <WaterfallChart aria-label="Balance from opening to closing" data={bridge} categoryKey="step" valueKey="change" valueLabel="Balance" />
);

export const anatomy = sharedAnatomy('Floating bars: totals rise from zero in Navy, increases are Green, decreases are Red. A step starts where the previous one ended. A fixed key names the three.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Opening to closing',
    description: 'By default the first and last rows are totals. Every other row is a change: positive steps rise from the running total (Green), negative ones fall from it (Red). The tooltip and the table give the running total.',
    render: () => (
      <WaterfallChart aria-label="Balance from opening to closing" data={bridge} categoryKey="step" categoryLabel="Step" valueKey="change" valueLabel="Balance" valueFormat={v => '$' + v + 'k'} />
    ),
    code: `<WaterfallChart
  aria-label="Balance from opening to closing"
  data={bridge}
  categoryKey="step"
  categoryLabel="Step"
  valueKey="change"
  valueLabel="Balance"
  valueFormat={v => '$' + v + 'k'}
/>`,
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: '`orientation="horizontal"` lays the steps lengthwise, which suits long step names. Name the totals yourself with `totals` when they are not the first and last rows.',
    render: () => (
      <WaterfallChart
        aria-label="Balance from opening to closing, horizontal"
        data={bridge}
        categoryKey="step"
        valueKey="change"
        valueLabel="Balance"
        totals={['Opening', 'Closing']}
        orientation="horizontal"
      />
    ),
    code: `<WaterfallChart
  aria-label="Balance from opening to closing, horizontal"
  data={bridge}
  categoryKey="step"
  valueKey="change"
  valueLabel="Balance"
  totals={['Opening', 'Closing']}
  orientation="horizontal"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each step\'s value: the change for a step, the whole amount for a total.' },
  { name: 'valueLabel', options: 'string', default: "'Value'", description: 'What the value is, for the tooltip, e.g. "Balance".' },
  { name: 'totals', options: 'string[]', default: 'first and last category', description: 'The categories that are totals, drawn from zero. Pass `[]` for none.' },
  { name: 'orientation', options: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Steps standing up, or lying lengthwise with the categories on the left.' },
  ...sharedProps.filter(p => p.name !== 'legend'),
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;

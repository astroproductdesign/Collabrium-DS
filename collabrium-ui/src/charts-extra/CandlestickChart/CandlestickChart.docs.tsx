// Documentation for Candlestick chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with CandlestickChart.usage.md. Not part of the package build.
import { CandlestickChart } from './CandlestickChart';
import { barAccessibility, candles, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Candlestick chart';

export const description =
  'Four values per period (open, high, low, close) as a body with a line out to the extremes. Closed higher is solid Green, closed lower is hollow Red. Drawn with Recharts.';

export const usage = `import { CandlestickChart } from '@collabrium/ui/charts-extra';

export function Price({ data }) {
  return (
    <CandlestickChart
      aria-label="Hourly price"
      data={data}
      categoryKey="time"
      openKey="open"
      highKey="high"
      lowKey="low"
      closeKey="close"
    />
  );
}`;

export const thumbnail = () => <CandlestickChart aria-label="Hourly price" data={candles} categoryKey="time" openKey="open" highKey="high" lowKey="low" closeKey="close" />;

export const anatomy = sharedAnatomy('Candles: a 2px line from the low to the high, and a 4px-radius body between the open and the close. Solid Green when it closed higher, hollow Red with a Neutral-1 fill when lower.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Hourly price',
    description: 'The value axis fits the data (a price chart does not start at zero). Direction is carried by solid against hollow as well as by Green and Red; the tooltip says Up or Down.',
    render: () => (
      <CandlestickChart aria-label="Hourly price" data={candles} categoryKey="time" categoryLabel="Hour" openKey="open" highKey="high" lowKey="low" closeKey="close" valueFormat={v => '$' + v.toFixed(2)} />
    ),
    code: `<CandlestickChart
  aria-label="Hourly price"
  data={candles}
  categoryKey="time"
  categoryLabel="Hour"
  openKey="open"
  highKey="high"
  lowKey="low"
  closeKey="close"
  valueFormat={v => '$' + v.toFixed(2)}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'openKey', options: 'string', default: '—', required: true, description: 'The key of each period\'s opening value.' },
  { name: 'highKey', options: 'string', default: '—', required: true, description: 'The key of each period\'s highest value.' },
  { name: 'lowKey', options: 'string', default: '—', required: true, description: 'The key of each period\'s lowest value.' },
  { name: 'closeKey', options: 'string', default: '—', required: true, description: 'The key of each period\'s closing value.' },
  ...sharedProps.filter(p => p.name !== 'legend'),
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;

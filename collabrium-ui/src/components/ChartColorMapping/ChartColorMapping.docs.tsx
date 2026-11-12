// Documentation for Chart color mapping rendered by the docs site. Not part of the build.
// A guideline, not a component: every swatch here is drawn from the functions themselves, so the page can't drift.
import { categoricalColors, chartChrome, divergingColor, divergingColors, sequentialColors } from '../../charts/ChartColorMapping';
import { LineChart } from '../../charts/LineChart';
import { colorOf, type RampColorName, type SeriesColorName } from '../../charts/lib/theme';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Chart color mapping';

export const description =
  'Which colour a chart\'s data takes, by role: categorical series walk the department colours in order, a sequential scale is one element\'s ramp, a diverging scale runs Red, Neutral-3, Green. A guideline, given here as functions every chart can call.';

export const usage = `import { categoricalColors, sequentialColors, divergingColor } from '@collabrium/ui/charts';

const looks = categoricalColors(regions.length);
<LineChart series={regions.map((r, i) => ({ key: r.key, name: r.name, ...looks[i] }))} … />

sequentialColors('navy', 5);   // a Water-owned intensity scale, lightest first
divergingColor(-12, 40);       // a variance of -12 on a ±40 scale: Neutral-3 toward Red`;

const NAMES: Record<SeriesColorName, string> = {
  orange: 'Orange',
  salmonPink: 'Salmon Pink',
  green: 'Green',
  navy: 'Navy',
  amber: 'Amber',
  purple: 'Purple',
  turquoise: 'Turquoise',
};
const ELEMENTS: { name: RampColorName; label: string }[] = [
  { name: 'orange', label: 'Fire' },
  { name: 'salmonPink', label: 'Wood' },
  { name: 'green', label: 'Earth' },
  { name: 'navy', label: 'Water' },
  { name: 'amber', label: 'Gold' },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="docs-chartmap-row">
      <span className="docs-chartmap-label">{label}</span>
      <span className="docs-chartmap-swatches">{children}</span>
    </div>
  );
}
const Swatch = ({ hex, name }: { hex: string; name?: string }) => (
  <span className="docs-chartmap-swatch">
    <span className="docs-chartmap-chip" style={{ background: hex }} />
    {name && <span className="docs-chartmap-name">{name}</span>}
  </span>
);
const Steps = ({ colors }: { colors: string[] }) => (
  <span className="docs-chartmap-steps">
    {colors.map((c, i) => (
      <span key={i} style={{ background: c }} />
    ))}
  </span>
);

export const thumbnail = () => (
  <div className="docs-chartmap docs-chartmap--thumb">
    <Row label="Categorical">
      {categoricalColors(7).map((c, i) => (
        <Swatch key={i} hex={colorOf(c.color)} />
      ))}
    </Row>
    <Row label="Sequential">
      <Steps colors={sequentialColors('navy', 5)} />
    </Row>
    <Row label="Diverging">
      <Steps colors={divergingColors(7)} />
    </Row>
  </div>
);

const regions = ['North', 'South', 'East', 'West', 'Central', 'Klang Valley', 'Borneo', 'Penang', 'Johor'];
const regionData = ['Q1', 'Q2', 'Q3', 'Q4'].map((q, qi) =>
  Object.fromEntries([['quarter', q], ...regions.map((r, ri) => [r, 20 + ri * 6 + ((qi * (ri + 3)) % 9) * 2])]),
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chart color mapping',
    element: '@collabrium/ui/charts',
    description: 'Functions, not markup. The charts already follow it; call these when you colour data yourself.',
    children: [
      { name: 'Categorical', element: 'categoricalColors(n)', description: 'Orange, Salmon Pink, Green, Navy, Amber, then Purple and Turquoise; from the 8th series the colours repeat, dashed.' },
      { name: 'Sequential', element: 'sequentialColors(element, n)', description: 'One element\'s ramp, its -bg tint (lightest) to full strength (darkest).' },
      { name: 'Diverging', element: 'divergingColor(value, extent, midpoint?)', description: 'Red below, Neutral-3 at the midpoint, Green above; `divergingColors(n)` gives even steps for a legend.' },
      { name: 'Chrome', element: 'chartChrome', description: 'Neutral-3 gridlines; Neutral-5 axis labels, ticks and legend text.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'categorical',
    title: 'Categorical',
    description: 'Different things side by side (regions, channels, departments). Walk the department table in order, then the two reserve accents. Never pick colours out of order.',
    render: () => (
      <div className="docs-chartmap">
        <Row label="1 to 5: departments">
          {categoricalColors(5).map((c, i) => (
            <Swatch key={i} hex={colorOf(c.color)} name={NAMES[c.color]} />
          ))}
        </Row>
        <Row label="6 and 7: reserve">
          {categoricalColors(7).slice(5).map((c, i) => (
            <Swatch key={i} hex={colorOf(c.color)} name={NAMES[c.color]} />
          ))}
        </Row>
      </div>
    ),
    code: `categoricalColors(7);
// [{ color: 'orange', dashed: false }, { color: 'salmonPink', … }, { color: 'green', … },
//  { color: 'navy', … }, { color: 'amber', … }, { color: 'purple', … }, { color: 'turquoise', … }]`,
  },
  {
    id: 'past-seven',
    title: 'Past seven series',
    description: 'Nine regions: the 8th and 9th repeat Orange and Salmon Pink, dashed. More than seven hues can\'t be told apart, so a pattern does it, never a new colour.',
    render: () => {
      const looks = categoricalColors(regions.length);
      return (
        <div className="docs-chart-single">
          <LineChart
            aria-label="Bookings by region, per quarter"
            data={regionData}
            categoryKey="quarter"
            categoryLabel="Quarter"
            series={regions.map((r, i) => ({ key: r, name: r, ...looks[i] }))}
          />
        </div>
      );
    },
    code: `const looks = categoricalColors(regions.length); // 9: the last two dashed

<LineChart
  aria-label="Bookings by region, per quarter"
  data={data}
  categoryKey="quarter"
  series={regions.map((r, i) => ({ key: r, name: r, ...looks[i] }))}
/>`,
  },
  {
    id: 'sequential',
    title: 'Sequential',
    description: 'One measure\'s intensity (a heatmap, an ordered set): the owning element\'s ramp, lightest to darkest. One hue only; never a rainbow.',
    render: () => (
      <div className="docs-chartmap">
        {ELEMENTS.map((e) => (
          <Row key={e.name} label={`${e.label} (${NAMES[e.name]})`}>
            <Steps colors={sequentialColors(e.name, 5)} />
          </Row>
        ))}
      </div>
    ),
    code: `sequentialColors('navy', 5); // Water: --color-water-bg … --color-navy`,
  },
  {
    id: 'diverging',
    title: 'Diverging',
    description: 'A measure around a midpoint (spend against budget, variance around zero): Red below, Neutral-3 at the midpoint, Green above, as Badge\'s danger and success.',
    render: () => (
      <div className="docs-chartmap">
        <Row label="Seven steps">
          <Steps colors={divergingColors(7)} />
        </Row>
        <Row label="Variance on ±40">
          {[-40, -12, 0, 12, 40].map((v) => (
            <Swatch key={v} hex={divergingColor(v, 40)} name={v > 0 ? `+${v}` : String(v)} />
          ))}
        </Row>
      </div>
    ),
    code: `divergingColors(7);       // Red … Neutral-3 … Green
divergingColor(-12, 40);   // 30% of the way from Neutral-3 to Red`,
  },
  {
    id: 'chrome',
    title: 'Chrome',
    description: 'Gridlines and axes stay quiet so the data carries the colour: Neutral-3 lines, Neutral-5 text in caption or footnote type. Never Neutral-9.',
    render: () => (
      <div className="docs-chartmap">
        <Row label="Gridlines">
          <Swatch hex={chartChrome.grid} name="Neutral-3" />
        </Row>
        <Row label="Axis labels, ticks, legend">
          <Swatch hex={chartChrome.text} name="Neutral-5" />
        </Row>
      </div>
    ),
    code: `chartChrome; // { grid: '#d8d8d8' (Neutral-3), text: '#5a5a5a' (Neutral-5) }`,
  },
];

export const props: DocsProp[] = [
  { name: 'categoricalColors(n)', options: '(n: number) => { color, dashed }[]', default: '—', description: 'Each series\' colour name and whether it\'s dashed (from the 8th). Spread into a chart\'s `series`.' },
  { name: 'sequentialColors(element, n)', options: "('orange' | 'salmonPink' | 'green' | 'navy' | 'amber', n) => string[]", default: '—', description: '`n` steps of the element\'s ramp, lightest first (the four ramp tokens; mixed between them past four).' },
  { name: 'divergingColor(value, extent, midpoint?)', options: '(number, number, number = 0) => string', default: 'midpoint 0', description: 'The colour for `value` on `midpoint ± extent`; past the extent, the end colour.' },
  { name: 'divergingColors(n)', options: '(n: number) => string[]', default: '—', description: '`n` even steps, Red to Green; an odd `n` keeps Neutral-3 in the middle.' },
  { name: 'chartChrome', options: '{ grid, text }', default: '—', description: 'Neutral-3 and Neutral-5, for a chart drawn outside this library.' },
];

export const rules: DocsRules = {
  do: [
    'Walk the categorical colours in order: Orange, Salmon Pink, Green, Navy, Amber, Purple, Turquoise.',
    'Take a sequential scale from the element that owns the measure.',
    'Name every series in the legend, the tooltip and the table: colour never carries meaning alone.',
  ],
  dont: [
    'Don\'t add an eighth colour: past seven, dash the line.',
    'Don\'t mix hue families in one sequential or diverging scale.',
    'Don\'t let a legend bring in a colour that isn\'t a token.',
    'Don\'t use Neutral-9 for gridlines or axes: it competes with the data.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: these are colours, not controls.',
  notes: [
    'A colour alone never identifies a series or a value: every chart names its series in the legend, the tooltip and its table view.',
    '⚠️ A sequential ramp can\'t clear 3:1 at every step (Navy is 2.41:1 against Water pastel), and past seven series the dash is the only difference between two lines. Both are the DS\'s recorded trade-offs.',
  ],
};

export const motion: DocsMotion[] = [{ interaction: 'None', motion: 'Colours don\'t animate.', token: '—' }];

// Documentation for Chart card and Chart grid (Charts, Chart.js), rendered by the docs site. Not part of the build.
import { ChartCard, ChartGrid } from './ChartCard';
import { BarChart } from '../BarChart';
import { DoughnutChart } from '../DoughnutChart';
import { LineChart } from '../LineChart';
import { MixedChart } from '../MixedChart';
import { PieChart } from '../PieChart';
import { ScatterChart } from '../ScatterChart';
import { deals, months, priorities, stages } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Chart card';

export const description =
  'The card a chart sits in, and the grid that lays several out: the library\'s Card with an h5-look title, the chart filling it. Cards in a ChartGrid row share their height, 3, 2 or 1 across.';

export const usage = `import { BarChart, ChartCard, ChartGrid } from '@collabrium/ui/charts';

<ChartGrid>
  <ChartCard title="Renewals">
    <BarChart aria-label="Renewals by month" data={months} categoryKey="month" series={[{ key: 'renewals', name: 'Renewals' }]} />
  </ChartCard>
</ChartGrid>`;

const pct = (v: number) => `${v}%`;

export const thumbnail = () => (
  <div className="docs-chart-thumb">
    <ChartCard title="Renewals">
      <BarChart aria-label="Renewals by month" data={months} categoryKey="month" series={[{ key: 'renewals', name: 'Renewals' }]} legend={false} />
    </ChartCard>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  { name: 'ChartGrid', element: '<div>.cui-chart-grid', description: '3 columns, 2 at 1100px and under, 1 at 640px and under; 16px gap; cards stretch to their row.' },
  {
    name: 'ChartCard',
    element: 'Card > .cui-chart-card',
    description: 'The library\'s Card (16px padding), its parts 8px apart.',
    children: [
      { name: 'Title', element: 'h3.cui-chart-card__title', description: 'h5 type (16/20, 700), Neutral-9, 12px above the chart.' },
      { name: 'Chart', element: 'figure.cui-chart', description: 'Any chart from this group; it grows to fill the card.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'grid',
    title: 'A grid of six',
    description: 'The DS gallery\'s six: Bar, Doughnut, Line, Scatter, Pie and Mixed. Cards in a row share their height; every chart\'s "View as table" swaps in its values.',
    render: () => (
      <ChartGrid>
        <ChartCard title="Bar chart">
          <BarChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }]} />
        </ChartCard>
        <ChartCard title="Doughnut chart">
          <DoughnutChart aria-label="Pipeline by stage" data={stages} nameKey="stage" valueKey="value" color="navy" />
        </ChartCard>
        <ChartCard title="Line chart">
          <LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate', color: 'salmonPink' }]} valueFormat={pct} />
        </ChartCard>
        <ChartCard title="Scatter chart">
          <ScatterChart aria-label="Deal size by days to close" series={[{ name: 'Deals', color: 'green', points: deals }]} xLabel="Days to close" yLabel="Deal size ($k)" />
        </ChartCard>
        <ChartCard title="Pie chart">
          <PieChart aria-label="Tickets by priority" data={priorities} nameKey="priority" valueKey="tickets" color="amber" />
        </ChartCard>
        <ChartCard title="Mixed chart (bar + line)">
          <MixedChart aria-label="Renewals and renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" bars={[{ key: 'renewals', name: 'Renewals' }]} line={{ key: 'rate', name: 'Renewal rate' }} lineFormat={pct} />
        </ChartCard>
      </ChartGrid>
    ),
    code: `<ChartGrid>
  <ChartCard title="Bar chart">
    <BarChart aria-label="Renewals by month" data={months} categoryKey="month" series={[{ key: 'renewals', name: 'Renewals' }]} />
  </ChartCard>
  <ChartCard title="Doughnut chart">
    <DoughnutChart aria-label="Pipeline by stage" data={stages} nameKey="stage" valueKey="value" color="navy" />
  </ChartCard>
  …
</ChartGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'title', options: 'string', default: '—', required: true, description: 'The card\'s title.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The title\'s level; its look is always h5.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'One chart from this group.' },
  { name: 'ChartGrid', options: 'component', default: '—', description: 'Lays ChartCards out 3 / 2 / 1 across.' },
];

export const rules: DocsRules = {
  do: ['One chart per card, titled.', 'Use ChartGrid so cards in a row share their height.'],
  dont: ['Don\'t put a Sparkline in a chart card: it belongs in StatCard.', 'Don\'t give a card a fixed height: the row and the chart\'s floor size it.'],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None of its own; the chart\'s "View as table" is a Button.',
  notes: ['The title is a heading (h3 by default); the chart inside is named by its own `aria-label`.'],
};

export const motion: DocsMotion[] = [{ interaction: 'None', motion: 'The card doesn\'t animate; its chart draws in.', token: '—' }];

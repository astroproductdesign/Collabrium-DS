// Documentation for Bar chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { BarChart } from './BarChart';
import { channels, months, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Bar chart";

export const description = "Values compared across categories as bars: vertical, or horizontal for long names and ranking. The value axis starts at zero; bars round 4px at their outer end and cap at 24px (20px lengthwise); hover darkens 15%.";

export const usage = `import { BarChart } from '@collabrium/ui/charts';

<BarChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }]} />`;

export const thumbnail = () => <BarChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }]} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("bars in series colours, 4px rounded outer end, 24px cap (20px horizontal).");

export const examples: DocsExample[] = [
  {
    id: "single",
    title: "One series",
    description: "Renewals by month, in the first series colour.",
    render: () => <BarChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }]} />,
    code: "<BarChart aria-label=\"Renewals by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'renewals', name: 'Renewals' }]} />",
  },
  {
    id: "grouped",
    title: "Two series",
    description: "Each series takes the next colour in the mapping.",
    render: () => <BarChart aria-label="Renewals and churn by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }, { key: 'churned', name: 'Churned' }]} />,
    code: "<BarChart aria-label=\"Renewals and churn by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'renewals', name: 'Renewals' }, { key: 'churned', name: 'Churned' }]} />",
  },
  {
    id: "horizontal",
    title: "Horizontal",
    description: "For ranking and long category names; 20px bars.",
    render: () => <BarChart aria-label="Spend by channel" orientation="horizontal" data={channels} categoryKey="channel" categoryLabel="Channel" series={[{ key: 'spend', name: 'Spend ($k)', color: 'navy' }]} valueFormat={v => '$' + v + 'k'} />,
    code: "<BarChart aria-label=\"Spend by channel\" orientation=\"horizontal\" data={channels} categoryKey=\"channel\" categoryLabel=\"Channel\" series={[{ key: 'spend', name: 'Spend ($k)', color: 'navy' }]} valueFormat={v => '$' + v + 'k'} />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, categoryLabel", options: "ChartDatum[], string, string", default: "\u2014", description: "One row per category; the category's key; its table heading.", required: true },
  { name: "series", options: "{ key, name, color? }[]", default: "\u2014", description: "One bar per series per category.", required: true },
  { name: "orientation", options: "'vertical' | 'horizontal'", default: "'vertical'", description: "Lengthwise for ranking and long names." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

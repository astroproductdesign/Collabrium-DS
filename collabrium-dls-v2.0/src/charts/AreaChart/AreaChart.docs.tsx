// Documentation for Area chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { AreaChart } from './AreaChart';
import { months, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Area chart";

export const description = "Cumulative volume over time: Line's marks with a wash of each line's own colour (about 12%) under it, never full strength. The value axis starts at zero.";

export const usage = `import { AreaChart } from '@collabrium/ui/charts';

<AreaChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals', color: 'green' }]} />`;

export const thumbnail = () => <AreaChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals', color: 'green' }]} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("Line's marks plus a 12% wash to the axis.");

export const examples: DocsExample[] = [
  {
    id: "single",
    title: "One area",
    description: "Renewals by month.",
    render: () => <AreaChart aria-label="Renewals by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals', color: 'green' }]} />,
    code: "<AreaChart aria-label=\"Renewals by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'renewals', name: 'Renewals', color: 'green' }]} />",
  },
  {
    id: "two",
    title: "Two areas",
    description: "Washes overlap and stay readable at 12%.",
    render: () => <AreaChart aria-label="Renewals and churn by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'renewals', name: 'Renewals' }, { key: 'churned', name: 'Churned' }]} />,
    code: "<AreaChart aria-label=\"Renewals and churn by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'renewals', name: 'Renewals' }, { key: 'churned', name: 'Churned' }]} />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, categoryLabel", options: "ChartDatum[], string, string", default: "\u2014", description: "", required: true },
  { name: "series", options: "{ key, name, color?, dashed? }[]", default: "\u2014", description: "", required: true },
  { name: "yAxisStart", options: "'zero' | 'fit'", default: "'zero'", description: "" },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

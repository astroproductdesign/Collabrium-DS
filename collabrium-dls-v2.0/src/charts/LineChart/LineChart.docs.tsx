// Documentation for Line chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { LineChart } from './LineChart';
import { months, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Line chart";

export const description = "Change over time: 2px lines with a gentle curve (0.3), 3px points ringed in white (5px on hover), no fill. The value axis fits the data unless `yAxisStart=\"zero\"`.";

export const usage = `import { LineChart } from '@collabrium/ui/charts';

<LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate', color: 'salmonPink' }]} valueFormat={v => v + '%'} />`;

export const thumbnail = () => <LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate', color: 'salmonPink' }]} valueFormat={v => v + '%'} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("2px lines, tension 0.3, 3px points with a 2px white ring.");

export const examples: DocsExample[] = [
  {
    id: "single",
    title: "One line",
    description: "Renewal rate by month.",
    render: () => <LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate', color: 'salmonPink' }]} valueFormat={v => v + '%'} />,
    code: "<LineChart aria-label=\"Renewal rate by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'rate', name: 'Renewal rate', color: 'salmonPink' }]} valueFormat={v => v + '%'} />",
  },
  {
    id: "dashed",
    title: "Against a target",
    description: "A dashed series tells the target apart by pattern, not only colour.",
    render: () => <LineChart aria-label="Renewal rate against target" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate' }, { key: 'target', name: 'Target', dashed: true }]} valueFormat={v => v + '%'} />,
    code: "<LineChart aria-label=\"Renewal rate against target\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" series={[{ key: 'rate', name: 'Renewal rate' }, { key: 'target', name: 'Target', dashed: true }]} valueFormat={v => v + '%'} />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, categoryLabel", options: "ChartDatum[], string, string", default: "\u2014", description: "", required: true },
  { name: "series", options: "{ key, name, color?, dashed? }[]", default: "\u2014", description: "One line per series.", required: true },
  { name: "yAxisStart", options: "'zero' | 'fit'", default: "'fit'", description: "Where the value axis starts." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

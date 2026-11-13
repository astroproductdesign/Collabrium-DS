// Documentation for Mixed chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { MixedChart } from './MixedChart';
import { months, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Mixed chart";

export const description = "Two related measures on different scales over time: bars with Bar's marks and a line with Line's, the line on its own right-hand axis (no second gridline).";

export const usage = `import { MixedChart } from '@collabrium/ui/charts';

<MixedChart aria-label="Renewals and renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" bars={[{ key: 'renewals', name: 'Renewals' }]} line={{ key: 'rate', name: 'Renewal rate' }} lineFormat={v => v + '%'} />`;

export const thumbnail = () => <MixedChart aria-label="Renewals and renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" bars={[{ key: 'renewals', name: 'Renewals' }]} line={{ key: 'rate', name: 'Renewal rate' }} lineFormat={v => v + '%'} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("bars and a line, each with its own chart's marks; a right axis with no gridline.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Bars and a rate",
    description: "Renewals (count) and renewal rate (%) on two axes.",
    render: () => <MixedChart aria-label="Renewals and renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" bars={[{ key: 'renewals', name: 'Renewals' }]} line={{ key: 'rate', name: 'Renewal rate' }} lineFormat={v => v + '%'} />,
    code: "<MixedChart aria-label=\"Renewals and renewal rate by month\" data={months} categoryKey=\"month\" categoryLabel=\"Month\" bars={[{ key: 'renewals', name: 'Renewals' }]} line={{ key: 'rate', name: 'Renewal rate' }} lineFormat={v => v + '%'} />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, categoryLabel", options: "ChartDatum[], string, string", default: "\u2014", description: "", required: true },
  { name: "bars", options: "{ key, name, color? }[]", default: "\u2014", description: "The bars.", required: true },
  { name: "line", options: "{ key, name, color?, dashed? }", default: "\u2014", description: "The line over them.", required: true },
  { name: "lineAxis", options: "'own' | 'shared'", default: "'own'", description: "Its own right axis, or the bars'." },
  { name: "lineFormat", options: "(value) => string", default: "valueFormat", description: "The line's values." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

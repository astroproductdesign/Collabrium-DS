// Documentation for Pie chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { PieChart } from './PieChart';
import { priorities, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Pie chart";

export const description = "Part of a whole, as a full pie: Doughnut's recipe with no hole (one hue's ramp, 2px white between slices).";

export const usage = `import { PieChart } from '@collabrium/ui/charts';

<PieChart aria-label="Tickets by priority" data={priorities} nameKey="priority" valueKey="tickets" color="amber" />`;

export const thumbnail = () => <PieChart aria-label="Tickets by priority" data={priorities} nameKey="priority" valueKey="tickets" color="amber" legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("slices on one hue's ramp, no hole.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Tickets by priority",
    description: "Low to Critical on the amber ramp.",
    render: () => <PieChart aria-label="Tickets by priority" data={priorities} nameKey="priority" valueKey="tickets" color="amber" />,
    code: "<PieChart aria-label=\"Tickets by priority\" data={priorities} nameKey=\"priority\" valueKey=\"tickets\" color=\"amber\" />",
  },
];

export const props: DocsProp[] = [
  { name: "data, nameKey, valueKey", options: "ChartDatum[], string, string", default: "\u2014", description: "", required: true },
  { name: "color", options: "RampColorName", default: "'orange'", description: "" },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

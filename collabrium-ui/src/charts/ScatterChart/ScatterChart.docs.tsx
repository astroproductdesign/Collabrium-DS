// Documentation for Scatter chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { ScatterChart } from './ScatterChart';
import { deals, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Scatter chart";

export const description = "Correlation or distribution: 6px points (8px on hover) with a 1px white ring, titled axes, no connecting line.";

export const usage = `import { ScatterChart } from '@collabrium/ui/charts';

<ScatterChart aria-label="Deal size by days to close" series={[{ name: 'Deals', color: 'green', points: deals }]} xLabel="Days to close" yLabel="Deal size ($k)" />`;

export const thumbnail = () => <ScatterChart aria-label="Deal size by days to close" series={[{ name: 'Deals', color: 'green', points: deals }]} xLabel="Days to close" yLabel="Deal size ($k)" legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("6px points with a 1px white ring; titled axes.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Deals",
    description: "Days to close against deal size.",
    render: () => <ScatterChart aria-label="Deal size by days to close" series={[{ name: 'Deals', color: 'green', points: deals }]} xLabel="Days to close" yLabel="Deal size ($k)" />,
    code: "<ScatterChart aria-label=\"Deal size by days to close\" series={[{ name: 'Deals', color: 'green', points: deals }]} xLabel=\"Days to close\" yLabel=\"Deal size ($k)\" />",
  },
];

export const props: DocsProp[] = [
  { name: "series", options: "{ name, points: { x, y, name? }[], color? }[]", default: "\u2014", description: "One set of points per series.", required: true },
  { name: "xLabel, yLabel", options: "string", default: "\u2014", description: "The axis titles.", required: true },
  { name: "xFormat, yFormat", options: "(value) => string", default: "locale number", description: "" },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

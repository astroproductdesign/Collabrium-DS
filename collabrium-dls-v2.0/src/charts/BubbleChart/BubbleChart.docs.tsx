// Documentation for Bubble chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { BubbleChart } from './BubbleChart';
import { markets, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Bubble chart";

export const description = "Three measures at once: position (x, y) and size (z, by area). Each series' colour as the edge with a 30% wash; three series at most. No table view: the DS exempts Bubble.";

export const usage = `import { BubbleChart } from '@collabrium/ui/charts';

<BubbleChart aria-label="Markets by reach, conversion and spend" series={markets} xLabel="Reach" yLabel="Conversion" sizeLabel="Spend" />`;

export const thumbnail = () => <BubbleChart aria-label="Markets by reach, conversion and spend" series={markets} xLabel="Reach" yLabel="Conversion" sizeLabel="Spend" legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("bubbles sized by area, series-colour edge, 30% wash.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Markets",
    description: "Reach against conversion, sized by spend.",
    render: () => <BubbleChart aria-label="Markets by reach, conversion and spend" series={markets} xLabel="Reach" yLabel="Conversion" sizeLabel="Spend" />,
    code: "<BubbleChart aria-label=\"Markets by reach, conversion and spend\" series={markets} xLabel=\"Reach\" yLabel=\"Conversion\" sizeLabel=\"Spend\" />",
  },
];

export const props: DocsProp[] = [
  { name: "series", options: "{ name, points: { x, y, z, name? }[], color? }[]", default: "\u2014", description: "Three at most.", required: true },
  { name: "xLabel, yLabel, sizeLabel", options: "string", default: "\u2014", description: "", required: true },
  { name: "xFormat, yFormat, sizeFormat", options: "(value) => string", default: "locale number", description: "" },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

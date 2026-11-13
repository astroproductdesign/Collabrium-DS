// Documentation for Polar area chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { PolarAreaChart } from './PolarAreaChart';
import { channels, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Polar area chart";

export const description = "Volume by category as wedges of one angle: one hue's ramp, at 75% opacity so the grid rings show through (the DS's 30% and 15% left them barely visible; Q-XCH-25); tick numbers on an opaque backdrop.";

export const usage = `import { PolarAreaChart } from '@collabrium/ui/charts';

<PolarAreaChart aria-label="Spend by channel" data={channels} nameKey="channel" valueKey="spend" color="green" valueFormat={v => '$' + v + 'k'} />`;

export const thumbnail = () => <PolarAreaChart aria-label="Spend by channel" data={channels} nameKey="channel" valueKey="spend" color="green" valueFormat={v => '$' + v + 'k'} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("translucent wedges, Neutral-3 rings, footnote ticks on a Neutral-1 backdrop.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Spend by channel",
    description: "Each wedge's length is its value.",
    render: () => <PolarAreaChart aria-label="Spend by channel" data={channels} nameKey="channel" valueKey="spend" color="green" valueFormat={v => '$' + v + 'k'} />,
    code: "<PolarAreaChart aria-label=\"Spend by channel\" data={channels} nameKey=\"channel\" valueKey=\"spend\" color=\"green\" valueFormat={v => '$' + v + 'k'} />",
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

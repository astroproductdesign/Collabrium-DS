// Documentation for Doughnut chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { DoughnutChart } from './DoughnutChart';
import { stages, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Doughnut chart";

export const description = "Part of a whole, as a ring: one hue, one rung of its ramp per slice (lightest first), 2px white between slices. Five slices at most.";

export const usage = `import { DoughnutChart } from '@collabrium/ui/charts';

<DoughnutChart aria-label="Pipeline by stage" data={stages} nameKey="stage" valueKey="value" color="navy" />`;

export const thumbnail = () => <DoughnutChart aria-label="Pipeline by stage" data={stages} nameKey="stage" valueKey="value" color="navy" legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("slices on one hue's ramp, 2px Neutral-1 borders.");

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Pipeline by stage",
    description: "An ordered set reads as a progression, lightest to darkest.",
    render: () => <DoughnutChart aria-label="Pipeline by stage" data={stages} nameKey="stage" valueKey="value" color="navy" />,
    code: "<DoughnutChart aria-label=\"Pipeline by stage\" data={stages} nameKey=\"stage\" valueKey=\"value\" color=\"navy\" />",
  },
  {
    id: "amber",
    title: "Another hue",
    description: "`color` is the hue of the element that owns the measure.",
    render: () => <DoughnutChart aria-label="Pipeline by stage, amber" data={stages} nameKey="stage" valueKey="value" color="amber" />,
    code: "<DoughnutChart aria-label=\"Pipeline by stage, amber\" data={stages} nameKey=\"stage\" valueKey=\"value\" color=\"amber\" />",
  },
];

export const props: DocsProp[] = [
  { name: "data, nameKey, valueKey", options: "ChartDatum[], string, string", default: "\u2014", description: "One row per slice.", required: true },
  { name: "color", options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: "The ramp's hue." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

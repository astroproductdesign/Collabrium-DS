// Documentation for Radar chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { RadarChart } from './RadarChart';
import { skills, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Radar chart";

export const description = "Performance across up to six dimensions: 2px outlines with a 12% wash and 3px ringed points, on a fixed 0\u201310 scale (not auto-scaled).";

export const usage = `import { RadarChart } from '@collabrium/ui/charts';

<RadarChart aria-label="Creator ratings" data={skills} categoryKey="skill" axisLabel="Measure" series={[{ key: 'a', name: 'Creator A' }, { key: 'b', name: 'Creator B' }]} />`;

export const thumbnail = () => <RadarChart aria-label="Creator ratings" data={skills} categoryKey="skill" axisLabel="Measure" series={[{ key: 'a', name: 'Creator A' }, { key: 'b', name: 'Creator B' }]} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("2px outlines, 12% wash, Neutral-3 rings and spokes.");

export const examples: DocsExample[] = [
  {
    id: "two",
    title: "Two creators compared",
    description: "Two series on the 0\u201310 rating scale.",
    render: () => <RadarChart aria-label="Creator ratings" data={skills} categoryKey="skill" axisLabel="Measure" series={[{ key: 'a', name: 'Creator A' }, { key: 'b', name: 'Creator B' }]} />,
    code: "<RadarChart aria-label=\"Creator ratings\" data={skills} categoryKey=\"skill\" axisLabel=\"Measure\" series={[{ key: 'a', name: 'Creator A' }, { key: 'b', name: 'Creator B' }]} />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, axisLabel", options: "ChartDatum[], string, string", default: "\u2014, \u2014, 'Axis'", description: "One row per axis, six at most.", required: true },
  { name: "series", options: "{ key, name, color? }[]", default: "\u2014", description: "", required: true },
  { name: "max", options: "number", default: "10", description: "The scale's top." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

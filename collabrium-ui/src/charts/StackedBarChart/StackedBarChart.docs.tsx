// Documentation for Stacked bar chart (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { StackedBarChart } from './StackedBarChart';
import { quarters, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Stacked bar chart";

export const description = "Parts within a total, compared across categories. Only the outer end of each stack is rounded; with `totalKey`, what the parts don't cover is drawn in Neutral-3 so the stack sums to its total. Parts of one measure take one hue's ramp.";

export const usage = `import { StackedBarChart } from '@collabrium/ui/charts';

<StackedBarChart aria-label="Spend by channel per quarter" data={quarters} categoryKey="quarter" categoryLabel="Quarter" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }, { key: 'video', name: 'Video' }]} />`;

export const thumbnail = () => <StackedBarChart aria-label="Spend by channel per quarter" data={quarters} categoryKey="quarter" categoryLabel="Quarter" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }, { key: 'video', name: 'Video' }]} legend={false} />;

export const anatomy: DocsAnatomyNode[] = sharedAnatomy("segments stacked, the stack's outer end rounded 4px, the joins square.");

export const examples: DocsExample[] = [
  {
    id: "categories",
    title: "Categories",
    description: "Different channels walk the series colours.",
    render: () => <StackedBarChart aria-label="Spend by channel per quarter" data={quarters} categoryKey="quarter" categoryLabel="Quarter" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }, { key: 'video', name: 'Video' }]} />,
    code: "<StackedBarChart aria-label=\"Spend by channel per quarter\" data={quarters} categoryKey=\"quarter\" categoryLabel=\"Quarter\" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }, { key: 'video', name: 'Video' }]} />",
  },
  {
    id: "total",
    title: "To a total, on a ramp",
    description: "`totalKey` adds the remainder in Neutral-3; `ramp` uses one hue for parts of one measure.",
    render: () => <StackedBarChart aria-label="Budget used per quarter" orientation="horizontal" data={quarters} categoryKey="quarter" categoryLabel="Quarter" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }]} totalKey="total" ramp="navy" />,
    code: "<StackedBarChart aria-label=\"Budget used per quarter\" orientation=\"horizontal\" data={quarters} categoryKey=\"quarter\" categoryLabel=\"Quarter\" series={[{ key: 'search', name: 'Search' }, { key: 'social', name: 'Social' }]} totalKey=\"total\" ramp=\"navy\" />",
  },
];

export const props: DocsProp[] = [
  { name: "data, categoryKey, categoryLabel", options: "ChartDatum[], string, string", default: "\u2014", description: "One row per category.", required: true },
  { name: "series", options: "{ key, name, color? }[]", default: "\u2014", description: "The segments, first at the base.", required: true },
  { name: "orientation", options: "'vertical' | 'horizontal'", default: "'vertical'", description: "" },
  { name: "totalKey, remainderName", options: "string, string", default: "\u2014, 'Remaining'", description: "The labelled total; the remainder's name." },
  { name: "ramp", options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "\u2014", description: "One hue's ramp for parts of one measure." },
  ...sharedProps,
];

export const rules: DocsRules = sharedRules;

export const accessibility: DocsAccessibility = sharedAccessibility;

export const motion: DocsMotion[] = sharedMotion;

// Documentation for Sparkline (Charts, Chart.js), rendered by the docs site. Not part of the package build.
import { SparklineChart } from './SparklineChart';
import { sharedRules } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Sparkline";

export const description = "A glance, not an instrument: a 2px line with no axes, gridlines, legend, tooltip or table. It lives in StatCard's sparkline slot, never a chart card, in the colour of the element that owns the metric.";

export const usage = `import { SparklineChart } from '@collabrium/ui/charts';

<SparklineChart aria-label="Spend, last 8 weeks" values={[12, 14, 13, 15, 14, 16, 17, 18]} color="navy" />`;

export const thumbnail = () => <div className="docs-spark"><SparklineChart aria-label="Spend, last 8 weeks" values={[12, 14, 13, 15, 14, 16, 17, 18]} color="navy" /></div>;

export const anatomy: DocsAnatomyNode[] = [{ name: 'Sparkline', element: 'span.cui-chart-spark > canvas', description: 'Fills its box (StatCard\'s slot): a 2px line, tension 0.3; optionally a ≤12% wash and a 3px end point. No axes, legend, tooltip or table.' }];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Plain",
    description: "The shape of a trend.",
    render: () => <div className="docs-spark"><SparklineChart aria-label="Spend, last 8 weeks" values={[12, 14, 13, 15, 14, 16, 17, 18]} color="navy" /></div>,
    code: "<SparklineChart aria-label=\"Spend, last 8 weeks\" values={[12, 14, 13, 15, 14, 16, 17, 18]} color=\"navy\" />",
  },
  {
    id: "fill",
    title: "With a wash and end point",
    description: "`fill` adds the \u226412% wash; `endPoint` marks the latest value.",
    render: () => <div className="docs-spark"><SparklineChart aria-label="Signups, last 8 weeks" values={[5, 7, 6, 9, 8, 11, 10, 13]} color="green" fill endPoint /></div>,
    code: "<SparklineChart aria-label=\"Signups, last 8 weeks\" values={[5, 7, 6, 9, 8, 11, 10, 13]} color=\"green\" fill endPoint />",
  },
];

export const props: DocsProp[] = [
  { name: "values", options: "number[]", default: "\u2014", description: "Oldest first.", required: true },
  { name: "color", options: "SeriesColorName", default: "'orange'", description: "" },
  { name: "fill, endPoint", options: "boolean", default: "false", description: "" },
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the trend; the first and last values are added for assistive technology.' },
];

export const rules: DocsRules = { do: ['Put it in StatCard\'s sparkline slot, beside the number it explains.', 'Use the colour of the element that owns the metric.'], dont: ['Don\'t put it in a chart card, or give it axes, a legend or a table.'] };

export const accessibility: DocsAccessibility = { keyboard: 'None: it is a picture.', notes: ['An image named by `aria-label`, with the first and last values added.'] };

export const motion: DocsMotion[] = [{ interaction: 'Appears', motion: 'The line draws in.', token: '--duration-reveal' }, { interaction: 'Reduced motion', motion: 'No drawing in.', token: '—' }];

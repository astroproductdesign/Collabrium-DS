// Overview of the Charts (extra) group, rendered by the docs site (playground).
// The parts are the charts under src/charts-extra, built on Recharts. The
// primary chart set is Chart.js ('@collabrium/ui/charts', documented in
// "Charts"); this group is for the shapes it cannot draw.
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Charts (extra)';

export const description =
  'A second chart set, built on Recharts, for shapes Chart.js cannot draw. It uses the same tokens and the same colour mapping, and it is imported separately.';

export const overview: GroupOverviewDocs['overview'] = [
  'Chart.js stays the first choice for charts. Reach for Charts (extra) when the shape you need is not one Chart.js draws well: gauges, radial bars, funnels, waterfalls, treemaps, sankey flows and similar.',
  'The two sets are separate on purpose. Charts (extra) is imported from `@collabrium/ui/charts-extra` and needs `recharts`; the Chart.js set is imported from `@collabrium/ui/charts` and needs `chart.js`. Neither imports the other, so an app that uses one never loads the other.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Start with Chart.js', description: 'Line, bar, doughnut, pie, scatter and radar charts belong in `Charts`. Use them whenever they show the data well.' },
  { title: 'Move here when the shape is missing', description: 'If Chart.js cannot draw the shape, pick the matching chart in this group. Do not bend a Chart.js chart to imitate it.' },
  { title: 'Install the extra engine', description: 'Add `recharts` to the app. It is an optional peer dependency, so it is only needed when a chart from this group is used.' },
  { title: 'Never mix engines in one chart', description: 'A chart is drawn entirely by one engine. Two charts of different engines may sit side by side in a view, and they look the same because both read the DLS tokens.' },
];

export const rulesIntro = 'Every chart in this group follows the DLS chart rules, whichever engine draws it.';

export const rules: GroupOverviewDocs['rules'] = [
  'Series colours follow the Chart color mapping: Orange, Salmon Pink, Green, Navy, Amber, then Purple and Turquoise. Past seven series, use dash and marker patterns rather than new colours.',
  'Colour is never the only carrier of meaning. Every chart has a text summary of its data for people using assistive technology.',
  'Type is the primary font only, at the chart text sizes the tokens define.',
  'Reduced motion drops the travel and keeps the information: values appear without the draw-in animation.',
  'Forced-colours mode keeps marks and axes visible, using system colours.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [];

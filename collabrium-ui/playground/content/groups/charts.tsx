// Overview of the Charts group, rendered by the docs site (playground). The parts are the Chart.js charts under
// src/charts ('@collabrium/ui/charts'), the primary chart set; Charts (extra) holds the shapes Chart.js can't draw.
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Charts';

export const description =
  'The primary chart set, drawn by Chart.js: bar, stacked bar, line, area, mixed, doughnut, pie, polar area, radar, scatter, bubble and sparkline, each with the DLS chrome, marks and colour mapping, and a "View as table" alternative.';

export const overview: GroupOverviewDocs['overview'] = [
  'Every chart here is a component that takes data, not a Chart.js configuration: the chrome (axes, gridline, tooltip, legend), the marks and the colours come from the DLS, through `setupCharts()`, which each chart runs for you.',
  'Put each chart in a Chart card, and lay cards out with Chart grid. Each chart fills its card (a 260px floor, 300px tall) and carries its own "View as table", which swaps in the same values without moving the page.',
  'Import from `@collabrium/ui/charts`, which needs `chart.js`. For gauges, funnels, waterfalls, treemaps, sankeys and other shapes Chart.js doesn\'t draw, use Charts (extra).',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Pick by what the data says', description: 'Compare categories: Bar. Parts of a total: Stacked bar. Change over time: Line; cumulative volume: Area; two scales: Mixed. Part of a whole: Doughnut or Pie. Volume by category: Polar area. Across dimensions: Radar. Correlation: Scatter; three variables: Bubble. A trend beside a number: Sparkline.' },
  { title: 'Pass the data', description: 'Rows and the keys to read (`data`, `categoryKey`, `series`), plus an `aria-label` saying what the chart shows.' },
  { title: 'Put it in a card', description: 'A Chart card titles it; a Chart grid lines several up, 3, 2 or 1 across.' },
  { title: 'Let the table speak', description: 'Every chart but Bubble and Sparkline offers "View as table" with the same values.' },
];

export const rulesIntro = 'Every chart in this group follows the DLS chart rules.';

export const rules: GroupOverviewDocs['rules'] = [
  'Series colours follow the Chart color mapping: Orange, Salmon Pink, Green, Navy, Amber, then Purple and Turquoise. Parts of one measure take one hue\'s ramp.',
  'No axis borders; the value axis carries the only gridline (Neutral-3); ticks are footnote type in Neutral-5.',
  'Fills never pass about 12%; at most 5 doughnut slices, 6 radar axes, 3 bubble series.',
  'Colour never carries meaning alone: the legend, the tooltip and the table name every series.',
  'Reduced motion drops the draw-in; the values are all still there.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [];

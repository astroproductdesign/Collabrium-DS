// Shared sample data and doc sections for the Chart.js chart pages. Docs only; not part of the package build.
import type { DocsAccessibility, DocsAnatomyNode, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const months = [
  { month: 'Mar', renewals: 8, churned: 3, rate: 72, target: 70 },
  { month: 'Apr', renewals: 12, churned: 4, rate: 75, target: 72 },
  { month: 'May', renewals: 9, churned: 2, rate: 78, target: 74 },
  { month: 'Jun', renewals: 15, churned: 5, rate: 74, target: 76 },
  { month: 'Jul', renewals: 11, churned: 3, rate: 81, target: 78 },
  { month: 'Aug', renewals: 18, churned: 4, rate: 85, target: 80 },
];
export const channels = [
  { channel: 'Search', spend: 42 },
  { channel: 'Social', spend: 31 },
  { channel: 'Video', spend: 24 },
  { channel: 'Display', spend: 17 },
  { channel: 'Audio', spend: 9 },
];
export const stages = [
  { stage: 'Discovery', value: 32 },
  { stage: 'Proposal', value: 24 },
  { stage: 'Negotiation', value: 18 },
  { stage: 'Closed', value: 26 },
];
export const priorities = [
  { priority: 'Low', tickets: 46 },
  { priority: 'Medium', tickets: 28 },
  { priority: 'High', tickets: 15 },
  { priority: 'Critical', tickets: 7 },
];
export const quarters = [
  { quarter: 'Q1', search: 40, social: 25, video: 15, total: 100 },
  { quarter: 'Q2', search: 45, social: 30, video: 20, total: 110 },
  { quarter: 'Q3', search: 38, social: 34, video: 26, total: 105 },
  { quarter: 'Q4', search: 50, social: 28, video: 30, total: 120 },
];
export const skills = [
  { skill: 'Reach', a: 8, b: 6 },
  { skill: 'Engagement', a: 6, b: 8 },
  { skill: 'Brand fit', a: 9, b: 5 },
  { skill: 'Cost', a: 5, b: 7 },
  { skill: 'Reliability', a: 7, b: 9 },
  { skill: 'Speed', a: 6, b: 6 },
];
export const deals = [
  { x: 12, y: 8 }, { x: 18, y: 14 }, { x: 9, y: 6 }, { x: 24, y: 22 }, { x: 15, y: 11 }, { x: 30, y: 28 },
  { x: 21, y: 17 }, { x: 7, y: 5 }, { x: 27, y: 19 }, { x: 19, y: 13 }, { x: 33, y: 31 }, { x: 14, y: 9 },
];
export const markets = [
  { name: 'Direct', points: [{ x: 12, y: 30, z: 40, name: 'Telco' }, { x: 20, y: 45, z: 90, name: 'Banking' }, { x: 28, y: 25, z: 30, name: 'Retail' }] },
  { name: 'Agency', points: [{ x: 15, y: 20, z: 60, name: 'Auto' }, { x: 25, y: 38, z: 20, name: 'FMCG' }, { x: 32, y: 50, z: 70, name: 'Travel' }] },
];

export const sharedAnatomy = (marks: string): DocsAnatomyNode[] => [
  {
    name: 'Chart',
    element: '<figure>.cui-chart',
    description: 'A group named by `aria-label`. Fills its container: a 260px floor, 300px `tall`.',
    children: [
      { name: 'Canvas', element: '.cui-chart__canvas > canvas', description: `Drawn by Chart.js with the DLS chrome from setupCharts(): ${marks}` },
      { name: 'Legend', element: '(on the canvas)', when: 'legend', description: 'Bottom, left-aligned, caption type, Neutral-5, 12px circles; click an item to hide a series.' },
      { name: 'Table', element: '.cui-chart__table', when: 'table view', description: 'The same values in an embedded Table, at the plot\'s height; rows past it scroll inside, so the card never grows.' },
      { name: 'Toggle', element: 'Button (secondary, sm)', description: '"View as table" / "View as chart", 12px below.' },
    ],
  },
];

export const sharedProps: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart: what it shows ("Renewals by month"), not that it is a chart.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the tooltip and the table (and the axis, when given; otherwise the axis shortens: 500k, 1.2M).' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'The plot\'s floor: 260px or 300px; it grows to fill a taller container.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend under the chart.' },
];

export const sharedRules: DocsRules = {
  do: [
    'Pick the chart by what the data says (Chart type selection).',
    'Put it in a ChartCard; lay several out with ChartGrid.',
    'Let series take the Chart color mapping order; one hue\'s ramp for parts of one measure.',
  ],
  dont: [
    'Don\'t restyle the chrome: every chart shares setupCharts()\'s axes, tooltip and legend.',
    'Don\'t fill above about 12%, or pass 5 doughnut slices, 6 radar axes or 3 bubble series.',
  ],
};

export const sharedAccessibility: DocsAccessibility = {
  keyboard: [{ keys: 'Tab, Enter / Space', action: '"View as table" switches between the chart and its values.' }],
  notes: [
    'The chart is a figure named by `aria-label`; its canvas is an image pointing at the table view, which carries every value.',
    'Colour never carries meaning alone: the legend, the tooltip and the table name every series.',
  ],
};

export const sharedMotion: DocsMotion[] = [
  { interaction: 'Chart appears', motion: 'Marks draw in.', token: '--duration-reveal · easeOutQuart' },
  { interaction: 'Hover', motion: 'The mark and tooltip respond.', token: '--duration-fast' },
  { interaction: 'Reduced motion', motion: 'No drawing in.', token: '—' },
];

// Pieces the Charts (extra) docs files share: sample data and the sections
// that read the same for every cartesian chart. Docs site only: not shipped.
import type { DocsAccessibility, DocsAnatomyNode, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const months = [
  { month: 'Mar', rate: 72, target: 75 },
  { month: 'Apr', rate: 75, target: 75 },
  { month: 'May', rate: 78, target: 78 },
  { month: 'Jun', rate: 74, target: 78 },
  { month: 'Jul', rate: 81, target: 80 },
  { month: 'Aug', rate: 85, target: 80 },
];

export const hours = [
  { hour: '00:00', volume: 8 },
  { hour: '04:00', volume: 11 },
  { hour: '08:00', volume: 17 },
  { hour: '12:00', volume: 20 },
  { hour: '16:00', volume: 18 },
  { hour: '20:00', volume: 15 },
];

export const flows = [
  { hour: '00h', inflow: 28, outflow: 18 },
  { hour: '04h', inflow: 42, outflow: 24 },
  { hour: '08h', inflow: 58, outflow: 36 },
  { hour: '12h', inflow: 84, outflow: 48 },
  { hour: '16h', inflow: 76, outflow: 52 },
  { hour: '20h', inflow: 64, outflow: 38 },
];

export const tiers = [
  { tier: 'Free', price: 0 },
  { tier: 'Starter', price: 12 },
  { tier: 'Team', price: 25 },
  { tier: 'Business', price: 42 },
  { tier: 'Enterprise', price: 68 },
];

export const spread = [
  { day: 'Mon', low: 0.12, high: 0.28 },
  { day: 'Tue', low: 0.15, high: 0.35 },
  { day: 'Wed', low: 0.14, high: 0.3 },
  { day: 'Thu', low: 0.18, high: 0.42 },
  { day: 'Fri', low: 0.16, high: 0.38 },
  { day: 'Sat', low: 0.11, high: 0.25 },
  { day: 'Sun', low: 0.13, high: 0.29 },
];

/** Anatomy of every chart in the set. */
export const sharedAnatomy = (mark: string): DocsAnatomyNode[] => [
  {
    name: 'Chart',
    element: '<figure>.cui-chartx',
    description: 'The frame. A group named by `aria-label`. It has no card of its own: put it in a Card.',
    children: [
      {
        name: 'Plot',
        element: '.cui-chartx__plot',
        description: 'The Recharts chart: no axis borders, one Neutral-3 gridline set on the value axis, footnote tick labels in Neutral-5.',
        children: [{ name: 'Marks', description: mark }],
      },
      { name: 'Tooltip', element: '.cui-chartx__tooltip', description: 'Neutral-1 surface with a 1px Neutral-3 border. The category is the title (label2, Neutral-9); each series is a line below (label3, Neutral-5).' },
      { name: 'Legend', element: '.cui-chartx__legend', when: 'legend is on', description: 'A left-aligned row under the plot: a 10px circle and a caption label per series. Each item is a button that shows or hides its series.' },
      { name: 'Table', element: '.cui-chartx__table', description: 'The same data as a real table, shown in place of the plot by the View as table button.' },
      { name: 'View as table button', element: 'Button secondary sm', description: 'Swaps the plot for the table and back. The label says which one it will show.' },
    ],
  },
];

export const sharedProps: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart, e.g. "Renewal rate by month". Say what it shows, not that it is a chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per category.' },
  { name: 'categoryKey', options: 'string', default: '—', required: true, description: 'The key of the category in each row, drawn along the horizontal axis.' },
  { name: 'categoryLabel', options: 'string', default: "'Category'", description: 'The heading of the category column in the table view.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats a value for the axis, the tooltip and the table, e.g. `v => v + "%"`.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px for `tall`. The chart grows to fill a taller container.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend under the plot.' },
];

export const sharedAccessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the chart, then through the legend items, then to the View as table button.' },
    { keys: 'Arrow Left / Right', action: 'With the chart focused, moves between categories and shows the tooltip for each.' },
    { keys: 'Enter / Space', action: 'On a legend item, shows or hides its series. On View as table, swaps the plot and the table.' },
  ],
  notes: [
    'The chart is a group named by `aria-label`. Its table view carries every value, so nobody depends on the picture, on colour, or on hovering.',
    'A series is never told apart by colour alone: the legend names it, the tooltip names it, and the table has a column for it. Use `dashed` as well when colour is not enough.',
    'Legend items are real buttons with `aria-pressed`; a hidden series is struck through.',
    'Forced-colours mode: the legend swatches and the tooltip border use system colours; the marks keep their own colours.',
  ],
};

export const sharedMotion: DocsMotion[] = [
  {
    interaction: 'The chart first appears',
    motion: 'The marks draw in. Under reduced motion the finished chart appears at once.',
    token: '--duration-slow (placeholder: the DLS names no chart animation)',
  },
];

export const sharedRules = (): DocsRules => ({
  do: [
    'Use Chart.js (`@collabrium/ui/charts`) first, and this set when Chart.js cannot draw the shape.',
    'Give every chart an `aria-label` that says what it shows.',
    'Put the chart in a Card, and give the card the title.',
    'Keep to the seven series colours in order; tell series apart with `dashed` past that.',
  ],
  dont: [
    "Don't fill an area above a 12% wash; it is built in, not a prop.",
    "Don't put the chart's title inside it: the card's heading names it.",
    "Don't rely on colour alone for meaning: name each series.",
    "Don't mix this set and Chart.js in one chart.",
  ],
});

export const orders = [
  { day: 'Mon', web: 412, mobile: 125 },
  { day: 'Tue', web: 478, mobile: 142 },
  { day: 'Wed', web: 442, mobile: 131 },
  { day: 'Thu', web: 519, mobile: 158 },
  { day: 'Fri', web: 498, mobile: 150 },
  { day: 'Sat', web: 424, mobile: 121 },
];

export const quarters = [
  { quarter: 'Q1', newBiz: 32, renewals: 21, expansion: 14, goal: 80 },
  { quarter: 'Q2', newBiz: 48, renewals: 29, expansion: 18, goal: 100 },
  { quarter: 'Q3', newBiz: 64, renewals: 38, expansion: 22, goal: 130 },
  { quarter: 'Q4', newBiz: 56, renewals: 34, expansion: 20, goal: 110 },
];

export const bridge = [
  { step: 'Opening', change: 120 },
  { step: 'Yield', change: 45 },
  { step: 'Infra', change: -18 },
  { step: 'Grants', change: -12 },
  { step: 'Closing', change: 135 },
];

export const levels = [
  { label: 'Page load', actual: 380, target: 400, unit: 'ms' },
  { label: 'Uptime', actual: 99.6, target: 99.9, unit: '%' },
  { label: 'Support replies', actual: 4850, target: 4500, unit: 'per week' },
];

export const stages = [
  { stage: 'Visited', users: 1000 },
  { stage: 'Signed up', users: 680 },
  { stage: 'Created a project', users: 440 },
  { stage: 'Invited a teammate', users: 260 },
];

/** The sections the bar family shares. */
export const barAccessibility: typeof sharedAccessibility = {
  ...sharedAccessibility,
  keyboard: [
    { keys: 'Tab', action: 'Moves to the chart, then through the legend items, then to the View as table button.' },
    { keys: 'Arrow keys', action: 'With the chart focused, moves between bars and shows the tooltip for each.' },
    { keys: 'Enter / Space', action: 'On a legend item, shows or hides its series. On View as table, swaps the plot and the table.' },
  ],
};

export const pipeline = [
  { stage: 'Discovery', value: 32 },
  { stage: 'Proposal', value: 24 },
  { stage: 'Negotiation', value: 18 },
  { stage: 'Closed', value: 26 },
];

export const resources = [
  { label: 'Compute', value: 28, max: 32, detail: '28 of 32 cores' },
  { label: 'Memory', value: 92, max: 128, detail: '92 of 128 GB' },
  { label: 'Bandwidth', value: 3.4, max: 6, detail: '3.4 of 6.0 GB/s' },
  { label: 'Network', value: 4.2, max: 10, detail: '4.2 of 10 Gbps' },
];

/** What the round charts read for keyboard and screen-reader users. */
export const polarAccessibility: typeof sharedAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the chart, then through the legend items (where there is one), then to the View as table button.' },
    { keys: 'Arrow keys', action: 'With the chart focused, moves between slices or rings and shows the tooltip for each.' },
    { keys: 'Enter / Space', action: 'On a legend item, shows or hides it. On View as table, swaps the plot and the table.' },
  ],
  notes: [
    'The chart is a group named by `aria-label`. Its table view carries every value, so nobody depends on the picture, on colour, or on hovering.',
    'Nothing is told apart by colour alone: the legend, the tooltip and the table name each slice or ring.',
    'The centre reading is part of the picture: the same number is in the table.',
  ],
};

export const deals = [
  { x: 12, y: 8 }, { x: 18, y: 14 }, { x: 9, y: 6 }, { x: 24, y: 22 }, { x: 15, y: 11 },
  { x: 30, y: 28 }, { x: 21, y: 17 }, { x: 7, y: 5 }, { x: 27, y: 19 }, { x: 19, y: 13 },
  { x: 33, y: 31 }, { x: 14, y: 9 },
];

export const pools = [
  { x: 180, y: 18.5, z: 750, name: 'SOL / USDC' },
  { x: 95, y: 14.2, z: 480, name: 'SOL / USDT' },
  { x: 64, y: 24.8, z: 360, name: 'JUP / SOL' },
  { x: 38, y: 32.4, z: 280, name: 'BONK / SOL' },
];

export const loadColumns = ['00h', '04h', '08h', '12h', '16h', '20h', '24h'].map(label => ({ key: 'h' + label.slice(0, 2), label }));
export const load = [
  { day: 'Mon', h00: 14, h04: 38, h08: 72, h12: 54, h16: 88, h20: 32, h24: 58 },
  { day: 'Tue', h00: 28, h04: 56, h08: 84, h12: 68, h16: 42, h20: 76, h24: 24 },
  { day: 'Wed', h00: 48, h04: 68, h08: 34, h12: 78, h16: 62, h20: 92, h24: 44 },
  { day: 'Thu', h00: 22, h04: 76, h08: 58, h12: 44, h16: 94, h20: 52, h24: 68 },
  { day: 'Fri', h00: 58, h04: 88, h08: 66, h12: 84, h16: 48, h20: 36, h24: 74 },
];

export const partitions = [
  { name: 'Accounts', size: 1210 },
  { name: 'Snapshots', size: 720 },
  { name: 'Index cache', size: 360 },
  { name: 'Mempool', size: 250 },
];

/** 20 weeks of daily counts from Monday 4 May 2026, from a fixed seed so the page renders the same every time. */
export const activity = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const start = Date.UTC(2026, 4, 4);
  return Array.from({ length: 140 }, (_, i) => {
    const r = rand();
    return { date: new Date(start + i * 86_400_000).toISOString().slice(0, 10), count: r > 0.35 ? Math.floor(rand() * 14) + 1 : 0 };
  });
})();

/** The sections for charts drawn in HTML, with no keyboard interaction of their own. */
export const gridAccessibility: typeof sharedAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the View as table button. The cells are not interactive.' },
    { keys: 'Enter / Space', action: 'On View as table, swaps the chart and the table.' },
  ],
  notes: [
    'The chart is a group named by `aria-label`. The picture has no text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.',
    'The hover tooltip is for the pointer: the cells are not focusable, because the table is the keyboard and screen-reader route to every value.',
    'Value is never carried by colour alone: hover gives the figure, and the table has every figure.',
    'Forced-colours mode keeps each cell its own colour.',
  ],
};

export const skills = [
  { axis: 'Finality', team: 9.5, peer: 7.5 },
  { axis: 'Uptime', team: 9.9, peer: 8.8 },
  { axis: 'Peer quality', team: 8.8, peer: 7 },
  { axis: 'Verification', team: 9.2, peer: 8 },
  { axis: 'Stake weight', team: 8.6, peer: 6.8 },
];

export const regions = [
  { region: 'US East', requests: 1420 },
  { region: 'EU Central', requests: 980 },
  { region: 'AP South', requests: 640 },
  { region: 'SA East', requests: 310 },
];

export const pipelineLevels = [
  { level: 'Finalised', count: 18400 },
  { level: 'Consensus', count: 44200 },
  { level: 'Verification', count: 72600 },
  { level: 'Inbound', count: 104200 },
];

export const routes = [
  { source: 'Mempool', target: 'Leader slot', value: 48500 },
  { source: 'Direct RPC', target: 'Leader slot', value: 35700 },
  { source: 'Leader slot', target: 'Confirmed', value: 82800 },
  { source: 'Leader slot', target: 'Dropped', value: 1400 },
];

export const candles = [
  { time: '11:00', open: 168.0, high: 171.2, low: 167.5, close: 170.8 },
  { time: '12:00', open: 170.8, high: 173.5, low: 169.8, close: 172.5 },
  { time: '13:00', open: 172.5, high: 175.0, low: 171.9, close: 171.4 },
  { time: '14:00', open: 171.4, high: 177.8, low: 170.8, close: 177.2 },
  { time: '15:00', open: 177.2, high: 180.2, low: 176.0, close: 174.9 },
  { time: '16:00', open: 174.9, high: 179.0, low: 174.0, close: 178.4 },
];

export const episodes = [
  { episode: 'Ep. 420', rewards: 184, apy: 7.2 },
  { episode: 'Ep. 421', rewards: 210, apy: 7.5 },
  { episode: 'Ep. 422', rewards: 242, apy: 7.8 },
  { episode: 'Ep. 423', rewards: 206, apy: 7.6 },
  { episode: 'Ep. 424', rewards: 275, apy: 8.1 },
  { episode: 'Ep. 425', rewards: 298, apy: 8.4 },
];

export const readings = [38, 41, 39, 44, 42.4];
export const iops = [28, 34, 42, 49, 48.2];

// Mono chart catalog metadata (ids, titles, descriptions). Mirrors CARD_ITEMS in
// MonoChartsPage.tsx; used for routing metadata, SEO and the sitemap.
export interface MonoChartMeta {
  id: string;
  title: string;
  description: string;
}

export const monoChartsMeta: MonoChartMeta[] = [
  { id: 'mono-activity-green', title: "Emerald Activity Heatmap", description: "Ultra-clean emerald green contribution heatmap grid with 20-week activity telemetry." },
  { id: 'mono-activity-blue', title: "Sky Blue Activity Heatmap", description: "Vibrant sky blue contribution activity matrix with cell tooltips and minimalist month headers." },
  { id: 'mono-activity-purple', title: "Violet Activity Heatmap", description: "Deep violet pulse contribution activity grid with rounded node cells and telemetry." },
  { id: 'mono-rounded-line', title: "Mono Rounded Spline Line", description: "Minimalist monochromatic line chart with smooth rounded spline curves and rounded stroke caps." },
  { id: 'mono-rounded-bar', title: "Mono Rounded Pill Pillars", description: "Minimalist monochromatic bar chart with full corner radii pill columns and vertical/horizontal layout switches." },
  { id: 'mono-rounded-area', title: "Mono Curved Wave Area", description: "Smooth monochromatic curved area wave visualizer with rounded stroke joins and soft opacity gradient shading." },
  { id: 'mono-rounded-donut', title: "Mono Rounded Donut Ring", description: "Minimalist monochromatic donut chart with rounded segment endcaps, generous spacing, and center metric numbers." },
  { id: 'mono-rounded-composed', title: "Mono Hybrid Spline + Bar", description: "Minimalist hybrid visualizer pairing rounded pill columns with a smooth curved spline line overlay." },
  { id: 'mono-rounded-scatter', title: "Mono Scatter Matrix", description: "Minimalist monochromatic scatter node matrix with rounded circle nodes and hover trace callouts." },
  { id: 'mono-rounded-candlestick', title: "Mono Financial Candlesticks", description: "Monochromatic candlestick financial price bars with rounded wick caps and solid/hollow candles." },
  { id: 'mono-rounded-kpi', title: "Mono Stat KPI Card", description: "Minimalist KPI stat metric card featuring an embedded rounded spline sparkline indicator." },
  { id: 'mono-rounded-pyramid', title: "Mono Tier Pyramid Stack", description: "Monochromatic pyramid level bar chart featuring rounded corner tier geometry." },
  { id: 'mono-rounded-radial-group', title: "Mono Radial Bar Group", description: "Multi-ring radial progress bar group with rounded arc endcaps and layered utilization metrics." },
  { id: 'mono-rounded-gauge-arc', title: "Mono Speedometer Gauge Arc", description: "Semi-circle arc speedometer gauge dial with rounded stroke endcaps and center score callout." },
  { id: 'mono-rounded-bullet', title: "Mono Performance Bullet Target", description: "Monochromatic performance bullet bar chart featuring target benchmark markers." },
  { id: 'mono-rounded-sankey', title: "Mono Flow Sankey Channels", description: "Flow transfer channel visualizer featuring smooth curved SVG routing bands with rounded endcaps." },
  { id: 'mono-rounded-step', title: "Mono Step Progression", description: "Monochromatic discrete staircase step chart with rounded stroke joins and level callouts." },
  { id: 'mono-rounded-stacked-bar', title: "Mono Stacked Tones Bar", description: "Monochromatic stacked bar visualizer with rounded end pill geometry and layered opacity tones." },
  { id: 'mono-rounded-radar', title: "Mono Polygon Web Radar", description: "Minimalist monochromatic multi-axis polygon radar web with smooth rounded stroke join geometry." },
  { id: 'mono-rounded-radial-gauge', title: "Mono Concentric Radial Rings", description: "Monochromatic concentric progress rings with rounded arc caps and layered utilization metrics." },
  { id: 'mono-rounded-funnel', title: "Mono Stage Funnel", description: "Horizontal funnel stage visualizer using monochromatic pill bars with rounded endcaps." },
  { id: 'mono-rounded-heatmap', title: "Mono Dot Matrix Heatmap", description: "Monochromatic activity matrix with rounded corner cells and density opacity shading." },
  { id: 'mono-rounded-sparkline', title: "Mono Sparkline Telemetry", description: "Compact telemetry row suite featuring rounded micro splines and live metric readouts." },
  { id: 'mono-rounded-bubble', title: "Mono Bubble Clusters", description: "Scaled circle bubble distribution with rounded stroke outlines and monochromatic opacity fills." },
  { id: 'mono-rounded-treemap', title: "Mono Tile Treemap", description: "Partition allocation treemap featuring rounded corner tiles and monochrome contrast shading." },
  { id: 'mono-rounded-stream', title: "Mono Fluid Stream Wave", description: "Multi-layer fluid stream wave area visualizer with rounded stroke joins and soft monochrome gradients." },
  { id: 'mono-rounded-meter', title: "Mono Arc Meter Gauge", description: "Monochromatic semi-circle arc meter gauge with rounded stroke endcaps and center indicator." },
  { id: 'mono-rounded-waterfall', title: "Mono Waterfall Steps", description: "Sequential delta step bar chart featuring floating pillars with rounded corner geometry." },
  { id: 'mono-rounded-polar', title: "Mono Polar Radial Pillars", description: "Polar angle radial bar chart with 360-degree rounded arc pillars." },
  { id: 'mono-rounded-range', title: "Mono Range Band Area", description: "Min-Max floating variance area band with smooth rounded spline boundary strokes." },
];

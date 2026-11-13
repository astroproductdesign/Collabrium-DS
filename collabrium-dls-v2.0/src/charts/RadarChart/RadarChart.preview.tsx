// Radar chart preview: the chart from its docs page, for a check against the DLS gallery's Chart.js charts (preview.html
// 2828–2892, drawn by script there). Never part of the package build.
import { examples } from './RadarChart.docs';

export function RadarChartPreview() {
  return <>{examples.map((e) => <section key={e.id}>{e.render()}</section>)}</>;
}

export default RadarChartPreview;

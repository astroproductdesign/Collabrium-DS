// Chart color mapping preview: the docs page's swatch rows, for a check against the DLS gallery's (preview.html
// 3047–3070, components.css 3855–3860). Never part of the package build.
import { examples } from './ChartColorMapping.docs';

export function ChartColorMappingPreview() {
  return <>{examples.map((e) => <section key={e.id}>{e.render()}</section>)}</>;
}

export default ChartColorMappingPreview;

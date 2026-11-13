// Every variant of PyramidChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { PyramidChart } from './PyramidChart';
import { pipelineLevels } from '../lib/docs-shared.docs';

export function PyramidChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <PyramidChart aria-label="Levels" data={pipelineLevels} nameKey="level" valueKey="count" />
      <PyramidChart aria-label="Levels, Navy, tall" data={pipelineLevels} nameKey="level" valueKey="count" color="navy" height="tall" />
    </div>
  );
}

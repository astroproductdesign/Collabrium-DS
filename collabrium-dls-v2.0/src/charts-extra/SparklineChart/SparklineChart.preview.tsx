// Every variant of SparklineChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { SparklineChart } from './SparklineChart';
import { iops, readings } from '../lib/docs-shared.docs';

export function SparklineChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      <SparklineChart aria-label="Core temperature" values={readings} />
      <SparklineChart aria-label="IOPS" values={iops} color="green" fill endPoint />
    </div>
  );
}

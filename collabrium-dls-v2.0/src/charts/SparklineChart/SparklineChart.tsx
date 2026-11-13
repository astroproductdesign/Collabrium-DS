'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { setupCharts } from '../chart-setup';
import { alpha, colorOf, defaultFormat, resolveColorName, WASH, type SeriesColorName } from '../lib/theme';

export interface SparklineChartProps {
  /** Names the trend for assistive technology, with its range ("Spend, last 8 weeks, from 12 to 18"). */
  'aria-label': string;
  /** The values, oldest first. */
  values: number[];
  /** The colour of the element that owns the metric. Default orange. */
  color?: SeriesColorName;
  /** A ≤12% wash under the line. Default false. */
  fill?: boolean;
  /** Marks the latest value with a 3px point. Default false. */
  endPoint?: boolean;
  /** Formats values for the accessible description. */
  valueFormat?: (value: number) => string;
}

/**
 * A glance, not an instrument: a 2px line (tension 0.3) with no axes, gridlines, legend, tooltip or table, drawn by
 * Chart.js. It lives in StatCard's sparkline slot, never in a chart card, and fills that slot.
 */
export const SparklineChart = forwardRef<HTMLCanvasElement, SparklineChartProps>(function SparklineChart(props, ref) {
  const { 'aria-label': label, values, color, fill = false, endPoint = false, valueFormat = defaultFormat } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCharts();
    const hex = colorOf(resolveColorName(color, 0));
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: values.map((_, i) => String(i)),
        datasets: [
          {
            data: values,
            borderColor: hex,
            backgroundColor: alpha(hex, WASH),
            fill: fill ? 'origin' : false,
            pointRadius: values.map((_, i) => (endPoint && i === values.length - 1 ? 3 : 0)),
            pointHoverRadius: 0,
            pointBackgroundColor: hex,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        events: [],
        layout: { padding: endPoint ? 4 : 2 },
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    });
    return () => chart.destroy();
  }, [values, color, fill, endPoint]);
  const described = values.length ? `${label}. From ${valueFormat(values[0])} to ${valueFormat(values[values.length - 1])}.` : label;
  return (
    <span className="cui-chart-spark">
      <canvas
        ref={(el) => {
          canvasRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        role="img"
        aria-label={described}
      />
    </span>
  );
});

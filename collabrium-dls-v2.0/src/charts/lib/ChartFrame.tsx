'use client';

import { forwardRef, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Chart, type ChartConfiguration } from 'chart.js';
import { ChartBar, Table as TableIcon } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { Table, type TableColumn } from '../../components/Table';
import { setupCharts } from '../chart-setup';
import { useBare } from './bare';

/** The chart's values as a table: the "View as table" alternative every chart owes (Bubble and Sparkline excepted). */
export interface ChartTable {
  /** Column headings, the category first. */
  columns: string[];
  /** One row per category, already formatted. */
  rows: ReactNode[][];
}

interface FrameProps {
  /** Names the chart. */
  label: string;
  /** The Chart.js configuration, memoised by the chart. */
  config: ChartConfiguration;
  /** The table view; leave out for a chart with none (Bubble). */
  table?: ChartTable;
  /** The plot's floor: 260px, or 300px for `tall`. */
  height?: 'default' | 'tall';
}

/**
 * The frame every Chart.js chart sits in: the canvas (filling a 260 / 300px floor) and the "View as table"
 * alternative, which takes the chart's footprint so the page never moves. The card around it is the host's
 * (ChartCard).
 */
export const ChartFrame = forwardRef<HTMLElement, FrameProps>(function ChartFrame({ label, config, table, height = 'default' }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();
  const bare = useBare();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCharts();
    const options = { responsive: true, maintainAspectRatio: false, ...config.options } as Record<string, unknown>;
    if (bare) {
      // Only the marks: every scale (axes, gridlines, ticks, radial rings) hidden, no legend, tooltip, events or draw-in.
      const scales = { ...(options.scales as Record<string, object> | undefined) };
      const type = config.type as string;
      const radial = type === 'radar' || type === 'polarArea';
      if (radial) scales.r = { ...scales.r, display: false };
      else if (type !== 'pie' && type !== 'doughnut') {
        scales.x = { ...scales.x, display: false };
        scales.y = { ...scales.y, display: false };
      }
      for (const k of Object.keys(scales)) scales[k] = { ...scales[k], display: false };
      Object.assign(options, {
        scales,
        animation: false,
        events: [],
        layout: { padding: 2 },
        plugins: { ...(options.plugins as object), legend: { display: false }, tooltip: { enabled: false } },
      });
    }
    const chart = new Chart(canvas, { ...config, options } as ChartConfiguration);
    return () => chart.destroy();
  }, [config, bare]);

  const columns: TableColumn<{ id: string; cells: ReactNode[] }>[] = (table?.columns ?? []).map((header, i) => ({
    key: `c${i}`,
    header,
    type: i > 0 ? 'number' : 'text',
    render: (row) => row.cells[i],
  }));
  const rows = (table?.rows ?? []).map((cells, r) => ({ id: String(r), cells }));

  return (
    <figure ref={ref} className="cui-chart" role="group" aria-label={label} data-height={height} data-bare={bare || undefined} data-view={showTable ? 'table' : 'chart'}>
      <div className="cui-chart__canvas">
        <canvas ref={canvasRef} role="img" aria-label={table ? `${label}. Its values are in the table view.` : label} />
      </div>
      {table && !bare && (
        <>
          <div className="cui-chart__table" id={tableId} role="region" aria-label={`${label}, values`} tabIndex={showTable ? 0 : undefined}>
            {showTable && <Table variant="embedded" label={label} columns={columns} rows={rows} getRowKey={(row) => row.id} />}
          </div>
          <div className="cui-chart__table-btn">
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={showTable ? ChartBar : TableIcon}
              aria-controls={tableId}
              onClick={() => setShowTable((v) => !v)}
            >
              {showTable ? 'View as chart' : 'View as table'}
            </Button>
          </div>
        </>
      )}
    </figure>
  );
});

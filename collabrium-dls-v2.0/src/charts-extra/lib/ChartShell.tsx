'use client';

import { forwardRef, useId, useState, type ReactNode } from 'react';
import { ChartBar, Table } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { ChartLegend, type LegendItem } from './ChartLegend';
import { useBare } from './bare';

export interface ChartTable {
  /** Column headings, the category first. */
  columns: string[];
  /** One row per category, already formatted for display. */
  rows: ReactNode[][];
}

interface ShellProps {
  /** Names the chart for assistive technology. */
  label: string;
  /** Plot height floor: 260px, or 300px for `tall`. */
  height?: 'default' | 'tall';
  /** Legend items; leave out for a chart with no legend. */
  legend?: LegendItem[];
  table: ChartTable;
  /** Keep the table in the page, visually hidden, while the chart is showing: for charts whose picture has no text of its own (heatmaps, treemaps), so assistive technology can still read every value. */
  srTable?: boolean;
  /** True when the plot is drawn into a box of the shell's size (Recharts); false for content that sets its own height. */
  fill: boolean;
  children: (ctx: { hidden: ReadonlySet<string> }) => ReactNode;
}

/**
 * The frame every Charts (extra) chart sits in: the plot, the DLS legend,
 * and the "View as table" alternative the DLS requires of every chart. The
 * card around it is the host's.
 */
export const ChartShell = forwardRef<HTMLElement, ShellProps>(function ChartShell(
  { label, height = 'default', legend, table, fill, srTable, children },
  ref,
) {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();
  const bare = useBare();

  const toggle = (key: string) =>
    setHidden(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  if (bare) {
    return (
      <figure ref={ref} className="cui-chartx" data-bare="" data-height={height}>
        <div className="cui-chartx__canvas">
          <div className="cui-chartx__plot" data-fill={fill ? '' : undefined}>
            {fill ? <div className="cui-chartx__plot-fill">{children({ hidden })}</div> : children({ hidden })}
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure ref={ref} className="cui-chartx" role="group" aria-label={label} data-height={height} data-view={showTable ? 'table' : 'chart'}>
      <div className="cui-chartx__canvas">
        <div className="cui-chartx__plot" data-fill={fill ? '' : undefined}>
          {fill ? <div className="cui-chartx__plot-fill">{children({ hidden })}</div> : children({ hidden })}
        </div>
        {legend && legend.length > 0 && <ChartLegend items={legend} hidden={hidden} onToggle={toggle} />}
      </div>
      <div className="cui-chartx__table-wrap" id={tableId} data-sr={srTable && !showTable ? '' : undefined}>
        <table className="cui-chartx__table" aria-label={`${label}, as a table`}>
          <thead>
            <tr>
              {table.columns.map((c, i) => (
                <th key={i} scope="col" className={i > 0 ? 'cui-chartx__num' : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, i) => (
                  <td key={i} className={i > 0 ? 'cui-chartx__num' : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cui-chartx__table-btn">
        <Button
          variant="secondary"
          size="sm"
          leadingIcon={showTable ? ChartBar : Table}
          aria-controls={tableId}
          onClick={() => setShowTable(v => !v)}
        >
          {showTable ? 'View as chart' : 'View as table'}
        </Button>
      </div>
    </figure>
  );
});

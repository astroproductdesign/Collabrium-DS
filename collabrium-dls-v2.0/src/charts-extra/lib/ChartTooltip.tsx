import type { ReactNode } from 'react';

interface Entry {
  name?: string | number;
  value?: unknown;
  payload?: Record<string, unknown>;
}

/** Writes the tooltip's lines for one category from its data row, instead of one "name: value" per series. */
export type TooltipDescribe = (row: Record<string, unknown>) => string[];

export interface ChartTooltipProps {
  active?: boolean;
  label?: ReactNode;
  payload?: readonly Entry[];
  /** Formats one value; a [min, max] pair is formatted as "min – max". */
  format: (value: number) => string;
  /** Replaces the default lines. Receives the hovered data row. */
  describe?: TooltipDescribe;
  /** Writes the title from the hovered data row, for charts with no category axis (the slice or ring name). */
  title?: (row: Record<string, unknown>) => string;
}

/**
 * The DLS tooltip: Neutral-1 surface, 1px Neutral-3 border, the category as a
 * label2 title in Neutral-9, one label3 line per series in Neutral-5, no colour
 * swatches (the Chart.js set-up's `displayColors: false`).
 */
export function ChartTooltip({ active, label, payload, format, describe, title }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const show = (v: unknown): string => {
    if (Array.isArray(v)) return v.map(n => format(Number(n))).join(' – ');
    return typeof v === 'number' ? format(v) : String(v);
  };
  return (
    <div className="cui-chartx__tooltip">
      <div className="cui-chartx__tooltip-title">{title && payload[0]?.payload ? title(payload[0].payload) : label}</div>
      {describe && payload[0]?.payload
        ? describe(payload[0].payload).map((line, i) => (
            <div key={i} className="cui-chartx__tooltip-row">
              {line}
            </div>
          ))
        : payload.map((p, i) => (
            <div key={i} className="cui-chartx__tooltip-row">
              {p.name}: {show(p.value)}
            </div>
          ))}
    </div>
  );
}

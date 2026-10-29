'use client';

export interface LegendItem {
  key: string;
  name: string;
  /** The swatch colour, as a hex value from the tokens. */
  color: string;
  /** Draws the swatch with this pattern (0 to 4, the Dither charts' textures), so the key matches the marks. */
  dither?: number;
  /** A fixed key to the marks (e.g. Increase, Decrease): drawn as plain text, not a button. */
  fixed?: boolean;
}

/**
 * The DLS legend: a left-aligned row under the plot, caption labels in
 * Neutral-5, 10px circular swatches. Each item is a real button that shows
 * or hides its series (as Chart.js's legend does), so it works from the
 * keyboard; a hidden series is struck through. A `fixed` item is a key, not
 * a control.
 */
export function ChartLegend({
  items,
  hidden,
  onToggle,
}: {
  items: LegendItem[];
  hidden: ReadonlySet<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="cui-chartx__legend" role="group" aria-label={items.every(i => i.fixed) ? 'Key' : 'Series'}>
      {items.map(item => {
        // The swatch colour is data (it comes from the series), so it travels as a custom property.
        const swatch =
          item.dither === undefined ? (
            <span className="cui-chartx__swatch" style={{ background: item.color }} aria-hidden="true" />
          ) : (
            <span className="cui-chartx__swatch" data-dither={item.dither} style={{ ['--cui-swatch' as string]: item.color }} aria-hidden="true" />
          );
        return item.fixed ? (
          <span key={item.key} className="cui-chartx__legend-item" data-fixed="">
            {swatch}
            <span className="cui-chartx__legend-name">{item.name}</span>
          </span>
        ) : (
          <button
            key={item.key}
            type="button"
            className="cui-chartx__legend-item"
            aria-pressed={!hidden.has(item.key)}
            onClick={() => onToggle(item.key)}
          >
            {swatch}
            <span className="cui-chartx__legend-name">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}

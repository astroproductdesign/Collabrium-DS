'use client';

import { forwardRef, type ReactElement } from 'react';
import { Bar, BarChart as RechartsBar, Rectangle } from 'recharts';
import { CartesianFrame, type CartesianChartProps, type ResolvedSeries } from '../lib/CartesianFrame';
import { barRadius, defaultFormat, lineWidth, maxBarThickness, barCategoryGap } from '../lib/chart-theme';
import { tokens } from '../../tokens/tokens';

const { color } = tokens;
const RANGE = '__range';

export interface CandlestickChartProps extends Omit<CartesianChartProps, 'yAxisStart' | 'legend'> {
  /** The key of each period's opening value in a row. */
  openKey: string;
  /** The key of each period's highest value. */
  highKey: string;
  /** The key of each period's lowest value. */
  lowKey: string;
  /** The key of each period's closing value. */
  closeKey: string;
}

/**
 * Four values per period (open, high, low, close) as a body between the open
 * and the close with a line out to the high and the low. A period that closed
 * higher is a solid Green body; one that closed lower is a hollow Red body, so
 * direction never rests on colour alone. Built on Recharts. The value axis
 * fits the data.
 */
export const CandlestickChart = forwardRef<HTMLElement, CandlestickChartProps>(function CandlestickChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Period', openKey, highKey, lowKey, closeKey, valueFormat = defaultFormat, height },
  ref,
) {
  const rows = data.map(d => ({ ...d, [RANGE]: [Number(d[lowKey]), Number(d[highKey])] as [number, number] }));
  const series: ResolvedSeries[] = [{ key: RANGE, name: 'Price', colorName: 'green', hex: color.green }];

  const candle = (p: any): ReactElement => {
    const { x, y, width, height: h, payload } = p;
    const open = Number(payload[openKey]);
    const close = Number(payload[closeKey]);
    const high = Number(payload[highKey]);
    const low = Number(payload[lowKey]);
    const up = close >= open;
    const hue = up ? color.green : color.red;
    const span = high - low || 1;
    const at = (v: number) => y + ((high - v) / span) * h;
    const top = at(Math.max(open, close));
    const bodyH = Math.max(lineWidth * 2, at(Math.min(open, close)) - top);
    const cx = x + width / 2;
    return (
      <g>
        <line x1={cx} x2={cx} y1={y} y2={y + h} stroke={hue} strokeWidth={lineWidth} strokeLinecap="round" />
        <Rectangle x={x} y={top} width={width} height={bodyH} radius={barRadius} fill={up ? hue : color.neutral1} stroke={hue} strokeWidth={lineWidth} />
      </g>
    );
  };

  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend
      legendSeries={false}
      series={series}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      yAxisStart="fit"
      marks="bars"
      categories={data.length}
      describe={row => [
        `Open: ${valueFormat(Number(row[openKey]))}`,
        `High: ${valueFormat(Number(row[highKey]))}`,
        `Low: ${valueFormat(Number(row[lowKey]))}`,
        `Close: ${valueFormat(Number(row[closeKey]))} (${Number(row[closeKey]) >= Number(row[openKey]) ? 'up' : 'down'})`,
      ]}
      extraLegend={[
        { key: 'up', name: 'Closed higher', color: color.green, fixed: true },
        { key: 'down', name: 'Closed lower', color: color.red, fixed: true },
      ]}
      table={{
        columns: [categoryLabel, 'Open', 'High', 'Low', 'Close', 'Direction'],
        rows: data.map(d => [d[categoryKey], valueFormat(Number(d[openKey])), valueFormat(Number(d[highKey])), valueFormat(Number(d[lowKey])), valueFormat(Number(d[closeKey])), Number(d[closeKey]) >= Number(d[openKey]) ? 'Up' : 'Down']),
      }}
    >
      {({ axes, tooltip, motion, chartProps }) => (
        <RechartsBar barCategoryGap={barCategoryGap} data={rows} {...chartProps}>
          {axes}
          {tooltip}
          <Bar dataKey={RANGE} name="Price" maxBarSize={maxBarThickness.vertical} shape={candle} activeBar={false} {...motion} />
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});

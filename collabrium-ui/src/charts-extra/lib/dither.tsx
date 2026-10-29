// The Dither charts' texture: fixed SVG patterns in a series' own DLS colour.
// Amicro draws its dither as a random, animated canvas dot field; this is a
// still pattern, so it is the same on every render, costs nothing per frame
// and survives reduced motion. Each pattern is a 12% wash of the colour with
// marks in the full colour, so a series is told apart by its pattern as well
// as its hue.
import type { ReactElement } from 'react';
import { washOpacity } from './chart-theme';

/** Patterns from sparse to dense, so a run of them also reads as a ramp. */
export const ditherKinds = ['stipple', 'dots', 'hatch', 'checker', 'stripes'] as const;
export type DitherKind = (typeof ditherKinds)[number];

/** The pattern for the nth series or slice; past five they repeat. */
export const ditherKindAt = (index: number): number => index % ditherKinds.length;

/** The id of a series' pattern inside one chart; `id` makes it unique on the page. */
export const ditherId = (id: string, key: string, hover = false): string => `${id}-${key.replace(/[^a-zA-Z0-9_-]/g, '_')}${hover ? '-hover' : ''}`;

/** The `fill` value that paints with a pattern. */
export const ditherFill = (id: string, key: string, hover = false): string => `url(#${ditherId(id, key, hover)})`;

export interface DitherEntry {
  /** Names the pattern; use the series key or slice name. */
  key: string;
  /** The marks' colour as a hex value, from the tokens. */
  color: string;
  /** Which pattern, 0 to 4 (see `ditherKinds`). */
  kind: number;
  /** The hovered state's colour, if the mark darkens on hover. */
  hoverColor?: string;
}

function Pattern({ pid, color, kind }: { pid: string; color: string; kind: DitherKind }) {
  const wash = (size: number) => <rect width={size} height={size} fill={color} fillOpacity={washOpacity} />;
  switch (kind) {
    case 'stipple':
      return (
        <pattern id={pid} width={8} height={8} patternUnits="userSpaceOnUse">
          {wash(8)}
          <circle cx={4} cy={4} r={1} fill={color} />
        </pattern>
      );
    case 'dots':
      return (
        <pattern id={pid} width={5} height={5} patternUnits="userSpaceOnUse">
          {wash(5)}
          <circle cx={2.5} cy={2.5} r={1} fill={color} />
        </pattern>
      );
    case 'hatch':
      return (
        <pattern id={pid} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          {wash(6)}
          <line x1={0} y1={0} x2={0} y2={6} stroke={color} strokeWidth={2} />
        </pattern>
      );
    case 'checker':
      return (
        <pattern id={pid} width={4} height={4} patternUnits="userSpaceOnUse">
          {wash(4)}
          <rect x={0} y={0} width={2} height={2} fill={color} />
          <rect x={2} y={2} width={2} height={2} fill={color} />
        </pattern>
      );
    default:
      return (
        <pattern id={pid} width={4} height={4} patternUnits="userSpaceOnUse">
          {wash(4)}
          <rect x={0} y={0} width={4} height={2} fill={color} />
        </pattern>
      );
  }
}

/** The `<defs>` for a chart's patterns: place it inside the chart's `<svg>`. */
export function DitherDefs({ id, entries }: { id: string; entries: DitherEntry[] }): ReactElement {
  return (
    <defs>
      {entries.map(e => (
        <Pattern key={e.key} pid={ditherId(id, e.key)} color={e.color} kind={ditherKinds[ditherKindAt(e.kind)]} />
      ))}
      {entries
        .filter(e => e.hoverColor)
        .map(e => (
          <Pattern key={e.key + '-hover'} pid={ditherId(id, e.key, true)} color={e.hoverColor as string} kind={ditherKinds[ditherKindAt(e.kind)]} />
        ))}
    </defs>
  );
}

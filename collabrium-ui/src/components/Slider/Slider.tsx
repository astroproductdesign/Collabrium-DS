'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import type { WithoutStyling } from '../../utils/types';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange' | 'color'>>;

/** How values are written in the tooltip, the static value, the min and max labels and `aria-valuetext`. */
export type SliderFormat = 'number' | 'rm' | 'percent';

interface SliderBaseProps extends NativeDivProps {
  /** The visible label above the slider. Every slider has one (the DS: "always paired with a visible label"). */
  label: ReactNode;
  /** The lowest value. Default 0. */
  min?: number;
  /** The highest value. Default 100. */
  max?: number;
  /** The step between values. Default 1. Use a slider only when about 10 or more values are valid. */
  step?: number;
  /**
   * How values are written: `number` ("40,000"), `rm` ("RM 40,000", the system's ringgit rule) or `percent` ("40%").
   * The tooltip, static value, min and max labels and `aria-valuetext` all use it, so they always match.
   */
  format?: SliderFormat;
  /** Your own formatter, when none of the formats fits ("12 weeks"). Overrides `format`. */
  formatValue?: (value: number) => string;
  /** Shows the min and max, formatted, under the track's ends. */
  showLimits?: boolean;
  /**
   * Keeps the current value visible at rest, right-aligned above the track's end. Replaces the value tooltip. Use only
   * when the value must stay on screen.
   */
  showValue?: boolean;
  /** `default`: 4px track, 20px thumb. `compact`: 2px track, 16px thumb, for dense layouts and table rows. */
  size?: 'default' | 'compact';
  /** Dims the whole slider to 40% and stops it responding. */
  disabled?: boolean;
}

export interface SingleSliderProps extends SliderBaseProps {
  /** `single` (the default): one thumb; the fill runs from the minimum to it. */
  variant?: 'single';
  /** The value, controlled. */
  value?: number;
  /** The starting value, uncontrolled. Default `min`. */
  defaultValue?: number;
  /** Every new value while dragging, clicking the track or pressing a key. */
  onValueChange?: (value: number) => void;
  /** Posts the value with a form. */
  name?: string;
  thumbLabels?: never;
}

export interface RangeSliderProps extends SliderBaseProps {
  /** `range`: two thumbs; the fill runs between them. They may touch but never cross. */
  variant: 'range';
  /** `[low, high]`, controlled. */
  value?: [number, number];
  /** `[low, high]`, uncontrolled. Default `[min, max]`. */
  defaultValue?: [number, number];
  /** Every new `[low, high]`. */
  onValueChange?: (value: [number, number]) => void;
  /** Posts both values with a form: `[lowName, highName]`. */
  name?: [string, string];
  /** The two thumbs' names, read with the label's group. Default `['Minimum', 'Maximum']`. */
  thumbLabels?: [string, string];
}

export type SliderProps = SingleSliderProps | RangeSliderProps;

type AnySliderProps = SliderBaseProps & {
  variant?: 'single' | 'range';
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: ((value: number) => void) | ((value: [number, number]) => void);
  name?: string | [string, string];
  thumbLabels?: [string, string];
};

const FORMATS: Record<SliderFormat, (v: number) => string> = {
  number: (v) => v.toLocaleString('en-US'),
  // The system's ringgit rule: a space after RM, comma thousands ("RM 100,000").
  rm: (v) => `RM ${v.toLocaleString('en-US')}`,
  percent: (v) => `${v.toLocaleString('en-US')}%`,
};

// The source script's timer: the tooltip's classes clear 400ms after the fade-out starts (its CSS waits
// --duration-base, 220ms, then fades over --duration-fast, 140ms).
const TOOLTIP_CLEAR_MS = 400;

type TipState = 'visible' | 'hiding' | undefined;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Collabrium Slider: drag to pick one value, or a range, along a continuous scale. Native `<input type="range">`s
 * (two stacked for a range) over a drawn track and fill, with a value tooltip above the moving thumb. Ported from
 * components.css `.c-slider*` (4491–4520) and the gallery's slider script.
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const {
    label,
    min = 0,
    max = 100,
    step = 1,
    format = 'number',
    formatValue,
    showLimits = false,
    showValue = false,
    size = 'default',
    disabled = false,
    variant = 'single',
    value: valueProp,
    defaultValue,
    onValueChange,
    name,
    thumbLabels = ['Minimum', 'Maximum'],
    ...rest
  } = props as AnySliderProps;
  const range = variant === 'range';
  const fmt = formatValue ?? FORMATS[format];

  const uid = useId();
  const labelId = `${uid}-label`;
  const loId = `${uid}-lo`;
  const hiId = `${uid}-hi`;

  // Values as [low, high]; a single slider uses only `high` (low stays at min, so the fill starts there).
  const toPair = (v: number | [number, number] | undefined): [number, number] | undefined =>
    v === undefined ? undefined : Array.isArray(v) ? v : [min, v];
  const [inner, setInner] = useState<[number, number]>(() => toPair(defaultValue) ?? (range ? [min, max] : [min, min]));
  const controlled = toPair(valueProp);
  const [lo, hi] = controlled ?? inner;

  const commit = useCallback(
    (next: [number, number]) => {
      if (!controlled) setInner(next);
      if (range) (onValueChange as ((v: [number, number]) => void) | undefined)?.(next);
      else (onValueChange as ((v: number) => void) | undefined)?.(next[1]);
    },
    [controlled, range, onValueChange],
  );

  // The most recently moved thumb sits on top (the DS: "z-index managed dynamically").
  const [top, setTop] = useState<'lo' | 'hi'>('hi');

  // Tooltips: one per thumb, shown on hover, focus and drag; faded out after --duration-base.
  const [tips, setTips] = useState<{ lo: TipState; hi: TipState }>({ lo: undefined, hi: undefined });
  const timers = useRef<{ lo?: ReturnType<typeof setTimeout>; hi?: ReturnType<typeof setTimeout> }>({});
  useEffect(() => () => {
    clearTimeout(timers.current.lo);
    clearTimeout(timers.current.hi);
  }, []);
  const showTip = (which: 'lo' | 'hi') => {
    if (showValue) return;
    clearTimeout(timers.current[which]);
    setTips((t) => ({ ...t, [which]: 'visible' }));
  };
  const hideTip = (which: 'lo' | 'hi') => {
    if (showValue) return;
    clearTimeout(timers.current[which]);
    setTips((t) => (t[which] ? { ...t, [which]: 'hiding' } : t));
    timers.current[which] = setTimeout(() => setTips((t) => ({ ...t, [which]: undefined })), TOOLTIP_CLEAR_MS);
  };

  const inputs = useRef<{ lo: HTMLInputElement | null; hi: HTMLInputElement | null }>({ lo: null, hi: null });

  const pct = (v: number) => (max === min ? 0 : ((v - min) / (max - min)) * 100);

  // Range: the moved thumb's value is clamped against its partner's, never either input's min / max (the DS's
  // implementation note: changing those makes the browser redraw the thumb at the wrong end).
  const onInput = (which: 'lo' | 'hi', raw: number) => {
    let next: [number, number];
    if (!range) next = [min, raw];
    else if (which === 'lo') next = [Math.min(raw, hi), hi];
    else next = [lo, Math.max(raw, lo)];
    if (range) setTop(which);
    showTip(which);
    if (next[0] !== lo || next[1] !== hi) commit(next);
  };

  // Range: a press on the bare track moves the nearer thumb there; when the two touch, the press's side decides
  // (right of them: the high thumb, left: the low one), so the clamp never undoes it. Single gets this natively.
  const onRailClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!range || disabled) return;
    if ((e.target as HTMLElement).classList.contains('cui-slider__input')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const at = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    const dLo = Math.abs(pct(lo) - at);
    const dHi = Math.abs(pct(hi) - at);
    const which: 'lo' | 'hi' = Math.abs(dLo - dHi) < 0.01 ? (at >= pct(lo) ? 'hi' : 'lo') : dLo < dHi ? 'lo' : 'hi';
    const v = clamp(Math.round((min + (at / 100) * (max - min)) / step) * step, min, max);
    onInput(which, v);
    inputs.current[which]?.focus();
  };

  const railStyle = {
    '--cui-slider-lo': range ? pct(lo) : 0,
    '--cui-slider-hi': pct(hi),
  } as CSSProperties;

  const valueText = (v: number) => {
    const text = fmt(v);
    // Only when the words differ from the bare number (a unit or a separator), as the DS requires.
    return text === String(v) ? undefined : text;
  };

  const thumb = (which: 'lo' | 'hi') => {
    const v = which === 'lo' ? lo : hi;
    const id = which === 'lo' ? loId : hiId;
    const nm = Array.isArray(name) ? name[which === 'lo' ? 0 : 1] : name;
    return (
      <input
        key={which}
        ref={(el) => {
          inputs.current[which] = el;
        }}
        className="cui-slider__input"
        type="range"
        id={id}
        name={nm}
        min={min}
        max={max}
        step={step}
        value={v}
        disabled={disabled}
        data-top={range && top === which ? '' : undefined}
        aria-label={range ? thumbLabels[which === 'lo' ? 0 : 1] : undefined}
        aria-valuetext={valueText(v)}
        onChange={(e) => onInput(which, Number(e.currentTarget.value))}
        onMouseEnter={() => showTip(which)}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) hideTip(which);
        }}
        onFocus={() => showTip(which)}
        onBlur={() => hideTip(which)}
        onPointerUp={() => hideTip(which)}
      />
    );
  };

  const tooltip = (which: 'lo' | 'hi') => (
    <span
      key={`tip-${which}`}
      className="cui-slider__tooltip"
      aria-hidden="true"
      data-state={tips[which]}
      style={{ '--cui-slider-at': pct(which === 'lo' ? lo : hi) } as CSSProperties}
    >
      {fmt(which === 'lo' ? lo : hi)}
    </span>
  );

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-slider"
      data-variant={range ? 'range' : undefined}
      data-size={size === 'compact' ? 'compact' : undefined}
      data-disabled={disabled || undefined}
      role={range ? 'group' : undefined}
      aria-labelledby={range ? labelId : undefined}
    >
      {range ? (
        <span className="cui-slider__label" id={labelId}>
          {label}
        </span>
      ) : (
        <label className="cui-slider__label" id={labelId} htmlFor={hiId}>
          {label}
        </label>
      )}
      {showValue && (
        <div className="cui-slider__value">
          {range ? `${fmt(lo)} – ${fmt(hi)}` : fmt(hi)}
        </div>
      )}
      <div className="cui-slider__rail" style={railStyle} onClick={onRailClick}>
        {!showValue && range && tooltip('lo')}
        {!showValue && tooltip('hi')}
        <div className="cui-slider__track" aria-hidden="true">
          <div className="cui-slider__fill" />
        </div>
        {range && thumb('lo')}
        {thumb('hi')}
      </div>
      {showLimits && (
        <div className="cui-slider__limits">
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      )}
    </div>
  );
});

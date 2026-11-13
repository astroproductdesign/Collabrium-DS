'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { LockSimple, Minus, Plus } from '@phosphor-icons/react';

/** What changed the value: a button press, a press-and-hold repeat, a key, a typed value (committed by a step), Enter, or leaving the field. */
export type QuantitySelectorChangeSource = 'button' | 'hold' | 'key' | 'type' | 'enter' | 'blur';
/** Why a typed value was refused: nothing typed, not a number, not whole, under the minimum, over the maximum. */
export type QuantitySelectorInvalidReason = 'empty' | 'nan' | 'whole' | 'min' | 'max';

interface QuantitySelectorBaseProps {
  /** Names the field. Always required; hide it with `hideLabel` in rows and table cells. */
  label: ReactNode;
  /** Hides the label visually (rows, table cells); it is still read out. */
  hideLabel?: boolean;
  /** The value, when you control it. Whole numbers only. */
  value?: number;
  /** The value on first render, when you don't. Default: `min`, or 0. */
  defaultValue?: number;
  /** Called with each new valid value, and what changed it. A refused value never calls it: the error shows instead. */
  onValueChange?: (value: number, detail: { previous: number; source: QuantitySelectorChangeSource }) => void;
  /** Called when a typed value is refused (the error is already showing). */
  onInvalid?: (detail: { reason: QuantitySelectorInvalidReason; raw: string }) => void;
  /** The smallest allowed value. − stops here. */
  min?: number;
  /** The largest allowed value. + stops here. The box is as wide as this number, formatted. */
  max?: number;
  /** What − / + and ↑ / ↓ change it by. Default 1. */
  step?: number;
  /** What PageUp / PageDown change it by. Default 10 × `step`. */
  bigStep?: number;
  /** A unit after the number, singular and plural ("spot" / "spots"). Read out with the value. */
  unit?: { one: string; other?: string };
  /** A currency before the number ("RM"). Read out with the value. */
  prefix?: string;
  /** Accept "250k" and "1.2m" (k and m only). Off by default; the keyboard switches from numbers to text. Say so in the helper. */
  shorthand?: boolean;
  /** `default` is 40px; `compact` is 32px with 24px buttons, for table and list rows. */
  size?: 'default' | 'compact';
  /** No − / + buttons: for numbers where one step is too small to be useful (impressions, reach) and in dense columns. Same keys. */
  typeOnly?: boolean;
  /** Pin the box's width to this many digits, so selectors in a column line up. Default: the formatted `max`. */
  reserveDigits?: number;
  /** A helper line under the box: usually the range ("1–50 spots"). */
  helper?: ReactNode;
  /** An error of the page's own ("Only 12 spots left"). The selector's own messages show without it. */
  error?: ReactNode;
  /** Can't be used: Input field's disabled look. */
  disabled?: boolean;
  /** The names of the − and + buttons. Default "Fewer spots" / "More spots" with a unit, else "Decrease" / "Increase" and the label. */
  decreaseLabel?: string;
  increaseLabel?: string;
  /** Replace any of the refusal messages. */
  messages?: Partial<Record<QuantitySelectorInvalidReason, string>>;
  /** Form field name: a hidden input posts the number (no commas). */
  name?: string;
  id?: string;
}

interface EditableProps extends QuantitySelectorBaseProps {
  readOnly?: false;
  readOnlyReason?: never;
}
interface ReadOnlyProps extends QuantitySelectorBaseProps {
  /** Shows the value with a lock; − and + stay but never step. */
  readOnly: true;
  /** Why it is locked ("Locked by the package"). Required: it is read out with the value. */
  readOnlyReason: string;
}
// The source's script API (events, get / set) is these props and callbacks (decided 2026-11-06, Q-QTY-5).
export type QuantitySelectorProps = EditableProps | ReadOnlyProps;

// Press-and-hold timing, the source's: behaviour timers in script, not CSS motion, so not tokens (decided 2026-11-06, Q-QTY-4).
const HOLD_DELAY = 400;
const HOLD_RATE = 100;
const CH_MIN = 2;
const CH_OPEN = 6;
const CH_GROW = 4;
const NF = new Intl.NumberFormat('en-MY', { maximumFractionDigits: 0 });
const fmt = (n: number) => NF.format(n);
const SHORTHAND: Record<string, number> = { k: 1e3, m: 1e6 };

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

/** − or +: Button ghost icon-only sm, out of the tab order, with press-and-hold. */
function StepButton({
  dir,
  label,
  controls,
  disabled,
  onStep,
}: {
  dir: 1 | -1;
  label: string;
  controls: string;
  disabled: boolean;
  onStep: (source: 'button' | 'hold') => boolean;
}) {
  const stepRef = useRef(onStep);
  stepRef.current = onStep;
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;
  const st = useRef<{ timer: ReturnType<typeof setTimeout> | null; holding: boolean; viaPointer: boolean }>({ timer: null, holding: false, viaPointer: false });
  const [holding, setHolding] = useState(false);

  const stop = () => {
    const s = st.current;
    if (s.timer) {
      clearTimeout(s.timer);
      clearInterval(s.timer);
    }
    s.timer = null;
    s.holding = false;
    setHolding(false);
  };
  useEffect(() => {
    const onBlur = () => st.current.holding && stop();
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
      stop();
    };
  }, []);

  const Glyph = dir < 0 ? Minus : Plus;
  return (
    <button
      type="button"
      className="cui-button cui-quantity-selector__btn"
      data-variant="ghost"
      data-size="sm"
      data-icon-only=""
      data-holding={holding || undefined}
      tabIndex={-1}
      aria-label={label}
      aria-controls={controls}
      aria-disabled={disabled}
      // Keep focus where it is (the input, or nowhere).
      onMouseDown={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e: PointerEvent<HTMLButtonElement>) => {
        if (e.button !== 0) return;
        st.current.viaPointer = true;
        if (disabledRef.current) return;
        if (!stepRef.current('button')) return;
        st.current.holding = true;
        setHolding(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* not capturable: release still ends the hold */
        }
        st.current.timer = setTimeout(() => {
          st.current.timer = setInterval(() => {
            if (!stepRef.current('hold')) stop();
          }, HOLD_RATE);
        }, HOLD_DELAY);
      }}
      onPointerMove={(e) => {
        if (!st.current.holding) return;
        // Dragging off the button (its 44px touch area included) ends the hold.
        const r = e.currentTarget.getBoundingClientRect();
        const s = Math.max(0, (44 - r.width) / 2);
        if (e.clientX < r.left - s || e.clientX > r.right + s || e.clientY < r.top - s || e.clientY > r.bottom + s) stop();
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onClick={(e) => {
        const fromPointer = st.current.viaPointer;
        st.current.viaPointer = false;
        // A pointer press already stepped; only a screen reader's or a script's activation (detail 0) steps here.
        if (fromPointer || e.detail !== 0 || disabledRef.current) return;
        stepRef.current('button');
      }}
    >
      <Glyph className="cui-button__icon" weight="regular" aria-hidden="true" focusable="false" />
    </button>
  );
}

/**
 * Collabrium Quantity selector: a number field with − and + buttons for whole-number quantities (ad spots, weeks,
 * screens, and big numbers such as impressions or an RM budget). Type, press (and hold) the buttons, or use the arrow
 * keys. Its box is Input field's; the buttons are Button ghost icon-only sm. Typed values are checked on Enter or blur
 * and refused with an error, never silently clamped. Ported from components.css `.c-quantity-selector` (5975–6104) and
 * preview.html's `CQuantitySelector` script.
 */
export const QuantitySelector = forwardRef<HTMLInputElement, QuantitySelectorProps>(function QuantitySelector(props, ref) {
  const {
    label,
    hideLabel = false,
    value: valueProp,
    defaultValue,
    onValueChange,
    onInvalid,
    min = -Infinity,
    max = Infinity,
    step = 1,
    bigStep,
    unit,
    prefix = '',
    shorthand = false,
    size = 'default',
    typeOnly = false,
    reserveDigits,
    helper,
    error: hostError,
    disabled = false,
    readOnly = false,
    decreaseLabel,
    increaseLabel,
    messages,
    name,
    id: idProp,
  } = props;
  const readOnlyReason = (props as ReadOnlyProps).readOnlyReason;

  const uid = useId();
  const id = idProp ?? `${uid}-input`;
  const messageId = `${uid}-message`;
  const reasonId = `${uid}-reason`;

  const big = bigStep ?? step * 10;
  const base = Number.isFinite(min) ? min : 0;
  const one = unit?.one ?? '';
  const other = unit?.other ?? one;
  const unitFor = (n: number) => (Math.abs(n) === 1 ? one : other);
  const withUnit = (n: number) => `${prefix ? prefix + ' ' : ''}${fmt(n)}${one ? ' ' + unitFor(n) : ''}`;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const off = disabled || readOnly;

  const [own, setOwn] = useState(() => clamp(defaultValue ?? (Number.isFinite(min) ? min : 0)));
  const value = valueProp !== undefined ? valueProp : own;
  const valueRef = useRef(value);
  valueRef.current = value;

  const [text, setTextState] = useState(() => fmt(value));
  const textRef = useRef(text);
  const setText = (t: string) => {
    textRef.current = t;
    setTextState(t);
  };
  const [bad, setBad] = useState<{ reason: QuantitySelectorInvalidReason; raw: string } | null>(null);
  const badRef = useRef(bad);
  badRef.current = bad;

  // A value the page sets is shown formatted (unless the person is mid-way through typing a refused value).
  const lastShown = useRef(value);
  useEffect(() => {
    if (value !== lastShown.current) {
      lastShown.current = value;
      if (!badRef.current) setText(fmt(value));
    }
  }, [value]);

  // Accepts 1250000 · 1,250,000 · 1 250 000 (no-break and thin spaces too) · a pasted "RM 25,000" · with shorthand: 250k, 1.2m.
  const validate = (raw: string): { n: number } | { reason: QuantitySelectorInvalidReason } => {
    let s = raw.replace(/[   ]/g, ' ').trim();
    if (prefix && s.toUpperCase().startsWith(prefix.toUpperCase())) s = s.slice(prefix.length).trim();
    if (s === '') return { reason: 'empty' };
    let n: number | null = null;
    if (/^[-+]?\d+$/.test(s)) n = Number(s);
    else if (/^[-+]?\d{1,3}(?:,\d{3})+$/.test(s) || /^[-+]?\d{1,3}(?: \d{3})+$/.test(s)) n = Number(s.replace(/[, ]/g, ''));
    else {
      const m = shorthand ? /^([-+]?\d+(?:\.\d+)?)\s*([km])$/i.exec(s) : null;
      if (m) {
        n = Math.round(parseFloat(m[1]) * SHORTHAND[m[2].toLowerCase()] * 1e6) / 1e6;
        if (!Number.isInteger(n)) return { reason: 'whole' };
      } else if (/^[-+]?\d*[.,]\d+$/.test(s)) return { reason: 'whole' };
      else return { reason: 'nan' };
    }
    if (n < min) return { reason: 'min' };
    if (n > max) return { reason: 'max' };
    return { n };
  };
  const message = (reason: QuantitySelectorInvalidReason) =>
    messages?.[reason] ??
    {
      empty: one ? `Enter a number of ${other}.` : 'Enter a number.',
      nan: shorthand ? `Use digits, like ${fmt(value)}, or 250k / 1.2m.` : `Use digits only, like ${fmt(value)}.`,
      whole: 'Use a whole number.',
      min: `The minimum is ${withUnit(min)}.`,
      max: `The maximum is ${withUnit(max)}.`,
    }[reason];

  const dirty = () => textRef.current.trim() !== fmt(valueRef.current);

  const set = (n: number, source: QuantitySelectorChangeSource) => {
    n = clamp(n);
    const prev = valueRef.current;
    valueRef.current = n;
    lastShown.current = n;
    if (valueProp === undefined) setOwn(n);
    setText(fmt(n));
    if (n !== prev) onValueChange?.(n, { previous: prev, source });
    return n !== prev;
  };
  const clearError = () => {
    badRef.current = null;
    setBad(null);
  };
  const commit = (source: QuantitySelectorChangeSource) => {
    const raw = textRef.current.trim();
    const r = validate(raw);
    if ('reason' in r) {
      if (!(badRef.current && badRef.current.raw === raw)) {
        const next = { reason: r.reason, raw };
        badRef.current = next;
        setBad(next);
        onInvalid?.(next);
      }
      return false;
    }
    clearError();
    set(r.n, source);
    return true;
  };
  // Before a button or key step: keep a valid typed value, drop a refused one.
  const flush = () => {
    if (!dirty() && !badRef.current) return;
    const r = validate(textRef.current.trim());
    clearError();
    if ('reason' in r) setText(fmt(valueRef.current));
    else set(r.n, 'type');
  };
  const stepBy = (dir: 1 | -1, by: number, source: QuantitySelectorChangeSource) => {
    if (off) return false;
    flush();
    // Off-grid values snap in the direction of travel: 75 (step 50) goes ↑ 100, ↓ 50.
    const v = valueRef.current;
    const offGrid = (((v - base) % step) + step) % step;
    const floor = v - offGrid;
    const ceil = offGrid ? floor + step : floor;
    return set(dir > 0 ? floor + by : ceil - by, source);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (off) return;
    let handled = true;
    switch (e.key) {
      case 'ArrowUp':
        stepBy(1, step, 'key');
        break;
      case 'ArrowDown':
        stepBy(-1, step, 'key');
        break;
      case 'PageUp':
        stepBy(1, big, 'key');
        break;
      case 'PageDown':
        stepBy(-1, big, 'key');
        break;
      case 'Home':
        if (Number.isFinite(min)) {
          flush();
          set(min, 'key');
        } else handled = false;
        break;
      case 'End':
        if (Number.isFinite(max)) {
          flush();
          set(max, 'key');
        } else handled = false;
        break;
      case 'Enter':
        // Blocks a form submit only while the value is refused.
        handled = !commit('enter');
        break;
      case 'Escape':
        // Undo typing; when there's nothing to undo it isn't handled, so an enclosing Modal still closes.
        if (dirty() || badRef.current) {
          clearError();
          setText(fmt(valueRef.current));
          e.stopPropagation();
        } else handled = false;
        break;
      default:
        handled = false;
    }
    if (handled) e.preventDefault();
  };

  // Width: the box keeps the width of the formatted max (or `reserveDigits`); the input is only as wide as its text, and
  // the unused width becomes padding around the value group, so the buttons never move and the prefix hugs the digits.
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [metrics, setMetrics] = useState<{ w?: string; slack?: string }>({});
  const [fontsTick, setFontsTick] = useState(0);
  useEffect(() => {
    let live = true;
    document.fonts?.ready.then(() => live && setFontsTick((t) => t + 1));
    return () => {
      live = false;
    };
  }, []);
  const baseCh = reserveDigits || Math.max(CH_MIN, Number.isFinite(max) ? fmt(max).length : CH_OPEN, Number.isFinite(min) ? fmt(min).length : 0);
  const capCh = reserveDigits || baseCh + CH_GROW;
  const ch = Math.min(capCh, Math.max(baseCh, text.length));
  useLayoutEffect(() => {
    const meas = measureRef.current;
    if (!meas) return;
    const textW = (t: string) => {
      meas.textContent = t;
      return meas.getBoundingClientRect().width;
    };
    const floor = textW('0');
    if (!floor) return;
    const reserve = reserveDigits
      ? textW('0'.repeat(reserveDigits))
      : Math.max(textW('0'.repeat(CH_MIN)), Number.isFinite(max) ? textW(fmt(max)) : textW('0'.repeat(CH_OPEN)), Number.isFinite(min) ? textW(fmt(min)) : 0);
    const cap = reserveDigits ? reserve : reserve + textW('0'.repeat(CH_GROW));
    const cur = Math.min(cap, Math.max(floor, textW(text)));
    const next = { w: `${cur.toFixed(2)}px`, slack: `${Math.max(0, reserve - cur).toFixed(2)}px` };
    setMetrics((m) => (m.w === next.w && m.slack === next.slack ? m : next));
  }, [text, min, max, reserveDigits, fontsTick, size]);

  const shownError = hostError ?? (bad ? message(bad.reason) : null);
  const invalid = Boolean(shownError);
  const helperText = shownError ?? helper;
  const describedBy = [helperText ? messageId : undefined, readOnly && readOnlyReason ? reasonId : undefined].filter(Boolean).join(' ') || undefined;
  const valueText = bad ? (bad.raw === '' ? 'Empty' : bad.raw) : one || prefix || Math.abs(value) >= 1000 ? withUnit(value) : undefined;
  const atMin = value <= min;
  const atMax = value >= max;
  const subject = typeof label === 'string' ? label.toLowerCase() : '';
  const lessLabel = decreaseLabel ?? (one ? `Fewer ${other}` : subject ? `Decrease ${subject}` : 'Decrease');
  const moreLabel = increaseLabel ?? (one ? `More ${other}` : subject ? `Increase ${subject}` : 'Increase');
  const reserveUnit = one ? (other.length > one.length ? other : one) : undefined;

  const boxStyle = {
    '--cui-quantity-selector-ch': ch,
    ...(metrics.w ? { '--cui-quantity-selector-w': metrics.w, '--cui-quantity-selector-slack': metrics.slack } : {}),
  } as CSSProperties;

  return (
    <div className="cui-quantity-selector-field" data-error={invalid || undefined}>
      <label className="cui-input-field__label cui-quantity-selector__label" htmlFor={id} data-hidden={hideLabel || undefined}>
        {label}
      </label>
      <div
        className="cui-quantity-selector"
        data-size={size === 'compact' ? 'compact' : undefined}
        data-type-only={typeOnly || undefined}
        data-error={invalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        style={boxStyle}
      >
        {!typeOnly && <StepButton dir={-1} label={lessLabel} controls={id} disabled={off || atMin} onStep={(src) => stepBy(-1, step, src)} />}
        <span
          className="cui-quantity-selector__value"
          onMouseDown={(e) => {
            // A press anywhere in the value group focuses the number.
            const input = e.currentTarget.querySelector('input');
            if (input && e.target !== input && !disabled) {
              e.preventDefault();
              input.focus();
            }
          }}
        >
          {readOnly && <LockSimple className="cui-quantity-selector__lock" weight="regular" aria-hidden="true" focusable="false" />}
          {prefix && (
            <span className="cui-quantity-selector__prefix" aria-hidden="true">
              {prefix}
            </span>
          )}
          <input
            ref={(node) => setRef(ref, node)}
            id={id}
            className="cui-quantity-selector__input"
            type="text"
            inputMode={shorthand ? 'text' : 'numeric'}
            autoComplete="off"
            spellCheck={false}
            role="spinbutton"
            value={text}
            disabled={disabled}
            readOnly={readOnly}
            // A text input with role="spinbutton" doesn't reliably pass `readonly` on, so it is said too, as in the source.
            aria-readonly={readOnly || undefined}
            aria-valuemin={Number.isFinite(min) ? min : undefined}
            aria-valuemax={Number.isFinite(max) ? max : undefined}
            aria-valuenow={bad ? undefined : value}
            aria-valuetext={valueText}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (!off && dirty()) commit('blur');
            }}
          />
          {one && (
            <span className="cui-quantity-selector__unit" aria-hidden="true" data-unit-reserve={reserveUnit}>
              {unitFor(value)}
            </span>
          )}
          <span ref={measureRef} className="cui-quantity-selector__measure" aria-hidden="true" />
        </span>
        {!typeOnly && <StepButton dir={1} label={moreLabel} controls={id} disabled={off || atMax} onStep={(src) => stepBy(1, step, src)} />}
      </div>
      {helperText && (
        <span className="cui-input-field__helper cui-quantity-selector__helper" id={messageId}>
          {helperText}
        </span>
      )}
      {readOnly && readOnlyReason && (
        <span className="cui-quantity-selector__sr" id={reasonId}>
          {readOnlyReason}
        </span>
      )}
      {name && <input type="hidden" name={name} value={bad ? '' : String(value)} />}
    </div>
  );
});

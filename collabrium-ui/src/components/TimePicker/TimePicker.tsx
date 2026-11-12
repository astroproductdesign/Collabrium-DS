'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { Check, Clock } from '@phosphor-icons/react';

/**
 * ⚠️ Designed from scratch: the DLS has no Time picker (added at the user's request, 2026-11-12, library first; the DLS
 * is owed it). Built from Date picker's field (Input field's box, a leading Fill icon) and Dropdown's panel and rows.
 */

/** A time of day as 24-hour `HH:mm` ("09:30", "21:00"), whatever the clock shown. */
export type TimeValue = string;
/** A start and an end time. */
export interface TimeRange {
  start: TimeValue;
  end: TimeValue;
}

// Q-TP-2 decided 2026-11-12: the API (HH:mm values, step, min / max, hourCycle, mode); step defaults to 15 (user, 2026-11-12).
interface TimePickerBaseProps {
  /** The visible label. Always required (it names the field for screen readers too). */
  label: ReactNode;
  /** Hides the label visually where the layout already names the field; still read out. */
  hideLabel?: boolean;
  /** Shown while nothing is chosen. Default "Select time" (each field of a range: "Start" and "End"). */
  placeholder?: string;
  /** Input field's heights: `sm` 32px, `md` 40px (default), `lg` 48px. */
  size?: 'sm' | 'md' | 'lg';
  /** Minutes between the times in the list. Default 15. Any typed time inside min / max is accepted too, on the step or not ("12:03pm"). */
  step?: 5 | 10 | 15 | 20 | 30 | 60;
  /** The earliest time, `HH:mm`. Default "00:00". */
  min?: TimeValue;
  /** The latest time, `HH:mm`. Default "23:59". */
  max?: TimeValue;
  /** The clock: 12-hour ("9:30 AM", the default) or 24-hour ("09:30"). */
  hourCycle?: 12 | 24;
  /** A helper line under the field. */
  helper?: ReactNode;
  /** An error under the field (bold Red); `aria-invalid`. */
  error?: ReactNode;
  /** A Red `*` after the label and `aria-required`. */
  required?: boolean;
  /** Can't be used: Input field's disabled look. */
  disabled?: boolean;
  /** Form field name: hidden inputs carry the value (`name`; a range `name-start` and `name-end`), as `HH:mm`. */
  name?: string;
  id?: string;
}

export interface TimePickerSingleProps extends TimePickerBaseProps {
  /** One time (the default). */
  mode?: 'single';
  /** The chosen time, when you control it (`null` for none). */
  value?: TimeValue | null;
  /** The chosen time on first render, when you don't. */
  defaultValue?: TimeValue | null;
  /** Called with the picked or typed time (`null` when cleared). */
  onValueChange?: (value: TimeValue | null) => void;
}

export interface TimePickerRangeProps extends TimePickerBaseProps {
  /** A start and an end: two fields under one label. The end's list starts after the start and shows each duration. */
  mode: 'range';
  /** The chosen range, when you control it (`null` for none). */
  value?: TimeRange | null;
  /** The chosen range on first render, when you don't. */
  defaultValue?: TimeRange | null;
  /** Called whenever either end changes; `end` is empty until it is picked. */
  onValueChange?: (value: TimeRange) => void;
}

export type TimePickerProps = TimePickerSingleProps | TimePickerRangeProps;

/* ---------- Times as minutes since midnight ---------- */

const pad = (n: number) => String(n).padStart(2, '0');
const toMin = (v: TimeValue) => {
  const [h, m] = v.split(':').map(Number);
  return h * 60 + m;
};
const fromMin = (n: number): TimeValue => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;

/** "9:30 AM" (12-hour) or "09:30" (24-hour). */
export function formatTime(v: TimeValue, hourCycle: 12 | 24 = 12) {
  const n = toMin(v);
  const h = Math.floor(n / 60);
  const m = pad(n % 60);
  if (hourCycle === 24) return `${pad(h)}:${m}`;
  return `${h % 12 || 12}:${m} ${h < 12 ? 'AM' : 'PM'}`;
}

/** "30 min", "1 hr", "1 hr 30 min", "2 hrs". */
function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  const hours = `${h} hr${h === 1 ? '' : 's'}`;
  return m ? `${hours} ${m} min` : hours;
}

/**
 * Reads what was typed: "9", "930", "9:30", "9.30", "9:30pm", "9p", "21:30", "12am". Without AM or PM the hour is read on
 * the 24-hour clock ("9" is 9:00 AM, "15" is 3:00 PM). Returns null when it isn't a time.
 * Q-TP-1 decided 2026-11-12: "3" reads 3:00 AM on a 12-hour field.
 */
export function parseTime(text: string): TimeValue | null {
  const t = text.trim().toLowerCase().replace(/\s+/g, '');
  const m = /^(\d{1,2})(?:[:.]?(\d{2}))?(a|am|p|pm)?$/.exec(t);
  if (!m) return null;
  let h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  if (min > 59) return null;
  if (m[3]) {
    if (h < 1 || h > 12) return null;
    h = (h % 12) + (m[3].startsWith('p') ? 12 : 0);
  } else if (h > 23) {
    return null;
  }
  return fromMin(h * 60 + min);
}

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

interface Option {
  value: TimeValue;
  label: string;
  meta?: string;
}

/** One field: a combobox you type into, with a list of times under it. */
function TimeField({
  inputRef,
  id,
  value,
  onCommit,
  options,
  bounds,
  hourCycle,
  placeholder,
  labelledBy,
  describedBy,
  invalid,
  required,
  disabled,
}: {
  inputRef?: Ref<HTMLInputElement>;
  id: string;
  value: TimeValue | null;
  onCommit: (v: TimeValue | null) => void;
  options: Option[];
  bounds: { min: number; max: number };
  hourCycle: 12 | 24;
  placeholder: string;
  labelledBy: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}) {
  const listId = `${id}-list`;
  const shown = value ? formatTime(value, hourCycle) : '';
  const [text, setText] = useState(shown);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number } | null>(null);
  const [above, setAbove] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const ownInput = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // The field shows the committed time whenever it isn't being typed in.
  useEffect(() => {
    if (!dirty) setText(shown);
  }, [shown, dirty]);

  /** The option to highlight for a time: the first at or after it, else the last. */
  const nearest = (v: TimeValue) => {
    const n = toMin(v);
    const i = options.findIndex(o => toMin(o.value) >= n);
    return i === -1 ? options.length - 1 : i;
  };
  // Q-TP-4 decided 2026-11-12: with no value, the list opens on the time nearest now (highlighted, not chosen).
  const openList = () => {
    if (disabled || open) return;
    const now = new Date();
    setActive(value ? nearest(value) : nearest(fromMin(now.getHours() * 60 + now.getMinutes())));
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    setDirty(false);
  };
  const commit = (v: TimeValue | null) => {
    onCommit(v);
    setDirty(false);
    setText(v ? formatTime(v, hourCycle) : '');
  };
  /** A typed time: kept when it is a time inside min / max; otherwise the field goes back to what it was. */
  const commitTyped = () => {
    if (!text.trim()) {
      commit(null);
      return true;
    }
    const v = parseTime(text);
    if (v && toMin(v) >= bounds.min && toMin(v) <= bounds.max) {
      commit(v);
      return true;
    }
    setDirty(false);
    setText(shown);
    return false;
  };

  // Keep the highlighted time in view.
  useEffect(() => {
    if (!open || active < 0) return;
    const row = listRef.current?.children[active] as HTMLElement | undefined;
    row?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);
  // On opening, the chosen (or nearest) time sits in the middle of the list.
  useLayoutEffect(() => {
    if (!open || active < 0) return;
    const row = listRef.current?.children[active] as HTMLElement | undefined;
    const list = listRef.current;
    if (row && list) list.scrollTop = row.offsetTop - list.clientHeight / 2 + row.offsetHeight / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // The panel floats under the field (above when there's more room there), fixed to the window, as Date picker's.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const t = wrapRef.current?.getBoundingClientRect();
      const p = panelRef.current;
      if (!t || !p) return;
      const gap = 8;
      const h = p.offsetHeight + gap;
      const below = window.innerHeight - t.bottom;
      const up = h > below && t.top > below;
      const vw = document.documentElement.clientWidth;
      const width = Math.max(t.width, p.offsetWidth);
      const left = Math.max(gap, Math.min(t.left, vw - width - gap));
      setAbove(up);
      setPos(up ? { left, width: t.width, bottom: window.innerHeight - t.top + gap } : { left, width: t.width, top: t.bottom + gap });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="cui-input-field__wrap cui-timepicker__field" data-leading="" data-open={open || undefined}>
      <span className="cui-input-field__icon cui-input-field__icon--leading">
        <Clock className="cui-timepicker__icon" weight="fill" aria-hidden="true" focusable="false" />
      </span>
      <input
        ref={node => {
          ownInput.current = node;
          setRef(inputRef, node);
        }}
        id={id}
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        className="cui-input-field__input cui-timepicker__input"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        placeholder={placeholder}
        disabled={disabled}
        value={text}
        onClick={openList}
        onChange={e => {
          setText(e.target.value);
          setDirty(true);
          if (!open) openList();
          const v = parseTime(e.target.value);
          if (v) setActive(nearest(v));
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!open) {
              openList();
              return;
            }
            setDirty(false);
            setText(shown);
            setActive(a => Math.max(0, Math.min(options.length - 1, a + (e.key === 'ArrowDown' ? 1 : -1))));
          } else if ((e.key === 'Home' || e.key === 'End') && open && !dirty) {
            e.preventDefault();
            setActive(e.key === 'Home' ? 0 : options.length - 1);
          } else if (e.key === 'Enter') {
            if (dirty) {
              e.preventDefault();
              commitTyped();
              close();
            } else if (open && active >= 0) {
              e.preventDefault();
              commit(options[active].value);
              close();
            }
          } else if (e.key === 'Escape' && open) {
            e.preventDefault();
            e.stopPropagation();
            setText(shown);
            close();
          }
        }}
        onBlur={() => {
          if (dirty) commitTyped();
          close();
        }}
      />
      {open && (
        <div
          ref={panelRef}
          className="cui-dropdown__panel cui-timepicker__panel"
          data-above={above || undefined}
          style={
            pos
              ? ({ left: pos.left, top: pos.top ?? 'auto', bottom: pos.bottom ?? 'auto', '--cui-dropdown-anchor-w': `${pos.width}px` } as CSSProperties)
              : undefined
          }
        >
          <ul ref={listRef} id={listId} className="cui-dropdown__list" role="listbox" aria-labelledby={labelledBy}>
            {options.map((o, i) => {
              const selected = o.value === value;
              return (
                <li
                  key={o.value}
                  id={`${listId}-${i}`}
                  className="cui-dropdown__row"
                  role="option"
                  aria-selected={selected}
                  data-active={i === active || undefined}
                  onMouseDown={e => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    commit(o.value);
                    close();
                  }}
                >
                  <span className="cui-dropdown__label">{o.label}</span>
                  {o.meta && <span className="cui-dropdown__meta">{o.meta}</span>}
                  <Check className="cui-dropdown__check" weight="regular" aria-hidden="true" focusable="false" />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Collabrium Time picker: a field you type a time into, or pick one from a list of times at a step. One time, or a
 * range (a start and an end under one label, the end's list showing each duration). 12-hour by default, 24-hour by
 * prop; values are `HH:mm`. ⚠️ Designed from scratch (no DLS source), on Date picker's field and Dropdown's list.
 */
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(props, ref) {
  const {
    label,
    hideLabel = false,
    size = 'md',
    step = 15,
    min = '00:00',
    max = '23:59',
    hourCycle = 12,
    helper,
    error,
    required = false,
    disabled = false,
    name,
    id: idProp,
  } = props;
  const range = props.mode === 'range';
  const r = props as TimePickerRangeProps;
  const s = props as TimePickerSingleProps;

  const uid = useId();
  const id = idProp ?? `${uid}-input`;
  const labelId = `${uid}-label`;
  const startId = `${uid}-start-name`;
  const endId = `${uid}-end-name`;
  const messageId = `${uid}-message`;
  const invalid = Boolean(error);
  const message = error ?? helper;

  const [ownOne, setOwnOne] = useState<TimeValue | null>(range ? null : (s.defaultValue ?? null));
  const [ownRange, setOwnRange] = useState<TimeRange | null>(range ? (r.defaultValue ?? null) : null);
  const one = range ? null : s.value !== undefined ? s.value : ownOne;
  const pair = range ? (r.value !== undefined ? r.value : ownRange) : null;

  const bounds = { min: toMin(min), max: toMin(max) };
  const options = useMemo(() => {
    const out: Option[] = [];
    for (let n = bounds.min; n <= bounds.max; n += step) out.push({ value: fromMin(n), label: formatTime(fromMin(n), hourCycle) });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds.min, bounds.max, step, hourCycle]);
  // The end's list: from one step after the start, each with its duration.
  const endOptions = useMemo(() => {
    if (!pair?.start) return options.map(o => ({ ...o }));
    const s0 = toMin(pair.start);
    const out: Option[] = [];
    for (let n = s0 + step; n <= bounds.max; n += step) {
      out.push({ value: fromMin(n), label: formatTime(fromMin(n), hourCycle), meta: formatDuration(n - s0) });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair?.start, options, step, bounds.max, hourCycle]);

  const setOne = (v: TimeValue | null) => {
    if (s.value === undefined) setOwnOne(v);
    s.onValueChange?.(v);
  };
  const setPair = (next: TimeRange) => {
    if (r.value === undefined) setOwnRange(next);
    r.onValueChange?.(next);
  };
  /** A new start keeps the duration when an end was set, inside max; an end at or before the start is dropped.
   * Q-TP-3 decided 2026-11-12. */
  const setStart = (v: TimeValue | null) => {
    if (!v) {
      setPair({ start: '', end: pair?.end ?? '' });
      return;
    }
    let end = pair?.end ?? '';
    if (pair?.start && end) {
      const kept = toMin(v) + (toMin(end) - toMin(pair.start));
      end = kept <= bounds.max ? fromMin(kept) : '';
    }
    if (end && toMin(end) <= toMin(v)) end = '';
    setPair({ start: v, end });
  };
  const setEnd = (v: TimeValue | null) => {
    if (v && pair?.start && toMin(v) <= toMin(pair.start)) {
      setPair({ start: pair.start, end: '' });
      return;
    }
    setPair({ start: pair?.start ?? '', end: v ?? '' });
  };

  const common = {
    bounds,
    hourCycle,
    describedBy: message ? messageId : undefined,
    invalid,
    required,
    disabled,
  } as const;

  return (
    <div
      className="cui-input-field cui-timepicker"
      data-size={size === 'md' ? undefined : size}
      data-range={range || undefined}
      data-error={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {range ? (
        <span className="cui-input-field__label" id={labelId} data-hidden={hideLabel || undefined}>
          {label}
          {required && (
            <span className="cui-input-field__required" aria-hidden="true">
              *
            </span>
          )}
        </span>
      ) : (
        <label className="cui-input-field__label" id={labelId} htmlFor={id} data-hidden={hideLabel || undefined}>
          {label}
          {required && (
            <span className="cui-input-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {range ? (
        <div className="cui-timepicker__range" role="group" aria-labelledby={labelId}>
          <span id={startId} className="cui-timepicker__sr">
            Start time
          </span>
          <span id={endId} className="cui-timepicker__sr">
            End time
          </span>
          <TimeField
            {...common}
            inputRef={ref}
            id={id}
            value={pair?.start || null}
            onCommit={setStart}
            options={options}
            placeholder={props.placeholder ?? 'Start'}
            labelledBy={`${labelId} ${startId}`}
          />
          <span className="cui-timepicker__dash" aria-hidden="true">
            –
          </span>
          <TimeField
            {...common}
            id={`${uid}-end`}
            value={pair?.end || null}
            onCommit={setEnd}
            options={endOptions}
            bounds={{ min: pair?.start ? toMin(pair.start) + 1 : bounds.min, max: bounds.max }}
            placeholder={props.placeholder ?? 'End'}
            labelledBy={`${labelId} ${endId}`}
          />
        </div>
      ) : (
        <TimeField
          {...common}
          inputRef={ref}
          id={id}
          value={one}
          onCommit={setOne}
          options={options}
          placeholder={props.placeholder ?? 'Select time'}
          labelledBy={labelId}
        />
      )}
      {name &&
        (range ? (
          <>
            <input type="hidden" name={`${name}-start`} value={pair?.start ?? ''} />
            <input type="hidden" name={`${name}-end`} value={pair?.end ?? ''} />
          </>
        ) : (
          <input type="hidden" name={name} value={one ?? ''} />
        ))}
      {message && (
        <span className="cui-input-field__helper" id={messageId}>
          {message}
        </span>
      )}
    </div>
  );
});

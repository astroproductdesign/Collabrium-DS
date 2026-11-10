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
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { Calendar, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from '../Button';

/** A calendar date as `YYYY-MM-DD` (no time, no time zone). */
export type IsoDate = string;
/** A range of dates. `end` is empty while only the start has been picked. */
export interface DateRange {
  start: IsoDate;
  end: IsoDate;
}

interface DatePickerBaseProps {
  /** The visible label. Always required (it names the field for screen readers too). */
  label: ReactNode;
  /** Hides the label visually where the layout already names the field; still read out. */
  hideLabel?: boolean;
  /** Shown while nothing is chosen. Default "Select date" (or "Select dates" for a range). */
  placeholder?: string;
  /** Input field's heights: `sm` 32px, `md` 40px (default), `lg` 48px. */
  size?: 'sm' | 'md' | 'lg';
  /** The earliest date that can be picked. */
  min?: IsoDate;
  /** The latest date that can be picked. */
  max?: IsoDate;
  /** Any other date that can't be picked (a holiday, a full day). */
  isDateDisabled?: (date: IsoDate) => boolean;
  /** The week's first day: 1 Monday (default; decided 2026-11-10, Q-DP-8), 0 Sunday. */
  weekStartsOn?: 0 | 1;
  /** A helper line under the box. */
  helper?: ReactNode;
  /** An error under the box (bold Red); `aria-invalid`. */
  error?: ReactNode;
  /** A Red `*` after the label and `aria-required`. */
  required?: boolean;
  /** Can't be used: Input field's disabled look. */
  disabled?: boolean;
  /** Form field name: hidden inputs carry the value (`name` for one date; `name-start` and `name-end` for a range). */
  name?: string;
  id?: string;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  /** One date (the default): picking a day commits it and closes. */
  mode?: 'single';
  /** The chosen date, when you control it (`null` for none). */
  value?: IsoDate | null;
  /** The chosen date on first render, when you don't. */
  defaultValue?: IsoDate | null;
  /** Called with the picked date. */
  onValueChange?: (value: IsoDate) => void;
  applyLabel?: never;
  cancelLabel?: never;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  /** A start and an end date: pick both, then Apply (Cancel keeps the old range). */
  mode: 'range';
  /** The chosen range, when you control it (`null` for none). */
  value?: DateRange | null;
  /** The chosen range on first render, when you don't. */
  defaultValue?: DateRange | null;
  /** Called with the range on Apply. */
  onValueChange?: (value: DateRange) => void;
  /** The footer's buttons. Default "Apply" and "Cancel". */
  applyLabel?: string;
  cancelLabel?: string;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

/* ---------- Calendar dates as YYYY-MM-DD, worked out at local noon so no time zone or DST shift can move a day ---------- */

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number): IsoDate => {
  const dt = new Date(y, m, d, 12);
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
};
const parse = (v: IsoDate) => {
  const [y, m, d] = v.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
};
const addDays = (v: IsoDate, n: number) => {
  const d = parse(v);
  return iso(d.getFullYear(), d.getMonth(), d.getDate() + n);
};
/** Months forward or back, keeping the day where the month allows (31 Jan + 1 month = 28 or 29 Feb). */
const addMonths = (v: IsoDate, n: number) => {
  const d = parse(v);
  const last = new Date(d.getFullYear(), d.getMonth() + n + 1, 0, 12).getDate();
  return iso(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), last));
};
const todayIso = () => {
  const d = new Date();
  return iso(d.getFullYear(), d.getMonth(), d.getDate());
};

// Day first, as the DS writes dates elsewhere ("12 Oct 2026") and as dates are read in Malaysia (decided 2026-11-10,
// Q-DP-3): "12 Jul 2026"; a range "12 – 24 Jul 2026", "28 Jul – 3 Aug 2026", "28 Dec 2025 – 3 Jan 2026". Month names
// are written out, so no locale data turns "Sep" into "Sept".
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dmy = (d: Date) => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
const fmtDayName = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const fmtWeekdayNarrow = new Intl.DateTimeFormat('en-US', { weekday: 'narrow' });
const fmtWeekdayLong = new Intl.DateTimeFormat('en-GB', { weekday: 'long' });

function formatValue(mode: 'single' | 'range', one: IsoDate | null, range: DateRange | null) {
  if (mode === 'single') return one ? dmy(parse(one)) : null;
  if (!range?.start || !range.end) return null;
  const a = parse(range.start);
  const b = parse(range.end);
  if (a.getFullYear() !== b.getFullYear()) return `${dmy(a)} – ${dmy(b)}`;
  if (a.getMonth() !== b.getMonth()) return `${a.getDate()} ${MONTHS_SHORT[a.getMonth()]} – ${dmy(b)}`;
  return `${a.getDate()} – ${dmy(b)}`;
}

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

/**
 * Collabrium Date picker: a trigger on Input field's box (a leading calendar, the date or a placeholder) that opens a
 * month calendar. One date, picked and closed; or a range, with a Cancel / Apply footer. Ported from components.css
 * `.c-dp-*` (3808–3825).
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(props, ref) {
  const {
    label,
    hideLabel = false,
    size = 'md',
    min,
    max,
    isDateDisabled,
    weekStartsOn = 1,
    helper,
    error,
    required = false,
    disabled = false,
    name,
    id: idProp,
  } = props;
  const range = props.mode === 'range';
  const r = props as DatePickerRangeProps;
  const s = props as DatePickerSingleProps;
  const placeholder = props.placeholder ?? (range ? 'Select dates' : 'Select date');

  const uid = useId();
  const id = idProp ?? `${uid}-trigger`;
  const labelId = `${uid}-label`;
  const valueId = `${uid}-value`;
  const monthId = `${uid}-month`;
  const messageId = `${uid}-message`;

  const [ownOne, setOwnOne] = useState<IsoDate | null>(range ? null : (s.defaultValue ?? null));
  const [ownRange, setOwnRange] = useState<DateRange | null>(range ? (r.defaultValue ?? null) : null);
  const one = range ? null : s.value !== undefined ? s.value : ownOne;
  const committed = range ? (r.value !== undefined ? r.value : ownRange) : null;

  const [open, setOpen] = useState(false);
  // Today is read in the browser (not at build time), so a static page never shows a stale "today".
  const [today, setToday] = useState<IsoDate | null>(null);
  useEffect(() => setToday(todayIso()), []);
  // The day the keyboard is on; the calendar shows its month.
  const [active, setActive] = useState<IsoDate>(() => one ?? committed?.start ?? todayIso());
  // A range being picked, before Apply.
  const [draft, setDraft] = useState<DateRange | null>(null);
  // What the calendar shows: days, or the month or year grid the header opens (designed here, not in the DS; decided
  // 2026-11-10, the user: so a date years away, such as a birthday, is a few presses, not decades of paging).
  const [pane, setPane] = useState<'days' | 'months' | 'years'>('days');
  const [above, setAbove] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number } | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const focusDay = useRef(false);
  // The days grid's height, kept by the month and year grids so the calendar doesn't change size as you switch.
  const bodyHeight = useRef(0);

  const invalid = Boolean(error);
  const message = error ?? helper;
  const shown = formatValue(range ? 'range' : 'single', one, committed);

  const blocked = (d: IsoDate) => (min !== undefined && d < min) || (max !== undefined && d > max) || Boolean(isDateDisabled?.(d));

  const view = parse(active);
  const viewYear = view.getFullYear();
  const viewMonth = view.getMonth();

  // Six weeks, always, so Prev / Next never move under the pointer as the months change length (Q-DP-6).
  const weeks = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1, 12);
    const lead = (first.getDay() - weekStartsOn + 7) % 7;
    const start = iso(viewYear, viewMonth, 1 - lead);
    return Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)));
  }, [viewYear, viewMonth, weekStartsOn]);
  const weekdays = useMemo(
    () => weeks[0].map((d) => ({ narrow: fmtWeekdayNarrow.format(parse(d)), long: fmtWeekdayLong.format(parse(d)) })),
    [weeks],
  );

  const openPanel = () => {
    if (disabled) return;
    const start = range ? committed : null;
    setDraft(start ? { ...start } : null);
    let a = one ?? start?.start ?? todayIso();
    if (min && a < min) a = min;
    if (max && a > max) a = max;
    setActive(a);
    setAbove(false);
    setPane('days');
    focusDay.current = true;
    setOpen(true);
  };
  const close = (returnFocus: boolean) => {
    setOpen(false);
    setPane('days');
    setDraft(null);
    if (returnFocus) triggerRef.current?.focus();
  };

  const pick = (d: IsoDate) => {
    if (blocked(d)) return;
    setActive(d);
    if (!range) {
      if (s.value === undefined) setOwnOne(d);
      s.onValueChange?.(d);
      close(true);
      return;
    }
    // A range: the first press sets the start; the second sets the end (or a new start when it's earlier).
    setDraft((prev) => {
      if (!prev?.start || prev.end) return { start: d, end: '' };
      if (d < prev.start) return { start: d, end: '' };
      return { start: prev.start, end: d };
    });
  };
  const apply = () => {
    if (!draft?.start || !draft.end) return;
    if (r.value === undefined) setOwnRange(draft);
    r.onValueChange?.(draft);
    close(true);
  };

  // Opening moves focus to the chosen day (or today), and switching to the month or year grid moves it to the current
  // one there: the calendar is driven from the keyboard (decided 2026-11-10, Q-DP-1).
  useEffect(() => {
    if (!open || !focusDay.current) return;
    focusDay.current = false;
    const cell = gridRef.current?.querySelector<HTMLElement>('[tabindex="0"]');
    cell?.focus();
    if (pane === 'years') cell?.scrollIntoView({ block: 'center' });
  }, [open, active, pane]);

  useLayoutEffect(() => {
    if (open && pane === 'days' && gridRef.current) bodyHeight.current = gridRef.current.offsetHeight;
  });

  // The year grid: newest first (decided 2026-11-10, the user), from max's year (or 20 ahead) down to min's year (or
  // 100 years back), always including the shown year.
  const thisYear = parse(today ?? todayIso()).getFullYear();
  const firstYear = Math.min(min ? parse(min).getFullYear() : thisYear - 100, viewYear);
  const lastYear = Math.max(max ? parse(max).getFullYear() : thisYear + 20, viewYear);
  const monthOff = (y: number, m: number) =>
    (min !== undefined && iso(y, m + 1, 0) < min) || (max !== undefined && iso(y, m, 1) > max);
  const yearOff = (y: number) => (min !== undefined && `${y}-12-31` < min) || (max !== undefined && `${y}-01-01` > max);
  /** Moves the calendar to a month (keeping the day where it can, inside min / max). */
  const goTo = (y: number, m: number) => {
    const last = new Date(y, m + 1, 0, 12).getDate();
    let d = iso(y, m, Math.min(parse(active).getDate(), last));
    if (min && d < min) d = min;
    if (max && d > max) d = max;
    return d;
  };
  const showPane = (next: 'days' | 'months' | 'years') => {
    focusDay.current = true;
    setPane(next);
  };
  const pickMonth = (m: number) => {
    if (monthOff(viewYear, m)) return;
    focusDay.current = true;
    setActive(goTo(viewYear, m));
    setPane('days');
  };
  const pickYear = (y: number) => {
    if (yearOff(y)) return;
    focusDay.current = true;
    setActive(goTo(y, viewMonth));
    setPane('months');
  };
  const onPickKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const cols = pane === 'months' ? 3 : 4;
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -cols, ArrowDown: cols };
    if (e.key === 'Escape') {
      // Back to the days, not closed.
      e.preventDefault();
      e.stopPropagation();
      showPane('days');
      return;
    }
    if (pane === 'months') {
      if (step[e.key] !== undefined) {
        e.preventDefault();
        const m = Math.min(11, Math.max(0, viewMonth + step[e.key]));
        focusDay.current = true;
        setActive(goTo(viewYear, m));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pickMonth(viewMonth);
      }
    } else if (pane === 'years') {
      // Newest first: moving right or down goes back in time.
      const page: Record<string, number> = { PageUp: -cols * 4, PageDown: cols * 4, Home: viewYear - lastYear, End: viewYear - firstYear };
      const by = step[e.key] !== undefined ? step[e.key] : page[e.key];
      if (by !== undefined) {
        e.preventDefault();
        const y = Math.min(lastYear, Math.max(firstYear, viewYear - by));
        focusDay.current = true;
        setActive(goTo(y, viewMonth));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pickYear(viewYear);
      }
    }
  };

  // Placement: fixed to the window, 8px under the trigger (above when it doesn't fit below and there's more room
  // there), its left edge on the trigger's but kept inside the window. No clipping box can cut it (as Dropdown).
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const t = triggerRef.current?.getBoundingClientRect();
      const p = panelRef.current;
      if (!t || !p) return;
      const gap = 8;
      const h = p.offsetHeight + gap;
      const below = window.innerHeight - t.bottom;
      const up = h > below && t.top > below;
      const vw = document.documentElement.clientWidth;
      const left = Math.max(gap, Math.min(t.left, vw - p.offsetWidth - gap));
      setAbove(up);
      setPos(up ? { left, bottom: window.innerHeight - t.top + gap } : { left, top: t.bottom + gap });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  // A press outside closes it (a range's draft is dropped, as Cancel).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const move = (to: IsoDate) => {
    focusDay.current = true;
    setActive(to);
  };
  const onGridKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = parse(active);
    const dow = (d.getDay() - weekStartsOn + 7) % 7;
    const keys: Record<string, () => IsoDate> = {
      ArrowLeft: () => addDays(active, -1),
      ArrowRight: () => addDays(active, 1),
      ArrowUp: () => addDays(active, -7),
      ArrowDown: () => addDays(active, 7),
      Home: () => addDays(active, -dow),
      End: () => addDays(active, 6 - dow),
      PageUp: () => addMonths(active, e.shiftKey ? -12 : -1),
      PageDown: () => addMonths(active, e.shiftKey ? 12 : 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      move(keys[e.key]());
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(active);
    }
  };

  const sel = range ? (draft ?? committed) : null;
  const dayState = (d: IsoDate) => {
    if (!range) return d === one ? 'selected' : undefined;
    if (!sel?.start) return undefined;
    if (!sel.end) return d === sel.start ? 'selected' : undefined;
    if (sel.start === sel.end) return d === sel.start ? 'selected' : undefined;
    if (d === sel.start) return 'start';
    if (d === sel.end) return 'end';
    return d > sel.start && d < sel.end ? 'middle' : undefined;
  };

  return (
    <div
      ref={rootRef}
      className="cui-input-field cui-datepicker"
      data-size={size === 'md' ? undefined : size}
      data-open={open || undefined}
      data-filled={shown ? '' : undefined}
      data-error={invalid || undefined}
      data-disabled={disabled || undefined}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.preventDefault();
          // From the month or year grid, Escape goes back to the days; from the days, it closes.
          if (pane !== 'days') showPane('days');
          else close(true);
        }
      }}
      onBlur={(e) => {
        // Leaving the field (trigger and calendar) closes it.
        if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) close(false);
      }}
    >
      <label className="cui-input-field__label" id={labelId} htmlFor={id} data-hidden={hideLabel || undefined}>
        {label}
        {required && (
          <span className="cui-input-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="cui-input-field__wrap" data-leading="">
        <span className="cui-input-field__icon cui-input-field__icon--leading">
          {/* Tier 2, Fill, as the DS keeps it (Iconography's "Calendar … Fill" example). */}
          <Calendar className="cui-datepicker__icon" weight="fill" aria-hidden="true" focusable="false" />
        </span>
        <button
          ref={(node) => {
            triggerRef.current = node;
            setRef(ref, node);
          }}
          id={id}
          type="button"
          className="cui-input-field__input cui-datepicker__trigger"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? messageId : undefined}
          onClick={() => (open ? close(false) : openPanel())}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault();
              openPanel();
            }
          }}
        >
          <span className="cui-datepicker__value" id={valueId} data-placeholder={shown ? undefined : ''}>
            {shown ?? placeholder}
          </span>
        </button>
      </div>
      {open && (
        <div
          ref={panelRef}
          className="cui-datepicker__panel"
          role="dialog"
          aria-label={range ? 'Choose dates' : 'Choose date'}
          data-above={above || undefined}
          style={pos ? ({ left: pos.left, top: pos.top ?? 'auto', bottom: pos.bottom ?? 'auto' } as CSSProperties) : undefined}
        >
          <div className="cui-datepicker__header" data-pane={pane}>
            {/* Days: a month either way. Months: a year either way. Years: hidden (the grid scrolls), keeping its place. */}
            <span className="cui-datepicker__nav">
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={CaretLeft}
                aria-label={pane === 'days' ? 'Previous month' : 'Previous year'}
                onClick={() => setActive(pane === 'days' ? addMonths(active, -1) : goTo(viewYear - 1, viewMonth))}
              />
            </span>
            <span className="cui-datepicker__title">
              <button
                type="button"
                className="cui-datepicker__switch"
                aria-pressed={pane === 'months'}
                aria-label={`Choose month, ${MONTHS_LONG[viewMonth]}`}
                onClick={() => showPane(pane === 'months' ? 'days' : 'months')}
              >
                {MONTHS_LONG[viewMonth]}
              </button>
              <button
                type="button"
                className="cui-datepicker__switch"
                aria-pressed={pane === 'years'}
                aria-label={`Choose year, ${viewYear}`}
                onClick={() => showPane(pane === 'years' ? 'days' : 'years')}
              >
                {viewYear}
              </button>
            </span>
            <span className="cui-datepicker__nav">
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={CaretRight}
                aria-label={pane === 'days' ? 'Next month' : 'Next year'}
                onClick={() => setActive(pane === 'days' ? addMonths(active, 1) : goTo(viewYear + 1, viewMonth))}
              />
            </span>
          </div>
          <span className="cui-datepicker__sr" id={monthId}>
            {MONTHS_LONG[viewMonth]} {viewYear}
          </span>
          <div
            ref={gridRef}
            className="cui-datepicker__body"
            data-pane={pane}
            style={pane !== 'days' && bodyHeight.current ? { height: bodyHeight.current } : undefined}
            onKeyDown={pane === 'days' ? onGridKey : onPickKey}
          >
          {pane === 'days' && (
          <table className="cui-datepicker__grid" role="grid" aria-labelledby={monthId}>
            <thead>
              <tr>
                {weekdays.map((w, i) => (
                  <th key={i} scope="col" className="cui-datepicker__weekday" abbr={w.long}>
                    <span aria-hidden="true">{w.narrow}</span>
                    <span className="cui-datepicker__sr">{w.long}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, w) => (
                <tr key={w}>
                  {week.map((d) => {
                    const dt = parse(d);
                    const outside = dt.getMonth() !== viewMonth;
                    const off = outside || blocked(d);
                    const state = outside ? undefined : dayState(d);
                    return (
                      <td
                        key={d}
                        className="cui-datepicker__cell"
                        tabIndex={d === active && !outside ? 0 : -1}
                        aria-selected={state ? true : undefined}
                        aria-disabled={off || undefined}
                        aria-current={d === today ? 'date' : undefined}
                        aria-label={fmtDayName.format(dt)}
                        data-outside={outside || undefined}
                        data-state={state}
                        data-today={d === today || undefined}
                        onClick={() => !outside && pick(d)}
                      >
                        <span className="cui-datepicker__day" aria-hidden="true">
                          {dt.getDate()}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          )}
          {pane === 'months' && (
            <table className="cui-datepicker__grid" role="grid" aria-label={`Months, ${viewYear}`}>
              <tbody>
                {[0, 1, 2, 3].map((row) => (
                  <tr key={row}>
                    {[0, 1, 2].map((col) => {
                      const m = row * 3 + col;
                      const isToday = today !== null && parse(today).getFullYear() === viewYear && parse(today).getMonth() === m;
                      return (
                        <td
                          key={m}
                          className="cui-datepicker__cell"
                          tabIndex={m === viewMonth ? 0 : -1}
                          aria-selected={m === viewMonth || undefined}
                          aria-disabled={monthOff(viewYear, m) || undefined}
                          aria-current={isToday ? 'date' : undefined}
                          aria-label={`${MONTHS_LONG[m]} ${viewYear}`}
                          data-state={m === viewMonth ? 'selected' : undefined}
                          data-today={isToday || undefined}
                          onClick={() => pickMonth(m)}
                        >
                          <span className="cui-datepicker__day cui-datepicker__pick" aria-hidden="true">
                            {MONTHS_SHORT[m]}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {pane === 'years' && (
            <table className="cui-datepicker__grid" role="grid" aria-label="Years">
              <tbody>
                {Array.from({ length: Math.ceil((lastYear - firstYear + 1) / 4) }, (_, row) => (
                  <tr key={row}>
                    {[0, 1, 2, 3].map((col) => {
                      const y = lastYear - (row * 4 + col);
                      if (y < firstYear) return <td key={col} className="cui-datepicker__cell" aria-hidden="true" />;
                      return (
                        <td
                          key={y}
                          className="cui-datepicker__cell"
                          tabIndex={y === viewYear ? 0 : -1}
                          aria-selected={y === viewYear || undefined}
                          aria-disabled={yearOff(y) || undefined}
                          aria-current={y === thisYear && today !== null ? 'date' : undefined}
                          aria-label={String(y)}
                          data-state={y === viewYear ? 'selected' : undefined}
                          data-today={(y === thisYear && today !== null) || undefined}
                          onClick={() => pickYear(y)}
                        >
                          <span className="cui-datepicker__day cui-datepicker__pick" aria-hidden="true">
                            {y}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
          {range && (
            <div className="cui-datepicker__footer">
              <Button variant="secondary" onClick={() => close(true)}>
                {r.cancelLabel ?? 'Cancel'}
              </Button>
              <Button variant="primary" onClick={apply} disabled={!draft?.start || !draft.end}>
                {r.applyLabel ?? 'Apply'}
              </Button>
            </div>
          )}
        </div>
      )}
      {name &&
        (range ? (
          <>
            <input type="hidden" name={`${name}-start`} value={committed?.start ?? ''} />
            <input type="hidden" name={`${name}-end`} value={committed?.end ?? ''} />
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

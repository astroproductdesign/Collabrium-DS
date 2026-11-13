'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { ArrowLeft, CaretDown, Check, MagnifyingGlass, Minus, SlidersHorizontal, X } from '@phosphor-icons/react';
import { Button } from '../Button';
import { InputChipGroup } from '../Chip';
import type { WithoutStyling } from '../../utils/types';

/** One choice inside a dimension. */
export interface FilterOption {
  /** Unique within the dimension; what the value holds. */
  value: string;
  /** What the row and the applied chip show ("Marketing"). */
  label: string;
}

/** One thing the view can be narrowed by ("Department"), and its choices. */
export interface FilterDimension {
  /** Unique across the bar; the key in the value object (and in the URL, with `filtersToSearchParams`). */
  key: string;
  /** The trigger's label and the panel's title ("Department"). */
  label: string;
  /** The choices, in the order they list and their chips appear. */
  options: FilterOption[];
  /** Greys this dimension's trigger out (its count is hidden). */
  disabled?: boolean;
  /**
   * A pinned "Select all" row at the top of the panel, as Dropdown's Multiple select. Only for long lists (about 8 or
   * more values), where "all but a few" is quicker to tick; on a short list it's one more row for nothing.
   */
  selectAll?: boolean;
}

/** The applied values: each dimension's key and the option values it holds. A missing key holds nothing. */
export type FilterValue = Record<string, string[]>;

/** `edge`: the bar starts at its container's edge. `table`: 16px in, lined up with an embedded Table's column text. */
export type FiltersAlign = 'edge' | 'table';

/** `default`: a named trigger per dimension. `compact`: one "Filter" trigger listing every dimension. */
export type FiltersVariant = 'default' | 'compact';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'aria-label' | 'defaultValue' | 'onChange'>>;

export interface FiltersProps extends NativeDivProps {
  /**
   * The dimensions. Default: one named trigger each, 4–6 of them (the primary tier when `moreDimensions` is given).
   * Compact: every dimension, behind the one "Filter" trigger.
   */
  dimensions: FilterDimension[];
  /**
   * `default` unless filtering has to fit a narrow space (a sidebar panel, a dense toolbar): then `compact`, whatever
   * the dimension count. Never both in one view.
   */
  variant?: FiltersVariant;
  /**
   * Default only. Past about 8 dimensions: the secondary tier, always behind "More filters" (Tiered exposure). Chosen
   * once per view, never by width or usage.
   */
  moreDimensions?: FilterDimension[];
  /** The applied values, controlled. Update it from `onValueChange`. */
  value?: FilterValue;
  /** The applied values on first render, uncontrolled (a value restored from the URL, for example). */
  defaultValue?: FilterValue;
  /** Values were applied: Done in a panel, a chip's ×, or Clear all. Never on a tick inside an open panel. */
  onValueChange?: (value: FilterValue) => void;
  /** Shows the search box first in the bar. Only when the data is large enough to need text search too. */
  search?: boolean;
  /** The search text, controlled. */
  searchValue?: string;
  /** The search text on first render, uncontrolled. */
  defaultSearchValue?: string;
  /** Called on every change to the search text (the × included). Debounce before querying. */
  onSearchChange?: (text: string) => void;
  /** The search box's placeholder. Default "Search…". */
  searchPlaceholder?: string;
  /** The search box's accessible name. Default "Search". */
  searchLabel?: string;
  /**
   * Shows the applied filters as chips in a tray under the bar. Default true. Turn it off only when the page shows
   * them elsewhere; the bar then carries "Clear All" instead.
   */
  showApplied?: boolean;
  /**
   * `table` when it sits directly above an embedded Table in the same card: the bar and the tray move 16px in (the
   * table's cell padding), so the search box starts where the column text does. Default `edge`.
   */
  align?: FiltersAlign;
  /** Names the whole group. Default "Filters". */
  label?: string;
  /** Greys out every trigger, the search box and the chips. */
  disabled?: boolean;
}

/** How many applied chips show before the rest fold into "+N" (the DS's cap for this tray; Chip's own default is 3). */
const TRAY_CAP = 5;
const GAP = 8;

const countOf = (value: FilterValue, dim: FilterDimension) =>
  (value[dim.key] ?? []).filter((v) => dim.options.some((o) => o.value === v)).length;
const sumOf = (value: FilterValue, dims: FilterDimension[]) => dims.reduce((n, d) => n + countOf(value, d), 0);
const triggerName = (label: string, n: number) => (n > 0 ? `${label}, ${n} applied` : label);

// ---------------------------------------------------------------------------------------------------------------
// Panel placement: fixed to the window at the trigger (8px under it), so no box that hides its overflow clips it.
// Left-aligned to the trigger; right-aligned when that would cross the window's right edge (the DS's edge collision);
// above when it doesn't fit below and there's more room above (as Dropdown). Re-checked on resize and scroll.
// ---------------------------------------------------------------------------------------------------------------
type Pos = { left: number; top?: number; bottom?: number };

function usePanelPlace(open: boolean, anchorRef: { current: HTMLElement | null }, panelRef: { current: HTMLElement | null }, deps: unknown[]) {
  const [pos, setPos] = useState<Pos | null>(null);
  const upRef = useRef(false);
  useLayoutEffect(() => {
    if (!open) {
      upRef.current = false;
      return;
    }
    const place = () => {
      const a = anchorRef.current?.getBoundingClientRect();
      const p = panelRef.current;
      if (!a || !p) return;
      const w = p.offsetWidth;
      const h = p.offsetHeight + GAP;
      const vw = document.documentElement.clientWidth;
      const left = a.left + w > vw - GAP ? Math.max(GAP, a.right - w) : a.left;
      const below = window.innerHeight - a.bottom;
      const up = upRef.current || (h > below && a.top > below);
      upRef.current = up;
      setPos(up ? { left, bottom: window.innerHeight - a.top + GAP } : { left, top: a.bottom + GAP });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ...deps]);
  return pos;
}

/** Closes on a press outside the trigger and its panel (a click away; Safari doesn't focus a clicked button, so blur alone misses it). */
function useOutsidePress(open: boolean, rootRef: { current: HTMLElement | null }, onOutside: () => void) {
  const cb = useRef(onOutside);
  cb.current = onOutside;
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) cb.current();
    };
    document.addEventListener('pointerdown', down, true);
    return () => document.removeEventListener('pointerdown', down, true);
  }, [open, rootRef]);
}

const panelStyle = (pos: Pos | null): CSSProperties | undefined =>
  pos ? { left: pos.left, top: pos.top ?? 'auto', bottom: pos.bottom ?? 'auto' } : undefined;

// ---------------------------------------------------------------------------------------------------------------
// The option list: Dropdown's Multiple select rows (Checkbox's box, Neutral-2 hover), driven by aria-activedescendant
// from whatever holds focus (the trigger for a named dimension, the list itself inside a nested panel).
// ---------------------------------------------------------------------------------------------------------------
function useOptionList(options: FilterOption[], pending: string[], setPending: (next: string[]) => void, all = false) {
  const [active, setActive] = useState(-1);
  const typeahead = useRef({ text: '', at: 0 });
  // With Select all, row 0 is that row and the options follow it.
  const offset = all ? 1 : 0;
  const toggle = (i: number) => {
    if (all && i === 0) {
      // Ticks every option; when every one is already ticked, clears them (Dropdown's Select all).
      setPending(options.every((o) => pending.includes(o.value)) ? [] : options.map((o) => o.value));
      return;
    }
    const o = options[i - offset];
    if (!o) return;
    setPending(pending.includes(o.value) ? pending.filter((v) => v !== o.value) : [...pending, o.value]);
  };
  const reset = (values: string[]) => {
    const first = options.findIndex((o) => values.includes(o.value));
    setActive(first >= 0 ? first + offset : 0);
  };
  /** Handles a key for the list; returns true when it used it. */
  const onListKey = (e: KeyboardEvent<HTMLElement>) => {
    const last = options.length - 1 + offset;
    switch (e.key) {
      case 'ArrowDown':
        setActive((i) => Math.min(last, i + 1));
        break;
      case 'ArrowUp':
        setActive((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        setActive(0);
        break;
      case 'End':
        setActive(last);
        break;
      case 'Enter':
      case ' ':
        toggle(active);
        break;
      default: {
        if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return false;
        // Type-ahead, as Dropdown: jumps to the first option starting with what was typed; resets after about 1s.
        const now = Date.now();
        const t = typeahead.current;
        t.text = now - t.at > 1000 ? e.key.toLowerCase() : t.text + e.key.toLowerCase();
        t.at = now;
        const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(t.text));
        if (hit >= 0) setActive(hit + offset);
      }
    }
    e.preventDefault();
    return true;
  };
  return { active, setActive, toggle, reset, onListKey };
}

function OptionRows({
  id,
  options,
  pending,
  active,
  onPick,
  onHover,
  selectAll = false,
  ...listProps
}: {
  id: string;
  options: FilterOption[];
  pending: string[];
  active: number;
  onPick: (i: number) => void;
  onHover: (i: number) => void;
  selectAll?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const offset = selectAll ? 1 : 0;
  const ticked = options.filter((o) => pending.includes(o.value)).length;
  const allState = ticked === 0 ? 'off' : ticked === options.length ? 'checked' : 'mixed';
  const listRef = useRef<HTMLDivElement | null>(null);
  // Keep the keyboard's row in view when the list scrolls.
  useEffect(() => {
    const row = document.getElementById(`${id}-${active}`);
    const list = listRef.current;
    if (!row || !list) return;
    const r = row.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    if (r.top < l.top) list.scrollTop -= l.top - r.top;
    else if (r.bottom > l.bottom) list.scrollTop += r.bottom - l.bottom;
  }, [active, id]);
  return (
    <div {...listProps} ref={listRef} id={id} role="listbox" aria-multiselectable="true" className="cui-filters__list">
      {selectAll && (
        <>
          <div
            id={`${id}-0`}
            role="option"
            aria-selected={allState === 'checked'}
            className="cui-filters__option"
            data-all=""
            data-active={active === 0 ? '' : undefined}
            onMouseMove={() => active !== 0 && onHover(0)}
            onClick={() => onPick(0)}
          >
            <span className="cui-checkbox__box" data-state={allState} aria-hidden="true">
              {allState === 'checked' && <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />}
              {allState === 'mixed' && <Minus className="cui-checkbox__glyph cui-checkbox__minus" weight="regular" focusable="false" />}
            </span>
            <span className="cui-filters__option-label">
              Select all
              {/* Partly ticked: an option has no "mixed", so the count is read with the name, as Dropdown. */}
              {allState === 'mixed' && <span className="cui-filters__sr">, {ticked} selected</span>}
            </span>
          </div>
          <div className="cui-filters__all-rule" aria-hidden="true" />
        </>
      )}
      {options.map((o, n) => {
        const i = n + offset;
        const on = pending.includes(o.value);
        return (
          <div
            key={o.value}
            id={`${id}-${i}`}
            role="option"
            aria-selected={on}
            className="cui-filters__option"
            data-active={i === active ? '' : undefined}
            onMouseMove={() => i !== active && onHover(i)}
            onClick={() => onPick(i)}
          >
            <span className="cui-checkbox__box" data-state={on ? 'checked' : 'off'} aria-hidden="true">
              {on && <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />}
            </span>
            <span className="cui-filters__option-label">{o.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Footer({ onClear, onDone }: { onClear: () => void; onDone: () => void }) {
  return (
    <div className="cui-filters__footer">
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear
      </Button>
      <Button variant="primary" size="sm" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}

function Count({ n }: { n: number }) {
  // Keyed by the number, so a new count fades in (the DS's count change).
  return n > 0 ? (
    <span key={n} className="cui-filters__count" aria-hidden="true">
      {n}
    </span>
  ) : null;
}

// ---------------------------------------------------------------------------------------------------------------
// A named trigger: Button Secondary at 32px, its panel the dimension's checkbox list and a Clear / Done footer.
// Focus stays on the trigger (a combobox), as Dropdown: arrows move, Space or Enter ticks, Tab goes to the footer.
// ---------------------------------------------------------------------------------------------------------------
interface TriggerHandle {
  register: (key: string, el: HTMLElement | null) => void;
}

function NamedTrigger({
  dim,
  applied,
  onCommit,
  disabled,
  handle,
}: {
  dim: FilterDimension;
  applied: string[];
  onCommit: (values: string[]) => void;
  disabled: boolean;
  handle: TriggerHandle;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const titleId = `${uid}-title`;
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string[]>([]);
  const list = useOptionList(dim.options, pending, setPending, Boolean(dim.selectAll));
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const pos = usePanelPlace(open, triggerRef, panelRef, [dim.options.length]);
  const off = disabled || Boolean(dim.disabled);
  const n = off ? 0 : applied.length;

  const openPanel = () => {
    if (off) return;
    setPending(applied);
    list.reset(applied);
    setOpen(true);
  };
  // Closing without Done drops the pending ticks: a filter is never applied by clicking away.
  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };
  const done = () => {
    onCommit(dim.options.filter((o) => pending.includes(o.value)).map((o) => o.value));
    close(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (off) return;
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        openPanel();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close(false);
      return;
    }
    // Tab moves into the footer and the panel stays open; Shift+Tab leaves, which closes it.
    if (e.key === 'Tab') return;
    list.onListKey(e);
  };

  const onBlur = (e: FocusEvent<HTMLSpanElement>) => {
    if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) close(false);
  };
  useOutsidePress(open, rootRef, () => close(false));

  return (
    <span
      ref={rootRef}
      className="cui-filters__item"
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (open && e.key === 'Escape' && e.target !== triggerRef.current) {
          e.preventDefault();
          close(true);
        }
      }}
    >
      <button
        ref={(el) => {
          triggerRef.current = el;
          handle.register(dim.key, el);
        }}
        type="button"
        role="combobox"
        className="cui-filters__trigger"
        aria-label={triggerName(dim.label, n)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && list.active >= 0 ? `${listId}-${list.active}` : undefined}
        data-open={open || undefined}
        data-applied={n > 0 || undefined}
        disabled={off}
        onClick={() => (open ? close(false) : openPanel())}
        onKeyDown={onKeyDown}
      >
        <span className="cui-filters__trigger-label">{dim.label}</span>
        <Count n={n} />
        <CaretDown className="cui-filters__caret" weight="regular" aria-hidden="true" focusable="false" />
      </button>
      <div ref={panelRef} className="cui-filters__panel" data-open={open || undefined} style={panelStyle(pos)}>
        {/* Clicks on the title and rows keep focus on the trigger. */}
        <p id={titleId} className="cui-filters__panel-title" onMouseDown={(e) => e.preventDefault()}>
          {dim.label}
        </p>
        <OptionRows
          id={listId}
          aria-labelledby={titleId}
          // The trigger drives this list; Chrome would otherwise make the scrolling list a tab stop.
          tabIndex={-1}
          options={dim.options}
          selectAll={dim.selectAll}
          pending={pending}
          active={open ? list.active : -1}
          onPick={(i) => {
            list.setActive(i);
            list.toggle(i);
          }}
          onHover={list.setActive}
          onMouseDown={(e) => e.preventDefault()}
        />
        <Footer onClear={() => setPending([])} onDone={done} />
      </div>
    </span>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// A nested trigger: Compact filter's "Filter" (every dimension) and Tiered exposure's "More filters" (the secondary
// tier). Its panel lists the dimensions; picking one swaps the panel to that dimension's list, with Back.
// ---------------------------------------------------------------------------------------------------------------
function NestedTrigger({
  label,
  title,
  icon,
  dims,
  value,
  onCommit,
  onClearAll,
  disabled,
  handle,
  handleKey,
}: {
  label: string;
  title: string;
  icon: boolean;
  dims: FilterDimension[];
  value: FilterValue;
  onCommit: (key: string, values: string[]) => void;
  onClearAll?: () => void;
  disabled: boolean;
  handle: TriggerHandle;
  handleKey: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const panelId = `${uid}-panel`;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<string | null>(null);
  const [pending, setPending] = useState<string[]>([]);
  const dim = dims.find((d) => d.key === view) ?? null;
  const list = useOptionList(dim?.options ?? [], pending, setPending, Boolean(dim?.selectAll));
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const focusNext = useRef<string | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const pos = usePanelPlace(open, triggerRef, panelRef, [view]);
  const total = disabled ? 0 : sumOf(value, dims);

  // Focus follows the panel's own swaps, since the focused control goes away each time (approved for this pattern:
  // a focused thing that disappears hands focus to the nearest one that replaces it).
  useEffect(() => {
    const target = focusNext.current;
    if (!target || !open) return;
    focusNext.current = null;
    panelRef.current?.querySelector<HTMLElement>(target)?.focus();
  });

  const close = (refocus: boolean) => {
    setOpen(false);
    setView(null);
    if (refocus) triggerRef.current?.focus();
  };
  const drill = (d: FilterDimension) => {
    const applied = value[d.key] ?? [];
    setPending(applied);
    setView(d.key);
    list.reset(applied);
    focusNext.current = '.cui-filters__back';
  };
  const back = () => {
    focusNext.current = `[data-dim="${CSS.escape(view ?? '')}"]`;
    setView(null);
  };
  const done = () => {
    if (!dim) return;
    onCommit(dim.key, dim.options.filter((o) => pending.includes(o.value)).map((o) => o.value));
    close(true);
  };

  const onBlur = (e: FocusEvent<HTMLSpanElement>) => {
    if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) close(false);
  };
  useOutsidePress(open, rootRef, () => close(false));

  return (
    <span
      ref={rootRef}
      className="cui-filters__item"
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (open && e.key === 'Escape') {
          e.preventDefault();
          close(e.target !== triggerRef.current);
        }
      }}
    >
      <button
        ref={(el) => {
          triggerRef.current = el;
          handle.register(handleKey, el);
        }}
        type="button"
        className="cui-filters__trigger"
        aria-label={triggerName(label, total)}
        aria-expanded={open}
        aria-controls={panelId}
        data-open={open || undefined}
        data-applied={total > 0 || undefined}
        disabled={disabled}
        onClick={() => (open ? close(false) : setOpen(true))}
      >
        {icon && <SlidersHorizontal className="cui-filters__lead" weight="regular" aria-hidden="true" focusable="false" />}
        <span className="cui-filters__trigger-label">{label}</span>
        <Count n={total} />
        <CaretDown className="cui-filters__caret" weight="regular" aria-hidden="true" focusable="false" />
      </button>
      <div ref={panelRef} id={panelId} className="cui-filters__panel" data-open={open || undefined} style={panelStyle(pos)}>
        {open && !dim && (
          <>
            <p className="cui-filters__panel-title">{title}</p>
            <ul className="cui-filters__nested" role="list">
              {dims.map((d) => {
                const n = countOf(value, d);
                return (
                  <li key={d.key}>
                    <button
                      type="button"
                      className="cui-filters__nested-item"
                      data-dim={d.key}
                      aria-label={triggerName(d.label, n)}
                      disabled={d.disabled}
                      onClick={() => drill(d)}
                    >
                      <span>{d.label}</span>
                      {n > 0 && (
                        <span className="cui-filters__nested-count" aria-hidden="true">
                          {n}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            {onClearAll && total > 0 && (
              <div className="cui-filters__nested-footer">
                <button
                  type="button"
                  className="cui-filters__link"
                  onClick={() => {
                    onClearAll();
                    focusNext.current = '.cui-filters__nested-item:not(:disabled)';
                  }}
                >
                  Clear all
                </button>
              </div>
            )}
          </>
        )}
        {open && dim && (
          <>
            <button type="button" className="cui-filters__back" onClick={back}>
              <ArrowLeft className="cui-filters__back-icon" weight="regular" aria-hidden="true" focusable="false" />
              {dim.label}
            </button>
            {/* The list holds focus here (Tab lands on it); arrows move, Space or Enter ticks. */}
            <OptionRows
              id={listId}
              aria-label={dim.label}
              aria-activedescendant={list.active >= 0 ? `${listId}-${list.active}` : undefined}
              tabIndex={0}
              options={dim.options}
              selectAll={dim.selectAll}
              pending={pending}
              active={list.active}
              onPick={(i) => {
                list.setActive(i);
                list.toggle(i);
              }}
              onHover={list.setActive}
              onKeyDown={(e) => {
                if (e.key !== 'Escape' && e.key !== 'Tab') list.onListKey(e);
              }}
            />
            <Footer onClear={() => setPending([])} onDone={done} />
          </>
        )}
      </div>
    </span>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------------------------------------------

/**
 * Collabrium Filters: a control cluster that narrows the table or list under it. Row 1, the bar: an optional search
 * box, then a named trigger per dimension (or one "Filter" trigger, `compact`), each opening a checkbox panel whose
 * ticks apply only on Done. Row 2, once anything is applied: the applied values as removable chips, with Clear all.
 * Ported from components.css `.c-filter*` (3650–3729).
 */
export const Filters = forwardRef<HTMLDivElement, FiltersProps>(function Filters(props, ref) {
  const {
    dimensions,
    variant = 'default',
    moreDimensions,
    value: valueProp,
    defaultValue,
    onValueChange,
    search = false,
    searchValue: searchProp,
    defaultSearchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search…',
    searchLabel = 'Search',
    showApplied = true,
    align = 'edge',
    label = 'Filters',
    disabled = false,
    ...rest
  } = props;
  const uid = useId();
  const [own, setOwn] = useState<FilterValue>(defaultValue ?? {});
  const value = valueProp ?? own;
  const [ownSearch, setOwnSearch] = useState(defaultSearchValue);
  const text = searchProp ?? ownSearch;
  const searchRef = useRef<HTMLInputElement | null>(null);
  const trayRef = useRef<HTMLDivElement | null>(null);
  const triggers = useRef(new Map<string, HTMLElement | null>());
  const handle: TriggerHandle = { register: (k, el) => void triggers.current.set(k, el) };
  const pendingFocus = useRef<(() => HTMLElement | null | undefined) | null>(null);
  // New chips, the tray and counts fade in only after the first paint: a restored view shows at once (the DS).
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const compact = variant === 'compact';
  const more = !compact && moreDimensions?.length ? moreDimensions : [];
  const all = [...dimensions, ...more];
  const total = sumOf(value, all);

  useEffect(() => {
    const find = pendingFocus.current;
    if (!find) return;
    pendingFocus.current = null;
    find()?.focus();
  });

  const commit = (next: FilterValue) => {
    if (valueProp === undefined) setOwn(next);
    onValueChange?.(next);
  };
  const setDim = (key: string, values: string[]) => commit({ ...value, [key]: values });
  const clearAll = () => commit(Object.fromEntries(all.map((d) => [d.key, [] as string[]])));
  /** The trigger a dimension's chips belong to: its own, or "More filters", or the one Compact trigger. */
  const ownerOf = (key: string) => (compact ? '__compact' : more.some((d) => d.key === key) ? '__more' : key);
  const firstTrigger = () =>
    [...triggers.current.values()].find((el) => el && !(el as HTMLButtonElement).disabled) ?? null;

  const setText = (t: string) => {
    if (searchProp === undefined) setOwnSearch(t);
    onSearchChange?.(t);
  };

  const chips = all.flatMap((d) =>
    d.options
      .filter((o) => (value[d.key] ?? []).includes(o.value))
      .map((o) => ({ id: `${d.key}\u0000${o.value}`, label: o.label, removeLabel: `Remove ${d.label}: ${o.label}` })),
  );

  const removeChip = (id: string) => {
    const [key, v] = id.split('\u0000');
    const i = chips.findIndex((c) => c.id === id);
    // The focused × goes with its chip: focus moves to the next chip's ×, else the previous one's, else (the tray is
    // gone) to the trigger that held the value.
    pendingFocus.current = () => {
      const xs = trayRef.current?.querySelectorAll<HTMLElement>('.cui-chip__remove');
      if (xs && xs.length) return xs[Math.min(i, xs.length - 1)];
      return triggers.current.get(ownerOf(key)) ?? firstTrigger();
    };
    setDim(key, (value[key] ?? []).filter((x) => x !== v));
  };

  const clearAllFromBar = () => {
    pendingFocus.current = firstTrigger;
    clearAll();
  };

  const hasTriggers = compact ? dimensions.length > 0 : all.length > 0;

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-filters"
      role="group"
      aria-label={label}
      data-ready={ready || undefined}
      data-align={align === 'table' ? 'table' : undefined}
      data-disabled={disabled || undefined}
    >
      <div className="cui-filters__bar">
        {search && (
          <>
            <div className="cui-filters__search">
              <label htmlFor={`${uid}-search`} className="cui-filters__sr">
                {searchLabel}
              </label>
              <MagnifyingGlass className="cui-filters__search-icon" weight="regular" aria-hidden="true" focusable="false" />
              <input
                ref={searchRef}
                id={`${uid}-search`}
                className="cui-filters__search-input"
                type="text"
                enterKeyHint="search"
                autoComplete="off"
                placeholder={searchPlaceholder}
                value={text}
                disabled={disabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              />
              {/* Out of the tab order (and hidden) while empty; the × returns focus to the box. */}
              {text && !disabled && (
                <button
                  type="button"
                  className="cui-filters__search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setText('');
                    searchRef.current?.focus();
                  }}
                >
                  <X className="cui-filters__search-clear-icon" weight="regular" aria-hidden="true" focusable="false" />
                </button>
              )}
            </div>
            {hasTriggers && <span className="cui-filters__divider" aria-hidden="true" />}
          </>
        )}

        {compact ? (
          <NestedTrigger
            label="Filter"
            title="Filter by"
            icon
            dims={dimensions}
            value={value}
            onCommit={setDim}
            onClearAll={clearAll}
            disabled={disabled}
            handle={handle}
            handleKey="__compact"
          />
        ) : (
          <>
            {dimensions.map((d) => (
              <NamedTrigger
                key={d.key}
                dim={d}
                applied={(value[d.key] ?? []).filter((v) => d.options.some((o) => o.value === v))}
                onCommit={(vals) => setDim(d.key, vals)}
                disabled={disabled}
                handle={handle}
              />
            ))}
            {more.length > 0 && (
              <NestedTrigger
                label="More filters"
                title="More filters"
                icon={false}
                dims={more}
                value={value}
                onCommit={setDim}
                disabled={disabled}
                handle={handle}
                handleKey="__more"
              />
            )}
          </>
        )}

        {/* Clear All in the bar: only while values are applied and the tray is off (the two never show together). */}
        {!showApplied && total > 0 && !disabled && (
          <span className="cui-filters__clear-bar">
            <Button variant="ghost" size="sm" onClick={clearAllFromBar}>
              Clear All
            </Button>
          </span>
        )}
      </div>

      {showApplied && chips.length > 0 && (
        <div ref={trayRef} className="cui-filters__tray">
          <InputChipGroup aria-label="Applied filters" chips={chips} maxVisible={TRAY_CAP} onRemove={removeChip} disabled={disabled} />
          {!disabled && (
            <button type="button" className="cui-filters__link cui-filters__clear-tray" onClick={clearAllFromBar}>
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------------------------------------------
// URL persistence (the DS: a filtered view is a shareable link). The page owns the URL; these turn a value into
// query parameters and back. One parameter per dimension, values comma-separated: ?department=marketing,finance
// ---------------------------------------------------------------------------------------------------------------

/** Writes the applied values into query parameters (dimensions with nothing applied are removed). */
export function filtersToSearchParams(value: FilterValue, params = new URLSearchParams()): URLSearchParams {
  for (const [key, values] of Object.entries(value)) {
    if (values.length) params.set(key, values.join(','));
    else params.delete(key);
  }
  return params;
}

/** Reads applied values back from query parameters, keeping only known dimensions and options. */
export function filtersFromSearchParams(params: URLSearchParams, dimensions: FilterDimension[]): FilterValue {
  const out: FilterValue = {};
  for (const d of dimensions) {
    const raw = params.get(d.key);
    if (!raw) continue;
    const vals = raw.split(',').filter((v) => d.options.some((o) => o.value === v));
    if (vals.length) out[d.key] = vals;
  }
  return out;
}


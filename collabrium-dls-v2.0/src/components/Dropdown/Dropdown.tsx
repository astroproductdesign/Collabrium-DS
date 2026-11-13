'use client';

import {
  type CSSProperties,
  forwardRef,
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { CaretDown, Check, MagnifyingGlass, Minus, SpinnerGap, Tray, type Icon } from '@phosphor-icons/react';
import { Button } from '../Button';

/** One option. Only `value` and `label` are required; the other slots are optional, and a list uses descriptions on every row or none. */
export interface DropdownOption {
  /** Stable value, returned by `onValueChange`. */
  value: string;
  /** The option's name. Type-ahead and screen readers lead with it, so two options never share a label. */
  label: string;
  /** One line of supporting text (caption, Neutral-5). Give every option one, or none. Never the only difference between two options. */
  description?: string;
  /** A short trailing note: a count, a date, a status. Never a Tag or Badge. */
  meta?: string;
  /** A leading Phosphor icon (Regular, Neutral-5). Use this or `initials`. */
  icon?: Icon;
  /** A leading 24px avatar with these initials (a person). */
  initials?: string;
  /** The group heading this option sits under ("FMCG"). Options of one group are listed together, groups in the order they first appear. */
  group?: string;
  /** Shown but can't be picked (or, in Multiple select, changed: Select all and Clear leave it as it is). */
  disabled?: boolean;
}

interface DropdownBaseProps {
  /** The visible label. Always required (it names the field for screen readers too). */
  label: ReactNode;
  /** Hides the label visually where the layout already names the field; still read out. */
  hideLabel?: boolean;
  /** The options. Give them a `group` to list them under group headings. */
  options: DropdownOption[];
  /** Shown while nothing is chosen ("Select a brand"). */
  placeholder?: string;
  /** `outlined` is Input field's box; `borderless` (transparent, no border) is for toolbars and table headers. */
  appearance?: 'outlined' | 'borderless';
  /** Typing in the box filters the list: for long lists (a forty-department picker). */
  searchable?: boolean;
  /** The options are loading: the panel shows the spinner. */
  loading?: boolean;
  /** A helper line under the box. */
  helper?: ReactNode;
  /** An error under the box (bold Red); `aria-invalid`. */
  error?: ReactNode;
  /** A Red `*` after the label and `aria-required`. */
  required?: boolean;
  /** Can't be used: Input field's disabled look. */
  disabled?: boolean;
  /** Shows the value but won't open: the chevron is hidden, and the keyboard can't open it either. */
  readOnly?: boolean;
  /** When there are no options at all ("No campaigns yet" / what would change that). */
  emptyTitle?: string;
  emptyHint?: string;
  /** When a search matches nothing. Default: `No matches for “{query}”` / "Check the spelling or try a shorter term". */
  noResultsTitle?: (query: string) => string;
  noResultsHint?: string;
  /** Read out while loading. Default "Loading options…". */
  loadingLabel?: string;
  /** Form field name: hidden inputs carry the chosen value (one per value in Multiple select). */
  name?: string;
  id?: string;
}

export interface DropdownSingleProps extends DropdownBaseProps {
  /** Pick one option (the default): the panel closes on pick. */
  multiple?: false;
  /** The chosen value, when you control it (`null` for none). */
  value?: string | null;
  /** The chosen value on first render, when you don't. */
  defaultValue?: string | null;
  /** Called with the chosen value. */
  onValueChange?: (value: string) => void;
  selectAll?: never;
  selectAllLabel?: never;
  clearLabel?: never;
  doneLabel?: never;
  countLabel?: never;
}

export interface DropdownMultipleProps extends DropdownBaseProps {
  /** Pick any number: checkbox rows, the panel stays open, and a Clear / Done footer. */
  multiple: true;
  /** The chosen values, when you control them. */
  value?: string[];
  /** The chosen values on first render, when you don't. */
  defaultValue?: string[];
  /** Called with every chosen value, on each tick. */
  onValueChange?: (values: string[]) => void;
  /** Adds a pinned "Select all" row: ticks every option shown (a search narrows it to the matches), never a disabled one. */
  selectAll?: boolean;
  /** Default "Select all". */
  selectAllLabel?: string;
  /** The footer's buttons. Default "Clear" and "Done". */
  clearLabel?: string;
  doneLabel?: string;
  /** The box's value once something is chosen. Default `${count} selected`. */
  countLabel?: (count: number) => string;
}

export type DropdownProps = DropdownSingleProps | DropdownMultipleProps;

type Row = { key: string; option?: DropdownOption; all?: true; disabled: boolean };

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

/**
 * Collabrium Dropdown: a trigger on Input field's box that opens a panel of options.
 * Single select (the default) picks one and closes; Multiple select (`multiple`) ticks any number in checkbox rows,
 * with an optional Select all row and a Clear / Done footer. Both: outlined or borderless, searchable, groups, and
 * options with an icon or avatar, a description and a meta note.
 * Ported from components.css `.c-dropdown-field` (3002–3078), `.c-dropdown-multi-*` (4072–4190) and the shared option
 * slots (4204–4294).
 */
export const Dropdown = forwardRef<HTMLElement, DropdownProps>(function Dropdown(props, ref) {
  const {
    label,
    hideLabel = false,
    options,
    placeholder = 'Select…',
    appearance = 'outlined',
    searchable = false,
    loading = false,
    helper,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    emptyTitle = 'Nothing to choose from yet',
    emptyHint,
    noResultsTitle = (q: string) => `No matches for “${q}”`,
    noResultsHint = 'Check the spelling or try a shorter term',
    loadingLabel = 'Loading options…',
    name,
    id: idProp,
  } = props;
  const multiple = props.multiple === true;
  const m = props as DropdownMultipleProps;
  const s = props as DropdownSingleProps;
  const selectAll = multiple && Boolean(m.selectAll);
  const selectAllLabel = m.selectAllLabel ?? 'Select all';
  const countLabel = m.countLabel ?? ((n: number) => `${n} selected`);

  const uid = useId();
  const id = idProp ?? `${uid}-trigger`;
  const listId = `${uid}-list`;
  const labelId = `${uid}-label`;
  const messageId = `${uid}-message`;

  const [ownOne, setOwnOne] = useState<string | null>(multiple ? null : (s.defaultValue ?? null));
  const [ownMany, setOwnMany] = useState<string[]>(multiple ? (m.defaultValue ?? []) : []);
  const single = multiple ? null : s.value !== undefined ? s.value : ownOne;
  const values = multiple ? (m.value ?? ownMany) : [];
  const selected = multiple ? null : (options.find((o) => o.value === single) ?? null);
  const isOn = (o: DropdownOption) => (multiple ? values.includes(o.value) : o.value === single);
  const count = values.length;

  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  // Where the panel sits on screen (it is position: fixed, so no container that hides its overflow clips it).
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number; width: number } | null>(null);
  const aboveRef = useRef(false);
  const [active, setActive] = useState(-1);
  // Searchable: the typed query while searching; null shows the value.
  const [query, setQuery] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const typeahead = useRef({ text: '', at: 0 });

  // Groups: each group's options together, groups (and the ungrouped run) in the order they first appear.
  const ordered = useMemo(() => {
    const buckets = new Map<string, DropdownOption[]>();
    for (const o of options) {
      const k = o.group ?? '';
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k)!.push(o);
    }
    return [...buckets.values()].flat();
  }, [options]);

  const q = (query ?? '').trim().toLowerCase();
  const visible = searchable && q ? ordered.filter((o) => o.label.toLowerCase().includes(q)) : ordered;
  const pickable = visible.filter((o) => !o.disabled);
  const onCount = pickable.filter((o) => values.includes(o.value)).length;
  const allState: 'checked' | 'mixed' | undefined = onCount === 0 ? undefined : onCount === pickable.length ? 'checked' : 'mixed';
  const showAll = selectAll && visible.length > 0 && !loading;
  const rows: Row[] = [
    ...(showAll ? [{ key: '__all', all: true as const, disabled: pickable.length === 0 }] : []),
    ...visible.map((o) => ({ key: o.value, option: o, disabled: Boolean(o.disabled) })),
  ];

  const enabled = (i: number) => i >= 0 && i < rows.length && !rows[i].disabled;
  const firstEnabled = () => rows.findIndex((r) => !r.disabled);
  const lastEnabled = () => {
    for (let i = rows.length - 1; i >= 0; i--) if (!rows[i].disabled) return i;
    return -1;
  };
  const step = (from: number, dir: 1 | -1) => {
    // Doesn't wrap: stopping at the ends is what tells you the list has ends.
    for (let i = from + dir; i >= 0 && i < rows.length; i += dir) if (!rows[i].disabled) return i;
    return from;
  };

  const invalid = Boolean(error);
  const message = error ?? helper;
  const canOpen = !disabled && !readOnly;
  const hasDesc = visible.some((o) => o.description);
  const filled = multiple ? count > 0 : Boolean(selected);

  const openPanel = () => {
    if (!canOpen) return;
    setOpen(true);
    setAbove(false);
    aboveRef.current = false;
    const sel = rows.findIndex((r) => r.option && !r.disabled && isOn(r.option));
    setActive(sel >= 0 ? sel : firstEnabled());
  };
  const closePanel = () => {
    setOpen(false);
    setActive(-1);
    setQuery(null);
  };
  const commit = (next: string[]) => {
    if (m.value === undefined) setOwnMany(next);
    m.onValueChange?.(next);
  };
  const choose = (option: DropdownOption) => {
    if (option.disabled) return;
    if (s.value === undefined) setOwnOne(option.value);
    s.onValueChange?.(option.value);
    closePanel();
    // Focus stays on (returns to) the trigger: it never left, the list is driven by aria-activedescendant.
    triggerRef.current?.focus();
  };
  const toggle = (option: DropdownOption) => {
    if (option.disabled) return;
    commit(values.includes(option.value) ? values.filter((v) => v !== option.value) : [...values, option.value]);
  };
  // After a search, Select all covers the matches only, and it never changes a disabled option (decided 2026-11-06,
  // Q-DROPM-1, Q-DROPM-3).
  const toggleAll = () => {
    const shown = pickable.map((o) => o.value);
    commit(allState === 'checked' ? values.filter((v) => !shown.includes(v)) : [...values, ...shown.filter((v) => !values.includes(v))]);
  };
  const activate = (i: number) => {
    const row = rows[i];
    if (!row || row.disabled) return;
    if (row.all) toggleAll();
    else if (multiple) toggle(row.option!);
    else choose(row.option!);
  };
  // Clear: unticks everything and leaves the panel open; a disabled option keeps its state (decided 2026-11-06, Q-DROPM-3).
  const clear = () => commit(values.filter((v) => options.find((o) => o.value === v)?.disabled));
  // Done: closes; ticks were applied as they were made, so it changes nothing.
  const done = () => {
    closePanel();
    triggerRef.current?.focus();
  };

  // Placement: below by default; above when the panel doesn't fit below and there is more room above. Checked when it
  // opens and again on resize or scroll, but a panel that went up stays up until it closes. The panel is fixed to the
  // window at the trigger's place (8px off it), so a card, table or preview box that hides its overflow never clips it;
  // it stays in the field's markup, so Tab order and focus are unchanged (decided 2026-11-10, as Q-DROP-4 foresaw).
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const anchor = anchorRef.current?.getBoundingClientRect();
      const panel = panelRef.current;
      if (!anchor || !panel) return;
      const gap = 8;
      const h = panel.offsetHeight + gap;
      const below = window.innerHeight - anchor.bottom;
      const aboveRoom = anchor.top;
      const up = aboveRef.current || (h > below && aboveRoom > below);
      aboveRef.current = up;
      setAbove(up);
      setPos(
        up
          ? { left: anchor.left, bottom: window.innerHeight - anchor.top + gap, width: anchor.width }
          : { left: anchor.left, top: anchor.bottom + gap, width: anchor.width },
      );
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, visible.length, loading]);

  // Keep the keyboard's row in view inside the list (the list scrolls, the page doesn't).
  useEffect(() => {
    const list = listRef.current;
    if (!open || !list || active < 0) return;
    const row = document.getElementById(`${listId}-${active}`);
    if (!row) return;
    const r = row.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    if (r.top < l.top) list.scrollTop -= l.top - r.top + 8;
    else if (r.bottom > l.bottom) list.scrollTop += r.bottom - l.bottom + 8;
  }, [active, open, listId]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!canOpen) return;
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || (e.key === ' ' && !searchable)) {
        e.preventDefault();
        openPanel();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (i < 0 ? firstEnabled() : step(i, 1)));
        return;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (i < 0 ? lastEnabled() : step(i, -1)));
        return;
      case 'Home':
        if (searchable) return;
        e.preventDefault();
        setActive(firstEnabled());
        return;
      case 'End':
        if (searchable) return;
        e.preventDefault();
        setActive(lastEnabled());
        return;
      case 'Enter':
        e.preventDefault();
        activate(active);
        return;
      case ' ':
        if (searchable) return;
        e.preventDefault();
        activate(active);
        return;
      case 'Escape':
        e.preventDefault();
        // Searchable: a first Escape clears the query, a second closes.
        if (searchable && query) {
          setQuery('');
          return;
        }
        closePanel();
        return;
      case 'Tab':
        // Single select: closes, keeping the value, and moves on. Multiple select: Tab moves into the footer (Clear,
        // then Done, then out), so the panel stays open; leaving the field closes it.
        if (!multiple || e.shiftKey) closePanel();
        return;
      default:
        if (!searchable && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          // Type-ahead: jumps to the first option starting with the typed characters; the buffer resets after ~1s.
          const now = Date.now();
          const t = typeahead.current;
          t.text = now - t.at > 1000 ? e.key.toLowerCase() : t.text + e.key.toLowerCase();
          t.at = now;
          const hit = rows.findIndex((r) => r.option && !r.disabled && r.option.label.toLowerCase().startsWith(t.text));
          if (hit >= 0) setActive(hit);
        }
    }
  };

  // Leaving the field (trigger and footer) closes the panel.
  const onRootBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) closePanel();
  };

  const activeId = open && enabled(active) ? `${listId}-${active}` : undefined;
  const comboProps = {
    id,
    role: 'combobox' as const,
    'aria-expanded': open,
    'aria-controls': listId,
    'aria-haspopup': 'listbox' as const,
    'aria-activedescendant': activeId,
    'aria-labelledby': labelId,
    'aria-required': required || undefined,
    'aria-invalid': invalid || undefined,
    'aria-readonly': readOnly || undefined,
    'aria-describedby': message ? messageId : undefined,
    onKeyDown,
  };

  const shownValue = multiple ? (count > 0 ? countLabel(count) : null) : (selected?.label ?? null);

  const status = loading ? (
    <div className="cui-search-input__loading">
      <SpinnerGap className="cui-search-input__spinner" weight="regular" aria-hidden="true" focusable="false" />
    </div>
  ) : visible.length === 0 ? (
    <div className="cui-dropdown__empty">
      {searchable && q ? (
        <MagnifyingGlass className="cui-dropdown__empty-icon" weight="fill" aria-hidden="true" focusable="false" />
      ) : (
        <Tray className="cui-dropdown__empty-icon" weight="fill" aria-hidden="true" focusable="false" />
      )}
      <span className="cui-dropdown__empty-title">{searchable && q ? noResultsTitle((query ?? '').trim()) : emptyTitle}</span>
      {(searchable && q ? noResultsHint : emptyHint) && (
        <span className="cui-dropdown__empty-hint">{searchable && q ? noResultsHint : emptyHint}</span>
      )}
    </div>
  ) : null;

  const box = (state: 'checked' | 'mixed' | undefined) => (
    <span className="cui-checkbox__box" data-state={state ?? 'off'} aria-hidden="true">
      {state === 'checked' && <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />}
      {state === 'mixed' && <Minus className="cui-checkbox__glyph cui-checkbox__minus" weight="regular" focusable="false" />}
    </span>
  );

  const rowEvents = (i: number) => ({
    onMouseMove: () => enabled(i) && i !== active && setActive(i),
    onClick: () => {
      if (!enabled(i)) return;
      setActive(i);
      activate(i);
    },
  });

  const renderOption = (o: DropdownOption, i: number) => {
    const OptIcon = o.icon;
    const on = isOn(o);
    const labelEl = <span className="cui-dropdown__label">{o.label}</span>;
    return (
      <div
        key={o.value}
        id={`${listId}-${i}`}
        role="option"
        aria-selected={on}
        aria-disabled={o.disabled || undefined}
        className="cui-dropdown__row"
        data-active={i === active ? '' : undefined}
        data-desc={hasDesc ? '' : undefined}
        {...rowEvents(i)}
      >
        {multiple && box(on ? 'checked' : undefined)}
        {OptIcon ? (
          <span className="cui-dropdown__media" aria-hidden="true">
            <OptIcon className="cui-dropdown__media-icon" weight="regular" focusable="false" />
          </span>
        ) : o.initials ? (
          <span className="cui-dropdown__media" data-avatar="" aria-hidden="true">
            {o.initials}
          </span>
        ) : null}
        {o.description ? (
          <span className="cui-dropdown__text">
            {labelEl}
            <span className="cui-dropdown__desc">{o.description}</span>
          </span>
        ) : (
          labelEl
        )}
        {o.meta && <span className="cui-dropdown__meta">{o.meta}</span>}
        {!multiple && <Check className="cui-dropdown__check" weight="regular" aria-hidden="true" focusable="false" />}
      </div>
    );
  };

  // The list: the Select all row and its divider, then each group (a heading, role="group") with a divider between.
  const renderList = () => {
    const out: ReactNode[] = [];
    let i = 0;
    if (showAll) {
      out.push(
        <div
          key="__all"
          id={`${listId}-0`}
          role="option"
          aria-selected={allState === 'checked'}
          aria-disabled={rows[0].disabled || undefined}
          className="cui-dropdown__row"
          data-all=""
          data-active={active === 0 ? '' : undefined}
          {...rowEvents(0)}
        >
          {box(allState)}
          <span className="cui-dropdown__label">
            {selectAllLabel}
            {/* Partly ticked: a listbox option has no "mixed", so the count is read with the name (decided 2026-11-06, Q-DROPM-5). */}
            {allState === 'mixed' && <span className="cui-search-input__sr">, {countLabel(onCount)}</span>}
          </span>
        </div>,
        <div key="__all-div" className="cui-dropdown__divider" aria-hidden="true" />,
      );
      i = 1;
    }
    let start = 0;
    while (start < visible.length) {
      const g = visible[start].group ?? '';
      let end = start;
      while (end < visible.length && (visible[end].group ?? '') === g) end++;
      const run = visible.slice(start, end).map((o, k) => renderOption(o, i + k));
      if (start > 0) out.push(<div key={`div-${start}`} className="cui-dropdown__divider" aria-hidden="true" />);
      if (g) {
        const gid = `${listId}-g${start}`;
        out.push(
          <div key={`g-${start}`} role="group" aria-labelledby={gid}>
            <div className="cui-dropdown__group" id={gid}>
              {g}
            </div>
            {run}
          </div>,
        );
      } else {
        out.push(<Fragment key={`r-${start}`}>{run}</Fragment>);
      }
      i += end - start;
      start = end;
    }
    return out;
  };

  return (
    <div
      ref={rootRef}
      className="cui-input-field cui-dropdown"
      data-style={appearance === 'borderless' ? 'borderless' : undefined}
      data-multiple={multiple || undefined}
      data-open={open || undefined}
      data-filled={filled ? '' : undefined}
      data-readonly={readOnly || undefined}
      data-searchable={searchable || undefined}
      data-error={invalid || undefined}
      data-disabled={disabled || undefined}
      onBlur={onRootBlur}
    >
      <label className="cui-input-field__label" id={labelId} htmlFor={searchable ? id : undefined} data-hidden={hideLabel || undefined} onClick={() => !searchable && triggerRef.current?.focus()}>
        {label}
        {required && (
          <span className="cui-input-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="cui-dropdown__anchor" ref={anchorRef}>
        <div
          className="cui-input-field__wrap"
          data-trailing=""
          onMouseDown={(e) => {
            if (!canOpen) return;
            // A press on the box opens or closes it; focus goes to (stays on) the trigger.
            if (!(searchable && e.target === triggerRef.current && open)) {
              e.preventDefault();
              triggerRef.current?.focus();
              if (open) closePanel();
              else openPanel();
            }
          }}
        >
          {searchable ? (
            <input
              {...comboProps}
              ref={(node) => {
                triggerRef.current = node;
                setRef(ref, node);
              }}
              type="text"
              className="cui-input-field__input cui-dropdown__trigger"
              value={query ?? shownValue ?? ''}
              placeholder={multiple ? placeholder : (selected?.label ?? placeholder)}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete="off"
              aria-autocomplete="list"
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) openPanel();
                setActive(-1);
              }}
              onFocus={(e) => e.currentTarget.select()}
            />
          ) : (
            <div
              {...comboProps}
              ref={(node) => {
                triggerRef.current = node;
                setRef(ref, node);
              }}
              tabIndex={disabled ? -1 : 0}
              className="cui-input-field__input cui-dropdown__trigger"
              aria-disabled={disabled || undefined}
            >
              <span className="cui-dropdown__value" data-placeholder={shownValue ? undefined : ''}>
                {shownValue ?? placeholder}
              </span>
            </div>
          )}
          <CaretDown className="cui-dropdown__chevron" weight="regular" aria-hidden="true" focusable="false" />
        </div>
        <div
          ref={panelRef}
          className="cui-dropdown__panel"
          data-above={above || undefined}
          hidden={!open}
          style={
            pos
              ? ({ left: pos.left, top: pos.top ?? 'auto', bottom: pos.bottom ?? 'auto', '--cui-dropdown-anchor-w': `${pos.width}px` } as CSSProperties)
              : undefined
          }
          // A press inside the panel never takes focus from the trigger (the footer's buttons still click).
          onMouseDown={(e) => e.preventDefault()}
        >
          <div
            ref={listRef}
            className="cui-dropdown__list"
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            aria-multiselectable={multiple || undefined}
            hidden={!open || Boolean(status)}
          >
            {open && !status && renderList()}
          </div>
          {open && status}
          {/* Multiple select's footer stays through Empty (a filter can hide ticked options) and is inert while loading.
              The footer is the library's Button, sm (decided 2026-11-06, Q-DROPM-6), disabled with Button's own look, not
              the source's 50% opacity (decided 2026-11-06, Q-DROPM-4). */}
          {multiple && open && (
            <div
              className="cui-dropdown__footer"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  done();
                }
              }}
            >
              <Button variant="ghost" size="sm" onClick={clear} disabled={loading}>
                {m.clearLabel ?? 'Clear'}
              </Button>
              <Button variant="primary" size="sm" onClick={done} disabled={loading}>
                {m.doneLabel ?? 'Done'}
              </Button>
            </div>
          )}
        </div>
        {/* The DS asks for the empty and loading states to be announced: a polite live region, always present so a change is heard. */}
        <span className="cui-search-input__sr" aria-live="polite">
          {open ? (loading ? loadingLabel : visible.length === 0 ? (searchable && q ? noResultsTitle((query ?? '').trim()) : emptyTitle) : '') : ''}
        </span>
      </div>
      {name && (multiple ? values.map((v) => <input key={v} type="hidden" name={name} value={v} />) : <input type="hidden" name={name} value={single ?? ''} />)}
      {message && (
        <span className="cui-input-field__helper" id={messageId}>
          {message}
        </span>
      )}
    </div>
  );
});

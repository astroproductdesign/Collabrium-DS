'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { MagnifyingGlass, SpinnerGap, X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** One result in a User or Item Search list. */
export interface SearchResult {
  /** Stable key. */
  id: string;
  /** The person's name or the item's name. */
  title: string;
  /** A role ("Account Executive") or a type ("Marketing"). */
  subtitle?: string;
  /** User Search: the avatar's initials. Item Search has no avatar. */
  initials?: string;
}

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children' | 'color' | 'width' | 'height' | 'value' | 'defaultValue' | 'onChange' | 'prefix' | 'role'>
>;

interface SearchBase {
  /** The visible label ("Search", "Search for a person"). Always required. */
  label: ReactNode;
  /** Hides the label visually (a toolbar search the layout already names); still read out. */
  hideLabel?: boolean;
  /** An example of what to type. Default "Search…". */
  placeholder?: string;
  /** An error under the box (caption, bold, Red), with a Red border and `aria-invalid` ("Search couldn't run — try again"). */
  error?: ReactNode;
  /** Can't be used now: Neutral-2 fill, Neutral-4 text, no clear button. */
  disabled?: boolean;
  /** The clear button's name. Default "Clear search". */
  clearLabel?: string;
  /** The text shown when nothing matches. Default "No matches found". */
  emptyText?: string;
  /** Read out while results load. Default "Searching…". */
  loadingLabel?: string;
}

/** Default: a plain text search with a clear button. Results show elsewhere on the page. */
export interface DefaultSearchInputProps extends SearchBase, Omit<NativeInputProps, 'placeholder' | 'disabled'> {
  variant?: 'default';
  /** The text, when you control it. */
  value?: string;
  /** The text on first render, when you don't. */
  defaultValue?: string;
  /** Called with the new text on every change, and with "" when cleared. */
  onValueChange?: (value: string) => void;
  /** Results are loading: the panel under the box shows the spinner (while there is text). */
  loading?: boolean;
  /** Nothing matched: the panel shows `emptyText` (while there is text). */
  noResults?: boolean;
}

/** User Search (a person, with an avatar) or Item Search (a record): type, pick one, and the box collapses to the choice. */
export interface PickerSearchInputProps extends SearchBase {
  variant: 'user' | 'item';
  /** The typed text, when you control it. Filter `results` from it (or fetch them). */
  query?: string;
  /** The typed text on first render, when you don't control it. */
  defaultQuery?: string;
  /** Called with the typed text on every change. */
  onQueryChange?: (query: string) => void;
  /** The matches for the current text. The list opens while the field has focus and text. */
  results: SearchResult[];
  /** Results are loading: the list shows the spinner. */
  loading?: boolean;
  /** The chosen result, when you control it. `null` for none. */
  selected?: SearchResult | null;
  /** The chosen result on first render, when you don't control it. */
  defaultSelected?: SearchResult | null;
  /** Called with the chosen result, or `null` when the choice is cleared. */
  onSelectedChange?: (result: SearchResult | null) => void;
  /** The collapsed row's clear button name. Default "Clear selection". */
  clearSelectionLabel?: string;
  /** Form field name: a hidden input carries the chosen result's `id`. */
  name?: string;
  id?: string;
}

export type SearchInputProps = DefaultSearchInputProps | PickerSearchInputProps;

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

/**
 * Collabrium Search input: a search box with a leading magnifying glass and a clear (×) button once there is text.
 * `variant="user"` or `"item"` adds a results list to pick one from, and collapses to the choice. Ported from
 * components.css `.c-search-input` (195–256).
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(props, ref) {
  const {
    variant = 'default',
    label,
    hideLabel = false,
    placeholder = 'Search…',
    error,
    disabled = false,
    clearLabel = 'Clear search',
    emptyText = 'No matches found',
    loadingLabel = 'Searching…',
  } = props;
  const picker = variant !== 'default';
  const p = props as PickerSearchInputProps;
  const d = props as DefaultSearchInputProps;

  const uid = useId();
  const inputId = (props as { id?: string }).id ?? `${uid}-input`;
  const labelId = `${uid}-label`;
  const errorId = `${uid}-error`;
  const listId = `${uid}-list`;

  // Text: `value`/`defaultValue` (Default) or `query`/`defaultQuery` (User, Item).
  const controlledText = picker ? p.query : d.value;
  const [ownText, setOwnText] = useState((picker ? p.defaultQuery : d.defaultValue) ?? '');
  const text = controlledText ?? ownText;
  const setText = (next: string) => {
    if (controlledText === undefined) setOwnText(next);
    if (picker) p.onQueryChange?.(next);
    else d.onValueChange?.(next);
  };

  // The chosen result (User, Item).
  const [ownSelected, setOwnSelected] = useState<SearchResult | null>(picker ? p.defaultSelected ?? null : null);
  const selected = picker ? (p.selected !== undefined ? p.selected : ownSelected) : null;
  const setSelected = (next: SearchResult | null) => {
    if (p.selected === undefined) setOwnSelected(next);
    p.onSelectedChange?.(next);
  };

  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const collapsedClearRef = useRef<HTMLButtonElement | null>(null);
  // Where focus goes after the box swaps between search and collapsed (the element focused is gone otherwise).
  const [focusNext, setFocusNext] = useState<'input' | 'collapsed' | null>(null);
  useEffect(() => {
    if (focusNext === 'input') inputRef.current?.focus();
    if (focusNext === 'collapsed') collapsedClearRef.current?.focus();
    if (focusNext) setFocusNext(null);
  }, [focusNext]);

  const results = picker ? p.results : [];
  const loading = picker ? Boolean(p.loading) : Boolean(d.loading);
  const hasText = text !== '';
  const listOpen = picker && !selected && focused && hasText && !dismissed && !disabled;
  const defaultPanel = !picker && hasText && !disabled && (loading || Boolean(d.noResults));
  const showList = listOpen && !loading && results.length > 0;
  const activeIndex = showList && active < results.length ? active : -1;

  const choose = (result: SearchResult) => {
    setSelected(result);
    setText('');
    setActive(-1);
    setFocusNext('collapsed');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setDismissed(false);
    setActive(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (picker && listOpen && results.length > 0 && !loading) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => (i + 1) % results.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
        return;
      }
      if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        choose(results[activeIndex]);
        return;
      }
    }
    if (picker && e.key === 'Escape' && listOpen) {
      e.preventDefault();
      setDismissed(true);
      setActive(-1);
      return;
    }
    if (!picker) d.onKeyDown?.(e);
  };

  const clearText = () => {
    setText('');
    setActive(-1);
    // The × disappears with the text, so focus returns to the field (the source does this).
    setFocusNext('input');
  };

  const status = loading ? (
    <div className="cui-search-input__loading">
      <SpinnerGap className="cui-search-input__spinner" weight="regular" aria-hidden="true" focusable="false" />
      <span className="cui-search-input__sr">{loadingLabel}</span>
    </div>
  ) : (
    <div className="cui-search-input__empty">{emptyText}</div>
  );

  const rowContent = (r: SearchResult) => (
    <>
      {variant === 'user' && (
        <span className="cui-search-input__avatar" aria-hidden="true">
          {r.initials}
        </span>
      )}
      <span className="cui-search-input__text">
        <span className="cui-search-input__title">{r.title}</span>
        {r.subtitle && <span className="cui-search-input__subtitle">{r.subtitle}</span>}
      </span>
    </>
  );

  // Native input props (Default only), without the ones handled here.
  const {
    variant: _v,
    label: _l,
    hideLabel: _h,
    placeholder: _p,
    error: _e,
    disabled: _d,
    clearLabel: _c,
    emptyText: _et,
    loadingLabel: _ll,
    value: _val,
    defaultValue: _dv,
    onValueChange: _ovc,
    loading: _lo,
    noResults: _nr,
    onKeyDown: _ok,
    id: _id,
    ...native
  } = (picker ? {} : d) as DefaultSearchInputProps;

  const describedBy = [error ? errorId : undefined, (native as { 'aria-describedby'?: string })['aria-describedby']].filter(Boolean).join(' ') || undefined;

  if (picker && selected) {
    return (
      <div className="cui-search-input" data-variant={variant}>
        <span className="cui-search-input__label" id={labelId} data-hidden={hideLabel || undefined}>
          {label}
        </span>
        <div className="cui-search-input__collapsed" role="group" aria-labelledby={labelId} data-disabled={disabled || undefined}>
          {variant === 'user' && (
            <span className="cui-search-input__avatar" aria-hidden="true">
              {selected.initials}
            </span>
          )}
          <span className="cui-search-input__text">
            <span className="cui-search-input__title">{selected.title}</span>
            {selected.subtitle && <span className="cui-search-input__subtitle">{selected.subtitle}</span>}
          </span>
          <button
            ref={collapsedClearRef}
            type="button"
            className="cui-search-input__clear"
            aria-label={p.clearSelectionLabel ?? 'Clear selection'}
            disabled={disabled}
            onClick={() => {
              setSelected(null);
              setFocusNext('input');
            }}
          >
            <X className="cui-search-input__clear-icon" weight="regular" aria-hidden="true" focusable="false" />
          </button>
        </div>
        {p.name && <input type="hidden" name={p.name} value={selected.id} />}
        {error && (
          <p className="cui-search-input__error" id={errorId}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="cui-search-input" data-variant={variant}>
      <label className="cui-search-input__label" id={labelId} htmlFor={inputId} data-hidden={hideLabel || undefined}>
        {label}
      </label>
      <div className="cui-search-input__box" data-error={error ? '' : undefined}>
        <MagnifyingGlass className="cui-search-input__icon" weight="regular" aria-hidden="true" focusable="false" />
        <input
          {...native}
          ref={(node) => {
            inputRef.current = node;
            setRef(ref, node);
          }}
          id={inputId}
          type="text"
          className="cui-search-input__input"
          placeholder={placeholder}
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={(e) => {
            setFocused(true);
            native.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setActive(-1);
            native.onBlur?.(e);
          }}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...(picker
            ? {
                role: 'combobox',
                'aria-autocomplete': 'list' as const,
                'aria-expanded': listOpen,
                'aria-controls': listId,
                'aria-activedescendant': activeIndex >= 0 ? `${listId}-${results[activeIndex].id}` : undefined,
                autoComplete: 'off',
              }
            : {})}
        />
        {!disabled && (
          <button type="button" className="cui-search-input__clear" aria-label={clearLabel} hidden={!hasText} onClick={clearText}>
            <X className="cui-search-input__clear-icon" weight="regular" aria-hidden="true" focusable="false" />
          </button>
        )}
        {defaultPanel && <div className="cui-search-input__panel">{status}</div>}
        {picker && (
          <div className="cui-search-input__panel" hidden={!listOpen}>
            <ul className="cui-search-input__list" id={listId} role="listbox" aria-labelledby={labelId} hidden={!showList}>
              {showList &&
                results.map((r, i) => (
                  <li
                    key={r.id}
                    id={`${listId}-${r.id}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    className="cui-search-input__row"
                    data-active={i === activeIndex ? '' : undefined}
                    // Keep focus in the field while a row is pressed, so the list doesn't close before the click lands.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(r)}
                  >
                    {rowContent(r)}
                  </li>
                ))}
            </ul>
            {listOpen && !showList && status}
          </div>
        )}
      </div>
      {error && (
        <p className="cui-search-input__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});

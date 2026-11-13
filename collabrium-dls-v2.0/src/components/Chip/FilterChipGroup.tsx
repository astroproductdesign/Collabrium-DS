'use client';

import { forwardRef, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { Check, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** One option in a filter group. */
export interface FilterChipOption {
  /** What the option stands for. Unique within the group, and what `value` holds. */
  value: string;
  /** The visible label, 24 characters at most. The chip never truncates, so rewrite a longer label. */
  label: string;
  /**
   * An optional category icon (a department glyph, for example), Tier 1 Regular. Use it only when every
   * option in the group has a clear glyph. In a multi-select group the tick replaces it while the chip is on.
   */
  icon?: Icon;
  /** How many items the option holds. Show it on every chip in the group or on none. Above 99 it reads "99+"; 0 shows "0". */
  count?: number;
  /** Shows the chip but makes it unusable (a filter with nothing behind it). It stays in the group. */
  disabled?: boolean;
}

type NativeDivProps = WithoutStyling<
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'onChange' | 'defaultValue' | 'role'>
>;

interface FilterChipGroupBase extends NativeDivProps {
  /** Names the group for assistive tech ("Status filter"). Required, since the chips alone do not say what they filter. */
  'aria-label': string;
  /** The options, in reading order. 24 characters at most per label. */
  options: FilterChipOption[];
}

export interface SingleFilterChipGroupProps extends FilterChipGroupBase {
  /**
   * `single`: one option is always on, and choosing another turns the first off (a radio group).
   * Use it when exactly one choice always applies.
   */
  mode: 'single';
  /** The chosen option's `value`, for a controlled group. Use it with `onValueChange`. */
  value?: string;
  /** The chosen option's `value` to start with. Defaults to the first enabled option. */
  defaultValue?: string;
  /** Called with the new `value` when the person chooses an option. */
  onValueChange?: (value: string) => void;
}

export interface MultiFilterChipGroupProps extends FilterChipGroupBase {
  /**
   * `multi`: every chip toggles on its own, any number (none included) can be on, like a checkbox group.
   * A chip that is on shows a leading tick.
   */
  mode: 'multi';
  /** The values that are on, for a controlled group. Use it with `onValueChange`. */
  value?: string[];
  /** The values to start with. Defaults to none. */
  defaultValue?: string[];
  /** Called with the new list of values (in option order) when the person toggles a chip. */
  onValueChange?: (value: string[]) => void;
}

export type FilterChipGroupProps = SingleFilterChipGroupProps | MultiFilterChipGroupProps;

const formatCount = (count: number) => (count > 99 ? '99+' : String(count));

/**
 * Collabrium Filter Chip group: a row of pill toggles that filter what is shown. Single-select is a radio
 * group (one always on, roving tab stop, arrow keys move and choose); multi-select is a checkbox group
 * (independent toggles, a leading tick when on). One group is one mode, and it never holds Input Chips.
 */
export const FilterChipGroup = forwardRef<HTMLDivElement, FilterChipGroupProps>(function FilterChipGroup(props, ref) {
  const { mode, options, value: _value, defaultValue: _defaultValue, onValueChange: _onValueChange, ...rest } = props;
  const single = mode === 'single';
  const firstEnabled = options.find(option => !option.disabled)?.value ?? '';

  const [internalSingle, setInternalSingle] = useState<string>(
    props.mode === 'single' ? (props.defaultValue ?? firstEnabled) : '',
  );
  const [internalMulti, setInternalMulti] = useState<string[]>(props.mode === 'multi' ? (props.defaultValue ?? []) : []);

  const chosen = props.mode === 'single' ? (props.value ?? internalSingle) : '';
  const on = props.mode === 'multi' ? (props.value ?? internalMulti) : [];
  const isOn = (value: string) => (single ? chosen === value : on.includes(value));

  const chips = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = (value: string) => {
    if (props.mode === 'single') {
      if (value === chosen) return;
      if (props.value === undefined) setInternalSingle(value);
      props.onValueChange?.(value);
    } else {
      const next = options.map(option => option.value).filter(v => (v === value ? !on.includes(v) : on.includes(v)));
      if (props.value === undefined) setInternalMulti(next);
      props.onValueChange?.(next);
    }
  };

  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!single) return;
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const enabled = options.map((option, index) => (option.disabled ? -1 : index)).filter(index => index >= 0);
    const at = enabled.indexOf(chips.current.findIndex(chip => chip === document.activeElement));
    if (at === -1) return;
    let to: number | undefined;
    if (event.key in keys) to = enabled[(at + keys[event.key] + enabled.length) % enabled.length];
    else if (event.key === 'Home') to = enabled[0];
    else if (event.key === 'End') to = enabled[enabled.length - 1];
    if (to === undefined) return;
    event.preventDefault();
    chips.current[to]?.focus();
    choose(options[to].value);
  };

  return (
    <div {...rest} ref={ref} className="cui-chip-group" role={single ? 'radiogroup' : 'group'} onKeyDown={keyDown}>
      {options.map((option, index) => {
        const active = isOn(option.value);
        const LeadingIcon = !single && active ? Check : option.icon;
        // Single-select keeps one tab stop (the chosen chip); multi-select is Tab between chips.
        const tabIndex = option.disabled ? -1 : single && !active ? -1 : 0;
        return (
          <button
            key={option.value}
            ref={node => {
              chips.current[index] = node;
            }}
            type="button"
            className="cui-chip"
            data-kind="filter"
            data-active={active ? '' : undefined}
            data-disabled={option.disabled ? '' : undefined}
            role={single ? 'radio' : 'checkbox'}
            aria-checked={active}
            aria-disabled={option.disabled ? true : undefined}
            tabIndex={tabIndex}
            onClick={() => {
              if (!option.disabled) choose(option.value);
            }}
          >
            {LeadingIcon && <LeadingIcon className="cui-chip__icon" weight="regular" aria-hidden="true" focusable="false" />}
            <span className="cui-chip__label">{option.label}</span>
            {option.count !== undefined && <span className="cui-chip__count">{formatCount(option.count)}</span>}
          </button>
        );
      })}
    </div>
  );
});

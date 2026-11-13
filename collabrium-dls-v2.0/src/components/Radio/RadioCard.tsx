'use client';

import {
  forwardRef,
  useContext,
  useId,
  useState,
  type ChangeEvent,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import { RadioGroupContext } from './groupContext';

type NativeFieldsetProps = WithoutStyling<
  Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children' | 'color' | 'onChange' | 'defaultValue' | 'name'>
>;

export interface RadioCardGroupProps extends NativeFieldsetProps {
  /** The group's question ("Who should this campaign reach?"). It names the group for assistive tech. */
  legend: ReactNode;
  /** Hides the legend visually where the page already asks the question; it is still read out. A group always has a legend (decided 2026-11-06, Q-RC-3). */
  hideLegend?: boolean;
  /** Optional helper line under the legend (caption, Neutral-5). */
  description?: ReactNode;
  /**
   * The error to show (caption, bold, Red). It replaces `description` while it is set. Every enabled, unselected card
   * then takes a 1px Red border and its radio `aria-invalid`. Set it when a required group is submitted empty, move
   * focus to the first enabled radio, and clear it on the first selection.
   */
  error?: ReactNode;
  /** Marks the group as needing a choice: a Red `*` after the legend, and the native `required` on every radio. */
  required?: boolean;
  /** Disables every card in the group. */
  disabled?: boolean;
  /** The shared native `name`, which makes the cards one group and names the form field. Generated when left out. */
  name?: string;
  /** The selected card's `value`, for a controlled group. Use it with `onValueChange`. */
  value?: string;
  /** The selected card's `value` to start with. Pre-select only a real default; leave it out to start with none. */
  defaultValue?: string;
  /** Called with the new `value` when the person picks a card. */
  onValueChange?: (value: string) => void;
  /**
   * `2` (the default): one column, then two side by side once the group is 496px wide. `3`: one column, then three
   * at 752px. Never 2 + 1. Rows are equal height.
   */
  columns?: 2 | 3;
  /** The `RadioCard`s: 2 or 3, with the same parts. */
  children: ReactNode;
}

/**
 * Collabrium Radio card group: a `<fieldset>` whose options are large cards, the whole card one radio. The legend,
 * helper and error are Radio group's; the cards sit in a grid that goes straight from one column to two (or three).
 * Ported from components.css `.c-radio-card-group` / `.c-radio-card-grid` (3121–3144).
 */
export const RadioCardGroup = forwardRef<HTMLFieldSetElement, RadioCardGroupProps>(function RadioCardGroup(
  {
    legend,
    hideLegend = false,
    description,
    error,
    required = false,
    disabled = false,
    name,
    value,
    defaultValue,
    onValueChange,
    columns = 2,
    children,
    ...rest
  },
  ref,
) {
  const generatedName = useId();
  const messageId = useId();
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = value !== undefined ? value : internal;
  const message = error ?? description;
  const describedBy = [rest['aria-describedby'], message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <RadioGroupContext.Provider
      value={{
        name: name ?? generatedName,
        value: current,
        select: (next) => {
          if (value === undefined) setInternal(next);
          onValueChange?.(next);
        },
        invalid: Boolean(error),
        disabled,
        required,
        errorId: error ? messageId : undefined,
      }}
    >
      <fieldset
        {...rest}
        ref={ref}
        className="cui-radio-group cui-radio-card-group"
        disabled={disabled}
        aria-describedby={describedBy}
        data-error={error ? '' : undefined}
      >
        <legend className="cui-radio-group__legend" data-hidden={hideLegend || undefined}>
          {legend}
          {required && (
            <span className="cui-radio-group__required" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        {message && (
          <p className="cui-radio-group__message" id={messageId} data-error={error ? '' : undefined}>
            {message}
          </p>
        )}
        <div className="cui-radio-card-grid" data-columns={columns === 3 ? '3' : undefined}>
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
});

type NativeInputProps = WithoutStyling<
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'children' | 'size' | 'color' | 'width' | 'height' | 'value' | 'checked' | 'defaultChecked' | 'name' | 'title'
  >
>;

export interface RadioCardProps extends NativeInputProps {
  /** What this card submits; the group selects by it. */
  value: string;
  /** The option's name (h5). It is the radio's accessible name. */
  title: ReactNode;
  /** One or two sentences on what this path means (caption, Neutral-5). */
  description?: ReactNode;
  /** A live figure or short fact, pinned to the bottom so it lines up across the row ("16,150,000"). On a disabled card, the reason. */
  meta?: ReactNode;
  /** A neutral Badge beside the title ("Recommended"). At most one per group. */
  badge?: ReactNode;
  /** Can't be chosen: the circle, title and description at 50%; the meta stays at full strength to give the reason. */
  disabled?: boolean;
}

/**
 * Collabrium Radio card: one option in a `RadioCardGroup`. The whole card is the `<label>` of a visually hidden native
 * radio, on Card's surface: the radio circle and title, a description, and a meta line at the bottom. Selected is
 * Card Selected's 2px Obsidian border and shadow-3. Ported from components.css `.c-radio-card` (3147–3214).
 */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(function RadioCard(props, ref) {
  const { value, title, description, meta, badge, disabled: disabledProp = false, onChange, ...rest } = props;
  const group = useContext(RadioGroupContext);
  const disabled = disabledProp || Boolean(group?.disabled);
  const invalid = Boolean(group?.invalid) && !disabled;
  const titleId = useId();
  const descId = useId();
  const badgeId = useId();
  const metaId = useId();

  const describedBy =
    [
      rest['aria-describedby'],
      description ? descId : undefined,
      badge ? badgeId : undefined,
      meta ? metaId : undefined,
      invalid ? group?.errorId : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <label className="cui-card cui-radio-card" data-disabled={disabled || undefined} data-error={invalid || undefined}>
      <input
        {...rest}
        ref={ref}
        type="radio"
        className="cui-radio-card__input"
        name={group?.name}
        value={value}
        checked={group ? group.value === value : undefined}
        required={group?.required || undefined}
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          group?.select(event.target.value);
          onChange?.(event);
        }}
        aria-labelledby={titleId}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
      />
      <span className="cui-radio-card__head">
        <span className="cui-radio__circle cui-radio-card__circle" aria-hidden="true">
          <span className="cui-radio__dot" />
        </span>
        <span className="cui-radio-card__titles">
          <span className="cui-radio-card__title" id={titleId}>
            {title}
          </span>
          {badge && (
            <span className="cui-radio-card__badge" id={badgeId}>
              <Badge variant="neutral">{badge}</Badge>
            </span>
          )}
        </span>
      </span>
      {description && (
        <span className="cui-radio-card__desc" id={descId}>
          {description}
        </span>
      )}
      {meta && (
        <span className="cui-radio-card__meta" id={metaId}>
          {meta}
        </span>
      )}
    </label>
  );
});

'use client';

import { forwardRef, useId, useState, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { RadioGroupContext } from './groupContext';

type NativeFieldsetProps = WithoutStyling<
  Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children' | 'color' | 'onChange' | 'defaultValue' | 'name'>
>;

export interface RadioGroupProps extends NativeFieldsetProps {
  /** The group's question ("How often should we email you?"). It names the group for assistive tech. */
  legend: ReactNode;
  /** Optional helper line under the legend (caption, Neutral-5). */
  description?: ReactNode;
  /**
   * The error to show (caption, bold, Red). It replaces `description` while it is set.
   * Every enabled, unselected radio then takes the red border and `aria-invalid`.
   * Set it when a required group is submitted empty, move focus to the first radio,
   * and clear it on the first selection.
   */
  error?: ReactNode;
  /** Marks the group as needing a choice: a Red `*` after the legend, and the native `required` on every radio. */
  required?: boolean;
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** The shared native `name`, which makes the radios one group and names the form field. Generated when left out. */
  name?: string;
  /** The selected radio's `value`, for a controlled group. Use it with `onValueChange`. */
  value?: string;
  /** The selected radio's `value` to start with, for an uncontrolled group. Leave it out to start with nothing chosen. */
  defaultValue?: string;
  /** Called with the new `value` when the person picks a radio. */
  onValueChange?: (value: string) => void;
  /** The `Radio` components. Each needs a `value`. They are laid out in a column, 12px apart. */
  children: ReactNode;
}

/**
 * Collabrium Radio group. A `<fieldset>` with a `<legend>`, an optional helper
 * or error line, and the radios in a column, sharing one `name` so only one can
 * be chosen. Designed here from Checkbox group and Radio card group's fieldset
 * anatomy: the DLS has no plain radio group.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { legend, description, error, required = false, disabled = false, name, value, defaultValue, onValueChange, children, ...rest },
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
        select: next => {
          if (value === undefined) setInternal(next);
          onValueChange?.(next);
        },
        invalid: Boolean(error),
        disabled,
        required,
      }}
    >
      <fieldset {...rest} ref={ref} className="cui-radio-group" disabled={disabled} aria-describedby={describedBy}>
        <legend className="cui-radio-group__legend">
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
        <div className="cui-radio-group__list">{children}</div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
});

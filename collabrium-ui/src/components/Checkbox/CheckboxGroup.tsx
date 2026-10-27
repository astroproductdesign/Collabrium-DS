'use client';

import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { CheckboxGroupContext } from './groupContext';

type NativeFieldsetProps = WithoutStyling<Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children' | 'color'>>;

export interface CheckboxGroupProps extends NativeFieldsetProps {
  /** The group's question or heading ("Notify me by"). It names the group for assistive tech. */
  legend: ReactNode;
  /** Optional helper line under the legend (caption, Neutral-5). */
  description?: ReactNode;
  /**
   * The error to show (caption, bold, Red). It replaces `description` while it is set.
   * Every empty checkbox in the group then takes the red border and `aria-invalid`.
   * Set it when a required group is submitted empty, move focus to the first checkbox,
   * and clear it on the first selection.
   */
  error?: ReactNode;
  /**
   * Marks the group as needing at least one choice: a Red `*` after the legend.
   * Visual only: a checkbox group has no native "required", so enforce it in your
   * validation and report it with `error`. For a single checkbox that must be
   * ticked (a terms box), set `required` on that `Checkbox` instead.
   */
  required?: boolean;
  /** Disables every checkbox in the group. */
  disabled?: boolean;
  /** The `Checkbox` components. They are laid out in a column, 12px apart. */
  children: ReactNode;
}

/**
 * Collabrium Checkbox group. A `<fieldset>` with a `<legend>`, an optional
 * helper or error line, and the checkboxes in a column. Designed here from
 * Input field's required and error conventions and Radio card group's
 * fieldset anatomy (approved 2026-10-26): the DLS has no
 * checkbox group.
 */
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(function CheckboxGroup(
  { legend, description, error, required = false, disabled = false, children, ...rest },
  ref,
) {
  const messageId = useId();
  const message = error ?? description;
  const describedBy = [rest['aria-describedby'], message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <CheckboxGroupContext.Provider value={{ invalid: Boolean(error), disabled }}>
      <fieldset {...rest} ref={ref} className="cui-checkbox-group" disabled={disabled} aria-describedby={describedBy}>
        <legend className="cui-checkbox-group__legend">
          {legend}
          {required && (
            <span className="cui-checkbox-group__required" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        {message && (
          <p className="cui-checkbox-group__message" id={messageId} data-error={error ? '' : undefined}>
            {message}
          </p>
        )}
        <div className="cui-checkbox-group__list">{children}</div>
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
});

'use client';

import {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { Check, Minus } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { CheckboxGroupContext } from './groupContext';

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children' | 'size' | 'color' | 'width' | 'height'>
>;

interface CheckboxBaseProps extends NativeInputProps {
  /**
   * Shows the partial-selection state: the box is filled and shows a minus.
   * Use it only for a "select all" box whose options are partly selected.
   * It is a display state: set it from your own state (for example
   * `selected.length > 0 && selected.length < total`) and clear it in
   * `onChange`. Checked and unchecked still come from `checked`.
   */
  indeterminate?: boolean;
  /** Disables the checkbox (50% opacity, not-allowed cursor, not focusable). */
  disabled?: boolean;
}

export interface LabelledCheckboxProps extends CheckboxBaseProps {
  /** The visible label. Short, and written as the thing being switched on ("Email notifications"). */
  label: ReactNode;
  /** Optional helper line under the label (caption, Neutral-5). */
  description?: ReactNode;
  /**
   * An error to show under the label (caption, bold, Red). It replaces `description` while it is set, puts a
   * red border on the empty box and sets `aria-invalid`. Set it when the box is required and was submitted
   * empty; clear it when the box is ticked. Move focus to the box yourself.
   */
  error?: ReactNode;
}

export interface UnlabelledCheckboxProps extends CheckboxBaseProps {
  /** For the few places where a visible label is impossible, such as a table row's select box. Use `aria-label` instead. */
  label?: never;
  description?: never;
  error?: never;
  /** Required without a visible label. Names what the box selects, e.g. "Select Amirah Yusof". */
  'aria-label': string;
}

export type CheckboxProps = LabelledCheckboxProps | UnlabelledCheckboxProps;

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/**
 * Collabrium Checkbox. A real `<input type="checkbox">` inside its
 * `<label>`, so the whole row toggles it. Multi-select, with a partial
 * (indeterminate) state. Ported from components.css `.c-choice` +
 * `.c-checkbox-box`. The required marker, the error state and the group are
 * designed here, from Input field's conventions (approved 2026-10-26).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, forwardedRef) {
  const { label, description, error, indeterminate = false, disabled: disabledProp = false, ...rest } = props as LabelledCheckboxProps;
  const group = useContext(CheckboxGroupContext);
  const disabled = disabledProp || Boolean(group?.disabled);
  const invalid = Boolean(error) || Boolean(group?.invalid);
  const innerRef = useRef<HTMLInputElement | null>(null);
  const labelId = useId();
  const descId = useId();
  const errorId = useId();

  // `indeterminate` is a DOM property, not an attribute, so it is set here.
  // It runs after every render because the browser clears it on click.
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  });

  // The error replaces the helper line, and the describing id is swapped with it (Input field's wiring).
  const describedBy = [rest['aria-describedby'], error ? errorId : description ? descId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <label className="cui-checkbox" data-disabled={disabled || undefined} data-error={invalid || undefined}>
      <input
        {...rest}
        ref={node => {
          innerRef.current = node;
          setRef(forwardedRef, node);
        }}
        type="checkbox"
        className="cui-checkbox__input"
        disabled={disabled}
        aria-labelledby={label ? labelId : rest['aria-labelledby']}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
      />
      <span className="cui-checkbox__box" aria-hidden="true">
        <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />
        <Minus className="cui-checkbox__glyph cui-checkbox__minus" weight="regular" focusable="false" />
      </span>
      {label && (
        <span className="cui-checkbox__text">
          <span className="cui-checkbox__label" id={labelId}>
            {label}
            {rest.required && (
              <span className="cui-checkbox__required" aria-hidden="true">
                *
              </span>
            )}
          </span>
          {error ? (
            <span className="cui-checkbox__error" id={errorId}>
              {error}
            </span>
          ) : (
            description && (
              <span className="cui-checkbox__desc" id={descId}>
                {description}
              </span>
            )
          )}
        </span>
      )}
    </label>
  );
});

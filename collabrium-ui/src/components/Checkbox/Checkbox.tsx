'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { Check, Minus } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

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
}

export interface UnlabelledCheckboxProps extends CheckboxBaseProps {
  /** For the few places where a visible label is impossible, such as a table row's select box. Use `aria-label` instead. */
  label?: never;
  description?: never;
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
 * `.c-checkbox-box`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, forwardedRef) {
  const { label, description, indeterminate = false, disabled = false, ...rest } = props as LabelledCheckboxProps;
  const innerRef = useRef<HTMLInputElement | null>(null);
  const labelId = useId();
  const descId = useId();

  // `indeterminate` is a DOM property, not an attribute, so it is set here.
  // It runs after every render because the browser clears it on click.
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  });

  const describedBy = [rest['aria-describedby'], description ? descId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <label className="cui-checkbox" data-disabled={disabled || undefined}>
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
      />
      <span className="cui-checkbox__box" aria-hidden="true">
        <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />
        <Minus className="cui-checkbox__glyph cui-checkbox__minus" weight="regular" focusable="false" />
      </span>
      {label && (
        <span className="cui-checkbox__text">
          <span className="cui-checkbox__label" id={labelId}>
            {label}
          </span>
          {description && (
            <span className="cui-checkbox__desc" id={descId}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

'use client';

import { forwardRef, useContext, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { RadioGroupContext } from './groupContext';

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children' | 'size' | 'color' | 'width' | 'height'>
>;

interface RadioBaseProps extends NativeInputProps {
  /**
   * What this option submits. Required inside a `RadioGroup`, which selects
   * by it. Outside a group, it is the native `value`.
   */
  value?: string;
  /** Disables the radio (50% opacity, not-allowed cursor, not focusable). */
  disabled?: boolean;
}

export interface LabelledRadioProps extends RadioBaseProps {
  /** The visible label. Short, and written as the option itself ("Weekly digest"). */
  label: ReactNode;
  /** Optional helper line under the label (caption, Neutral-5). */
  description?: ReactNode;
}

export interface UnlabelledRadioProps extends RadioBaseProps {
  /** For the few places where a visible label is impossible. Use `aria-label` instead. */
  label?: never;
  description?: never;
  /** Required without a visible label. Names the option, e.g. "Weekly digest". */
  'aria-label': string;
}

export type RadioProps = LabelledRadioProps | UnlabelledRadioProps;

/**
 * Collabrium Radio. A real `<input type="radio">` inside its `<label>`, so the
 * whole row selects it. One choice from a short set, shown as an outline circle
 * with a dot, never a solid fill. Ported from components.css `.c-choice` +
 * `.c-radio-circle`. Put radios that answer one question in a `RadioGroup`;
 * hover and pressed, the focus ring and the group are designed here, from
 * Checkbox's approved treatment.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { label, description, disabled: disabledProp = false, onChange, checked, value, ...rest } = props as LabelledRadioProps;
  const group = useContext(RadioGroupContext);
  const disabled = disabledProp || Boolean(group?.disabled);
  const invalid = Boolean(group?.invalid) && !disabled;
  const labelId = useId();
  const descId = useId();

  const describedBy = [rest['aria-describedby'], description ? descId : undefined].filter(Boolean).join(' ') || undefined;
  const grouped = group
    ? {
        name: group.name,
        checked: group.value === value,
        required: group.required || undefined,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          group.select(event.target.value);
          onChange?.(event);
        },
      }
    : { checked, onChange };

  return (
    <label className="cui-radio" data-disabled={disabled || undefined} data-error={invalid || undefined}>
      <input
        {...rest}
        {...grouped}
        ref={ref}
        type="radio"
        value={value}
        className="cui-radio__input"
        disabled={disabled}
        aria-labelledby={label ? labelId : rest['aria-labelledby']}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
      />
      <span className="cui-radio__circle" aria-hidden="true">
        <span className="cui-radio__dot" />
      </span>
      {label && (
        <span className="cui-radio__text">
          <span className="cui-radio__label" id={labelId}>
            {label}
          </span>
          {description && (
            <span className="cui-radio__desc" id={descId}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

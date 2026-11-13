import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'children' | 'size' | 'color' | 'width' | 'height' | 'value'>
>;

interface SwitchBaseProps extends NativeInputProps {
  /** Disables the switch (50% opacity, not-allowed cursor, not focusable). */
  disabled?: boolean;
}

export interface LabelledSwitchProps extends SwitchBaseProps {
  /**
   * The visible label. Name what the switch controls ("Email notifications"), never its state ("On" or "Off"):
   * the track and the thumb already say the state.
   */
  label: ReactNode;
  /** Optional helper line under the label (caption, Neutral-5). */
  description?: ReactNode;
}

export interface UnlabelledSwitchProps extends SwitchBaseProps {
  /** For the few places where a visible label is impossible, such as a settings row whose heading sits beside it. Use `aria-label` instead. */
  label?: never;
  description?: never;
  /** Required without a visible label. Names what the switch controls, e.g. "Beta features". */
  'aria-label': string;
}

export type SwitchProps = LabelledSwitchProps | UnlabelledSwitchProps;

/**
 * Collabrium Switch. A real `<input type="checkbox" role="switch">` inside its `<label>`, so the whole row toggles
 * it. For a setting that applies the moment it is flipped, with no Save step: if the choice is submitted with a
 * form, use a Checkbox. Ported from components.css `.c-choice.switch`, `.c-switch-track` and `.c-switch-thumb`.
 * Hover, pressed and the focus ring are designed here (the DLS has none).
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
  const { label, description, disabled = false, ...rest } = props as LabelledSwitchProps;
  const labelId = useId();
  const descId = useId();
  const describedBy = [rest['aria-describedby'], description ? descId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <label className="cui-switch" data-disabled={disabled || undefined}>
      <input
        {...rest}
        ref={ref}
        type="checkbox"
        role="switch"
        className="cui-switch__input"
        disabled={disabled}
        aria-labelledby={label ? labelId : rest['aria-labelledby']}
        aria-describedby={describedBy}
      />
      <span className="cui-switch__track" aria-hidden="true">
        <span className="cui-switch__thumb" />
      </span>
      {label && (
        <span className="cui-switch__text">
          <span className="cui-switch__label" id={labelId}>
            {label}
          </span>
          {description && (
            <span className="cui-switch__desc" id={descId}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

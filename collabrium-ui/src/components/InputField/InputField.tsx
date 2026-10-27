'use client';

import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { CheckCircle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** The three heights: 32px for a dense table's inline edit, 40px for a form, 48px for a large form. A density choice, never tied to a screen width. */
export type InputFieldSize = 'sm' | 'md' | 'lg';
/** The kinds of single-line input this component covers. Passwords and search have their own components. */
export type InputFieldType = 'text' | 'email' | 'url' | 'tel' | 'number';

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children' | 'color' | 'width' | 'height' | 'required' | 'prefix'>
>;

export interface InputFieldProps extends NativeInputProps {
  /** The visible label. Always required: a placeholder is never a substitute for it. Short, and written as the thing being asked for ("Workspace name"). */
  label: ReactNode;
  /**
   * Keeps the label for assistive tech but hides it visually. Use it only where the
   * surrounding layout already names the field (a search row, a table cell). The label is still required.
   */
  hideLabel?: boolean;
  /** The kind of input. `text` unless the value is an email, URL, telephone number or number. */
  type?: InputFieldType;
  /** A helper line under the box (caption, Neutral-5): what to enter, or what happens to it. */
  helper?: ReactNode;
  /**
   * An error to show under the box (caption, Red). It replaces `helper` while it is set, puts a 1px Red
   * border on the box and sets `aria-invalid`. Set it when the value fails validation; clear it when it passes.
   */
  error?: ReactNode;
  /**
   * The value passed validation: a 1px Green border and a trailing Green check-circle. Fire it after the
   * field passes validation (on blur or submit), not on every valid keystroke. `helper` can say why ("Name is available").
   * Ignored while `error` is set.
   */
  success?: boolean;
  /** Marks the field as needed: a Red `*` after the label and `aria-required`. Leave optional fields unmarked, with no "(optional)" text. */
  required?: boolean;
  /** The height. `md` (40px) for most forms. */
  size?: InputFieldSize;
  /** Optional Phosphor icon inside the box, at the start (Regular, Neutral-5, decorative). */
  leadingIcon?: Icon;
  /** Optional Phosphor icon inside the box, at the end (Regular, Neutral-5, decorative). Hidden while `success` shows its check. */
  trailingIcon?: Icon;
  /** A fixed, non-editable text at the start of the box, such as `$` or `@`. One or two characters: the box reserves a fixed 28px for it. Never interactive: if it must be pressed, it is an icon button instead. */
  prefix?: string;
  /** A fixed, non-editable text at the end of the box, such as `kg` or `%`. One or two characters: the box reserves a fixed 28px for it. Never interactive. */
  suffix?: string;
  /** Shows a character count under the box, right-aligned, as `12/60`; it turns Red when the limit is reached. Needs `maxLength`. */
  showCount?: boolean;
}

/**
 * Collabrium Input field. A single-line text box with a label, an optional
 * helper or error line, optional icons and text adornments, and a character
 * count. Ported from components.css `.c-field` (lines 129–177, the character
 * counter at 179–185). Textarea, Password field and Search input extend this
 * and have their own components.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const {
    label,
    hideLabel = false,
    type = 'text',
    helper,
    error,
    success = false,
    required = false,
    size = 'md',
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    prefix,
    suffix,
    showCount = false,
    id: idProp,
    onChange,
    ...rest
  } = props;
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = useId();
  const countId = useId();
  const [length, setLength] = useState(String(rest.value ?? rest.defaultValue ?? '').length);

  const invalid = Boolean(error);
  const confirmed = success && !invalid;
  const message = error ?? helper;
  const atLimit = showCount && rest.maxLength !== undefined && length >= rest.maxLength;
  const describedBy = [rest['aria-describedby'], message ? messageId : undefined, showCount ? countId : undefined].filter(Boolean).join(' ') || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value.length);
    onChange?.(event);
  };

  const hasTrailingIcon = Boolean(TrailingIcon) || confirmed;

  return (
    <div
      className="cui-input-field"
      data-size={size}
      data-error={invalid || undefined}
      data-success={confirmed || undefined}
      data-disabled={rest.disabled || undefined}
    >
      <label className="cui-input-field__label" htmlFor={id} data-hidden={hideLabel || undefined}>
        {label}
        {required && (
          <span className="cui-input-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div
        className="cui-input-field__wrap"
        data-leading={LeadingIcon ? '' : undefined}
        data-trailing={hasTrailingIcon ? '' : undefined}
        data-prefix={prefix ? '' : undefined}
        data-suffix={suffix ? '' : undefined}
      >
        {LeadingIcon && <LeadingIcon className="cui-input-field__icon cui-input-field__icon--leading" weight="regular" aria-hidden="true" focusable="false" />}
        {prefix && (
          <span className="cui-input-field__adornment cui-input-field__adornment--prefix" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          {...rest}
          ref={ref}
          id={id}
          type={type}
          className="cui-input-field__input"
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
        />
        {suffix && (
          <span className="cui-input-field__adornment cui-input-field__adornment--suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
        {confirmed ? (
          <CheckCircle className="cui-input-field__icon cui-input-field__icon--trailing" weight="fill" aria-hidden="true" focusable="false" />
        ) : (
          TrailingIcon && <TrailingIcon className="cui-input-field__icon cui-input-field__icon--trailing" weight="regular" aria-hidden="true" focusable="false" />
        )}
      </div>
      {message && (
        <span className="cui-input-field__helper" id={messageId}>
          {message}
        </span>
      )}
      {showCount && (
        <div className="cui-input-field__counter-row">
          <span className="cui-input-field__counter" id={countId} data-at-limit={atLimit || undefined}>
            {length}/{rest.maxLength}
          </span>
        </div>
      )}
    </div>
  );
});

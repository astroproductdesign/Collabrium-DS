'use client';

import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { CheckCircle, Eye, EyeSlash, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** The three heights: 32px for a dense table's inline edit, 40px for a form, 48px for a large form. A density choice, never tied to a screen width. */
export type InputFieldSize = 'sm' | 'md' | 'lg';
/** The kinds of single-line input this component covers. `password` masks the text and adds a show/hide toggle; `otp` is a 6-digit code drawn as six boxes. Search has its own component. */
export type InputFieldType = 'text' | 'email' | 'url' | 'tel' | 'number' | 'password' | 'otp';

type NativeInputProps = WithoutStyling<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children' | 'color' | 'width' | 'height' | 'required' | 'prefix'>
>;

interface InputFieldBase extends NativeInputProps {
  /** The visible label. Always required: a placeholder is never a substitute for it. Short, and written as the thing being asked for ("Workspace name"). */
  label: ReactNode;
  /**
   * Keeps the label for assistive tech but hides it visually. Use it only where the
   * surrounding layout already names the field (a search row, a table cell). The label is still required.
   */
  hideLabel?: boolean;
  /** A helper line under the box (caption, Neutral-5): what to enter, or what happens to it. */
  helper?: ReactNode;
  /**
   * An error to show under the box (caption, Red). It replaces `helper` while it is set, puts a 1px Red
   * border on the box and sets `aria-invalid`. Set it when the value fails validation; clear it when it passes.
   */
  error?: ReactNode;
  /** Marks the field as needed: a Red `*` after the label and `aria-required`. Leave optional fields unmarked, with no "(optional)" text. */
  required?: boolean;
  /** The height. `md` (40px) for most forms. */
  size?: InputFieldSize;
  /** Optional Phosphor icon inside the box, at the start (Regular, Neutral-5, decorative). */
  leadingIcon?: Icon;
  /** Shows a character count under the box, right-aligned, as `12/60`; it turns Red when the limit is reached. Needs `maxLength`. */
  showCount?: boolean;
}

interface TextInputProps extends InputFieldBase {
  /** The kind of input. `text` unless the value is an email, URL, telephone number or number. */
  type?: Exclude<InputFieldType, 'password' | 'otp'>;
  /**
   * The value passed validation: a 1px Green border and a trailing Green check-circle. Fire it after the
   * field passes validation (on blur or submit), not on every valid keystroke. `helper` can say why ("Name is available").
   * Ignored while `error` is set.
   */
  success?: boolean;
  /** Optional Phosphor icon inside the box, at the end (Regular, Neutral-5, decorative). Hidden while `success` shows its check. */
  trailingIcon?: Icon;
  /** A fixed, non-editable text at the start of the box, such as `$` or `@`. One or two characters: the box reserves a fixed 28px for it. Never interactive: if it must be pressed, it is an icon button instead. */
  prefix?: string;
  /** A fixed, non-editable text at the end of the box, such as `kg` or `%`. One or two characters: the box reserves a fixed 28px for it. Never interactive. */
  suffix?: string;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
  onComplete?: never;
}

/**
 * A password: the browser's dot masking and a show/hide toggle at the end of the box, which keeps 40px clear at every
 * size. The end belongs to the toggle, so there is no success check, trailing icon, prefix or suffix. Set
 * `autoComplete` to `current-password` to sign in or `new-password` to set one.
 */
interface PasswordInputProps extends InputFieldBase {
  type: 'password';
  success?: never;
  trailingIcon?: never;
  prefix?: never;
  suffix?: never;
  /** The toggle's name while the password is hidden. Default "Show password" (translate it with the page). */
  showPasswordLabel?: string;
  /** The toggle's name while the password is shown. Default "Hide password". */
  hidePasswordLabel?: string;
  onComplete?: never;
}

/**
 * A 6-digit one-time code: one real input (numeric keyboard, `autocomplete="one-time-code"`, so phones offer the code
 * from an SMS) drawn as six boxes. Digits only; paste fills from the start, dropping spaces and dashes. Never masked.
 * The field never submits a form itself: `onComplete` says when all six are in.
 */
interface OtpInputProps extends Omit<InputFieldBase, 'size' | 'leadingIcon' | 'showCount'> {
  type: 'otp';
  /** Called with the code once all six digits are in. Verify it, or enable the submit button; the field doesn't submit. */
  onComplete?: (code: string) => void;
  size?: never;
  leadingIcon?: never;
  showCount?: never;
  /** The code was accepted: every box Green and the check. Ignored while `error` is set. */
  success?: boolean;
  trailingIcon?: never;
  prefix?: never;
  suffix?: never;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
}

/** The number of boxes in a one-time code. */
const OTP_LENGTH = 6;

export type InputFieldProps = TextInputProps | PasswordInputProps | OtpInputProps;

/**
 * Collabrium Input field. A single-line text box with a label, an optional
 * helper or error line, optional icons and text adornments, and a character
 * count; `type="password"` adds the show/hide toggle. Ported from components.css
 * `.c-field` (lines 129–177, the character counter at 179–185, the password
 * field at 187 and its toggle, `.icon-btn`, at 166–168). Textarea and Search
 * input extend this and have their own components.
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
    showPasswordLabel = 'Show password',
    hidePasswordLabel = 'Hide password',
    onComplete,
    id: idProp,
    onChange,
    ...rest
  } = props as Omit<TextInputProps, 'type' | 'showPasswordLabel' | 'hidePasswordLabel' | 'onComplete'> & {
    type?: InputFieldType;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
    onComplete?: (code: string) => void;
  };
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = useId();
  const countId = useId();
  const [length, setLength] = useState(String(rest.value ?? rest.defaultValue ?? '').length);
  const isPassword = type === 'password';
  // The shown state lives in the component, so it never outlasts a reload (DESIGN-SYSTEM.md, Password field).
  const [shown, setShown] = useState(false);
  const isOtp = type === 'otp';
  // A one-time code keeps its own digits (or follows `value` when it is controlled) and where the caret box is.
  const [ownCode, setOwnCode] = useState(String(rest.defaultValue ?? '').replace(/\D/g, '').slice(0, OTP_LENGTH));
  const [otpFocused, setOtpFocused] = useState(false);

  const invalid = Boolean(error);
  const confirmed = success && !invalid && !isPassword;
  const message = error ?? helper;
  const atLimit = showCount && rest.maxLength !== undefined && length >= rest.maxLength;
  const describedBy = [rest['aria-describedby'], message ? messageId : undefined, showCount ? countId : undefined].filter(Boolean).join(' ') || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value.length);
    onChange?.(event);
  };

  const hasTrailingIcon = Boolean(TrailingIcon) || confirmed;

  if (isOtp) {
    const code = rest.value !== undefined ? String(rest.value).replace(/\D/g, '').slice(0, OTP_LENGTH) : ownCode;
    const next = Math.min(code.length, OTP_LENGTH - 1);
    const { value: _value, defaultValue: _defaultValue, maxLength: _maxLength, ...otpRest } = rest;
    const moveCaretToEnd = (input: HTMLInputElement) => {
      if (input.selectionStart !== input.value.length || input.selectionEnd !== input.value.length) {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    };
    const handleOtpChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Digits only, at most six. No maxLength on the input: it would cut a pasted "123 456" before the space is dropped.
      const digits = event.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
      event.target.value = digits;
      if (rest.value === undefined) setOwnCode(digits);
      onChange?.(event);
      if (digits.length === OTP_LENGTH && digits !== code) onComplete?.(digits);
    };
    return (
      <div
        className="cui-input-field"
        data-otp=""
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
        <div className="cui-input-field__otp">
          <div className="cui-input-field__otp-row">
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
              <span key={i} className="cui-input-field__otp-box" data-active={otpFocused && i === next ? '' : undefined} aria-hidden="true">
                {code[i] ?? (otpFocused && i === next ? <span className="cui-input-field__otp-caret" /> : null)}
              </span>
            ))}
            <input
              {...otpRest}
              ref={ref}
              id={id}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              className="cui-input-field__otp-input"
              value={code}
              aria-required={required || undefined}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={handleOtpChange}
              onFocus={(event) => {
                setOtpFocused(true);
                const input = event.currentTarget;
                requestAnimationFrame(() => moveCaretToEnd(input));
                otpRest.onFocus?.(event);
              }}
              onBlur={(event) => {
                setOtpFocused(false);
                otpRest.onBlur?.(event);
              }}
              onSelect={(event) => {
                // The caret always sits after the last digit: a code is cleared back, never edited in the middle.
                moveCaretToEnd(event.currentTarget);
                otpRest.onSelect?.(event);
              }}
            />
          </div>
          {confirmed && <CheckCircle className="cui-input-field__otp-check" weight="fill" aria-hidden="true" focusable="false" />}
        </div>
        {message && (
          <span className="cui-input-field__helper" id={messageId}>
            {message}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="cui-input-field"
      data-size={size}
      data-password={isPassword || undefined}
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
          type={isPassword && shown ? 'text' : type}
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
        {isPassword && (
          <button
            type="button"
            className="cui-input-field__toggle"
            aria-label={shown ? hidePasswordLabel : showPasswordLabel}
            aria-controls={id}
            disabled={rest.disabled}
            onClick={() => setShown((v) => !v)}
          >
            {shown ? (
              <EyeSlash className="cui-input-field__toggle-icon" weight="regular" aria-hidden="true" focusable="false" />
            ) : (
              <Eye className="cui-input-field__toggle-icon" weight="regular" aria-hidden="true" focusable="false" />
            )}
          </button>
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

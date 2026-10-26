'use client';

import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';

type NativeTextareaProps = WithoutStyling<
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'color' | 'required' | 'cols' | 'wrap'>
>;

export interface TextareaProps extends NativeTextareaProps {
  /** The visible label. Always required: a placeholder is never a substitute for it. Short, and written as the thing being asked for ("Project description"). */
  label: ReactNode;
  /**
   * Keeps the label for assistive tech but hides it visually. Use it only where the
   * surrounding layout already names the field. The label is still required.
   */
  hideLabel?: boolean;
  /** A helper line under the box (caption, Neutral-5): what to write, or who will read it. */
  helper?: ReactNode;
  /**
   * An error to show under the box (caption, bold, Red). It replaces `helper` while it is set, puts a 1px Red
   * border on the box and sets `aria-invalid`. Set it when the text fails validation; clear it when it passes.
   */
  error?: ReactNode;
  /** Marks the field as needed: a Red `*` after the label and `aria-required`. Leave optional fields unmarked, with no "(optional)" text. */
  required?: boolean;
}

/**
 * Collabrium Textarea. A multi-line text box that extends Input field: the
 * same label, border, fill and states, a 96px minimum height, and a handle to
 * resize it vertically. Ported from components.css `.c-field textarea`
 * (lines 192–193) and the `.c-field` rules it shares.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  const { label, hideLabel = false, helper, error, required = false, id: idProp, ...rest } = props;
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = useId();

  const invalid = Boolean(error);
  const message = error ?? helper;
  const describedBy = [rest['aria-describedby'], message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <div className="cui-textarea" data-error={invalid || undefined} data-disabled={rest.disabled || undefined}>
      <label className="cui-textarea__label" htmlFor={id} data-hidden={hideLabel || undefined}>
        {label}
        {required && (
          <span className="cui-textarea__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        {...rest}
        ref={ref}
        id={id}
        className="cui-textarea__input"
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
      />
      {message && (
        <span className="cui-textarea__helper" id={messageId}>
          {message}
        </span>
      )}
    </div>
  );
});

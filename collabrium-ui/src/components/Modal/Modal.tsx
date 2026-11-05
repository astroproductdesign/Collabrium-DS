'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';

export type ModalHeadingLevel = 2 | 3 | 4 | 5 | 6;

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role'>>;

export interface ModalProps extends NativeDivProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called on the close button, a scrim click or Escape. Set `open` to false in it. */
  onClose: () => void;
  /** The title: the one decision, as a question ("Archive this workspace?"). It names the dialog. */
  title: ReactNode;
  /** The heading level of the title, 2 to 6. Default 2: a dialog sits above the page's outline. The look is always h4. */
  headingLevel?: ModalHeadingLevel;
  /** The body: what the decision means, in a sentence or two. */
  children: ReactNode;
  /**
   * The footer's buttons, right-aligned, 12px apart: Secondary (cancel) first, then Primary (commit) on the right.
   * Each closes the modal through your own handler. Leave out for a modal with no footer.
   */
  actions?: ReactNode;
  /** The close button's accessible name. Default "Close". */
  closeLabel?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Collabrium Modal / dialog: one focused decision in a 400px panel over a scrim. A title with a close button, a body,
 * and a footer of Secondary then Primary. Opens with focus on the title; Tab stays inside; Escape, the close button or a
 * scrim click closes it, and focus returns to what opened it. Ported from components.css `.c-modal` (1782–1788).
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { open, onClose, title, headingLevel = 2, children, actions, closeLabel = 'Close', ...rest },
  ref,
) {
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const Heading = `h${headingLevel}` as const;

  // On open, focus moves to the title (a heading: the approved focus target); on close, back to what opened it.
  // TODO(open-question Q-MODAL-3): the DLS gives the base modal no motion, so it appears and goes at once.
  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    titleRef.current?.focus();
    return () => returnTo.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Tab stays inside the panel while it is open.
  const trap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open || typeof document === 'undefined') return null;
  // TODO(open-question Q-MODAL-4): the page behind isn't held still (no scroll lock), as Command brief.
  return createPortal(
    <div
      className="cui-modal-scrim"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        {...rest}
        ref={node => {
          panelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className="cui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trap}
      >
        <div className="cui-modal__head">
          <Heading ref={titleRef} id={titleId} className="cui-modal__title" tabIndex={-1}>
            {title}
          </Heading>
          <Button variant="ghost" size="sm" iconOnly icon={X} aria-label={closeLabel} onClick={onClose} />
        </div>
        <div className="cui-modal__body">{children}</div>
        {actions && <div className="cui-modal__foot">{actions}</div>}
      </div>
    </div>,
    document.body,
  );
});

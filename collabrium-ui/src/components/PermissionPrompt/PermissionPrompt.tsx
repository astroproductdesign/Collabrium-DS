'use client';

import { forwardRef, useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import { CaretDown, CheckCircle, Clock, XCircle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import type { BadgeProps } from '../Badge';
import { Button } from '../Button';

/** How much harm the action could do if it goes wrong. Maps to the Badge tones: Low is green, Medium is amber, High is red. */
export type PermissionPromptRisk = 'low' | 'medium' | 'high';
/**
 * Where the request is. Your code sets it; the component never resolves itself.
 * - `pending`: waiting for the person's decision.
 * - `allowed` / `denied`: the person decided. The card stays in the conversation as the record.
 * - `expired`: the conversation moved on before anyone answered. Nothing ran.
 */
export type PermissionPromptStatus = 'pending' | 'allowed' | 'denied' | 'expired';

/** One line of "what this will do": a name and its full value. */
export interface PermissionPromptDetail {
  /** The field, e.g. "File", "Access", "To". Short: the column is 60px wide. */
  key: string;
  /** Its value, in full. It wraps and never truncates, because the point is showing exactly what is being authorized. */
  value: string;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

export interface PermissionPromptProps extends NativeDivProps {
  /** Where the request is. Required, so the card always says something true. */
  status: PermissionPromptStatus;
  /** The question itself, ending in a question mark: "Read pipeline-config.ts?", "Send email on your behalf?". It stays on the resolved card. */
  label: string;
  /** The action's own kind, as a Phosphor icon: `FileText` for a file, `Terminal` for a command, `EnvelopeSimple` for an email. Always Regular. Shown while pending. */
  icon: Icon;
  /** How risky the action is. Required: the risk is always shown. Shown while pending. */
  risk: PermissionPromptRisk;
  /**
   * Exactly what is being authorized, as key and value rows. Never a JSON dump.
   * Open while pending; collapsed once resolved, and still reachable behind the toggle.
   */
  details: PermissionPromptDetail[];
  /** One sentence on what Allow once covers and what Allow for session covers. Shown while pending. */
  scopeNote: string;
  /** Shown under a `denied` card: what happens now, e.g. "Declined. The assistant will continue without reading this file." */
  deniedNote?: string;
  /** Shown under an `expired` card: why nothing ran. */
  expiredNote?: string;
  /** Called when the person presses Deny. Set `status` to `denied` in response. */
  onDeny?: () => void;
  /** Called when the person presses Allow once. Allow this one action, then set `status` to `allowed`. */
  onAllowOnce?: () => void;
  /** Called when the person presses Allow for session. Allow this kind of action for the rest of the conversation, then set `status` to `allowed`. */
  onAllowSession?: () => void;
}

const RISK: Record<PermissionPromptRisk, { variant: BadgeProps['variant']; text: string }> = {
  low: { variant: 'success', text: 'Low risk' },
  medium: { variant: 'warning', text: 'Medium risk' },
  high: { variant: 'error', text: 'High risk' },
};

const OUTCOME = {
  allowed: { variant: 'success', icon: CheckCircle, text: 'Allowed' },
  denied: { variant: 'error', icon: XCircle, text: 'Denied' },
  expired: { variant: 'neutral', icon: Clock, text: 'Expired' },
} as const satisfies Record<Exclude<PermissionPromptStatus, 'pending'>, { variant: BadgeProps['variant']; icon: Icon; text: string }>;

/**
 * Collabrium Permission Prompt. A card the AI puts inline, in its own turn, to
 * ask the person's authorization for one specific, consequential action before
 * it goes ahead: reading or writing a file, running a command, sending
 * something on their behalf, calling an outside service. Ported from
 * components.css `.c-permission-prompt*`.
 *
 * The component owns what is local to it: the detail open while pending and
 * collapsed once resolved (Rule 3), the risk badge pinned to the same corner
 * in both states (Rule 5), deny-first actions of rising commitment (Rule 6)
 * and the restack on mobile (Rule 10). The host owns the rest: ask only for an
 * action with a real consequence (Rule 1), render it in the AI's own turn and
 * never as an overlay (Rule 2), state exactly what is authorized (Rule 4),
 * leave a resolved card in the conversation (Rule 7), set `expired` when the
 * conversation moves on (Rule 8) and fill the column inside a Chat window
 * (Rule 9).
 */
export const PermissionPrompt = forwardRef<HTMLDivElement, PermissionPromptProps>(function PermissionPrompt(
  { status, label, icon: ActionIcon, risk, details, scopeNote, deniedNote, expiredNote, onDeny, onAllowOnce, onAllowSession, ...rest },
  ref,
) {
  const pending = status === 'pending';
  const [open, setOpen] = useState(pending);
  const [seenStatus, setSeenStatus] = useState(status);
  const resolvedRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const detailId = useId();

  // Rule 3: open while pending; once a decision lands the decision is the headline, so it folds shut.
  if (status !== seenStatus) {
    setSeenStatus(status);
    setOpen(status === 'pending');
  }

  // Pressing a decision removes the button that has focus. When focus was on it
  // (a keyboard press), hand focus to the resolved row so the person lands on the
  // outcome. A mouse press that did not focus the button leaves focus alone.
  // Decided 2026-10-26 (Q-PERM-1): a focus move, and no live region.
  const hadFocus = useRef(false);
  const decide = (callback?: () => void) => () => {
    hadFocus.current = !!cardRef.current?.contains(document.activeElement);
    callback?.();
  };
  useEffect(() => {
    if (!pending && hadFocus.current) {
      resolvedRef.current?.focus();
      hadFocus.current = false;
    }
  }, [pending]);

  const setRefs = (node: HTMLDivElement | null) => {
    cardRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const outcome = pending ? null : OUTCOME[status];
  const note = status === 'denied' ? deniedNote : status === 'expired' ? expiredNote : undefined;

  const toggle = (
    <button
      type="button"
      className="cui-permission-prompt__toggle"
      aria-expanded={open}
      aria-controls={detailId}
      onClick={() => setOpen(o => !o)}
    >
      <span>{pending ? 'What this will do' : 'View details'}</span>
      <CaretDown className="cui-permission-prompt__chevron" aria-hidden="true" focusable="false" />
    </button>
  );

  const detail = (
    // inert while closed: nothing in here is interactive, but it must also stay out of the reading order when hidden.
    <div className="cui-permission-prompt__detail" id={detailId} data-open={open ? '' : undefined} inert={!open}>
      <div className="cui-permission-prompt__detail-inner">
        <dl className="cui-permission-prompt__detail-list">
          {details.map(row => (
            <div key={row.key} className="cui-permission-prompt__detail-row">
              <dt className="cui-permission-prompt__key">{row.key}</dt>
              <dd className="cui-permission-prompt__value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  return (
    <div {...rest} ref={setRefs} className="cui-permission-prompt" data-status={status}>
      {pending ? (
        <>
          <div className="cui-permission-prompt__head">
            <span className="cui-permission-prompt__icon" aria-hidden="true">
              <ActionIcon weight="regular" />
            </span>
            <p className="cui-permission-prompt__label">{label}</p>
            <Badge variant={RISK[risk].variant}>{RISK[risk].text}</Badge>
          </div>
          {toggle}
          {detail}
          <p className="cui-permission-prompt__scope">{scopeNote}</p>
          <div className="cui-permission-prompt__actions">
            <Button variant="ghost" size="sm" data-action="deny" onClick={decide(onDeny)}>
              Deny
            </Button>
            <Button variant="secondary" size="sm" data-action="once" onClick={decide(onAllowOnce)}>
              Allow once
            </Button>
            <Button variant="primary" size="sm" data-action="session" onClick={decide(onAllowSession)}>
              Allow for session
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="cui-permission-prompt__resolved" ref={resolvedRef} tabIndex={-1}>
            <span className="cui-permission-prompt__resolved-label">{label}</span>
            <Badge variant={outcome!.variant} icon={outcome!.icon}>
              {outcome!.text}
            </Badge>
          </div>
          {toggle}
          {detail}
          {note && <p className="cui-permission-prompt__resolved-note">{note}</p>}
        </>
      )}
    </div>
  );
});

'use client';

import { forwardRef, useRef, useState, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle, Info, Sparkle, Warning, X, XCircle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { slideDistance, transition } from '../../motion';
import { Button } from '../Button';

/** The tone. `info` is the default when in doubt; `ai` is a proactive, system-generated suggestion. */
export type InfoBannerTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai';

/** One action in the action slot: a short label (3 words at most), never destructive. */
export interface InfoBannerAction {
  label: string;
  onClick: () => void;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'color'>>;

interface InfoBannerBaseProps extends NativeDivProps {
  /** The message: the banner's only text, 120 characters at most. */
  children: ReactNode;
  /** Replaces the tone's icon. Tier 2, drawn Fill. Rarely needed. */
  icon?: Icon;
  /** Called after the banner has been dismissed and has left. */
  onDismiss?: () => void;
}

interface StatusToneProps extends InfoBannerBaseProps {
  /** The tone. Default `info`. */
  tone?: Exclude<InfoBannerTone, 'ai'>;
  /**
   * Shows the close button: the reader can dismiss it. Leave off for a persistent banner that describes a state the
   * reader can't resolve by closing it (a failing sync). Default false.
   */
  dismissible?: boolean;
  /** Up to two actions, after the message, styled like it. Clicking one doesn't dismiss the banner. */
  actions?: [] | [InfoBannerAction] | [InfoBannerAction, InfoBannerAction];
}

interface AiToneProps extends InfoBannerBaseProps {
  /** AI Recommendation: always dismissible, and always exactly one action. One per section. */
  tone: 'ai';
  dismissible?: true;
  /** Exactly one action ("Apply", "Try this", "Review"). */
  actions: [InfoBannerAction];
}

export type InfoBannerProps = StatusToneProps | AiToneProps;

const ICONS: Record<InfoBannerTone, Icon> = {
  neutral: Info,
  info: Info,
  success: CheckCircle,
  warning: Warning,
  danger: XCircle,
  ai: Sparkle,
};

/**
 * Collabrium Info Banner: an inline, persistent notification anchored to its section or card, full width. A tone, an
 * icon, one message, up to two actions and, when dismissible, a close button. Ported from components.css `.c-banner*`
 * (3267–3324).
 */
export const InfoBanner = forwardRef<HTMLDivElement, InfoBannerProps>(function InfoBanner(props, ref) {
  const { tone = 'info', dismissible: dismissibleProp, actions = [], icon, onDismiss, children, onKeyDown, ...rest } = props as Omit<
    StatusToneProps,
    'tone'
  > & { tone?: InfoBannerTone };
  const dismissible = tone === 'ai' ? true : !!dismissibleProp;
  const [open, setOpen] = useState(true);
  const reduce = useReducedMotion();
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const ToneIcon = icon ?? ICONS[tone];
  const t = reduce ? { duration: 0 } : transition('base', 'standard');

  const dismiss = () => setOpen(false);

  return (
    <AnimatePresence initial={!reduce} onExitComplete={onDismiss}>
      {open && (
        // Entrance: slide down and fade in. Exit: slide up and fade out, then the space closes so banners below shift up.
        <motion.div
          initial={{ opacity: 0, y: -slideDistance, height: 'auto' }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -slideDistance, height: 0, overflow: 'hidden' }}
          transition={t}
        >
          <div
            {...rest}
            ref={node => {
              bannerRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            className="cui-info-banner"
            data-tone={tone}
            role={dismissible ? 'status' : 'note'}
            aria-live="polite"
            onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
              // Escape dismisses the dismissible banner that holds focus (Q-BANNER-4).
              if (dismissible && event.key === 'Escape') dismiss();
              onKeyDown?.(event);
            }}
          >
            <ToneIcon className="cui-info-banner__icon" weight="fill" aria-hidden="true" focusable="false" />
            <div className="cui-info-banner__body">
              <div className="cui-info-banner__message">{children}</div>
              {actions.length > 0 && (
                <div className="cui-info-banner__actions">
                  {actions.map(a => (
                    <button key={a.label} type="button" className="cui-info-banner__action" onClick={a.onClick}>
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {dismissible && (
              <span className="cui-info-banner__close">
                <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Dismiss" onClick={dismiss} />
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

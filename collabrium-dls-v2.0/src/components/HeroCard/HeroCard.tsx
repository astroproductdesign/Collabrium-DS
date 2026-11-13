'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { createPortal } from 'react-dom';
import { Image, X } from '@phosphor-icons/react';
import { tokens } from '../../tokens/tokens';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import type { CardHeadingLevel } from '../Card';

/**
 * `default`: an announcement or insight. `risk`: a warning without a full alert (Fire tint, orange border). `ai`: an
 * AI-generated insight on the dark surface, with a pointer tilt. `selected`: the bigger detail form (also the
 * Command brief's content).
 */
export type HeroCardVariant = 'default' | 'risk' | 'ai' | 'selected';

/** The card's one call to action. Its button style follows the variant: Ghost, Secondary on `ai`, Primary on `selected`. */
export interface HeroCardCta {
  label: string;
  onClick: () => void;
}

interface HeroContentProps {
  /** The eyebrow ("Just shipped", "AI insight"). An h2-sized line, or a small uppercase label on `selected`. */
  eyebrow: string;
  /** The heading. Clamped to two lines. */
  heading: string;
  /** The heading level, 2 to 6. The look is always h4. Default 3. */
  headingLevel?: CardHeadingLevel;
  /** The body: one or two sentences. */
  body: string;
  /**
   * The media: your image, video or chart, or `'placeholder'` for the dashed stand-in. Leave out for none. It keeps the
   * container's radius and minimum height.
   */
  media?: ReactNode | 'placeholder';
  /** `default`, `risk`, `ai`: a short next-step line under the media. */
  recommendation?: string;
  /** `selected`: an AI Recommendation `InfoBanner`, under the body. */
  banner?: ReactNode;
  /** `selected`: where the content came from ("Source: Order management system · Updated 2 hours ago"). */
  source?: string;
  /** The call to action, with a trailing arrow. */
  cta?: HeroCardCta;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface HeroCardProps extends HeroContentProps, NativeDivProps {
  /** The state. Default `default`. */
  variant?: HeroCardVariant;
  /** A corner ribbon ("New"), Fire orange whatever the department. `default` and `risk` only. */
  ribbon?: string;
  /**
   * Makes the heading a button stretched over the card, which opens the detail (a `CommandBrief`). The card can then be
   * reached and opened from the keyboard. The CTA stays its own button.
   */
  onOpen?: () => void;
}

function Media({ media }: { media: HeroContentProps['media'] }) {
  if (media === undefined || media === null || media === false) return null;
  if (media === 'placeholder')
    return (
      <div className="cui-hero-card__media" data-placeholder="">
        <Image aria-hidden="true" focusable="false" />
        Media placeholder
      </div>
    );
  return <div className="cui-hero-card__media">{media}</div>;
}

function Content({
  variant,
  eyebrow,
  heading,
  headingLevel = 3,
  headingId,
  headingRef,
  body,
  media,
  recommendation,
  banner,
  source,
  cta,
  onOpen,
}: HeroContentProps & {
  variant: HeroCardVariant;
  headingId?: string;
  headingRef?: Ref<HTMLHeadingElement>;
  onOpen?: () => void;
}) {
  const Heading = `h${headingLevel}` as 'h3';
  const selected = variant === 'selected';
  return (
    <>
      <span className="cui-hero-card__eyebrow">{eyebrow}</span>
      <Heading className="cui-hero-card__heading" id={headingId} ref={headingRef} tabIndex={headingRef ? -1 : undefined}>
        {onOpen ? (
          <button type="button" className="cui-hero-card__open" onClick={onOpen}>
            {heading}
          </button>
        ) : (
          heading
        )}
      </Heading>
      <p className="cui-hero-card__body">{body}</p>
      {selected && banner}
      <Media media={media} />
      {!selected && recommendation && <p className="cui-hero-card__recommendation">{recommendation}</p>}
      {selected && source && <p className="cui-hero-card__source">{source}</p>}
      {cta && (
        <span className="cui-hero-card__cta">
          <Button variant={selected ? 'primary' : variant === 'ai' ? 'secondary' : 'ghost'} size="md" trailingArrow="right" onClick={cta.onClick}>
            {cta.label}
          </Button>
        </span>
      )}
    </>
  );
}

/**
 * Collabrium Hero Card: a promotional or insight tile (an announcement, a risk callout, an AI-generated insight), in
 * four states: Default, Risk, AI (Dark) and Selected. A Card sub-component, ported from components.css `.c-herocard*`
 * (1597–1625).
 */
export const HeroCard = forwardRef<HTMLDivElement, HeroCardProps>(function HeroCard(
  { variant = 'default', ribbon, onOpen, eyebrow, heading, headingLevel, body, media, recommendation, banner, source, cta, onMouseMove, onMouseLeave, ...rest },
  ref,
) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const showRibbon = ribbon && (variant === 'default' || variant === 'risk');
  // AI (Dark): a pointer-tracked tilt, -1 to +1 on each axis within the card's bounds, back to 0 on leave.
  const tilting = variant === 'ai';
  return (
    <div
      {...rest}
      ref={ref}
      className="cui-hero-card"
      data-variant={variant}
      data-ribbon={showRibbon ? '' : undefined}
      data-openable={onOpen ? '' : undefined}
      style={tilting ? ({ '--cui-hero-card-mouse-x': tilt.x, '--cui-hero-card-mouse-y': tilt.y } as CSSProperties) : undefined}
      onMouseMove={(event: ReactMouseEvent<HTMLDivElement>) => {
        if (tilting) {
          const r = event.currentTarget.getBoundingClientRect();
          setTilt({ x: ((event.clientX - r.left) / r.width) * 2 - 1, y: ((event.clientY - r.top) / r.height) * 2 - 1 });
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event: ReactMouseEvent<HTMLDivElement>) => {
        if (tilting) setTilt({ x: 0, y: 0 });
        onMouseLeave?.(event);
      }}
    >
      {showRibbon && (
        <div className="cui-hero-card__ribbon" aria-hidden="true">
          <span>{ribbon}</span>
        </div>
      )}
      <Content
        variant={variant}
        eyebrow={eyebrow}
        heading={heading}
        headingLevel={headingLevel}
        body={body}
        media={media}
        recommendation={recommendation}
        banner={banner}
        source={source}
        cta={cta}
        onOpen={onOpen}
      />
    </div>
  );
});

// ---------------------------------------------------------------------------------------------------------------------
// Command brief: the Selected state's modal form.

export interface CommandBriefProps extends Omit<HeroContentProps, 'recommendation'> {
  /** Whether the brief is open. */
  open: boolean;
  /** Called on the close button, a scrim click or Escape. Set `open` to false in it. */
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Collabrium Command brief: the Hero Card's Selected state as a centred dialog over a scrim, opened from a Hero Card
 * (`onOpen`). It swings up into place; closing collapses the panel first, then fades the scrim. Closes on the close
 * button, a scrim click or Escape. Ported from components.css `.c-cbrief*` (1627–1636).
 */
export function CommandBrief({ open, onClose, ...content }: CommandBriefProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  // Mounted while open and while the exit runs (the panel's duration-fast, then the scrim's delayed fade).
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const done = window.setTimeout(() => {
      setMounted(false);
      // Focus goes back to whatever opened the brief (the Modal contract).
      returnTo.current?.focus?.();
    }, tokens.duration.fast * 2);
    return () => window.clearTimeout(done);
  }, [open]);

  // On open, focus moves to the brief's heading (a heading: the approved focus target).
  useEffect(() => {
    if (shown) headingRef.current?.focus();
  }, [shown]);

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

  // Tab stays inside the brief while it is open.
  const trap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(
    <div
      className="cui-command-brief"
      data-open={shown ? '' : undefined}
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="cui-command-brief__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        data-variant="selected"
        onKeyDown={trap}
      >
        <span className="cui-command-brief__close">
          <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Close" onClick={onClose} />
        </span>
        <Content variant="selected" headingId={headingId} headingRef={headingRef} {...content} />
      </div>
    </div>,
    document.body,
  );
}

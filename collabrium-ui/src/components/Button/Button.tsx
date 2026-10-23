'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { ArrowDown, ArrowRight, SpinnerGap, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** Visual variants that components.css ships. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
/** Sizes: sm 32px, md 40px, lg 48px tall. */
export type ButtonSize = 'sm' | 'md' | 'lg';
/** Phosphor weight for a leading icon. */
export type ButtonIconWeight = 'regular' | 'fill';
/** Direction of the optional trailing arrow. */
export type ButtonArrow = 'down' | 'right';
/** CTA beacon state. */
export type ButtonBeacon = 'off' | 'on' | 'static';
/** Why the beacon started or stopped. */
export type ButtonBeaconReason = 'host' | 'hover' | 'touch' | 'focus' | 'click' | 'cap' | 'replaced';

type NativeButtonProps = WithoutStyling<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'color'>
>;

interface ButtonBaseProps extends NativeButtonProps {
  /**
   * Visual emphasis. Required, so every button is a deliberate choice.
   * - `primary`: the one main action on a screen or card (Obsidian fill). Keep one per region.
   * - `secondary`: actions beside a primary button (white fill, Neutral-3 border, shadow-1).
   * - `ghost`: low-emphasis actions, toolbar and table-row actions (no fill).
   */
  variant: ButtonVariant;
  /** Height and type size. `md` (40px) is the default; `sm` (32px) for dense rows and toolbars; `lg` (48px) for prominent standalone actions. */
  size?: ButtonSize;
  /** Native button type. Defaults to `button`, so a button inside a form never submits by accident; set `submit` for the form's submit action. */
  type?: 'button' | 'submit' | 'reset';
  /** Disables the button (Neutral-4 fill, not-allowed cursor). Prefer leaving a button enabled and explaining what is missing when you can. */
  disabled?: boolean;
  /**
   * Shows a centred spinner in place of the content while an action runs.
   * The fill and width stay the same, the button keeps focus and its
   * accessible name, and clicks are ignored (`aria-busy`, `aria-disabled`).
   */
  loading?: boolean;
}

export interface LabelledButtonProps extends ButtonBaseProps {
  /** The visible label. Keep it a short verb phrase ("Save brief"). */
  children: ReactNode;
  iconOnly?: false;
  /** Optional Phosphor icon before the label, e.g. `Plus`. Same colour as the label, sized to the type. */
  leadingIcon?: Icon;
  /** Weight of the leading icon. `regular` (default) for actions (Tier 1); `fill` only for status icons such as `CheckCircle` (Tier 2). */
  leadingIconWeight?: ButtonIconWeight;
  /** Optional trailing arrow pointing to where the next step is. Pairs with `beacon`, which makes the arrow nod. */
  trailingArrow?: ButtonArrow;
  /**
   * CTA beacon: a temporary "look here next" cue on the single next step.
   * Primary with a visible label only; ignored otherwise.
   * - `off` (default)
   * - `on`: a ring breathes out three times (4.2s) and the trailing arrow
   *   nods, then it stops by itself. Hover, focus or press stops it at once.
   *   Only one beacon runs per page: turning one on stops any other. To show
   *   it again later, set `off` and then `on` when a new reason arrives.
   *   Never turn it on at page load or on a timer.
   * - `static`: the ring held still, for documentation, print and tests only.
   */
  beacon?: ButtonBeacon;
  /** Called when the beacon starts or stops, with the reason. */
  onBeaconChange?: (state: { armed: boolean; reason: ButtonBeaconReason }) => void;
}

export interface IconOnlyButtonProps extends ButtonBaseProps {
  /** Square button with no visible label. Not available for links. */
  iconOnly: true;
  /** The Phosphor icon, e.g. `DotsThree`, `X`, `PencilSimple`, `Trash`. Must be a functional (Tier 1) icon; it always renders Regular. */
  icon: Icon;
  /** Required: names the action for assistive tech, e.g. "More options". */
  'aria-label': string;
  children?: never;
  leadingIcon?: never;
  leadingIconWeight?: never;
  trailingArrow?: never;
  beacon?: never;
  onBeaconChange?: never;
}

export type ButtonProps = LabelledButtonProps | IconOnlyButtonProps;

/* One beacon per page, across every button: arming one disarms the other. */
let activeBeacon: { disarm: (reason: ButtonBeaconReason) => void } | null = null;

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/**
 * Collabrium Button. A real `<button>` with the DLS variants, sizes and
 * states. Ported from components.css `.c-btn`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, forwardedRef) {
  const {
    variant,
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    iconOnly,
    icon,
    leadingIcon,
    leadingIconWeight = 'regular',
    trailingArrow,
    beacon = 'off',
    onBeaconChange,
    children,
    onClick,
    ...rest
  } = props as Omit<LabelledButtonProps, 'iconOnly'> & { iconOnly?: boolean; icon?: Icon };

  const innerRef = useRef<HTMLButtonElement | null>(null);
  const ref = useCallback(
    (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      setRef(forwardedRef, node);
    },
    [forwardedRef],
  );

  // CTA beacon: armed only for a labelled, enabled Primary.
  const canBeacon = variant === 'primary' && !iconOnly && !disabled && !loading;
  const [armed, setArmed] = useState(false);
  const onBeaconChangeRef = useRef(onBeaconChange);
  onBeaconChangeRef.current = onBeaconChange;

  useEffect(() => {
    const el = innerRef.current;
    if (beacon !== 'on' || !canBeacon || !el) return;

    const controller = new AbortController();
    const self = {
      disarm(reason: ButtonBeaconReason) {
        controller.abort();
        if (activeBeacon === self) activeBeacon = null;
        setArmed(false);
        onBeaconChangeRef.current?.({ armed: false, reason });
      },
    };
    activeBeacon?.disarm('replaced');
    activeBeacon = self;
    setArmed(true);
    onBeaconChangeRef.current?.({ armed: true, reason: 'host' });

    const o = { signal: controller.signal };
    el.addEventListener('pointerenter', e => self.disarm(e.pointerType === 'mouse' ? 'hover' : 'touch'), o);
    el.addEventListener('focus', () => self.disarm('focus'), o);
    el.addEventListener('click', () => self.disarm('click'), o);
    el.addEventListener(
      'animationend',
      e => {
        if (e.target === el && /^cui-button-beacon-(ring|hold)$/.test(e.animationName)) self.disarm('cap');
      },
      o,
    );

    return () => {
      // Turned off by the host or unmounted: stop quietly.
      if (!controller.signal.aborted) {
        controller.abort();
        if (activeBeacon === self) activeBeacon = null;
        setArmed(false);
      }
    };
  }, [beacon, canBeacon]);

  const beaconAttr = !iconOnly && variant === 'primary' ? (beacon === 'static' ? 'static' : armed ? 'on' : undefined) : undefined;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const LeadingIcon = iconOnly ? icon : leadingIcon;
  const Arrow = trailingArrow === 'down' ? ArrowDown : trailingArrow === 'right' ? ArrowRight : null;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className="cui-button"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? '' : undefined}
      data-loading={loading ? '' : undefined}
      data-beacon={beaconAttr}
      aria-busy={loading || undefined}
      aria-disabled={loading || rest['aria-disabled'] || undefined}
    >
      {LeadingIcon && (
        <LeadingIcon
          className="cui-button__icon"
          weight={iconOnly ? 'regular' : leadingIconWeight}
          aria-hidden="true"
          focusable="false"
        />
      )}
      {!iconOnly && <span className="cui-button__label">{children}</span>}
      {Arrow && !iconOnly && (
        <Arrow
          className="cui-button__icon cui-button__arrow"
          data-arrow={trailingArrow}
          aria-hidden="true"
          focusable="false"
        />
      )}
      {loading && <SpinnerGap className="cui-button__spinner" aria-hidden="true" focusable="false" />}
    </button>
  );
});

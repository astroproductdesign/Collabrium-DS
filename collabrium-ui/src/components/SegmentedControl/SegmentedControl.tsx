'use client';

import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Tooltip } from '../Tooltip';

export type SegmentedControlSize = 'default' | 'compact';

export interface SegmentedTextOption {
  /** The option's value. */
  value: string;
  /** The visible label, uppercase, 6 characters at most ("QTD"). Rewrite a longer one. */
  label: string;
  /** An option that can't be chosen right now. */
  disabled?: boolean;
  icon?: undefined;
}

export interface SegmentedIconOption {
  /** The option's value. */
  value: string;
  /** The option's name: read by screen readers and shown in the tooltip ("List view"). */
  label: string;
  /** The option's icon, Phosphor, drawn Regular. */
  icon: Icon;
  /** An option that can't be chosen right now. */
  disabled?: boolean;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange' | 'role'>>;

export interface SegmentedControlProps extends NativeDivProps {
  /**
   * 2 to 5 options, all text or all icons: one instance never mixes them. If one option has no clear icon, use text
   * for all of them.
   */
  options: SegmentedTextOption[] | SegmentedIconOption[];
  /** Names the control ("View mode", "Date range"). */
  'aria-label': string;
  /** The selected value, when you control it. */
  value?: string;
  /** The selected value on first render when you don't control it. Default: the first enabled option. */
  defaultValue?: string;
  /** Called with the newly selected value. The choice takes effect at once: no save step. */
  onValueChange?: (value: string) => void;
  /** `default` (36px) in a section header; `compact` (28px) in a toolbar or tight row. Default `default`. */
  size?: SegmentedControlSize;
  /** Disables the whole control: track and segments at 40%. */
  disabled?: boolean;
}

interface PillBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Collabrium Segmented Control: switches between 2 to 5 views of the same content (List / Grid / Board, MTD / QTD /
 * YTD). A Neutral-2 track of equal-width segments; the selected one sits on a white pill that slides to it. The choice
 * takes effect at once. Icon options carry the library's Tooltip. Ported from components.css `.c-segctl` / `.c-seg` /
 * `.c-seg-pill` (4436–4463); the source's own tooltip (`.c-seg-tt-*`, 4469–4471) is replaced by Tooltip.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, 'aria-label': label, value, defaultValue, onValueChange, size = 'default', disabled = false, ...rest },
  ref,
) {
  const list = options as Array<SegmentedTextOption | SegmentedIconOption>;
  const iconOnly = list.length > 0 && list[0].icon !== undefined;
  const firstEnabled = list.find(o => !o.disabled)?.value;
  const [own, setOwn] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? own;

  const choose = (next: string) => {
    if (disabled) return;
    if (value === undefined) setOwn(next);
    onValueChange?.(next);
  };

  // Keyboard (the DS): ← and → move focus between enabled segments, wrapping; Space or Enter selects the focused one
  // (a native button click). Only one segment is a Tab stop: the selected one.
  // TODO(open-question Q-SEG-4): the DS also has Escape return focus to whatever had it before; not built.
  const segments = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
    const order = list.map((o, i) => i).filter(i => !list[i].disabled);
    const at = order.indexOf(index);
    const target =
      event.key === 'ArrowRight' ? order[(at + 1) % order.length]
      : event.key === 'ArrowLeft' ? order[(at - 1 + order.length) % order.length]
      : event.key === 'Home' ? order[0]
      : order[order.length - 1];
    event.preventDefault();
    segments.current[target]?.focus();
  };

  // The pill: one shared element, sized and moved to the selected segment. Its containing block is the track's padding
  // box (already inside the 1px border), so the segment's offset is measured from there. It is placed without a
  // transition the first time, so it never slides in on load.
  const track = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState<PillBox | null>(null);
  const [settled, setSettled] = useState(false);
  const place = useCallback(() => {
    const el = track.current;
    const index = list.findIndex(o => o.value === selected);
    const seg = segments.current[index];
    if (!el || !seg) return setPill(null);
    const t = el.getBoundingClientRect();
    const s = seg.getBoundingClientRect();
    setPill({ x: s.left - t.left - el.clientLeft, y: s.top - t.top - el.clientTop, width: s.width, height: s.height });
  }, [list, selected]);
  useLayoutEffect(() => {
    place();
  }, [place]);
  useLayoutEffect(() => {
    const el = track.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => place());
    observer.observe(el);
    return () => observer.disconnect();
  }, [place]);
  useLayoutEffect(() => {
    if (!pill || settled) return;
    const raf = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(raf);
  }, [pill, settled]);

  return (
    <div
      {...rest}
      ref={node => {
        track.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="cui-segmented"
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-kind={iconOnly ? 'icon' : 'text'}
      data-pill={pill ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      {pill && (
        <span
          className="cui-segmented__pill"
          aria-hidden="true"
          data-settled={settled ? '' : undefined}
          style={{ width: pill.width, height: pill.height, transform: `translate(${pill.x}px, ${pill.y}px)` }}
        />
      )}
      {list.map((option, index) => {
        const on = option.value === selected;
        const OptionIcon = option.icon;
        const button = (
          <button
            key={option.value}
            ref={el => {
              segments.current[index] = el;
            }}
            type="button"
            role="radio"
            className="cui-segmented__segment"
            aria-checked={on}
            aria-label={OptionIcon ? option.label : undefined}
            tabIndex={on && !disabled ? 0 : -1}
            disabled={disabled || option.disabled}
            onClick={() => choose(option.value)}
            onKeyDown={event => onKeyDown(event, index)}
          >
            {OptionIcon ? <OptionIcon className="cui-segmented__icon" aria-hidden="true" focusable="false" /> : option.label}
          </button>
        );
        if (!iconOnly) return button;
        // Icon only: the library's Tooltip names the option on hover and keyboard focus. It renders above the page, so
        // no box that clips its content can cut it off, and flips below when there's no room above. As a label tooltip
        // it is also the segment's name (decided 2026-11-06, user; Q-SEG-6).
        return (
          <Tooltip key={option.value} content={option.label} role="label">
            {button}
          </Tooltip>
        );
      })}
    </div>
  );
});

'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { CaretLeft, CaretRight, type Icon } from '@phosphor-icons/react';
import { tokens } from '../../tokens/tokens';
import { useReducedMotion } from '../../motion';
import type { WithoutStyling } from '../../utils/types';

export interface TabsItem {
  /** A stable id, also what `value` and `onValueChange` use ("overview"). */
  id: string;
  /** The visible label. Always there: icon-only tabs aren't allowed. */
  label: string;
  /** An optional leading icon, Phosphor, drawn Regular (Tier 1) at 16px. */
  icon?: Icon;
  /** An optional count of items in that section. Hidden at 0; past 99 it reads "99+". */
  count?: number;
  /** A tab that can't be chosen right now. Never the active one. */
  disabled?: boolean;
  /** The section's content, shown under the tabs while this tab is active. Leave out to render the content yourself. */
  content?: ReactNode;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange'>>;

/** The surface the tabs sit on, so the edge fades blend into it. */
export type TabsSurface = 'default' | 'canvas';

export interface TabsProps extends NativeDivProps {
  /** The tabs, in order. About six at most: past that, use SidebarNav or a Select. */
  tabs: TabsItem[];
  /** Names the tab list for screen readers ("Campaign sections"). */
  'aria-label': string;
  /** The active tab's id, when you control it (from a `?tab=` URL parameter, say). An unknown id falls back to the first tab. */
  value?: string;
  /** The tab active on first load when you don't control it. Default: the first tab. */
  defaultValue?: string;
  /** Called with the chosen tab's id. */
  onValueChange?: (id: string) => void;
  /**
   * What the tabs sit on, for the colour of the edge fades: `default` (Neutral-1: a card, a white panel) or `canvas`
   * (the warm page canvas). Default `default`.
   */
  surface?: TabsSurface;
  /**
   * Adds a left and a right arrow button at the edges of an overflowing row, for mouse users (a plain wheel can't
   * scroll sideways). Each shows only while its edge hides tabs, and never on touch screens. Default `false`.
   */
  scrollButtons?: boolean;
}

const FADE_EDGE = 1;
/** How much of the visible row one arrow click scrolls. */
const SCROLL_STEP = 0.8;

/**
 * Collabrium Tabs: in-page section switching. A full-width row of tabs over a 1px track, the active one underlined in
 * Obsidian, and the active section's panel 16px below; the incoming and outgoing panels cross-fade. The row scrolls
 * sideways when the tabs don't fit, with a fade on whichever edge hides a tab. Arrow keys, Home and End move between
 * tabs. Ported from components.css `.c-tabs-scroll-wrap` / `.c-tabs` / `.c-tab` (2978–3000).
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { tabs, 'aria-label': label, value, defaultValue, onValueChange, surface = 'default', scrollButtons = false, ...rest },
  ref,
) {
  const base = useId();
  const reduce = useReducedMotion();
  const enabled = tabs.filter(t => !t.disabled);
  const resolve = (id: string | undefined) => (id && enabled.some(t => t.id === id) ? id : enabled[0]?.id);
  const [own, setOwn] = useState(() => resolve(defaultValue));
  const active = resolve(value ?? own);

  const choose = (id: string) => {
    if (value === undefined) setOwn(id);
    onValueChange?.(id);
  };

  // Keyboard: arrows move to the next or previous enabled tab (wrapping), Home and End to the ends; the tab moved to
  // becomes active. Only the active tab is a Tab stop.
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const order = tabs.map((t, i) => i).filter(i => !tabs[i].disabled);
    const at = order.indexOf(index);
    const target =
      event.key === 'ArrowRight' ? order[(at + 1) % order.length]
      : event.key === 'ArrowLeft' ? order[(at - 1 + order.length) % order.length]
      : event.key === 'Home' ? order[0]
      : event.key === 'End' ? order[order.length - 1]
      : undefined;
    if (target === undefined) return;
    event.preventDefault();
    choose(tabs[target].id);
    buttons.current[target]?.focus();
  };

  // The edge fades: shown on whichever side still hides a tab.
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > FADE_EDGE, right: el.scrollLeft < max - FADE_EDGE });
  }, []);
  useEffect(() => {
    measure();
    const el = track.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, tabs.length]);

  // Keep the active tab in view in the row when it changes (by keyboard, or from outside). Only the row scrolls, never
  // the page, and not on first render.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = track.current;
    const button = buttons.current[tabs.findIndex(t => t.id === active)];
    if (!el || !button) return;
    const left = button.offsetLeft - el.offsetLeft;
    if (left < el.scrollLeft) el.scrollLeft = left;
    else if (left + button.offsetWidth > el.scrollLeft + el.clientWidth) el.scrollLeft = left + button.offsetWidth - el.clientWidth;
  }, [active, tabs]);

  // The panels cross-fade: the incoming one fades in while the outgoing one fades out, at the same time. Under reduced
  // motion they swap at once. The outgoing panel is worked out in the same render as the switch, so it never drops out
  // for a frame before its fade starts.
  // Both are CSS animations, so they start on the same frame.
  const [shownId, setShownId] = useState(active);
  const [leaving, setLeaving] = useState<string | null>(null);
  if (active !== shownId) {
    setShownId(active);
    setLeaving(reduce ? null : shownId ?? null);
  }
  useEffect(() => {
    if (!leaving) return;
    const done = window.setTimeout(() => setLeaving(null), tokens.duration.fast);
    return () => window.clearTimeout(done);
  }, [leaving]);

  // The arrow buttons scroll the row by most of what's in view (decided 2026-11-06, user).
  const page = (direction: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * SCROLL_STEP, behavior: reduce ? 'auto' : 'smooth' });
  };

  const hasPanels = tabs.some(t => t.content !== undefined);

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-tabs"
      data-surface={surface === 'default' ? undefined : surface}
      data-scroll-buttons={scrollButtons ? '' : undefined}
    >
      <div className="cui-tabs__scroll" data-fade-left={edges.left ? '' : undefined} data-fade-right={edges.right ? '' : undefined}>
        {/* Mouse-only helpers: hidden from screen readers and out of the Tab order, since ← and → already do this. */}
        {scrollButtons && (
          <>
            <button type="button" className="cui-tabs__arrow" data-side="left" tabIndex={-1} aria-hidden="true" hidden={!edges.left} onClick={() => page(-1)}>
              <span className="cui-tabs__arrow-face">
                <CaretLeft focusable="false" />
              </span>
            </button>
            <button type="button" className="cui-tabs__arrow" data-side="right" tabIndex={-1} aria-hidden="true" hidden={!edges.right} onClick={() => page(1)}>
              <span className="cui-tabs__arrow-face">
                <CaretRight focusable="false" />
              </span>
            </button>
          </>
        )}
        <div ref={track} className="cui-tabs__list" role="tablist" aria-label={label} onScroll={measure}>
          {tabs.map((tab, index) => {
            const on = tab.id === active;
            const TabIcon = tab.icon;
            const count = tab.count && tab.count > 0 ? (tab.count > 99 ? '99+' : String(tab.count)) : null;
            return (
              <button
                key={tab.id}
                ref={el => {
                  buttons.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${tab.id}`}
                className="cui-tabs__tab"
                aria-selected={on}
                aria-controls={tab.content !== undefined ? `${base}-panel-${tab.id}` : undefined}
                tabIndex={on ? 0 : -1}
                disabled={tab.disabled}
                data-active={on ? '' : undefined}
                onClick={() => choose(tab.id)}
                onKeyDown={event => onKeyDown(event, index)}
              >
                {TabIcon && <TabIcon className="cui-tabs__icon" aria-hidden="true" focusable="false" />}
                {tab.label}
                {/* A pause before the count for screen readers: "Campaigns, 8" (decided 2026-11-06, Q-TABS-9). */}
                {count && <span className="cui-tabs__spoken">, </span>}
                {count && <span className="cui-tabs__count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {hasPanels && (
        <div className="cui-tabs__panels">
          {tabs.map(tab => {
            if (tab.content === undefined) return null;
            const on = tab.id === active;
            const out = tab.id === leaving;
            return (
              <div
                key={tab.id}
                id={`${base}-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`${base}-tab-${tab.id}`}
                className="cui-tabs__panel"
                hidden={!on && !out}
                inert={out}
                aria-hidden={out || undefined}
                data-state={on ? (leaving ? 'entering' : 'shown') : out ? 'leaving' : undefined}
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

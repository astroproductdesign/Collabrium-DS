'use client';

import { forwardRef, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Icon } from '@phosphor-icons/react';
import { transition } from '../motion';
import { accentValue, type AccentName } from '../lib/accent';

export interface ExpandingTab {
  /** Keys the tab and is what `value` holds. Unique within the list. */
  id: string;
  /** The tab's name. It is shown beside the icon while the tab is active, and always read by assistive technology. */
  label: string;
  /** The tab's icon, as a Phosphor icon component. */
  icon: Icon;
  /** The icon's colour while the tab is active: Obsidian or one of the seven series colours. Default `obsidian`. */
  color?: AccentName;
}

export interface ExpandingTabsProps {
  /** Names the group of tabs, e.g. "Mailbox". */
  'aria-label': string;
  /** The tabs, in order. Two to five read well. */
  tabs: ExpandingTab[];
  /** The id of the active tab. Leave out to let the tabs keep it, starting with the first. */
  value?: string;
  /** Called with the id of the tab that was chosen. */
  onValueChange?: (id: string) => void;
}

/**
 * A row of tabs that are icons until one is active: the active tab opens to
 * show its label. It is a real tab list: arrow keys move between tabs, Home and
 * End go to the ends, and only the active tab is a Tab stop. It controls no
 * panels itself; the page shows the content for the active id. Under reduced
 * motion the label appears at once.
 */
export const ExpandingTabs = forwardRef<HTMLDivElement, ExpandingTabsProps>(function ExpandingTabs(
  { 'aria-label': label, tabs, value, onValueChange },
  ref,
) {
  const [own, setOwn] = useState(tabs[0]?.id);
  const reduce = useReducedMotion();
  const active = value ?? own;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const choose = (id: string) => {
    if (value === undefined) setOwn(id);
    onValueChange?.(id);
  };
  const key = (e: KeyboardEvent, i: number) => {
    const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(tabs[next].id);
    buttons.current[next]?.focus();
  };
  const t = reduce ? { duration: 0 } : transition('base', 'settle');
  return (
    <div ref={ref} className="cui-expanding-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab, i) => {
        const on = tab.id === active;
        const TabIcon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            ref={el => void (buttons.current[i] = el)}
            type="button"
            role="tab"
            id={`${tab.id}-tab`}
            aria-selected={on}
            aria-label={tab.label}
            tabIndex={on ? 0 : -1}
            className="cui-expanding-tabs__tab"
            data-active={on ? '' : undefined}
            style={{ ['--cui-tab-color' as string]: accentValue(tab.color ?? 'obsidian') }}
            layout
            transition={t}
            onClick={() => choose(tab.id)}
            onKeyDown={e => key(e, i)}
          >
            <TabIcon size={18} weight={on ? 'fill' : 'regular'} aria-hidden="true" />
            <AnimatePresence initial={false}>
              {on && (
                <motion.span className="cui-expanding-tabs__label" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={t} aria-hidden="true">
                  {tab.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
});

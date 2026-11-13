'use client';

import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { BackToTop } from '../BackToTop';
import { AppShellNavContext, type AppShellTier } from './context';
import type { WithoutStyling } from '../../utils/types';

type NativeDivProps = WithoutStyling<HTMLAttributes<HTMLDivElement>>;

/** Where the shell takes its height from. */
export type AppShellFit = 'viewport' | 'container';
/** How wide the content runs. */
export type AppShellWidth = 'full' | 'reading';

export interface AppShellProps extends NativeDivProps {
  /** The main nav: a `SidebarNav`, passed unmodified. App Shell places it; it never restyles it. */
  nav: ReactNode;
  /**
   * The top of the screen: a `PageHeader`, with a `BackButton` above it on Level 2+ screens. There is no top bar.
   * 48px (`--section-gap`) separates it from the content.
   */
  header?: ReactNode;
  /** The content region: stacked regions 48px apart. Lay boxes out with `ContentGrid`. */
  children?: ReactNode;
  /**
   * `full` (the default) runs edge to edge, for dashboards. `reading` centres the content at 1200px
   * (`--content-max-width`), for settings and detail panels.
   */
  width?: AppShellWidth;
  /**
   * `viewport` (the default): the shell is the page, the window's full height. `container`: it fills its parent's
   * height instead, for a shell shown inside a bounded box (a docs example, a design review frame).
   */
  fit?: AppShellFit;
  /** Adds Back to top for the content region, which is what scrolls inside the shell. */
  backToTop?: boolean;
}

/**
 * Collabrium App Shell: the frame every screen sits in. The warm canvas, the main nav inset 16px from the window's
 * top, left and bottom, and beside it the content region, the only part that scrolls, with the page header at its
 * top. Below 1024px the nav is collapsed to its rail; at 768px and under it floats over the content as a card.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(props, ref) {
  const { nav, header, children, width = 'full', fit = 'viewport', backToTop = false, ...rest } = props;
  const contentRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const setShell = (el: HTMLDivElement | null) => {
    shellRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  // The size step comes from the shell's own CSS, so it follows whichever width rules apply (the window's, or a
  // narrowed preview frame's). Read before first paint and again whenever the shell resizes.
  const [tier, setTier] = useState<AppShellTier>('desktop');
  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const read = () => {
      const t = getComputedStyle(el).getPropertyValue('--cui-app-shell-tier').trim();
      setTier(t === 'phone' || t === 'tablet' ? t : 'desktop');
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div {...rest} ref={setShell} className="cui-app-shell" data-fit={fit}>
      <div className="cui-app-shell__nav">
        <AppShellNavContext.Provider value={tier}>{nav}</AppShellNavContext.Provider>
      </div>
      <div className="cui-app-shell__main">
        <main ref={contentRef} className="cui-app-shell__content">
          <div className="cui-app-shell__inner" data-width={width === 'reading' ? 'reading' : undefined}>
            {header != null && <div className="cui-app-shell__header">{header}</div>}
            {children}
          </div>
        </main>
      </div>
      {backToTop && <BackToTop scrollRef={contentRef} />}
    </div>
  );
});

/** A box's width in the content grid: a whole span of the 4 columns, never a fraction. */
export type ContentGridSpan = 1 | 2 | 3 | 4;

export interface ContentGridProps extends NativeDivProps {
  /**
   * The gap between boxes in a row: `16` (the default) or `20`. Pick one per product and hold it; rows are always
   * 24px apart.
   */
  columnGap?: 16 | 20;
  /** `ContentGridItem`s. */
  children?: ReactNode;
}

/** App Shell's content grid: 4 equal columns; boxes in a row share the tallest one's height. */
export const ContentGrid = forwardRef<HTMLDivElement, ContentGridProps>(function ContentGrid(props, ref) {
  const { columnGap = 16, children, ...rest } = props;
  return (
    <div {...rest} ref={ref} className="cui-content-grid" data-gap={columnGap === 20 ? '20' : undefined}>
      {children}
    </div>
  );
});

export interface ContentGridItemProps extends NativeDivProps {
  /** How many of the 4 columns the box spans. Default 1. */
  span?: ContentGridSpan;
  /** One box (a Card, a StatGrid…). It stretches to the row's height. */
  children?: ReactNode;
}

/** One box in the content grid. */
export const ContentGridItem = forwardRef<HTMLDivElement, ContentGridItemProps>(function ContentGridItem(props, ref) {
  const { span = 1, children, ...rest } = props;
  return (
    <div {...rest} ref={ref} className="cui-content-grid__item" data-span={span}>
      {children}
    </div>
  );
});

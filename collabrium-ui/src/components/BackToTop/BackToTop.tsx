'use client';

import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type RefObject } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

type NativeButtonProps = WithoutStyling<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'onClick' | 'aria-label' | 'title'>
>;

export interface BackToTopProps extends NativeButtonProps {
  /**
   * The region that scrolls, when the page scrolls inside a frame rather than the window (App Shell's content). The
   * window is always read too: the larger of the two counts, and a click scrolls both to the top.
   */
  scrollRef?: RefObject<HTMLElement | null>;
  /** The button's name and its hover text. Default "Back to top". */
  label?: string;
}

// The DS's two thresholds: appear past 480px, hide only under 240px; between them it keeps its state (no flicker).
const SHOW_AT = 480;
const HIDE_AT = 240;
// The page flag Toast's stack reads to rise above the button (the DS's `html.c-back-to-top-shown`).
const PAGE_FLAG = 'data-cui-back-to-top-shown';

/**
 * Collabrium Back to top: a small floating button, bottom-right of the window, that appears once the reader is well
 * down a long page and scrolls back to the top. Mount it once per page. Ported from components.css `.c-back-to-top`
 * (5103–5138).
 */
export const BackToTop = forwardRef<HTMLButtonElement, BackToTopProps>(function BackToTop(props, ref) {
  const { scrollRef, label = 'Back to top', ...rest } = props;
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const region = scrollRef?.current ?? null;
    const read = () => {
      const top = Math.max(window.scrollY, region?.scrollTop ?? 0);
      const next = top > SHOW_AT ? true : top < HIDE_AT ? false : visibleRef.current;
      if (next !== visibleRef.current) {
        visibleRef.current = next;
        setVisible(next);
      }
    };
    read(); // on mount, not only on scroll: a page reopened part-way down shows it at once
    window.addEventListener('scroll', read, { passive: true });
    region?.addEventListener('scroll', read, { passive: true });
    return () => {
      window.removeEventListener('scroll', read);
      region?.removeEventListener('scroll', read);
    };
  }, [scrollRef]);

  // The page flag, in step with the button; cleared when it unmounts.
  useEffect(() => {
    const html = document.documentElement;
    if (visible) html.setAttribute(PAGE_FLAG, '');
    else html.removeAttribute(PAGE_FLAG);
    return () => html.removeAttribute(PAGE_FLAG);
  }, [visible]);

  const toTop = () => {
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    // Both: scrolling one already at 0 costs nothing; guessing the wrong one would make the button do nothing.
    window.scrollTo({ top: 0, behavior });
    scrollRef?.current?.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      className="cui-back-to-top"
      data-visible={visible || undefined}
      aria-label={label}
      title={label}
      onClick={toTop}
    >
      <ArrowUp className="cui-back-to-top__icon" weight="regular" aria-hidden="true" focusable="false" />
    </button>
  );
});

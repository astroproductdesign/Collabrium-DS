'use client';

// The DLS Back to top (DESIGN-SYSTEM.md, Back to top; markup and CSS copied
// from components.css 5100–5135), with one change the docs site asked for:
// it appears once the reader has scrolled past 25% of the page, instead of
// the DLS's fixed 480px. The DLS's two-threshold rule is kept at the same
// ratio (480 → 240 is 2:1), so it hides again only under 12.5%, and does
// not flicker when someone scrubs around the boundary.
//
// The docs pane scrolls on wide screens and the window scrolls on narrow
// ones, so both are read and the larger is used (the one that is not
// scrolling reports 0), and a click scrolls both to the top.
import { useCallback, useEffect, useRef, useState } from 'react';

const SHOW_PAST = 0.25;
const HIDE_UNDER = SHOW_PAST / 2;

function progress(el: Element | null) {
  if (!el) return 0;
  const room = el.scrollHeight - el.clientHeight;
  return room > 0 ? el.scrollTop / room : 0;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const shown = useRef(false);

  const read = useCallback(() => {
    const pane = document.getElementById('main');
    const page = document.scrollingElement;
    const p = Math.max(progress(pane), progress(page));
    const next = p > SHOW_PAST ? true : p < HIDE_UNDER ? false : shown.current;
    if (next !== shown.current) {
      shown.current = next;
      setVisible(next);
      document.documentElement.classList.toggle('c-back-to-top-shown', next);
    }
  }, []);

  useEffect(() => {
    const pane = document.getElementById('main');
    pane?.addEventListener('scroll', read, { passive: true });
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    read(); // on mount, not only on scroll
    return () => {
      pane?.removeEventListener('scroll', read);
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      document.documentElement.classList.remove('c-back-to-top-shown');
    };
  }, [read]);

  const toTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById('main')?.scrollTo({ top: 0, behavior });
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button type="button" className={`c-back-to-top${visible ? ' is-visible' : ''}`} aria-label="Back to top" title="Back to top" onClick={toTop}>
      <i className="ph ph-arrow-up" aria-hidden="true" />
    </button>
  );
}

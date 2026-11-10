// Documentation for Back to top, rendered by the docs site (playground).
// Keep it consistent with BackToTop.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { Button } from '../Button';
import { ToastProvider, useToast } from '../Toast';
import { BackToTop } from './BackToTop';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Back to top';

export const description =
  'A small floating button in the bottom-right corner. It appears once the reader is well down a long page and takes them back to the top in one click.';

export const usage = `import { BackToTop } from '@collabrium/ui';

// Once per long page, anywhere in its tree.
<BackToTop />`;

// A picture of the button (not a live one: the page has its own, and there is one per page).
export const thumbnail = () => (
  <span className="docs-btt-thumb">
    <span className="cui-back-to-top" data-visible="">
      <ArrowUp className="cui-back-to-top__icon" weight="regular" aria-hidden="true" />
    </span>
  </span>
);

/** This docs page's own: scroll the page past 480px and it shows in the window's corner; a toast then sits above it. */
function ShowToast() {
  const { toast } = useToast();
  return (
    <Button variant="secondary" onClick={() => toast({ tone: 'success', title: 'Saved', message: 'Your changes are live.' })}>
      Show a toast
    </Button>
  );
}
function PageExample() {
  const anchor = useRef<HTMLSpanElement | null>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [top, setTop] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    // The docs page scrolls inside its pane (the window on phones); BackToTop reads both.
    const pane = anchor.current?.closest<HTMLElement>('.docs-pane') ?? null;
    scrollRef.current = pane;
    setReady(true);
    const read = () => {
      setTop(Math.max(window.scrollY, pane?.scrollTop ?? 0));
      setShown(document.documentElement.hasAttribute('data-cui-back-to-top-shown'));
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    pane?.addEventListener('scroll', read, { passive: true });
    // The button sets its page flag after it re-renders, so watch the flag too.
    const flag = new MutationObserver(read);
    flag.observe(document.documentElement, { attributes: true, attributeFilter: ['data-cui-back-to-top-shown'] });
    return () => {
      window.removeEventListener('scroll', read);
      pane?.removeEventListener('scroll', read);
      flag.disconnect();
    };
  }, []);
  const holding = top >= 240 && top <= 480;
  return (
    <ToastProvider>
      <span ref={anchor} />
      <ShowToast />
      <p className="docs-btt-readout">
        This page: scrolled <b>{Math.round(top)}px</b> · {shown ? 'Visible' : 'Hidden'}
        {holding ? ', holding its state between 240 and 480' : ''}
      </p>
      {ready && <BackToTop scrollRef={scrollRef} />}
    </ToastProvider>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Back to top',
    element: 'button.cui-back-to-top',
    description: '32px circle, Neutral-1, 1px Neutral-3, shadow-2; fixed in the bottom-right corner, 24px from the edges (12px on phones). A 44px hit area around it.',
    children: [
      { name: 'Icon', element: 'svg.cui-back-to-top__icon', description: 'ArrowUp, Regular, 16px, Neutral-9.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'On this page, with toasts',
    description: 'This page has one, in the window\'s bottom-right corner. It appears once you have scrolled past 480px and hides only when you are back above 240px, so it never flickers. Show a toast: the stack sits 12px above the button. Scroll to the top and the button hides, and the toast drops back to the corner.',
    render: () => <PageExample />,
    code: `<ToastProvider>
  {/* the page */}
  <BackToTop />
</ToastProvider>`,
  },
];

export const props: DocsProp[] = [
  { name: 'scrollRef', options: 'RefObject<HTMLElement>', default: '—', description: 'The region that scrolls, when the page scrolls inside a frame (App Shell\'s content). The window is always read too.' },
  { name: 'label', options: 'string', default: '"Back to top"', description: 'The button\'s name and hover text.' },
];

export const rules: DocsRules = {
  do: [
    'Mount it once, on pages long enough to need it.',
    'Above a permanent bottom bar, set `--cui-back-to-top-bottom` on `<html>` once (e.g. 96px).',
    'Let an Action bar lift it on its own.',
  ],
  dont: [
    'Don\'t set `--cui-back-to-top-bottom` on the button: Toast can\'t see it there.',
    'Don\'t move it any other way: every position change goes through that offset.',
    'Don\'t confuse it with Back button, which goes up to the parent screen.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab reaches it while it shows; Enter or Space scrolls to the top. Hidden, it is out of the tab order.',
  notes: [
    'A real `<button>` named "Back to top" (also its hover text).',
    'Hidden uses `visibility: hidden`, so it leaves the tab order and the accessibility tree; on the way out it stays until the fade ends.',
    'The scroll is smooth, or instant under reduced motion.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Appear / hide', motion: 'Fades and rises 8px (hides the reverse).', token: '--duration-base · --ease-settle' },
  { interaction: 'Hover', motion: 'Neutral-2 fill and shadow-3.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Above an Action bar', motion: 'Glides up, and back down when it closes.', token: '--duration-base · --ease-standard' },
  { interaction: 'Scroll to top', motion: 'Smooth scroll.', token: '—' },
  { interaction: 'Reduced motion', motion: 'No travel or glide; the fade stays; the scroll is instant.', token: '—' },
];

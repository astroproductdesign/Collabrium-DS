// Pieces the Motion docs files share. Docs site only: not shipped.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../../components/Button';
import type { DocsAccessibility, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

/** A show/hide demo: a button that toggles `show`, and the stage the sample sits in. */
export function ShowDemo({ children }: { children: (show: boolean) => ReactNode }) {
  const [show, setShow] = useState(true);
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
        {show ? 'Hide' : 'Show'}
      </Button>
      {children(show)}
    </div>
  );
}

/**
 * A card thumbnail that plays the piece on a loop: shown for 1.6s, hidden for
 * 0.8s. Under reduced motion it stays shown and still, since a loop is
 * motion that nobody asked for.
 */
export function LoopDemo({ children }: { children: (show: boolean) => ReactNode }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setShow(s => !s), show ? 1600 : 800);
    return () => window.clearTimeout(id);
  }, [show]);
  return <div className="docs-motion-stage docs-motion-loop">{children(show)}</div>;
}

export const showProp: DocsProp = { name: 'show', options: 'boolean', default: 'true', description: 'Whether the content is shown. Toggling it animates the content in or out; when false the content is removed from the page.' };
export const durationProp = (d: string): DocsProp => ({ name: 'duration', options: "'instant' | 'fast' | 'base' | 'slow' | 'ambient' | 'morph' | 'reveal'", default: `'${d}'`, description: 'A duration token. Use `fast` for small hints, `base` for ordinary UI, `slow` for larger surfaces.' });
export const easeProp = (e: string): DocsProp => ({ name: 'ease', options: "'standard' | 'settle' | 'flow' | 'flare' | 'precise' | 'grow' | 'morph' | 'reveal'", default: `'${e}'`, description: 'An easing token. Keep the default unless the motion belongs to an element.' });
export const appearProp: DocsProp = { name: 'appear', options: 'boolean', default: 'false', description: 'Animate on the first render too. Left off, content that is present on load just appears.' };
export const childrenProp: DocsProp = { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The content to animate.' };

export const wrapperRules: DocsRules = {
  do: [
    'Wrap content that arrives or leaves because of something the person did or something that finished.',
    'Choose a duration and an easing by token name; leave the defaults unless the content has a reason to differ.',
    'Keep the content\'s own layout in the content: the wrapper only moves and fades it.',
  ],
  dont: [
    "Don't wrap everything on a page: motion has a job, and a page that is all moving has no focus.",
    "Don't animate content the person is trying to read or act on while it moves.",
    "Don't pass your own duration or easing numbers: the props take token names.",
  ],
};

export const wrapperAccessibility = (what: string): DocsAccessibility => ({
  keyboard: 'None: the wrapper adds no controls and takes no focus.',
  notes: [
    what,
    'It adds no role, no label and no live region: what the content says is read as the content normally is.',
    'Content that is removed when `show` is false leaves the accessibility tree too, so it is never read while hidden.',
  ],
});

export const motionRow = (interaction: string, motion: string, token: string): DocsMotion => ({ interaction, motion, token });

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A replay demo for effects that play once as they scroll into view: the button plays the effect again. */
export function ReplayDemo({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setRun(r => r + 1)}>
        Replay
      </Button>
      <div key={run}>{children}</div>
    </div>
  );
}

/** A card thumbnail that plays a once-only effect again every four seconds. Still under reduced motion. */
export function ReplayLoop({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setRun(r => r + 1), 4000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="docs-motion-stage docs-motion-loop">
      <div key={run}>{children}</div>
    </div>
  );
}

/**
 * Plays a scripted pointer over a hover effect, for card thumbnails: it sends
 * the same pointer events a mouse would to the first element matching
 * `target`. `path` circles the pointer around it; `cycle` moves over each
 * matching element in turn. Still under reduced motion.
 */
export function ScriptedPointer({ target, mode = 'path', children }: { target: string; mode?: 'path' | 'cycle'; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !host.current) return;
    const root = host.current;
    const send = (el: Element, type: string, x = 0, y = 0) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, clientX: x, clientY: y, pointerType: 'mouse' }));
    if (mode === 'cycle') {
      let i = 0;
      let last: Element | null = null;
      const step = () => {
        const items = root.querySelectorAll(target);
        if (last) send(last, 'pointerout');
        last = items[i % items.length] ?? null;
        if (last) send(last, 'pointerover');
        i += 1;
      };
      step();
      const id = window.setInterval(step, 1200);
      return () => window.clearInterval(id);
    }
    const el = root.querySelector(target);
    if (!el) return;
    let raf = 0;
    const t0 = performance.now();
    send(el, 'pointerover');
    const tick = (t: number) => {
      const r = el.getBoundingClientRect();
      const k = ((t - t0) / 2600) * 2 * Math.PI;
      send(el, 'pointermove', r.left + r.width * (0.5 + 0.4 * Math.cos(k)), r.top + r.height * (0.5 + 0.35 * Math.sin(k)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      send(el, 'pointerout');
    };
  }, [target, mode]);
  return <div ref={host}>{children}</div>;
}

/** The trail of dots as a still picture, for the cursor effects' card thumbnails (the real effect follows the whole page). */
export function TrailPicture({ ring }: { ring?: boolean }) {
  return (
    <div className="docs-trail" aria-hidden="true">
      {ring ? <span className="docs-trail__ring" /> : [8, 7, 6, 5, 4, 3].map((d, i) => <span key={i} className="docs-trail__dot" style={{ width: d, height: d, opacity: 1 - i / 7 }} />)}
    </div>
  );
}

export const pointerAccessibility = (what: string): DocsAccessibility => ({
  keyboard: 'None: the effect follows a mouse pointer, adds no controls and takes no focus.',
  notes: [
    what,
    'It adds no role, no label and no live region. Nothing the effect shows is information: whatever it sits on works the same without it.',
    'Touch and pen do not trigger it: it answers a mouse only.',
  ],
});

/** A still picture of the sticky reveal for its card thumbnail: steps on one side, the panel on the other. */
export function StickyPicture() {
  return (
    <div className="docs-sticky-picture" aria-hidden="true">
      <div className="docs-sticky-picture__steps">
        <span className="docs-sticky-picture__line" data-on="" />
        <span className="docs-sticky-picture__line" />
        <span className="docs-sticky-picture__line" />
      </div>
      <span className="docs-sticky-picture__panel" />
    </div>
  );
}

/** A still picture of the stairs page transition for its card thumbnail. */
export function StairsPicture() {
  return (
    <div className="docs-stairs-picture" aria-hidden="true">
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} style={{ transform: `translateY(${i % 2 === 0 ? -14 : 14}px)` }} />
      ))}
    </div>
  );
}

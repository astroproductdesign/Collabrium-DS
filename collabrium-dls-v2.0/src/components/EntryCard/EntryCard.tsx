'use client';

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { CaretRight, Lightbulb, MagnifyingGlass } from '@phosphor-icons/react';
import { tokens } from '../../tokens/tokens';
import type { WithoutStyling } from '../../utils/types';

/** `character`: a figure that rises above the card. `artefact`: a small drawing of what the entry makes. */
export type EntryCardVariant = 'character' | 'artefact';

/** The five drawings the Artefact variant ships. */
export type EntryCardArtefact = 'brief' | 'research' | 'idea' | 'package' | 'deck';

const VariantContext = createContext<EntryCardVariant | null>(null);

// ---------------------------------------------------------------------------------------------------------------------
// Set

export interface EntryCardSetProps extends WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children'>> {
  /** Names the list for assistive technology, e.g. "Start from any piece". Required: it is announced as "list, 5 items". */
  label: string;
  /**
   * The variant of every card in the set: one per set, never mixed. Changing it fades the cards out and back in, on the
   * same buttons, so focus and screen-reader position are kept. Default `character`.
   */
  variant?: EntryCardVariant;
  /** Columns at full width (860px of set and up), for a set of 4 or 6. Default 5. There is no 4-up step below that. */
  columns?: 4 | 5 | 6;
  /**
   * Character sets only: after 8s with no interaction, the next card plays one 4s beat, once, until every card has had
   * a turn. Hover and keyboard focus play a card regardless. Default true.
   */
  idleTour?: boolean;
  /** The `EntryCard`s, two to six. */
  children: ReactNode;
}

const IDLE_MS = 8000;
const BEAT_MS = 4000;

/**
 * The playback scheduler from DESIGN-SYSTEM.md ("EntryPlayback — host scheduler reference"), ported as written: hover
 * and keyboard focus loop a card's clip; an idle tour plays one 4s beat per card after 8s of stillness; nothing plays
 * under reduced motion, in a hidden tab or for a card less than half in view; the still and clip switch hard.
 */
function useEntryPlayback(set: HTMLElement | null, enabled: boolean, idleTour: boolean, variantKey: string) {
  // The idle pass keeps its position across a variant switch (the effect re-binds; the turn survives).
  const turnRef = useRef(0);
  useEffect(() => {
    if (!set || !enabled) return;
    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new WeakMap<Element, boolean>();
    let current: HTMLElement | null = null;
    let mode: 'hover' | 'beat' | null = null;
    let beatT = 0;
    let idleT = 0;
    const cards = () => [...set.querySelectorAll<HTMLElement>('.cui-entry-card')];
    const canPlay = (c: HTMLElement) =>
      !rm.matches && !document.hidden && !(c as HTMLButtonElement).disabled && c.dataset.variant === 'character' && visible.get(c) === true;

    function stop() {
      window.clearTimeout(beatT);
      if (!current) return;
      const fig = current.querySelector<HTMLElement>('.cui-entry-card__figure');
      const v = fig?.querySelector('video');
      fig?.removeAttribute('data-playing');
      if (v) {
        v.onplaying = null;
        v.pause();
        v.currentTime = 0;
      }
      current = null;
      mode = null;
    }
    function start(card: HTMLElement, m: 'hover' | 'beat') {
      if (!canPlay(card) || (current === card && mode === m)) return;
      if (current === card && mode === 'beat' && m === 'hover') {
        // Hovering a card mid-beat hands the running clip to hover without restarting it.
        window.clearTimeout(beatT);
        mode = 'hover';
        const v = card.querySelector('video');
        if (v) v.loop = true;
        return;
      }
      stop();
      const fig = card.querySelector<HTMLElement>('.cui-entry-card__figure');
      const v = fig?.querySelector('video');
      if (!fig || !v) return;
      current = card;
      mode = m;
      if (!v.querySelector('source')) {
        // Sources wait until the first play request, so nothing downloads for a card that never plays.
        ([['srcHevc', 'video/mp4; codecs="hvc1"'], ['srcWebm', 'video/webm']] as const).forEach(([k, type]) => {
          const src = v.dataset[k];
          if (src) v.append(Object.assign(document.createElement('source'), { src, type }));
        });
        v.load();
      }
      v.loop = m === 'hover';
      v.muted = true;
      v.currentTime = 0;
      v.onplaying = () => {
        if (current === card) fig.setAttribute('data-playing', '');
      };
      v.play().catch(() => {}); // stay on the still, silently
      if (m === 'beat')
        beatT = window.setTimeout(() => {
          stop();
          armIdle();
        }, BEAT_MS);
    }
    function armIdle() {
      window.clearTimeout(idleT);
      if (!idleTour || rm.matches || document.hidden || turnRef.current >= cards().length) return;
      idleT = window.setTimeout(() => {
        if (current) return;
        const c = cards()[turnRef.current];
        if (!c) return;
        if (!canPlay(c)) return armIdle(); // wait, never skip
        turnRef.current += 1;
        start(c, 'beat');
      }, IDLE_MS);
    }
    const activity = () => {
      if (mode === 'beat') stop();
      armIdle();
    };
    const onMove = () => {
      if (!current) armIdle();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') start(e.currentTarget as HTMLElement, 'hover');
    };
    const onLeave = (e: PointerEvent) => {
      if (current === e.currentTarget && mode === 'hover') stop();
    };
    const onFocus = (e: FocusEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (card.matches(':focus-visible')) start(card, 'hover');
    };
    const onBlur = (e: FocusEvent) => {
      if (current === e.currentTarget && mode === 'hover') stop();
    };
    const onVisibility = () => {
      if (document.hidden) {
        stop();
        window.clearTimeout(idleT);
      } else armIdle();
    };
    const onMotion = () => {
      if (rm.matches) {
        stop();
        window.clearTimeout(idleT);
      } else armIdle();
    };

    const activityEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'focusin'] as const;
    activityEvents.forEach(t => document.addEventListener(t, activity, { passive: true, capture: true }));
    window.addEventListener('scroll', activity, { passive: true, capture: true });
    document.addEventListener('pointermove', onMove, { passive: true, capture: true });
    const list = cards();
    list.forEach(card => {
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointerleave', onLeave);
      card.addEventListener('focus', onFocus);
      card.addEventListener('blur', onBlur);
    });
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          visible.set(e.target, e.intersectionRatio >= 0.5);
          if (e.intersectionRatio < 0.5 && current === e.target) stop();
        }),
      { threshold: [0, 0.5, 1] },
    );
    list.forEach(c => io.observe(c));
    document.addEventListener('visibilitychange', onVisibility);
    rm.addEventListener('change', onMotion);
    armIdle();

    return () => {
      stop();
      window.clearTimeout(idleT);
      activityEvents.forEach(t => document.removeEventListener(t, activity, { capture: true }));
      window.removeEventListener('scroll', activity, { capture: true });
      document.removeEventListener('pointermove', onMove, { capture: true });
      list.forEach(card => {
        card.removeEventListener('pointerenter', onEnter);
        card.removeEventListener('pointerleave', onLeave);
        card.removeEventListener('focus', onFocus);
        card.removeEventListener('blur', onBlur);
      });
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      rm.removeEventListener('change', onMotion);
    };
  }, [set, enabled, idleTour, variantKey]);
}

/**
 * A set of Entry Cards: the query container (its width, not the viewport's, sets 1, 2, 3 or 5 columns), the list, the
 * headroom for rising figures, the variant switch and the playback. Ported from components.css `.c-card-entry-set` and
 * `.c-card-entry-grid` (918–951).
 */
export const EntryCardSet = forwardRef<HTMLDivElement, EntryCardSetProps>(function EntryCardSet(
  { label, variant = 'character', columns, idleTour = true, children, ...rest },
  ref,
) {
  const [shown, setShown] = useState(variant);
  const [phase, setPhase] = useState<'idle' | 'swapping' | 'entering'>('idle');
  const [setEl, setSetEl] = useState<HTMLDivElement | null>(null);
  const count = Children.toArray(children).filter(isValidElement).length;

  // The variant switch: fade out on duration-base, change in place, rise back in on duration-morph, 50ms apart.
  useEffect(() => {
    if (variant === shown) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(variant);
      return;
    }
    setPhase('swapping');
    const out = window.setTimeout(() => {
      setShown(variant);
      setPhase('entering');
    }, tokens.duration.base);
    return () => window.clearTimeout(out);
  }, [variant, shown]);
  useEffect(() => {
    if (phase !== 'entering') return;
    const done = window.setTimeout(() => setPhase('idle'), tokens.duration.morph + 50 * Math.max(0, count - 1));
    return () => window.clearTimeout(done);
  }, [phase, count]);

  useEntryPlayback(setEl, shown === 'character', idleTour, `${shown}-${count}`);

  let i = 0;
  return (
    <div
      {...rest}
      ref={node => {
        setSetEl(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="cui-entry-set"
      data-variant={shown}
      data-swapping={phase === 'swapping' ? '' : undefined}
      data-entering={phase === 'entering' ? '' : undefined}
      style={columns ? ({ '--cui-entry-set-cols': columns } as CSSProperties) : undefined}
    >
      <VariantContext.Provider value={shown}>
        <ul className="cui-entry-set__grid" aria-label={label}>
          {Children.map(children, child =>
            isValidElement(child) ? <li style={{ '--cui-entry-card-i': i++ } as CSSProperties}>{child}</li> : null,
          )}
        </ul>
      </VariantContext.Provider>
    </div>
  );
});

// ---------------------------------------------------------------------------------------------------------------------
// Card

interface EntryCardBaseProps {
  /** The title, about two words ("Brief"). One line, truncating. */
  title: string;
  /** The one-line hint ("Turn an email into a brief"). Truncates on screen; read in full. */
  hint: string;
  /** The variant, for a card outside an `EntryCardSet`. Inside a set the set's variant wins: one per set. */
  variant?: EntryCardVariant;
  /** Artefact: which drawing. */
  artefact?: EntryCardArtefact;
  /** Character: the still, a PNG or WebP with alpha on the 4:3 board. Without it the placeholder figure shows. */
  still?: string;
  /** Character: the clip, alpha VP9 WebM and alpha HEVC (Safari), first frame identical to the still. Loaded on first play. */
  clip?: { webm?: string; hevc?: string };
  /** Character: a per-character horizontal nudge of the figure, in px. Never edit the art file instead. Default 0. */
  figureX?: number;
}

type ButtonForm = EntryCardBaseProps &
  WithoutStyling<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'title' | 'color'>> & {
    href?: undefined;
    /** Unavailable: 40% media, Neutral-4 text, no chevron. Button form only; a link entry is never disabled. */
    disabled?: boolean;
  };
type LinkForm = EntryCardBaseProps &
  WithoutStyling<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'title' | 'color'>> & {
    /** Makes the entry a link to a URL. Use the button form (`onClick`) when it opens something in place. */
    href: string;
    disabled?: never;
  };

export type EntryCardProps = ButtonForm | LinkForm;

function Artefact({ kind }: { kind: EntryCardArtefact }) {
  const bar = (props: { short?: boolean; strong?: boolean } = {}) => (
    <span className="cui-entry-card__art-bar" data-short={props.short ? '' : undefined} data-strong={props.strong ? '' : undefined} />
  );
  return (
    <span className="cui-entry-card__art" data-art={kind}>
      {kind === 'brief' &&
        [0, 1, 2].map(i => (
          <span key={i} className="cui-entry-card__art-row">
            <span className="cui-entry-card__art-label" />
            <span className="cui-entry-card__art-field" />
          </span>
        ))}
      {kind === 'research' && (
        <>
          <span className="cui-entry-card__art-lens">
            <MagnifyingGlass weight="fill" focusable="false" />
          </span>
          <span className="cui-entry-card__art-col">
            {(['wood', 'gold', 'water'] as const).map((tone, i) => (
              <span key={tone} className="cui-entry-card__art-row">
                <span className="cui-entry-card__art-dot" data-tone={tone} />
                {bar({ short: i === 2 })}
              </span>
            ))}
          </span>
        </>
      )}
      {kind === 'idea' && (
        <>
          <Lightbulb className="cui-entry-card__art-bulb" weight="fill" focusable="false" />
          <span className="cui-entry-card__art-col">
            {bar({ strong: true })}
            {bar()}
            {bar({ short: true })}
          </span>
        </>
      )}
      {kind === 'package' && (
        <>
          {[0, 1].map(i => (
            <span key={i} className="cui-entry-card__art-row">
              <span className="cui-entry-card__art-label" />
              {bar({ short: i === 1 })}
            </span>
          ))}
          <span className="cui-entry-card__art-mix">
            <span className="cui-entry-card__art-seg" />
            <span className="cui-entry-card__art-seg" />
            <span className="cui-entry-card__art-seg" />
          </span>
        </>
      )}
      {kind === 'deck' && (
        <>
          <span className="cui-entry-card__art-slide" data-slide="back1" />
          <span className="cui-entry-card__art-slide" data-slide="back2" />
          <span className="cui-entry-card__art-slide" data-slide="front">
            {bar()}
            {bar({ short: true })}
          </span>
        </>
      )}
    </span>
  );
}

/**
 * Collabrium Entry Card: a compact "start here" tile, one of a small set of starting points. A decorative media slot
 * (a rising character, or a drawing of what the entry makes), a title, a one-line hint and a corner chevron; the whole
 * card is one real `<button>` (or `<a href>`). Ported from components.css `.c-card-entry` and its parts (953–1173).
 */
export const EntryCard = forwardRef<HTMLButtonElement | HTMLAnchorElement, EntryCardProps>(function EntryCard(props, ref) {
  const { title, hint, variant: own, artefact = 'brief', still, clip, figureX, ...rest } = props as EntryCardBaseProps &
    Record<string, unknown>;
  const fromSet = useContext(VariantContext);
  const variant = fromSet ?? own ?? 'character';
  const style = figureX ? ({ '--cui-entry-card-figure-x': `${figureX}px` } as CSSProperties) : undefined;

  const content = (
    <>
      <span className="cui-entry-card__media" aria-hidden="true">
        {variant === 'artefact' ? (
          <Artefact kind={artefact} />
        ) : (
          <span className="cui-entry-card__figure">
            {still ? (
              <>
                <img className="cui-entry-card__still" src={still} alt="" />
                {clip && (
                  <video
                    className="cui-entry-card__clip"
                    muted
                    playsInline
                    preload="none"
                    tabIndex={-1}
                    disablePictureInPicture
                    {...{ disableRemotePlayback: true }}
                    data-src-webm={clip.webm}
                    data-src-hevc={clip.hevc}
                  />
                )}
              </>
            ) : (
              <span className="cui-entry-card__placeholder" />
            )}
          </span>
        )}
      </span>
      <span className="cui-entry-card__text">
        <span className="cui-entry-card__title">{title}</span>
        <span className="cui-entry-card__sep">, </span>
        <span className="cui-entry-card__hint">{hint}</span>
      </span>
      <CaretRight className="cui-entry-card__go" aria-hidden="true" focusable="false" />
    </>
  );

  if (typeof rest.href === 'string') {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as Ref<HTMLAnchorElement>}
        className="cui-card cui-entry-card"
        data-variant={variant}
        style={style}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className="cui-card cui-entry-card"
      data-variant={variant}
      style={style}
    >
      {content}
    </button>
  );
});

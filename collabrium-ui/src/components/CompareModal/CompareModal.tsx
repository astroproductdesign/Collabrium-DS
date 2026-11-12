'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowsLeftRight, CompassTool, FilePdf, FileXls, X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { FAMILIES, MediaAdEmpty, mediaAdPlaceholder } from '../MediaAdCard/MediaAdCard';
import type { MediaAdFormat } from '../MediaAdModal/MediaAdModal';
import { useMediaAdLayer } from '../MediaAdModal/useMediaAdLayer';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role'>>;

// The API: formats as Media Ad Modal's, three footer handlers, returnFallback, keepLive (decided 2026-11-12, Q-CMOD-3).
export interface CompareModalProps extends NativeDivProps {
  /** Whether the modal is open. Open it only with two to four formats: one format opens in Media Ad Modal. */
  open: boolean;
  /** Called on Close, Escape or a click on the scrim. Set `open` to false in it. */
  onClose: () => void;
  /** The formats, two to four, in the order picked: one column each. The modal never adds or removes one. */
  formats: MediaAdFormat[];
  /** Export PDF: produce the file (and confirm it with a Toast). */
  onExportPdf: () => void;
  /** Export Excel: produce the file (and confirm it with a Toast). */
  onExportExcel: () => void;
  /** "Send to a media plan": leaves for the planner with these formats (navigate in your handler). */
  onPlan: () => void;
  /** What the swing comes out of. Default: the element that had focus when it opened (the Action bar's Compare). */
  origin?: RefObject<HTMLElement | null>;
  /** Where focus goes on close if the Compare button has become disabled (the Action bar's `fallbackFocusRef`). */
  returnFallback?: RefObject<HTMLElement | null>;
  /** Children of `<body>` kept usable while the page is held: the Toast host, so export toasts are still announced. */
  keepLive?: RefObject<HTMLElement | null>[];
}

const DIMENSIONS = /^\s*(\d+(?:\.\d+)?)\s*[×xX]\s*(\d+(?:\.\d+)?)\s*$/;
const pct = (n: number) => `${n.toFixed(2)}%`;
const NOT_ON_FILE = 'Not on file';

/**
 * The Highest rule: the top published benchmark, compared at the two decimals shown, and only when at least two formats
 * have one above 0. Every format tied at the top is marked; if every published value ties, nothing is.
 * Every benchmark is compared, whatever its metric: a comparison holds one metric (decided 2026-11-12, Q-CMOD-6).
 */
export function highestOf(formats: MediaAdFormat[]): Set<string> {
  const published = formats.flatMap(f =>
    f.benchmark && f.benchmark.value > 0 ? [{ id: f.id, v: Math.round(f.benchmark.value * 100) }] : [],
  );
  if (published.length < 2) return new Set();
  const top = Math.max(...published.map(p => p.v));
  if (published.every(p => p.v === top)) return new Set();
  return new Set(published.filter(p => p.v === top).map(p => p.id));
}

const listOf = (names: string[]) =>
  names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

type Fact = { label: string; cell: (f: MediaAdFormat) => { content: ReactNode; empty?: boolean } };

const text = (value: string | undefined, empty = NOT_ON_FILE) =>
  value ? { content: value } : { content: empty, empty: true };
const joined = (list?: string[]) => (list && list.length ? list.join(', ') : undefined);

/** The nine facts, always in this order. */
const FACTS: Fact[] = [
  { label: 'Objective', cell: f => text(f.objective) },
  { label: 'Funnel', cell: f => text(joined(f.funnel)) },
  {
    label: 'Sizes',
    cell: f =>
      f.sizes && f.sizes.length
        ? {
            content: (
              <ul className="cui-compare-modal__sizes" role="list">
                {f.sizes.map(size => {
                  const m = DIMENSIONS.exec(size);
                  return (
                    <li key={size}>
                      {m ? (
                        <>
                          <span aria-hidden="true">{size}</span>
                          <span className="cui-media-ad-modal__sr">
                            {m[1]} by {m[2]} pixels
                          </span>
                        </>
                      ) : (
                        size
                      )}
                    </li>
                  );
                })}
              </ul>
            ),
          }
        : { content: <MediaAdEmpty shown="—" spoken="No fixed size" />, empty: true },
  },
  { label: 'Runs on', cell: f => text(joined(f.runsOn)) },
  { label: 'Benchmark', cell: () => ({ content: null }) }, // drawn by the table (it knows Highest)
  { label: 'CPM on file', cell: f => text(f.cpm, 'Not on file — ask Sales') },
  { label: 'Monthly inventory', cell: f => text(f.inventory) },
  { label: 'Best for', cell: f => text(f.bestFor) },
  {
    label: 'Industries',
    cell: f =>
      f.industries && f.industries.length
        ? { content: f.industries.join(', ') }
        : { content: <MediaAdEmpty shown="—" spoken="None listed" />, empty: true },
  },
];

type PanelProps = Omit<CompareModalProps, 'open' | 'origin' | 'returnFallback' | 'keepLive'> & {
  titleRef?: RefObject<HTMLHeadingElement | null>;
  closeRef?: RefObject<HTMLButtonElement | null>;
  'aria-modal'?: 'true' | 'false';
  'data-swing'?: string;
  inert?: boolean;
};

/**
 * The panel itself. Internal: CompareModal renders it in its layer; the docs render it on a stage, as the DLS gallery
 * does. Not exported from the package.
 */
export const CompareModalPanel = forwardRef<HTMLDivElement, PanelProps>(function CompareModalPanel(
  { formats, onClose, onExportPdf, onExportExcel, onPlan, titleRef, closeRef, ...rest },
  ref,
) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const scroll = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLTableRowElement>(null);
  const [state, setState] = useState({ overflow: false, moreRight: false, left: false, top: false });
  const highest = highestOf(formats);

  // The hint and the right-edge fade while columns remain to the right; the frozen shadows once scrolled.
  useEffect(() => {
    const el = scroll.current;
    if (!el) return;
    const measure = () => {
      const overflow = el.scrollWidth > el.clientWidth + 1;
      setState({
        overflow,
        moreRight: overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
        left: el.scrollLeft > 0,
        top: el.scrollTop > 0 && el.scrollTop >= (stage.current?.offsetHeight ?? 0),
      });
    };
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [formats.length]);

  const caption = `${listOf(formats.map(f => f.name))} compared by objective, funnel, sizes, runs on, benchmark, CPM, monthly inventory, best for and industries.`;

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-modal cui-compare-modal"
      role="dialog"
      aria-labelledby={titleId}
    >
      <div className="cui-modal__head">
        <div className="cui-compare-modal__titles">
          <h4 ref={titleRef} id={titleId} className="cui-compare-modal__title" tabIndex={-1}>
            Compare formats
          </h4>
        </div>
        <Button ref={closeRef} variant="ghost" size="sm" iconOnly icon={X} aria-label="Close" onClick={onClose} />
      </div>

      {state.overflow && (
        <p className="cui-compare-modal__hint" aria-hidden="true">
          <ArrowsLeftRight focusable="false" />
          Scroll sideways to see every format
        </p>
      )}

      <div className="cui-compare-modal__scrollwrap" data-more-right={state.moreRight ? '' : undefined}>
        <div
          ref={scroll}
          className="cui-modal__body cui-table cui-compare-modal__scroll"
          tabIndex={0}
          role="region"
          aria-label="Comparison table"
          data-scrolled-left={state.left ? '' : undefined}
          data-scrolled-top={state.top ? '' : undefined}
        >
          <table
            className="cui-table__table cui-compare-modal__table"
            style={{ '--cui-compare-modal-cols': formats.length } as CSSProperties}
          >
            <caption className="cui-media-ad-modal__sr">{caption}</caption>
            {/* The label column's width: with a fixed layout, widths come from the first row (the Media row), so the
                corner cell's width never applied (decided 2026-11-12, Q-CMOD-4). */}
            <colgroup>
              <col className="cui-compare-modal__labelcol" />
              {formats.map(f => (
                <col key={f.id} />
              ))}
            </colgroup>
            <thead>
              <tr ref={stage} className="cui-compare-modal__stage">
                <th scope="row" className="cui-table__th">
                  <span className="cui-media-ad-modal__sr">Media</span>
                </th>
                {formats.map(f => (
                  <td key={f.id} className="cui-table__td">
                    <div className="cui-compare-modal__frame">
                      <div className="cui-compare-modal__slot">{f.media ?? mediaAdPlaceholder}</div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="cui-table__td cui-compare-modal__corner">
                  <span aria-hidden="true">Format</span>
                </td>
                {formats.map(f => (
                  <th key={f.id} scope="col" className="cui-table__th cui-compare-modal__colhead">
                    <span className="cui-compare-modal__colname">{f.name}</span>
                    <span className="cui-compare-modal__colfamily">{FAMILIES[f.family].label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="cui-table__body">
              {FACTS.map(fact => (
                <tr key={fact.label} className="cui-table__row">
                  <th scope="row" className="cui-table__th">
                    {fact.label}
                  </th>
                  {formats.map(f => {
                    if (fact.label === 'Benchmark') {
                      const b = f.benchmark;
                      const top = highest.has(f.id);
                      return (
                        <td
                          key={f.id}
                          className="cui-table__td"
                          data-empty={b ? undefined : ''}
                          data-highest={top ? '' : undefined}
                        >
                          {b ? (
                            <span className="cui-compare-modal__bench">
                              <span>
                                {b.metric} {pct(b.value)}
                              </span>
                              {top && (
                                // The library's Badge Success as it ships (--color-green-text on its tint, AA); the
                                // source's local colour-mix fix isn't needed (decided 2026-11-12, Q-CMOD-5).
                                <Badge variant="success">
                                  Highest<span className="cui-media-ad-modal__sr"> {b.metric} in this comparison</span>
                                </Badge>
                              )}
                            </span>
                          ) : (
                            'Not published'
                          )}
                        </td>
                      );
                    }
                    const { content, empty } = fact.cell(f);
                    return (
                      <td key={f.id} className="cui-table__td" data-empty={empty ? '' : undefined}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cui-modal__foot">
        <Button variant="secondary" leadingIcon={FilePdf} onClick={onExportPdf}>
          Export PDF
        </Button>
        <Button variant="secondary" leadingIcon={FileXls} onClick={onExportExcel}>
          Export Excel
        </Button>
        {/* A Button with onPlan, as Media Ad Modal's, until Button has a link form (decided 2026-11-12, Q-CMOD-2). */}
        <Button variant="primary" leadingIcon={CompassTool} onClick={onPlan}>
          Send to a media plan
        </Button>
      </div>
    </div>
  );
});

/**
 * Collabrium Compare modal: two to four ad formats side by side, one column per format and one row per fact (always
 * nine), the highest published benchmark marked, then Export PDF, Export Excel and "Send to a media plan". Opened from
 * the Action bar's Compare. A variant of Modal on Media Ad Modal's layer: the scrim, the swing (out of the Compare
 * button), the page hold. Ported from components.css `.c-modal-compare*` (2462–2612).
 */
export const CompareModal = forwardRef<HTMLDivElement, CompareModalProps>(function CompareModal(
  { open, onClose, formats, onExportPdf, onExportExcel, onPlan, origin, returnFallback, keepLive, ...rest },
  ref,
) {
  // Two to four: one format is Media Ad Modal's. Under two: a warning and nothing shown; over four: the first four,
  // with a warning (decided 2026-11-12, Q-CMOD-1).
  const shown = formats.slice(0, 4);
  const valid = shown.length >= 2;
  useEffect(() => {
    if (open && !valid) console.warn('CompareModal: open it with two to four formats; one format opens in Media Ad Modal.');
    if (open && formats.length > 4) console.warn('CompareModal: four formats at most; showing the first four.');
  }, [open, valid, formats.length]);

  const layer = useMediaAdLayer({
    open: open && valid,
    onClose,
    itemId: 'compare',
    origin,
    // Opens on Close, as Media Ad Modal (decided Q-MAD-1) and as this DS section says.
    initialFocus: 'close',
    keepLive,
    swingFrom: 'opener',
    reverseFadesOut: true,
    returnFallback: returnFallback ? () => returnFallback.current : undefined,
  });

  if (!layer.mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={layer.layerRef}
      className="cui-media-ad-modal-layer"
      data-shown={layer.shown ? '' : undefined}
      data-closing={layer.closing ? '' : undefined}
    >
      <div className="cui-media-ad-modal-layer__scrim" aria-hidden="true" onClick={onClose} />
      <CompareModalPanel
        {...rest}
        ref={node => {
          layer.panelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        titleRef={layer.titleRef}
        closeRef={layer.closeRef}
        formats={shown}
        onClose={onClose}
        onExportPdf={onExportPdf}
        onExportExcel={onExportExcel}
        onPlan={onPlan}
        aria-modal="true"
        data-swing={layer.swing}
        inert={layer.closing || undefined}
        onKeyDown={layer.trap}
        onAnimationEnd={layer.onAnimationEnd}
      />
    </div>,
    document.body,
  );
});

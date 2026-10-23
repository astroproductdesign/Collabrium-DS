'use client';

// Loading State preview: the three variants with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { LoadingState } from './LoadingState';

// Copied verbatim from collabrium-dls/components.css lines 5274–5375
// (Loading State) for side-by-side comparison only. Never shipped in the package.
export const legacyLoadingCss = ".c-loading{display:inline-flex; align-items:center; gap:var(--spacing-8); font-family:var(--font-primary);}\n.c-loading-grid{display:grid; grid-template-columns:repeat(3, 4px); gap:1.5px; flex:none;}\n.c-loading-cell{width:4px; height:4px; background:var(--color-neutral-9); border-radius:1px; opacity:.15;}\n.c-loading-grid.dots .c-loading-cell{border-radius:50%;}\n.c-loading-cell.is-off{opacity:.07;}\n.c-loading-grid.drive .c-loading-cell,\n.c-loading-grid.dots .c-loading-cell{animation:c-loading-color-cycle 5s linear infinite, c-loading-pixel-on 650ms var(--ease-standard) infinite;}\n.c-loading-grid.drive .c-loading-cell:nth-child(1),.c-loading-grid.dots .c-loading-cell:nth-child(1){animation-delay:0s, 90ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(2),.c-loading-grid.dots .c-loading-cell:nth-child(2){animation-delay:0s, 180ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(3),.c-loading-grid.dots .c-loading-cell:nth-child(3){animation-delay:0s, 270ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(4),.c-loading-grid.dots .c-loading-cell:nth-child(4){animation-delay:0s, 0ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(5),.c-loading-grid.dots .c-loading-cell:nth-child(5){animation-delay:0s, 90ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(6),.c-loading-grid.dots .c-loading-cell:nth-child(6){animation-delay:0s, 180ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(7),.c-loading-grid.dots .c-loading-cell:nth-child(7){animation-delay:0s, 90ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(8),.c-loading-grid.dots .c-loading-cell:nth-child(8){animation-delay:0s, 180ms;}\n.c-loading-grid.drive .c-loading-cell:nth-child(9),.c-loading-grid.dots .c-loading-cell:nth-child(9){animation-delay:0s, 270ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(5){animation:none;}\n.c-loading-grid.orbit .c-loading-cell:not(:nth-child(5)){animation:c-loading-color-cycle 5s linear infinite, c-loading-pixel-on 950ms var(--ease-standard) infinite;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(1){animation-delay:0s, 0ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(2){animation-delay:0s, 110ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(3){animation-delay:0s, 220ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(4){animation-delay:0s, 770ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(6){animation-delay:0s, 330ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(7){animation-delay:0s, 660ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(8){animation-delay:0s, 550ms;}\n.c-loading-grid.orbit .c-loading-cell:nth-child(9){animation-delay:0s, 440ms;}\n@keyframes c-loading-pixel-on{\n  0%,100%{opacity:.15;}\n  50%{opacity:1;}\n}\n@keyframes c-loading-color-cycle{\n  0%,16%{background-color:var(--color-gold-pastel);}\n  20%,36%{background-color:var(--color-water-pastel);}\n  40%,56%{background-color:var(--color-wood-pastel);}\n  60%,76%{background-color:var(--color-fire-pastel);}\n  80%,96%{background-color:var(--color-earth-pastel);}\n  100%{background-color:var(--color-gold-pastel);}\n}\n.c-loading-label{font-size:var(--text-caption-size); font-weight:500; color:var(--color-neutral-9); white-space:nowrap;}\n.c-loading-elapsed{font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5); font-variant-numeric:tabular-nums; flex:none;}\n@media (prefers-reduced-motion:reduce){\n  .c-loading-grid.drive .c-loading-cell,\n  .c-loading-grid.dots .c-loading-cell,\n  .c-loading-grid.orbit .c-loading-cell:not(:nth-child(5)){animation:none; opacity:.15; background-color:var(--color-gold-pastel);}\n}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup. Orbit is preview.html 1356–1364; Drive and Dots are written from the CSS (preview.html does not demo them). */
  old: string | null;
}

const cells = (centreOff: boolean) =>
  Array.from({ length: 9 }, (_, i) => `<span class="c-loading-cell${centreOff && i === 4 ? ' is-off' : ''}"></span>`).join('');
const oldMarkup = (variant: string, text: string) =>
  `<div class="c-loading" role="status" aria-live="polite"><span class="c-loading-grid ${variant}" aria-hidden="true">${cells(variant === 'orbit')}</span><span class="c-loading-label">${text}</span><span class="c-loading-elapsed" aria-hidden="true">0.0s</span></div>`;

const rows: Row[] = [
  { id: 'orbit', label: 'Orbit (preview.html 1356–1364)', next: <LoadingState variant="orbit" label="Thinking" />, old: oldMarkup('orbit', 'Thinking') },
  { id: 'drive', label: 'Drive', note: 'Old markup written from the CSS: preview.html does not demo Drive or Dots.', next: <LoadingState variant="drive" label="Thinking" />, old: oldMarkup('drive', 'Thinking') },
  { id: 'dots', label: 'Dots', note: 'Old markup written from the CSS.', next: <LoadingState variant="dots" label="Thinking" />, old: oldMarkup('dots', 'Thinking') },
  {
    id: 'rules',
    label: 'Hold-back, timer, live region',
    note: 'The old system only documents these as rules and drives them from a page script. The new component does them itself: it renders after 400ms, counts from the start timestamp, and keeps a live region in the page.',
    next: null,
    old: null,
  },
];

function Compare({ row }: { row: Row }) {
  return (
    <section className="pg-row" id={row.id} aria-labelledby={`${row.id}-h`}>
      <h3 className="pg-row-title" id={`${row.id}-h`}>{row.label}</h3>
      {row.note && <p className="pg-row-note">{row.note}</p>}
      <div className="pg-cols">
        <div className="pg-col" data-col="new">
          <p className="pg-col-label">React · @collabrium/ui</p>
          <div className="pg-specimen">{row.next}</div>
        </div>
        <div className="pg-col" data-col="old">
          <p className="pg-col-label">Old HTML + CSS · components.css</p>
          {row.old === null ? (
            <p className="pg-missing">No CSS in the old system. See MIGRATION-LOG.md.</p>
          ) : (
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
          )}
        </div>
      </div>
    </section>
  );
}

export function LoadingStatePreview() {
  return (
    <>
      <style>{legacyLoadingCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default LoadingStatePreview;

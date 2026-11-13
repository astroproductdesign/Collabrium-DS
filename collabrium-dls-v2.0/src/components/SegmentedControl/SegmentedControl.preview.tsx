// Segmented Control preview: the gallery's two controls, with the OLD HTML + CSS (collabrium-dls/components.css)
// rendered beside them for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Kanban, List, SquaresFour } from '@phosphor-icons/react';
import { SegmentedControl } from './SegmentedControl';

// Copied verbatim from collabrium-dls/components.css lines 4447–4463 and 4469–4471 (Segmented Control)
// for side-by-side comparison only. Never shipped in the package.
export const legacySegmentedCss = ".c-segctl{position:relative; display:inline-flex; background:var(--color-neutral-2); border:1px solid var(--color-neutral-3); border-radius:var(--radius-md); padding:var(--spacing-4); gap:var(--spacing-4);}\n.c-seg-pill{position:absolute; left:0; top:0; background:var(--color-neutral-1); box-shadow:var(--shadow-1); border-radius:var(--radius-sm); z-index:0; pointer-events:none; transition:transform var(--duration-fast) var(--ease-standard), width var(--duration-fast) var(--ease-standard), height var(--duration-fast) var(--ease-standard);}\n.c-seg{position:relative; z-index:1; appearance:none; border:none; background:transparent; color:var(--color-neutral-5); font-family:var(--font-primary); font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:500; text-transform:uppercase; border-radius:var(--radius-sm); display:inline-flex; align-items:center; justify-content:center; gap:var(--spacing-4); cursor:pointer; flex:1; transition:color var(--duration-fast) var(--ease-standard);}\n.c-seg i{font-size:var(--icon-base); line-height:1;}\n.c-segctl-compact .c-seg i{font-size:var(--icon-micro);}\n.c-segctl-default .c-seg{padding:var(--spacing-8) var(--spacing-12); min-width:32px;}\n.c-segctl-compact .c-seg{padding:5px var(--spacing-12); min-width:32px;}\n.c-seg[aria-checked=\"true\"]{color:var(--color-neutral-9); font-weight:700;}\n.c-segctl:not(.has-pill) .c-seg[aria-checked=\"true\"]{background:var(--color-neutral-1); box-shadow:var(--shadow-1);}\n.c-seg:not([aria-checked=\"true\"]):not(:disabled):hover{background:var(--color-neutral-2);}\n.c-seg:not([aria-checked=\"true\"]):not(:disabled):active{background:var(--color-neutral-3);}\n.c-seg:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-seg:disabled{color:var(--color-neutral-4); opacity:.4; cursor:not-allowed;}\n.c-seg:disabled:hover{background:transparent;}\n.c-segctl-disabled{opacity:.4;}\n.c-segctl-disabled .c-seg{cursor:not-allowed;}\n@media (prefers-reduced-motion: reduce){ .c-seg-pill{transition:none;} }\n.c-seg-tt-wrap{position:relative; display:inline-flex; flex:1;}\n.c-seg-tt-bubble{position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); z-index:2; padding:var(--spacing-4) var(--spacing-8); border-radius:var(--radius-sm); background:var(--color-neutral-7); color:var(--color-neutral-1); font-size:var(--text-caption-size); font-weight:500; text-transform:none; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity var(--duration-fast) var(--ease-standard);}\n.c-seg-tt-wrap:hover .c-seg-tt-bubble, .c-seg-tt-wrap:focus-within .c-seg-tt-bubble{opacity:1;}";

interface Row {
  id: string;
  label: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it (the gallery script adds the pill on load). */
  old: string;
}

const rows: Row[] = [
  {
    id: 'icon',
    label: 'Icon only, compact (preview.html 4473–4486)',
    next: (
      <SegmentedControl
        aria-label="View mode"
        size="compact"
        options={[
          { value: 'list', label: 'List view', icon: List },
          { value: 'grid', label: 'Grid view', icon: SquaresFour },
          { value: 'board', label: 'Board view', icon: Kanban },
        ]}
      />
    ),
    old: "<div class=\"c-segctl c-segctl-compact\" role=\"group\" aria-label=\"View mode\"><span class=\"c-seg-tt-wrap\"><button class=\"c-seg\" role=\"radio\" aria-checked=\"true\" aria-label=\"List view\" type=\"button\"><i class=\"ph ph-list\"></i></button><span class=\"c-seg-tt-bubble\">List view</span></span><span class=\"c-seg-tt-wrap\"><button class=\"c-seg\" role=\"radio\" aria-checked=\"false\" aria-label=\"Grid view\" type=\"button\"><i class=\"ph ph-squares-four\"></i></button><span class=\"c-seg-tt-bubble\">Grid view</span></span><span class=\"c-seg-tt-wrap\"><button class=\"c-seg\" role=\"radio\" aria-checked=\"false\" aria-label=\"Board view\" type=\"button\"><i class=\"ph ph-kanban\"></i></button><span class=\"c-seg-tt-bubble\">Board view</span></span></div>",
  },
  {
    id: 'text',
    label: 'Text only, compact (preview.html 4491–4495)',
    next: (
      <SegmentedControl
        aria-label="Date range"
        size="compact"
        defaultValue="qtd"
        options={[{ value: 'mtd', label: 'MTD' }, { value: 'qtd', label: 'QTD' }, { value: 'ytd', label: 'YTD' }]}
      />
    ),
    old: "<div class=\"c-segctl c-segctl-compact\" role=\"group\" aria-label=\"Date range\"><button class=\"c-seg\" role=\"radio\" aria-checked=\"false\" type=\"button\">MTD</button><button class=\"c-seg\" role=\"radio\" aria-checked=\"true\" type=\"button\">QTD</button><button class=\"c-seg\" role=\"radio\" aria-checked=\"false\" type=\"button\">YTD</button></div>",
  },
];

function Compare({ row }: { row: Row }) {
  return (
    <section className="pg-row" id={row.id} aria-labelledby={`${row.id}-h`}>
      <h3 className="pg-row-title" id={`${row.id}-h`}>{row.label}</h3>
      <div className="pg-cols">
        <div className="pg-col" data-col="new">
          <p className="pg-col-label">React · @collabrium/ui</p>
          <div className="pg-specimen">{row.next}</div>
        </div>
        <div className="pg-col" data-col="old">
          <p className="pg-col-label">Old HTML + CSS · components.css</p>
          <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
        </div>
      </div>
    </section>
  );
}

export function SegmentedControlPreview() {
  return (
    <>
      <style>{legacySegmentedCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default SegmentedControlPreview;

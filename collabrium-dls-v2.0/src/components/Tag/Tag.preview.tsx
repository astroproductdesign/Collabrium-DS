// Tag preview: every variant, with the OLD HTML + CSS (collabrium-dls/components.css) rendered beside it for
// visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Tag } from './Tag';

// Copied verbatim from collabrium-dls/components.css lines 1650–1663 (Tag)
// for side-by-side comparison only. Never shipped in the package.
export const legacyTagCss = ".c-tag{display:inline-flex; align-items:center; gap:4px; font-size:var(--text-caption-size); font-weight:700; height:var(--control-height-xs); padding:0 10px; border-radius:var(--radius-pill); background:var(--color-neutral-2); color:var(--color-neutral-5);}\n.c-tag .dot{width:6px; height:6px; border-radius:var(--radius-pill); flex:none;}\n/* Elemental fill \u2014 the owning element's -bg tint (8%), not the generic\n   Neutral-2 above. Text/dot stay full-strength element color. */\n.c-tag-fire{background:var(--color-fire-bg); color:var(--color-orange);} .c-tag-fire .dot{background:var(--color-orange);}\n.c-tag-wood{background:var(--color-wood-bg); color:var(--color-salmon-pink);} .c-tag-wood .dot{background:var(--color-salmon-pink);}\n.c-tag-earth{background:var(--color-earth-bg); color:var(--color-green);} .c-tag-earth .dot{background:var(--color-green);}\n.c-tag-water{background:var(--color-water-bg); color:var(--color-navy);} .c-tag-water .dot{background:var(--color-navy);}\n.c-tag-gold{background:var(--color-gold-bg); color:var(--color-amber);} .c-tag-gold .dot{background:var(--color-amber);}\n/* Purple \u2014 secondary-accent Tag, not an element. First used for the\n   Display family on Media Ad Card. Text is purple mixed 80/20 toward\n   Neutral-9 for AA on its tint (full-strength purple is ~4.0:1); the dot\n   stays full-strength, as on every other Tag. */\n.c-tag-purple{background:var(--color-purple-bg); color:color-mix(in srgb, var(--color-purple) 80%, var(--color-neutral-9));} .c-tag-purple .dot{background:var(--color-purple);}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it. */
  old: string;
}

const rows: Row[] = [
  {
    id: 'elements',
    label: 'Elements (preview.html 2295–2299)',
    next: (
      <div className="pg-inline">
        <Tag variant="fire">Fire · Marketing</Tag>
        <Tag variant="wood">Wood · Strategy</Tag>
        <Tag variant="earth">Earth · HR</Tag>
        <Tag variant="water">Water · Data</Tag>
        <Tag variant="gold">Gold · Finance</Tag>
      </div>
    ),
    old: "<div class=\"pg-inline\"><span class=\"c-tag c-tag-fire\"><span class=\"dot\"></span>Fire &middot; Marketing</span><span class=\"c-tag c-tag-wood\"><span class=\"dot\"></span>Wood &middot; Strategy</span><span class=\"c-tag c-tag-earth\"><span class=\"dot\"></span>Earth &middot; HR</span><span class=\"c-tag c-tag-water\"><span class=\"dot\"></span>Water &middot; Data</span><span class=\"c-tag c-tag-gold\"><span class=\"dot\"></span>Gold &middot; Finance</span></div>",
  },
  {
    id: 'purple',
    label: 'Purple (preview.html 2303)',
    next: <div className="pg-inline"><Tag variant="purple">Display</Tag></div>,
    old: "<div class=\"pg-inline\"><span class=\"c-tag c-tag-purple\"><span class=\"dot\"></span>Display</span></div>",
  },
  {
    id: 'neutral',
    label: 'Neutral (Profile card: KOC, Seeder)',
    note: 'The plain .c-tag with no modifier and no dot, as Profile card uses it.',
    next: <div className="pg-inline"><Tag variant="neutral">KOC</Tag><Tag variant="neutral">Seeder</Tag></div>,
    old: '<div class="pg-inline"><span class="c-tag">KOC</span><span class="c-tag">Seeder</span></div>',
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
          <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
        </div>
      </div>
    </section>
  );
}

export function TagPreview() {
  return (
    <>
      <style>{legacyTagCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default TagPreview;

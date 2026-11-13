// ElementBadge preview: every element and the label, with the OLD HTML + CSS (collabrium-dls/components.css)
// rendered beside it for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { ElementBadge } from './ElementBadge';

// Copied verbatim from collabrium-dls/components.css lines 3595–3604 (ElementBadge)
// for side-by-side comparison only. Never shipped in the package.
export const legacyElementBadgeCss = "/* ElementBadge */\n.c-elbadge{display:inline-flex; align-items:center; gap:var(--spacing-12);}\n.c-elbadge-chip{display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:var(--radius-sm); flex:none; font-size:17px;}\n.c-elbadge-fire{background:color-mix(in srgb, var(--color-orange) 12%, transparent); color:var(--color-orange);}\n.c-elbadge-earth{background:color-mix(in srgb, var(--color-green) 12%, transparent); color:var(--color-green);}\n.c-elbadge-water{background:color-mix(in srgb, var(--color-navy) 12%, transparent); color:var(--color-navy);}\n.c-elbadge-gold{background:color-mix(in srgb, var(--color-amber) 12%, transparent); color:var(--color-amber);}\n.c-elbadge-wood{background:color-mix(in srgb, var(--color-salmon-pink) 12%, transparent); color:var(--color-salmon-pink);}\n.c-elbadge .text .name{display:block; font-size:var(--text-caption-size); font-weight:700; letter-spacing:var(--tracking-eyebrow); text-transform:uppercase; color:var(--color-neutral-9);}\n.c-elbadge .text .fn{display:block; font-size:var(--text-caption-size); color:var(--color-neutral-5);}";

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
    label: 'Elements, chip alone (preview.html 3602–3606)',
    next: (
      <div className="pg-inline">
        <ElementBadge element="fire" />
        <ElementBadge element="earth" />
        <ElementBadge element="water" />
        <ElementBadge element="gold" />
        <ElementBadge element="wood" />
      </div>
    ),
    old: "<div class=\"pg-inline\"><span class=\"c-elbadge-chip c-elbadge-fire\" title=\"Fire\"><i class=\"ph-fill ph-fire\"></i></span><span class=\"c-elbadge-chip c-elbadge-earth\" title=\"Earth\"><i class=\"ph-fill ph-mountains\"></i></span><span class=\"c-elbadge-chip c-elbadge-water\" title=\"Water\"><i class=\"ph-fill ph-drop\"></i></span><span class=\"c-elbadge-chip c-elbadge-gold\" title=\"Gold\"><i class=\"ph-fill ph-scales\"></i></span><span class=\"c-elbadge-chip c-elbadge-wood\" title=\"Wood\"><i class=\"ph-fill ph-plant\"></i></span></div>",
  },
  {
    id: 'label',
    label: 'With label (preview.html 3609–3612)',
    note: 'The old label text takes its line height and weight from the page; the new one sets the caption tokens (decided Q-ELBADGE-6). The glyph is 16px against the old 17px (decided Q-ELBADGE-2).',
    next: <div className="pg-inline"><ElementBadge element="fire" showLabel /></div>,
    old: "<div class=\"pg-inline\"><span class=\"c-elbadge\"><span class=\"c-elbadge-chip c-elbadge-fire\"><i class=\"ph-fill ph-fire\"></i></span><span class=\"text\"><span class=\"name\">Fire</span><span class=\"fn\">Visibility &amp; Energy</span></span></span></div>",
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

export function ElementBadgePreview() {
  return (
    <>
      <style>{legacyElementBadgeCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default ElementBadgePreview;

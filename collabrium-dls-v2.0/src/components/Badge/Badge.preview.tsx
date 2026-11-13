'use client';

// Badge preview: every variant, with and without an icon, with the OLD
// HTML + CSS (collabrium-dls/components.css) rendered beside it for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react';
import { Badge } from './Badge';

// Copied verbatim from collabrium-dls/components.css lines 1641–1646 (Badge)
// for side-by-side comparison only. Never shipped in the package.
export const legacyBadgeCss = ".c-badge{display:inline-flex; align-items:center; gap:4px; font-size:var(--text-label3-size); font-weight:700; padding:2px var(--spacing-8); border-radius:var(--radius-pill); border:1px solid transparent; white-space:nowrap;}\n.c-badge-neutral{background:var(--color-neutral-2); color:var(--color-neutral-9); border-color:var(--color-neutral-3);}\n.c-badge-success{background:rgba(0,194,110,.12); color:var(--color-green); border-color:rgba(0,194,110,.32);}\n.c-badge-error{background:rgba(253,51,67,.10); color:var(--color-red); border-color:rgba(253,51,67,.30);}\n.c-badge-warning{background:rgba(255,164,37,.14); color:var(--color-neutral-9); border-color:rgba(255,164,37,.38);}\n.c-badge-selected{background:var(--color-neutral-1); color:var(--color-neutral-9); border-color:var(--color-obsidian);}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it. null = the old system has no CSS for this. */
  old: string | null;
}

const rows: Row[] = [
  {
    id: 'variants',
    label: 'Variants',
    next: (
      <div className="pg-inline">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="selected">Selected</Badge>
      </div>
    ),
    old: '<div class="pg-inline"><span class="c-badge c-badge-neutral">Neutral</span><span class="c-badge c-badge-success">Success</span><span class="c-badge c-badge-error">Error</span><span class="c-badge c-badge-warning">Warning</span><span class="c-badge c-badge-selected">Selected</span></div>',
  },
  {
    id: 'icons',
    label: 'With icon (preview.html lines 1731–1733)',
    next: (
      <div className="pg-inline">
        <Badge variant="success" icon={CheckCircle}>Success</Badge>
        <Badge variant="error" icon={XCircle}>Error</Badge>
        <Badge variant="warning" icon={Warning}>Warning</Badge>
      </div>
    ),
    old: '<div class="pg-inline"><span class="c-badge c-badge-success"><i class="ph-fill ph-check-circle"></i>Success</span><span class="c-badge c-badge-error"><i class="ph-fill ph-x-circle"></i>Error</span><span class="c-badge c-badge-warning"><i class="ph-fill ph-warning"></i>Warning</span></div>',
  },
  {
    id: 'info',
    label: 'Info',
    note: 'Listed in DESIGN-SYSTEM.md, no CSS (Q-BADGE-3). Not built.',
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

export function BadgePreview() {
  return (
    <>
      <style>{legacyBadgeCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default BadgePreview;

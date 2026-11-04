// Empty state preview: every variant and tone, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside it for visual comparison.
// Never part of the package build.
import type { CSSProperties, ReactNode } from 'react';
import { ArrowClockwise, CloudSlash, Plus } from '@phosphor-icons/react';
import { legacyButtonCss } from '../Button/Button.preview';
import { EmptyState } from './EmptyState';

// Copied verbatim from collabrium-dls/components.css lines 2616–2653 (Empty state)
// for side-by-side comparison only. Never shipped in the package.
export const legacyEmptyStateCss = "/* Empty state \u2014 anatomy: icon (optional), heading (optional), body, actions\n   (optional). Per-gap spacing (not one flat gap): icon->heading spacing-12,\n   heading->body spacing-4, body->actions spacing-16. Fill:none (renders on\n   whatever surface it sits on) and max-width:480px is the outer safety net\n   around body's own 380px inner cap. Three variants \u2014 is-fullpage/is-section/\n   is-inline \u2014 plus an is-error tone. See DESIGN-SYSTEM.md's Empty state\n   section for the full spec. */\n.c-empty{display:flex; flex-direction:column; align-items:center; text-align:center; max-width:480px; margin:0 auto; padding:var(--spacing-40) var(--spacing-24); color:var(--color-neutral-5);}\n.c-empty > i{display:block; font-size:var(--icon-empty); color:var(--color-neutral-4); margin-bottom:var(--spacing-12);}\n.c-empty.is-error > i{color:var(--color-red);}\n.c-empty h4{margin:0 0 var(--spacing-4); color:var(--color-neutral-9); font-size:var(--text-h4-size); font-weight:var(--text-h4-weight); line-height:var(--text-h4-lh);}\n.c-empty p{margin:0 0 var(--spacing-16); max-width:380px; font-size:var(--text-body1-size); font-weight:var(--text-body1-weight); line-height:var(--text-body1-lh);}\n.c-empty-actions{display:flex; align-items:center; justify-content:center; gap:var(--spacing-8);}\n\n/* Full-page \u2014 icon-hero, fills the remaining viewport, centered. Standalone\n   min-height here is 100vh; a real integration inside App Shell subtracts\n   its own nav height, per DESIGN-SYSTEM.md's calc(100vh - nav height) rule. */\n.c-empty.is-fullpage{min-height:100vh; justify-content:center;}\n.c-empty.is-fullpage > i{font-size:var(--icon-hero);}\n\n/* Section-level \u2014 icon-empty, 240px min-height floor so it can't collapse */\n.c-empty.is-section{min-height:240px; justify-content:center;}\n\n/* Inline \u2014 no icon/heading in the markup, body2 only, Link-style action\n   only (never Primary/Ghost), no min-height */\n.c-empty.is-inline{max-width:none; text-align:left; align-items:flex-start; padding:var(--spacing-16); min-height:0;}\n.c-empty.is-inline p{font-size:var(--text-body2-size); font-weight:var(--text-body2-weight); line-height:var(--text-body2-lh); max-width:320px; margin-bottom:var(--spacing-8);}\n.c-empty-link{background:none; border:none; padding:0; font-family:inherit; font-size:var(--text-link2-size); font-weight:var(--text-link2-weight); line-height:var(--text-link2-lh); color:var(--color-neutral-9); text-decoration:underline; text-underline-offset:3px; cursor:pointer;}\n\n@media (max-width:767px){\n  .c-empty.is-fullpage,\n  .c-empty.is-section{padding:var(--spacing-24) var(--spacing-16);}\n  .c-empty.is-fullpage > i{font-size:var(--icon-empty);} /* no room for icon-hero at mobile */\n  .c-empty{max-width:100%;}\n  .c-empty p{max-width:100%;}\n  .c-empty-actions{flex-direction:column; align-items:stretch; width:100%; gap:var(--spacing-8);}\n  .c-empty-actions .c-btn{width:100%; justify-content:center;}\n}";

const noop = () => undefined;
// preview.html 3620 holds the full-page demo at 360px; the same height is set here on both sides.
const frame = { '--cui-empty-state-fullpage-min-height': '360px' } as CSSProperties;

const oldActions =
  '<div class="c-empty-actions"><button class="c-btn c-btn-primary c-btn-md"><i class="ph ph-plus"></i>Connect a source</button><button class="c-btn c-btn-ghost c-btn-md">Browse templates</button></div>';

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, as preview.html writes it. */
  old: string;
}

const rows: Row[] = [
  {
    id: 'fullpage',
    label: 'Full-page (preview.html 3620–3627)',
    next: (
      <div style={frame}>
        <EmptyState variant="fullpage" icon={CloudSlash} heading="Nothing here yet" primaryAction={{ label: 'Connect a source', icon: Plus, onClick: noop }} secondaryAction={{ label: 'Browse templates', onClick: noop }}>
          This is where your dashboards will live once you connect your first data source.
        </EmptyState>
      </div>
    ),
    old: `<div class="c-empty is-fullpage" style="min-height:360px;"><i class="ph-fill ph-cloud-slash"></i><h4>Nothing here yet</h4><p>This is where your dashboards will live once you connect your first data source.</p>${oldActions}</div>`,
  },
  {
    id: 'section',
    label: 'Section',
    next: (
      <EmptyState variant="section" icon={CloudSlash} heading="Nothing here yet" primaryAction={{ label: 'Connect a source', icon: Plus, onClick: noop }} secondaryAction={{ label: 'Browse templates', onClick: noop }}>
        This is where your dashboards will live once you connect your first data source.
      </EmptyState>
    ),
    old: `<div class="c-empty is-section"><i class="ph-fill ph-cloud-slash"></i><h4>Nothing here yet</h4><p>This is where your dashboards will live once you connect your first data source.</p>${oldActions}</div>`,
  },
  {
    id: 'error',
    label: 'Error (section)',
    next: (
      <EmptyState variant="section" tone="error" icon={CloudSlash} heading="Campaigns didn't load" primaryAction={{ label: 'Retry', icon: ArrowClockwise, onClick: noop }} secondaryAction={{ label: 'Contact support', onClick: noop }}>
        We couldn't reach the server. Check your connection and try again.
      </EmptyState>
    ),
    old: '<div class="c-empty is-section is-error"><i class="ph-fill ph-cloud-slash"></i><h4>Campaigns didn\'t load</h4><p>We couldn\'t reach the server. Check your connection and try again.</p><div class="c-empty-actions"><button class="c-btn c-btn-primary c-btn-md"><i class="ph ph-arrow-clockwise"></i>Retry</button><button class="c-btn c-btn-ghost c-btn-md">Contact support</button></div></div>',
  },
  {
    id: 'inline',
    label: 'Inline',
    note: 'The old link has no hover or focus style (Q-EMPTY-1).',
    next: (
      <EmptyState variant="inline" linkAction={{ label: 'Clear filters', onClick: noop }}>
        No campaigns match "Q5 launch".
      </EmptyState>
    ),
    old: '<div class="c-empty is-inline"><p>No campaigns match "Q5 launch".</p><button class="c-empty-link" type="button">Clear filters</button></div>',
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

export function EmptyStatePreview() {
  return (
    <>
      <style>{legacyButtonCss + '\n' + legacyEmptyStateCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default EmptyStatePreview;

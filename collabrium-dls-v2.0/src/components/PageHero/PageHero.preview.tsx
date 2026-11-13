// PageHero preview: each state, with the OLD Workdesk hero markup + CSS (workdesk.html .wd-hero, lines 202–226)
// rendered beside it for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { PageHero } from './PageHero';

// Copied from workdesk.html lines 202–226 and 261 (.wd-hero) for side-by-side comparison only.
export const legacyPageHeroCss =
  ".wd-hero{display:flex;flex-direction:column;gap:var(--spacing-24);padding:var(--spacing-24);border-radius:var(--radius-md);background:linear-gradient(90deg,var(--color-water-bg),var(--color-water-bg-strong));}\n.wd-hero-top{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:var(--spacing-16);}\n.wd-hero-id{display:flex;align-items:flex-start;gap:var(--spacing-16);flex:1 1 520px;min-width:0;}\n.wd-hero-icon{flex:none;display:flex;width:var(--ill-tile);height:var(--ill-tile);border-radius:var(--radius-md);background:var(--ill-paper);border:var(--border-width-md) solid var(--color-neutral-1);overflow:hidden;}\n.wd-hero-status{display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-8);font-size:var(--text-body2-size);color:var(--color-neutral-5);}\n.wd-health{display:inline-flex;align-items:center;gap:var(--spacing-6);height:var(--control-height-xs);padding:0 var(--spacing-12);border-radius:var(--radius-pill);background:var(--color-neutral-1);color:var(--color-neutral-9);font-size:var(--text-caption-size);font-weight:700;}\n.wd-health .dot{width:var(--spacing-8);height:var(--spacing-8);border-radius:var(--radius-pill);background:var(--color-navy);}\n.wd-hero h1{margin:var(--spacing-8) 0 var(--spacing-4);font-size:var(--text-h1-size);line-height:var(--text-h1-lh);font-weight:var(--text-h1-weight);letter-spacing:var(--text-h1-tracking);color:var(--color-neutral-9);}\n.wd-hero-desc{margin:0;max-width:60ch;font-size:var(--text-body1-size);line-height:var(--text-body1-lh);color:var(--color-neutral-5);}\n.wd-hero-progress-head{display:flex;align-items:baseline;justify-content:space-between;gap:var(--spacing-12);margin-bottom:var(--spacing-8);font-size:var(--text-caption-size);color:var(--color-neutral-5);}\n.wd-hero-pct{font-size:var(--text-h3-size);line-height:var(--text-h3-lh);font-weight:var(--text-h3-weight);color:var(--color-neutral-9);}\n.wd-hero-track{height:var(--spacing-4);border-radius:var(--radius-pill);background:var(--color-neutral-1);overflow:hidden;}\n.wd-hero-track span{display:block;height:100%;border-radius:var(--radius-pill);background:linear-gradient(90deg,var(--color-water-pastel),var(--color-navy));}";

interface Row {
  id: string;
  label: string;
  next: ReactNode;
  /** Old markup, as workdesk.html renders it (illustration left out). */
  old: string;
}

export const rows: Row[] = [
  {
    id: 'project',
    label: 'Project (workdesk.html 2094–2104)',
    next: (
      <PageHero
        illustration="tv"
        status={{ label: 'In progress', tone: 'info' }}
        meta="Due 12 Dec"
        title="Boxless - Greenfield"
        description="Boxless · Owned by Product Design"
        progress={{ value: 60, label: 'Project progress · 12 of 20 tasks done' }}
      />
    ),
    old: '<section class="wd-hero"><div class="wd-hero-top"><div class="wd-hero-id"><span class="wd-hero-icon"></span><div><div class="wd-hero-status"><span class="wd-health"><span class="dot"></span>In progress</span><span>Due 12 Dec</span></div><h1>Boxless - Greenfield</h1><p class="wd-hero-desc">Boxless · Owned by Product Design</p></div></div></div><div><div class="wd-hero-progress-head"><span>Project progress · 12 of 20 tasks done</span><span class="wd-hero-pct">60<small>%</small></span></div><div class="wd-hero-track"><span style="width:60%"></span></div></div></section>',
  },
  { id: 'title-only', label: 'Title only (new)', next: <PageHero title="Notifications" />, old: '' },
  { id: 'tones', label: 'Status tones (new: neutral, success, warning, error, purple)', next: <PageHero status={{ label: 'At risk', tone: 'warning' }} title="Tones" />, old: '' },
];

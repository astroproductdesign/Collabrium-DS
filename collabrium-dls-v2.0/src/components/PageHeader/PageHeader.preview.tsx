// PageHeader preview: the gallery's two headers, with the OLD HTML + CSS (collabrium-dls/components.css) rendered
// beside them for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { PageHeader } from './PageHeader';

// Copied verbatim from collabrium-dls/components.css lines 4427–4432 (PageHeader)
// for side-by-side comparison only. Never shipped in the package.
export const legacyPageHeaderCss = ".c-pageheader{display:flex; flex-direction:column;}\n.c-pageheader-row{display:flex; align-items:flex-start; justify-content:space-between; gap:var(--spacing-16);}\n.c-pageheader-text{display:flex; flex-direction:column; gap:var(--spacing-8); min-width:0;}\n.c-pageheader h1{margin:0; font-family:var(--font-primary); font-weight:var(--text-h1-weight); font-size:var(--text-h1-size); line-height:var(--text-h1-lh); letter-spacing:var(--text-h1-tracking); color:var(--color-neutral-9);}\n.c-pageheader .sub{margin:0; font-family:var(--font-primary); font-weight:var(--text-body2-weight); font-size:var(--text-body2-size); line-height:var(--text-body2-lh); color:var(--color-neutral-5);}\n.c-pageheader-actions{display:flex; gap:var(--element-gap); flex:none;}";

interface Row {
  id: string;
  label: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it. */
  old: string;
}

const rows: Row[] = [
  {
    id: 'default',
    label: 'Default (preview.html 4038–4044)',
    next: <PageHeader title="Campaign Dashboard" />,
    old: "<div class=\"c-pageheader\"><div class=\"c-pageheader-row\"><div class=\"c-pageheader-text\"><h1>Campaign Dashboard</h1></div></div></div>",
  },
  {
    id: 'subtitle',
    label: 'With subtitle (preview.html 4046–4053)',
    next: <PageHeader title="Campaign Dashboard" subtitle="Track performance across every active campaign in one place." />,
    old: "<div class=\"c-pageheader\"><div class=\"c-pageheader-row\"><div class=\"c-pageheader-text\"><h1>Campaign Dashboard</h1><p class=\"sub\">Track performance across every active campaign in one place.</p></div></div></div>",
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

export function PageHeaderPreview() {
  return (
    <>
      <style>{legacyPageHeaderCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default PageHeaderPreview;

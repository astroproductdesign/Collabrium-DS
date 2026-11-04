// Price summary card preview: Filled (with overflow), four items and Empty, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside it for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { legacyButtonCss } from '../Button/Button.preview';
import { legacyCardCss } from '../Card/Card.preview';
import { legacyEmptyStateCss } from '../EmptyState/EmptyState.preview';
import { CardGrid } from '../Card';
import { PriceSummaryCard, type PriceSummaryItem } from './PriceSummaryCard';

// Copied verbatim from collabrium-dls/components.css lines 317–357 (Price summary card)
// for side-by-side comparison only. Never shipped in the package.
export const legacyPriceSummaryCss = "/* Price summary card \u2014 Card variant, formerly the standalone \"Quote\n   builder\" component (renamed, folded into Card like USP; no CSS\n   behavior changed, only the class prefix). Empty state reuses\n   .c-empty verbatim, not restyled here. Filled state's divider between\n   the item list and the Total/CTA region is .c-card-footer's own top\n   border, not a new element; the remove button is optional per row.\n   Remove is opacity-hidden until its row is hovered/focused (same\n   reveal-on-row-hover pattern as Chat's message actions above) so it\n   never sits under the pointer at rest \u2014 the row's height and the\n   button's hit target don't move when it appears, only its visibility\n   does, which is what actually prevents the accidental-click case this\n   guards against.\n   Items 5+ collapse behind \"Show X more\" using the same Grid 0fr->1fr\n   expand/collapse technique as SidebarNav's .c-nav-children (see that\n   rule's own comment above) rather than a guessed max-height, which\n   would either clip content or leave dead space depending on item\n   count. The \"Show X more\"/\"Show less\" control adapts Chip's own\n   .c-chip-showless Link-button recipe minus its underline (a\n   deliberate departure, not an oversight) plus a trailing caret,\n   since Chip's own control needs neither. See DESIGN-SYSTEM.md's\n   \"Selected items list \u2014 display rules\" for the full behavior spec\n   this markup alone doesn't express. */\n.c-card-price-summary{min-width:280px; height:100%;}\n.c-card-price-list{list-style:none; margin:0; padding:0; display:flex; flex-direction:column; flex:1;}\n.c-card-price-row{display:flex; align-items:center; gap:var(--spacing-12); padding:var(--spacing-8) 0; border-bottom:1px solid var(--color-neutral-3);}\n.c-card-price-row:last-child{border-bottom:none;}\n.c-card-price-name{flex:1; min-width:0; font-size:var(--text-body2-size); line-height:var(--text-body2-lh); font-weight:var(--text-body2-strong-weight); color:var(--color-neutral-9); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}\n.c-card-price-cost{flex:none; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5); font-variant-numeric:tabular-nums;}\n.c-card-price-remove{flex:none; width:var(--control-height-xs); height:var(--control-height-xs); display:flex; align-items:center; justify-content:center; border:none; background:transparent; border-radius:var(--radius-sm); color:var(--color-neutral-5); font-size:var(--icon-micro); cursor:pointer; opacity:0; transition:opacity var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);}\n.c-card-price-row:hover .c-card-price-remove,\n.c-card-price-row:focus-within .c-card-price-remove{opacity:1;}\n.c-card-price-remove:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}\n.c-card-price-remove:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-card-price-overflow{display:grid; grid-template-rows:0fr; transition:grid-template-rows var(--duration-base) var(--ease-settle);}\n.c-card-price-overflow.is-expanded{grid-template-rows:1fr;}\n.c-card-price-overflow-inner{overflow-y:auto; min-height:0; max-height:320px;}\n.c-card-price-more{display:flex; align-items:center; gap:var(--spacing-4); width:100%; padding:var(--spacing-8) 0; background:transparent; border:none; color:var(--color-neutral-9); font-family:inherit; font-size:var(--text-label2-size); font-weight:var(--text-label2-weight); cursor:pointer;}\n.c-card-price-more i{font-size:var(--icon-micro);}\n.c-card-price-total{display:flex; justify-content:space-between; align-items:baseline; font-size:var(--text-label1-size); line-height:var(--text-label1-lh); font-weight:var(--text-label1-weight); color:var(--color-neutral-9); font-variant-numeric:tabular-nums;}\n.c-card-price-total .value{color:var(--color-neutral-5);}\n.c-card-price-summary .c-card-footer .c-btn{width:100%; justify-content:center; margin-top:var(--spacing-12);}";

// The gallery's Filled card, verbatim from preview.html 2384–2431.
const oldFilled = "<div class=\"c-card c-card-price-summary\">\n<h5>Price summary</h5>\n<ul class=\"c-card-price-list\">\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Brand identity kit</span>\n<span class=\"c-card-price-cost\">RM 2,400.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Brand identity kit\"><i class=\"ph ph-x\"></i></button>\n</li>\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Landing page build</span>\n<span class=\"c-card-price-cost\">RM 980.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Landing page build\"><i class=\"ph ph-x\"></i></button>\n</li>\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Copywriting</span>\n<span class=\"c-card-price-cost\">RM 320.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Copywriting\"><i class=\"ph ph-x\"></i></button>\n</li>\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Social templates</span>\n<span class=\"c-card-price-cost\">RM 210.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Social templates\"><i class=\"ph ph-x\"></i></button>\n</li>\n<li class=\"c-card-price-overflow\">\n<div class=\"c-card-price-overflow-inner\">\n<ul class=\"c-card-price-list\">\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Photography day rate</span>\n<span class=\"c-card-price-cost\">RM 600.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Photography day rate\"><i class=\"ph ph-x\"></i></button>\n</li>\n<li class=\"c-card-price-row\">\n<span class=\"c-card-price-name\">Email campaign setup</span>\n<span class=\"c-card-price-cost\">RM 275.00</span>\n<button type=\"button\" class=\"c-card-price-remove\" aria-label=\"Remove Email campaign setup\"><i class=\"ph ph-x\"></i></button>\n</li>\n</ul>\n</div>\n</li>\n</ul>\n<button type=\"button\" class=\"c-card-price-more\"><span>Show 2 more</span><i class=\"ph ph-caret-down\"></i></button>\n<div class=\"c-card-footer\">\n<div class=\"c-card-price-total\">\n<span>Total</span>\n<span class=\"value\">RM 4,785.00</span>\n</div>\n<button type=\"button\" class=\"c-btn c-btn-primary c-btn-md\">Build proposal</button>\n</div>";

const noop = () => undefined;
const sample: PriceSummaryItem[] = [
  { id: 'identity', name: 'Brand identity kit', cost: 2400 },
  { id: 'landing', name: 'Landing page build', cost: 980 },
  { id: 'copy', name: 'Copywriting', cost: 320 },
  { id: 'social', name: 'Social templates', cost: 210 },
  { id: 'photo', name: 'Photography day rate', cost: 600 },
  { id: 'email', name: 'Email campaign setup', cost: 275 },
];

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup. null = the gallery has no demo for this. */
  old: string | null;
}

const rows: Row[] = [
  {
    id: 'filled',
    label: 'Filled, six items (preview.html 2384–2431)',
    note: 'The old "Show 2 more" has no script in the gallery, so only the new one opens.',
    next: <CardGrid columns="functional"><PriceSummaryCard items={sample} onRemove={noop} onAction={noop} /></CardGrid>,
    old: `<div class="c-cards c-cards-functional">${oldFilled}</div>`,
  },
  {
    id: 'empty',
    label: 'Empty',
    note: 'The gallery has no Empty demo; DESIGN-SYSTEM.md describes it (title, then the Empty state icon and heading).',
    next: <CardGrid columns="functional"><PriceSummaryCard items={[]} onAction={noop} /></CardGrid>,
    old: '<div class="c-cards c-cards-functional"><div class="c-card c-card-price-summary"><h5>Price summary</h5><div class="c-empty is-section"><i class="ph-fill ph-list"></i><h4>No items added</h4></div></div></div>',
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
            <p className="pg-missing">No demo in the old gallery. See MIGRATION-LOG.md.</p>
          ) : (
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
          )}
        </div>
      </div>
    </section>
  );
}

export function PriceSummaryCardPreview() {
  return (
    <>
      <style>{[legacyButtonCss, legacyCardCss, legacyEmptyStateCss, legacyPriceSummaryCss].join('\n')}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default PriceSummaryCardPreview;

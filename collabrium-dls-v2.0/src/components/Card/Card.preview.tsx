// Card preview: every variant, with the OLD HTML + CSS (collabrium-dls/components.css)
// rendered beside it for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Drop } from '@phosphor-icons/react';
import { legacyCheckboxCss } from '../Checkbox/Checkbox.preview';
import { Button } from '../Button';
import { Card, CardFooter, CardGrid, CardHeader, CardList, CardTitle } from './Card';

// Copied verbatim from collabrium-dls/components.css lines 267–314 (the grid, the base card, header, icon chip,
// footer, accent, interactive, selectable and feature-tile rules), for side-by-side comparison only. Never shipped in the package.
export const legacyCardCss = "\n/* Grid layout \u2014 universal rule (see DESIGN-SYSTEM.md's Card > Grid layout):\n   align-items:stretch is the grid default (never overridden to start), so\n   every card in a row already matches the tallest card's height; the grid\n   controls column count via auto-fill/minmax, never the card. Base floor is\n   240px (see .c-card's own min-width, below); .c-cards-functional swaps in\n   the 280px floor USP/Price summary need. */\n.c-cards{display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:var(--spacing-16);}\n.c-cards-functional{grid-template-columns:repeat(auto-fill,minmax(280px,1fr));}\n.c-card{background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1); padding:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-8); transition:box-shadow var(--duration-base) var(--ease-settle); width:100%; min-width:240px; height:100%; box-sizing:border-box;}\n.c-card.warm{background:var(--color-canvas-warm-card); border-color:transparent;}\n.c-card-header{display:flex; align-items:flex-start; gap:var(--spacing-12); margin-bottom:var(--spacing-16);}\n/* Shared 36\u00d736 icon-chip pattern \u2014 DESIGN-SYSTEM.md documents this as\n   one pattern reused by Card's header AND Stat/KPI card's icon slot\n   (and App Shell's demo, which reuses Stat card). Scoped to plain\n   \".icon-chip\" (not \".c-card .icon-chip\") so it works everywhere the\n   spec says it should, not just inside a Card. */\n.icon-chip{display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--radius-sm); background:color-mix(in srgb, var(--color-navy) 12%, transparent); color:var(--color-navy); flex:none;}\n.c-card-footer{margin-top:var(--spacing-16); padding-top:var(--spacing-12); border-top:1px solid var(--color-neutral-3); font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-card h5{margin:0; font-size:var(--text-h5-size); font-weight:var(--text-h5-weight);}\n.c-card p{margin:0; font-size:var(--text-body2-size); color:var(--color-neutral-5);}\n.c-card-accent{border-top:3px solid var(--color-salmon-pink);}\n.c-card-interactive:hover{box-shadow:var(--shadow-2); cursor:pointer;}\n.c-card-interactive:focus-visible{box-shadow:var(--shadow-focus); outline:none;}\n/* Selectable \u2014 reuses Profile card's own hover-reveal checkbox + Selected\n   recipe verbatim (see .c-card-profile-select/.c-card-profile.is-selected\n   below) so both variants share one convention. border-width/padding are\n   deliberately excluded from the transition list, same reason as Profile\n   card: animating either alone against an instantly-jumping border-width\n   causes a transient content-shift. */\n.c-card-selectable{position:relative; transition:box-shadow var(--duration-base) var(--ease-settle), border-color var(--duration-base) var(--ease-settle);}\n.c-card-selectable .c-card-select{position:absolute; top:var(--spacing-16); right:var(--spacing-16); opacity:0; transition:opacity var(--duration-fast) var(--ease-standard);}\n.c-card-selectable .c-card-select .c-checkbox-box{cursor:pointer;}\n.c-card-selectable:hover .c-card-select,\n.c-card-selectable.is-selected .c-card-select{opacity:1;}\n.c-card-selectable h5{padding-right:var(--spacing-24);}\n.c-card-selectable.is-selected{border:2px solid var(--color-obsidian); box-shadow:var(--shadow-3); padding:calc(var(--spacing-16) - 1px);}\n\n/* USP card \u2014 Card variant. Header (h4) + Description (p) reuse the base\n   Card styles verbatim; only the bullet list and the CTA button's width\n   are new. The CTA is a real Button component (.c-btn), not rebuilt \u2014\n   .c-card's own column-flex default (align-items:stretch) already makes\n   it full-width, so align-self:stretch here is just documenting that,\n   not overriding anything. */\n.c-card-usp{min-width:280px; height:100%;}\n.c-card-usp-list{list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:var(--spacing-8); flex:1;}\n.c-card-usp-list li{display:flex; align-items:center; gap:var(--spacing-8); font-size:var(--text-body2-size); line-height:var(--text-body2-lh); color:var(--color-neutral-9);}\n.c-card-usp-list i{flex:none; font-size:var(--icon-sm); color:var(--color-obsidian);}\n.c-card-usp .c-btn{align-self:stretch; justify-content:center;}";

// Mirrors the General cards demo in preview.html (1807–1838).
const oldCard = (cls: string, inner: string) => `<div class="c-cards"><div class="c-card ${cls}">${inner}</div></div>`;

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const rows: Row[] = [
  { id: 'static', label: 'Static', next: <CardGrid><Card><CardTitle headingLevel={5}>Static card</CardTitle><p>Default surface, hairline border, shadow-1.</p></Card></CardGrid>, old: oldCard('', '<h5>Static card</h5><p>Default surface, hairline border, shadow-1.</p>') },
  { id: 'interactive', label: 'Interactive (hover, then tab to it)', note: 'The old card is a div with a tabindex; the new one is a button in the title, stretched over the card (Q-CARD-1).', next: <CardGrid><Card><CardTitle headingLevel={5} onClick={() => undefined}>Interactive card</CardTitle><p>Hover for the shadow-2 raise.</p></Card></CardGrid>, old: oldCard('c-card-interactive" tabindex="0', '<h5>Interactive card</h5><p>Hover for the shadow-2 raise.</p>') },
  { id: 'accent', label: 'Element-accented (Wood)', next: <CardGrid><Card accent="wood"><CardTitle headingLevel={5}>Element-accented</CardTitle><p>Top border only.</p></Card></CardGrid>, old: oldCard('c-card-accent', '<h5>Element-accented</h5><p>Top border only.</p>') },
  { id: 'chip', label: 'Icon-chip header', next: <CardGrid><Card><CardHeader headingLevel={5} icon={Drop} title="Icon-chip header" /><p>36px chip, element at 12% tint.</p></Card></CardGrid>, old: oldCard('', '<div class="c-card-header"><span class="icon-chip"><i class="ph-fill ph-drop"></i></span><h5>Icon-chip header</h5></div><p>36px chip, element at 12% tint.</p>') },
  { id: 'warm', label: 'Warm', next: <CardGrid><Card surface="warm"><CardTitle headingLevel={5}>Warm surface</CardTitle><p>Brand and editorial canvas.</p></Card></CardGrid>, old: oldCard('warm', '<h5>Warm surface</h5><p>Brand and editorial canvas.</p>') },
  { id: 'footer', label: 'With footer', next: <CardGrid><Card><CardTitle headingLevel={5}>With footer</CardTitle><p>Footer is a distinct, bordered sub-part.</p><CardFooter>Updated 2 hours ago</CardFooter></Card></CardGrid>, old: oldCard('', '<h5>With footer</h5><p>Footer is a distinct, bordered sub-part.</p><div class="c-card-footer">Updated 2 hours ago</div>') },
  {
    id: 'selectable',
    label: 'Selectable (hover to show the checkbox)',
    note: 'The old checkbox is top right; the new one is top left (decided 2026-10-30, Q-SEL-4).',
    next: <CardGrid><Card selectLabel="Select this card"><CardTitle headingLevel={5} onClick={() => undefined}>Interactive card</CardTitle><p>Hover for the shadow-2 raise and Select checkbox.</p></Card></CardGrid>,
    old: '<div class="c-cards"><div class="c-card c-card-interactive c-card-selectable" tabindex="0"><span class="c-card-select"><span class="c-checkbox-box" role="checkbox" aria-checked="false" tabindex="0" aria-label="Select this card"></span></span><h5>Interactive card</h5><p>Hover for the shadow-2 raise and Select checkbox.</p></div></div>',
  },
  {
    id: 'selected',
    label: 'Selected',
    next: <CardGrid><Card selectLabel="Select this card" defaultSelected><CardTitle headingLevel={5} onClick={() => undefined}>Interactive card</CardTitle><p>Hover for the shadow-2 raise and Select checkbox.</p></Card></CardGrid>,
    old: '<div class="c-cards"><div class="c-card c-card-interactive c-card-selectable is-selected" tabindex="0"><span class="c-card-select"><span class="c-checkbox-box on" role="checkbox" aria-checked="true" tabindex="0" aria-label="Select this card"></span></span><h5>Interactive card</h5><p>Hover for the shadow-2 raise and Select checkbox.</p></div></div>',
  },
  {
    id: 'usp',
    label: 'Feature tile (USP)',
    next: <CardGrid columns="functional"><Card minWidth="functional"><CardTitle headingLevel={5}>USP card</CardTitle><p>Header, description, 3 bullet points, CTA button.</p><CardList items={['Details', 'Details', 'Details']} /><Button variant="primary" size="md">Button</Button></Card></CardGrid>,
    old: '<div class="c-cards c-cards-functional"><div class="c-card c-card-usp"><h5>USP card</h5><p>Header, description, 3 bullet points, CTA button.</p><ul class="c-card-usp-list"><li><i class="ph-fill ph-check-circle"></i><span>Details</span></li><li><i class="ph-fill ph-check-circle"></i><span>Details</span></li><li><i class="ph-fill ph-check-circle"></i><span>Details</span></li></ul><button type="button" class="c-btn c-btn-primary c-btn-md">Button</button></div></div>',
  },
];

export function CardPreview() {
  return (
    <div>
      <style>{legacyCheckboxCss}</style>
      <style>{legacyCardCss}</style>
      {rows.map(row => (
        <section key={row.id}>
          <h3>{row.label}</h3>
          {row.note && <p>{row.note}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>{row.next}</div>
            <div dangerouslySetInnerHTML={{ __html: row.old }} />
          </div>
        </section>
      ))}
    </div>
  );
}

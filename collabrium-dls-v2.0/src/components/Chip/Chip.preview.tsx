'use client';

// Chip preview: every kind and state, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Buildings } from '@phosphor-icons/react';
import { FilterChipGroup } from './FilterChipGroup';
import { InputChipGroup } from './InputChipGroup';

// Copied verbatim from collabrium-dls/components.css lines 4530–4559 (the chip
// rules, from .c-chip-group to the count colours), for side-by-side
// comparison only. Never shipped in the package.
export const legacyChipCss = ".c-chip-group{display:flex; flex-wrap:wrap; gap:var(--spacing-4); align-items:center;}\n.c-chip{display:inline-flex; align-items:center; gap:var(--spacing-4); border-radius:var(--radius-pill); font-family:var(--font-primary); font-size:var(--text-label2-size); line-height:var(--text-label2-lh); font-weight:var(--text-label2-weight); color:var(--color-neutral-9); white-space:nowrap; user-select:none; transition:background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);}\n.c-chip[hidden]{display:none;}\n.c-chip .icon{font-size:var(--icon-sm); line-height:1; color:inherit;}\n.c-chip-input{height:var(--control-height-xs); padding:0 var(--spacing-8); background:var(--color-neutral-2); border:1px solid var(--color-neutral-3);}\n.c-chip-input.is-disabled{opacity:.4; cursor:not-allowed;}\n.c-chip-remove{display:inline-flex; align-items:center; justify-content:center; width:var(--control-height-xs); height:var(--control-height-xs); margin-right:-6px; color:var(--color-neutral-5); background:transparent; border:none; cursor:pointer; border-radius:var(--radius-pill); font-size:var(--icon-micro); padding:0;}\n.c-chip-remove i{pointer-events:none;}\n.c-chip-remove:hover{color:var(--color-neutral-9);}\n.c-chip-remove:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-chip-overflow{height:var(--control-height-xs); padding:0 var(--spacing-8); background:var(--color-neutral-2); border:1px solid var(--color-neutral-3); color:var(--color-neutral-5); cursor:pointer; font-family:inherit;}\n.c-chip-overflow:hover{color:var(--color-neutral-9); border-color:var(--color-neutral-4);}\n.c-chip-overflow:focus-visible, .c-chip-showless:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-chip-showless{display:inline-flex; align-items:center; height:var(--control-height-xs); background:transparent; border:none; padding:0; margin:0; color:var(--color-neutral-9); font-family:var(--font-primary); font-size:var(--text-label2-size); font-weight:var(--text-label2-weight); line-height:var(--text-label2-lh); text-decoration:underline; text-underline-offset:3px; cursor:pointer;}\n.c-chip-filter{height:var(--control-height-sm); padding:0 var(--spacing-12); background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); cursor:pointer; font-family:inherit;}\n.c-chip-filter:hover:not(.is-active):not(.is-disabled){background:var(--color-neutral-2);}\n.c-chip-filter:active:not(.is-disabled){background:var(--color-neutral-3);}\n.c-chip-filter.is-active{background:var(--color-obsidian); border-color:var(--color-obsidian); color:var(--color-neutral-1);}\n.c-chip-filter.is-active:hover:not(.is-disabled){background:var(--color-neutral-8); border-color:var(--color-neutral-8);}\n.c-chip-filter.is-active:active:not(.is-disabled){background:var(--color-neutral-7); border-color:var(--color-neutral-7);}\n.c-chip-filter:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-chip-filter.is-disabled{opacity:.4; cursor:not-allowed; pointer-events:none;}\n/* Trailing count (optional, Filter Chip only) \u2014 label2/400, one step\n   lighter than the label's own 700, spacing-4 gap (inherited from\n   .c-chip's own gap). Neutral-1 at 70% opacity when active keeps the\n   same lighter-than-label relationship on the dark fill. Disabled's\n   40% opacity is inherited from .c-chip-filter.is-disabled above, not\n   redeclared here. */\n.c-chip-filter .count{font-weight:400; color:var(--color-neutral-5);}\n.c-chip-filter.is-active .count{color:rgba(255,255,255,.7);}";

// Mirrors the Chip demos in preview.html (2548–2590).
const oldFilter = (label: string, o: { on?: boolean; role?: string; icon?: string; count?: string; disabled?: boolean } = {}) =>
  `<button class="c-chip c-chip-filter${o.on ? ' is-active' : ''}${o.disabled ? ' is-disabled' : ''}" type="button" role="${o.role ?? 'radio'}" aria-checked="${o.on ? 'true' : 'false'}">${o.icon ? `<i class="ph ${o.icon} icon"></i>` : ''}<span class="label">${label}</span>${o.count ? `<span class="count">${o.count}</span>` : ''}</button>`;
const oldInput = (label: string, remove = true) =>
  `<span class="c-chip c-chip-input"><span class="label">${label}</span>${remove ? '<button class="c-chip-remove" type="button" aria-label="Remove"><i class="ph ph-x"></i></button>' : ''}</span>`;

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];
const deptOptions = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'product', label: 'Product' },
  { value: 'sales', label: 'Sales' },
  { value: 'finance', label: 'Finance' },
];

const rows: Row[] = [
  {
    id: 'single',
    label: 'Filter chips, single-select',
    next: <FilterChipGroup mode="single" aria-label="Status filter" options={statusOptions} defaultValue="all" />,
    old: `<div class="c-chip-group" role="radiogroup">${oldFilter('All', { on: true })}${oldFilter('Active')}${oldFilter('Paused')}${oldFilter('Archived')}</div>`,
  },
  {
    id: 'multi',
    label: 'Filter chips, multi-select (Product is on, with the tick)',
    next: <FilterChipGroup mode="multi" aria-label="Department filter" options={deptOptions} defaultValue={['product']} />,
    old: `<div class="c-chip-group" role="group">${oldFilter('Marketing', { role: 'checkbox' })}${oldFilter('Product', { role: 'checkbox', on: true, icon: 'ph-check' })}${oldFilter('Sales', { role: 'checkbox' })}${oldFilter('Finance', { role: 'checkbox' })}</div>`,
  },
  {
    id: 'count',
    label: 'Filter chips with a trailing count',
    next: (
      <FilterChipGroup
        mode="multi"
        aria-label="Department filter with counts"
        defaultValue={['all']}
        options={[
          { value: 'all', label: 'All', count: 120 },
          { value: 'marketing', label: 'Marketing', count: 14 },
          { value: 'sales', label: 'Sales', count: 6 },
          { value: 'archived', label: 'Archived', count: 0 },
        ]}
      />
    ),
    old: `<div class="c-chip-group" role="group">${oldFilter('All', { role: 'checkbox', on: true, icon: 'ph-check', count: '99+' })}${oldFilter('Marketing', { role: 'checkbox', count: '14' })}${oldFilter('Sales', { role: 'checkbox', count: '6' })}${oldFilter('Archived', { role: 'checkbox', count: '0' })}</div>`,
  },
  {
    id: 'icon-disabled',
    label: 'A category icon, and a disabled chip',
    next: (
      <FilterChipGroup
        mode="single"
        aria-label="Pillar"
        defaultValue="all"
        options={[
          { value: 'all', label: 'All' },
          { value: 'sales', label: 'CollabSales', icon: Buildings },
          { value: 'studio', label: 'CollabStudio', icon: Buildings, disabled: true },
        ]}
      />
    ),
    old: `<div class="c-chip-group" role="radiogroup">${oldFilter('All', { on: true })}${oldFilter('CollabSales', { icon: 'ph-buildings' })}${oldFilter('CollabStudio', { icon: 'ph-buildings', disabled: true })}</div>`,
  },
  {
    id: 'input',
    label: 'Input chips, with remove, and static',
    next: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InputChipGroup aria-label="Brands" chips={[{ id: '1', label: 'Nescafé' }, { id: '2', label: 'Milo' }]} onRemove={() => {}} />
        <InputChipGroup aria-label="Industries" chips={[{ id: '1', label: 'Entertainment' }, { id: '2', label: 'Food & Beverages' }]} />
      </div>
    ),
    old: `<div style="display:flex;flex-direction:column;gap:12px"><div class="c-chip-group">${oldInput('Nescafé')}${oldInput('Milo')}</div><div class="c-chip-group">${oldInput('Entertainment', false)}${oldInput('Food &amp; Beverages', false)}</div></div>`,
  },
  {
    id: 'input-disabled',
    label: 'Input chip, disabled',
    next: <InputChipGroup aria-label="Brands" disabled chips={[{ id: '1', label: 'Nescafé' }]} onRemove={() => {}} />,
    old: `<div class="c-chip-group"><span class="c-chip c-chip-input is-disabled"><span class="label">Nescafé</span><button class="c-chip-remove" type="button" aria-label="Remove" disabled><i class="ph ph-x"></i></button></span></div>`,
  },
  {
    id: 'overflow',
    label: 'Input chips beyond three: the +N chip',
    next: (
      <InputChipGroup
        aria-label="Brands"
        onRemove={() => {}}
        chips={['Nescafé', 'Milo', 'Horlicks', 'Ovaltine', 'Teh Tarik', 'Kopi-O'].map(label => ({ id: label, label }))}
      />
    ),
    old: `<div class="c-chip-group">${oldInput('Nescafé')}${oldInput('Milo')}${oldInput('Horlicks')}<button class="c-chip c-chip-overflow" type="button">+3</button></div>`,
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

export function ChipPreview() {
  return (
    <>
      <style>{legacyChipCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default ChipPreview;

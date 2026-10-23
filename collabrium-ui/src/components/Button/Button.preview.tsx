'use client';

// Button preview: every variant, size and state, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside it for visual comparison.
// Used by the playground only; never part of the package build.
import { useState, type ReactNode } from 'react';
import { CheckCircle, DotsThree, Plus, Trash } from '@phosphor-icons/react';
import { Button, type ButtonBeaconReason } from './Button';

// Copied verbatim from collabrium-dls/components.css lines 31–126 (Button + CTA beacon)
// for side-by-side comparison only. Never shipped in the package.
export const legacyButtonCss = ".c-btn{font-family:inherit; font-weight:700; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background-color var(--duration-fast) var(--ease-standard),transform var(--duration-instant) var(--ease-standard);}\n.c-btn-md{height:40px; padding:0 var(--spacing-16); font-size:16px; border-radius:var(--radius-md);}\n.c-btn-sm{height:32px; padding:0 var(--spacing-12); font-size:14px; border-radius:var(--radius-sm);}\n.c-btn-lg{height:48px; padding:0 var(--spacing-20); font-size:16px; border-radius:var(--radius-md);}\n.c-btn-icon{padding:0; justify-content:center;}\n.c-btn-icon.c-btn-sm{width:32px;}\n.c-btn-icon.c-btn-md{width:40px;}\n.c-btn-icon.c-btn-lg{width:48px;}\n.c-btn-primary{background:var(--color-obsidian); color:var(--color-neutral-1);}\n.c-btn-primary:hover{background:var(--color-neutral-8);}\n.c-btn-primary:active{background:var(--color-neutral-7);}\n.c-btn-secondary{background:var(--color-neutral-1); color:var(--color-neutral-9); border:1px solid var(--color-neutral-3); box-shadow:var(--shadow-1);}\n.c-btn-secondary:hover{background:var(--color-neutral-2);}\n.c-btn-ghost{background:transparent; color:var(--color-neutral-9);}\n.c-btn-ghost:hover{background:var(--color-neutral-2);}\n.c-btn:disabled{background:var(--color-neutral-4); color:var(--color-neutral-1); border-color:var(--color-neutral-3); cursor:not-allowed;}\n.c-btn:focus-visible{outline:2px solid var(--color-obsidian); outline-offset:2px;}\n/* The `hidden` attribute has to be honoured explicitly here: .c-btn\n   declares its own `display`, and the UA sheet's `[hidden]{display:none}`\n   carries zero specificity, so it loses — a `hidden` button would stay\n   fully visible. Same finding Chat window's own filter mechanism records\n   (it uses a class for exactly this reason), and the same explicit\n   `[hidden]` rule Search input's clear, Filters' tray, Chip and others\n   already carry. Any host toggling a Button with `el.hidden` depends on\n   this line. */\n.c-btn[hidden]{display:none;}\n\n/* =========================================================\n   CTA beacon — Button state modifier (.c-btn-beacon)\n   A temporary \"look here next\" cue on the single next step: a ring\n   breathes out of a Primary three times while its trailing arrow nods,\n   then it stops for good. Primary only, labelled only, never disabled.\n   One beacon at a time per page, across every button type (the host's\n   CBeacon.arm() disarms any other first). Only ADDS a box-shadow ring\n   and an icon transform; fill, size, radius, hover, active, disabled and\n   the focus outline are the shipped Button's, untouched.\n   Box-shadow, not ::after: never takes layout, needs no position:relative\n   on .c-btn, and Primary has no resting shadow to overwrite (why\n   Secondary, which carries shadow-1, is excluded). Keep spacing-12 clear\n   around the button; an overflow:hidden ancestor closer than that crops\n   the ring (degrades to a partial ring, nothing breaks).\n   One-offs: 1.4s cycle (no motion token is a loop cadence; ambient 900ms\n   reads as an alarm) · 3 cycles = 4.2s (under WCAG 2.2.2's 5s for\n   auto-started motion) · 32% Neutral-9 ink (signal ring, not a depth\n   shadow — same Neutral-9 ink as --shadow-overlay) · 70% keyframe stop ·\n   3px nod (spacing-4 is 25% of an icon-sm glyph and reads as a jump).\n   Forced colours: no rule, on purpose — the UA drops box-shadow and an\n   outline stand-in would falsely signal focus. */\n.c-btn-beacon{\n  --c-btn-beacon-dur:1.4s;\n  --c-btn-beacon-count:3;\n  --c-btn-beacon-ink:color-mix(in srgb, var(--color-neutral-9) 32%, transparent);\n  --c-btn-beacon-ink-0:color-mix(in srgb, var(--color-neutral-9) 0%, transparent);\n  --c-btn-beacon-nod:3px;\n}\n/* Ring out by 70%, rest for the last 30%; the 100% frame is transparent\n   at 0 spread, so the resting look after the cap is a plain Primary. */\n@keyframes c-btn-beacon-ring{\n  0%{box-shadow:0 0 0 0 var(--c-btn-beacon-ink);}\n  70%{box-shadow:0 0 0 var(--spacing-12) var(--c-btn-beacon-ink-0);}\n  100%{box-shadow:0 0 0 0 var(--c-btn-beacon-ink-0);}\n}\n/* Nod follows the arrow's direction; same cycle and count as the ring. */\n@keyframes c-btn-beacon-nod-down{0%,60%,100%{transform:none;} 30%{transform:translateY(var(--c-btn-beacon-nod));}}\n@keyframes c-btn-beacon-nod-right{0%,60%,100%{transform:none;} 30%{transform:translateX(var(--c-btn-beacon-nod));}}\n/* Reduced-motion hold: a steady 2px ring for the same window. */\n@keyframes c-btn-beacon-hold{0%,100%{box-shadow:0 0 0 var(--border-width-md) var(--c-btn-beacon-ink);}}\n/* Armed. :where() keeps the guards at zero specificity; icon-only,\n   :disabled and aria-disabled never match. */\n.c-btn-primary.c-btn-beacon:where(:not(.c-btn-icon, :disabled, [aria-disabled=\"true\"])){\n  animation:c-btn-beacon-ring var(--c-btn-beacon-dur) var(--ease-standard) var(--c-btn-beacon-count);\n}\n/* Nod: trailing arrow only (last child). Any other glyph stays still. */\n.c-btn-primary.c-btn-beacon:where(:not(.c-btn-icon, :disabled, [aria-disabled=\"true\"])) > i.ph-arrow-down:where(:last-child){\n  animation:c-btn-beacon-nod-down var(--c-btn-beacon-dur) var(--ease-standard) var(--c-btn-beacon-count);\n}\n.c-btn-primary.c-btn-beacon:where(:not(.c-btn-icon, :disabled, [aria-disabled=\"true\"])) > i.ph-arrow-right:where(:last-child){\n  animation:c-btn-beacon-nod-right var(--c-btn-beacon-dur) var(--ease-standard) var(--c-btn-beacon-count);\n}\n/* Interaction mask. !important outranks the running animation WITHOUT\n   resetting its clock, so leaving hover can't replay fresh rings\n   (animation:none would). The host script then removes the class. */\n.c-btn-primary.c-btn-beacon:is(:hover, :focus, :active){box-shadow:none !important;}\n.c-btn-primary.c-btn-beacon:is(:hover, :focus, :active) > i{transform:none !important;}\n/* Static rendering: documentation, print, tests (.npeek.is-static\n   precedent). The reduced-motion look, held steadily. Not for runtime. */\n.c-btn-primary.c-btn-beacon.is-static{animation:none; box-shadow:0 0 0 var(--border-width-md) var(--c-btn-beacon-ink);}\n.c-btn-primary.c-btn-beacon.is-static > i.ph{animation:none;}\n/* Reduced motion: no pulse, no nod — a steady 2px ring for the same 4.2s,\n   then gone (a one-iteration animation, so the cap holds without JS). */\n@media (prefers-reduced-motion:reduce){\n  .c-btn-primary.c-btn-beacon:where(:not(.c-btn-icon, :disabled, [aria-disabled=\"true\"])){\n    animation:c-btn-beacon-hold calc(var(--c-btn-beacon-dur) * var(--c-btn-beacon-count)) linear 1;\n  }\n  .c-btn-primary.c-btn-beacon:where(:not(.c-btn-icon, :disabled, [aria-disabled=\"true\"])) > i.ph{animation:none;}\n}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it. null = the old system has no CSS for this. */
  old: string | null;
}

function Compare({ row, oldKey }: { row: Row; oldKey?: number }) {
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
            <p className="pg-missing">No CSS in the old system. Built from DESIGN-SYSTEM.md text; see MIGRATION-LOG.md.</p>
          ) : (
            <div key={oldKey} className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
          )}
        </div>
      </div>
    </section>
  );
}

function BeaconDemo() {
  const [beacon, setBeacon] = useState<'off' | 'on'>('off');
  const [other, setOther] = useState<'off' | 'on'>('off');
  const [log, setLog] = useState<string>('Not started');
  const [oldKey, setOldKey] = useState(0);
  const record = (who: string) => (s: { armed: boolean; reason: ButtonBeaconReason }) =>
    setLog(`${who}: ${s.armed ? 'started' : 'stopped'} (${s.reason})`);
  const replay = () => {
    // off then on: a new reason has arrived, so the host re-arms.
    setBeacon('off');
    setOther('off');
    requestAnimationFrame(() => setBeacon('on'));
    setOldKey(k => k + 1);
  };
  const row: Row = {
    id: 'beacon',
    label: 'CTA beacon (on)',
    note: 'Three rings, then it stops by itself. Hover, focus or press stops it at once. Only one beacon per page: "Start the other one" stops the first (reason: replaced). Replay restarts both columns.',
    next: (
      <div className="pg-stack">
        <div className="pg-inline">
          <Button variant="primary" trailingArrow="down" beacon={beacon} onBeaconChange={record('Next: audience')}>
            Next: audience
          </Button>
          <Button variant="primary" trailingArrow="right" beacon={other} onBeaconChange={record('Confirm booking')}>
            Confirm booking
          </Button>
        </div>
        <div className="pg-inline">
          <Button variant="secondary" size="sm" onClick={replay}>Replay</Button>
          <Button variant="secondary" size="sm" onClick={() => setOther('on')}>Start the other one</Button>
          <span className="pg-log">{log}</span>
        </div>
      </div>
    ),
    old: '<button class="c-btn c-btn-primary c-btn-md c-btn-beacon" type="button">Next: audience<i class="ph ph-arrow-down" aria-hidden="true"></i></button>',
  };
  return <Compare row={row} oldKey={oldKey} />;
}

const sizes = ['sm', 'md', 'lg'] as const;
const sizeName = { sm: 'Small', md: 'Medium', lg: 'Large' } as const;
const variants = ['primary', 'secondary', 'ghost'] as const;
const variantName = { primary: 'Primary', secondary: 'Secondary', ghost: 'Ghost' } as const;

const rows: Row[] = [
  ...variants.map<Row>(v => ({
    id: `variant-${v}`,
    label: `${variantName[v]}: sizes sm, md, lg`,
    note: v === 'primary' ? 'Hover, press and Tab through both columns to compare hover, active and focus-visible.' : undefined,
    next: (
      <div className="pg-inline">
        {sizes.map(s => (
          <Button key={s} variant={v} size={s}>{sizeName[s]}</Button>
        ))}
      </div>
    ),
    old: sizes.map(s => `<button class="c-btn c-btn-${v} c-btn-${s}">${sizeName[s]}</button>`).join(''),
  })),
  {
    id: 'leading-icon',
    label: 'Leading icon (Tier 1, Regular)',
    next: (
      <div className="pg-inline">
        {variants.map(v => (
          <Button key={v} variant={v} leadingIcon={Plus}>Add</Button>
        ))}
      </div>
    ),
    old: variants.map(v => `<button class="c-btn c-btn-${v} c-btn-md"><i class="ph ph-plus"></i>Add</button>`).join(''),
  },
  {
    id: 'leading-icon-sizes',
    label: 'Leading icon: sizes sm, md, lg',
    note: 'Icons follow the type size, as in the old CSS: 14px at sm, 16px at md and lg (MIGRATION-LOG BTN-5).',
    next: (
      <div className="pg-inline">
        {sizes.map(s => (
          <Button key={s} variant="primary" size={s} leadingIcon={Plus}>Add</Button>
        ))}
      </div>
    ),
    old: sizes.map(s => `<button class="c-btn c-btn-primary c-btn-${s}"><i class="ph ph-plus"></i>Add</button>`).join(''),
  },
  {
    id: 'leading-icon-fill',
    label: 'Leading icon (Tier 2, Fill)',
    next: <Button variant="secondary" leadingIcon={CheckCircle} leadingIconWeight="fill">Approved</Button>,
    old: '<button class="c-btn c-btn-secondary c-btn-md"><i class="ph-fill ph-check-circle"></i>Approved</button>',
  },
  {
    id: 'trailing-arrow',
    label: 'Trailing arrow',
    next: (
      <div className="pg-inline">
        <Button variant="primary" trailingArrow="down">Next: audience</Button>
        <Button variant="primary" trailingArrow="right">Continue</Button>
      </div>
    ),
    old:
      '<button class="c-btn c-btn-primary c-btn-md" type="button">Next: audience<i class="ph ph-arrow-down" aria-hidden="true"></i></button>' +
      '<button class="c-btn c-btn-primary c-btn-md" type="button">Continue<i class="ph ph-arrow-right" aria-hidden="true"></i></button>',
  },
  {
    id: 'icon-only',
    label: 'Icon-only',
    next: (
      <div className="pg-inline">
        <Button variant="primary" iconOnly icon={Plus} aria-label="Add" />
        <Button variant="secondary" iconOnly icon={Trash} aria-label="Delete" />
        <Button variant="ghost" iconOnly icon={DotsThree} aria-label="More options" />
      </div>
    ),
    old:
      '<button class="c-btn c-btn-primary c-btn-md c-btn-icon" aria-label="Add"><i class="ph ph-plus"></i></button>' +
      '<button class="c-btn c-btn-secondary c-btn-md c-btn-icon" aria-label="Delete"><i class="ph ph-trash"></i></button>' +
      '<button class="c-btn c-btn-ghost c-btn-md c-btn-icon" aria-label="More options"><i class="ph ph-dots-three"></i></button>',
  },
  {
    id: 'icon-only-sizes',
    label: 'Icon-only: sizes sm, md, lg',
    next: (
      <div className="pg-inline">
        {sizes.map(s => (
          <Button key={s} variant="secondary" size={s} iconOnly icon={Trash} aria-label="Delete" />
        ))}
      </div>
    ),
    old: sizes
      .map(s => `<button class="c-btn c-btn-secondary c-btn-${s} c-btn-icon" aria-label="Delete"><i class="ph ph-trash"></i></button>`)
      .join(''),
  },
  {
    id: 'disabled',
    label: 'Disabled',
    note: 'One disabled look for every variant, as components.css ships it (MIGRATION-LOG BTN-2).',
    next: (
      <div className="pg-inline">
        {variants.map(v => (
          <Button key={v} variant={v} disabled>{variantName[v]}</Button>
        ))}
        <Button variant="primary" iconOnly icon={Plus} aria-label="Add" disabled />
      </div>
    ),
    old:
      variants.map(v => `<button class="c-btn c-btn-${v} c-btn-md" disabled>${variantName[v]}</button>`).join('') +
      '<button class="c-btn c-btn-primary c-btn-md c-btn-icon" aria-label="Add" disabled><i class="ph ph-plus"></i></button>',
  },
  {
    id: 'beacon-static',
    label: 'CTA beacon (static)',
    note: 'The reduced-motion ring held still. Documentation, print and tests only.',
    next: <Button variant="primary" trailingArrow="down" beacon="static">Next: audience</Button>,
    old: '<button class="c-btn c-btn-primary c-btn-md c-btn-beacon is-static" type="button">Next: audience<i class="ph ph-arrow-down" aria-hidden="true"></i></button>',
  },
];

function LoadingRow() {
  const [loading, setLoading] = useState(true);
  const row: Row = {
    id: 'loading',
    label: 'Loading',
    note: 'Spinner replaces the content; fill and width stay the same; the button keeps its name and ignores clicks. Spinner size and hover-while-loading are open (Q-BTN-3).',
    next: (
      <div className="pg-stack">
        <div className="pg-inline">
          {variants.map(v => (
            <Button key={v} variant={v} loading={loading}>Save brief</Button>
          ))}
          <Button variant="primary" size="sm" loading={loading} leadingIcon={Plus}>Add</Button>
          <Button variant="primary" size="lg" loading={loading}>Save brief</Button>
        </div>
        <div className="pg-inline">
          <Button variant="secondary" size="sm" onClick={() => setLoading(l => !l)}>
            {loading ? 'Stop loading' : 'Start loading'}
          </Button>
        </div>
      </div>
    ),
    old: null,
  };
  return <Compare row={row} />;
}

export function ButtonPreview() {
  return (
    <>
      <style>{legacyButtonCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
      <BeaconDemo />
      <LoadingRow />
    </>
  );
}

export default ButtonPreview;

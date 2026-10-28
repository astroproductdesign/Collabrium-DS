// Foundation › Spacing & Shape. Ported from collabrium-dls/preview.html,
// section#spacing (spacingData, radiusData, elevationData, motionData,
// easingData). Values are read from the tokens; purposes are the DLS's.
import { tokens } from '../../../src/tokens/tokens';
import { GroupLabel, Section, type SectionProps } from './Section';

const spacingPurpose: Record<number, string> = {
  2: 'Half-step for tight composites only (icon gap, chip padding, hairline offsets)',
  4: 'Base unit',
  6: 'Half-step for tight composites only (icon-to-label gap)',
  8: 'Element gap — default gap between elements',
  12: 'Tight internal padding (buttons, table cells)',
  16: 'Card padding — default',
  20: 'Compact section-internal spacing',
  24: 'Section-internal spacing (card title block to body)',
  32: 'Page gutter — horizontal page padding',
  40: 'Large internal spacing',
  48: 'Section gap — between dashboard sections',
  60: 'Large section gap — between major page regions',
  120: 'Full-page / hero-level spacing',
};
const radiusUsage: Record<keyof typeof tokens.radius, string> = {
  xs: 'Compact controls only: checkbox box, small chips, dense rows',
  sm: 'Inputs, small buttons, icon buttons',
  md: 'Standard/large buttons',
  lg: 'Cards, modals, nav, feature panels',
  pill: 'Pills, badges, tags, avatars',
  link: 'Link-styled pill CTAs',
};
const controlUsage: Record<keyof typeof tokens.control, string> = {
  heightXs: 'Chips, tags, compact rows',
  heightSm: 'Small buttons and fields',
  heightMd: 'Default buttons and fields',
  heightLg: 'Large buttons and fields',
  hitTargetMin: 'The smallest comfortable touch row',
  choiceSize: 'Checkbox and radio box',
};
const measureUsage: Record<keyof typeof tokens.measure, string> = {
  sm: 'Permission Prompt, Tool approval, Thinking',
  md: 'Streaming Text',
  lg: 'Task Rows',
  prose: 'Chat window: the thread and composer reading width',
};
const layerUsage: Record<keyof typeof tokens.layer, string> = {
  float: 'Floating controls and anchored panels: profile and user menus, filter panel, pod card, sidebar hover label, floating Prompt input bar, Back to top',
  bar: 'Action bar',
  menu: 'Fixed menus and hover previews: uploader menu, model menu, More options menu, the notes peek',
  panel: 'The notes panel',
  chat: 'Chat window',
  modal: 'Media Ad Modal, Compare modal',
  brief: "Command brief's scrim",
  tooltip: "Ad Placement Card (Tooltip's \"above modals\" layer)",
  toast: 'Toast host',
  tour: 'Tutorial Modal, above everything',
};
const focusUsage: Record<keyof typeof tokens.focus, string> = {
  width: 'The outline width (border-width-md)',
  color: 'Obsidian',
  offset: 'Clear of a standalone control',
  offsetInset: 'Drawn inside, where a container would clip it',
};
const staggerUsage: Record<keyof typeof tokens.stagger, string> = {
  sm: 'Rows entering one after another (Task Rows, follow-ups, detail steps)',
  md: 'The same, for larger rows (Thinking\'s trace)',
};
const elevation: { key: 'hairline' | '1' | '2' | '3' | '4'; usage: string }[] = [
  { key: 'hairline', usage: 'Hairline ring' },
  { key: '1', usage: 'Cards, default resting elevation' },
  { key: '2', usage: 'Hover / raised state' },
  { key: '3', usage: 'Popovers, dropdowns' },
  { key: '4', usage: 'Dialogs / modals' },
];
const durationUsage: Record<keyof typeof tokens.duration, string> = {
  instant: 'Micro feedback (press, toggle)',
  fast: 'Hover, focus transitions',
  base: 'Default UI transitions',
  slow: 'Panel/section reveals',
  ambient: 'Background/ambient motion',
  morph: 'Pose-to-pose shape transitions',
  reveal: 'Entrance reveals that need to read as more deliberate than duration-slow',
  pulse: 'One cycle of a repeating attention cue (CTA beacon ring, Thinking shimmer)',
  blink: 'A text caret\'s blink',
};
const easeUsage: Record<keyof typeof tokens.ease, string> = {
  standard: 'Default UI easing',
  settle: 'Earth — anchored arrivals',
  flow: 'Water — continuous',
  flare: 'Fire — pulse outward, rise',
  precise: 'Gold — sharp, decisive',
  grow: 'Wood — branching growth',
  morph: 'Pose-to-pose shape transitions — pairs with duration-morph',
  reveal: 'Entrance reveals — pairs with duration-reveal',
};

const kebab = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const num = (n: number) => String(n).replace(/^0\./, '.');

function Spec({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="docs-table-wrap">
      <table className="spec">
        <thead>
          <tr>
            {head.map(h => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === 0 ? 'token' : undefined}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpacingSection({ level }: SectionProps) {
  return (
    <Section
      id="spacing-shape"
      level={level}
      kicker="06 · Foundations"
      title="Spacing & Shape"
      lede="4pt base grid. Collabrium is a product surface, not a marketing page — most layouts run full-bleed within the app shell rather than centering. Radius is per-surface, not one flat scale."
    >
      <Spec
        head={['Token', 'Value', 'Purpose', 'Preview']}
        rows={(Object.keys(tokens.spacing) as unknown as (keyof typeof tokens.spacing)[]).map(k => [
          `spacing-${k}`,
          `${tokens.spacing[k]}px`,
          spacingPurpose[Number(k)],
          <div key="p" className="docs-bar-cell">
            <div className="bar-preview" style={{ width: `var(--spacing-${k})` }} />
          </div>,
        ])}
      />
      <Spec
        head={['Element', 'Value', 'Usage', 'Preview']}
        rows={(Object.keys(tokens.radius) as (keyof typeof tokens.radius)[]).map(k => [
          `radius-${k}`,
          `${tokens.radius[k]}px`,
          radiusUsage[k],
          <div key="p" className="radius-preview" style={{ borderRadius: `var(--radius-${k})` }} />,
        ])}
      />

      <GroupLabel level={level} id="control-sizes">Control sizes</GroupLabel>
      <p className="lede docs-lede-tight">
        The height of an interactive control, by density. Button and Input field use 32, 40 and 48px; Chip uses 24px.{' '}
        <code>spacing-32/40/48</code> hold the same numbers but mean spacing, not control height.
      </p>
      <Spec
        head={['Token', 'Value', 'Use', 'Preview']}
        rows={(Object.keys(tokens.control) as (keyof typeof tokens.control)[]).map(k => {
          const name = kebab(k === 'heightXs' || k === 'heightSm' || k === 'heightMd' || k === 'heightLg' ? k.replace('height', 'control-height-') : k);
          return [
            name,
            `${tokens.control[k]}px`,
            controlUsage[k],
            <div key="p" className="docs-bar-cell">
              <div className="bar-preview" style={{ width: k === 'choiceSize' ? `var(--${name})` : 'var(--spacing-40)', height: `var(--${name})` }} />
            </div>,
          ];
        })}
      />

      <GroupLabel level={level} id="measures">Measures</GroupLabel>
      <p className="lede docs-lede-tight">
        Max-widths for self-contained AI Native surfaces. A host narrower than the measure just fills it.
      </p>
      <Spec
        head={['Token', 'Value', 'Used by']}
        rows={(Object.keys(tokens.measure) as (keyof typeof tokens.measure)[]).map(k => [
          `measure-${k}`,
          `${tokens.measure[k]}px`,
          measureUsage[k],
        ])}
      />

      <GroupLabel level={level} id="layers">Layers</GroupLabel>
      <p className="lede docs-lede-tight">
        The stacking order of page-level surfaces: anything fixed to the viewport or drawn over page content. A higher
        number paints over a lower one. Stacking inside one component stays a plain number.
      </p>
      <Spec
        head={['Token', 'Value', 'Used by']}
        rows={(Object.keys(tokens.layer) as (keyof typeof tokens.layer)[]).map(k => [
          `z-${k}`,
          String(tokens.layer[k]),
          layerUsage[k],
        ])}
      />

      <GroupLabel level={level} id="focus-ring">Focus ring</GroupLabel>
      <p className="lede docs-lede-tight">
        One keyboard-focus treatment: a 2px Obsidian outline, 2px clear of the element; inset (&minus;2px) where a
        container would clip it. Written once as four tokens, so no component spells it out.
      </p>
      <Spec
        head={['Token', 'Value', 'Use', 'Preview']}
        rows={(Object.keys(tokens.focus) as (keyof typeof tokens.focus)[]).map(k => [
          `focus-ring-${kebab(k)}`,
          k === 'color' ? String(tokens.focus[k]) : `${tokens.focus[k]}px`,
          focusUsage[k],
          k === 'offset' || k === 'offsetInset' ? (
            <div key="p" className="docs-focus-demo" data-inset={k === 'offsetInset' ? '' : undefined} />
          ) : null,
        ])}
      />

      <GroupLabel level={level}>Elevation</GroupLabel>
      <p className="lede docs-lede-tight">
        A real shadow ladder — not &ldquo;flat by default.&rdquo; Every shadow is built on Neutral-4 (soft grey), never
        black. Cards and dialogs use these regularly.
      </p>
      <div className="elevation-row">
        {elevation.map(e => (
          <div key={e.key} className="elevation-swatch">
            <div className="box" style={{ boxShadow: `var(--shadow-${e.key})` }} />
            <span className="label">
              <b className="docs-elevation-name">shadow-{e.key}</b>
              {e.usage}
            </span>
          </div>
        ))}
      </div>

      <GroupLabel level={level}>Motion</GroupLabel>
      <p className="lede docs-lede-tight">
        &ldquo;Movement settles; it never bounces.&rdquo; One easing curve per element, used when motion is thematically
        tied to that element; <code>--ease-standard</code> is the default for everything else.
      </p>
      <Spec
        head={['Token', 'Value', 'Usage']}
        rows={[
          ...(Object.keys(tokens.duration) as (keyof typeof tokens.duration)[]).map(k => [`duration-${k}`, `${tokens.duration[k]}ms`, durationUsage[k]]),
          ...(Object.keys(tokens.stagger) as (keyof typeof tokens.stagger)[]).map(k => [`stagger-${k}`, `${tokens.stagger[k]}ms`, staggerUsage[k]]),
          ...(Object.keys(tokens.ease) as (keyof typeof tokens.ease)[]).map(k => [`ease-${kebab(k)}`, `cubic-bezier(${tokens.ease[k].map(num).join(',')})`, easeUsage[k]]),
        ]}
      />
    </Section>
  );
}

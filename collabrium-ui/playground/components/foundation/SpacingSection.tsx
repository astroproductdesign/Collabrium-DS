// Foundation › Spacing & Shape. Ported from collabrium-dls/preview.html,
// section#spacing (spacingData, radiusData, elevationData, motionData,
// easingData). Values are read from the tokens; purposes are the DLS's.
import { tokens } from '../../../src/tokens/tokens';
import { GroupLabel, Section, type SectionProps } from './Section';

const spacingPurpose: Record<number, string> = {
  4: 'Base unit',
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
  sm: 'Inputs, small buttons, icon buttons',
  md: 'Standard/large buttons',
  lg: 'Cards, modals, nav, feature panels',
  pill: 'Pills, badges, tags, avatars',
  link: 'Link-styled pill CTAs',
};
const elevation: { key: 'hairline' | '1' | '2' | '3' | '4'; usage: string }[] = [
  { key: 'hairline', usage: 'Hairline ring' },
  { key: '1', usage: 'Cards, default resting elevation' },
  { key: '2', usage: 'Hover / raised state' },
  { key: '3', usage: 'Popovers, dropdowns' },
  { key: '4', usage: 'Dialogs / modals' },
];
// The DLS site lists the first five durations and six easings; the last
// ones (morph, reveal) are in tokens.css and DESIGN-SYSTEM.md's Motion table.
const durationUsage: Record<keyof typeof tokens.duration, string> = {
  instant: 'Micro feedback (press, toggle)',
  fast: 'Hover, focus transitions',
  base: 'Default UI transitions',
  slow: 'Panel/section reveals',
  ambient: 'Background/ambient motion',
  morph: 'Pose-to-pose shape transitions',
  reveal: 'Entrance reveals that need to read as more deliberate than duration-slow',
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
          ...(Object.keys(tokens.ease) as (keyof typeof tokens.ease)[]).map(k => [`ease-${kebab(k)}`, `cubic-bezier(${tokens.ease[k].map(num).join(',')})`, easeUsage[k]]),
        ]}
      />
    </Section>
  );
}

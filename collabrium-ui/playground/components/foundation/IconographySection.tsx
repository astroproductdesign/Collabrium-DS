// Foundation › Iconography. Ported from collabrium-dls/preview.html,
// section#iconography. Icon sizes are read from the tokens.
import { tokens } from '../../../src/tokens/tokens';
import { GroupLabel, Section, cardHeading, type SectionProps } from './Section';

const tier1 = ['plus', 'x', 'caret-down', 'funnel', 'magnifying-glass', 'check', 'minus', 'download-simple', 'trash'];
const tier2 = ['check-circle', 'warning', 'house', 'calendar', 'fire', 'info'];

const sizeUsage: Record<keyof typeof tokens.icon, string> = {
  micro: 'Table cells, tag labels, badge indicators',
  sm: 'Inline with body text, buttons, form fields, status',
  base: 'Sidebar nav, card actions, standard UI',
  md: 'Card headers, section titles, modal headers',
  lg: 'Department indicators, feature highlights, onboarding',
  empty: 'Empty-state panels',
  hero: 'Full-page empty states, first run, error pages',
};

export function IconographySection({ level }: SectionProps) {
  const H3 = cardHeading(level);
  const H4 = level === 1 ? 'h3' : 'h4';
  return (
    <Section
      id="iconography"
      level={level}
      kicker="05 · Foundations"
      title="Iconography"
      lede={
        <>
          Bold, chunky silhouettes with rounded, organic forms, from a two-library system in <b>two weights</b> — the weight
          is decided by what the icon does, not by taste.
        </>
      }
    >
      <GroupLabel level={level}>Primary &amp; fallback</GroupLabel>
      <div className="fontcards">
        <div className="fontcard">
          <p className="kicker">Primary</p>
          <H3>Phosphor</H3>
          <dl>
            <dt>License</dt><dd>MIT, free, self-hostable</dd>
            <dt>Weights loaded</dt><dd>Regular (Tier 1) + Fill (Tier 2), both stylesheets always loaded together</dd>
            <dt>Class prefix</dt><dd><code>ph</code> (Regular) / <code>ph-fill</code> (Fill)</dd>
          </dl>
          <p>phosphoricons.com — rounded, friendly silhouettes that complement Collabrium&apos;s tone without feeling playful for a professional dashboard.</p>
        </div>
        <div className="fontcard">
          <p className="kicker">Fallback</p>
          <H3>Remix Icon</H3>
          <dl>
            <dt>License</dt><dd>Apache 2.0, free, self-hostable</dd>
            <dt>Used when</dt><dd>Only if Phosphor lacks the glyph — same tier split applies</dd>
            <dt>Example</dt><dd><code>ri-plus-line</code> (Tier 1) / <code>ri-check-circle-fill</code> (Tier 2)</dd>
          </dl>
          <p>remixicon.com — a same-weight-logic substitute, never mixed with Phosphor inside a single component instance.</p>
        </div>
      </div>

      <GroupLabel level={level}>The two tiers</GroupLabel>
      <div className="icon-tiers">
        <div className="icon-tier-card">
          <p className="kicker">Tier 1 · Regular</p>
          <H4>Functional / control icons</H4>
          <div className="icon-sample-row">
            {tier1.map(n => (
              <div key={n} className="icon-sample">
                <i className={`ph ph-${n}`} aria-hidden="true" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <p>
            Icons inside buttons, toolbars, and as affordances — actions the user <i>performs</i>, not concepts being
            communicated. At icon-sm/icon-base, Regular reads more precisely than Fill, which looks heavy on a small + or ×.
          </p>
        </div>
        <div className="icon-tier-card">
          <p className="kicker">Tier 2 · Fill</p>
          <H4>Expressive / status / decorative icons</H4>
          <div className="icon-sample-row">
            {tier2.map(n => (
              <div key={n} className="icon-sample">
                <i className={`ph-fill ph-${n}`} aria-hidden="true" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <p>
            Icons that communicate meaning, status, or context rather than trigger an action — sidebar nav, status
            indicators, card headers, department indicators, empty-state illustrations. At icon-md and above, Fill reads
            naturally.
          </p>
        </div>
      </div>

      <GroupLabel level={level}>Size scale</GroupLabel>
      <div className="docs-table-wrap">
        <table className="spec">
          <thead>
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Token</th>
              <th scope="col">Size</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(tokens.icon) as (keyof typeof tokens.icon)[]).map(k => (
              <tr key={k}>
                <td className="icon-preview">
                  <i className="ph-fill ph-star" style={{ fontSize: `var(--icon-${k})` }} aria-hidden="true" />
                </td>
                <td className="token">icon-{k}</td>
                <td>{tokens.icon[k]}px</td>
                <td>{sizeUsage[k]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

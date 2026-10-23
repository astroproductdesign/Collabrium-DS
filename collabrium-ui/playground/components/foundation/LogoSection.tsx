// Foundation › Logo. Ported from collabrium-dls/preview.html, section#logo.
import { DownloadButton } from './DownloadButton';
import { GroupLabel, Section, cardHeading, type SectionProps } from './Section';

const elements = [
  { el: 'Gold', svg: 'gold', usage: 'Order & structure', dept: 'Finance · Legal · Compliance · QA & Audit' },
  { el: 'Water', svg: 'water', usage: 'Depth & flow', dept: 'Data · Logistics · Exec' },
  { el: 'Wood', svg: 'wood', usage: 'Growth & vision', dept: 'Strategy · R&D · Product' },
  { el: 'Fire', svg: 'fire', usage: 'Visibility & energy', dept: 'Marketing · PR · Sales' },
  { el: 'Earth', svg: 'earth', usage: 'Support & stability', dept: 'HR · CS · Admin' },
];

const departments = [
  { name: 'CollabContent', file: 'collabContent', el: 'Wood', svg: 'wood', bg: 'wood-bg', fg: 'salmon-pink', desc: 'The content generation workspace where campaign copy, creative briefs, and content assets get produced, organized, and approved.' },
  { name: 'CollabInfluence', file: 'collabInfluence', el: 'Earth', svg: 'earth', bg: 'earth-bg', fg: 'green', desc: 'Influencer management system for sourcing, briefing, and measuring creator partnerships from discovery through payout.' },
  { name: 'CollabSales', file: 'collabSales', el: 'Gold', svg: 'gold', bg: 'gold-bg', fg: 'amber', desc: 'Manage the sales pipeline, from lead to close, tracking opportunities, quotes, and forecasting through to account handoff.' },
  { name: 'CollabStudio', file: 'collabStudio', el: 'Fire', svg: 'fire', bg: 'fire-bg', fg: 'orange', desc: 'Creative studio, hosting creative-output AI agentic tools for visual, video, and design generation for campaigns.' },
  { name: 'CollabMedia', file: 'collabMedia', el: 'Water', svg: 'water', bg: 'water-bg', fg: 'navy', desc: "Media planning system that recommends digital media space and channel strategy based on a brand's available revenue — turning budget into a data-driven media plan." },
];

export function LogoSection({ base, level }: SectionProps) {
  const H3 = cardHeading(level);
  return (
    <Section
      id="logo"
      level={level}
      kicker="01 · Foundations"
      title="Logo"
      lede="Collabrium's mark in every form it ships in — the default lockup, each department's own tinted lockup, and the platform app icon sets. Whenever no department context applies, the Gold default is the one to use."
    >
      <GroupLabel level={level}>Default lockup</GroupLabel>
      <div className="logo-lockup-card">
        <div className="logo-lockup-img">
          <img src={`${base}logo-lockups/collabrium-default-logo.svg`} alt="Collabrium default logo lockup, Gold" />
          <span className="dept-logo-download">
            <DownloadButton href={`${base}logo-lockups/collabrium-default-logo.svg`} filename="Collabrium-default-logo.svg" />
          </span>
        </div>
        <p className="kicker docs-flush">Default · Gold</p>
      </div>
      <p className="lede docs-lede-inline">
        Whenever the mark is used without a specific department context, this Gold lockup is the default — not a still
        frame from the animation, not another element&apos;s color. Department-specific surfaces (e.g. a Marketing deck
        cover, a Finance report header) switch to that element&apos;s own lockup instead.
      </p>
      <div className="docs-table-wrap">
      <table className="spec">
        <thead>
          <tr>
            <th scope="col">Element</th>
            <th scope="col">Usage</th>
            <th scope="col">Department</th>
          </tr>
        </thead>
        <tbody>
          {elements.map(e => (
            <tr key={e.el}>
              <td className="element-cell">
                <img className="element-icon" src={`${base}SVG/${e.svg}.svg`} alt="" />
                {e.el}
              </td>
              <td>{e.usage}</td>
              <td>{e.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <GroupLabel level={level}>Department logos</GroupLabel>
      <p className="lede docs-lede-tight">Each Astro digital function inside Collabrium carries its own lockup, tinted to its element.</p>
      <div className="dept-logo-grid">
        {departments.map(d => (
          <div key={d.name} className="dept-logo-card">
            <div className="dept-logo-img">
              <img src={`${base}logo-lockups/${d.file}.svg`} alt={`${d.name} logo, ${d.el}`} />
              <span className="dept-logo-download">
                <DownloadButton href={`${base}logo-lockups/${d.file}.svg`} filename={`${d.name}-logo.svg`} />
              </span>
            </div>
            <span className="dept-logo-tag" style={{ background: `var(--color-${d.bg})`, color: `var(--color-${d.fg})` }}>
              <img className="element-icon docs-flush-icon" src={`${base}SVG/${d.svg}.svg`} alt="" />
              {d.el}
            </span>
            <H3 className="dept-logo-name">{d.name}</H3>
            <p className="dept-logo-desc">{d.desc}</p>
          </div>
        ))}
      </div>

      <GroupLabel level={level}>App icons — Microsoft Teams</GroupLabel>
      <p className="lede docs-lede-tight">
        The Collabrium app icon set for the Microsoft Teams Store and app bar. Ship these exact files — the app icon
        always carries the default Gold mark, never a department lockup. The app-bar icon is white on transparent, so its
        two states preview here on a dark tile.
      </p>
      <div className="dept-logo-grid">
        <div className="dept-logo-card appicon-card">
          <div className="dept-logo-img">
            <img src={`${base}logo-icon-msteams/collabrium_main_icon_192.png`} alt="Collabrium Microsoft Teams colour app icon, full-bleed Gold, 192 by 192 pixels" />
            <span className="dept-logo-download">
              <DownloadButton href={`${base}logo-icon-msteams/collabrium_main_icon_192.png`} filename="collabrium_main_icon_192.png" />
            </span>
          </div>
          <span className="dept-logo-tag" style={{ background: 'var(--color-gold-bg)', color: 'var(--color-amber)' }}>
            <img className="element-icon docs-flush-icon" src={`${base}SVG/gold.svg`} alt="" />
            Gold
          </span>
          <H3 className="dept-logo-name">Colour icon</H3>
          <p className="dept-logo-desc">192×192, full bleed. Shown in the Teams Store, flyouts and the app details page.</p>
        </div>
        <div className="dept-logo-card appicon-card">
          <div className="appicon-states">
            {[
              { state: 'Rest', file: 'collabrium_rest_icon_32.png', alt: 'Collabrium Microsoft Teams app bar icon, rest state, white outline on transparent, 32 by 32 pixels' },
              { state: 'Focus', file: 'collabrium_focus_icon_32.png', alt: 'Collabrium Microsoft Teams app bar icon, focused state, solid white on transparent, 32 by 32 pixels' },
            ].map(s => (
              <div key={s.state} className="dept-logo-img">
                <img src={`${base}logo-icon-msteams/${s.file}`} alt={s.alt} />
                <span className="dept-logo-download">
                  <DownloadButton href={`${base}logo-icon-msteams/${s.file}`} filename={s.file} />
                </span>
                <span className="appicon-state-label">{s.state}</span>
              </div>
            ))}
          </div>
          <span className="dept-logo-tag" style={{ background: 'var(--color-neutral-2)', color: 'var(--color-neutral-5)' }}>
            App bar
          </span>
          <H3 className="dept-logo-name">App bar icon</H3>
          <p className="dept-logo-desc">32×32, two states of one icon: outline at rest, filled when focused. The focused state is optional.</p>
        </div>
      </div>
    </Section>
  );
}

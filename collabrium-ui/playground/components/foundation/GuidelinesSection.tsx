// Foundation › Guidelines. Ported verbatim from collabrium-dls/preview.html,
// section#guidelines.
import { Section, type SectionProps } from './Section';

const dos: React.ReactNode[] = [
  <>Use Obsidian as the only primary-action fill — one Primary button per screen.</>,
  <>Use the warm canvas (#FCFAF5) as the page background for every screen — product/dashboard and brand/editorial alike. Component fills (cards, inputs, etc.) keep their own values, mostly Neutral-1 white.</>,
  <>Use Mulish for 100% of UI text <b>and every heading</b> — headings at weight 800, letter-spacing 0.</>,
  <>Reserve Source Serif 4 for genuine brand-statement moments only (deck ledes, pull quotes, hero numerals), never as a heading-token swap, never below ~18–20px.</>,
  <>Use the tinted-fill + bordered pattern for every Badge, and darken Success/Warning text (<code>#007d47</code>, <code>#9a5c00</code>) so it clears AA.</>,
  <>Map department/element colors 1:1 from the Color Palette table — don&apos;t invent one.</>,
  <>Tint a surface only with the element that already owns its content, and only at the -bg (8%) or -bg-strong (16%) step.</>,
  <>Use Regular weight for functional/control icons (Tier 1) and Fill for expressive/status icons (Tier 2) — the weight is decided by what the icon does, not by taste.</>,
  <>Pull every spacing, radius, and color value from a token — no arbitrary values.</>,
  <>Let cards carry shadow-1 at rest, and build every shadow on Neutral-4 (soft grey), never black.</>,
  <>Keep radius soft: 20px cards, 16px buttons, 12px inputs. Never below 12px on an interactive surface.</>,
  <>Give every interactive component its full state set: hover, active, focus, disabled, error.</>,
  <>Right-align numeric table columns with tabular figures.</>,
];
const donts: React.ReactNode[] = [
  <>Never use a brand/element color as a primary button fill — those colors classify, they don&apos;t mean &ldquo;click me.&rdquo;</>,
  <>Never use Source Serif 4 in body copy, buttons, inputs, table data, or dense numeric columns.</>,
  <>Never mix two fonts inside a single sentence or heading — emphasis is a weight change, not a font swap.</>,
  <>Never apply negative letter-spacing to headings — Collabrium headings are weight 800 at tracking 0.</>,
  <>Never assign icon weight by taste — Regular for Tier 1 (functional/control), Fill for Tier 2 (expressive/status) — and never mix Phosphor with Remix within the same component instance.</>,
  <>Never build a shadow on black — every shadow in this system is Neutral-4 based.</>,
  <>Never fill a small badge solid with a brand color and put white text on it — several accents fail contrast that way.</>,
  <>Never use a radius outside the token set (radius-sm/md/lg/pill/link).</>,
  <>Never tint a surface with an element that doesn&apos;t own its content, and never at full or mid strength.</>,
  <>Never add bounce or overshoot easing — movement settles.</>,
  <>Never use placeholder text as a substitute for a real label.</>,
  <>Never use a modal for a multi-step flow.</>,
  <>Never let a table exceed ~8–10 visible columns without a collapse pattern.</>,
  <>Never treat a ⚠️ value in DESIGN.md as final — it&apos;s a draft until the brand team signs off.</>,
];

export function GuidelinesSection({ level }: SectionProps) {
  const H3 = level === 1 ? 'h2' : 'h3';
  return (
    <Section id="guidelines" level={level} kicker="07 · Reference" title="Guidelines" lede="The condensed, skimmable version of every rule in this system.">
      <div className="guide-cols">
        <div className="guide-col do">
          <H3>
            <i className="ph-fill ph-check-circle" aria-hidden="true" />
            Do
          </H3>
          <ul>
            {dos.map((d, i) => (
              <li key={i}>
                <i className="ph-fill ph-check" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="guide-col dont">
          <H3>
            <i className="ph-fill ph-x-circle" aria-hidden="true" />
            Don&apos;t
          </H3>
          <ul>
            {donts.map((d, i) => (
              <li key={i}>
                <i className="ph-fill ph-x" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

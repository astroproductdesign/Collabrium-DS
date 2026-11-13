// Foundation › Fonts. Ported from collabrium-dls/preview.html, section#fonts, with
// DESIGN-SYSTEM.md "Licensing Attribution" (10093–10107) as its Licensing table.
import { DownloadButton } from './DownloadButton';
import { GroupLabel, Section, cardHeading, type SectionProps } from './Section';

const licensing: [string, string, string][] = [
  ['Designer', 'Vernon Adams, with further development by Jacques Le Bailly (Cyreal)', 'Frank Grießhammer, Adobe'],
  ['Publisher', 'Google Fonts', 'Adobe (Source type superfamily)'],
  ['License', 'SIL Open Font License 1.1', 'SIL Open Font License 1.1'],
  ['Distribution', 'Google Fonts, GitHub', 'Google Fonts, GitHub (Adobe Fonts repo)'],
  ['Attribution required', 'No', 'No'],
  ['Commercial use', 'Yes, unrestricted', 'Yes, unrestricted'],
  ['Self-hosting', 'Yes', 'Yes'],
  ['Modification', 'Yes', 'Yes'],
  ['Cost', 'Free', 'Free'],
];

export function FontsSection({ base, level }: SectionProps) {
  const H3 = cardHeading(level);
  return (
    <Section
      id="fonts"
      level={level}
      kicker="05 · Foundations"
      title="Fonts"
      aside={<DownloadButton href={`${base}fonts/collabrium-fonts.zip`} filename="collabrium-fonts.zip" label="Download font pack" variant="primary" size="md" />}
    >
      <p className="docs-p">
        The pack holds real .ttf files for Mulish and Source Serif 4. A browser can&apos;t install fonts into your system,
        so double-click each file afterwards and confirm Install Font.
      </p>
      <div className="fontcards">
        <div className="fontcard">
          <p className="kicker">Primary</p>
          <H3>Mulish</H3>
          <dl>
            <dt>Weight</dt><dd>200–900 · headings 800, labels/buttons 700, body 500</dd>
            <dt>Sizes</dt><dd>11–48px · UI range 10–16px</dd>
            <dt>Line height</dt><dd>1.0–1.45</dd>
            <dt>Letter spacing</dt><dd>0 across the board, headings included</dd>
            <dt>License</dt><dd>SIL OFL 1.1, free, self-hostable</dd>
            <dt>Fallback</dt><dd>-apple-system, Segoe UI, Roboto</dd>
          </dl>
          <p>
            Carries everything functional — UI, body, navigation, buttons, tables, captions, data — <b>and</b> every heading
            (display through h5) at weight 800 ExtraBold. Neutral, legible, technically reliable across a dashboard-dense
            product.
          </p>
        </div>
        <div className="fontcard">
          <p className="kicker">Secondary</p>
          <H3>Source Serif 4</H3>
          <dl>
            <dt>Weight</dt><dd>300–900 available · use 400</dd>
            <dt>Sizes</dt><dd>Never below ~18–20px</dd>
            <dt>Line height</dt><dd>1.2–1.5</dd>
            <dt>Letter spacing</dt><dd>0</dd>
            <dt>License</dt><dd>SIL OFL 1.1, free, self-hostable</dd>
            <dt>Fallback</dt><dd>Georgia, Times New Roman</dd>
          </dl>
          <p>
            Not a heading-size token — a deliberate overlay for brand-statement moments only: pitch-deck ledes, brand story
            copy, pull quotes, hero display numerals. Never mix fonts inside one sentence (emphasis is weight, not a font
            swap); never in a dense numeric column; one hero per view.
          </p>
        </div>
      </div>

      <GroupLabel level={level}>Licensing</GroupLabel>
      <p className="docs-p">Both faces are free for commercial use, self-hosting and modification. Credit isn&apos;t required.</p>
      <table className="spec">
        <thead>
          <tr>
            <th></th>
            <th>Mulish</th>
            <th>Source Serif 4</th>
          </tr>
        </thead>
        <tbody>
          {licensing.map(([k, m, s]) => (
            <tr key={k}>
              <td><b>{k}</b></td>
              <td>{m}</td>
              <td>{s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

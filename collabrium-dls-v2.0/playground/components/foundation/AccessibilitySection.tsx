// Foundation › Accessibility. The system-wide targets from
// collabrium-dls/DESIGN-SYSTEM.md "Accessibility" (909–919, WCAG 2.1 AA),
// with the rules the DLS applies to every component: Component Rules 4 and 5
// (979–995), the focus ring and hit-target tokens (tokens.css; DESIGN-SYSTEM.md
// Spacing & Shape 581), and the decided red and green text colours. Each
// component page covers its own keyboard and screen-reader behaviour.
import { GroupLabel, Section, type SectionProps } from './Section';

const targets = [
  { target: 'Minimum body text', value: '14px (the body2 size)' },
  { target: 'Minimum contrast', value: '4.5:1 for body text; 3:1 for large text (24px and up) and UI components' },
  { target: 'Maximum line length', value: 'About 75 characters' },
];

export function AccessibilitySection({ level }: SectionProps) {
  return (
    <Section
      id="accessibility"
      level={level}
      kicker="10 · Foundations"
      title="Accessibility"
      lede="Collabrium targets WCAG 2.1 AA. These rules hold for every screen and every component; each component's page covers its own keyboard and screen-reader behaviour."
    >
      <GroupLabel level={level}>Targets</GroupLabel>
      <table className="spec">
        <thead>
          <tr>
            <th>Target</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {targets.map(t => (
            <tr key={t.target}>
              <td>
                <b>{t.target}</b>
              </td>
              <td>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GroupLabel level={level}>Every component</GroupLabel>
      <table className="spec">
        <thead>
          <tr>
            <th>Rule</th>
            <th>How</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Full state set</b>
            </td>
            <td>Default, hover, active, focus-visible and disabled at minimum; error for anything that takes input.</td>
          </tr>
          <tr>
            <td>
              <b>Contrast is checked, not assumed</b>
            </td>
            <td>
              Every text and icon pairing clears the targets above, on brand-coloured surfaces too: white text on Amber fails,
              so light accent fills take Obsidian text.
            </td>
          </tr>
          <tr>
            <td>
              <b>Visible focus</b>
            </td>
            <td>
              A 2px Obsidian ring, 2px outside the control (<code>--focus-ring-*</code>),
              drawn inside where a scrolling row would clip it. Keyboard focus only (<code>:focus-visible</code>).
            </td>
          </tr>
          <tr>
            <td>
              <b>Touch targets</b>
            </td>
            <td>
              At least 44px (<code>--hit-target-min</code>). A smaller control keeps its look and gets a transparent hit area
              around it.
            </td>
          </tr>
          <tr>
            <td>
              <b>Reduced motion</b>
            </td>
            <td>
              Respected everywhere: drop the travel, keep the information. Illustration loops never load; content still
              appears, just without the movement.
            </td>
          </tr>
          <tr>
            <td>
              <b>Never colour alone</b>
            </td>
            <td>
              Status pairs its colour with a word or a Phosphor Fill icon. Error text is bold <code>--color-red</code>; success
              text and ticks are <code>--color-green</code>, always beside a word.
            </td>
          </tr>
          <tr>
            <td>
              <b>Real labels</b>
            </td>
            <td>Every field has a label; placeholder text never stands in for one.</td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

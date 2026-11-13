// Foundation › Brand Foundation. Ported from collabrium-dls/DESIGN-SYSTEM.md
// "Brand Foundation" (53–100) and the DLS site's intro, preview.html
// section#collabrium (811–837): the name, positioning, tone and voice, and
// the content rules every piece of copy follows.
import { GroupLabel, Section, type SectionProps } from './Section';

const tone = [
  { name: 'Team-first', says: 'talks like a colleague, not a control panel' },
  { name: 'Easy confidence', says: 'sure of itself without needing to prove it' },
  { name: 'Plainspoken', says: 'says the true thing simply, no jargon' },
  { name: 'Steady', says: 'calm and dependable' },
];

const contentRules: { rule: string; body: React.ReactNode }[] = [
  {
    rule: 'Person',
    body: (
      <>
        Second person for the reader (&ldquo;Nothing waiting on you&rdquo;), first-person plural only for the system&apos;s
        own actions (&ldquo;We&apos;ll try again in a minute&rdquo;). Never &ldquo;the user.&rdquo;
      </>
    ),
  },
  {
    rule: 'Casing',
    body: (
      <>
        Sentence case everywhere: headings, buttons, table headers, toasts. UPPERCASE is only for eyebrow labels and section
        kickers, always at <code>--tracking-eyebrow</code> (0.12em).
      </>
    ),
  },
  { rule: 'Emoji', body: <>Never. Not in UI, not in decks. Status is carried by a Phosphor Fill icon and a colour.</> },
  {
    rule: 'Numbers',
    body: (
      <>
        Malaysian ringgit as <code>RM 100,000</code>: a space after RM, comma thousands. Tabular figures wherever numbers
        sit in a column.
      </>
    ),
  },
  {
    rule: 'Empty and error states',
    body: (
      <>
        Stay human: &ldquo;Nothing waiting on you. When a brief needs your call, it lands here.&rdquo; Not &ldquo;No records
        found.&rdquo;
      </>
    ),
  },
  { rule: 'Sentences', body: <>One idea per sentence. Fragments are fine as a lede.</> },
  {
    rule: 'The em-dash aside',
    body: (
      <>
        A Collabrium house move in the product&apos;s own copy, for the second beat of a thought (&ldquo;Balance restored
        across execution, measurement, and allocation — not just speed for its own sake&rdquo;).
      </>
    ),
  },
];

export function BrandSection({ level }: SectionProps) {
  return (
    <Section
      id="brand-foundation"
      level={level}
      kicker="01 · Foundations"
      title="Brand Foundation"
      lede="The operating system for Astro's digital growth engine — connecting Sales, Media, Influence, Content, and Studio into one system of record."
    >
      <div className="writeup">
        <p>
          <b>Collabrium</b> — Astro Digital Growth [OS]. From <i>Collab</i>oration + Equi<i>librium</i>. It&apos;s the
          shared home for Astro&apos;s digital teams: where six functions (Content, Product, Marketing, Sales, Commercial,
          Editorial) stop working around each other and start working together, without losing what makes each one good
          at its job. Unlike siloed tools bolted on team by team, Collabrium starts from the infrastructure up.
        </p>
        <blockquote>
          &ldquo;Collabrium is where Astro&apos;s Sales, Media, Influence, Content, and Studio teams stop working in parallel
          and start working together — so no rep, no editor, no strategist is ever the last to know. Built from the ground
          up to bring people together, not just tools.&rdquo;
          <cite>— Positioning statement</cite>
        </blockquote>
        <p>
          The name isn&apos;t decorative — it states the argument. <b>Collaboration</b> is one shared system: Content,
          Product, Marketing, Sales, Commercial, and Editorial working as one, not six. <b>Equilibrium</b> is balance
          restored across execution, measurement, and allocation — not just speed for its own sake.
        </p>
      </div>

      <GroupLabel level={level}>Tone &amp; personality</GroupLabel>
      <p className="docs-p">Warm, collaborative, quietly confident.</p>
      <table className="spec">
        <thead>
          <tr>
            <th>Trait</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          {tone.map(t => (
            <tr key={t.name}>
              <td>
                <span className="tonepill">{t.name}</span>
              </td>
              <td>{t.says[0].toUpperCase() + t.says.slice(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GroupLabel level={level}>Voice &amp; copywriting</GroupLabel>
      <div className="writeup">
        <p>
          Write like you&apos;re talking to a teammate, not briefing a system. Favour warm, human verbs (
          <i>see, share, meet in the middle</i>) over mechanical ones (<i>sync, deploy, restore</i>). Keep it short and
          plain — confidence doesn&apos;t need extra words.
        </p>
      </div>

      <GroupLabel level={level}>Content rules</GroupLabel>
      <table className="spec">
        <thead>
          <tr>
            <th>Rule</th>
            <th>How</th>
          </tr>
        </thead>
        <tbody>
          {contentRules.map(r => (
            <tr key={r.rule}>
              <td>
                <b>{r.rule}</b>
              </td>
              <td>{r.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

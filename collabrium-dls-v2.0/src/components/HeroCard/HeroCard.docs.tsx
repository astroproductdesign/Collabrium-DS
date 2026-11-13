// Documentation for Hero Card, rendered by the docs site (playground).
// Keep it consistent with HeroCard.usage.md. Not part of the package build.
import { useState } from 'react';
import { CommandBrief, HeroCard } from './HeroCard';
import { InfoBanner } from '../InfoBanner';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Hero Card';

export const group = 'Cards';

export const description =
  'A promotional or insight tile (an announcement, a risk callout, an AI-generated insight) in four states: Default, Risk, AI (Dark) and Selected, with the Command brief as Selected\'s pop-up form.';

export const usage = `import { HeroCard } from '@collabrium/ui';

export function DigestNews() {
  return (
    <HeroCard
      ribbon="New"
      eyebrow="Just shipped"
      heading="Automated weekly digests"
      body="A quiet summary of what moved, who touched it, and what's next — every Monday."
      media="placeholder"
      recommendation="Turned on by default for new workspaces."
      cta={{ label: 'Learn more', onClick: openDigests }}
    />
  );
}`;

const noop = () => {};

const digest = {
  eyebrow: 'Just shipped',
  heading: 'Automated weekly digests',
  body: 'A quiet summary of what moved, who touched it, and what’s next — every Monday.',
  media: 'placeholder' as const,
  recommendation: 'Turned on by default for new workspaces.',
  cta: { label: 'Learn more', onClick: noop },
};

const forecast = {
  eyebrow: 'AI insight',
  heading: 'Demand forecast updated',
  body: 'Model re-ran overnight against the last 90 days of order volume. Confidence is high enough to act on this week without waiting for the next scheduled run.',
  media: 'placeholder' as const,
  source: 'Source: Order management system · Updated 2 hours ago',
  cta: { label: 'View full report', onClick: noop },
};

const banner = (
  <InfoBanner tone="ai" actions={[{ label: 'Turn on auto-apply', onClick: noop }]}>
    Confidence is high enough to auto-apply this forecast — turn on for future updates?
  </InfoBanner>
);

function OpensBrief() {
  const [open, setOpen] = useState(false);
  return (
    <div className="docs-board">
      <HeroCard
        variant="ai"
        eyebrow="AI insight"
        heading="Demand forecast updated"
        body="Confidence is high enough to act on this week."
        recommendation="Open for the full brief."
        cta={{ label: 'View brief', onClick: () => setOpen(true) }}
        onOpen={() => setOpen(true)}
      />
      <CommandBrief open={open} onClose={() => setOpen(false)} {...forecast} banner={banner} />
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-board">
    <HeroCard ribbon="New" eyebrow="Just shipped" heading="Automated weekly digests" body="Every Monday." cta={{ label: 'Learn more', onClick: noop }} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Hero Card',
    element: '<div>.cui-hero-card[data-variant]',
    description: 'The base Card recipe (Neutral-1, 1px Neutral-3, radius-lg, shadow-1, 16px padding, 8px gap), with overflow hidden so a ribbon clips to a triangle.',
    children: [
      { name: 'Ribbon', element: '.cui-hero-card__ribbon', description: 'Optional, Default and Risk: an 80px corner box with a 45deg Fire-orange strip, caption bold uppercase.' },
      { name: 'Eyebrow', element: '.cui-hero-card__eyebrow', description: 'h2-sized, Neutral-5, sentence case (Amber on AI). On Selected: caption bold, uppercase, tracked.' },
      { name: 'Heading', element: '<h3>.cui-hero-card__heading', description: 'h4, Neutral-9, clamped to two lines; 60px clear of a ribbon.' },
      { name: 'Body', element: '<p>.cui-hero-card__body', description: 'body2, Neutral-5.' },
      { name: 'Banner', element: 'InfoBanner tone="ai"', description: 'Selected only: an AI Recommendation.' },
      { name: 'Media', element: '.cui-hero-card__media', description: 'radius-md, 120px minimum (160px on Selected). The placeholder: Neutral-2, a dashed Neutral-3 border, an image glyph and caption.' },
      { name: 'Recommendation / Source', element: '<p>', description: 'A caption next-step line (Default, Risk, AI), or a footnote source line (Selected).' },
      { name: 'CTA', element: 'Button + trailing arrow', description: 'Ghost on Default and Risk, Secondary on AI, Primary on Selected.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default, with a ribbon',
    description: 'An announcement. The ribbon is always Fire orange; the heading keeps 60px clear of it and never runs past two lines.',
    render: () => (
      <div className="docs-board">
        <HeroCard ribbon="New" {...digest} />
        <HeroCard {...digest} ribbon={undefined} heading="A heading long enough to need its second line and then some more" />
      </div>
    ),
    code: `<HeroCard
  ribbon="New"
  eyebrow="Just shipped"
  heading="Automated weekly digests"
  body="A quiet summary of what moved, who touched it, and what's next — every Monday."
  media="placeholder"
  recommendation="Turned on by default for new workspaces."
  cta={{ label: 'Learn more', onClick: openDigests }}
/>`,
  },
  {
    id: 'risk',
    title: 'Risk',
    description: 'A warning without a full alert: Fire\'s 8% tint and an orange border; everything else as Default.',
    render: () => (
      <div className="docs-board">
        <HeroCard
          variant="risk"
          ribbon="Risk"
          eyebrow="Heads up"
          heading="Three renewals lapse this week"
          body="RM 184,000.00 of annual value is up for renewal with no owner assigned."
          recommendation="Assign an owner to each before Friday."
          cta={{ label: 'Review renewals', onClick: noop }}
        />
      </div>
    ),
    code: `<HeroCard variant="risk" ribbon="Risk" eyebrow="Heads up" heading="Three renewals lapse this week" body="…" recommendation="…" cta={{ label: 'Review renewals', onClick: openRenewals }} />`,
  },
  {
    id: 'ai',
    title: 'AI (Dark), opening the Command brief',
    description: 'The dark surface for an AI-generated insight. Move the pointer over it: it tilts toward you and the CTA\'s arrow nudges. With `onOpen`, the heading is a button over the whole card, so the brief opens from a click or the keyboard.',
    render: () => <OpensBrief />,
    code: `const [open, setOpen] = useState(false);

<HeroCard variant="ai" eyebrow="AI insight" heading="Demand forecast updated" body="…"
  cta={{ label: 'View brief', onClick: () => setOpen(true) }} onOpen={() => setOpen(true)} />
<CommandBrief open={open} onClose={() => setOpen(false)} eyebrow="AI insight" heading="Demand forecast updated"
  body="…" banner={<InfoBanner tone="ai" actions={[…]}>…</InfoBanner>} media="placeholder" source="…" cta={…} />`,
  },
  {
    id: 'selected',
    title: 'Selected, in the page',
    description: 'The bigger detail form in normal flow, up to 560px: the small uppercase eyebrow, an AI Recommendation banner, a taller media area, the source and a Primary CTA.',
    render: () => <HeroCard variant="selected" {...forecast} banner={banner} />,
    code: `<HeroCard variant="selected" eyebrow="AI insight" heading="Demand forecast updated" body="…"
  banner={<InfoBanner tone="ai" actions={[{ label: 'Turn on auto-apply', onClick: autoApply }]}>…</InfoBanner>}
  media="placeholder" source="Source: Order management system · Updated 2 hours ago"
  cta={{ label: 'View full report', onClick: openReport }} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'default' | 'risk' | 'ai' | 'selected'", default: "'default'", description: 'The state.' },
  { name: 'eyebrow / heading / body', options: 'string', default: '—', required: true, description: 'The text. The heading clamps to two lines.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The heading\'s level; the look is always h4.' },
  { name: 'media', options: "ReactNode | 'placeholder'", default: '—', description: 'Your media, or the dashed placeholder.' },
  { name: 'recommendation', options: 'string', default: '—', description: 'Default, Risk, AI: a short next-step line.' },
  { name: 'banner / source', options: 'ReactNode / string', default: '—', description: 'Selected: an AI Recommendation InfoBanner, and the source line.' },
  { name: 'cta', options: '{ label: string; onClick: () => void }', default: '—', description: 'The call to action, with a trailing arrow; its style follows the variant.' },
  { name: 'ribbon', options: 'string', default: '—', description: 'Default and Risk: a corner ribbon ("New").' },
  { name: 'onOpen', options: '() => void', default: '—', description: 'Makes the heading a button over the card that opens the detail.' },
  { name: 'CommandBrief open / onClose', options: 'boolean / () => void', default: '—', required: true, description: 'The Selected content as a dialog; closes on the close button, a scrim click or Escape.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for a promotion or insight, not as a generic content card.',
    'Keep the ribbon Fire orange, whatever the department.',
    'Use the AI (Dark) state only for AI-generated insights.',
    'Open the Command brief from the card\'s `onOpen` so the keyboard can reach it.',
  ],
  dont: [
    'Don\'t give the AI card a Ghost or Primary CTA: Secondary is the deliberate choice.',
    'Don\'t put a ribbon on AI or Selected.',
    'Don\'t use the h2 eyebrow on Selected: it keeps the small uppercase label.',
    'Don\'t invent new dark-surface colours from the AI card\'s one-off values.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the card\'s heading button (with `onOpen`), then its CTA.' },
    { keys: 'Enter / Space', action: 'Opens the Command brief from the heading, or runs the CTA.' },
    { keys: 'Escape', action: 'Closes the Command brief; focus returns to what opened it.' },
    { keys: 'Tab (in the brief)', action: 'Stays inside the brief while it is open.' },
  ],
  notes: [
    'The heading is a real heading; with `onOpen` it holds a real button stretched over the card, so the card is no longer a click-only `<div>` (the DS\'s known gap).',
    'The ribbon is decorative (`aria-hidden`): say anything it means in the eyebrow or heading too.',
    'The Command brief is a `role="dialog"` with `aria-modal`, named by its heading. Opening it moves focus to that heading; closing returns focus.',
    'In forced colours every card keeps a CanvasText edge, and the ribbon keeps its colours.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'AI card hover', motion: 'Tilts up to 4deg toward the pointer and scales to 1.05, with shadow-2; the CTA arrow nudges 4px. Settles back slower on leave.', token: 'in --duration-fast · --ease-standard; out --duration-base · --ease-settle' },
  { interaction: 'Command brief open', motion: 'The scrim fades in; the panel swings up from 8deg and 24px below into place.', token: 'scrim --duration-fast; panel --duration-base · --ease-standard' },
  { interaction: 'Command brief close', motion: 'The panel collapses first, then the scrim fades.', token: '--duration-fast, then a --duration-fast delay' },
  { interaction: 'Reduced motion', motion: 'No tilt, nudge or swing: the brief fades in place. Shadows and the scrim still change.', token: '—' },
];

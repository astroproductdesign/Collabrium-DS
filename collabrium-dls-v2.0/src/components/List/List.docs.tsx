// Documentation for List, rendered by the docs site (playground).
// Keep it consistent with List.usage.md. Not part of the package build.
import {
  Bell,
  Briefcase,
  Clock,
  Coins,
  EnvelopeSimple,
  FileText,
  Folder,
  Presentation,
  Robot,
  DotsThree,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { List, ListEmpty, ListError, ListFooter, ListItem, ListItemSkeleton, ListSection } from './List';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Lists';

export const description =
  'A vertical run of same-shaped rows: one List item with three slots (Leading, Content, Trailing). Navigation rows, stat rows and activity logs are presets of the one row, and a Section header groups an Activity Log by day.';

export const usage = `import { Card, List, ListItem } from '@collabrium/ui';
import { Briefcase } from '@phosphor-icons/react';

export function PodPulse() {
  return (
    <Card padding="list">
      <h4 id="pod-pulse">Pod pulse</h4>
      <List aria-labelledby="pod-pulse">
        <ListItem
          href="/campaigns?month=current"
          leading={{ type: 'icon', icon: Briefcase }}
          heading="Total campaigns this month"
          caption="vs last month: up 2"
          value="6"
          valueSize="large"
          chevron
        />
      </List>
    </Card>
  );
}`;

/* Previews never navigate away. */
const stay = (e: { preventDefault: () => void }) => e.preventDefault();
const noop = () => {};

const thumb =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f0f0f0'/%3E%3Ccircle cx='38' cy='18' r='6' fill='%23bdbdbd'/%3E%3Cpath d='M0 44 L18 26 L32 40 L40 32 L56 48 V56 H0Z' fill='%23d8d8d8'/%3E%3C/svg%3E";
const logo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='9' fill='%23bdbdbd'/%3E%3C/svg%3E";

/* A list in a card runs edge to edge: Card's list padding (8px top and bottom, no sides). */
const InCard = ({ children }: { children: ReactNode }) => <Card padding="list">{children}</Card>;

export const thumbnail = () => (
  <InCard>
    <List aria-label="Pod pulse">
      <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Campaigns" value="6" />
      <ListItem leading={{ type: 'icon', icon: Coins }} heading="Revenue" value="RM 1.2M" />
    </List>
  </InCard>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'List',
    element: 'ul.cui-list (role="list")',
    description: 'A flex column, no padding, named by its visible heading (`aria-labelledby`) or `aria-label`. A 1px Neutral-3 divider between rows, inset 16px.',
    children: [
      {
        name: 'Row',
        element: '<a> | <button> | <label> | <div>.cui-list-item',
        description: 'One per `<li>`, filling it. 12px / 16px padding, 12px between slots, at least 48px tall. The element follows what the row does.',
        children: [
          { name: 'Leading', element: 'span.cui-list-item__lead', when: 'leading', description: 'Icon chip, avatar, thumbnail or logo at S 24 / M 32 / L 48, corners 6 / 8 / 12 (avatars round). aria-hidden.' },
          {
            name: 'Content',
            element: 'span.cui-list-item__content',
            description: 'Fills the width and shrinks first; lines 2px apart.',
            children: [
              { name: 'Heading', element: 'span.cui-list-item__heading', description: 'body2 size, 600, Neutral-9. Rich: 400 with bold names. One line, or two.' },
              { name: 'Description', element: 'span.cui-list-item__desc', when: 'description', description: 'body2, 400, Neutral-5. One line, or two.' },
              { name: 'Caption', element: 'span.cui-list-item__caption', when: 'caption', description: 'caption, Neutral-5, always one line; an optional 14px icon or 6px status dot first.' },
            ],
          },
          { name: 'Trailing', element: 'span.cui-list-item__trailing', when: 'value, badge, control, action or chevron', description: 'Never shrinks (capped at half the row), 16px padding each side, 8px between parts, always centred.' },
        ],
      },
    ],
  },
  { name: 'Section header', element: 'h3.cui-list-subheader', when: 'ListSection', description: 'caption, 600, Neutral-5; 8px / 16px / 4px padding. A real heading that names the list after it.' },
];

export const examples: DocsExample[] = [
  {
    id: 'leading',
    title: 'Leading types and sizes',
    description: 'An icon chip (drawn Fill), an avatar, a thumbnail or a logo. The size is set once per list: S 24, M 32 (default), L 48. In a card, the examples here sit in `<Card padding="list">`, so rows run edge to edge.',
    render: () => (
      <div className="docs-list-grid">
        <InCard>
          <List aria-label="Leading types">
            <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Icon" />
            <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading="Avatar" />
            <ListItem leading={{ type: 'thumbnail', src: thumb }} heading="Thumbnail" />
            <ListItem leading={{ type: 'logo', src: logo }} heading="Logo" />
            <ListItem leading={{ type: 'logo', initials: 'MI' }} heading="Logo · initials" />
            <ListItem heading="None" />
          </List>
        </InCard>
        <InCard>
          <List aria-label="Small leading" leadingSize="s">
            <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Icon · S 24" />
            <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading="Avatar · S 24" />
          </List>
          <List aria-label="Large leading" leadingSize="l">
            <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Icon · L 48" />
            <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading="Avatar · L 48" />
          </List>
        </InCard>
      </div>
    ),
    code: `<List aria-label="Leading types">
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Icon" />
  <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading="Avatar" />
  <ListItem leading={{ type: 'thumbnail', src: thumb }} heading="Thumbnail" />
  <ListItem leading={{ type: 'logo', src: logo }} heading="Logo" />
  <ListItem leading={{ type: 'logo', initials: 'MI' }} heading="Logo · initials" />
  <ListItem heading="None" />
</List>

<List aria-label="Small leading" leadingSize="s">…</List>
<List aria-label="Large leading" leadingSize="l">…</List>`,
  },
  {
    id: 'content',
    title: 'Content lines',
    description: 'A heading, an optional description and an optional caption. Every line truncates with "…"; two-line headings and descriptions clamp. With two or more lines, the leading top-aligns with the heading.',
    render: () => (
      <InCard>
        <List aria-label="Content lines">
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading only" />
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + description" description="3 packages · RM 420k proposed" />
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + caption" caption="Updated 2h ago" />
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + description + caption" description="3 packages · RM 420k proposed" caption="Nicky · Updated 2h ago" />
          <ListItem
            leading={{ type: 'icon', icon: Briefcase }}
            heading="Two-line description"
            description="The MILO Raya package moved two placements to Astro Ria and is waiting on a new quote from finance before it goes out"
            descriptionLines={2}
          />
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Caption with icon" caption="12 Oct, 3:40pm" captionIcon={Clock} />
          <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Caption with status dot" caption="Waiting on legal" captionStatus="warning" />
          <ListItem
            leading={{ type: 'avatar', initials: 'AS' }}
            heading={<><b>Aisyah</b> uploaded 3 files to <b>Raya Campaign</b> and asked <b>Nicky</b> to check the rate card</>}
            headingRich
            headingLines={2}
            caption="2h ago"
          />
        </List>
      </InCard>
    ),
    code: `<List aria-label="Content lines">
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading only" />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + description" description="3 packages · RM 420k proposed" />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + caption" caption="Updated 2h ago" />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Heading + description + caption" description="3 packages · RM 420k proposed" caption="Nicky · Updated 2h ago" />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Two-line description" description="The MILO Raya package moved two placements…" descriptionLines={2} />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Caption with icon" caption="12 Oct, 3:40pm" captionIcon={Clock} />
  <ListItem leading={{ type: 'icon', icon: Briefcase }} heading="Caption with status dot" caption="Waiting on legal" captionStatus="warning" />
  <ListItem
    leading={{ type: 'avatar', initials: 'AS' }}
    heading={<><b>Aisyah</b> uploaded 3 files to <b>Raya Campaign</b> and asked <b>Nicky</b> to check the rate card</>}
    headingRich
    headingLines={2}
    caption="2h ago"
  />
</List>`,
  },
  {
    id: 'trailing',
    title: 'Trailing types and allowed combos',
    description: 'A value, a badge, a control (the whole row toggles), a button on a static row, or a chevron on a row that opens a page. Value + chevron and badge + chevron are the only combos.',
    render: () => (
      <InCard>
        <List aria-label="Trailing types">
          <ListItem leading={{ type: 'icon', icon: Folder }} heading="None" />
          <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Folder }} heading="Chevron · opens a page" chevron />
          <ListItem leading={{ type: 'icon', icon: Folder }} heading="Value · heading style" value="12" />
          <ListItem leading={{ type: 'icon', icon: Coins }} heading="Value · large" value="RM 1.2M" valueSize="large" />
          <ListItem leading={{ type: 'icon', icon: Folder }} heading="Badge · status" badge={<Badge variant="success">Approved</Badge>} />
          <ListItem leading={{ type: 'icon', icon: EnvelopeSimple }} heading="Control · checkbox" description="Include in the weekly digest" control={{ type: 'checkbox', defaultChecked: true }} />
          <ListItem leading={{ type: 'icon', icon: Bell }} heading="Control · switch" description="Tell me when a brief lands" control={{ type: 'switch' }} />
          <ListItem
            leading={{ type: 'avatar', initials: 'HR' }}
            heading="Control · button"
            description="Hafiz Rahman isn't in the pod yet"
            action={<Button variant="secondary" size="sm" onClick={noop}>Invite</Button>}
          />
          <ListItem
            leading={{ type: 'icon', icon: Folder }}
            heading="Control · more menu"
            action={<Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More actions for Control · more menu" onClick={noop} />}
          />
          <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Briefcase }} heading="Combo · value + chevron" value="6" valueSize="large" chevron />
          <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Presentation }} heading="Combo · badge + chevron" badge={<Badge variant="warning">Out of date</Badge>} chevron />
        </List>
      </InCard>
    ),
    code: `<List aria-label="Trailing types">
  <ListItem leading={{ type: 'icon', icon: Folder }} heading="None" />
  <ListItem href="/folders/1" leading={{ type: 'icon', icon: Folder }} heading="Chevron · opens a page" chevron />
  <ListItem leading={{ type: 'icon', icon: Folder }} heading="Value · heading style" value="12" />
  <ListItem leading={{ type: 'icon', icon: Coins }} heading="Value · large" value="RM 1.2M" valueSize="large" />
  <ListItem leading={{ type: 'icon', icon: Folder }} heading="Badge · status" badge={<Badge variant="success">Approved</Badge>} />
  <ListItem leading={{ type: 'icon', icon: EnvelopeSimple }} heading="Control · checkbox" description="Include in the weekly digest" control={{ type: 'checkbox', defaultChecked: true }} />
  <ListItem leading={{ type: 'icon', icon: Bell }} heading="Control · switch" description="Tell me when a brief lands" control={{ type: 'switch' }} />
  <ListItem
    leading={{ type: 'avatar', initials: 'HR' }}
    heading="Control · button"
    description="Hafiz Rahman isn't in the pod yet"
    action={<Button variant="secondary" size="sm" onClick={invite}>Invite</Button>}
  />
  <ListItem
    leading={{ type: 'icon', icon: Folder }}
    heading="Control · more menu"
    action={<Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More actions for Control · more menu" onClick={openMenu} />}
  />
  <ListItem href="/campaigns" leading={{ type: 'icon', icon: Briefcase }} heading="Combo · value + chevron" value="6" valueSize="large" chevron />
  <ListItem href="/decks" leading={{ type: 'icon', icon: Presentation }} heading="Combo · badge + chevron" badge={<Badge variant="warning">Out of date</Badge>} chevron />
</List>`,
  },
  {
    id: 'presets',
    title: 'Presets: navigation and stat',
    description: 'Navigation: a thumbnail or logo, heading + description, a chevron to the detail page. Stat: an icon, a heading, a caption and a large value; a link with the chevron when it opens a filtered view.',
    render: () => (
      <div className="docs-list-grid">
        <InCard>
          <List aria-label="Packages">
            <ListItem href="#" onClick={stay} leading={{ type: 'thumbnail', src: thumb }} heading="MILO Raya 2026" description="3 packages · RM 420k proposed" chevron />
            <ListItem href="#" onClick={stay} leading={{ type: 'logo', initials: '100' }} heading="100Plus" caption="Researched 3 days ago" chevron />
          </List>
        </InCard>
        <InCard>
          <List aria-label="Pod pulse">
            <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Briefcase }} heading="Total campaigns this month" caption="vs last month: up 2" value="6" valueSize="large" chevron />
            <ListItem leading={{ type: 'icon', icon: Coins }} heading="Revenue booked" caption="Target RM 1.5M" value="RM 1.2M" valueSize="large" />
          </List>
        </InCard>
      </div>
    ),
    code: `<List aria-label="Packages">
  <ListItem href="/packages/milo" leading={{ type: 'thumbnail', src: miloImage }} heading="MILO Raya 2026" description="3 packages · RM 420k proposed" chevron />
  <ListItem href="/brands/100plus" leading={{ type: 'logo', initials: '100' }} heading="100Plus" caption="Researched 3 days ago" chevron />
</List>

<List aria-label="Pod pulse">
  <ListItem href="/campaigns?month=current" leading={{ type: 'icon', icon: Briefcase }} heading="Total campaigns this month" caption="vs last month: up 2" value="6" valueSize="large" chevron />
  <ListItem leading={{ type: 'icon', icon: Coins }} heading="Revenue booked" caption="Target RM 1.5M" value="RM 1.2M" valueSize="large" />
</List>`,
  },
  {
    id: 'activity',
    title: 'Activity Log, by day, with the timeline',
    description: 'An avatar when a person did it, an icon when the system did. A two-line rich heading, the timestamp in the caption. Each day is a ListSection: a real heading that names its list. The timeline turns the dividers off.',
    render: () => (
      <InCard>
        <ListSection title="Today" headingLevel={4}>
          <List timeline>
            <ListItem leading={{ type: 'avatar', initials: 'AS' }} heading={<><b>Aisyah</b> uploaded 3 files to <b>Raya Campaign</b></>} headingRich headingLines={2} description="brief-v3.pdf, rate-card.xlsx, moodboard.png" caption="2h ago" />
            <ListItem leading={{ type: 'icon', icon: Robot }} heading={<><b>Collab AI</b> drafted the <b>MILO</b> proposal deck</>} headingRich headingLines={2} caption="4h ago" badge={<Badge variant="success">Approved</Badge>} />
            <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading={<><b>Nicky</b> changed the budget on <b>Raya Campaign</b></>} headingRich headingLines={2} description="RM 380,000 → RM 420,000" caption="5h ago" />
          </List>
        </ListSection>
        <ListSection title="Yesterday" headingLevel={4}>
          <List timeline>
            <ListItem leading={{ type: 'icon', icon: FileText }} heading={<><b>Import</b> added 12 placements to <b>Q4 plan</b></>} headingRich headingLines={2} caption="12 Oct, 3:40pm" />
          </List>
        </ListSection>
        <ListFooter>
          <Button variant="ghost" size="sm" trailingArrow="right" onClick={noop}>View all activity</Button>
        </ListFooter>
      </InCard>
    ),
    code: `<ListSection title="Today" headingLevel={4}>
  <List timeline>
    <ListItem leading={{ type: 'avatar', initials: 'AS' }} heading={<><b>Aisyah</b> uploaded 3 files to <b>Raya Campaign</b></>} headingRich headingLines={2} description="brief-v3.pdf, rate-card.xlsx, moodboard.png" caption="2h ago" />
    <ListItem leading={{ type: 'icon', icon: Robot }} heading={<><b>Collab AI</b> drafted the <b>MILO</b> proposal deck</>} headingRich headingLines={2} caption="4h ago" badge={<Badge variant="success">Approved</Badge>} />
    <ListItem leading={{ type: 'avatar', initials: 'NK' }} heading={<><b>Nicky</b> changed the budget on <b>Raya Campaign</b></>} headingRich headingLines={2} description="RM 380,000 → RM 420,000" caption="5h ago" />
  </List>
</ListSection>
<ListSection title="Yesterday" headingLevel={4}>
  <List timeline>
    <ListItem leading={{ type: 'icon', icon: FileText }} heading={<><b>Import</b> added 12 placements to <b>Q4 plan</b></>} headingRich headingLines={2} caption="12 Oct, 3:40pm" />
  </List>
</ListSection>
<ListFooter>
  <Button variant="ghost" size="sm" trailingArrow="right" onClick={showAll}>View all activity</Button>
</ListFooter>`,
  },
  {
    id: 'states',
    title: 'Selected, disabled and loading',
    description: 'Selected (`current`) is only the open item in a list/detail layout. Only button rows and control rows can be disabled, never links. A loading list is `busy`, with skeleton rows.',
    render: () => (
      <div className="docs-list-grid">
        <InCard>
          <List aria-label="Campaigns">
            <ListItem onClick={noop} leading={{ type: 'icon', icon: Briefcase }} heading="MILO Raya 2026" caption="Open" current />
            <ListItem onClick={noop} leading={{ type: 'icon', icon: Briefcase }} heading="100Plus Hari Raya" caption="Draft" />
            <ListItem onClick={noop} leading={{ type: 'icon', icon: Briefcase }} heading="Archived campaign" caption="Archived" disabled />
            <ListItem leading={{ type: 'icon', icon: Bell }} heading="Brief alerts" description="Your admin has turned these off" control={{ type: 'switch', defaultChecked: true, disabled: true }} />
          </List>
        </InCard>
        <InCard>
          <List aria-label="Activity" busy busyLabel="Loading activity">
            <ListItemSkeleton leading="round" />
            <ListItemSkeleton />
            <ListItemSkeleton value />
          </List>
        </InCard>
      </div>
    ),
    code: `<List aria-label="Campaigns">
  <ListItem onClick={open} leading={{ type: 'icon', icon: Briefcase }} heading="MILO Raya 2026" caption="Open" current />
  <ListItem onClick={open} leading={{ type: 'icon', icon: Briefcase }} heading="100Plus Hari Raya" caption="Draft" />
  <ListItem onClick={open} leading={{ type: 'icon', icon: Briefcase }} heading="Archived campaign" caption="Archived" disabled />
  <ListItem leading={{ type: 'icon', icon: Bell }} heading="Brief alerts" description="Your admin has turned these off" control={{ type: 'switch', defaultChecked: true, disabled: true }} />
</List>

<List aria-label="Activity" busy busyLabel="Loading activity">
  <ListItemSkeleton leading="round" />
  <ListItemSkeleton />
  <ListItemSkeleton value />
</List>`,
  },
  {
    id: 'empty-error',
    title: 'Empty and error',
    description: 'Swapped in for the list by the host, in place. The error uses a Red icon, never red text. Focus stays where it was.',
    render: () => (
      <div className="docs-list-grid">
        <InCard>
          <ListEmpty title="No activity yet" hint="When someone in the pod moves a campaign, it shows up here." />
        </InCard>
        <InCard>
          <ListError title="Couldn't load activity" hint="Check your connection and try again." onRetry={noop} />
        </InCard>
      </div>
    ),
    code: `<ListEmpty title="No activity yet" hint="When someone in the pod moves a campaign, it shows up here." />

<ListError title="Couldn't load activity" hint="Check your connection and try again." onRetry={reload} />`,
  },
  {
    id: 'bleed',
    title: 'On the page',
    description: 'Outside a card, `bleed` pulls the list out 16px so row content lines up with the page text above it, and rounds the row fills.',
    render: () => (
      <div>
        <h4 id="docs-list-recent" className="docs-p">Recent</h4>
        <List aria-labelledby="docs-list-recent" bleed>
          <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Folder }} heading="Q4 media plan" caption="Edited 1h ago" chevron />
          <ListItem href="#" onClick={stay} leading={{ type: 'icon', icon: Folder }} heading="Raya rate card" caption="Edited yesterday" chevron />
        </List>
      </div>
    ),
    code: `<h4 id="recent">Recent</h4>
<List aria-labelledby="recent" bleed>
  <ListItem href="/files/q4" leading={{ type: 'icon', icon: Folder }} heading="Q4 media plan" caption="Edited 1h ago" chevron />
  <ListItem href="/files/raya" leading={{ type: 'icon', icon: Folder }} heading="Raya rate card" caption="Edited yesterday" chevron />
</List>`,
  },
];

export const props: DocsProp[] = [
  { name: 'List · aria-labelledby / aria-label', options: 'string', default: '—', description: 'Name the list by its visible heading; `aria-label` only when there is none. Inside a ListSection it is named for you.' },
  { name: 'List · leadingSize', options: "'s' | 'm' | 'l'", default: "'m'", description: 'Leading size for every row: 24, 32 or 48. One size per list.' },
  { name: 'List · dividers', options: 'boolean', default: 'true', description: 'The 1px divider between rows.' },
  { name: 'List · timeline', options: 'boolean', default: 'false', description: 'Activity Log: a line through the leading elements. Turns the dividers off.' },
  { name: 'List · bleed', options: 'boolean', default: 'false', description: 'On the page, not in a card: lines row content up with the page text and rounds row fills.' },
  { name: 'List · busy / busyLabel', options: 'boolean / string', default: "false / 'Loading…'", description: 'Loading: `aria-busy` and one hidden line of text. Fill it with ListItemSkeleton rows.' },
  { name: 'ListItem · heading', options: 'ReactNode', default: '—', required: true, description: 'The main label.' },
  { name: 'ListItem · headingRich / headingLines', options: 'boolean / 1 | 2', default: 'false / 1', description: 'A sentence heading with bold names (`<b>`), and how many lines it may take.' },
  { name: 'ListItem · description / descriptionLines', options: 'ReactNode / 1 | 2', default: '— / 1', description: 'Supporting detail, Neutral-5.' },
  { name: 'ListItem · caption / captionIcon / captionStatus', options: "ReactNode / Icon / 'neutral' | 'success' | 'warning' | 'error' | 'info'", default: '—', description: 'Meta on one line (timestamps live here), with an optional icon or status dot first.' },
  { name: 'ListItem · leading', options: "{ type: 'icon', icon } | { type: 'avatar', initials, src? } | { type: 'thumbnail', src } | { type: 'logo', initials?, src? }", default: '—', description: 'The leading element; decorative.' },
  { name: 'ListItem · value / valueSize', options: "string / 'default' | 'large'", default: "— / 'default'", description: 'A number or status on the right; `large` for the Stat preset. Read right after the heading.' },
  { name: 'ListItem · badge', options: 'ReactElement (Badge)', default: '—', description: 'A status pill on the right.' },
  { name: 'ListItem · href / chevron', options: 'string / boolean', default: '—', description: 'A link row that opens a page; only a link row can show the chevron.' },
  { name: 'ListItem · onClick / disabled', options: 'function / boolean', default: '—', description: 'A button row that acts in place; it can be disabled.' },
  { name: 'ListItem · control', options: "{ type: 'checkbox' | 'switch', checked?, defaultChecked?, onCheckedChange?, disabled?, name?, value? }", default: '—', description: 'A control row: the whole row toggles it.' },
  { name: 'ListItem · action', options: 'ReactElement (Button)', default: '—', description: 'A Secondary sm button, or a Ghost sm icon-only "more", on a static row.' },
  { name: 'ListItem · current', options: "boolean | 'page' | 'step' | 'location'", default: '—', description: 'The open item in a list/detail layout only.' },
  { name: 'ListItemSkeleton · leading / value', options: "'square' | 'round' | 'none' / boolean", default: "'square' / false", description: 'A loading row the height of a heading + caption row.' },
  { name: 'ListSection · title / headingLevel', options: 'ReactNode / 2–6', default: '— / 3', description: 'A day\'s Section header and its list.' },
  { name: 'ListSection · uppercase / sticky / surface / bleed', options: "boolean / boolean / 'default' | 'canvas' / boolean", default: "false / false / 'default' / false", description: 'Eyebrow casing, sticking to the top of its scroller (on Neutral-1 or Canvas warm), and lining up on the page.' },
  { name: 'ListEmpty / ListError / ListFooter', options: '—', default: '—', description: 'Activity Log states: empty, error with Retry, and a footer for "Load more" or "View all".' },
];

export const rules: DocsRules = {
  do: [
    'Pick the row by what it does: `href` opens a page, `onClick` acts in place, `control` toggles, none is static.',
    'Keep timestamps in the caption; names and items in the heading; numbers in the value; status pills in a badge.',
    'Name every list by its visible heading.',
    'Group an Activity Log by day with ListSection.',
  ],
  dont: [
    'Don\'t put a chevron on a button, static or Activity Log row.',
    'Don\'t put a timestamp in trailing, or add an unread dot.',
    'Don\'t use `current` for a toggle.',
    'Don\'t use a one-row list where a Stat card belongs, or a list for options in a popover (Dropdown) or for columns (Table).',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to each link, button and control row; static rows are skipped.' },
    { keys: 'Enter', action: 'Opens a link row; presses a button row.' },
    { keys: 'Space', action: 'Presses a button row; toggles a control row.' },
  ],
  notes: [
    'A `role="list"`, named by its visible heading (`aria-labelledby`), or `aria-label` when there is none.',
    'A row is one target: one link, button or label, with nothing interactive inside it.',
    'The row\'s name is its content: the heading, then the value, description and caption, each after a hidden comma. The visible value is hidden from screen readers, so it is read once, right after the heading.',
    'Leading elements and the chevron are hidden from screen readers; a badge is read as text.',
    'The focus ring is inset, so a card never clips it, and hover never covers it. Focus is never moved.',
    'A loading list is `aria-busy` with one hidden line; skeleton rows are hidden. No live regions.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, pressed', motion: 'The Neutral-2 fill (Neutral-3 when pressed) comes in; the dividers on both sides fade.', token: '--duration-fast (pressed --duration-instant) · --ease-standard' },
  { interaction: 'Hover or focus a link row', motion: 'The chevron moves 4px right.', token: '--duration-base · --ease-standard' },
  { interaction: 'Loading', motion: 'The bones shimmer.', token: '--duration-ambient · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'The chevron stays put and the shimmer stops; colour changes stay.', token: '—' },
];

// Documentation for Profile card, rendered by the docs site (playground).
// Keep it consistent with ProfileCard.usage.md. Not part of the package build.
import { useState } from 'react';
import { ProfileCard, type ProfileMenuAction } from './ProfileCard';
import { CardGrid } from '../Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

// The DLS gallery's three samples (preview.html 2436–2600).
const amirah = {
  name: 'Amirah Yusof',
  age: 20,
  gender: 'Female',
  location: 'Kuala Lumpur',
  personas: ['Beauty'],
  platforms: [
    { platform: 'Instagram', followers: 31000, href: '#' },
    { platform: 'TikTok', followers: 1200000, href: '#' },
    { platform: 'Xiaohongshu', followers: 8000, href: '#' },
  ],
};
const muhammad = {
  name: 'Muhammad Amirul Haqimi bin Abdul Rahman',
  age: 45,
  gender: 'Male',
  location: 'Petaling Jaya, Selangor, Malaysia',
  personas: ['Fashion', 'Beauty', 'Food & Lifestyle', 'Entertainment'],
  platforms: [
    { platform: 'TikTok', followers: 220000, href: '#' },
    { platform: 'Instagram', followers: 720, href: '#', role: 'koc' as const },
  ],
};
const siti = {
  name: 'Siti Khadijah',
  age: 28,
  gender: 'Female',
  location: 'Johor Bahru',
  platforms: [
    { platform: 'Instagram', followers: 1300, href: '#' },
    { platform: 'TikTok', followers: 320, href: '#', role: 'seeder' as const },
  ],
};

function Roster() {
  const [selected, setSelected] = useState<Set<string>>(new Set([muhammad.name]));
  const [last, setLast] = useState<string>('Nothing picked from a menu yet.');
  const set = (name: string, on: boolean) =>
    setSelected(prev => {
      const next = new Set(prev);
      if (on) next.add(name);
      else next.delete(name);
      return next;
    });
  const pick = (name: string) => (action: ProfileMenuAction) => setLast(`${name}: ${action}`);
  return (
    <div className="docs-stack">
      <CardGrid>
        {[amirah, muhammad, siti].map(person => (
          <ProfileCard
            key={person.name}
            {...person}
            href="#"
            selectable
            selected={selected.has(person.name)}
            onSelectedChange={on => set(person.name, on)}
            onMenuAction={pick(person.name)}
          />
        ))}
      </CardGrid>
      <p className="docs-status">
        {selected.size} selected. Menu: {last}
      </p>
    </div>
  );
}

export const title = 'Profile card';

export const group = 'Cards';

export const description =
  'One person across every platform they have connected: a Select checkbox and kebab menu, a centred avatar, name, Meta and Persona lines, and each platform\'s follower count and tier.';

export const usage = `import { CardGrid, ProfileCard } from '@collabrium/ui';

export function Talent() {
  return (
    <CardGrid>
      <ProfileCard
        name="Amirah Yusof"
        age={20}
        gender="Female"
        location="Kuala Lumpur"
        personas={['Beauty']}
        platforms={[
          { platform: 'Instagram', followers: 31000, href: 'https://instagram.com/amirah' },
          { platform: 'TikTok', followers: 1200000, href: 'https://tiktok.com/@amirah' },
        ]}
        href="/talent/amirah"
      />
    </CardGrid>
  );
}`;

export const thumbnail = () => <ProfileCard {...amirah} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Profile card',
    element: '<div>.cui-card[data-card="profile"]',
    description: 'The base Card with no gap of its own; every space inside is set by the part below it. Selected is `data-profile-selected`.',
    children: [
      {
        name: 'Controls row',
        element: '<div>.cui-profile-card__controls',
        description: '24px tall: the Select checkbox on the left, the kebab on the right, both always visible.',
        children: [
          { name: 'Select checkbox', element: '<label>.cui-checkbox', when: 'selectable', description: 'The real Checkbox, named "Select {name}".' },
          { name: 'Kebab', element: 'button.cui-profile-card__more', description: '24×24, a 20px dots-three (Regular). Named "More options for {name}".' },
          { name: 'Menu', element: 'div.cui-profile-card__menu[role="menu"]', when: 'open', description: '160px, opening down from the kebab\'s right edge: View details, Pin to top, Edit, Sync profile, Archive.' },
        ],
      },
      { name: 'Avatar', element: 'div.cui-profile-card__avatar', description: '60px circle with two initials, a photo over them when there is one. aria-hidden.' },
      {
        name: 'Identity',
        element: 'div.cui-profile-card__identity',
        description: 'Centred, 12px under the avatar.',
        children: [
          { name: 'Name', element: '<h3>.cui-card__title', description: 'Drawn as h5, one line with an ellipsis. A link or button with `href` or `onOpen`.' },
          { name: 'Meta line', element: 'p.cui-profile-card__meta', when: 'age, gender or location', description: 'Age · Gender · Location, Neutral-5, one line, 8px under the name.' },
          { name: 'Persona line', element: 'p.cui-profile-card__personas', when: 'personas', description: 'Sorted alphabetically, · separated, one line, 8px under the Meta line.' },
        ],
      },
      {
        name: 'Platform list',
        element: '<ul>.cui-profile-card__platforms',
        when: 'platforms',
        description: '24px under the identity, 16px between rows, sorted by platform name.',
        children: [
          { name: 'Platform', element: 'p.cui-profile-card__platform', description: 'body2, Neutral-5, ends in an ellipsis when it runs out of room.' },
          { name: 'Follower count', element: 'a.cui-profile-card__followers', description: 'caption at 700, tabular figures. The link to the profile; underlines on hover and focus.' },
          { name: 'Tier', element: '<span>.cui-tag', description: 'A Tag: Nano to Mega in the element ramp, KOC and Seeder plain with no dot.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'roster',
    title: 'Selectable roster',
    description: 'Three people in a grid: tick a card to select it, open a kebab for its menu. The cards in the row match the tallest, with their content at the top.',
    render: () => <Roster />,
    code: `<CardGrid>
  {people.map(person => (
    <ProfileCard
      key={person.name}
      {...person}
      href={person.page}
      selectable
      selected={selected.has(person.name)}
      onSelectedChange={on => set(person.name, on)}
      onMenuAction={action => handle(person, action)}
    />
  ))}
</CardGrid>`,
  },
  {
    id: 'informational',
    title: 'Informational',
    description: 'Not selectable: the checkbox goes and the kebab stays. With no `href` or `onOpen` the card doesn\'t raise on hover.',
    render: () => (
      <CardGrid>
        <ProfileCard {...amirah} />
      </CardGrid>
    ),
    code: `<ProfileCard
  name="Amirah Yusof"
  age={20}
  gender="Female"
  location="Kuala Lumpur"
  personas={['Beauty']}
  platforms={[
    { platform: 'Instagram', followers: 31000, href: '…' },
    { platform: 'TikTok', followers: 1200000, href: '…' },
    { platform: 'Xiaohongshu', followers: 8000, href: '…' },
  ]}
/>`,
  },
  {
    id: 'tiers',
    title: 'Every tier',
    description: 'The ranked tiers follow the follower count (Nano, Micro, Mid, Macro, Mega); KOC and Seeder are set with `role` and draw plain, with no dot. Counts are rounded down, so 99,999 reads 99K.',
    render: () => (
      <CardGrid>
        <ProfileCard
          name="Lina Mohd"
          platforms={[
            { platform: 'Facebook', followers: 3200, href: '#' },
            { platform: 'Instagram', followers: 12000, href: '#' },
            { platform: 'Lemon8', followers: 64000, href: '#' },
            { platform: 'Threads', followers: 310000, href: '#' },
            { platform: 'TikTok', followers: 2400000, href: '#' },
            { platform: 'Xiaohongshu', followers: 900, href: '#', role: 'koc' },
            { platform: 'YouTube', followers: 450, href: '#', role: 'seeder' },
          ]}
        />
      </CardGrid>
    ),
    code: `<ProfileCard
  name="Lina Mohd"
  platforms={[
    { platform: 'Facebook', followers: 3200, href: '…' },     // Nano
    { platform: 'Instagram', followers: 12000, href: '…' },   // Micro
    { platform: 'Lemon8', followers: 64000, href: '…' },      // Mid
    { platform: 'Threads', followers: 310000, href: '…' },    // Macro
    { platform: 'TikTok', followers: 2400000, href: '…' },    // Mega
    { platform: 'Xiaohongshu', followers: 900, href: '…', role: 'koc' },
    { platform: 'YouTube', followers: 450, href: '…', role: 'seeder' },
  ]}
/>`,
  },
  {
    id: 'empty-parts',
    title: 'Missing parts',
    description: 'A missing Meta part drops with its separator, no personas removes the line, and no platforms removes the list. A one-word name has one initial.',
    render: () => (
      <CardGrid>
        <ProfileCard name="Zara" gender="Female" location="Penang" />
        <ProfileCard {...siti} />
      </CardGrid>
    ),
    code: `<ProfileCard name="Zara" gender="Female" location="Penang" />
<ProfileCard name="Siti Khadijah" age={28} gender="Female" location="Johor Bahru" platforms={[…]} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'name', options: 'string', default: '—', required: true, description: 'The full name. The avatar\'s initials come from it.' },
  { name: 'photo', options: 'string', default: '—', description: 'A photo URL drawn over the initials.' },
  { name: 'age / gender / location', options: 'number / string / string', default: '—', description: 'The Meta line. A missing part is dropped with its separator.' },
  { name: 'personas', options: 'string[]', default: '[]', description: 'The Persona line, sorted alphabetically. Empty removes the line.' },
  { name: 'platforms', options: "{ platform: string; followers: number; href: string; role?: 'koc' | 'seeder' }[]", default: '[]', description: 'One row each, sorted by platform name. The tier is computed from `followers` unless `role` is set. Empty removes the list.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The name\'s heading level; the look is always h5.' },
  { name: 'href', options: 'string', default: '—', description: 'Makes the name a link stretched over the card.' },
  { name: 'onOpen', options: '() => void', default: '—', description: 'Makes the name a button stretched over the card.' },
  { name: 'selectable', options: 'boolean', default: 'false', description: 'Shows the Select checkbox. The kebab is always there.' },
  { name: 'selected / defaultSelected / onSelectedChange', options: 'boolean / boolean / (selected: boolean) => void', default: '— / false / —', description: 'The selected state, controlled or the card\'s own.' },
  { name: 'onMenuAction', options: "(action: 'view' | 'pin' | 'edit' | 'sync' | 'archive') => void", default: '—', description: 'Called with the action picked from the kebab menu.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the card\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Keep one card to one person, across every platform they have connected.',
    'Pass follower counts as numbers and let the card work out the tier.',
    'Set `role` only for KOC and Seeder, the two tiers a person assigns.',
    'Make the card selectable only when something else on the page acts on the selected cards.',
  ],
  dont: [
    'Don\'t mix Profile cards with one-row-per-account lists in the same roster.',
    'Don\'t choose a ranked tier by hand: it follows the follower count.',
    'Don\'t give avatars a colour per person.',
    'Don\'t style Archive as destructive: it is reversible.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the checkbox, the kebab, the name (with `href` or `onOpen`) and each follower count, in that order.' },
    { keys: 'Enter / Space', action: 'Opens the menu from the kebab (focus moves to its first item), picks a menu item, ticks the checkbox (Space), or follows a link (Enter).' },
    { keys: 'Arrow Down / Arrow Up', action: 'Moves through the menu items, wrapping at the ends.' },
    { keys: 'Home / End', action: 'Moves to the first or last menu item.' },
    { keys: 'Escape', action: 'Closes the menu and returns focus to the kebab.' },
    { keys: 'Tab', action: 'In the menu: leaves it and closes it.' },
  ],
  notes: [
    'The name is a real heading, and a real link or button when the card opens something.',
    'The kebab carries `aria-haspopup="menu"` and `aria-expanded`; the menu is `role="menu"` with `menuitem` buttons. Only one Profile card menu is open at a time.',
    'Each follower count is a link named "{platform}, {count} followers", since "31K" alone says nothing.',
    'The avatar is decorative; the tier is a Tag whose word carries the meaning.',
    'Selected shows as the border, the shadow and the checked box together, never colour alone.',
  ],
};

export const motion: DocsMotion[] = [
  {
    interaction: 'Hovering a card that opens something; selecting or deselecting it.',
    motion: 'The shadow and the border colour settle. The border width and padding change at once, so nothing moves. Nothing travels, so there is no reduced-motion variant.',
    token: '--duration-base · --ease-settle',
  },
];

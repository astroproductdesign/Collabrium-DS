// Documentation for SearchInput, rendered by the docs site (playground).
// Keep it consistent with SearchInput.usage.md. Not part of the package build.
import { useEffect, useState } from 'react';
import { SearchInput, type SearchResult } from './SearchInput';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Search input';

export const description =
  'A search box with a leading magnifying glass and a clear (×) button once there is text. Default searches in place; User Search and Item Search add a list of results to pick one from, then collapse to the choice.';

export const usage = `import { SearchInput } from '@collabrium/ui';

export function CampaignSearch({ onSearch }: { onSearch: (text: string) => void }) {
  return <SearchInput label="Search" onValueChange={onSearch} />;
}`;

export const thumbnail = () => <SearchInput label="Search" defaultValue="campaign" />;

const people: SearchResult[] = [
  { id: 'kt', title: 'Keong Teo', subtitle: 'Account Executive', initials: 'KT' },
  { id: 'sn', title: 'Sharmila Nair', subtitle: 'Account Executive', initials: 'SN' },
  { id: 'dp', title: 'Devi Pillai', subtitle: 'Account Executive', initials: 'DP' },
  { id: 'nr', title: 'Nadia Rahman', subtitle: 'Account Executive', initials: 'NR' },
  { id: 'hr', title: 'Hafiz Rahman', subtitle: 'Planner', initials: 'HR' },
];
const campaigns: SearchResult[] = [
  { id: 'q3', title: 'Q3 Growth Sprint', subtitle: 'Marketing' },
  { id: 'loops', title: 'Growth Loops — Referral', subtitle: 'Marketing' },
  { id: 'ret', title: 'Retention Play', subtitle: 'Data' },
  { id: 'raya', title: 'Raya Campaign', subtitle: 'Brand' },
];
const match = (list: SearchResult[], q: string) => list.filter((r) => `${r.title} ${r.subtitle ?? ''}`.toLowerCase().includes(q.trim().toLowerCase()));

/** A short fake delay, so the spinner shows. */
function useResults(list: SearchResult[], query: string) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      setResults(match(list, query));
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [list, query]);
  return { loading, results };
}

function UserSearchExample() {
  const [query, setQuery] = useState('');
  const { loading, results } = useResults(people, query);
  return <SearchInput variant="user" label="Search for a person" query={query} onQueryChange={setQuery} results={results} loading={loading} />;
}

function ItemSearchExample() {
  const [query, setQuery] = useState('');
  const { loading, results } = useResults(campaigns, query);
  return <SearchInput variant="item" label="Search for a campaign" query={query} onQueryChange={setQuery} results={results} loading={loading} />;
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'SearchInput',
    element: '<div>.cui-search-input',
    description: 'A column: the label (4px above the box), the box and an error. Fills its container.',
    children: [
      { name: 'Label', element: 'label.cui-search-input__label', description: 'label1, Neutral-9.' },
      {
        name: 'Box',
        element: '.cui-search-input__box > input',
        description: 'Input field\'s box at 48px (`--control-height-lg`), radius-sm, 1px Neutral-3, Neutral-1; 2px Obsidian on focus. 36px kept clear at each end.',
        children: [
          { name: 'Search icon', element: 'svg.cui-search-input__icon', description: 'MagnifyingGlass, 16px, Regular, Neutral-5, 12px from the start. Decorative.' },
          { name: 'Clear (×)', element: 'button.cui-search-input__clear', when: 'there is text', description: '24×24 with a 44px hit area, X 16px Regular, Neutral-5 (Neutral-9 on hover), 12px from the end; the standard focus ring. Gone (not just hidden) while the box is empty.' },
        ],
      },
      { name: 'Error', element: 'p.cui-search-input__error', when: 'error', description: 'caption, bold, Red.' },
      {
        name: 'Results panel',
        element: '.cui-search-input__panel',
        when: 'User / Item while searching; Default with loading or noResults',
        description: 'radius-md, 1px Neutral-3, shadow-3, 8px under the box, floating over the content below.',
        children: [
          { name: 'Row', element: 'li.cui-search-input__row (role="option")', description: '8px / 12px padding, 12px gap, Neutral-2 on hover and for the keyboard\'s row. User: a 32px avatar; then the name (body2 size, 700) and the role or type (caption, Neutral-5).' },
          { name: 'Loading', element: '.cui-search-input__loading', when: 'loading', description: 'A SpinnerGap (24px, Regular, Neutral-5) turning on duration-ambient (still under reduced motion), centred, 16px padding.' },
          { name: 'No matches', element: '.cui-search-input__empty', when: 'nothing matched', description: '"No matches found", body2, Neutral-5, centred, 16px padding.' },
        ],
      },
      { name: 'Selected (collapsed)', element: '.cui-search-input__collapsed', when: 'User / Item with a choice', description: 'The same 48px box: the avatar (User), the name and role, centred, and a clear (×) that empties the choice.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'A plain search: type, and the page shows the results. The × appears once there is text; it empties the box and puts focus back in it.',
    render: () => <SearchInput label="Search" />,
    code: `<SearchInput label="Search" onValueChange={setSearch} />`,
  },
  {
    id: 'default-states',
    title: 'Has value, disabled and error',
    description: 'The Default box\'s states.',
    render: () => (
      <div className="docs-stack">
        <SearchInput label="Search" defaultValue="campaign" />
        <SearchInput label="Search" disabled />
        <SearchInput label="Search" defaultValue="zzz???" error="Search couldn't run — try again" />
      </div>
    ),
    code: `<SearchInput label="Search" defaultValue="campaign" />
<SearchInput label="Search" disabled />
<SearchInput label="Search" defaultValue="zzz???" error="Search couldn't run — try again" />`,
  },
  {
    id: 'default-panel',
    title: 'No results and loading',
    description: 'While results load or none match, a panel floats 8px under the box, over the content below it. Under reduced motion the spinner stands still.',
    render: () => (
      <div className="docs-row docs-popover-room" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 240px' }}><SearchInput label="Search" defaultValue="zzz" noResults /></div>
        <div style={{ flex: '1 1 240px' }}><SearchInput label="Search" defaultValue="ke" loading /></div>
      </div>
    ),
    code: `<SearchInput label="Search" defaultValue="zzz" noResults />
<SearchInput label="Search" defaultValue="ke" loading />`,
  },
  {
    id: 'user',
    title: 'User Search',
    description: 'Type to search people ("ke", "rahman"). Pick one with the mouse, or ↓ ↑ and Enter: the box collapses to the person, and focus moves to its ×, which clears the choice.',
    render: () => <div className="docs-popover-room"><UserSearchExample /></div>,
    code: `const [query, setQuery] = useState('');
const { loading, results } = usePeopleSearch(query);

<SearchInput
  variant="user"
  label="Search for a person"
  query={query}
  onQueryChange={setQuery}
  results={results}   // { id, title, subtitle, initials }[]
  loading={loading}
  onSelectedChange={setOwner}
/>`,
  },
  {
    id: 'item',
    title: 'Item Search',
    description: 'The same, for records: no avatar ("growth").',
    render: () => <div className="docs-popover-room"><ItemSearchExample /></div>,
    code: `<SearchInput
  variant="item"
  label="Search for a campaign"
  query={query}
  onQueryChange={setQuery}
  results={results}   // { id, title, subtitle }[]
  loading={loading}
  onSelectedChange={setCampaign}
/>`,
  },
  {
    id: 'selected',
    title: 'Selected and selected — disabled',
    description: 'The collapsed choice keeps the 48px box. Disabled, the × is hidden but keeps its space, so the row is the same width.',
    render: () => (
      <div className="docs-stack">
        <SearchInput variant="user" label="Owner" results={[]} defaultSelected={people[3]} />
        <SearchInput variant="user" label="Owner" results={[]} defaultSelected={people[3]} disabled />
        <SearchInput variant="item" label="Campaign" results={[]} defaultSelected={campaigns[0]} />
      </div>
    ),
    code: `<SearchInput variant="user" label="Owner" results={results} defaultSelected={nadia} />
<SearchInput variant="user" label="Owner" results={results} defaultSelected={nadia} disabled />
<SearchInput variant="item" label="Campaign" results={results} defaultSelected={q3Growth} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'default' | 'user' | 'item'", default: "'default'", description: 'Default searches in place; User and Item pick one result.' },
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: '"Search", "Search for a person".' },
  { name: 'hideLabel', options: 'boolean', default: 'false', description: 'Hides the label visually; still read out.' },
  { name: 'placeholder', options: 'string', default: "'Search…'", description: 'An example of what to type.' },
  { name: 'error', options: 'ReactNode', default: '—', description: 'Bold Red text under the box, a Red border and `aria-invalid`.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Neutral-2, Neutral-4 text, no clear button.' },
  { name: 'value / defaultValue / onValueChange', options: 'string / string / (value) => void', default: '—', description: 'Default: the text.' },
  { name: 'loading / noResults', options: 'boolean', default: 'false', description: 'Default: a panel under the box with the spinner, or "No matches found".' },
  { name: 'query / defaultQuery / onQueryChange', options: 'string / string / (query) => void', default: '—', description: 'User, Item: the typed text. Filter or fetch `results` from it.' },
  { name: 'results', options: '{ id, title, subtitle?, initials? }[]', default: '—', description: 'User, Item (required): the matches. `initials` for User Search\'s avatars.' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'User, Item: the list shows the spinner.' },
  { name: 'selected / defaultSelected / onSelectedChange', options: 'SearchResult | null', default: 'null', description: 'User, Item: the choice.' },
  { name: 'name', options: 'string', default: '—', description: 'User, Item: a hidden input posts the chosen `id` with a form.' },
  { name: 'clearLabel / clearSelectionLabel / emptyText / loadingLabel', options: 'string', default: "'Clear search' / 'Clear selection' / 'No matches found' / 'Searching…'", description: 'Text, for other languages.' },
];

export const rules: DocsRules = {
  do: [
    'Keep it at 48px in every state, so picking or clearing never moves the layout.',
    'Keep the clear button reachable by Tab once it shows.',
    'Use User Search for a person and Item Search for a record; Default when the results show on the page.',
  ],
  dont: [
    'Don\'t show a clear button and another trailing icon together.',
    'Don\'t style "No matches found" as a full Empty state: it\'s an inline note in a small panel.',
    'Don\'t use a Fill icon for the spinner: it\'s a process, not a status.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Into the box, then to the × when there is text.' },
    { keys: '↓ / ↑', action: 'User, Item: move through the results (wrapping); the row gets the hover fill.' },
    { keys: 'Enter', action: 'User, Item: picks the current result; the box collapses and focus moves to its ×.' },
    { keys: 'Escape', action: 'User, Item: closes the results; typing opens them again.' },
    { keys: 'Enter / Space on ×', action: 'Clears the text (or the choice) and puts focus back in the box.' },
  ],
  notes: [
    'User and Item Search are a combobox: the box has `role="combobox"`, `aria-expanded` and `aria-activedescendant`; the results are a `listbox` of `option`s.',
    'The search icon and the avatars are decorative. The × is a real button named "Clear search" or "Clear selection", and is removed from the tab order while hidden.',
    'The collapsed choice is a group named by the label.',
    'The error is linked with `aria-describedby`. Loading has hidden "Searching…" text. No live regions.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Loading', motion: 'The spinner turns, linear.', token: '--duration-ambient' },
  { interaction: 'Reduced motion', motion: 'The spinner stands still; the hidden "Searching…" stays.', token: '—' },
];

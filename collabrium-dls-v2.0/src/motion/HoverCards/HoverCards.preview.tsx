// Every variant of HoverCards. The docs site does not show this file. Not part of the package build.
import { HoverCards } from './HoverCards';

const cards = [
  { id: 'reports', title: 'Reports', description: 'Every team sees the same picture of the work.' },
  { id: 'goals', title: 'Goals', description: 'Targets that move with the plan, not behind it.' },
];

export function HoverCardsPreview() {
  return (
    <div>
      <HoverCards items={cards} />
    </div>
  );
}

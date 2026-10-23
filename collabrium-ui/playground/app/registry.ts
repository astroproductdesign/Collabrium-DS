// One entry per converted component. Add a line here when a component is
// converted; its preview page appears at /components/<slug>.
import type { ComponentType } from 'react';
import { ButtonPreview } from '../../src/components/Button/Button.preview';

export interface Entry {
  slug: string;
  name: string;
  status: 'review' | 'done';
  summary: string;
  Preview: ComponentType;
}

export const registry: Entry[] = [
  {
    slug: 'button',
    name: 'Button',
    status: 'review',
    summary: 'Primary, Secondary, Ghost; sm/md/lg; icon-only; loading; CTA beacon.',
    Preview: ButtonPreview,
  },
];

// Pieces the Motion docs files share. Docs site only: not shipped.
import { useState, type ReactNode } from 'react';
import { Button } from '../../components/Button';
import type { DocsAccessibility, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

/** A show/hide demo: a button that toggles `show`, and the stage the sample sits in. */
export function ShowDemo({ children }: { children: (show: boolean) => ReactNode }) {
  const [show, setShow] = useState(true);
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
        {show ? 'Hide' : 'Show'}
      </Button>
      {children(show)}
    </div>
  );
}

export const showProp: DocsProp = { name: 'show', options: 'boolean', default: 'true', description: 'Whether the content is shown. Toggling it animates the content in or out; when false the content is removed from the page.' };
export const durationProp = (d: string): DocsProp => ({ name: 'duration', options: "'instant' | 'fast' | 'base' | 'slow' | 'ambient' | 'morph' | 'reveal'", default: `'${d}'`, description: 'A duration token. Use `fast` for small hints, `base` for ordinary UI, `slow` for larger surfaces.' });
export const easeProp = (e: string): DocsProp => ({ name: 'ease', options: "'standard' | 'settle' | 'flow' | 'flare' | 'precise' | 'grow' | 'morph' | 'reveal'", default: `'${e}'`, description: 'An easing token. Keep the default unless the motion belongs to an element.' });
export const appearProp: DocsProp = { name: 'appear', options: 'boolean', default: 'false', description: 'Animate on the first render too. Left off, content that is present on load just appears.' };
export const childrenProp: DocsProp = { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The content to animate.' };

export const wrapperRules: DocsRules = {
  do: [
    'Wrap content that arrives or leaves because of something the person did or something that finished.',
    'Choose a duration and an easing by token name; leave the defaults unless the content has a reason to differ.',
    'Keep the content\'s own layout in the content: the wrapper only moves and fades it.',
  ],
  dont: [
    "Don't wrap everything on a page: motion has a job, and a page that is all moving has no focus.",
    "Don't animate content the person is trying to read or act on while it moves.",
    "Don't pass your own duration or easing numbers: the props take token names.",
  ],
};

export const wrapperAccessibility = (what: string): DocsAccessibility => ({
  keyboard: 'None: the wrapper adds no controls and takes no focus.',
  notes: [
    what,
    'It adds no role, no label and no live region: what the content says is read as the content normally is.',
    'Content that is removed when `show` is false leaves the accessibility tree too, so it is never read while hidden.',
  ],
});

export const motionRow = (interaction: string, motion: string, token: string): DocsMotion => ({ interaction, motion, token });

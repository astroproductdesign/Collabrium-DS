// Documentation for Collapse (Motion), rendered by the docs site.
// Keep it consistent with Collapse.usage.md. Not part of the package build.
import { Collapse } from './Collapse';
import { ShowDemo, appearProp, childrenProp, durationProp, easeProp, motionRow, wrapperAccessibility, wrapperRules } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp } from '../../components/docs.types';

export const title = 'Collapse';

export const description =
  'Expands and collapses content by height, for accordions, disclosures and anything that opens in place. When it is closed the content is removed from the page.';

export const usage = `import { Collapse } from '@collabrium/ui/motion';

export function Details({ open }) {
  return (
    <Collapse open={open}>
      <p>Billing runs on the first of the month.</p>
    </Collapse>
  );
}`;

export const thumbnail = () => <p className="docs-motion-sample">Billing runs on the first of the month.</p>;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Collapse',
    element: '<div>',
    description: 'A wrapper that animates its height between 0 and the content\'s height. It clips overflow only while collapsed or moving, so focus rings and shadows are never cut off once it is open.',
    children: [{ name: 'Content', description: 'Whatever you put inside. It is in the page only while open, or while closing.' }],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Open and close',
    description: 'The expand and collapse pairing the DLS names: `base` with `settle`. The surrounding page moves with the height, so use it where that is expected.',
    render: () => (
      <ShowDemo>{open => (
        <Collapse open={open}>
          <p className="docs-motion-sample">Billing runs on the first of the month, in the currency of the account.</p>
        </Collapse>
      )}</ShowDemo>
    ),
    code: `const [open, setOpen] = useState(true);

<Button variant="secondary" size="sm" onClick={() => setOpen(o => !o)}>
  {open ? 'Hide' : 'Show'}
</Button>
<Collapse open={open}>
  <p>Billing runs on the first of the month, in the currency of the account.</p>
</Collapse>`,
  },
  {
    id: 'slow',
    title: 'A larger surface',
    description: '`duration="slow"` suits a taller panel, such as a sidebar section.',
    render: () => (
      <ShowDemo>{open => (
        <Collapse open={open} duration="slow" ease="standard">
          <p className="docs-motion-sample">Every report you have shared this month, with who opened it and when.</p>
        </Collapse>
      )}</ShowDemo>
    ),
    code: `<Collapse open={open} duration="slow" ease="standard">
  <p>Every report you have shared this month, with who opened it and when.</p>
</Collapse>`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the content is expanded. When false the content is removed after it collapses.' },
  durationProp('base'),
  easeProp('settle'),
  appearProp,
  childrenProp,
];

export const rules = wrapperRules;

export const accessibility = wrapperAccessibility('Reduced motion makes the height change instant: height is travel. The content still shows and hides.');

export const motion: DocsMotion[] = [
  motionRow('Opens', 'Height goes from 0 to the content\'s height.', '--duration-base · --ease-settle'),
  motionRow('Closes', 'Height goes back to 0, then the content is removed.', '--duration-base · --ease-settle'),
  motionRow('Reduced motion', 'The height change is instant.', '—'),
];

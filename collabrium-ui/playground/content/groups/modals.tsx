// Overview of the Modals group, rendered by the docs site (playground). The parts are Modal / dialog and the
// variants the DLS files under it (Modal / dialog › Tutorial Modal, Media Ad Modal, Metrics modal, Compare modal).
// Grouped at the user's request, 2026-11-12, after the Charts structure.
import { Button } from '../../../src';
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Modals';

export const description =
  'Modal / dialog and the variants built on it: a focused decision over the page, a guided tour, and the read-only detail and comparison views. One panel recipe, one scrim, the same footer order.';

// A still picture of the base panel; the real modals exist only while open.
export const thumbnail = () => (
  <div className="cui-modal docs-modal-thumb" aria-hidden="true">
    <div className="cui-modal__head">
      <span className="cui-modal__title">Archive this workspace?</span>
    </div>
    <div className="cui-modal__body">Team members will lose access immediately.</div>
    <div className="cui-modal__foot">
      <Button variant="secondary" tabIndex={-1}>Cancel</Button>
      <Button variant="primary" tabIndex={-1}>Archive</Button>
    </div>
  </div>
);

export const overview: GroupOverviewDocs['overview'] = [
  'Every modal starts from Modal / dialog: a Neutral-1 panel at radius-lg with shadow-modal, on the Neutral-9 scrim, with a title that names the dialog and a footer of Secondary then Primary. The variants keep that recipe and add what one job needs.',
  'A modal asks one focused decision. The variants are the only exceptions to "no multi-step flows", on the same ground each time: they collect no input, commit nothing in place, and can be left at any point with nothing lost.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Ask one decision', description: 'Archive, delete, discard changes: `Modal` with the question as its title and Cancel then the commit in `actions`.' },
  { title: 'Show someone round', description: 'A first visit to a page: `TutorialModal`, an intro, a few spotlighted stops and a sign-off.' },
  { title: 'Read the detail', description: 'One ad or format in full, stepped through with previous and next: Media Ad Modal, or Metrics modal for its numbers.' },
  { title: 'Compare', description: 'Two to four formats side by side: Compare modal.' },
];

export const rulesIntro = 'These rules apply to every modal in this group.';

export const rules: GroupOverviewDocs['rules'] = [
  'Dismissal sits left of the commit, right-aligned; never two Primary buttons.',
  'Escape, the × and a click on the scrim close it, and focus goes back to what opened it.',
  'The page behind stays still while a modal is open.',
  'A long form or a task that collects input is a page, not a modal.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [
  { title: 'Compare modal', summary: 'Two to four formats read side by side; collects no input and commits nothing in place.' },
];

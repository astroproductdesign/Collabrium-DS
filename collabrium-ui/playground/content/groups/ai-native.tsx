// Overview of the AI Native group, rendered by the docs site (playground).
// Written from DESIGN-SYSTEM.md's "AI Native" section. The parts themselves
// are the components whose docs file exports `group = 'AI Native'`.
import { Thinking } from '../../../src';
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'AI Native';

export const description =
  'Components that are the AI interaction itself, not generic controls pressed into service for one. Eight parts that hand off to each other across a single AI run.';

export const thumbnail = () => (
  <Thinking
    variant="steps"
    steps={[{ label: 'Reading account notes' }]}
    status="done"
    workingLabel="Thinking"
    doneLabel="Thought for 4 seconds"
  />
);

export const overview: GroupOverviewDocs['overview'] = [
  'An AI Native component is the AI interaction itself. Each part exists for one moment in an AI run, and nothing generic is stretched to cover it.',
  'The parts depend on each other. The Chat window is the expanded form of the Prompt input bar: the floating bar morphs into the window. Loading State and Thinking are the two waits before anything has streamed back, and Thinking\'s own rules decide which one shows, never preference. Streaming Text is what both hand off to at the first token: the model\'s own words actually arriving.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Ask', description: 'The person asks with the `Prompt input bar`. Its floating form morphs into the `Chat window` where the conversation continues.' },
  { title: 'Wait, with nothing to show', description: '`Loading State` appears after 400ms, with a live label and an elapsed timer.' },
  { title: 'Wait, with named steps', description: 'Once two or more steps exist and two seconds have passed, `Thinking` replaces Loading State in place. It never hands back.' },
  { title: 'The answer arrives', description: '`Streaming Text` takes over at the first token. The wait component leaves nothing behind.' },
  { title: 'The AI needs the person', description: '`Permission Prompt` and `Tool approval` are cards the AI puts in its own turn to ask for authorization or a decision. `Task Rows` shows an agent run working through named tasks.' },
];

export const rulesIntro = 'The two wait states, Loading State and Thinking, follow the same boundaries. Expect the other parts to as well.';

export const rules: GroupOverviewDocs['rules'] = [
  'AI work only: model generation, tool execution, agent runs. Never data loading of any kind. Use a spinner or a skeleton for those.',
  'Never blocks. No overlay, no modal, no page-level use: AI work is in-flow work.',
  'Never appears without a Stop. The surface that hosts it provides the Stop.',
  'One per operation. Never two in a view.',
  'It occupies the space the result will fill, so the result arrives as one thing resolving.',
  'Reduced motion drops the travel and keeps the information.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [
  { title: 'Chat window', summary: 'A modal chat surface: conversation history on the left, the active thread on the right. The expanded form of the Prompt input bar.' },
  { title: 'Prompt input bar', summary: 'Where the person asks. The floating bar morphs into the Chat window.' },
  { title: 'Tool approval', summary: 'A one-question-at-a-time card the AI shows mid-task when it needs the person to decide before it can continue.' },
];

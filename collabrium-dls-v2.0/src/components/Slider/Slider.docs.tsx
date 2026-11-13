// Documentation for Slider, rendered by the docs site (playground).
// Keep it consistent with Slider.usage.md. Not part of the package build.
import { useState } from 'react';
import { Slider } from './Slider';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Slider';

export const description =
  'Drag to pick one value, or a range, along a continuous scale. A value tooltip follows the moving thumb; min and max labels and a static value are optional.';

export const usage = `import { Slider } from '@collabrium/ui';

export function Budget() {
  const [budget, setBudget] = useState(40000);
  return (
    <Slider
      label="Campaign budget"
      min={0}
      max={100000}
      step={1000}
      value={budget}
      onValueChange={setBudget}
      format="rm"
      showLimits
    />
  );
}`;

export const thumbnail = () => <Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" />;

function ControlledExample() {
  const [range, setRange] = useState<[number, number]>([200, 700]);
  return (
    <>
      <Slider variant="range" label="Price range" min={0} max={1000} step={10} value={range} onValueChange={setRange} format="rm" showLimits />
      <p className="docs-readout">
        RM {range[0].toLocaleString('en-US')} to RM {range[1].toLocaleString('en-US')}
      </p>
    </>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Slider',
    element: '<div>.cui-slider',
    description: 'Full width of its parent. A range is a group named by the label.',
    children: [
      { name: 'Label', element: '<label>.cui-slider__label', description: 'Input field\'s label: label1 (14px), bold, Neutral-9, 4px above the rail.' },
      { name: 'Static value', element: '.cui-slider__value', when: 'showValue', description: 'Caption, Neutral-9, right-aligned above the track\'s end. Replaces the tooltip.' },
      {
        name: 'Rail',
        element: '.cui-slider__rail',
        description: '24px tall (44px on touch screens): the box the pointer hits.',
        children: [
          { name: 'Value tooltip', element: '.cui-slider__tooltip', description: 'Tooltip\'s bubble: caption 500, Neutral-7, white text, radius-sm, 6px 12px padding, 8px above the rail, centred on the thumb.' },
          { name: 'Track', element: '.cui-slider__track', description: '4px (compact 2px), radius-pill, Neutral-3, flush with both edges.' },
          { name: 'Fill', element: '.cui-slider__fill', description: 'Obsidian: from the minimum to the thumb, or between the two thumbs.' },
          { name: 'Thumb', element: '<input type="range">', description: '20px (compact 16px), white, 2px Obsidian border, shadow-2; shadow-3 on hover and drag. A range stacks two inputs.' },
        ],
      },
      { name: 'Min and max', element: '.cui-slider__limits', when: 'showLimits', description: 'Caption, Neutral-5, at each end, 4px under the rail.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'single',
    title: 'Single',
    description: 'One thumb; the fill runs from the minimum to it. Drag the thumb, click the track or use the arrow keys.',
    render: () => <div className="docs-tip-room"><Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" showLimits /></div>,
    code: `<Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" showLimits />`,
  },
  {
    id: 'range',
    title: 'Range',
    description: 'Two thumbs; the fill runs between them. They may touch but never cross. A click on the track moves the nearer thumb.',
    render: () => <div className="docs-tip-room"><ControlledExample /></div>,
    code: `const [range, setRange] = useState<[number, number]>([200, 700]);

<Slider variant="range" label="Price range" min={0} max={1000} step={10} value={range} onValueChange={setRange} format="rm" showLimits />`,
  },
  {
    id: 'static-value',
    title: 'Static value',
    description: 'When the value must stay on screen at rest. It replaces the tooltip.',
    render: () => <div className="docs-tip-room"><Slider label="Share of budget on video" defaultValue={55} format="percent" showValue /></div>,
    code: `<Slider label="Share of budget on video" defaultValue={55} format="percent" showValue />`,
  },
  {
    id: 'compact',
    title: 'Compact',
    description: 'A 2px track and 16px thumb, for dense layouts and table rows. The rail keeps its 24px.',
    render: () => <div className="docs-tip-room"><Slider label="Weight" size="compact" defaultValue={30} format="percent" showLimits /></div>,
    code: `<Slider label="Weight" size="compact" defaultValue={30} format="percent" showLimits />`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'The whole slider at 40%, the fill Neutral-3, the thumb\'s border Neutral-4 and no shadow.',
    render: () => <div className="docs-tip-room"><Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" showLimits disabled /></div>,
    code: `<Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" showLimits disabled />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label above the slider.' },
  { name: 'variant', options: "'single' | 'range'", default: "'single'", description: 'One thumb, or two with the fill between them.' },
  { name: 'value / defaultValue', options: 'number, or [low, high] for range', default: 'min, or [min, max]', description: 'Controlled or uncontrolled value.' },
  { name: 'onValueChange', options: '(value) => void', default: '—', description: 'Every new value while dragging, clicking or pressing a key.' },
  { name: 'min / max / step', options: 'number', default: '0 / 100 / 1', description: 'The scale. Use a slider only for about 10 or more values.' },
  { name: 'format', options: "'number' | 'rm' | 'percent'", default: "'number'", description: 'How values are written everywhere they appear, and read out.' },
  { name: 'formatValue', options: '(value: number) => string', default: '—', description: 'Your own formatter; overrides `format`.' },
  { name: 'showLimits', options: 'boolean', default: 'false', description: 'The min and max under the track\'s ends.' },
  { name: 'showValue', options: 'boolean', default: 'false', description: 'The value at rest, above the track\'s end. Replaces the tooltip.' },
  { name: 'size', options: "'default' | 'compact'", default: "'default'", description: 'Compact: 2px track, 16px thumb.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: '40% throughout; no response.' },
  { name: 'thumbLabels', options: '[string, string]', default: "['Minimum', 'Maximum']", description: 'Range only: the thumbs\' names.' },
  { name: 'name', options: 'string, or [string, string] for range', default: '—', description: 'Posts the value with a form.' },
];

export const rules: DocsRules = {
  do: [
    'Give every slider a visible label.',
    'Write values with a unit when it isn\'t obvious: `format="rm"` gives "RM 100,000".',
    'Keep it full width of its column.',
  ],
  dont: [
    'Don\'t use a slider for fewer than about 10 values: use Radio or a Dropdown.',
    'Don\'t use a slider when people need an exact figure: use Input field or Quantity selector.',
    'Don\'t colour the fill with an element colour: it stays Obsidian.',
    'Don\'t turn off the tooltip on a range: knowing both values while dragging matters.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab reaches each thumb (a range has two). Arrow keys step, Page Up and Page Down jump, Home and End go to the ends; a range\'s thumb stops at its partner.',
  notes: [
    'Native `<input type="range">`: the browser reports the slider role and its minimum, maximum and value.',
    'The formatted value ("RM 40,000") is read as `aria-valuetext`.',
    'A range is a group named by the label; its thumbs are "Minimum" and "Maximum".',
    'The tooltip is hidden from screen readers, since the value is already read.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Thumb and fill while dragging', motion: 'None: they follow the pointer at once.', token: '—' },
  { interaction: 'Thumb hover and drag', motion: 'Shadow-2 to shadow-3.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Tooltip in', motion: 'Fades in.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Tooltip out', motion: 'Waits, then fades out.', token: '--duration-base delay · --duration-fast' },
  { interaction: 'Reduced motion', motion: 'The tooltip and shadow change at once.', token: '—' },
];

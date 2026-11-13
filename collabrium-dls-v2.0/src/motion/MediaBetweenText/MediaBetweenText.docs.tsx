// Documentation for Media between text (Motion), rendered by the docs site.
// Keep it consistent with MediaBetweenText.usage.md. Not part of the package build.
import { MediaBetweenText } from './MediaBetweenText';
import { ScriptedPointer, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Media between text";

export const description =
  "A phrase with a picture that opens between its words: the gap widens to show the image or video and the two halves of the text slide apart.";

export const usage = `import { MediaBetweenText } from '@collabrium/ui/motion';

export function Headline() {
  return <MediaBetweenText firstText="Crafting" secondText="delightful" src="/studio.jpg" alt="A designer's desk" />;
}`;

const picture = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60"><rect width="80" height="60" fill="#FFB49D"/><circle cx="28" cy="26" r="12" fill="#FF5825"/><rect x="40" y="34" width="30" height="18" fill="#1473E6"/></svg>');

export const thumbnail = () => (<ScriptedPointer target=".cui-media-text"><p className="docs-motion-sample"><MediaBetweenText firstText="Crafting" secondText="delightful" src={picture} alt="" /></p></ScriptedPointer>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Media between text",
    description: "A phrase with a picture that opens between its words: the gap widens to show the image or video and the two halves of the text slide apart.",
    children: [
    { name: "Phrase", element: "span.cui-media-text", description: "The two halves of the text and the media between them." },
    { name: "Media", element: "span.cui-media-text__media", description: "An image or a muted looping video, 2em wide and 1.25em tall, with radius-sm and shadow-1. It is 0 wide and transparent until the gap opens." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "hover",
    title: "Opens on hover",
    description: "Move the pointer over the phrase: the picture opens between the words.",
    render: () => (<p className="docs-motion-sample"><MediaBetweenText firstText="Crafting" secondText="delightful" src={picture} alt="" /></p>),
    code: `<MediaBetweenText firstText="Crafting" secondText="delightful" src="/studio.jpg" alt="" />`,
  },
  {
    id: "view",
    title: "Opens on scroll",
    description: "`trigger=\"view\"` opens the gap once, when the phrase scrolls into view.",
    render: () => (<p className="docs-motion-sample"><MediaBetweenText firstText="user" secondText="experiences" src={picture} alt="" trigger="view" /></p>),
    code: `<MediaBetweenText firstText="user" secondText="experiences" src="/studio.jpg" alt="" trigger="view" />`,
  },
];

export const props: DocsProp[] = [
  { name: "firstText", options: "string", default: "\u2014", required: true, description: "The text before the media." },
  { name: "secondText", options: "string", default: "\u2014", required: true, description: "The text after the media." },
  { name: "src", options: "string", default: "\u2014", required: true, description: "The media's address." },
  { name: "alt", options: "string", default: "\u2014", required: true, description: "What the media shows. Pass an empty string when it only decorates." },
  { name: "mediaType", options: "'image' | 'video'", default: "'image'", description: "A video plays muted, looping and inline." },
  { name: "trigger", options: "'hover' | 'view'", default: "'hover'", description: "What opens the gap." },
];

export const rules: DocsRules = {
  do: [
    "Use it for one phrase in a headline.",
    "Pass `alt=\"\"` when the picture only decorates.",
    "Keep the media small and simple.",
  ],
  dont: [
    "Don't put information only in the media.",
    "Don't use it on body text.",
    "Don't rely on hover for anything people need.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The text is in the page as normal. The media needs `alt` (empty when decorative). A video is muted and has no controls, so keep it decorative. Under reduced motion the media is always shown and nothing moves."],
};

export const motion: DocsMotion[] = [
  motionRow("The pointer enters, or the phrase scrolls into view", "The media grows from 0 wide while fading in, and the two halves of the text slide apart.", "--duration-base \u00b7 --ease-settle"),
  motionRow("The pointer leaves", "The gap closes.", "--duration-base \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The media is always shown; nothing moves.", "\u2014"),
];

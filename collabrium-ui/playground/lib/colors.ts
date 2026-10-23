// Colour Palette content. Names and descriptions are ported from the DLS
// site (collabrium-dls/preview.html, brandColors … elementBgColors). Hex
// values are never written here: each swatch names its token, and the
// value is read from src/tokens/tokens.ts, so the page follows the tokens.
import { tokens, type ColorToken } from '../../src/tokens/tokens';

export interface Swatch {
  name: string;
  token: ColorToken;
  description: string;
  tag?: string;
}

export interface ColorGroup {
  id: string;
  title: string;
  note?: string;
  swatches: Swatch[];
}

export const colorGroups: ColorGroup[] = [
  {
    id: 'brand',
    title: 'Brand · element · department',
    swatches: [
      { name: 'Orange', token: 'orange', description: 'Visibility & energy — brand/decorative', tag: 'Fire · Marketing, PR, Sales' },
      { name: 'Salmon Pink', token: 'salmonPink', description: 'Growth & vision — brand/decorative', tag: 'Wood · Strategy, R&D, Product' },
      { name: 'Green', token: 'green', description: 'Support & stability — brand/decorative', tag: 'Earth · HR, CS, Admin' },
      { name: 'Navy Blue', token: 'navy', description: 'Depth & flow — brand/decorative', tag: 'Water · Data, Logistics, Exec' },
      { name: 'Amber', token: 'amber', description: 'Order & structure, warnings, celebratory highlights', tag: 'Gold · Finance, Legal, Compliance' },
      { name: 'Obsidian', token: 'obsidian', description: 'Primary action background — the only CTA color, dominant regardless of what else is on screen' },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary accents',
    swatches: [
      { name: 'Purple', token: 'purple', description: 'AI and premium feature UI, secondary tags, chart series 5' },
      { name: 'Turquoise', token: 'turquoise', description: 'Additional secondary accent, reserved for future elements' },
    ],
  },
  {
    id: 'functional',
    title: 'Functional',
    swatches: [
      { name: 'Red', token: 'red', description: 'Errors, destructive actions, invalid input' },
      { name: 'Green', token: 'green', description: 'Success icons, valid input' },
    ],
  },
  {
    id: 'neutrals',
    title: 'Neutrals',
    swatches: [
      { name: 'Neutral-9', token: 'neutral9', description: 'Primary text, headings, icon strokes' },
      { name: 'Neutral-8', token: 'neutral8', description: 'Deepest dark surface' },
      { name: 'Neutral-7', token: 'neutral7', description: 'Dark surface, modal overlays' },
      { name: 'Neutral-6', token: 'neutral6', description: 'Near-black accent surface' },
      { name: 'Neutral-5', token: 'neutral5', description: 'Secondary body text, muted description' },
      { name: 'Neutral-4', token: 'neutral4', description: 'Shadow base, disabled fills' },
      { name: 'Neutral-3', token: 'neutral3', description: 'Hairline borders, dividers' },
      { name: 'Neutral-2', token: 'neutral2', description: 'Subtle background tint, hover fills' },
      { name: 'Neutral-1', token: 'neutral1', description: 'Card surfaces (no longer the page canvas — see Warm canvas)' },
    ],
  },
  {
    id: 'warm-canvas',
    title: 'Warm canvas',
    note: 'the default page canvas everywhere (product and brand/editorial)',
    swatches: [
      { name: 'Canvas warm', token: 'canvasWarm', description: 'Page canvas for every screen — product/dashboard and brand/editorial alike' },
      { name: 'Canvas warm card', token: 'canvasWarmCard', description: 'Card fill on the warm canvas.' },
    ],
  },
  {
    id: 'element-tints',
    title: 'Elemental background tints',
    note: 'the only permitted coloured backgrounds',
    swatches: [
      { name: 'Fire bg', token: 'fireBg', description: '8% Fire on white — Marketing/Sales panels' },
      { name: 'Earth bg', token: 'earthBg', description: '8% Earth on white — HR/CS panels' },
      { name: 'Water bg', token: 'waterBg', description: '8% Water on white — Data/Ops panels' },
      { name: 'Gold bg', token: 'goldBg', description: '8% Gold on white — Finance/Legal panels' },
      { name: 'Wood bg', token: 'woodBg', description: '8% Wood on white — Strategy/Product panels' },
    ],
  },
  // The three groups below are in tokens.css but not on the DLS site's
  // palette page; descriptions come from tokens.css and DESIGN-SYSTEM.md.
  {
    id: 'element-tints-strong',
    title: 'Elemental background tints, strong',
    note: 'a nested or hovered layer on an element-tinted surface',
    swatches: [
      { name: 'Fire bg strong', token: 'fireBgStrong', description: '16% Fire on white — nested or hovered layer' },
      { name: 'Earth bg strong', token: 'earthBgStrong', description: '16% Earth on white — nested or hovered layer' },
      { name: 'Water bg strong', token: 'waterBgStrong', description: '16% Water on white — nested or hovered layer' },
      { name: 'Gold bg strong', token: 'goldBgStrong', description: '16% Gold on white — nested or hovered layer' },
      { name: 'Wood bg strong', token: 'woodBgStrong', description: '16% Wood on white — nested or hovered layer' },
    ],
  },
  {
    id: 'purple-tints',
    title: 'Purple tints',
    note: 'back the Purple Tag only; Purple is not an element',
    swatches: [
      { name: 'Purple bg', token: 'purpleBg', description: 'Purple Tag fill' },
      { name: 'Purple bg strong', token: 'purpleBgStrong', description: 'Nested or hovered layer' },
    ],
  },
  {
    id: 'pastel-tints',
    title: 'Elemental pastel tints',
    note: 'decorative, ambient effects only (such as a glow), never surface fills',
    swatches: [
      { name: 'Fire pastel', token: 'firePastel', description: 'Prompt input bar glow' },
      { name: 'Wood pastel', token: 'woodPastel', description: 'Prompt input bar glow' },
      { name: 'Earth pastel', token: 'earthPastel', description: 'Prompt input bar glow' },
      { name: 'Water pastel', token: 'waterPastel', description: 'Prompt input bar glow' },
      { name: 'Gold pastel', token: 'goldPastel', description: 'Prompt input bar glow' },
    ],
  },
];

/** `salmonPink` -> `--color-salmon-pink`; `neutral9` -> `--color-neutral-9`. */
export function cssVarName(token: ColorToken): string {
  return `--color-${token.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([a-z])(\d)/g, '$1-$2').toLowerCase()}`;
}

export function hexOf(token: ColorToken): string {
  return tokens.color[token];
}

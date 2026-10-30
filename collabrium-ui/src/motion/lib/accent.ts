import { tokens } from '../../tokens/tokens';

/** The accent colours a pointer effect can take: Obsidian and the seven DLS series colours. */
export const accentNames = ['obsidian', 'orange', 'salmonPink', 'green', 'navy', 'amber', 'purple', 'turquoise'] as const;
export type AccentName = (typeof accentNames)[number];

/** The hex value of an accent, for inline styles that cannot read a CSS class. */
export const accentValue = (name: AccentName): string => tokens.color[name];

// Shared prop helpers.

/**
 * Removes `style` and `className` from a native props type. Components in
 * this package never accept either: spacing and layout between components
 * come from layout components, and visual choices come from typed props.
 */
export type WithoutStyling<T> = Omit<T, 'style' | 'className'>;

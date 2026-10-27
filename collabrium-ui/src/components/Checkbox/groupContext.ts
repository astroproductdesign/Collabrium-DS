import { createContext } from 'react';

/**
 * What a CheckboxGroup tells the checkboxes inside it: the group is in error
 * (every empty box takes the red border and `aria-invalid`) and/or disabled.
 */
export interface CheckboxGroupContextValue {
  invalid: boolean;
  disabled: boolean;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

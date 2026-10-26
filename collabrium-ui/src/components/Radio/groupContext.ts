import { createContext } from 'react';

/**
 * What a RadioGroup tells the radios inside it: the shared `name`, which value
 * is selected and how to change it, plus the group's error and disabled state.
 */
export interface RadioGroupContextValue {
  name: string;
  value: string;
  select: (value: string) => void;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

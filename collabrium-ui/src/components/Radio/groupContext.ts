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
  /** The group's error line, when there is one: Radio Card adds it to each radio's description, as the DS asks. */
  errorId?: string;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

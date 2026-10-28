'use client';

import { forwardRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** One value in an input chip group. */
export interface InputChip {
  /** Unique within the group; passed back to `onRemove`. */
  id: string;
  /** The value, as the person entered or confirmed it ("Marketing"), not "Department: Marketing". */
  label: string;
}

type NativeListProps = WithoutStyling<Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'color' | 'role'>>;

export interface InputChipGroupProps extends NativeListProps {
  /** Names the list for assistive tech ("Selected brands"). Required. */
  'aria-label': string;
  /** The values to show, in order. */
  chips: InputChip[];
  /**
   * Called with the chip's `id` when the person removes it (the × button, or Delete/Backspace on it).
   * Leave it out for a static list of values: the chips then have no ×. The host drops the chip from `chips`.
   */
  onRemove?: (id: string) => void;
  /**
   * How many chips show before the rest fold into a "+N" chip. Beyond it, "+N" expands them in place and
   * becomes a "Show less" link. Use 3 unless the host says otherwise.
   */
  maxVisible?: number;
  /** Greys every chip out and takes the × out of use. */
  disabled?: boolean;
}

/**
 * Collabrium Input Chip group: the values a person has entered or confirmed, as removable pills in a
 * list. Lives inside or directly under the input it belongs to. Beyond `maxVisible` chips the rest fold into
 * "+N".
 */
export const InputChipGroup = forwardRef<HTMLUListElement, InputChipGroupProps>(function InputChipGroup(
  { chips, onRemove, maxVisible = 3, disabled = false, ...rest },
  ref,
) {
  const [expanded, setExpanded] = useState(false);
  const hidden = Math.max(0, chips.length - maxVisible);
  const shown = expanded ? chips : chips.slice(0, maxVisible);

  const removeKey = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      onRemove?.(id);
    }
  };

  return (
    <ul {...rest} ref={ref} className="cui-chip-group" role="list">
      {shown.map(chip => (
        <li key={chip.id} className="cui-chip" data-kind="input" data-disabled={disabled ? '' : undefined}>
          <span className="cui-chip__label">{chip.label}</span>
          {onRemove && (
            <button
              type="button"
              className="cui-chip__remove"
              aria-label={`Remove ${chip.label}`}
              disabled={disabled}
              onClick={event => {
                event.stopPropagation();
                onRemove(chip.id);
              }}
              onKeyDown={event => removeKey(event, chip.id)}
            >
              <X weight="regular" aria-hidden="true" focusable="false" />
            </button>
          )}
        </li>
      ))}
      {hidden > 0 && (
        <li className="cui-chip-group__item">
          {expanded ? (
            <button type="button" className="cui-chip-group__showless" aria-expanded="true" onClick={() => setExpanded(false)}>
              Show less
            </button>
          ) : (
            <button
              type="button"
              className="cui-chip"
              data-kind="overflow"
              aria-expanded="false"
              onClick={() => setExpanded(true)}
            >
              +{hidden}
            </button>
          )}
        </li>
      )}
    </ul>
  );
});

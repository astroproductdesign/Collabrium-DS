'use client';

import { forwardRef } from 'react';
import { Slide, type SlideBaseProps } from '../lib/Slide';

export type SlideUpProps = SlideBaseProps;

/**
 * Slides content up into place, starting below it. Fades in while travelling spacing-8 into place; under reduced
 * motion the travel is dropped and only the fade remains.
 */
export const SlideUp = forwardRef<HTMLDivElement, SlideUpProps>(function SlideUp(props, ref) {
  return <Slide ref={ref} from="below" {...props} />;
});

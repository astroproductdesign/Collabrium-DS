'use client';

import { forwardRef } from 'react';
import { Slide, type SlideBaseProps } from '../lib/Slide';

export type SlideRightProps = SlideBaseProps;

/**
 * Slides content right into place, starting to its left. Fades in while travelling spacing-8 into place; under reduced
 * motion the travel is dropped and only the fade remains.
 */
export const SlideRight = forwardRef<HTMLDivElement, SlideRightProps>(function SlideRight(props, ref) {
  return <Slide ref={ref} from="left" {...props} />;
});

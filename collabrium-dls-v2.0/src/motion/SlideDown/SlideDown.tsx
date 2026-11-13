'use client';

import { forwardRef } from 'react';
import { Slide, type SlideBaseProps } from '../lib/Slide';

export type SlideDownProps = SlideBaseProps;

/**
 * Slides content down into place, starting above it. Fades in while travelling spacing-8 into place; under reduced
 * motion the travel is dropped and only the fade remains.
 */
export const SlideDown = forwardRef<HTMLDivElement, SlideDownProps>(function SlideDown(props, ref) {
  return <Slide ref={ref} from="above" {...props} />;
});

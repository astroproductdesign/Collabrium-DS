'use client';

import { forwardRef } from 'react';
import { Slide, type SlideBaseProps } from '../lib/Slide';

export type SlideLeftProps = SlideBaseProps;

/**
 * Slides content left into place, starting to its right. Fades in while travelling spacing-8 into place; under reduced
 * motion the travel is dropped and only the fade remains.
 */
export const SlideLeft = forwardRef<HTMLDivElement, SlideLeftProps>(function SlideLeft(props, ref) {
  return <Slide ref={ref} from="right" {...props} />;
});

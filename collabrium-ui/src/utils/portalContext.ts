'use client';

import { createContext, useContext } from 'react';

/**
 * Where a popover draws itself. A popover is portalled so a clipped or transformed ancestor cannot move
 * or cut it. The default is the page body; a surface that stacks above the page (the chat window) supplies
 * its own layer, so its popovers stay above it.
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

export const usePortalContainer = () => useContext(PortalContainerContext);

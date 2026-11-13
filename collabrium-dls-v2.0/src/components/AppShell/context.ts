'use client';

import { createContext } from 'react';

/** The shell's size step, from its CSS (`--cui-app-shell-tier`): desktop; tablet (1023px and under); phone (768px and under). */
export type AppShellTier = 'desktop' | 'tablet' | 'phone';

/**
 * Set by AppShell around its nav slot; `null` outside a shell. SidebarNav reads it: an uncontrolled rail is collapsed
 * on a tablet or phone (Q-SHELL-1; App Shell, Responsive and Initial state) and back to its own state on a desktop.
 */
export const AppShellNavContext = createContext<AppShellTier | null>(null);

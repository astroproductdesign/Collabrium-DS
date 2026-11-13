'use client';

/**
 * True when the person has asked their system for reduced motion. It is the
 * hook from the motion library, re-exported so a piece of your own can follow
 * the same rule as everything else here: drop the travel, keep the information.
 */
export { useReducedMotion } from 'motion/react';

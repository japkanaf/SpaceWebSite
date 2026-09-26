/** Shared motion values so every animation on the page feels like one system. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.6,
  slow: 0.9,
} as const;

export const REVEAL_DISTANCE = 24;
export const STAGGER_STEP = 0.08;

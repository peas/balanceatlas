// Shared by ordinary site images and Remotion. No player/runtime dependency.
export const LOOK = {
  cor: 'saturate(.86) contrast(.96) brightness(1.02)',
  pb: 'grayscale(1) contrast(1.06) brightness(1.03)',
  cru: '',
} as const;
export type Look = keyof typeof LOOK;

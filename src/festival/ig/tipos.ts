// Contract between the pieces (pNN-*.tsx), the registry and the page card.
import type { ComponentType } from 'react';
import type { PecaProps } from './kit';

/** One playable unit: a reel, one story frame, or one carousel slide. */
export type Slide = {
  comp: ComponentType<PecaProps>;
  frames: number; // duration at 30 fps (a still photo slide still gets ~90 frames for its slow push)
  w: number;
  h: number;
  capa?: number; // frame shown before play (and the cover to export later); must have the hook on screen
  nome?: string; // short label for the slide button on the page
};

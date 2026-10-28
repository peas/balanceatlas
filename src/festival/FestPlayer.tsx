import { Player } from '@remotion/player';
import { useMemo } from 'react';
import {
  FPS,
  H,
  HERO_FRAMES,
  Hero,
  POSTER_FRAMES,
  POSTER_H,
  POSTER_W,
  Poster,
  type PosterProps,
  TEACHER_FRAMES,
  Teacher,
  W,
} from './compositions';

const COMPS = {
  hero: { component: Hero, frames: HERO_FRAMES, w: W, h: H },
  teacher: { component: Teacher, frames: TEACHER_FRAMES, w: W, h: H },
  poster: { component: Poster, frames: POSTER_FRAMES, w: POSTER_W, h: POSTER_H },
};

export default function FestPlayer({ comp, props }: { comp: keyof typeof COMPS; props?: PosterProps }) {
  const { component, frames, w, h } = COMPS[comp];
  // inputProps must be stable: a new object each render restarts the clock
  const inputProps = useMemo(() => props ?? {}, [JSON.stringify(props)]);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  return (
    <Player
      component={component as React.ComponentType<Record<string, unknown>>}
      inputProps={inputProps}
      durationInFrames={frames}
      fps={FPS}
      compositionWidth={w}
      compositionHeight={h}
      autoPlay={!reduced}
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
  );
}

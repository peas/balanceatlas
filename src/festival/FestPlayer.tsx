import { Player } from '@remotion/player';
import { useMemo } from 'react';
import { FPS, H, HERO_FRAMES, Hero, TEACHER_FRAMES, Teacher, W } from './compositions';

const COMPS = {
  hero: { component: Hero, frames: HERO_FRAMES },
  teacher: { component: Teacher, frames: TEACHER_FRAMES },
};

export default function FestPlayer({ comp }: { comp: keyof typeof COMPS }) {
  const { component, frames } = COMPS[comp];
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  return (
    <Player
      component={component}
      durationInFrames={frames}
      fps={FPS}
      compositionWidth={W}
      compositionHeight={H}
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

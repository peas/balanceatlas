import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef } from 'react';
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
import { LUGAR_SITE_FRAMES, LugarSite } from './ig/p03-lugar';

const COMPS = {
  hero: { component: Hero, frames: HERO_FRAMES, w: W, h: H },
  teacher: { component: Teacher, frames: TEACHER_FRAMES, w: W, h: H },
  poster: { component: Poster, frames: POSTER_FRAMES, w: POSTER_W, h: POSTER_H },
  lugar: { component: LugarSite, frames: LUGAR_SITE_FRAMES, w: 1080, h: 1920 }, // venue tour (Instagram piece 03)
};

export default function FestPlayer({ comp, props }: { comp: keyof typeof COMPS; props?: PosterProps }) {
  const { component, frames, w, h } = COMPS[comp];
  // inputProps must be stable: a new object each render restarts the clock
  const inputProps = useMemo(() => props ?? {}, [JSON.stringify(props)]);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  // Only the players on screen run: six of them decoding video at once made old computers stutter and flicker.
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  useEffect(() => {
    if (reduced || !box.current) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? player.current?.play() : player.current?.pause()), { threshold: 0.15 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <div ref={box} style={{ width: '100%', height: '100%' }}>
    <Player
      ref={player}
      component={component as React.ComponentType<Record<string, unknown>>}
      inputProps={inputProps}
      durationInFrames={frames}
      fps={FPS}
      compositionWidth={w}
      compositionHeight={h}
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
    </div>
  );
}

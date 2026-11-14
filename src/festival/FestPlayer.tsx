import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const still = comp === 'poster' ? props?.img : comp === 'hero' ? '/festival/seg-1.webp'
    : comp === 'teacher' ? '/festival/teacher.webp' : '/festival/ig/tv-sala-vidro.webp';
  const stillImage = () => still ? <img src={still} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: props?.focus ?? 'center' }} /> : null;
  // inputProps must be stable: a new object each render restarts the clock
  const inputProps = useMemo(() => props ?? {}, [JSON.stringify(props)]);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  // Only the players on screen run: six of them decoding video at once made old computers stutter and flicker.
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const [cover, setCover] = useState<{width:number;height:number}>();
  // Match the inner content box, not the border-box aspect ratio. Player defaults
  // to contain, which exposed a thin duplicate fallback strip inside rounded frames.
  useEffect(() => {
    if (!box.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.max(entry.contentRect.width / w, entry.contentRect.height / h);
      setCover({width: Math.ceil(w * scale) + 2, height: Math.ceil(h * scale) + 2});
    });
    observer.observe(box.current);
    return () => observer.disconnect();
  }, [w, h, reduced]);
  useEffect(() => {
    if (reduced || !box.current) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? player.current?.play() : player.current?.pause()), { threshold: 0.15 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [reduced]);
  // Frame zero contains entrance masks/wipes. Never cover the HTML fallback with that
  // frame when iOS Reduce Motion disables playback. Keep a real photograph instead.
  if (reduced) return <div style={{ position: 'absolute', inset: 0 }}>{stillImage()}</div>;
  return (
    <div ref={box} style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
    <Player
      ref={player}
      component={component as React.ComponentType<Record<string, unknown>>}
      inputProps={inputProps}
      durationInFrames={frames}
      fps={FPS}
      compositionWidth={w}
      compositionHeight={h}
      initialFrame={60}
      renderPoster={stillImage}
      showPosterWhenUnplayed
      showPosterWhenBuffering
      errorFallback={stillImage}
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      acknowledgeRemotionLicense
      style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: cover?.width ?? '100%', height: cover?.height ?? '100%' }}
    />
    </div>
  );
}

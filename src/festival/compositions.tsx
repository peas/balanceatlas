// Remotion compositions for the HandstandFest page, played in the browser by @remotion/player.
// Clips come from scripts/festival_clips.sh (720x900, graded, no grain: grain is the overlay here).
// Only DOM transitions (no canvas shaders) so it runs on mobile Safari.
import type { CSSProperties } from 'react';
import {
  AbsoluteFill,
  Html5Video,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { pushCut } from '@remotion/transitions/push-cut';
import { slide } from '@remotion/transitions/slide';
import { iris } from '@remotion/transitions/iris';

export const W = 720;
export const H = 900;
export const FPS = 30;

// Colors come from the page's palette tokens (the Player renders in the page DOM).
const ACCENT = 'var(--accent, #d7f55a)';
const ACCENT_INK = 'var(--accent-ink, #111)';
const STAGE = 'var(--stage, #2b3cf0)';
const CHALK = 'var(--white, #f2efe6)';
const INK = '#111111';
const DISPLAY = "'Archivo', 'Arial Black', sans-serif";
const MONO = "'Space Mono', ui-monospace, monospace";
const WIDE: CSSProperties = { fontFamily: DISPLAY, fontWeight: 900, fontStretch: '125%' };
const T = 15; // transition frames

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

// Film grain: one static tile, jittered every 2 frames (cheap on phones).
const Grain = () => {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 2);
  const x = Math.round(random(`gx${step}`) * 180);
  const y = Math.round(random(`gy${step}`) * 180);
  return (
    <AbsoluteFill
      style={{ backgroundImage: NOISE, backgroundPosition: `${x}px ${y}px`, mixBlendMode: 'overlay', opacity: 0.5 }}
    />
  );
};

const useEnter = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.6 } });
};

// Exit ramp over the last `len` frames of a scene of `dur` frames.
const useExit = (dur: number, len = 10) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [dur - len - T, dur - T], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
};

// Hard geometry: a vertical bar growing from the bottom and a horizontal bar sliding in.
const Bars = ({ dur, side }: { dur: number; side: 'left' | 'right' }) => {
  const grow = useEnter(2, 16);
  const slide = useEnter(9, 16);
  const out = useExit(dur);
  return (
    <>
      <div style={{ position: 'absolute', bottom: 0, [side]: 34, width: 22, height: 520 * grow * out, background: ACCENT }} />
      <div style={{ position: 'absolute', top: 104, [side]: 0, height: 18, width: 300 * slide * out, background: CHALK }} />
    </>
  );
};

const Stamp = ({ text, dur }: { text: string; dur: number }) => {
  const e = useEnter(10, 10);
  const out = useExit(dur);
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        bottom: 56,
        background: ACCENT,
        color: ACCENT_INK,
        ...WIDE,
        fontSize: 40,
        maxWidth: 560,
        lineHeight: 1,
        padding: '10px 18px 8px',
        textTransform: 'uppercase',
        transformOrigin: 'left bottom',
        transform: `translateY(${(1 - e) * 60}px) scaleX(${(0.3 + 0.7 * e) * out})`,
        opacity: Math.min(e * 1.5, 1) * out,
      }}
    >
      {text}
    </div>
  );
};

const Chip = ({ text, delay = 0, style }: { text: string; delay?: number; style?: CSSProperties }) => {
  const e = useEnter(delay, 14);
  return (
    <div
      style={{
        position: 'absolute',
        background: CHALK,
        color: INK,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 26,
        padding: '6px 14px',
        textTransform: 'uppercase',
        transform: `translateX(${(1 - e) * -420}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// Instagram-story style bars: one per scene, filling with global time.
const StoryBars = ({ starts, total }: { starts: number[]; total: number }) => {
  const frame = useCurrentFrame();
  const ends = [...starts.slice(1), total];
  return (
    <div style={{ position: 'absolute', top: 22, left: 24, right: 24, display: 'flex', gap: 8 }}>
      {starts.map((s, i) => (
        <div key={s} style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.35)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              background: '#fff',
              width: `${interpolate(frame, [s, ends[i]], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

type Scene = { src: string; frames: number; rate?: number; stamp: string; tri: 'left' | 'right' };

const HERO: Scene[] = [
  { src: '/festival/seg-1.mp4', frames: 150, stamp: '5 dias', tri: 'right' },
  { src: '/festival/seg-2.mp4', frames: 160, rate: 0.75, stamp: '3 salas', tri: 'left' },
  { src: '/festival/seg-3.mp4', frames: 135, stamp: 'Básico + inter', tri: 'right' },
  { src: '/festival/seg-4.mp4', frames: 180, stamp: 'São Paulo · mar 27', tri: 'left' },
];
const HERO_TRANSITIONS = [
  pushCut({ flashColor: '#fff', flashOpacity: 0.9, flashFrames: 4 }),
  slide({ direction: 'from-bottom' }),
  iris({ width: W, height: H }),
];
const HERO_STARTS = HERO.reduce<number[]>((acc, s, i) => [...acc, i === 0 ? 0 : acc[i - 1] + HERO[i - 1].frames - T], []);
export const HERO_FRAMES = HERO.reduce((n, s) => n + s.frames, 0) - T * (HERO.length - 1);

const SceneView = ({ s }: { s: Scene }) => (
  <AbsoluteFill style={{ background: INK }}>
    <Html5Video src={s.src} muted playbackRate={s.rate ?? 1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <Bars dur={s.frames} side={s.tri} />
    <Stamp text={s.stamp} dur={s.frames} />
  </AbsoluteFill>
);

export const Hero = () => (
  <AbsoluteFill style={{ background: INK, overflow: 'hidden' }}>
    <TransitionSeries>
      {HERO.flatMap((s, i) => [
        <TransitionSeries.Sequence key={s.src} durationInFrames={s.frames}>
          <SceneView s={s} />
        </TransitionSeries.Sequence>,
        ...(i < HERO_TRANSITIONS.length
          ? [<TransitionSeries.Transition key={`t${i}`} presentation={HERO_TRANSITIONS[i]} timing={linearTiming({ durationInFrames: T })} />]
          : []),
      ])}
    </TransitionSeries>
    <Grain />
    <StoryBars starts={HERO_STARTS} total={HERO_FRAMES} />
    <Chip text="Agustin Melesi" delay={6} style={{ top: 48, left: 24 }} />
  </AbsoluteFill>
);

// Teacher card: B&W straddle, orange wipe in, name letters rising.
export const TEACHER_FRAMES = 210;

const Letters = ({ text, delay, size = 96, color = ACCENT }: { text: string; delay: number; size?: number; color?: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: 'flex', ...WIDE, fontSize: size, lineHeight: 0.92, color, textTransform: 'uppercase', whiteSpace: 'pre' }}>
      {[...text].map((ch, i) => {
        const e = spring({ frame: frame - delay - i * 3, fps, config: { damping: 13, mass: 0.5 } });
        return (
          <span key={i} style={{ display: 'inline-block', transform: `translateY(${(1 - e) * 140}px)`, opacity: e }}>
            {ch}
          </span>
        );
      })}
    </div>
  );
};

export const Teacher = () => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [0, 14], [0, 100], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [TEACHER_FRAMES - 12, TEACHER_FRAMES], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ background: INK, overflow: 'hidden' }}>
      <Html5Video src="/festival/teacher.mp4" muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <AbsoluteFill style={{ background: ACCENT, transform: `translateX(${wipe}%)` }} />
      <div style={{ position: 'absolute', left: 32, bottom: 40, opacity: fadeOut }}>
        <Letters text="Agustin" delay={18} />
      </div>
      <Bars dur={TEACHER_FRAMES} side="right" />
      <Grain />
    </AbsoluteFill>
  );
};

// Story-format poster for each invited teacher (after the Rosario festival stories):
// photo with slow zoom and grade, name rising letter by letter, handle chip, a spinning shape, grain.
export const POSTER_W = 540;
export const POSTER_H = 960;
export const POSTER_FRAMES = 180;

export type PosterProps = {
  img?: string; // no photo yet: big burst instead
  first: string;
  last: string;
  handle: string;
  shape: 'bar' | 'tee' | 'block';
  focus?: string; // object-position of the photo
};

const Shape = ({ shape }: { shape: PosterProps['shape'] }) => {
  const a = useEnter(8, 16);
  const b = useEnter(16, 16);
  if (shape === 'bar')
    return <div style={{ position: 'absolute', right: 36, bottom: 0, width: 26, height: 640 * a, background: ACCENT }} />;
  if (shape === 'tee')
    return (
      <>
        <div style={{ position: 'absolute', right: 0, top: 300, height: 24, width: 260 * a, background: ACCENT }} />
        <div style={{ position: 'absolute', right: 118, top: 300, width: 24, height: 300 * b, background: ACCENT }} />
      </>
    );
  return <div style={{ position: 'absolute', right: 0, top: 290, width: 180 * a, height: 180, background: ACCENT }} />;
};

// Wide type: shrink long names so they fit the 540px card
const fit = (...words: string[]) => Math.min(72, Math.floor(470 / (Math.max(...words.map((w) => w.length)) * 0.82)));

export const Poster = ({ img, first, last, handle, shape, focus = 'center' }: PosterProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 16], [100, 0], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, POSTER_FRAMES], [1.12, 1]);
  const out = interpolate(frame, [POSTER_FRAMES - 14, POSTER_FRAMES], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ background: STAGE, overflow: 'hidden' }}>
      <AbsoluteFill style={{ clipPath: `inset(${reveal}% 0 0 0)` }}>
        {img ? (
        <img
          src={img}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, transform: `scale(${zoom})`, filter: 'contrast(1.1) saturate(.8) sepia(.12)' }}
        />
        ) : (
          <>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${42 * zoom}%`, background: ACCENT }} />
            <div style={{ position: 'absolute', left: 60, bottom: 0, width: 40, height: `${(70 - 30 * (zoom - 1) * 8)}%`, background: CHALK }} />
          </>
        )}
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0) 70%, rgba(0,0,0,.5) 100%)' }} />
      </AbsoluteFill>
      {img && <Shape shape={shape} />}
      <div style={{ position: 'absolute', left: 28, top: 70, opacity: out }}>
        <Letters text={first} delay={10} size={fit(first, last)} />
        <Letters text={last} delay={18} size={fit(first, last)} color={CHALK} />
      </div>
      {handle && <Chip text={handle} delay={26} style={{ left: 28, top: 30, fontSize: 20, opacity: out }} />}
      <div style={{ position: 'absolute', left: 28, bottom: 34, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: 0.5, textTransform: 'uppercase', opacity: out }}>
        1º HandstandFest · São Paulo · mar 2027
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

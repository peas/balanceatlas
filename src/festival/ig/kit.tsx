import { VENDA } from '../data';
import { getRemotionEnvironment, staticFile } from 'remotion';
// Shared kit for the HandstandFest Instagram pieces (/festival/instagram).
// Pure Remotion, played by @remotion/player on the page: nothing is rendered to MP4 yet (the palette is still open),
// so every colour is a CSS variable of the page. Sizes here are for a 1080-wide canvas.
//
// Rules the pieces follow (research of 05/11/2026, Drive pesquisas/instagram-evento-formatos-playbook.md):
//  - the hook text is ON SCREEN AT FRAME 0 (no fade-in from nothing); what/when/where before ~8 s
//  - text and faces stay inside SAFE; bars and blocks come and go
//  - the larger HF seal signs the closing card and Stories (current direction in ig2/README.md)
//  - no music in the composition (it is added in the app at upload); voice and room sound only
//  - overlays never cover the body of the person in the handstand (Paulo, 04/11/2026)
import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import {
  AbsoluteFill,
  Easing,
  Html5Video,
  Img,
  continueRender,
  delayRender,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ACCENT, ACCENT_INK, CHALK, Grain, INK, MONO, STAGE, WIDE } from '../compositions';
import { CIRCULO, HF } from '../pincel';
import { BrushStroke } from '../Brush';
import { FEST } from '../data';

export { ACCENT, ACCENT_INK, CHALK, Grain, INK, MONO, STAGE, WIDE };
export const LIVE = 'var(--live, var(--accent, #ffd23f))';

export const FPS = 30;
export const REEL = { w: 1080, h: 1920 }; // reels and stories
export const CARD = { w: 1080, h: 1440 }; // carousel slide, 3:4 (what the profile grid shows)
export const MEDIA = getRemotionEnvironment().isRendering ? staticFile('festival/ig') : '/festival/ig'; // web clips (540x960), photos and pose files: see scripts/festival_ig_midia.py
export const f = (seconds: number) => Math.round(seconds * FPS);

export type Formato = 'reel' | 'story' | 'card';
// Working review margins, not platform specifications. UI varies by device and placement.
// y1 is conservative; yMax and the right column require checking in the actual uploader.
export const SAFE: Record<Formato, { x0: number; x1: number; y0: number; y1: number; yMax: number }> = {
  reel: { x0: 65, x1: 950, y0: 269, y1: 1248, yMax: 1500 },
  story: { x0: 65, x1: 1015, y0: 250, y1: 1580, yMax: 1580 },
  card: { x0: 60, x1: 1020, y0: 60, y1: 1380, yMax: 1380 },
};
export const COVER = { y0: 240, y1: 1680 }; // centre 3:4 of a reel: the part the grid shows

export type PecaProps = { guides?: boolean };

// ---------- motion helpers ----------
export const useIn = (delay = 0, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.6 } });
};
/** 1 until `at`, then down to 0 over `len` frames. */
export const useOut = (at: number, len = 8) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [at, at + len], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
};

// ---------- frame ----------
/** Root of every piece: ink background, grain on top, optional safe-zone guides (toggle on the page). */
export const Quadro = ({ formato, guides, children, grain = true }: { formato: Formato; guides?: boolean; children: ReactNode; grain?: boolean }) => (
  <AbsoluteFill style={{ background: INK, overflow: 'hidden' }}>
    {children}
    {grain && <Grain />}
    {guides && <Guias formato={formato} />}
  </AbsoluteFill>
);

const Guias = ({ formato }: { formato: Formato }) => {
  const z = SAFE[formato];
  const box = (y1: number, color: string, dash: string): CSSProperties => ({
    position: 'absolute', left: z.x0, top: z.y0, width: z.x1 - z.x0, height: y1 - z.y0, border: `3px ${dash} ${color}`, boxSizing: 'border-box',
  });
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 1000 }}>
      {formato !== 'card' && <>
        <div style={{position:'absolute',inset:'0 0 auto',height:250,background:'rgba(230,40,70,.25)'}} />
        <div style={{position:'absolute',inset:'auto 0 0',height:formato==='reel'?400:340,background:'rgba(230,40,70,.25)'}} />
        {formato==='reel'&&<div style={{position:'absolute',right:0,top:550,bottom:400,width:150,background:'rgba(230,40,70,.25)'}}/>}
        <div style={{position:'absolute',top:90,left:65,color:'white',background:'#123d33',padding:14,font:'30px monospace'}}>GUIA APROXIMADA · CONFERIR NO APP</div>
      </>}
      <div style={box(z.yMax, 'rgba(255,255,255,.55)', 'dashed')} />
      <div style={box(z.y1, '#00e5ff', 'solid')} />
      {formato === 'reel' && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: COVER.y0, height: 2, background: '#ff3bd4' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: COVER.y1, height: 2, background: '#ff3bd4' }} />
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- footage ----------
export type ClipProps = {
  src: string; // web clip name in MEDIA, without extension
  from?: number; // seconds into the web clip where this shot starts
  rate?: number;
  volume?: number; // 0 = muted (default)
  zoom?: [number, number]; // scale at the first and last frame of the enclosing <Sequence>
  focus?: [number, number]; // % of the clip that stays put while zooming, and vertical anchor when cropping
  aspect?: number; // height / width of the clip (default 16/9 portrait)
  look?: Look; // photo treatment (default 'cor'); see LOOK
  filter?: string; // extra CSS filter on top of the look (e.g. 'brightness(.5)' behind text)
  children?: ReactNode; // drawn in the clip's own box (so a <Esqueleto> follows zoom and crop)
};
/** Photo treatment (MARCA.md, 10/11/2026), same values as --foto-cor / --foto-pb in festival.css.
 *  cor = softened natural colour, the base; pb = moderate black and white, for backdrops behind text and a few
 *  movement shots (brand colour stays on the type and blocks); cru = untouched. No sepia, duotone or added grain. */
import { LOOK, type Look } from '../photo-look';
export { LOOK, type Look } from '../photo-look';
const lookFilter = (look: Look = 'cor', filter?: string) => [LOOK[look], filter].filter(Boolean).join(' ') || undefined;

/** A shot. The clip covers the canvas; on a 3:4 card it is cropped vertically around `focus[1]`. */
export const Clip = ({ src, from = 0, rate = 1, volume = 0, zoom = [1, 1], focus = [50, 50], aspect = 16 / 9, look, filter, children }: ClipProps) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const z = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], zoom, { extrapolateRight: 'clamp' });
  const boxH = Math.max(height, width * aspect);
  const boxW = boxH / aspect;
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: INK }}>
      <div
        style={{
          position: 'absolute', width: boxW, height: boxH,
          left: -(boxW - width) * (focus[0] / 100), top: -(boxH - height) * (focus[1] / 100),
          transform: `scale(${z})`, transformOrigin: `${focus[0]}% ${focus[1]}%`,
        }}
      >
        <Html5Video
          src={`${MEDIA}/${src}.mp4`} trimBefore={f(from)} playbackRate={rate} muted={volume === 0} volume={volume} pauseWhenBuffering
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: lookFilter(look, filter) }}
        />
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** A still photo with a slow push (Ken Burns). `src` is a file name in MEDIA (with extension). */
export const Foto = ({ src, zoom = [1.04, 1.12], focus = [50, 50], look, filter }: { src: string; zoom?: [number, number]; focus?: [number, number]; look?: Look; filter?: string }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const z = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], zoom, { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: INK }}>
      <Img src={`${MEDIA}/${src}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${focus[0]}% ${focus[1]}%`, transform: `scale(${z})`, transformOrigin: `${focus[0]}% ${focus[1]}%`, filter: lookFilter(look, filter) }} />
    </AbsoluteFill>
  );
};

/** Two phones on the same moment. Both clips are cut to start at the same instant, stay mounted and in sync;
 *  `cuts` says which one is on top from each second on. The sound comes from `audio` only. */
export const DuasCameras = ({ a, b, from = 0, cuts, audio = 'a', volume = 0, flash = true, children }: {
  a: Omit<ClipProps, 'from' | 'volume'>; b: Omit<ClipProps, 'from' | 'volume'>; from?: number;
  cuts: { at: number; cam: 'a' | 'b' }[]; audio?: 'a' | 'b'; volume?: number; flash?: boolean; children?: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const now = [...cuts].reverse().find((c) => frame >= f(c.at)) ?? cuts[0];
  const since = frame - f(now.at);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: now.cam === 'a' ? 1 : 0 }}><Clip {...a} from={from} volume={audio === 'a' ? volume : 0} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: now.cam === 'b' ? 1 : 0 }}><Clip {...b} from={from} volume={audio === 'b' ? volume : 0} /></AbsoluteFill>
      {flash && now !== cuts[0] && since < 3 && <AbsoluteFill style={{ background: '#fff', opacity: 0.55 - since * 0.18 }} />}
      {children}
    </AbsoluteFill>
  );
};

// ---------- pose ----------
// public/festival/ig/pose/<name>.json, written by scripts/festival_ig_midia.py for a web clip:
// frames[i] is the pose at second i / fps of the web clip, as [x, y, vis] per joint in JOINTS order (x, y in 0..1).
export type Pose = { fps: number; frames: (number[] | null)[] };
export const JOINTS = ['ombroE', 'ombroD', 'cotoveloE', 'cotoveloD', 'pulsoE', 'pulsoD', 'quadrilE', 'quadrilD', 'joelhoE', 'joelhoD', 'tornozeloE', 'tornozeloD'] as const;
const BONES: [number, number][] = [[0, 1], [0, 2], [2, 4], [1, 3], [3, 5], [0, 6], [1, 7], [6, 7], [6, 8], [8, 10], [7, 9], [9, 11]];

export const usePose = (name?: string): Pose | null => {
  const [pose, setPose] = useState<Pose | null>(null);
  const [handle] = useState(() => (name ? delayRender(`pose ${name}`) : null));
  useEffect(() => {
    if (!name) return;
    let on = true;
    fetch(`${MEDIA}/pose/${name}.json`)
      .then((r) => r.json())
      .then((d) => on && setPose(d))
      .catch(() => undefined)
      .finally(() => handle !== null && continueRender(handle));
    return () => { on = false; };
  }, [name, handle]);
  return pose;
};

/** Joints at a second of the web clip (linear interpolation between samples), or null where there is no pose. */
export const poseEm = (pose: Pose | null, second: number): [number, number, number][] | null => {
  if (!pose) return null;
  const x = second * pose.fps;
  const a = pose.frames[Math.floor(x)], b = pose.frames[Math.min(pose.frames.length - 1, Math.floor(x) + 1)];
  if (!a) return null;
  const k = b ? x - Math.floor(x) : 0;
  return JOINTS.map((_, j) => [0, 1, 2].map((c) => a[j * 3 + c] + ((b ?? a)[j * 3 + c] - a[j * 3 + c]) * k) as [number, number, number]);
};

/** Skeleton over a clip. Put it INSIDE <Clip> so it follows zoom and crop. `from` and `rate` must match the Clip. */
export const Esqueleto = ({ pose, from = 0, rate = 1, color = ACCENT, dots = CHALK, prumo = false, glow = false, weight = 1, aspect = 16 / 9 }: {
  pose: string; from?: number; rate?: number; color?: string; dots?: string; prumo?: boolean; glow?: boolean; weight?: number; aspect?: number;
}) => {
  const frame = useCurrentFrame();
  const pts = poseEm(usePose(pose), from + (frame / FPS) * rate);
  if (!pts) return null;
  const W = 9, H = 9 * aspect; // uniform units, so circles stay round
  const p = (i: number) => [pts[i][0] * W, pts[i][1] * H];
  const ok = (i: number) => pts[i][2] > 0.45;
  const wx = (pts[4][0] + pts[5][0]) / 2 * W, wy = (pts[4][1] + pts[5][1]) / 2 * H;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: glow ? `drop-shadow(0 0 10px ${color})` : undefined }}>
      {prumo && ok(4) && ok(5) && <line x1={wx} y1={wy} x2={wx} y2={0} stroke={CHALK} strokeWidth={0.03 * weight} strokeDasharray="0.16 0.12" opacity={0.85} />}
      {BONES.map(([a, b], i) => ok(a) && ok(b) && <line key={i} x1={p(a)[0]} y1={p(a)[1]} x2={p(b)[0]} y2={p(b)[1]} stroke={color} strokeWidth={0.075 * weight} strokeLinecap="square" />)}
      {JOINTS.map((_, i) => ok(i) && <rect key={i} x={p(i)[0] - 0.075 * weight} y={p(i)[1] - 0.075 * weight} width={0.15 * weight} height={0.15 * weight} fill={dots} />)}
    </svg>
  );
};

// ---------- type and geometry ----------
type Tom = 'accent' | 'chalk' | 'stage' | 'ink';
const TOM: Record<Tom, { bg: string; fg: string }> = {
  accent: { bg: ACCENT, fg: ACCENT_INK }, chalk: { bg: CHALK, fg: INK }, stage: { bg: STAGE, fg: CHALK }, ink: { bg: INK, fg: CHALK },
};

/** The hook: one brush stroke per line, wide Archivo, fully visible at frame 0 unless `delay` is given.
 *  Lines leave one by one from `outAt` (frame) if set. */
export const Gancho = ({ lines, x = 65, y = 300, size = 104, tom = 'accent', tons, delay, outAt, align = 'left' }: {
  lines: string[]; x?: number; y?: number; size?: number; tom?: Tom; tons?: Tom[]; delay?: number; outAt?: number; align?: 'left' | 'right';
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: 'absolute', [align]: x, top: y, display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : 'flex-end', gap: 10 }}>
      {lines.map((line, i) => {
        const t = TOM[tons?.[i] ?? tom];
        const enter = delay === undefined ? 1 : spring({ frame: frame - delay - i * 4, fps, config: { damping: 16, mass: 0.6 } });
        const leave = outAt === undefined ? 1 : interpolate(frame, [outAt + i * 3, outAt + i * 3 + 7], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{
            ...WIDE, position: 'relative', fontSize: size, lineHeight: 1, textTransform: 'uppercase', color: t.fg, padding: `${size * 0.14}px ${size * 0.22}px ${size * 0.08}px`,
            whiteSpace: 'nowrap', transformOrigin: `${align} center`, transform: `scaleX(${enter * leave})`, opacity: enter * leave > 0.02 ? 1 : 0,
          }}>
            {/* Text and brush share this exact entrance/exit transform: never show an empty highlight first. */}
            <BrushStroke color={t.bg} style={{ position: 'absolute', left: '-2%', top: '-9%', width: '104%', height: '118%', transform: i % 2 ? 'scaleY(-1)' : undefined }} />
            <span style={{ position: 'relative' }}>{line}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Mono chip (handles, places, small facts). */
export const Etiqueta = ({ text, x, y, delay = 0, outAt, tom = 'chalk', size = 34, from = 'left' }: {
  text: string; x: number; y: number; delay?: number; outAt?: number; tom?: Tom; size?: number; from?: 'left' | 'right';
}) => {
  const e = useIn(delay);
  const out = useOut(outAt ?? 1e9);
  const t = TOM[tom];
  return (
    <div style={{
      position: 'absolute', [from]: x, top: y, background: t.bg, color: t.fg, fontFamily: MONO, fontWeight: 700, fontSize: size, lineHeight: 1.1,
      padding: `${size * 0.28}px ${size * 0.5}px`, textTransform: 'uppercase', whiteSpace: 'nowrap',
      transform: `translateX(${(1 - e) * (from === 'left' ? -1 : 1) * 700}px)`, opacity: out,
    }}>{text}</div>
  );
};

/** Hard geometry: a vertical bar that grows from the bottom and a horizontal one that slides in. They leave at `outAt`. */
export const Barras = ({ side = 'left', delay = 2, outAt, v = 760, h = 420, y = 150, tom = 'accent' }: {
  side?: 'left' | 'right'; delay?: number; outAt?: number; v?: number; h?: number; y?: number; tom?: Tom;
}) => {
  const grow = useIn(delay, 18);
  const slide = useIn(delay + 7, 18);
  const out = useOut(outAt ?? 1e9, 10);
  return (
    <>
      <div style={{ position: 'absolute', bottom: 0, [side]: 48, width: 32, height: v * grow * out, background: TOM[tom].bg }} />
      <div style={{ position: 'absolute', top: y, [side]: 0, height: 26, width: h * slide * out, background: CHALK }} />
    </>
  );
};

/** A block of colour that wipes across the whole canvas (scene change, or the base of a graphic slide). */
export const Cortina = ({ at = 0, len = 12, tom = 'accent', dir = 'right', hold = 0 }: { at?: number; len?: number; tom?: Tom; dir?: 'right' | 'left' | 'up' | 'down'; hold?: number }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
  // two ramps (one interpolate with hold = 0 would repeat a point in its input range, which Remotion rejects)
  const p = frame < at + len + hold ? interpolate(frame, [at, at + len], [-100, 0], clamp) : interpolate(frame, [at + len + hold, at + len * 2 + hold], [0, 100], clamp);
  const sign = dir === 'right' || dir === 'down' ? 1 : -1;
  const axis = dir === 'right' || dir === 'left' ? 'X' : 'Y';
  return <AbsoluteFill style={{ background: TOM[tom].bg, transform: `translate${axis}(${p * sign}%)` }} />;
};

/** Instagram-story progress bars as a design cue (one per scene). Keep them out of real Stories: the app draws its own. */
export const BarrasStory = ({ starts, total, y = 215 }: { starts: number[]; total: number; y?: number }) => {
  const frame = useCurrentFrame();
  const ends = [...starts.slice(1), total];
  return (
    <div style={{ position: 'absolute', top: y, left: 65, right: 130, display: 'flex', gap: 10 }}>
      {starts.map((s0, i) => (
        <div key={s0} style={{ flex: 1, height: 8, background: 'rgba(255,255,255,.35)', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#fff', width: `${interpolate(frame, [s0, ends[i]], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%` }} />
        </div>
      ))}
    </div>
  );
};

/** Hold timer: counts seconds from `from` to `to` (frames) and freezes; shown as a mono block. */
export const Cronometro = ({ from, to, x, y, label = 'hold', size = 96, tom = 'ink' }: { from: number; to: number; x: number; y: number; label?: string; size?: number; tom?: Tom }) => {
  const frame = useCurrentFrame();
  if (frame < from) return null;
  const sec = (Math.min(frame, to) - from) / FPS;
  const t = TOM[tom];
  const done = frame >= to;
  return (
    <div style={{ position: 'absolute', left: x, top: y, background: done ? ACCENT : t.bg, color: done ? ACCENT_INK : t.fg, fontFamily: MONO, fontWeight: 700, padding: `${size * 0.12}px ${size * 0.26}px`, lineHeight: 1 }}>
      <div style={{ fontSize: size * 0.3, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: size, fontVariantNumeric: 'tabular-nums' }}>{sec.toFixed(1).replace('.', ',')}<span style={{ fontSize: size * 0.45 }}> s</span></div>
    </div>
  );
};

// ---------- speech ----------
export type Palavra = { t: number; d: number; w: string }; // seconds of the web clip, duration, word
/** Burnt-in captions, up to 4 words per page (break on punctuation or a pause over 0.5 s); the word being said is in
 *  the accent colour. `from` = second of the web clip at frame 0 of the enclosing <Sequence>. */
export const Legenda = ({ words, from = 0, y = 1130, size = 66 }: { words: Palavra[]; from?: number; y?: number; size?: number }) => {
  const frame = useCurrentFrame();
  const now = from + frame / FPS;
  const pages: Palavra[][] = [];
  for (const w of words) {
    const page = pages[pages.length - 1];
    const prev = page?.[page.length - 1];
    if (!page || page.length >= 4 || /[.,!?:;]$/.test(prev.w) || w.t - (prev.t + prev.d) > 0.5) pages.push([w]);
    else page.push(w);
  }
  const page = pages.find((p) => now >= p[0].t - 0.05 && now < p[p.length - 1].t + p[p.length - 1].d + 0.25);
  if (!page) return null;
  return (
    <div style={{ position: 'absolute', left: SAFE.reel.x0, width: SAFE.reel.x1 - SAFE.reel.x0, top: y, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: `6px ${size * 0.28}px` }}>
      {page.map((w, i) => {
        const on = now >= w.t && now < w.t + w.d + 0.08;
        return (
          <span key={i} style={{ ...WIDE, fontSize: size, lineHeight: 1.05, textTransform: 'uppercase', whiteSpace: 'pre', color: on ? ACCENT_INK : CHALK, background: on ? ACCENT : INK, padding: `${size * 0.1}px ${size * 0.16}px ${size * 0.04}px` }}>{w.w}</span>
        );
      })}
    </div>
  );
};

// ---------- closing and carousel chrome ----------
export const QUANDO_CURTO = `${FEST.dias[0]} — ${FEST.dias[2]} ${FEST.mesCurto} ${FEST.ano}`;

/** The only place where the logo appears. Full stage colour, lockup, date, place, one call to action. */
export const Fecho = ({ cta = 'Link na bio', sub = `1º lote · R$ ${VENDA.preco} + taxa · 10 vagas`, formato = 'reel' }: { cta?: string; sub?: string; formato?: Formato }) => {
  const a = useIn(0, 18), b = useIn(6, 16), c = useIn(14, 16);
  const top = formato === 'card' ? 150 : SAFE[formato].y0 + 60;
  const line: CSSProperties = { ...WIDE, textTransform: 'uppercase', lineHeight: 0.86, fontSize: 194, letterSpacing: -3 };
  return (
    <AbsoluteFill style={{ background: STAGE, color: CHALK }}>
      <div style={{ position: 'absolute', left: 65, top, transform: `translateY(${(1 - a) * 80}px)`, opacity: a }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 26 }}>
          <Selo size={220} />
          <div style={{ border: `6px solid ${ACCENT}`, color: ACCENT, ...WIDE, fontSize: 76, lineHeight: 1, padding: '14px 20px 6px' }}>1º</div>
        </div>
        <div style={line}>Hand</div>
        <div style={{ ...line, color: ACCENT }}>stand</div>
        <div style={line}>Fest</div>
      </div>
      {/* one column, so a long `sub` wraps without running into the call to action */}
      <div style={{ position: 'absolute', left: 65, top: top + 745, width: 900, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 30 }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 44, lineHeight: 1.28, textTransform: 'uppercase', transform: `translateX(${(1 - b) * -600}px)` }}>
          <div>{QUANDO_CURTO}</div>
          <div>São Paulo · Trapézio Voador</div>
          {sub && <div style={{ color: ACCENT }}>{sub}</div>}
        </div>
        <div style={{ background: CHALK, color: INK, ...WIDE, fontSize: 60, lineHeight: 1, padding: '20px 30px 12px', textTransform: 'uppercase', transformOrigin: 'left center', transform: `scaleX(${c})` }}>
          {cta} →
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** The HF letters on the painted circle (Gabriel's idea, 10/11/2026). The brush turns once (a wedge sweeps the
 *  circle open over `giro` frames, starting at `from`), then the straight letters land on it. */
export const Selo = ({ size = 230, from = 0, giro = 16 }: { size?: number; from?: number; giro?: number }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [from, from + giro], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const hf = interpolate(frame, [from + giro - 4, from + giro + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6)) });
  // wedge from 10 o'clock, clockwise; points on a square larger than the box so the bristles are not clipped
  const id = useId();
  const pts = ['100,100'];
  for (let i = 0; i <= 24; i++) {
    const a = -2.5 + (Math.PI * 2 * t * i) / 24;
    pts.push(`${100 + 160 * Math.cos(a)},${100 + 160 * Math.sin(a)}`);
  }
  return (
    <svg viewBox="0 0 200 200" style={{ width: size, height: size, display: 'block', overflow: 'visible', flex: 'none' }}>
      <clipPath id={id}><polygon points={pts.join(' ')} /></clipPath>
      <g clipPath={t >= 1 ? undefined : `url(#${id})`}>
        <path d={CIRCULO.corpo} transform={CIRCULO.transform} fill={ACCENT} />
      </g>
      <g opacity={Math.min(1, hf * 2)} transform={`translate(100,100) scale(${hf}) translate(-100,-100)`}>
        <path d={HF.d} transform={HF.transform} fill={STAGE} />
      </g>
    </svg>
  );
};

/** Carousel slide chrome: page counter and, on the first slide, the swipe hint. */
export const Lamina = ({ n, total, children, guides, grain = true }: { n: number; total: number; children: ReactNode; guides?: boolean; grain?: boolean }) => (
  <Quadro formato="card" guides={guides} grain={grain}>
    {children}
    <div style={{ position: 'absolute', right: 60, top: 60, background: INK, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 30, padding: '8px 14px' }}>{n}/{total}</div>
    {n === 1 && <div style={{ position: 'absolute', right: 60, bottom: 60, background: CHALK, color: INK, fontFamily: MONO, fontWeight: 700, fontSize: 32, padding: '10px 18px', textTransform: 'uppercase' }}>arrasta →</div>}
  </Quadro>
);

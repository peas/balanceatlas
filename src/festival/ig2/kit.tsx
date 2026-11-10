// Alternative Instagram direction. Keep the existing ig/ pieces unchanged.
import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Easing, Html5Video, Img, interpolate, useCurrentFrame, getRemotionEnvironment, staticFile } from 'remotion';
import { ACCENT, CHALK, INK, MONO, STAGE, WIDE, LOOK, Quadro, Selo, f, type Formato, type Look } from '../ig/kit';
import { BrushStroke } from '../Brush';
import { QUANDO } from '../data';
export { ACCENT, CHALK, INK, MONO, STAGE, WIDE, f };
export type Treatment = 'direction' | Look;
export type PieceProps = { guides?: boolean; treatment?: Treatment };
export const move = (frame: number, start = 0, length = 18) => interpolate(frame, [start, start + length], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

export function Canvas({ children, guides, format = 'reel', dark = false }: PieceProps & { children: ReactNode; format?: Formato; dark?: boolean }) {
  return <Quadro formato={format} guides={guides} grain={false}><AbsoluteFill data-ig2-canvas style={{ background: dark ? STAGE : CHALK, color: dark ? CHALK : STAGE }}>{children}</AbsoluteFill></Quadro>;
}
export function Label({ children, x = 65, y, color = STAGE, size = 42, style }: { children: ReactNode; x?: number; y: number; color?: string; size?: number; style?: CSSProperties }) {
  return <div data-ig2-text style={{ position: 'absolute', left: x, top: y, color, fontFamily: MONO, fontSize: size, lineHeight: 1.4, fontWeight: 700, ...style }}>{children}</div>;
}
// The letters are visible from frame zero. Only the stroke reveals; one gesture per scene.
export function Headline({ lines, x = 65, y = 290, size = 80, accentLine = -1, dark = false, width = 885 }: { lines: string[]; x?: number; y?: number; size?: number; accentLine?: number; dark?: boolean; width?: number }) {
  const frame = useCurrentFrame();
  return <div style={{ position: 'absolute', left: x, top: y, width, ...WIDE, fontSize: size, lineHeight: 1.02, letterSpacing: '-.035em', textTransform: 'uppercase', color: dark ? CHALK : STAGE }}>
    {lines.map((line, i) => <div key={i} style={{ position: 'relative', width: 'fit-content', maxWidth: '100%', whiteSpace: 'nowrap', padding: '4px 0' }}>
      {i === accentLine && <BrushStroke color={ACCENT} style={{ position: 'absolute', left: -15, top: -4, width: 'calc(100% + 30px)', height: 'calc(100% + 10px)', clipPath: `inset(0 ${(1 - move(frame, 5, 18)) * 100}% 0 0)` }} />}
      <span data-ig2-text style={{ position: 'relative', color: i === accentLine && !dark ? STAGE : undefined }}>{line}</span>
    </div>)}
  </div>;
}
// Explicit windows, not the old full-canvas Clip: crop/contain choices are scene-specific.
export function Media({ src, photo = false, x = 65, y = 600, w = 885, h = 950, from = 0, treatment = 'direction', look = 'cor', contain = false }: {
  src: string; photo?: boolean; x?: number; y?: number; w?: number; h?: number; from?: number; treatment?: Treatment; look?: Look; contain?: boolean;
}) {
  const path = `/festival/ig/${src}${photo ? '' : '.mp4'}`;
  const mediaUrl = getRemotionEnvironment().isPlayer ? path : staticFile(path);
  const filter = LOOK[treatment === 'direction' ? look : treatment];
  const style: CSSProperties = { width: '100%', height: '100%', objectFit: contain ? 'contain' : 'cover', objectPosition: '50% 50%', filter };
  return <div data-ig2-media style={{ position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', background: contain ? 'transparent' : STAGE }}>
    {photo ? <Img src={mediaUrl} alt="" style={style} /> : <Html5Video src={mediaUrl} trimBefore={f(from)} muted pauseWhenBuffering style={style} />}
  </div>;
}
export function Facts({ y = 505, dark = false }: { y?: number; dark?: boolean }) {
  return <Label y={y} size={42} color={dark ? CHALK : STAGE}>{QUANDO.toUpperCase()} · SÃO PAULO</Label>;
}
export function EndCard({ guides, format = 'reel', cta = 'Vem junto.' }: PieceProps & { format?: Formato; cta?: string }) {
  const card = format === 'card';
  const frame = useCurrentFrame();
  return <Canvas guides={guides} format={format} dark>
    <div style={{ position: 'absolute', left: 340, top: card ? 100 : 275, transform: `rotate(${interpolate(move(frame, 0, 26), [0, 1], [-12, 0])}deg)` }}><Selo size={340} giro={24} /></div>
    <Headline lines={['HANDSTAND', 'FEST']} y={card ? 510 : 720} size={97} dark />
    <Label y={card ? 775 : 990} size={48} color={ACCENT}>{QUANDO.toUpperCase()}</Label>
    <Label y={card ? 850 : 1065} size={42} color={CHALK}>TRAPÉZIO VOADOR<br />SÃO PAULO</Label>
    <Label y={card ? 1070 : 1240} size={48} color={CHALK} style={{ borderTop: `3px solid ${ACCENT}`, width: 885, paddingTop: 28 }}>{cta}</Label>
  </Canvas>;
}

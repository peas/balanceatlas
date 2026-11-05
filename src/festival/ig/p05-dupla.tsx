// 05 · Reel "Treinar junto": two skeletons, then two cameras on the same moment, muted. Spec in PECAS.md.
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { ACCENT, Barras, CHALK, Clip, DuasCameras, Esqueleto, Etiqueta, Fecho, Gancho, INK, LIVE, MONO, QUANDO_CURTO, Quadro, REEL, f, useIn, type PecaProps } from './kit';
import type { Slide } from './tipos';

const TOTAL = f(23.0);

/** 3-frame white flash on the incoming shot of a hard cut. */
const Flash = () => {
  const frame = useCurrentFrame();
  if (frame >= 3) return null;
  return <AbsoluteFill style={{ background: '#fff', opacity: interpolate(frame, [0, 3], [0.5, 0]) }} />;
};

/** Chip "câmera N": ink Etiqueta (size 30) at x 65 y 290 with a LIVE square before the text. */
const Camera = ({ n }: { n: 1 | 2 }) => {
  const e = useIn(0);
  const size = 30;
  return (
    <div style={{
      position: 'absolute', left: 65, top: 290, display: 'flex', alignItems: 'center', gap: 12, background: INK, color: CHALK,
      fontFamily: MONO, fontWeight: 700, fontSize: size, lineHeight: 1.1, padding: `${size * 0.28}px ${size * 0.5}px`,
      textTransform: 'uppercase', whiteSpace: 'nowrap', transform: `translateX(${(1 - e) * -700}px)`,
    }}>
      <span style={{ width: 16, height: 16, background: LIVE }} />câmera {n}
    </div>
  );
};

/** An Etiqueta that exists only between two seconds of its scene (fades out over its last 8 frames). */
const Janela = ({ de, ate, ...p }: { de: number; ate: number; text: string; tom: 'accent' | 'chalk'; size: number }) => {
  const dur = f(ate) - f(de);
  return (
    <Sequence from={f(de)} durationInFrames={dur} layout="none">
      <Etiqueta {...p} x={65} y={370} outAt={dur - 8} />
    </Sequence>
  );
};

const CORTES_S2 = [0, 2.4, 4.6, 7.4];
const DUR_S2 = 9.0;

const S1 = () => (
  <>
    <Clip src="dupla-reta" from={0.4}>
      <Sequence from={f(1.6)} layout="none">
        <Esqueleto pose="dupla-reta-esq" from={0.4 + 1.6} color={ACCENT} dots={CHALK} />
        <Esqueleto pose="dupla-reta-dir" from={0.4 + 1.6} color={CHALK} dots={ACCENT} />
      </Sequence>
    </Clip>
    {/* size 75 (spec 84): "TREINAR JUNTO." would pass x 950 */}
    <Gancho lines={['Gente para', 'treinar junto.']} size={75} y={290} tom="accent" outAt={f(3.2)} />
    <Barras side="right" outAt={f(6.0)} />
  </>
);

const S2 = () => (
  <>
    <DuasCameras a={{ src: 'dupla-a' }} b={{ src: 'dupla-b' }} from={0} cuts={CORTES_S2.map((at, i) => ({ at, cam: i % 2 ? 'b' : 'a' }))} />
    {CORTES_S2.map((at, i) => (
      <Sequence key={at} from={f(at)} durationInFrames={f(CORTES_S2[i + 1] ?? DUR_S2) - f(at)} layout="none">
        <Camera n={i % 2 ? 2 : 1} />
      </Sequence>
    ))}
    <Janela de={1.0} ate={4.4} text={QUANDO_CURTO} tom="accent" size={38} />
    <Janela de={4.8} ate={8.6} text="Trapézio Voador · São Paulo" tom="chalk" size={34} />
    <Flash />
  </>
);

const S3 = () => (
  <>
    <DuasCameras a={{ src: 'dupla-a' }} b={{ src: 'dupla-b' }} from={15.0} cuts={[{ at: 0, cam: 'a' }, { at: 2.0, cam: 'b' }]} />
    {/* size 101 (spec 120): "VEM JUNTO." would pass x 950 */}
    <Gancho lines={['Vem junto.']} size={101} y={290} tom="accent" delay={f(2.2)} />
    <Flash />
  </>
);

const Dupla = ({ guides }: PecaProps) => (
  <Quadro formato="reel" guides={guides}>
    <Sequence from={0} durationInFrames={f(6.6)}><S1 /></Sequence>
    <Sequence from={f(6.6)} durationInFrames={f(DUR_S2)}><S2 /></Sequence>
    <Sequence from={f(15.6)} durationInFrames={f(4.2)}><S3 /></Sequence>
    <Sequence from={f(19.8)} durationInFrames={TOTAL - f(19.8)}>
      <Fecho cta="Link na bio" />
    </Sequence>
  </Quadro>
);

export const slides: Slide[] = [{ comp: Dupla, frames: TOTAL, ...REEL, capa: 24 }];

// 02 · Reel "Duas câmeras nas palmeiras": short cuts between two phones on the same moment, muted. Spec in PECAS.md.
import type { ReactNode } from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { BarrasStory, CHALK, Clip, Etiqueta, Fecho, Gancho, INK, LIVE, MONO, QUANDO_CURTO, Quadro, REEL, f, useIn, type PecaProps } from './kit';
import type { Slide } from './tipos';

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

type Cena = { start: number; dur: number; src: string; from?: number; zoom?: [number, number]; cam?: 1 | 2; extra?: ReactNode };
const CENAS: Cena[] = [
  {
    start: 0, dur: 2.6, src: 'palm-largo', zoom: [1, 1.06],
    // size 63 (spec 74): "TEM DUAS PESSOAS" would pass x 950
    extra: <Gancho lines={['Tem duas pessoas', 'de ponta-cabeça', 'nesta imagem.']} size={63} y={300} tom="accent" outAt={f(2.2)} />,
  },
  { start: 2.6, dur: 1.8, src: 'palm-zoom', extra: <Etiqueta text="achou." tom="accent" size={44} x={65} y={300} delay={2} /> },
  { start: 4.4, dur: 2.0, src: 'palm-px1', cam: 2 },
  { start: 6.4, dur: 2.2, src: 'palm-perto', from: 0.2, cam: 1, extra: <Etiqueta text={`${QUANDO_CURTO} · São Paulo`} tom="accent" size={36} x={65} y={370} delay={4} /> },
  { start: 8.6, dur: 1.8, src: 'palm-px2', cam: 2 },
  { start: 10.4, dur: 2.2, src: 'palm-px3', cam: 2, extra: <Etiqueta text="Trapézio Voador" tom="chalk" size={36} x={65} y={370} delay={3} /> },
  { start: 12.6, dur: 2.0, src: 'palm-zoom3', cam: 1 },
  {
    start: 14.6, dur: 2.4, src: 'palm-mural', from: 0.2, zoom: [1, 1.08],
    // size 91 (spec 110): "3 DIAS ASSIM." would pass x 950
    extra: <Gancho lines={['3 dias assim.']} size={91} y={300} tom="accent" delay={4} />,
  },
];
const FIM = f(17.0);
const TOTAL = f(20.2);

const Palmeiras = ({ guides }: PecaProps) => (
  <Quadro formato="reel" guides={guides}>
    {CENAS.map((c, i) => (
      <Sequence key={c.src} from={f(c.start)} durationInFrames={f(c.dur)}>
        <Clip src={c.src} from={c.from ?? 0} zoom={c.zoom} />
        {c.cam && <Camera n={c.cam} />}
        {c.extra}
        {i > 0 && <Flash />}
      </Sequence>
    ))}
    <Sequence durationInFrames={FIM}>
      <BarrasStory starts={CENAS.map((c) => f(c.start))} total={FIM} />
    </Sequence>
    <Sequence from={FIM} durationInFrames={TOTAL - FIM}>
      <Fecho cta="Link na bio" />
    </Sequence>
  </Quadro>
);

export const slides: Slide[] = [{ comp: Palmeiras, frames: TOTAL, ...REEL, capa: 15 }];

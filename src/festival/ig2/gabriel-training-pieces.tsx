import type { CSSProperties } from 'react';
import { Html5Video, Img, OffthreadVideo, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrushStroke } from '../Brush';
import { ACCENT, BrandSeal, Canvas, CHALK, Headline, Label, STAGE, move, type PieceProps } from './kit';
import type { Piece } from './pieces';
import entries from './gabriel-training-2026-11-17.json';

type TrainingCut = {
  id: string;
  title: string;
  exercise_id: string;
  hook: string[];
  note: string;
  seconds: number;
  freeze: number;
  cover: number;
  src: string;
  poster: string;
};

const resolveMedia = (source: string) => getRemotionEnvironment().isRendering && source.startsWith('/')
  ? staticFile(source.slice(1))
  : source;

// The image must be extracted from this clean cut at `freeze`, ideally its final frame.
// Both layers keep identical geometry: no recentering, automatic crop or camera motion.
const mediaStyle: CSSProperties = {
  position: 'absolute', inset: 0, width: '100%', height: '100%',
  objectFit: 'contain', objectPosition: '50% 50%',
};

function FreezeObservation({note}: {note: string}) {
  const frame = useCurrentFrame();
  return <div style={{position: 'absolute', left: 65, top: 1540, width: 810}}>
    <BrushStroke color={ACCENT} style={{
      position: 'absolute', left: -18, top: -10, width: 845, height: 154,
      clipPath: `inset(0 ${(1 - move(frame, 0, 14)) * 100}% 0 0)`,
    }}/>
    <Label x={0} y={0} size={48} color={STAGE} style={{position: 'relative', width: 790, lineHeight: 1.25}}>{note}</Label>
  </div>;
}

function GabrielTraining({cut, ...props}: PieceProps & {cut: TrainingCut}) {
  const {fps} = useVideoConfig();
  const playFrames = Math.max(1, Math.round(cut.seconds * fps));
  const Video = getRemotionEnvironment().isRendering ? OffthreadVideo : Html5Video;
  return <Canvas {...props} dark signature={false}>
    <Sequence durationInFrames={playFrames} layout="none">
      <Video src={resolveMedia(cut.src)} muted style={{...mediaStyle, filter: 'saturate(.9) contrast(1.03)'}}/>
    </Sequence>
    <Sequence from={playFrames} durationInFrames={Math.round(3 * fps)} layout="none">
      <Img src={resolveMedia(cut.poster)} style={{...mediaStyle, filter: 'grayscale(1) contrast(1.08)'}}/>
    </Sequence>
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(10,35,28,.78),rgba(10,35,28,.36) 27%,transparent 40%,transparent 79%,rgba(10,35,28,.7))'}}/>
    <Label y={225} color={CHALK} size={34}>HANDSTAND LIFE</Label>
    <Headline lines={cut.hook} y={285} size={76} width={885} dark accentLine={-1}/>
    <BrandSeal x={740} y={535} size={230}/>
    <Sequence from={playFrames} durationInFrames={Math.round(3 * fps)} layout="none">
      <FreezeObservation note={cut.note}/>
    </Sequence>
  </Canvas>;
}

export const GABRIEL_TRAINING_PIECES: Piece[] = (entries as TrainingCut[]).map(cut => ({
  id: `gabriel-drill-${cut.id}`,
  title: `${cut.title} · Gabriel`,
  format: 'Reel',
  description: `Demonstração de Gabriel, vinculada à pauta ${cut.exercise_id}. Corte em velocidade real; falta revisão técnica da orientação e narração. O fecho usa fotografia em preto e branco, não gravura anatômica.`,
  look: 'Vídeo amplo / cor natural / freeze fotográfico P&B / ocre',
  movement: `Corte completo de ${cut.seconds.toFixed(1)} s, seguido de 3 s do quadro da fonte em ${cut.freeze.toFixed(2)} s. Pintura independente e sem deslocar o corpo. Áudio original não incluído.`,
  slides: [{
    name: cut.title,
    component: (props: PieceProps) => <GabrielTraining {...props} cut={cut}/>,
    height: 1920,
    seconds: cut.seconds + 3,
    cover: Math.max(0, Math.min(Math.round(cut.cover * 30), Math.round(cut.seconds * 30) - 1)),
    cues: [
      {label: 'Demonstração', frame: Math.round(cut.cover * 30)},
      {label: 'Movimento', frame: Math.round(cut.seconds * 15)},
      {label: 'Congela e observa', frame: Math.round(cut.seconds * 30) + 30},
    ],
  }],
}));

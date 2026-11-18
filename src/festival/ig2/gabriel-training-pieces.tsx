import type { CSSProperties } from 'react';
import { Html5Video, Img, OffthreadVideo, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrushStroke } from '../Brush';
import { ACCENT, BrandSeal, Canvas, CHALK, Headline, Label, STAGE, move, type PieceProps } from './kit';
import type { Piece } from './pieces';
import entries from './gabriel-training-2026-11-17.json';
import {trainingArtDirection, type TrainingArtDirection} from './training-art-direction';

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

function FreezeObservation({note, direction}: {note: string; direction:TrainingArtDirection}) {
  const frame = useCurrentFrame();
  const {x,y,width}=direction.note;
  const compact=width<600;
  return <div style={{position:'absolute',left:x,top:y,width}}>
    <div style={{position:'absolute',inset:-20,background:'rgba(18,61,51,.88)',borderRadius:18}}/>
    <Label x={0} y={0} size={48} color={CHALK} style={{position:'relative',width,lineHeight:1.25}}>{note}</Label>
    <BrushStroke color={ACCENT} style={{position:'relative',display:'block',marginTop:18,width:compact?width-20:width*.78,height:20,clipPath:`inset(0 ${(1-move(frame,0,14))*100}% 0 0)`}}/>
  </div>;
}

function GabrielTraining({cut, ...props}: PieceProps & {cut: TrainingCut}) {
  const {fps} = useVideoConfig();
  const frame=useCurrentFrame();
  const direction=trainingArtDirection(cut.id);
  const framedMedia={...mediaStyle,transform:`scale(${direction.zoom})`,transformOrigin:direction.origin};
  const hasFreeze=cut.id!=='saida-cadeira';
  const playFrames = Math.max(1, Math.round(cut.seconds * fps));
  const Video = getRemotionEnvironment().isRendering ? OffthreadVideo : Html5Video;
  return <Canvas {...props} dark signature={false}>
    <Sequence durationInFrames={playFrames} layout="none">
      <Video src={resolveMedia(cut.src)} muted style={{...framedMedia, filter: 'saturate(.9) contrast(1.03)'}}/>
    </Sequence>
    {hasFreeze&&<Sequence from={playFrames} durationInFrames={Math.round(3 * fps)} layout="none">
      <Img src={resolveMedia(cut.poster)} style={{...framedMedia, filter: direction.hold==='mono'?'grayscale(1) contrast(1.08)':'saturate(.88) contrast(1.04)'}}/>
    </Sequence>}
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(10,35,28,.78),rgba(10,35,28,.36) 27%,transparent 40%,transparent 79%,rgba(10,35,28,.7))'}}/>
    <div style={{opacity:frame<playFrames?1-move(frame,150,15):1}}>
    <Label y={225} color={CHALK} size={34}>HANDSTAND LIFE</Label>
    <Headline lines={cut.id==='chute-parede'?['A ENTRADA','NA PAREDE!']:cut.hook} x={cut.id==='chute-parede'?500:65} y={285} size={cut.id==='chute-parede'?56:76} width={cut.id==='chute-parede'?500:885} dark accentLine={direction.paint==='highlight'?0:-1}/>
    {direction.paint==='underline'&&<BrushStroke color={ACCENT} style={{position:'absolute',left:65,top:470,width:640,height:20,clipPath:`inset(0 ${(1-move(frame,0,16)) * 100}% 0 0)`}}/>}
    </div>
    <BrandSeal x={cut.id==='chute-parede'&&frame>=playFrames?65:740} y={535} size={230}/>
    {hasFreeze&&<Sequence from={playFrames} durationInFrames={Math.round(3 * fps)} layout="none">
      <FreezeObservation note={cut.note} direction={direction}/>
    </Sequence>}
  </Canvas>;
}

export const GABRIEL_TRAINING_PIECES: Piece[] = (entries as TrainingCut[]).map(cut => ({
  id: `gabriel-drill-${cut.id}`,
  title: `${cut.title} · Gabriel`,
  format: 'Reel',
  description: `Demonstração de Gabriel, vinculada à pauta ${cut.exercise_id}. Corte em velocidade real; falta revisão técnica da orientação e narração. O fecho usa fotografia, alternando cor natural e preto e branco; não é gravura anatômica.`,
  look: `Vídeo amplo / ${cut.id==='saida-cadeira'?'movimento sem freeze':trainingArtDirection(cut.id).hold==='mono'?'freeze P&B':'pausa em cor natural'} / ${trainingArtDirection(cut.id).paint==='highlight'?'título pincelado':'sublinhado ocre'}`,
  movement: `Corte completo de ${cut.seconds.toFixed(1)} s, ${cut.id==='saida-cadeira'?'sem congelamento adicional':`seguido de 3 s do quadro da fonte em ${cut.freeze.toFixed(2)} s` }. Pintura independente e sem deslocar o corpo. Áudio original não incluído. ${trainingArtDirection(cut.id).rationale}`,
  slides: [{
    name: cut.title,
    component: (props: PieceProps) => <GabrielTraining {...props} cut={cut}/>,
    height: 1920,
    seconds: cut.seconds + (cut.id==='saida-cadeira'?0:3),
    cover: Math.max(0, Math.min(Math.round(cut.cover * 30), Math.round(cut.seconds * 30) - 1)),
    cues: [
      {label: 'Demonstração', frame: Math.round(cut.cover * 30)},
      {label: 'Movimento', frame: Math.round(cut.seconds * 15)},
      {label: cut.id==='saida-cadeira'?'Saída completa':'Congela e observa', frame: cut.id==='saida-cadeira'?Math.round(cut.seconds*30)-30:Math.round(cut.seconds * 30) + 30},
    ],
  }],
}));

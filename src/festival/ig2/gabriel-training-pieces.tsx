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

// Editorial replay, not a second attempt: exact source timing, fixed crop and one pointer.
function ScapulaLesson({cut,...props}:PieceProps & {cut:TrainingCut}) {
  const {fps}=useVideoConfig();
  const frame=useCurrentFrame();
  const clean=Math.round(cut.seconds*fps);
  const hold=clean+4*fps;
  const resume=hold+2*fps;
  const detail=frame>=clean;
  const Video=getRemotionEnvironment().isRendering?OffthreadVideo:Html5Video;
  const style={...mediaStyle,transform:detail?'scale(1.22)':undefined,transformOrigin:'53% 70%'};
  const paint=move(frame,hold,12);
  return <Canvas {...props} dark signature={false}>
    <Sequence durationInFrames={clean} layout="none"><Video src={resolveMedia(cut.src)} muted style={style}/></Sequence>
    <Sequence from={clean} durationInFrames={4*fps} layout="none"><Video src={resolveMedia(cut.src)} trimBefore={2*fps} muted style={style}/></Sequence>
    <Sequence from={hold} durationInFrames={2*fps} layout="none"><Img src={resolveMedia('/festival/ig/gabriel-training-v1/escapulas-observacao.webp')} style={{...style,filter:'grayscale(1) contrast(1.06)'}}/></Sequence>
    <Sequence from={resume} durationInFrames={2*fps} layout="none"><Video src={resolveMedia(cut.src)} trimBefore={6*fps} muted style={style}/></Sequence>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(rgba(10,35,28,.8),transparent 44%)'}}/>
    <Label y={225} size={32} color={CHALK}>HANDSTAND LIFE</Label>
    <Headline lines={['EMPURRE','O CHÃO.']} y={285} size={76} dark/>
    <BrandSeal x={740} y={535} size={230}/>
    {detail&&<Label y={690} size={44} color={CHALK} style={{background:'rgba(18,61,51,.9)',padding:16,borderRadius:12,width:620}}>{frame<hold?'Veja de novo, mais perto.':frame<resume?'Observe esta região.':'Agora observe o movimento.'}</Label>}
    {frame>=hold&&frame<resume&&<svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} aria-label="Seta aponta para a região das escápulas">
      <path d="M 570 820 Q 440 790 305 885" fill="none" stroke="#123d33" strokeWidth="19" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-paint}/>
      <path d="M 570 820 Q 440 790 305 885" fill="none" stroke={ACCENT} strokeWidth="11" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-paint}/>
      <path d="M 318 847 L 305 885 L 345 883" fill="none" stroke={ACCENT} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" opacity={move(frame,hold+10,4)}/>
    </svg>}
  </Canvas>;
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
  movement: cut.id==='escapulas'?'Demonstração completa, repetição dos segundos 2 a 6 com aproximação fixa de 22%, pausa de 2 s no quadro 6 com uma seta ocre, retomada dos segundos 6 a 8. Seta indica região, não direção de força nem medição. Sem aceleração.':`Corte completo de ${cut.seconds.toFixed(1)} s, ${cut.id==='saida-cadeira'?'sem congelamento adicional':`seguido de 3 s do quadro da fonte em ${cut.freeze.toFixed(2)} s` }. Pintura independente e sem deslocar o corpo. Áudio original não incluído. ${trainingArtDirection(cut.id).rationale}`,
  slides: [{
    name: cut.title,
    component: (props: PieceProps) => cut.id==='escapulas'?<ScapulaLesson {...props} cut={cut}/>:<GabrielTraining {...props} cut={cut}/>,
    height: 1920,
    seconds: cut.seconds + (cut.id==='escapulas'?8:cut.id==='saida-cadeira'?0:3),
    cover: Math.max(0, Math.min(Math.round(cut.cover * 30), Math.round(cut.seconds * 30) - 1)),
    cues: [
      {label: 'Demonstração', frame: Math.round(cut.cover * 30)},
      {label: 'Movimento', frame: Math.round(cut.seconds * 15)},
      {label: cut.id==='saida-cadeira'?'Saída completa':'Congela e observa', frame: cut.id==='escapulas'?Math.round(cut.seconds*30)+150:cut.id==='saida-cadeira'?Math.round(cut.seconds*30)-30:Math.round(cut.seconds * 30) + 30},
    ],
  }],
}));

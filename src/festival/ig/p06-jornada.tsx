// The former video carousel is now one event invitation Reel, retaining the practice footage.
import { Sequence } from 'remotion';
import { Clip, Fecho, Gancho, Quadro, REEL, f, type PecaProps } from './kit';
import type { Slide } from './tipos';

const scenes = [
  { src: 'j-chao', seconds: 3.2, lines: ['Ainda está', 'na parede?'] },
  { src: 'j-entrada', seconds: 3.2, lines: ['Tem turma', 'para você.'] },
  { src: 'j-press', seconds: 4.2, lines: ['Já explora', 'outras formas?'] },
  { src: 'mural-reta', seconds: 4.4, lines: ['Vem praticar', 'com a gente.'] },
];
const starts = scenes.map((_, i) => f(scenes.slice(0, i).reduce((n, scene) => n + scene.seconds, 0)));
const footage = f(scenes.reduce((n, scene) => n + scene.seconds, 0));
const Invitation = ({guides}:PecaProps) => <Quadro formato="reel" guides={guides}>
 {scenes.map((scene,i)=><Sequence key={scene.src} from={starts[i]} durationInFrames={f(scene.seconds)}>
  <Clip src={scene.src}/>
  <Gancho lines={scene.lines} size={78} y={300} tom="accent"/>
 </Sequence>)}
 <Sequence from={footage} durationInFrames={f(4)}><Fecho cta="Conheça o festival" sub="Do básico ao avançado"/></Sequence>
</Quadro>;
export const slides:Slide[]=[{comp:Invitation,frames:footage+f(4),...REEL,capa:30,nome:'convite para todos os níveis'}];

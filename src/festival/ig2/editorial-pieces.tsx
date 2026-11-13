import { Freeze, Img, getRemotionEnvironment, staticFile } from 'remotion';
import EngravingArtwork, { type EngravingFigure, type PaintShape } from '../EngravingArtwork';
import { Canvas, Headline, Label, type PieceProps, CHALK, STAGE } from './kit';
import type { Piece } from './pieces';
import { EDITORIAL_IMAGES, type EditorialImageKey } from './editorial-images';
import { QUANDO } from '../data';

const resolveSource = (path:string) => getRemotionEnvironment().isPlayer ? path : staticFile(path.slice(1));
export function EditorialArt({title,sub,dark=false,straight=false,story=false,image,engraving,paint,...p}:PieceProps & {title:string[];sub:string;dark?:boolean;straight?:boolean;story?:boolean;image?:EditorialImageKey;engraving?:EngravingFigure;paint?:PaintShape}) {
 return <Freeze frame={90}><Canvas {...p} format={story?'story':'card'} dark={dark}>
  <Label y={story?230:70} size={30} color={dark?CHALK:STAGE}>HANDSTANDFEST · COMUNIDADE</Label>
  <Headline lines={title} y={story?320:160} size={85} dark={dark}/>
  {image && !engraving ? <div style={{position:'absolute',left:65,top:story?590:420,width:950,height:story?800:740}}><Img src={EDITORIAL_IMAGES[image].url} alt={EDITORIAL_IMAGES[image].alt} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div> : <EngravingArtwork figure={engraving ?? (straight?'straight':'straddle')} paint={paint ?? (straight?'oval':'sweep')} paintTone={dark?'light':'ochre'} background="none" imageComponent={Img} resolveSource={resolveSource} style={{position:'absolute',left:140,top:story?590:420,width:800,height:story?800:740}}/>}
  {image && <Label y={story?1410:1167} size={28} color={dark?CHALK:STAGE}>{engraving?'GRAVURA A PARTIR DO ACERVO':'ACERVO DE RETIROS · BALANCE ATLAS'}</Label>}
  <Label y={story?1480:1210} size={40} color={dark?CHALK:STAGE} style={{width:885}}>{sub}</Label>
 </Canvas></Freeze>;
}
function piece(id:string,title:string,variants:{title:string[];sub:string;dark?:boolean;straight?:boolean;image?:EditorialImageKey;engraving?:EngravingFigure;paint?:PaintShape}[]):Piece {
 return {id,title,format:variants.length>1?'Carrossel':'Estático',description:'Fotos selecionadas do catálogo alternadas com gravura pontual, ocre e texto grande.',look:'Acervo fotográfico / gravura pontual / ocre',movement:'Imagem estática; sem vídeo nas lâminas.',slides:variants.map((v,i)=>({name:`${title} · ${i+1}`,component:(p:PieceProps)=><EditorialArt {...p} {...v}/>,height:1440,seconds:1,cover:0,cues:[]}))};
}
export const EDITORIAL_PIECES = [
 piece('ed-consistencia','O treino não cabe no recorde',[
 {title:['SEU TREINO É','SÓ RECORDE?'],sub:'O treino continua entre uma tentativa e outra. #handstandlife',image:'profile'},
 {title:['PRÁTICA','É PROCESSO.'],sub:'Uma boa tentativa não conta a história inteira.',dark:true,image:'group'},
 {title:['PAUSAR.','OBSERVAR.'],sub:'Rever um vídeo, conversar e perceber o apoio também fazem parte.',image:'class'},
 {title:['TEMPO PARA','PERCEBER.'],sub:'Para algumas pessoas, praticar também é um momento de atenção. Como é para você?',dark:true,image:'tuck'},
 {title:['O QUE FICOU','DO TREINO?'],sub:'Uma sensação, uma dúvida, uma pequena descoberta. Conta para a gente.',image:'diagonal'},
 ]),
 piece('ed-comunidade','Gente para treinar junto',[{title:['COM QUEM','VOCÊ TREINA?'],sub:'Onde você treina hoje?',dark:true,image:'group'}]),
 piece('ed-formas','Reta e straddle',[{title:['QUE FORMAS','VOCÊ CONHECE?'],sub:'O corpo encontra outras formas.',image:'diagonal',engraving:'diagonal',paint:'arc'},{title:['RETA.'],sub:'Pernas juntas.',image:'profile',engraving:'profile',paint:'oval'},{title:['STRADDLE.'],sub:'Pernas abertas.',dark:true,image:'overhead',engraving:'overhead',paint:'sweep'}]),
 piece('ed-festival','Três dias. Um encontro.',[{title:['TRÊS DIAS.','UM ENCONTRO.'],sub:`${QUANDO} · São Paulo`,dark:true,image:'class'}]),
 piece('ed-mundo','Ninguém treina só',[{title:['ONDE A GENTE','TREINA JUNTO?'],sub:'Que grupo ou encontro você indicaria?',image:'tuck'}]),
];

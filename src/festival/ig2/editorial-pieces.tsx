import { Freeze, Img, getRemotionEnvironment, staticFile } from 'remotion';
import EngravingArtwork, { type EngravingFigure, type PaintShape } from '../EngravingArtwork';
import { Canvas, PracticeClose, Headline, Label, type PieceProps, CHALK, STAGE } from './kit';
import type { Piece } from './pieces';
import { EDITORIAL_IMAGES, type EditorialImageKey } from './editorial-images';
import { QUANDO } from '../data';

const resolveSource = (path:string) => getRemotionEnvironment().isPlayer ? path : staticFile(path.slice(1));
export function EditorialArt({title,sub,dark=false,straight=false,story=false,image,engraving,paint,signed=false,...p}:PieceProps & {title:string[];sub:string;dark?:boolean;straight?:boolean;story?:boolean;image?:EditorialImageKey;engraving?:EngravingFigure;paint?:PaintShape;signed?:boolean}) {
 return <Freeze frame={90}><Canvas {...p} format={story?'story':'card'} dark={dark} signature={story||signed}>
  <Label y={story?230:70} size={30} color={dark?CHALK:STAGE}>HANDSTANDFEST · COMUNIDADE</Label>
  <Headline lines={title} y={story?320:160} size={title.some(line=>line.length>17)?64:85} dark={dark} accentLine={engraving||!image?-1:0}/>
  {image && !engraving ? <div style={{position:'absolute',left:65,top:story?590:420,width:950,height:story?800:740}}><Img src={EDITORIAL_IMAGES[image].url.startsWith('/')?resolveSource(EDITORIAL_IMAGES[image].url):EDITORIAL_IMAGES[image].url} alt={EDITORIAL_IMAGES[image].alt} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div> : <EngravingArtwork figure={engraving ?? (straight?'straight':'straddle')} paint={paint ?? (straight?'oval':'sweep')} paintTone={dark?'light':'ochre'} background="none" imageComponent={Img} resolveSource={resolveSource} style={{position:'absolute',left:140,top:story?590:420,width:800,height:story?800:740}}/>}
  <Label y={story?1480:1210} size={40} color={dark?CHALK:STAGE} style={{width:story||signed?680:885}}>{sub}</Label>
 </Canvas></Freeze>;
}
function piece(id:string,title:string,variants:{title:string[];sub:string;dark?:boolean;straight?:boolean;image?:EditorialImageKey;engraving?:EngravingFigure;paint?:PaintShape}[]):Piece {
 return {id,title,format:variants.length>1?'Carrossel':'Estático',description:'Fotos selecionadas do catálogo alternadas com gravura pontual, ocre e texto grande.',look:'Acervo fotográfico / gravura pontual / ocre',movement:'Imagem estática; sem vídeo nas lâminas.',slides:variants.map((v,i)=>({name:`${title} · ${i+1}`,component:(p:PieceProps)=><EditorialArt {...p} {...v} signed={variants.length===1}/>,height:1440,seconds:1,cover:0,cues:[]})).concat(variants.length>1?[{name:'A conversa continua',component:(p:PieceProps)=><PracticeClose {...p} title={id==='ed-consistencia'?['UM GUIA PARA','SEGUIR PRATICANDO.']:['QUAL FORMA','VOCÊ QUER VER?']} body={id==='ed-consistencia'?'Estamos preparando Handstand Life: Guia de Sobrevivência. Exercícios, detalhes e conversas para acompanhar a prática.':'Reta, straddle e as passagens entre elas: vamos explorar cada forma com demonstrações reais. Qual você gostaria de ver explicada?'}/>,height:1440,seconds:1,cover:0,cues:[]}]:[])};
}
export const EDITORIAL_PIECES = [
 piece('ed-consistencia','Filme e reveja seu treino',[
 {title:['FILME E REVEJA','SEU TREINO.'],sub:'A parada de mãos pede atenção aos detalhes. #handstandlife',image:'profile'},
 {title:['CONVERSE.','TROQUE.'],sub:'Outro olhar pode ajudar a perceber um detalhe.',dark:true,image:'group'},
 {title:['REVEJA UM','DETALHE POR VEZ.'],sub:'Rever um vídeo, conversar e perceber o apoio também fazem parte.',image:'class'},
 {title:['PRATIQUE.','FILME DE NOVO.'],sub:'Compare tentativas. Observe mudanças sem cobrar um recorde a cada treino.',dark:true,image:'tuck'},
 ]),
 piece('ed-comunidade','Gente para treinar junto',[{title:['TREINAR JUNTO','LEVA MAIS LONGE.'],sub:'Estamos fortalecendo a comunidade de handstand do Brasil.',dark:true,image:'group'}]),
 piece('ed-formas','Palito e afastado',[{title:['PALITO E','AFASTADO.'],sub:'Reta e straddle: dois nomes para reconhecer na prática.',image:'diagonal',engraving:'diagonal',paint:'arc'},{title:['RETA.'],sub:'Pernas juntas.',image:'profile',engraving:'profile',paint:'oval'},{title:['STRADDLE.'],sub:'Pernas abertas.',dark:true,image:'overhead',engraving:'overhead',paint:'sweep'}]),
 piece('ed-festival','Três dias. Um encontro.',[{title:['3 DIAS COM QUEM','GOSTA DE HANDSTAND.'],sub:`${QUANDO} · São Paulo`,dark:true,image:'class'}]),
 piece('ed-mundo','Ninguém treina só',[{title:['ONDE A GENTE','TREINA JUNTO?'],sub:'Que grupo ou encontro você indicaria?',image:'tuck'}]),
];

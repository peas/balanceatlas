import { Freeze, Img, getRemotionEnvironment, staticFile } from 'remotion';
import EngravingArtwork, { type EngravingFigure, type PaintShape } from '../EngravingArtwork';
import { Canvas, PracticeClose, Headline, Label, type PieceProps, CHALK, STAGE } from './kit';
import type { Piece } from './pieces';
import { EDITORIAL_IMAGES, type EditorialImageKey } from './editorial-images';
import { QUANDO } from '../data';

const resolveSource = (path:string) => getRemotionEnvironment().isPlayer ? path : staticFile(path.slice(1));
export function EditorialArt({title,sub,dark=false,straight=false,story=false,image,engraving,paint,signed=false,...p}:PieceProps & {title:string[];sub:string;dark?:boolean;straight?:boolean;story?:boolean;image?:EditorialImageKey;engraving?:EngravingFigure;paint?:PaintShape;signed?:boolean}) {
 const photographic=!!image&&!engraving;
 const height=story?1920:1440;
 return <Freeze frame={90}><Canvas {...p} format={story?'story':'card'} dark={photographic||dark} signature={story||signed}>
  {photographic ? <><Img src={EDITORIAL_IMAGES[image!].url.startsWith('/')?resolveSource(EDITORIAL_IMAGES[image!].url):EDITORIAL_IMAGES[image!].url} alt={EDITORIAL_IMAGES[image!].alt} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,35,28,.8),transparent 32%,transparent 65%,rgba(10,35,28,.88))'}}/></> : <EngravingArtwork figure={engraving ?? (straight?'straight':'straddle')} paint={paint ?? (straight?'oval':'sweep')} paintTone={dark?'light':'ochre'} background="none" imageComponent={Img} resolveSource={resolveSource} style={{position:'absolute',left:30,top:260,width:1020,height:height-410}}/>}
  <Label y={story?200:65} size={28} color={photographic||dark?CHALK:STAGE}>HANDSTANDFEST · COMUNIDADE</Label>
  <Headline lines={title} y={story?275:135} size={title.some(line=>line.length>17)?64:80} dark={photographic||dark} accentLine={photographic?0:-1}/>
  <Label y={story?1510:1210} size={35} color={photographic||dark?CHALK:STAGE} style={{width:story||signed?680:920}}>{sub}</Label>
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
 piece('ed-festival','Três dias. Um encontro.',[{title:['3 DIAS COM QUEM','GOSTA DE HANDSTAND.'],sub:`${QUANDO} · São Paulo`,dark:true,image:'gabrielSea'}]),
 piece('ed-mundo','Ninguém treina só',[{title:['ONDE A GENTE','TREINA JUNTO?'],sub:'Que grupo ou encontro você indicaria?',image:'tuck'}]),
];

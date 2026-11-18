import {Img,Html5Video,OffthreadVideo,Sequence,Freeze,getRemotionEnvironment,staticFile} from 'remotion';
import {Canvas,Headline,Label,BrandSeal,CHALK,STAGE,type PieceProps} from './kit';
import type {Piece} from './pieces';
import {QUANDO} from '../data';
const media=(path:string)=>getRemotionEnvironment().isRendering?staticFile(path.replace(/^\//,'')):path;
const base='/festival/ig/';
// Pinned posts show Paulo and Gabriel, not retreat groups (Paulo, 18/11/2026). Stills from the 04/11 Trapézio Voador footage.
const duo=base+'abertura-v1/dupla-estudio.webp';
const duoTuck=base+'abertura-v1/dupla-estudio-b.webp';
const training=base+'abertura-v1/treino-estudio.webp';
const both=base+'abertura-v1/paulo-gabriel.webp';
const beach=base+'gabriel/praia-reta.webp';
const wall=base+'gabriel-training-review-v2/gabriel-20261117-img_3541-0.webp';
const classPhoto=base+'gabriel-training-review-v2/gabriel-20261117-img_3640-0.webp';
type Card={name:string;photo:string;lines:string[];body:string;position?:string;zoom?:number;close?:boolean;light?:boolean;label?:string};
function OpeningCard({card,index,total,...p}:PieceProps&{card:Card;index:number;total:number}){
 return <Canvas {...p} format="card" dark={!card.light} signature={false}>
 <Img src={media(card.photo)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:card.position||'50% 50%',transform:card.zoom?`scale(${card.zoom})`:undefined,transformOrigin:card.position||'50% 50%'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(9,30,24,.86),rgba(9,30,24,.4) 30%,transparent 48%,transparent 67%,rgba(9,30,24,.94) 88%)'}}/>
 <Label y={65} color={CHALK} size={28}>{card.label||'HANDSTANDFEST · UM ENCONTRO'}</Label>
 <Headline lines={card.lines} y={145} size={78} width={930} dark accentLine={0}/>
 <Label y={1115} size={46} color={CHALK} style={{width:card.close?690:930,lineHeight:1.3,whiteSpace:'pre-line'}}>{card.body}</Label>
 {card.close&&<BrandSeal x={790} y={1135} size={210} still/>}
 <Label y={1360} size={24} color={CHALK}>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</Label>
 </Canvas>;
}
const festival:Card[]=[
 {name:'O encontro',photo:duo,lines:['O QUE É O','HANDSTANDFEST?'],body:`${QUANDO}\nSÃO PAULO`,position:'42% 52%',zoom:1.3},
 {name:'O propósito',photo:training,position:'46% 58%',zoom:1.45,lines:['PRATICAR.','APRENDER.','TROCAR.'],body:'Aulas, treinos e convivência em torno da parada de mão.',label:'A IDEIA DO ENCONTRO'},
 {name:'Diferentes momentos',photo:beach,lines:['CADA PESSOA,','UM MOMENTO','DA JORNADA.'],body:'Turmas de básico e de intermediário / avançado.',position:'50% 45%'},
 {name:'Data e lugar',photo:'/festival/venue-1.webp',lines:['ONDE','VAI SER?'],body:`${QUANDO}\nTrapézio Voador · São Paulo`},
 {name:'Vamos juntos',photo:both,position:'56% 52%',zoom:1.45,lines:['VAMOS','TREINAR JUNTOS?'],body:'Informações e inscrições\nhandstandfest.com.br',close:true},
];
const participate:Card[]=[
 {name:'A pergunta',photo:wall,lines:['AINDA ESTOU','NA PAREDE.','POSSO IR?'],body:'Sim. Você não precisa chegar dominando o livre.',position:'50% 55%',label:'HANDSTANDFEST · PARA QUEM É'},
 {name:'Para começar',photo:classPhoto,lines:['TEM TURMA','DE BÁSICO.'],body:'Para quem treina com apoio e ainda não sustenta o livre.'},
 {name:'Para continuar',photo:duoTuck,position:'46% 52%',zoom:1.3,lines:['JÁ PRATICA','NO LIVRE?'],body:'Intermediário / avançado: livre consistente por cerca de 10 s.'},
 {name:'Escolha sua turma',photo:'/festival/venue-2.webp',lines:['NA DÚVIDA,','FALE COM','A GENTE.'],body:'Veja as turmas e orientações:\nhandstandfest.com.br',close:true},
];
const scenes=[
 {src:base+'gabriel/img-3372.mp4',from:1,seconds:4,lines:['CALISTENIA, YOGA,','CIRCO, GINÁSTICA...'],label:'UMA PRÁTICA DE DIVERSOS ESPORTES'},
 {src:base+'gabriel-training-v1/chute-parede.mp4',from:0,seconds:5,lines:['COM APOIO,','TAMBÉM É PRÁTICA.'],label:'CADA PESSOA NO SEU MOMENTO'},
 {src:base+'abertura-v1/press.mp4',from:0,seconds:18,lines:['ENTRAR TAMBÉM','FAZ PARTE.'],label:'PRESS · UMA DAS POSSIBILIDADES'},
 {src:base+'dupla-a.mp4',from:4,seconds:6,lines:['RETAS, ABERTURAS,','OUTRAS FORMAS.'],label:'O MOVIMENTO ENTRE AS POSIÇÕES'},
];
function Scene({scene,...p}:PieceProps&{scene:typeof scenes[number]}){
 const Video=getRemotionEnvironment().isRendering?OffthreadVideo:Html5Video;
 return <Canvas {...p} dark signature={false}><Video src={media(scene.src)} trimBefore={Math.round(scene.from*30)} muted style={{width:'100%',height:'100%',objectFit:'contain'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(rgba(9,30,24,.85),transparent 40%)'}}/><Label y={225} color={CHALK} size={28}>{scene.label}</Label><Headline lines={scene.lines} y={285} size={68} dark accentLine={-1}/><BrandSeal x={755} y={540} size={210}/></Canvas>;
}
function HandstandReel(p:PieceProps){let at=0;return <>{scenes.map((scene,i)=>{const start=at;at+=scene.seconds*30;return <Sequence key={i} from={start} durationInFrames={scene.seconds*30}><Scene {...p} scene={scene}/></Sequence>})}<Sequence from={33*30} durationInFrames={3*30}><Canvas {...p} dark signature={false}><Freeze frame={150}><Scene {...p} scene={scenes[3]}/></Freeze><div style={{position:'absolute',inset:0,background:'rgba(18,61,51,.25)'}}/><Headline lines={['MUITOS','CAMINHOS.']} y={1090} size={84} dark/><Label y={1390} color={CHALK} size={44}>Prática, exercícios e encontros.</Label></Canvas></Sequence></>}
const carousel=(id:string,title:string,cards:Card[]):Piece=>({id,title,format:'Carrossel',description:'Fotos do acervo autorizado ilustram a prática; não são cobertura do festival futuro. Revisar legenda antes de publicar.',look:'Foto ampla / ocre / HF somente no fechamento',movement:'Lâminas estáticas; destaque ocre e composição independentes da fotografia.',slides:cards.map((card,i)=>({name:card.name,component:(p:PieceProps)=><OpeningCard {...p} card={card} index={i} total={cards.length}/>,height:1440,seconds:4,cover:60,cues:[]}))});
export const OPENING_PIECES:Piece[]=[carousel('abertura-festival','O que é o HandstandFest?',festival),{id:'abertura-handstand',title:'O que é handstand?',format:'Reel',description:'Apresentação visual da prática: reta, parede, entrada em press e mudanças de forma. Sem narração ou música; não é tutorial.',look:'Movimento amplo / cor natural / uma pausa ocre / HF',movement:'36 s em velocidade real, com cortes entre tomadas diferentes. Press com 18 s para não apressar a entrada; pausa final de 3 s.',slides:[{name:'Muitos caminhos',component:HandstandReel,height:1920,seconds:36,cover:90,cues:[{label:'Parada de mão',frame:60},{label:'Apoio',frame:150},{label:'Press',frame:390},{label:'Formas',frame:870},{label:'Pausa ocre',frame:1030}]}]},carousel('abertura-participar','Ainda estou na parede. Posso participar?',participate)];

import { Freeze, Img, Sequence, getRemotionEnvironment, staticFile } from 'remotion';
import { Canvas, Headline, Label, CHALK, BrandSeal, EndCard, VideoScene, type PieceProps } from './kit';
import { AGUSTIN_BIO, AGUSTIN_ORIGIN } from '../home-content';
import type { Piece } from './pieces';
const url=(path:string)=>getRemotionEnvironment().isPlayer?'/festival/ig/'+path:staticFile('festival/ig/'+path);
const cards=[
 {title:['GABRIEL','AGUSTIN'],label:'QUEM FAZ O HANDSTANDFEST',body:'Artista circense, acrobata e professor de movimento. Argentino radicado no Brasil.',image:'gabriel/praia-reta.webp'},
 {title:['MOVIMENTO','COMO PESQUISA.'],label:'MAIS DE 10 ANOS DE TRAJETÓRIA',body:'Acrobacia, parada de mãos e práticas corporais. Um caminho de investigação, expressão e transformação.',image:'arte/engraving-v1/gabriel-reta-profile.webp'},
 {title:['DE UMA VIVÊNCIA','A UM ENCONTRO.'],label:'A IDEIA DO FESTIVAL',body:'Depois de uma experiência marcante na Argentina, Gabriel quis reunir pessoas, professores e diferentes olhares sobre a parada de mãos.',image:'gabriel/img-3377-freeze.webp'},
];
function BioCard({index,...p}:PieceProps & {index:number}){const item=cards[index];return <Freeze frame={90}><Canvas {...p} format="card" dark={index===1} signature={false}>
 <Label y={65} size={30} color={index===1?CHALK:undefined}>{item.label}</Label>
 <Headline lines={item.title} y={150} size={index===2?65:88} dark={index===1}/>
 <Img src={url(item.image)} style={{position:'absolute',left:80,top:380,width:920,height:650,objectFit:'contain'}}/>
 <Label y={1080} size={36} color={index===1?CHALK:undefined} style={{width:index===2?670:920}}>{item.body}</Label>
 {index===2&&<BrandSeal x={790} y={1130} size={220} still/>}
 </Canvas></Freeze>}
function Introduction(p:PieceProps){return <>
 <Sequence durationInFrames={180}><VideoScene {...p} src="gabriel/img-3372" lines={['GABRIEL','AGUSTIN']} note="ARTISTA CIRCENSE · PROFESSOR"/></Sequence>
 <Sequence from={180} durationInFrames={180}><VideoScene {...p} src="gabriel/img-3377" lines={['MOVIMENTO,','PESQUISA E TROCA.']} note="MAIS DE 10 ANOS DE TRAJETÓRIA"/></Sequence>
 <Sequence from={360} durationInFrames={120}><EndCard {...p} cta="Uma ideia do Gabriel. Um encontro de todos."/></Sequence>
 </>}
export const AGUSTIN_PIECES:Piece[]=[
 {id:'agustin-apresentacao',title:'Conheça Gabriel Agustin',format:'Carrossel',description:AGUSTIN_BIO+' '+AGUSTIN_ORIGIN,look:'Fotografia + gravura de perfil',movement:'Três lâminas estáticas; assinatura apenas na última. Bio fornecida por Paulo.',slides:cards.map((_,index)=>({name:['Gabriel Agustin','A trajetória','A origem do festival'][index],component:(p:PieceProps)=><BioCard {...p} index={index}/>,height:1440,seconds:1,cover:0,cues:[]}))},
 {id:'agustin-movimento',title:'Gabriel Agustin em movimento',format:'Reel',description:'Dois trechos reais de Gabriel: treino em casa e sequência na praia. A apresentação usa a biografia fornecida, sem áudio ou narração inventada.',look:'Cor natural / ocre',movement:'Dois planos de 6 s + convite de 4 s.',slides:[{name:'Gabriel em movimento',component:Introduction,height:1920,seconds:16,cover:30,cues:[{label:'Gabriel',frame:30},{label:'Movimento',frame:210},{label:'Festival',frame:400}]}]},
];

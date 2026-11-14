import { Img } from 'remotion';
import { Canvas, CHALK, MONO, WIDE, type PieceProps } from './kit';
import type { Piece } from './pieces';

/** Editorial references, not festival guests. Photo-led studies from the existing coach archive; publishing clearance remains pending. */
export const SPOTLIGHT_PROFILES = [
 {id:'em-foco-marie-eve',name:'MARIE-ÈVE\nDICAIRE',short:'Marie-Ève Dicaire',fact:'Da dança à parada de mãos: precisão e fluidez fazem parte da sua pesquisa artística.',observe:'Como uma posição se transforma em movimento?',detail:'Observe o caminho entre as formas — e não apenas a posição final.',source:'balancenotion.com',url:'https://balancenotion.com/'},
 {id:'em-foco-nicolas',name:'NICOLAS\nMONTES DE OCA',short:'Nicolas Montes de Oca',fact:'Artista circense que aproxima equilíbrio de mãos, dança e movimento.',observe:'O que acontece entre duas formas?',detail:'Um gesto também pode estar na passagem, no ritmo e na pausa.',source:'balancenotion.com',url:'https://balancenotion.com/'},
 {id:'em-foco-yuval',name:'YUVAL\nAYALON',short:'Yuval Ayalon',fact:'Da ginástica ao palco e ao ensino: uma trajetória dedicada ao movimento e à parada de mãos.',observe:'O que você observa antes de tentar?',detail:'Apoios, entradas e saídas também fazem parte de uma sequência.',source:'yuvalonhands.com',url:'https://www.yuvalonhands.com/'},
 {id:'em-foco-emmet',name:'EMMET\nLOUIS',short:'Emmet Louis',fact:'Professor de flexibilidade e cofundador do Handstand Factory, ao lado de Mikael Kristiansen.',observe:'Que mobilidade a sua prática pede?',detail:'Conhecer outras referências ajuda a formular perguntas melhores para o próprio treino.',source:'emmetlouis.com',url:'https://emmetlouis.com/'},
];
function FocusCard({profile,index,...props}:PieceProps & {profile:typeof SPOTLIGHT_PROFILES[number];index:number}) {
 const ochre='#dfab5b';
 const photo:Record<string,string>={'em-foco-marie-eve':'marie-eve-dicaire','em-foco-nicolas':'nicolas-montes-de-oca','em-foco-yuval':'yuval-ayalon','em-foco-emmet':'emmet-louis'};
 return <Canvas {...props} format="card" dark signature={false}>
  <div style={{position:'absolute',inset:38,border:`2px solid ${ochre}`,borderRadius:260}}/>
  <div style={{position:'absolute',inset:70,border:`1px solid ${ochre}`,borderRadius:230,opacity:.35}}/>
  <div style={{position:'absolute',left:105,right:105,top:125,fontFamily:MONO,fontSize:30,letterSpacing:5,color:ochre,display:index===0?'none':undefined}}>EM FOCO · {String(index+1).padStart(2,'0')} / 03</div>
  {index===0?<>
   <Img src={`https://media.balanceatlas.com/images/coaches/${photo[profile.id]}.webp`} style={{position:'absolute',left:0,top:130,width:1080,height:980,objectFit:'contain',objectPosition:profile.id==='em-foco-marie-eve'?'55% center':'center'}}/>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,35,28,.7),transparent 25%,transparent 65%,rgba(10,35,28,.95))'}}/>
   <div style={{position:'absolute',left:65,top:65,fontFamily:MONO,fontSize:30,color:ochre}}>EM FOCO</div>
   <div style={{position:'absolute',left:105,right:95,top:1080,...WIDE,fontSize:profile.id==='em-foco-nicolas'?70:86,lineHeight:1.12,whiteSpace:'pre-line',color:CHALK}}>{profile.name}</div>
   <div style={{position:'absolute',left:65,top:1040,width:140,height:9,background:ochre}}/>
   <div style={{position:'absolute',left:105,right:105,top:760,display:'none',fontSize:48,lineHeight:1.38,color:CHALK}}>{profile.fact}</div>
  </>:<>
   <div style={{position:'absolute',left:105,right:105,top:340,...WIDE,fontSize:65,lineHeight:1.13,color:CHALK}}>{index===1?profile.observe:'CONHEÇA O TRABALHO NA FONTE.'}</div>
   <div style={{position:'absolute',left:105,right:105,top:720,fontSize:48,lineHeight:1.4,color:CHALK}}>{index===1?profile.detail:<>Visite o perfil e os projetos de {profile.short}.<br/><br/>Referências para ampliar o olhar sobre o handstand.</>}</div>
  </>}
  <div style={{position:'absolute',left:105,right:105,bottom:index===0?50:145,fontFamily:MONO,fontSize:28,lineHeight:1.6,color:ochre}}>{profile.source}<br/>#handstandlife</div>
 </Canvas>;
}
export const SPOTLIGHT_PIECES:Piece[]=SPOTLIGHT_PROFILES.map(profile=>({
 id:profile.id,title:`Em foco: ${profile.short}`,format:'Carrossel',description:`${['em-foco-yuval','em-foco-emmet'].includes(profile.id)?'CAPA PROVISÓRIA: substituir retrato por foto de handstand/exercício antes de publicar. ':''}Estudo com foto do acervo de professores. Conferir crédito e permissão para publicação. Fonte: ${profile.url}. Referência editorial, sem selo HF e sem implicar participação no festival. Vídeo e hachura futuros dependem de material autorizado.`,look:'Em foco / moldura de holofote',movement:'Três cartões estáticos. A moldura destaca a pessoa; não há assinatura de evento.',
 slides:[0,1,2].map(index=>({name:['Conheça','O que observar','Fonte original'][index],component:(props:PieceProps)=><FocusCard {...props} profile={profile} index={index}/>,seconds:1,height:1440,cover:0,cues:[]}))
}));

import shots from './review-shots.json';
import { RETIRED_PIECES } from './catalog';
import { EDITORIAL } from './editorial';
import { suggestions } from './review-suggestions';
import batch from './natureza.json';
const goals=['Conversar sobre explorar movimentos em dupla.','Despertar curiosidade sobre a entrada saindo da água.','Comparar formas e observar a transição do pike.','Observar a passagem entre tuck e reta.','Valorizar a entrada como parte da prática.','Dar espaço à preparação antes da inversão.','Conversar sobre o repertório de formas.','Observar o straddle em movimento.','Observar a sequência de subida sem transformar o registro em tutorial.','Relacionar prática e memória de uma paisagem.','Mostrar a dimensão coletiva da prática.','Convidar a observar uma forma com calma.'];
const initialRows=batch.map((p,i)=>({id:p.id,title:p.title,kind:p.kind==='reel'?'Reel':'Story estático',goal:p.title,hook:p.hook.join('\n'),close:p.close?.join('\n'),caption:p.caption,freeze:p.freezeFrame? p.freezeFrame/30:0,art:['piscina-press-solo','deck-pike-reta'].includes(p.file),url:`/festival/instagram/#${p.id}`}));
initialRows.push({id:'gabriel-transicoes-tela',title:'Gabriel · entre formas',kind:'Reel',goal:'Valorizar o percurso entre formas, além da posição final.',hook:'TRANSIÇÕES:\nPIKE E TUCK.',close:'PRATIQUE ATÉ\nFICAR SUAVE.',caption:'Legenda a revisar no calendário; este painel registra os textos efetivos da composição.',freeze:6,art:true,url:'/festival/instagram/#gabriel-hachura'});


const rows=shots.filter(p=>!RETIRED_PIECES.has(p.id)).map(p=>{
 const original=initialRows.find(r=>r.id===p.id),day=EDITORIAL.find(d=>d.piece===p.id);
 const group=day?'Calendário':p.id.startsWith('natureza-')?'Natureza e água':'Biblioteca e alternativas';
 return {...original,id:p.id,title:p.title,kind:p.format,goal:original?.goal||day?.hook||p.description,hook:original?.hook||'',close:original?.close||'',caption:original?.caption||day?.caption||'Legenda ainda não registrada para esta versão.',freeze:original?.freeze||0,art:original?.art||false,url:original?.url||'/festival/instagram/',description:p.description,movement:p.movement,group,shots:p.shots,suggestion:suggestions[p.id]||('Proposta: '+p.title+'\nDefinir um detalhe visível como foco, em vez de perguntar genericamente sobre a prática.'),day:day?EDITORIAL.indexOf(day)+1:0};
}).sort((a,b)=>['Calendário','Natureza e água','Biblioteca e alternativas'].indexOf(a.group)-['Calendário','Natureza e água','Biblioteca e alternativas'].indexOf(b.group)||a.day-b.day);
const pending:Record<number,string>={
5:'Na canoinha, o que você observa nas pernas?\nMostrar a variação só das pernas, de perfil, com a explicação do Gabriel.',
8:'Você conhece Mikael Kristiansen e Emmet Louis?\nApresentar quem são e uma contribuição de cada um para o ensino de handstand.',
9:'Como fica a parte de cima na sua canoinha?\nRetomar a demonstração das pernas e apresentar a variação do tronco.',
10:'O que o Agustin gosta de ensinar?\nApresentar o professor com uma fala dele e um trecho real de treino.',
12:'Como está seu apoio de barriga para a parede?\nMostrar as etapas fotografadas e explicar a progressão com Gabriel.',
14:'Qual parte do treino na parede ainda te deixa em dúvida?\nEscolher uma pergunta real para responder no próximo post.',
15:'Como você distribui o apoio na caminhada do urso?\nPlano inteiro e detalhe das mãos, com uma observação do Gabriel.',
18:'O que seus ombros fazem quando você empurra o chão?\nComparar dois momentos do shrug na mesma posição de câmera.',
19:'Ainda está na parede: dá para participar do festival?\nResponder com os critérios oficiais das turmas e as dúvidas reais de inscrição.',
20:'Você usa gato-vaca antes do treino?\nDemonstrar o movimento de perfil e narrar o objetivo dessa preparação.'
};
for(const [i,d] of EDITORIAL.entries())if(!d.piece)rows.push({id:'pauta-'+d.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-'),title:d.title,kind:d.format,goal:d.hook,hook:d.hook,close:'',caption:d.caption,freeze:0,art:false,url:'/festival/instagram/#dia-'+(i+1),description:d.missing,movement:d.story,group:'Pautas a produzir',shots:[],suggestion:d.hook+'\nFalta preparar: '+d.missing,day:i+1});
export { rows };

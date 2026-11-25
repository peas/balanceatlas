import {useEffect,useMemo,useState} from 'react';
import {EDITORIAL} from './editorial';
import {CATALOG} from './catalog';
import Studio,{Preview} from './Studio';
import shots from './review-shots.json';
import covers from '../../../public/festival/ig/covers-v1/manifest.json';
import {OCHRE_TOKENS,type PieceProps} from './kit';
import './editorial.css';

// Publication receipts and media reuse are distinct from proposed dates.
import {PUBLISHED, REVIEW_HOLD, PUBLICATION_DATES} from './publication-history';
const FUTURE=EDITORIAL.filter(d=>!PUBLISHED[d.piece??'']&&!REVIEW_HOLD[d.piece??'']);
const dateAt=(start:string,i:number)=>{const d=new Date(`${start}T12:00:00`);d.setDate(d.getDate()+i);return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',weekday:'short'});};
const objectives:Record<string,string>={Evento:'Apresentar o festival de parada de mão e ajudar quem está chegando a entender como participar.',Exercício:'Mostrar uma demonstração real e um detalhe para observar. A orientação técnica será revisada pelo Gabriel.',Aprender:'Explicar um aspecto da parada de mão com imagens e linguagem acessível.',Prática:'Observar o movimento e abrir uma conversa específica sobre o treino.',Comunidade:'Conectar praticantes e mapear encontros e lugares para treinar.',Repertório:'Ampliar o olhar sobre as formas de praticar parada de mão.'};
const INPUT:PieceProps={palette:'ocre',treatment:'direction',guides:false};
function PostPreview({id}:{id:string}){
 const [open,setOpen]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{document.fonts.ready.then(()=>setReady(true));},[]);
 const piece=CATALOG.find(p=>p.id===id);
 const frames=shots.find(p=>p?.id===id)?.shots.slice(0,3)??[];
 if(!piece)return null;
 return <><div className="agenda-shots">{frames.map(s=><figure key={s.url}><a href={s.url} target="_blank" rel="noreferrer"><img src={s.url} alt={`${piece.title} · ${s.label}`} loading="lazy"/></a><figcaption>{s.label}</figcaption></figure>)}</div>
 <details className="agenda-player" onToggle={e=>setOpen(e.currentTarget.open)}><summary>{piece.format.includes('Carrossel')?'Ver todas as lâminas':'Assistir à composição'} · {piece.slides.length} {piece.slides.length===1?'peça':'partes'}</summary>{open&&<div className="ed-slides">{piece.slides.map((s,i)=><Preview key={i} slide={s} still={s.media?s.media==='image':piece.format==='Carrossel'||piece.format==='Estático'} ready={ready} inputProps={INPUT} label={s.name}/>)}</div>}</details></>;
}
export default function EditorialCalendar(){
 const [start,setStart]=useState('2026-11-26'),[week,setWeek]=useState(0),[filter,setFilter]=useState('Todos'),[archive,setArchive]=useState(false);
 const [copied,setCopied]=useState('');
 useEffect(()=>{const saved=localStorage.getItem('hf-agenda-future-2026-11-25');if(saved&&/^\d{4}-\d{2}-\d{2}$/.test(saved))setStart(saved);},[]);
 const items=useMemo(()=>FUTURE.map((day,index)=>({day,index,piece:CATALOG.find(p=>p.id===day.piece)})),[]);
 const visible=items.filter(({day,piece})=>filter==='Todos'||filter===day.pillar||filter==='Com prévia'&&piece||filter==='A produzir'&&!piece);
 const thumb=(id?:string)=>shots.find(p=>p?.id===id)?.shots[0]?.url;
 const weeks=Math.ceil(FUTURE.length/7);
 return <div className="editorial agenda" style={OCHRE_TOKENS}>
 <section className="ed-strategy"><p className="ed-kicker">AGENDA DE TRABALHO · PAULO E GABRIEL · REVISÃO 25 NOV</p><h2>Os próximos posts.</h2><p>{FUTURE.length} pautas em ordem sugerida: {items.filter(x=>x.piece).length} com composição e {items.filter(x=>!x.piece).length} ainda para produzir. Um post por dia é uma proposta, não um agendamento. Se faltar gravação ou revisão, a data muda.</p><p>As peças com Paulo como protagonista ficam para uma etapa posterior. A estreia já aconteceu: seis posts publicados estão no histórico abaixo. Esta agenda começa depois deles; não reinicia a semana de lançamento.</p></section>
 <section className="ed-production"><h3>Já saiu no Instagram · estreia concluída</h3><ul>{EDITORIAL.filter(d=>PUBLISHED[d.piece??'']).map(d=><li key={d.piece}>{PUBLICATION_DATES[d.piece!]} · <a href={PUBLISHED[d.piece!]} target="_blank" rel="noreferrer">{d.title} ↗</a></li>)}</ul><p>Conferido no perfil em 25/11: seis publicações. As datas abaixo são propostas para o que vem depois.</p></section>
 <nav className="ed-jumps"><a href="#calendario">Calendário</a><a href="#lista-posts">Todos os próximos posts</a><a href="/festival/instagram/gabriel/">O que gravar</a><a href="/festival/instagram/recebidos/">Vídeos recebidos</a><a href="#publicados">Já publicados</a><a href="#linguagem">Linguagem editorial</a></nav>
 <section id="calendario" className="ed-week"><div className="ed-controls"><label>Próximo dia sugerido <input type="date" value={start} onChange={e=>{if(e.target.value){setStart(e.target.value);localStorage.setItem('hf-agenda-future-2026-11-25',e.target.value);}}}/></label><span>Datas apenas para organizar a conversa; não publicam automaticamente.</span></div>
 <div className="ed-week-heading"><button aria-label="Semana anterior" disabled={week===0} onClick={()=>setWeek(w=>w-1)}>←</button><div><p className="ed-kicker">PRÓXIMOS POSTS · BLOCO {week+1} / {weeks}</p><h2>{dateAt(start,week*7)} — {dateAt(start,Math.min(week*7+6,FUTURE.length-1))}</h2></div><button aria-label="Próxima semana" disabled={week===weeks-1} onClick={()=>setWeek(w=>w+1)}>→</button></div>
 <nav className="ed-calendar ed-calendar-visual" aria-label="Posts da semana">{items.slice(week*7,week*7+7).map(({day,index,piece})=><a href={`#post-${index+1}`} key={index} onClick={()=>setFilter('Todos')}><small>{dateAt(start,index)}</small>{thumb(day.piece)?<img src={thumb(day.piece)} alt={day.title} loading="lazy"/>:<div className="ed-calendar-pending"><span>PARA PRODUZIR</span><strong>▶</strong><span>{day.format}</span></div>}<b>{index+1}. {day.title}</b><span>{day.format}</span><em>{piece?'Com prévia · revisar':'Gravação / material pendente'}</em></a>)}</nav></section>
 <section id="lista-posts" className="ed-controls"><h2>Peça por peça</h2><label>Filtrar <select value={filter} onChange={e=>setFilter(e.target.value)}>{['Todos','Com prévia','A produzir',...new Set(FUTURE.map(d=>d.pillar))].map(v=><option key={v}>{v}</option>)}</select></label></section>
 {visible.map(({day,index,piece})=><article className="ed-day" id={`post-${index+1}`} key={day.title}><header><p className="ed-kicker">{String(index+1).padStart(2,'0')} · {dateAt(start,index)} · {day.pillar}</p><h2>{day.title}</h2><p>{day.format} · {piece?'Composição para revisão':'Ainda para produzir'}{day.missing.startsWith('Adiado')?' · ETAPA POSTERIOR':''}</p></header>
 <div className="agenda-post"><div>{piece?<PostPreview id={piece.id}/>:<div className="ed-placeholder"><b>CAPTAÇÃO PENDENTE</b><h3>{day.hook}</h3><p>{day.missing}</p><a href="/festival/instagram/gabriel/">Ver referências para gravar →</a></div>}<h3>O que aparece</h3><p>{piece?.description??day.missing}</p>{piece&&<p>{piece.movement}</p>}</div>
 <aside><h3>Objetivo</h3><p>{objectives[day.pillar]}</p><h3>Chamada</h3><p><b>{day.hook}</b></p><div className="first-caption"><h3>Legenda proposta</h3><p>{day.caption}</p><button onClick={async()=>{try{await navigator.clipboard.writeText(day.caption);setCopied(day.title);}catch{setCopied('');}}}>{copied===day.title?'Copiada ✓':'Copiar legenda'}</button></div><h3>Story de apoio</h3><p>{day.story}</p><h3>Antes de publicar</h3><p>{day.missing}</p>{piece&&covers.find(c=>c.id===piece.id)&&<a href={covers.find(c=>c.id===piece.id)!.url} target="_blank" rel="noreferrer">Abrir capa atualizada →</a>}</aside></div></article>)}
 <section className="ed-production"><h2>Fora da agenda · evitar repetição</h2><p>Estudos preservados na biblioteca, sem data proposta. Só voltam com imagem e abordagem novas.</p><ul>{EDITORIAL.filter(d=>REVIEW_HOLD[d.piece??'']).map(d=><li key={d.piece}><strong>{d.title}</strong>: {REVIEW_HOLD[d.piece!]}</li>)}</ul></section>
 <section id="publicados" className="ed-production"><h2>Já publicados</h2><p>Histórico separado da agenda futura. Louisse também foi compartilhada nos Stories em 25/11.</p><ul>{EDITORIAL.filter(d=>PUBLISHED[d.piece??'']).map(d=><li key={d.piece}><a href={PUBLISHED[d.piece!]} target="_blank" rel="noreferrer">{d.title} ↗</a> · {d.format}</li>)}</ul></section>
 <details id="linguagem" className="ed-library"><summary>Nossa linguagem e critérios de revisão</summary><p>Cada post conversa com quem está chegando agora. Primeiro a prática, a pessoa ou o exercício; quando o evento entra, explicar que HandstandFest é um festival de parada de mão. Termos de treino vêm com contexto em português.</p><p>Carrosséis terminam com convite contextual para enviar a alguém, símbolo de enviar e assinatura HF. Imagens grandes, tinta ocre e congelamento pontual; nenhum texto deve esconder mãos ou pés. Reels educativos precisam da revisão técnica do Gabriel.</p><p>No Story, compartilhar o post quando houver uma conversa a continuar. Retomar depois só com nova dúvida ou contexto. #handstand e #handstandfest; #handstandlife para prática, aprendizado e comunidade.</p><p>Arquivos exportados antes de 25/11 precisam ser renderizados novamente. As prévias e capas desta agenda já usam a revisão editorial.</p><a href="/festival/instagram/press-estudo/">Estudo de animação em gravura →</a></details>
 <details className="ed-library" onToggle={e=>setArchive(e.currentTarget.open)}><summary>Biblioteca completa de estudos · fora da agenda</summary>{archive&&<Studio/>}</details>
 </div>;
}

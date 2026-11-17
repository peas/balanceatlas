import {useEffect,useState} from 'react';
import batch from '../../../acervo/lotes/gabriel-training-2026-11-17.json';
import directions from './training-review-direction.json';
import cuts from './gabriel-training-2026-11-17.json';
import {GABRIEL_TRAINING_PIECES} from './gabriel-training-pieces';
import {Preview} from './Studio';
import {OCHRE_TOKENS} from './kit';
import './training-review.css';
const KEY='hf-gabriel-received-20261117';
const CROP_KEY=KEY+'-crops-v2';
const INPUT={palette:'ocre',treatment:'direction',guides:false} as const;
type Item=typeof batch.items[number];
function SourceCard({item,notes,onNote}:{item:Item;notes:Record<string,string>;onNote:(id:string,text:string)=>void}){
 const d=directions.find(d=>d.id===item.id)!;
 const [frame,setFrame]=useState(item.duration?1:0),[zoom,setZoom]=useState(d.zoom),[original,setOriginal]=useState(false);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(CROP_KEY)||'{}')[item.id];if(typeof saved==='number'&&saved>=1&&saved<=1.65)setZoom(saved)}catch{}},[item.id]);
 function changeZoom(value:number){setZoom(value);let saved:Record<string,number>={};try{saved=JSON.parse(localStorage.getItem(CROP_KEY)||'{}')}catch{}saved[item.id]=value;localStorage.setItem(CROP_KEY,JSON.stringify(saved));}
 const count=item.duration?3:1;
 const src=`/festival/ig/gabriel-training-review-v2/${item.id}-${Math.min(frame,count-1)}.webp`;
 return <article className="tr-source" id={item.id}>
 <div className="tr-source-visual"><div className="tr-photo"><img src={src} alt={item.description} loading="lazy" style={{transform:`scale(${original?1:zoom})`,transformOrigin:d.origin}}/></div><div className="tr-frame-buttons">{Array.from({length:count},(_,i)=><button key={i} aria-pressed={frame===i} onClick={()=>setFrame(i)}>Momento {i+1}</button>)}</div>
 <label className="tr-zoom">Aproximar · {zoom.toFixed(2)}×<input type="range" min="1" max="1.65" step=".01" value={zoom} onChange={e=>changeZoom(+e.target.value)}/></label><button onClick={()=>setOriginal(!original)}>{original?'Ver recorte proposto':'Comparar sem zoom'}</button><small>Simulação de enquadramento. Conferir mãos e pés no vídeo inteiro antes de aplicar; não altera o original.</small></div>
 <div className="tr-source-copy"><span className={`tr-tag tr-${d.decision==='Guardar'?'archive':'use'}`}>{d.decision}</span><h3>{d.hook}</h3><p className="tr-format">{d.format}</p><p>{d.reason}</p><details><summary>Origem e observação visual</summary><p>{item.description}</p><code>{item.file}</code><p>{Math.round(item.duration||0)} s · {item.count_people} pessoa(s), estimativa · triagem por quadros.</p>{'sheet' in item&&<a href={item.sheet} target="_blank" rel="noreferrer">Ver folha de contato original ↗</a>}</details><label>Seu ajuste<textarea value={notes[item.id]||''} onChange={e=>onNote(item.id,e.target.value)} rows={4} placeholder="Usar? Outra chamada? Outro corte ou propósito?"/></label></div>
 </article>;
}
export default function TrainingReview(){
 const [ready,setReady]=useState(false),[notes,setNotes]=useState<Record<string,string>>({}),[filter,setFilter]=useState('Selecionados'),[search,setSearch]=useState('');
 useEffect(()=>{try{setNotes(JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{}document.fonts.ready.then(()=>setReady(true));},[]);
 function note(id:string,value:string){setNotes(prev=>{const next={...prev,[id]:value};localStorage.setItem(KEY,JSON.stringify(next));return next;});}
 function download(){const blob=new Blob(['# Revisão · Gabriel 17/11\n\n'+Object.entries(notes).filter(([,v])=>v.trim()).map(([k,v])=>`## ${k}\n${v}`).join('\n\n')+'\n\n## Zooms sugeridos (simulação)\n'+(localStorage.getItem(CROP_KEY)||'{}')],{type:'text/markdown'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='revisao-gabriel-20261117.md';a.click();URL.revokeObjectURL(url);}
 const shown=batch.items.filter(item=>{const d=directions.find(d=>d.id===item.id)!;return (filter==='Todos'||filter==='Selecionados'&&['Selecionar','Em composição'].includes(d.decision)||filter==='Complementos'&&['Complemento','Alternativa'].includes(d.decision)||filter==='Revisar / guardar'&&['Revisar','Guardar'].includes(d.decision))&&`${d.hook} ${item.file} ${item.description}`.toLowerCase().includes(search.toLowerCase());});
 return <div className="training-review" style={OCHRE_TOKENS}><header className="tr-hero"><p className="tr-kicker">HANDSTAND LIFE · MESA DE EDIÇÃO</p><h1>O movimento vem primeiro.</h1><p>O que publicar, o que aproximar e o que vale guardar. Oito peças em composição e 40 fontes únicas — sem confundir ângulos extras com exercícios novos.</p><nav><a href="#pecas">Ver as peças com assinatura ↓</a><a href="#fontes">Escolher o restante ↓</a><a href="/festival/instagram/#fixados">Os três posts de abertura ↗</a></nav></header>
 <section id="pecas"><p className="tr-kicker">01 · JÁ EM COMPOSIÇÃO</p><h2>Assim entra no Instagram.</h2><p>Vídeo, capa com destaque ocre e selo HF. A pausa final varia entre cor natural e P&B fotográfico; não é a gravura anatômica. Narração e orientação técnica ainda serão revisadas.</p><div className="tr-pieces">{GABRIEL_TRAINING_PIECES.map((piece,i)=>{const cut=cuts[i];const d=directions.find(d=>d.id===cut.source_id)!;return <article key={piece.id} id={piece.id}><Preview slide={piece.slides[0]} still={false} ready={ready} inputProps={INPUT} label={piece.title}/><h3>{piece.title}</h3><p>{d.reason}</p><p className="tr-format">{piece.look}</p><details><summary>Comparar com corte limpo</summary><video controls playsInline preload="none" src={cut.src} poster={cut.poster}/><p>Original preservado; esta versão não tem texto ou assinatura.</p></details><label>Texto, enquadramento ou ritmo<textarea rows={3} value={notes[piece.id]||''} onChange={e=>note(piece.id,e.target.value)} placeholder="O que você mudaria nesta peça?"/></label></article>})}</div></section>
 <section id="fontes"><p className="tr-kicker">02 · CURADORIA DO ACERVO</p><h2>Minha sugestão, vídeo por vídeo.</h2><p>Um quadro maior e outros dois momentos para comparar. Os zooms são propostas fixas, não movimento de câmera. Alunos e grupos estão liberados por você; a seleção técnica continua em revisão.</p><div className="tr-toolbar"><label>Mostrar<select value={filter} onChange={e=>setFilter(e.target.value)}>{['Selecionados','Complementos','Revisar / guardar','Todos'].map(f=><option key={f}>{f}</option>)}</select></label><label>Buscar<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Punhos, piscina, nome do arquivo…"/></label><strong>{shown.length} fontes</strong></div><div className="tr-sources">{shown.map(item=><SourceCard key={item.id} item={item} notes={notes} onNote={note}/>)}</div></section>
 <footer className="tr-save"><button onClick={download}>Baixar minhas observações</button><p>Salvas só neste navegador, na mesma chave da revisão anterior. Baixe o Markdown e envie para aplicar os ajustes. Nada é publicado no Instagram por aqui.</p></footer></div>;
}

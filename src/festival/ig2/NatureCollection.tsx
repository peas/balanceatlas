import { NATURE_BATCH, NATURE_PIECES } from './natureza-pieces';
import { GABRIEL_PIECES } from './gabriel-pieces';
import { Preview } from './Studio';
import type { PieceProps } from './kit';
const INPUT:PieceProps={palette:'ocre',treatment:'direction',guides:false};

export default function NatureCollection({ready}:{ready:boolean}) {
 return <section id="natureza" className="ed-production ed-nature">
  <p className="ed-kicker">NOVAS PEÇAS · NATUREZA E ÁGUA · 13/11/2026</p>
  <h2>Do movimento à pausa.</h2>
  <p>Nove Reels e três Stories estáticos, já com frase, ocre e selo HF. Nos vídeos, a cena congela na hora da pergunta final. O press solo e o pike ganham pessoa hachurada, cenário colorido e mancha ocre entre as camadas; os demais usam P&B fotográfico. As fotos preservam as cores da paisagem. Use estas peças para alternar prática, formas e comunidade no calendário.</p>
  <p className="ed-note">São composições prontas para revisão, não os cortes brutos. Sem música e sem postagem automática. Abaixo também está o Gabriel com a mesma aplicação de hachura. Use “Hachura + ocre” ou “Pintura” para ir direto à transformação.</p>
  <nav className="ed-jumps" aria-label="Novas peças">{NATURE_PIECES.map((p,i)=><a key={p.id} href={`#${p.id}`}>{String(i+1).padStart(2,'0')} · {p.title}</a>)}<a href="#gabriel-hachura">Gabriel · hachura</a><a href="#calendario">Ir ao calendário ↓</a></nav>
  <div className="ed-nature-grid">{NATURE_PIECES.map((piece,i)=><article id={piece.id} key={piece.id}>
   <h3>{piece.title}</h3><p>{piece.format} · {piece.format==='Reel'?`${piece.slides[0].seconds.toLocaleString('pt-BR')} s`:'PNG 9:16'}</p>
   <Preview slide={piece.slides[0]} still={piece.format==='Estático'} ready={ready} inputProps={INPUT} label={piece.title}/>
   <p className="ed-note">{piece.description}</p>
   <details><summary>Legenda sugerida e origem</summary><p className="ed-nature-caption">{NATURE_BATCH[i].caption}</p><small>Fonte: {NATURE_BATCH[i].sourceId}</small></details>
  </article>)}<article id="gabriel-hachura">
   <h3>Gabriel · entre formas e hachuras</h3>
   <p>Reel · 11 s · cenário original + tinta + figura</p>
   <Preview slide={GABRIEL_PIECES[0].slides[0]} still={false} ready={ready} inputProps={INPUT} label="Gabriel com hachura"/>
   <p className="ed-note">O vídeo congela em 6 s; a figura vira gravura e a mancha pinta atrás dela. Também atualizado no calendário.</p>
  </article></div>
 </section>;
}

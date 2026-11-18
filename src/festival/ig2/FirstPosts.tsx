// The first seven posts of the calendar on one page, as they would go out: every slide or the Reel, the cover
// frame a Reel needs, the caption to paste and the supporting Story idea. Review page, nothing is published from here.
import { useEffect, useMemo, useState } from 'react';
import { EDITORIAL } from './editorial';
import { CATALOG } from './catalog';
import { Preview } from './Studio';
import { OCHRE_TOKENS, type PieceProps } from './kit';
import './editorial.css';

const START = '2026-11-18';
const COUNT = 15;
const dateAt = (i: number) => { const d = new Date(`${START}T12:00:00`); d.setDate(d.getDate() + i); return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }); };

function Caption({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return <div className="first-caption">
    <h3>Legenda</h3>
    <p>{text}</p>
    <button onClick={() => navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })}>{copied ? 'Copiada' : 'Copiar legenda'}</button>
  </div>;
}

export default function FirstPosts() {
  const [ready, setReady] = useState(false);
  const [guides, setGuides] = useState(false);
  const input = useMemo<PieceProps>(() => ({ palette: 'ocre', treatment: 'direction', guides }), [guides]);
  useEffect(() => { document.fonts.ready.then(() => setReady(true)); }, []);
  const posts = EDITORIAL.slice(0, COUNT);
  return <div className="editorial first-posts" style={OCHRE_TOKENS}>
    <section className="ed-strategy">
      <p className="ed-kicker">INÍCIO DO PERFIL · {COUNT} PRIMEIROS POSTS</p>
      <h2>Os primeiros posts, como vão sair.</h2>
      <p>Cada post com todas as lâminas ou o Reel, a capa quando o formato pede, a legenda para colar e a ideia de Story. Nada aqui está publicado no Instagram.</p>
      <nav className="ed-jumps" aria-label="Posts">{posts.map((day, i) => <a key={i} href={`#post-${i + 1}`}>{i + 1} · {day.title}</a>)}</nav>
      <label className="ed-all-weeks"><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)} /> Mostrar guias da interface do Instagram (aproximadas)</label>
    </section>
    {posts.map((day, i) => {
      const piece = CATALOG.find(p => p.id === day.piece);
      const reel = piece?.format === 'Reel';
      return <article className="ed-day" id={`post-${i + 1}`} key={i}>
        <header>
          <p className="ed-kicker">POST {i + 1} · {dateAt(i)} · {day.pillar}{day.pinned ? ` · FIXADO ${day.pinned}` : ''}</p>
          <h2>{day.title}</h2>
          <p>{day.format}{piece && !reel && piece.slides.length > 1 ? ` de ${piece.slides.length} lâminas` : ''}{reel ? ` de ${Math.round(piece!.slides[0].seconds)} s, sem música (escolher no Instagram)` : ''}</p>
        </header>
        <div className="first-grid">
          <div>
            {piece ? <div className="ed-slides">
              {reel && <Preview slide={{ ...piece.slides[0], name: 'Capa', cues: [] }} still ready={ready} inputProps={input} label={`${day.title}, capa`} />}
              {piece.slides.map((slide, n) => <Preview key={n} slide={slide} still={!reel} ready={ready} inputProps={input} label={`${day.title}, ${slide.name}`} />)}
            </div> : <div className="ed-placeholder"><span>A PRODUZIR</span><h3>{day.hook}</h3><p>{day.missing}</p></div>}
          </div>
          <aside>
            <Caption text={day.caption} />
            <h3>Story de apoio</h3>
            <p>{day.story}</p>
            <h3>Conferir antes de publicar</h3>
            <p>{day.missing}</p>
          </aside>
        </div>
      </article>;
    })}
  </div>;
}

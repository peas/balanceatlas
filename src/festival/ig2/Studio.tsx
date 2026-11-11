import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type Slide } from './pieces';
import { CATALOG, STYLES, UNIT, type StyleId } from './catalog';
import { f, type PieceProps, type Treatment, type Palette, OCHRE_TOKENS } from './kit';
import './studio.css';
import { suggestedMusic } from './music';

function Preview({ slide, still, ready, inputProps, label }: { slide: Slide; still: boolean; ready: boolean; inputProps: PieceProps; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // All previews are in the document. Mount automatically near the viewport, never behind a click.
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); preload.disconnect(); }
    }, { rootMargin: '400px' });
    const visibility = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) player.current?.pause();
    });
    preload.observe(el);
    visibility.observe(el);
    return () => { preload.disconnect(); visibility.disconnect(); };
  }, []);
  return <div className="ig2-preview" role="group" aria-label={label}>
    <div className="ig2-preview-head"><span>{slide.name}</span><span>1080 × {slide.height}</span></div>
    <div className="ig2-player" ref={box} style={{ aspectRatio: `1080 / ${slide.height}` }}>
      {ready && near ? <Player ref={player} component={slide.component} inputProps={inputProps} durationInFrames={f(slide.seconds)} fps={30} compositionWidth={1080} compositionHeight={slide.height} initialFrame={slide.cover} controls={!still} loop={!still} clickToPlay={!still} acknowledgeRemotionLicense style={{ width: '100%', height: '100%' }} /> : <p>Preparando a prévia…</p>}
    </div>
    {slide.cues.length > 0 && <div className="ig2-cues" role="group" aria-label={`Momentos de ${slide.name}`}>
      {slide.cues.map(cue => <button key={cue.label} disabled={!ready || !near} onClick={() => { player.current?.seekTo(cue.frame); }}>{cue.label}</button>)}
    </div>}
  </div>;
}

export default function Studio() {
  const [treatment, setTreatment] = useState<Treatment>('direction');
  const [palette, setPalette] = useState<Palette>(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paleta') === 'original' ? 'original' : 'ocre');
  function changePalette(value: Palette) {
    setPalette(value);
    const url = new URL(window.location.href);
    if (value === 'original') url.searchParams.set('paleta', value); else url.searchParams.delete('paleta');
    window.history.replaceState(null, '', url);
  }
  const [style, setStyle] = useState<StyleId | 'todos'>(() => { const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''; return STYLES.some(s => s.id === h) ? h as StyleId : 'todos'; });
  function changeStyle(value: StyleId | 'todos') { setStyle(value); window.history.replaceState(null, '', value === 'todos' ? window.location.pathname + window.location.search : `#${value}`); }
  const [large, setLarge] = useState(true);
  const [guides, setGuides] = useState(false);
  const [ready, setReady] = useState(false);
  const inputProps = useMemo(() => ({ treatment, guides, palette }), [treatment, guides, palette]);
  useEffect(() => {
    let alive = true;
    Promise.all([document.fonts.load('900 80px Archivo'), document.fonts.load('700 30px "Space Mono"')]).catch(() => undefined).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);
  return <div className={`ig2-studio${large ? ' ig2-large' : ''}`} data-palette={palette} style={palette === 'ocre' ? OCHRE_TOKENS : undefined}>
    <div className="ig2-toolbar">
      <p className="ig2-overline">{CATALOG.length} peças · {STYLES.length} estilos · todas nesta página</p>
      <div className="ig2-options">
        <label>Paleta<select value={palette} onChange={e => changePalette(e.target.value as Palette)}><option value="ocre">Ocre / creme e verde</option><option value="original">Amarelo / comparação anterior</option></select></label>
        <label>Tratamento<select value={treatment} onChange={e => setTreatment(e.target.value as Treatment)}><option value="direction">Direção de cada peça</option><option value="cor">Cor natural</option><option value="pb">Preto e branco</option><option value="cru">Sem filtro adicional</option></select></label>
        <label className="ig2-guides"><input type="checkbox" checked={large} onChange={e => setLarge(e.target.checked)} /> Prévias maiores</label>
        <label className="ig2-guides"><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)} /> Zonas seguras</label>
      </div>
    </div>
    <div className="ig2-styles" role="group" aria-label="Estilos">
      <button aria-pressed={style === 'todos'} onClick={() => changeStyle('todos')}>Todos <span>{CATALOG.length}</span></button>
      {STYLES.map(s => <button key={s.id} aria-pressed={style === s.id} onClick={() => changeStyle(s.id)}>{s.name} <span>{CATALOG.filter(p => p.style === s.id).length}</span></button>)}
    </div>
    {STYLES.filter(s => style === 'todos' || style === s.id).map(s => <section className="ig2-style" id={s.id} key={s.id} aria-labelledby={`style-${s.id}`}>
      <header className="ig2-style-head"><p className="ig2-overline">Estilo {STYLES.indexOf(s) + 1} de {STYLES.length}</p><h2 id={`style-${s.id}`}>{s.name}</h2><p>{s.what}</p></header>
      <div className="ig2-gallery">
      {CATALOG.filter(p => p.style === s.id).map(piece => <article className="ig2-piece" id={piece.id} key={piece.id} aria-labelledby={`title-${piece.id}`}>
        <header className="ig2-piece-header">
          <p className="ig2-overline"><span className="ig2-number">{String(CATALOG.indexOf(piece) + 1).padStart(2, '0')}</span>{piece.format} · {piece.slides.length > 1 ? `${piece.slides.length} ${piece.format.startsWith('Carrossel') ? 'lâminas' : 'quadros'} · ` : ''}{Math.round(UNIT[piece.id].seconds)} s</p>
          <h3 id={`title-${piece.id}`}>{piece.title}</h3>
          <p>{piece.description}</p>
        </header>
        <div className="ig2-previews">
          <Preview slide={UNIT[piece.id]} still={false} ready={ready} inputProps={inputProps} label={piece.title} />
        </div>
        {piece.caption && <details className="ig2-caption"><summary>Legenda e material</summary><p><b>Legenda (rascunho)</b><br />{piece.caption}</p><p><b>Material</b><br /><code>{piece.material}</code></p></details>}
        <p className="ig2-notes"><strong>{piece.look}.</strong> {piece.movement}</p>
        {suggestedMusic[piece.id] && <aside className="ig2-music"><strong>Trilha para testar no Instagram</strong><a href={suggestedMusic[piece.id].url} target="_blank" rel="noopener">{suggestedMusic[piece.id].artist} · {suggestedMusic[piece.id].track} ↗</a><p>{suggestedMusic[piece.id].note}</p><small>Selecione a faixa no Instagram ao publicar. O export fica sem música.</small><details><summary>Ouvir referência aqui</summary><iframe title={`${suggestedMusic[piece.id].artist} — ${suggestedMusic[piece.id].track}`} src={`https://www.youtube-nocookie.com/embed/${new URL(suggestedMusic[piece.id].url).searchParams.get('v')}`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen/><small>Reprodução separada da prévia, para escolher o clima da trilha.</small></details></aside>}
      </article>)}
      </div>
    </section>)}
  </div>;
}

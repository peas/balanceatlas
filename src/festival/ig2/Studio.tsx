import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PIECES } from './pieces';
import { f, type Treatment } from './kit';
import './studio.css';

export default function Studio() {
  const [pieceIndex, setPieceIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [treatment, setTreatment] = useState<Treatment>('direction');
  const [guides, setGuides] = useState(false);
  const [ready, setReady] = useState(false);
  const player = useRef<PlayerRef>(null);
  const piece = PIECES[pieceIndex];
  const slide = piece.slides[slideIndex];
  const inputProps = useMemo(() => ({ treatment, guides }), [treatment, guides]);
  useEffect(() => {
    let alive = true;
    Promise.all([document.fonts.load('900 80px Archivo'), document.fonts.load('700 30px "Space Mono"')]).catch(() => undefined).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);
  function choose(index: number) { player.current?.pause(); setPieceIndex(index); setSlideIndex(0); }
  return <div className="ig2-studio">
    <aside className="ig2-library">
      <p className="ig2-overline">{PIECES.length} peças / uma direção</p>
      <div className="ig2-choices" role="group" aria-label="Escolher peça">
        {PIECES.map((item, i) => <button key={item.id} className="ig2-choice" aria-pressed={i === pieceIndex} onClick={() => choose(i)}>
          <span className="ig2-number">{String(i + 1).padStart(2, '0')}</span><span><small>{item.format}{item.slides.length > 1 ? ` · ${item.slides.length} quadros` : ` · ${item.slides[0].seconds.toLocaleString('pt-BR')} s`}</small><strong>{item.title}</strong></span><span aria-hidden>↗</span>
        </button>)}
      </div>
      <div className="ig2-direction">
        <h2>Reto no apoio.<br />Livre no movimento.</h2>
        <p>A tipografia organiza. A pincelada faz um gesto. O corpo continua sendo o centro da imagem.</p>
        <div className="ig2-swatches"><span /><span /><span /><small>Verde · amarelo · papel</small></div>
      </div>
    </aside>
    <section className="ig2-preview" aria-label="Prévia da peça">
      <div className="ig2-preview-head"><span>{piece.format} / {slide.name}</span><span>1080 × {slide.height}</span></div>
      <div className="ig2-player-wrap">
        <div className="ig2-player" style={{ aspectRatio: `1080 / ${slide.height}`, maxWidth: slide.height === 1440 ? 450 : 370 }}>
          {ready ? <Player key={`${piece.id}-${slideIndex}`} ref={player} component={slide.component} inputProps={inputProps} durationInFrames={f(slide.seconds)} fps={30} compositionWidth={1080} compositionHeight={slide.height} initialFrame={slide.cover} controls={piece.format !== 'Carrossel'} loop={piece.format !== 'Carrossel'} clickToPlay={piece.format !== 'Carrossel'} acknowledgeRemotionLicense style={{ width: '100%', height: '100%' }} /> : <p role="status">Preparando a prévia…</p>}
        </div>
      </div>
      {piece.slides.length > 1 && <div className="ig2-slides" role="group" aria-label="Escolher quadro">{piece.slides.map((item, i) => <button key={item.name} aria-pressed={slideIndex === i} onClick={() => { player.current?.pause(); setSlideIndex(i); }}>{i + 1}. {item.name}</button>)}</div>}
      {slide.cues.length > 0 && <div className="ig2-cues" role="group" aria-label="Momentos da composição">
        <span>Ver momento</span>{slide.cues.map(cue => <button key={cue.label} onClick={() => { player.current?.pause(); player.current?.seekTo(cue.frame); }}>{cue.label}</button>)}
      </div>}
      <div className="ig2-options">
        <label>Tratamento<select value={treatment} onChange={e => setTreatment(e.target.value as Treatment)}><option value="direction">Direção da peça</option><option value="cor">Cor natural</option><option value="pb">Preto e branco</option><option value="cru">Sem filtro adicional</option></select></label>
        <label className="ig2-guides"><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)} /> Zonas seguras</label>
      </div>
      <div className="ig2-notes" aria-live="polite"><h2>{piece.title}</h2><p>{piece.description}</p><dl><div><dt>Imagem</dt><dd>{piece.look}</dd></div><div><dt>Movimento</dt><dd>{piece.movement}</dd></div></dl></div>
    </section>
  </div>;
}

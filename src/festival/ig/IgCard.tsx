// One piece on /festival/instagram: the Remotion Player in a phone-shaped box, slide buttons for carousels and
// story sequences, and the safe-zone toggle. The Player mounts only when the card gets near the viewport
// (ten players with video would otherwise all preload at once).
import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FPS } from './kit';
import { REGISTRO } from './registro';

export default function IgCard({ id }: { id: string }) {
  const slides = REGISTRO[id];
  const [i, setI] = useState(0);
  const [guides, setGuides] = useState(false);
  const [near, setNear] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // ?montar=1 mounts every player at once (checks from a background tab, where the observer does not fire)
    if (new URLSearchParams(location.search).has('montar')) return setNear(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // for debugging in the console: window.__ig['p01-convite'].seekTo(120)
  useEffect(() => {
    const w = window as unknown as { __ig?: Record<string, PlayerRef | null> };
    (w.__ig ??= {})[id] = player.current;
  });

  const inputProps = useMemo(() => ({ guides }), [guides]); // a new object each render restarts the clock
  if (!slides?.length) return <p className="ig-missing">peça {id} ainda sem composição</p>;
  const s = slides[i];
  return (
    <div className="ig-player">
      <div className="ig-phone" ref={box} style={{ aspectRatio: `${s.w} / ${s.h}` }} onClick={() => setNear(true)}>
        {near && (
          <Player
            key={`${id}-${i}`}
            ref={player}
            component={s.comp}
            inputProps={inputProps}
            durationInFrames={s.frames}
            fps={FPS}
            compositionWidth={s.w}
            compositionHeight={s.h}
            initialFrame={s.capa ?? 0}
            controls
            loop
            clickToPlay
            acknowledgeRemotionLicense
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
      <div className="ig-tools">
        {slides.length > 1 && (
          <div className="ig-slides" role="tablist" aria-label="Lâminas">
            {slides.map((sl, k) => (
              <button key={k} role="tab" aria-selected={k === i} title={sl.nome} onClick={() => setI(k)}>
                {k + 1}
              </button>
            ))}
          </div>
        )}
        <span className="ig-dur">{s.nome ? `${s.nome} · ` : ''}{Math.round(s.frames / FPS)} s</span>
        <label className="ig-guides">
          <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} /> zonas seguras
        </label>
      </div>
    </div>
  );
}

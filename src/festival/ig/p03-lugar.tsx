// 03 · Reel "O lugar": a 16 s tour of the Trapézio Voador in four shots, story-style. REFERENCE PIECE: the other
// pieces follow this shape (one file, scenes as <Sequence>, hook on frame 0, graphics that come and go, <Fecho> last).
// The same tour, without the closing card, plays in the venue section of /festival (export `LugarSite`).
// Footage: catalogue ids pxl-20261104_192057904, img-3138, pxl-20261104_184654046, img-3141 (see midia.json).
import { Sequence } from 'remotion';
import { Barras, BarrasStory, Clip, Etiqueta, Fecho, Gancho, Quadro, REEL, f, type PecaProps } from './kit';
import type { Slide } from './tipos';

type Cena = { clip: string; dur: number; titulo: string; nota?: string; zoom: [number, number]; lado: 'left' | 'right' };
// Room names are plain descriptions; "pé-direito de 10 m" is the venue's own wording (trapeziovoador.com.br).
const CENAS: Cena[] = [
  { clip: 'tour-fachada', dur: 3.8, titulo: 'Onde vai ser?', nota: 'Trapézio Voador · São Paulo', zoom: [1.0, 1.08], lado: 'left' },
  { clip: 'tour-vidro', dur: 3.6, titulo: 'Sala de vidro', nota: 'piso de madeira, luz natural', zoom: [1.06, 1.0], lado: 'right' },
  { clip: 'tour-palco', dur: 3.6, titulo: 'Palco', nota: 'pé-direito de 10 m', zoom: [1.0, 1.08], lado: 'left' },
  { clip: 'tour-arena', dur: 3.2, titulo: 'Arena externa', nota: 'palco redondo ao ar livre', zoom: [1.05, 1.0], lado: 'right' },
];
const STARTS = CENAS.reduce<number[]>((acc, c, i) => [...acc, i === 0 ? 0 : acc[i - 1] + f(CENAS[i - 1].dur)], []);
const TOUR = STARTS[STARTS.length - 1] + f(CENAS[CENAS.length - 1].dur);
const FECHO = f(3.4);

const CenaView = ({ c, primeira }: { c: Cena; primeira: boolean }) => {
  const dur = f(c.dur);
  return (
    <>
      <Clip src={c.clip} zoom={c.zoom} />
      <Barras side={c.lado} outAt={dur - 14} v={520} h={300} y={1560} />
      {/* the first title is the hook: already on screen at frame 0 */}
      <Gancho lines={[c.titulo]} y={primeira ? 330 : 300} size={primeira ? 90 : 96} delay={primeira ? undefined : 3} outAt={dur - 12} tom={primeira ? 'accent' : 'chalk'} />
      {c.nota && <Etiqueta text={c.nota} x={65} y={primeira ? 540 : 440} delay={primeira ? 0 : 8} outAt={dur - 10} tom={primeira ? 'chalk' : 'ink'} />}
    </>
  );
};

const Tour = ({ guides, fecho }: PecaProps & { fecho: boolean }) => (
  <Quadro formato="reel" guides={guides}>
    {CENAS.map((c, i) => (
      <Sequence key={c.clip} from={STARTS[i]} durationInFrames={f(c.dur)}>
        <CenaView c={c} primeira={i === 0} />
      </Sequence>
    ))}
    <Sequence durationInFrames={TOUR}>
      <BarrasStory starts={STARTS} total={TOUR} />
    </Sequence>
    {fecho && (
      <Sequence from={TOUR} durationInFrames={FECHO}>
        <Fecho cta="Garanta sua vaga" sub="R. Alvarenga, 150 · metrô Butantã" />
      </Sequence>
    )}
  </Quadro>
);

export const Lugar = (p: PecaProps) => <Tour {...p} fecho />;
export const LugarSite = (p: PecaProps) => <Tour {...p} fecho={false} />;
export const LUGAR_SITE_FRAMES = TOUR;

export const slides: Slide[] = [{ comp: Lugar, frames: TOUR + FECHO, ...REEL, capa: 12 }];

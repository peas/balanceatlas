// 06 · Carrossel de vídeo "A jornada em cinco passos": 7 slides (CARD). Texts are the site's own five-step cards.
// Each slide is its own composition (frame 0 on every slide). See PECAS.md.
import type { ReactNode } from 'react';
import {
  ACCENT, ACCENT_INK, Barras, CARD, CHALK, Clip, Cronometro, Esqueleto, Fecho, Gancho, INK, Lamina, MONO, STAGE, WIDE,
  f, useIn, type PecaProps,
} from './kit';
import type { Slide } from './tipos';

const TOTAL = 7;

// ---------- local pieces ----------
const Kicker = () => (
  <div style={{ position: 'absolute', left: 60, top: 60, background: INK, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 26, lineHeight: 1.2, padding: '6px 12px' }}>
    a jornada em cinco passos
  </div>
);

/** Step number: a square-ish accent block. */
const Numero = ({ n, y, size, x = 60, delay = 2 }: { n: string; y: number; size: number; x?: number; delay?: number }) => {
  const e = useIn(delay);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, ...WIDE, fontSize: size, lineHeight: 1, background: ACCENT, color: ACCENT_INK,
      padding: `${size * 0.08}px ${size * 0.2}px ${size * 0.02}px`, minWidth: size, textAlign: 'center', boxSizing: 'border-box',
      transformOrigin: 'left center', transform: `scaleX(${e})`,
    }}>{n}</div>
  );
};

/** Body text: mono 700, chalk on an ink box. */
const Texto = ({ children, y, size = 32, width = 900, x = 60, delay = 6 }: { children: ReactNode; y: number; size?: number; width?: number; x?: number; delay?: number }) => {
  const e = useIn(delay);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, maxWidth: width, boxSizing: 'border-box', background: INK, color: CHALK,
      fontFamily: MONO, fontWeight: 700, fontSize: size, lineHeight: 1.25, padding: `${size * 0.32}px ${size * 0.5}px`,
      opacity: e, transform: `translateY(${(1 - e) * 30}px)`,
    }}>{children}</div>
  );
};

// ---------- slides ----------
// Hook moved from y 90 to y 130: at 112 px "A JORNADA" is 919 px wide and would run under the n/total counter.
const Capa = ({ guides }: PecaProps) => (
  <Lamina n={1} total={TOTAL} guides={guides}>
    <Clip src="palm-largo" from={0} focus={[50, 60]} />
    <Gancho lines={['A jornada', 'em cinco', 'passos']} x={60} y={130} size={112} tons={['chalk', 'accent', 'chalk']} />
  </Lamina>
);

const Chao = ({ guides }: PecaProps) => (
  <Lamina n={2} total={TOTAL} guides={guides}>
    <Clip src="j-chao" from={0} focus={[50, 70]} />
    <Kicker />
    <Numero n="1" y={120} size={150} />
    <Gancho lines={['Chão e parede']} x={60} y={300} size={76} />
    <Texto y={420}>Mãos no chão, punhos e ombros preparados, corpo em linha com o apoio da parede.</Texto>
  </Lamina>
);

const Entradas = ({ guides }: PecaProps) => (
  <Lamina n={3} total={TOTAL} guides={guides}>
    <Clip src="j-entrada" from={0} focus={[50, 60]} />
    <Kicker />
    <Numero n="2" y={120} size={150} />
    <Gancho lines={['Entradas']} x={60} y={300} size={76} />
    <Texto y={420}>Chutes, spotting, primeiros segundos sem apoio. Aprender a cair e a sair.</Texto>
  </Lamina>
);

// Title shrunk from 60 to 45: at 60 "SEGUNDOS" is 481 px wide, past the left column (x 60–430).
const Dez = ({ guides }: PecaProps) => (
  <Lamina n={4} total={TOTAL} guides={guides}>
    <Clip src="mural-reta" from={0} focus={[58, 45]}>
      <Esqueleto pose="mural-reta" from={0} prumo />
    </Clip>
    <Kicker />
    <Numero n="3" y={120} size={110} />
    <Gancho lines={['10', 'segundos']} x={60} y={270} size={45} />
    <Cronometro from={0} to={f(10.8)} x={60} y={470} size={76} label="livre" />
    <Texto y={700} size={28} width={370}>Segurar sozinho, com consistência. Corrigir com as mãos.</Texto>
  </Lamina>
);

// Number and title share the top strip below the kicker (number y 120, title y 150).
const Press = ({ guides }: PecaProps) => (
  <Lamina n={5} total={TOTAL} guides={guides}>
    <Clip src="j-press" from={0} focus={[50, 55]} />
    <Kicker />
    <Numero n="4" y={120} size={100} />
    <Gancho lines={['Formas e press']} x={206} y={150} size={60} />
    <Texto y={1285} size={28}>Mudar as pernas de posição, os shapes, e a subida de força.</Texto>
  </Lamina>
);

// Title shrunk from 150 to 130: at 150 "UMA MÃO" is 1043 px wide, past x 1020. Barras on the right, clear of the number.
const UmaMao = ({ guides }: PecaProps) => (
  <Lamina n={6} total={TOTAL} guides={guides}>
    <div style={{ position: 'absolute', inset: 0, background: STAGE }} />
    <Barras side="right" h={300} />
    <Kicker />
    <Numero n="5" y={160} size={300} />
    <Gancho lines={['Uma mão']} x={60} y={560} size={130} />
    <Texto y={800}>A parada de uma única mão, para quem segue por muito tempo.</Texto>
  </Lamina>
);

const Chamada = ({ guides }: PecaProps) => (
  <Lamina n={7} total={TOTAL} guides={guides}>
    <Fecho formato="card" cta="Link na bio" sub="básico · intermediário · avançado" />
  </Lamina>
);

export const slides: Slide[] = [
  { comp: Capa, frames: f(2.8), ...CARD, capa: 0, nome: 'capa' },
  { comp: Chao, frames: f(5.2), ...CARD, capa: 30, nome: 'chão e parede' },
  { comp: Entradas, frames: f(3.8), ...CARD, capa: 30, nome: 'entradas' },
  { comp: Dez, frames: f(11.4), ...CARD, capa: 30, nome: '10 segundos' },
  { comp: Press, frames: f(5.4), ...CARD, capa: 30, nome: 'formas e press' },
  { comp: UmaMao, frames: f(4), ...CARD, capa: 30, nome: 'uma mão' },
  { comp: Chamada, frames: f(4), ...CARD, capa: 45, nome: 'chamada' },
];

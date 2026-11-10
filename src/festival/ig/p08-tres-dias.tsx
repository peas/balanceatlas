// 08 · Carrossel de foto "3 dias": 6 slides (CARD), f(3) each, exported as stills (capa 45).
// The schedule is provisional on the site: slides 2–5 carry the note "grade provisória".
import {
  ACCENT, ACCENT_INK, CARD, CHALK, Etiqueta, Fecho, Foto, Gancho, INK, Lamina, MONO, QUANDO_CURTO, STAGE, f, useIn, type PecaProps,
} from './kit';
import { FEST } from '../data';
import type { Slide } from './tipos';

const TOTAL = 6;
const DUR = f(3);
const CAPA = 45;

type Linha = [hora: string, texto: string];

// ---------- local pieces ----------
/** One schedule row: time block (accent, fixed 150) + text (chalk on ink, max 760, wraps). Enters by index. */
const LinhaView = ({ hora, texto, i }: { hora: string; texto: string; i: number }) => {
  const e = useIn(4 + i * 3);
  const base = { fontFamily: MONO, fontSize: 30, lineHeight: 1.25, padding: '10px 14px', boxSizing: 'border-box' as const };
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', opacity: e, transform: `translateX(${(1 - e) * -60}px)` }}>
      <div style={{ ...base, fontWeight: 700, width: 150, flex: 'none', background: ACCENT, color: ACCENT_INK }}>{hora}</div>
      <div style={{ ...base, maxWidth: 760, background: INK, color: CHALK }}>{texto}</div>
    </div>
  );
};

const Grade = ({ linhas, y = 420 }: { linhas: Linha[]; y?: number }) => (
  <div style={{ position: 'absolute', left: 60, top: y, display: 'flex', flexDirection: 'column', gap: 16 }}>
    {linhas.map(([hora, texto], i) => <LinhaView key={hora} hora={hora} texto={texto} i={i} />)}
  </div>
);

// Spec says y 1360 at size 24; moved up to 1346 so the box ends above the card limit (y 1380).
const Provisoria = () => (
  <div style={{ position: 'absolute', left: 60, top: 1346, background: INK, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 24, lineHeight: 1, padding: '4px 10px' }}>
    grade provisória
  </div>
);

// ---------- data ----------
const MANHA: Linha[] = [
  ['9h', 'Yoga e mobilidade, todo mundo junto'],
  ['10h', 'Aquecimento de punhos e ombros'],
  ['10h30', 'Parada de mão'],
  ['12h', 'Almoço'],
];
const PRESS = 'Flexibilidade e força para press (inter e avançado)';
type Dia = { rotulo: string; fio: string; foto: string; linhas: Linha[]; nome: string };
const DIAS: Dia[] = [
  {
    rotulo: 'Sex', fio: 'Base', foto: 'tv-sala-vidro.webp', nome: 'sexta',
    linhas: [...MANHA, ['14h', `Acroyoga (básico) · ${PRESS}`], ['16h', 'Parada de mão'], ['17h30', 'Roda de abertura']],
  },
  {
    rotulo: 'Sáb', fio: 'Construção', foto: 'tv-palco-luzes.webp', nome: 'sábado',
    linhas: [...MANHA, ['14h', `Acro handstand corpo a corpo (básico) · ${PRESS}`], ['16h', 'Jam: treino livre com os professores circulando']],
  },
  {
    rotulo: 'Dom', fio: 'Integração', foto: 'tv-palco-largo.webp', nome: 'domingo',
    linhas: [
      ['9h', 'Aquecimento lento, todo mundo junto'], ...MANHA.slice(1),
      ['14h', `Handstand em objetos (básico) · ${PRESS}`], ['15h45', 'Jam de encerramento, roda final e foto'],
    ],
  },
];

// ---------- slides ----------
const Capa = ({ guides }: PecaProps) => (
  <Lamina n={1} total={TOTAL} guides={guides}>
    <Foto src="tv-fachada.webp" focus={[35, 50]} />
    <Gancho lines={['3 dias no', 'Trapézio', 'Voador']} x={60} y={80} size={104} tons={['chalk', 'accent', 'accent']} />
    <Etiqueta text={`${QUANDO_CURTO} · São Paulo`} x={60} y={1270} tom="chalk" size={36} />
  </Lamina>
);

// Hook shrunk from 150 to 132 ("4 BLOCOS" is 1058 px wide at 150) and moved to y 120 (clear of the counter);
// the two lines then end at ~y 450, so the rows start at y 490 instead of 420.
const Blocos = ({ guides }: PecaProps) => (
  <Lamina n={2} total={TOTAL} guides={guides}>
    <div style={{ position: 'absolute', inset: 0, background: STAGE }} />
    <Gancho lines={['4 blocos', 'por dia']} x={60} y={120} size={132} tons={['chalk', 'accent']} />
    <Grade y={490} linhas={[
      ['9h', 'yoga e mobilidade, todo mundo junto'],
      ['10h', 'aquecimento de punhos e ombros, na sua turma'],
      ['10h30', 'parada de mão'],
      ['14h', 'aula de tema'],
      ['16h', 'parada de mão ou jam'],
    ]} />
    <Provisoria />
  </Lamina>
);

// Day header shrunk from 110 to 94: at 110 "CONSTRUÇÃO" is 1091 px and "INTEGRAÇÃO" 1021 px wide, past x 1020.
const DiaView = ({ d, i, guides }: { d: Dia; i: number } & PecaProps) => (
  <Lamina n={3 + i} total={TOTAL} guides={guides}>
    <Foto src={d.foto} look="pb" filter="brightness(.45)" />
    <Gancho lines={[`${d.rotulo} ${FEST.dias[i]}`, d.fio]} x={60} y={110} size={94} tons={['accent', 'chalk']} />
    <Grade linhas={d.linhas} />
    <Provisoria />
  </Lamina>
);
const dia = (i: number) => (p: PecaProps) => <DiaView d={DIAS[i]} i={i} {...p} />;

const Chamada = ({ guides }: PecaProps) => (
  <Lamina n={6} total={TOTAL} guides={guides}>
    <Fecho formato="card" cta="Link na bio" />
  </Lamina>
);

export const slides: Slide[] = [
  { comp: Capa, frames: DUR, ...CARD, capa: CAPA, nome: 'capa' },
  { comp: Blocos, frames: DUR, ...CARD, capa: CAPA, nome: '4 blocos' },
  ...DIAS.map((d, i) => ({ comp: dia(i), frames: DUR, ...CARD, capa: CAPA, nome: d.nome })),
  { comp: Chamada, frames: DUR, ...CARD, capa: CAPA, nome: 'chamada' },
];

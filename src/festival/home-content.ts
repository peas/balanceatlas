// Shared event content for the original home and the art studies.
import { FEST, VENDA } from './data';
import type { PosterProps } from './compositions';

export const LOTES = [
  { n: '1º lote', price: VENDA.preco, note: 'Primeiras 10 vagas', state: 'aberto' },
  { n: '2º lote', price: 590, note: 'Próximas 35 vagas', state: 'proximo' },
  { n: '3º lote', price: 690, note: 'Últimas 15 vagas', state: 'proximo' },
] as const;
export const VAGAS = 60;
export const MAPS_Q = encodeURIComponent('Trapézio Voador, R. Alvarenga, 150, Jardim Guedala, São Paulo');
// The venue's own Google Maps link (footer of trapeziovoador.com.br, 04/11/2026)
export const MAPS_PLACE = 'https://www.google.com/maps/place/Trap%C3%A9zio+Voador+Escola+de+Artes+Circenses/@-23.5793024,-46.7071634,15z/data=!4m2!3m1!1s0x0:0xa5afb1ebf939a9e5';

// Schedule (Paulo, 04/11/2026): 4 classes a day, 2 of them split by level. Still provisional.
type Level = 'basico' | 'inter' | 'todos';
type Slot = { t: string; level: Level };
type Row = { time: string; all?: string; pause?: boolean } | { time: string; tracks: [Slot, Slot] };

// Shape after what handstand festivals do (Drive: pesquisas/festival-handstand-grade-diaria.md, 04/11/2026):
// yoga together but light, a wrist/shoulder warm-up per level right before class, jam instead of the last class
// on Saturday and Sunday, Sunday ending earlier with a closing circle. Each day has a thread: base → construção → integração.
const yoga: Row = { time: '9h — 9h45', all: 'Yoga e mobilidade, todo mundo junto' };
const prep = (time = '10h — 10h30'): Row => ({
  time,
  tracks: [{ t: 'Aquecimento de punhos e ombros', level: 'basico' }, { t: 'Aquecimento de punhos e ombros', level: 'inter' }],
});
const handstand = (time = '10h30 — 12h'): Row => ({
  time,
  tracks: [{ t: 'Parada de mão', level: 'basico' }, { t: 'Parada de mão', level: 'inter' }],
});
const lunch: Row = { time: '12h — 14h', all: 'Almoço', pause: true };
const third = (basico: string, time = '14h — 15h30'): Row => ({
  time,
  tracks: [{ t: basico, level: 'basico' }, { t: 'Flexibilidade e força para press', level: 'inter' }],
});

export const days: { id: string; label: string; date: string; arc: string; rows: Row[] }[] = [
  { id: 'sex', label: 'Sex', date: String(FEST.dias[0]), arc: 'Base', rows: [
    yoga, prep(), handstand(), lunch, third('Acroyoga'), prep('15h45 — 16h'), handstand('16h — 17h30'),
  ] },
  { id: 'sab', label: 'Sáb', date: String(FEST.dias[1]), arc: 'Construção', rows: [
    yoga, prep(), handstand(), lunch, third('Acro handstand corpo a corpo'),
    { time: '16h — 17h30', all: 'Jam: treino livre com os professores circulando' },
  ] },
  { id: 'dom', label: 'Dom', date: String(FEST.dias[2]), arc: 'Integração', rows: [
    { time: '9h — 9h45', all: 'Aquecimento lento, todo mundo junto' },
    prep(), handstand(), lunch, third('Handstand em objetos'),
    { time: '15h45 — 17h', all: 'Jam de encerramento, roda final e foto' },
  ] },
];

export const levelName: Record<Level, string> = { basico: 'Básico', inter: 'Intermediário e avançado', todos: 'Todos juntos' };
export const tracks = ['Básico', 'Intermediário e avançado'];



// Confirmed teachers share one list. Louisse/Dany quotations come from their Instagram profiles (checked 28/10/2026).
// Supplied by Paulo/Gabriel on 13 November 2026, edited for length.
export const AGUSTIN_BIO = 'Artista circense, acrobata e professor de movimento, argentino radicado no Brasil. Com mais de 10 anos nas artes do movimento, encontrou na parada de mãos um caminho de investigação, expressão e transformação.';
export const AGUSTIN_ORIGIN = 'A ideia do festival veio de Gabriel, após uma experiência marcante na Argentina: reunir pessoas, professores e diferentes perspectivas em torno da parada de mãos.';

export const lineup: { poster: PosterProps; teacher?: boolean; bio?: string; url?: string; quote?: string; source?: string; where: string }[] = [
  {
    poster: { img: '/festival/teacher.webp', first: 'Gabriel', last: 'Agustin', handle: '@agustin_melesi', shape: 'bar', focus: '50% 40%' },
    teacher: true,
    url: 'https://www.instagram.com/agustin_melesi/',
    bio: AGUSTIN_BIO,
    where: 'Parada de mãos, acrobacia e movimento',
  },
  {
    poster: { img: '/festival/teacher-lou.webp', first: 'Louisse', last: 'Aldrigues', handle: '@lou.handstand', shape: 'tee', focus: '50% 40%' },
    url: 'https://www.instagram.com/lou.handstand/',
    quote: 'Estudos do equilíbrio · Parada de mão · Treinamento consciente · Aulas online · Artista circense',
    source: 'https://www.instagram.com/lou.handstand/',
    where: 'Aulas presenciais e online',
  },
  {
    poster: { img: '/festival/teacher-dany.webp', first: 'Dany', last: 'García', handle: '@dany_slackwire', shape: 'block', focus: '50% 40%' },
    url: 'https://www.instagram.com/dany_slackwire/',
    quote: 'Artista Circense! · Alumno de la ENCLO 2025-2026 · Colombiano viviendo en Brasil',
    source: 'https://www.instagram.com/dany_slackwire/',
    where: 'Arame, parada de cabeça, malabares e acrobacia de solo',
  },
];

export const facts = ['3 dias', '4 aulas por dia', 'Do básico ao avançado', 'Butantã', `1º lote R$ ${VENDA.preco} + taxa`, `${VAGAS} vagas`, 'Handstand', 'Parada de mão'];


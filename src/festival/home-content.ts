// Shared event content for the original home and the art studies.
import { FEST, VENDA } from './data';
import type { PosterProps } from './compositions';

export { LOTES } from './data';
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



// Confirmed teachers share one list.
// Dany García was removed on Paulo's call (18/11/2026).
// Supplied by Paulo/Gabriel on 13 November 2026, edited for length.
export const AGUSTIN_BIO = 'Artista circense, acrobata e professor de movimento, argentino radicado no Brasil. Com mais de 10 anos nas artes do movimento, encontrou na parada de mãos um caminho de investigação, expressão e transformação.';
export const AGUSTIN_ORIGIN = 'A ideia do festival veio de Gabriel, após uma experiência marcante na Argentina: reunir pessoas, professores e diferentes perspectivas em torno da parada de mãos.';

// Supplied by Louisse through Gabriel on 20 November 2026. FULL is her text as sent; the short one is edited for length.
export const LOUISSE_BIO = 'Nascida em Brasília, Louisse começou no circo em 2011 e trabalhou com arte de rua até 2017. Em 2012 entrou na Escola Nacional de Circo, no Rio, onde se especializou em parada de mão. É professora de parada de mão desde 2015 e apresenta o número solo “Sensitiva”.';
export const LOUISSE_BIO_FULL = 'Louisse Aldrigues, nascida em Brasília, iniciou sua carreira circense em 2011. Trabalhou com arte de rua de 2011 até 2017 em semáforos, praças e metrôs. Em 2012 ingressou na Escola Nacional de Circo, RJ, onde iniciou sua especialização em parada de mão. Desde então até hoje, fez diversos workshops e aulas de parada de mão com mestres do Brasil, França, Itália, Inglaterra, México, Equador, Argentina, Japão, Canadá e outros. Professora de parada de mão desde 2015, ministra aulas regulares e workshops tendo passado por diversas escolas e festivais de circo e dança. Como artista atua com seu número solo “Sensitiva” com o qual trabalhou com diversas companhias e se apresentou em diversos festivais de circo, dança e teatro.';

export const lineup: { poster: PosterProps; teacher?: boolean; bio?: string; url?: string; quote?: string; source?: string; where: string; photos?: { src: string; alt: string }[] }[] = [
  {
    poster: { img: '/festival/teacher.webp', first: 'Gabriel', last: 'Agustin', handle: '@agustin_melesi', shape: 'bar', focus: '50% 40%' },
    teacher: true,
    url: 'https://www.instagram.com/agustin_melesi/',
    bio: AGUSTIN_BIO,
    where: 'Parada de mãos, acrobacia e movimento',
  },
  {
    poster: { img: '/festival/professores/louisse-02.webp', first: 'Louisse', last: 'Aldrigues', handle: '@lou.handstand', shape: 'tee', focus: '56% 50%' },
    url: 'https://www.instagram.com/lou.handstand/',
    bio: LOUISSE_BIO,
    where: 'Parada de mão e circo, aulas presenciais e online',
    photos: [
      { src: '/festival/professores/louisse-04.webp', alt: 'Louisse em um braço sobre canes, com as pernas afastadas' },
      { src: '/festival/professores/louisse-03.webp', alt: 'Louisse de perfil em parada de mão sobre um bloco' },
      { src: '/festival/professores/louisse-01.webp', alt: 'Louisse em parada de mão sobre um bloco, de frente para a câmera' },
    ],
  },
];

export const facts = ['3 dias', '4 aulas por dia', 'Do básico ao avançado', 'Butantã', `1º lote R$ ${VENDA.preco} + taxa`, `${VAGAS} vagas`, 'Handstand', 'Parada de mão'];


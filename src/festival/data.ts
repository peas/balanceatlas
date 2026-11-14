// 1º HandstandFest: data shared by /festival and its subpages.

export const R2 ='https://media.balanceatlas.com/images/retreats';
// Sympla publication verified 13/11/2026: event is public, but the ticket is “Não iniciado”.
// Paulo confirmed R$450 + R$45 service fee. Sales are still scheduled for 18 November.
export const VENDA = { abre: '2026-11-18T14:21:00-03:00', dia: '18/11', preco: 450, taxa: 45 } as const;
// Approved site pricing, 14 November 2026. External Sympla lot setup must be checked separately.
export const LOTES = [
  { n: '1º lote', price: VENDA.preco, fee: VENDA.taxa, vagas: 10, note: 'Primeiras 10 vagas', state: 'aberto' },
  { n: '2º lote', price: 550, fee: 55, vagas: 35, note: 'Próximas 35 vagas', state: 'proximo' },
  { n: '3º lote', price: 650, fee: 65, vagas: 15, note: 'Últimas 15 vagas', state: 'proximo' },
] as const;
export const SYMPLA = 'https://www.sympla.com.br/evento/1-handstandfest-festival-de-parada-de-mao/3650651';
export const SYMPLA_NO_AR = true;
export const TICKETS = SYMPLA_NO_AR ? SYMPLA : '/festival/#ingressos';
export const TICKETS_ALVO = SYMPLA_NO_AR ? '_blank' : undefined;

// The festival dates live here only (pages, FAQ and Remotion compositions read these)
export const FEST = { dias: [16, 17, 18], mes: 'abril', mesNumero: 4, mesCurto: 'abr', ano: 2027 } as const;
export const QUANDO = `${FEST.dias[0]} — ${FEST.dias[2]} ${FEST.mesCurto} ${FEST.ano}`; // 16 — 18 abr 2027
// Official channels. Only Instagram is linked (footer); the WhatsApp channel and YouTube (@handstandfest) exist but stay off the site for now (Paulo, 14/11/2026).
export const SOCIAL = {
  instagram: 'https://www.instagram.com/handstandfest/',
  whatsapp: 'https://whatsapp.com/channel/0029Vb9UELMI1rcb0UX16B3N',
} as const;

// Bento: photos and videos mixed. `video` cells play on hover (desktop) or when in view (touch).
export const R2V = 'https://media.balanceatlas.com/videos/retreats';
export type BentoItem = { src: string; alt: string; caption?: string; video?: string; span?: 'wide' | 'tall' | 'large'; pb?: boolean; engraving?: string; paint?: 'ochre' | 'green' }; // Independent image treatment and optional bristle underlay.
export const community: BentoItem[] = [
  { src: `${R2}/saopaulo-2024/96.webp`, alt: 'São Paulo, 2024', span: 'large' },
  { src: '/festival/posters/greece-2025-07.webp', video: `${R2V}/greece-2025/07.mp4`, alt: 'Paros, 2025', span: 'tall', pb: true },
  { src: `${R2}/thailand-2026/11.webp`, alt: 'Koh Phangan, 2026', span: 'wide' },
  { src: `${R2}/greece-2025/20.webp`, alt: 'Paros, 2025', span: 'tall' },
  { src: '/festival/posters/thailand-2026-10.webp', video: `${R2V}/thailand-2026/10.mp4`, alt: 'Koh Phangan, 2026', span: 'tall' },
  { src: `${R2}/saopaulo-2024/106.webp`, engraving: '/festival/ig/arte/engraving-v1/straddle-overhead.webp', alt: 'Gravura a partir de uma foto de parada de mão em straddle, São Paulo, 2024', caption: 'São Paulo · gravura', span: 'wide', paint: 'ochre' },
  { src: `${R2}/saopaulo-2024/94.webp`, alt: 'São Paulo, 2024' },
  { src: '/festival/posters/saopaulo-2024-04.webp', video: `${R2V}/saopaulo-2024/04.mp4`, alt: 'São Paulo, 2024', span: 'tall', pb: true },
  { src: `${R2}/greece-2025/09.webp`, alt: 'Paros, 2025', span: 'wide' },
  { src: `${R2}/thailand-2026/56.webp`, alt: 'Koh Phangan, 2026', span: 'tall', pb: true },
  { src: '/festival/posters/thailand-2026-09.webp', video: `${R2V}/thailand-2026/09.mp4`, alt: 'Koh Phangan, 2026', span: 'tall' },
  { src: `${R2}/saopaulo-2024/97.webp`, alt: 'São Paulo, 2024', span: 'wide' },
];

// FAQ: only what is already decided; Paulo's own FAQ text (about handstand) is still to come (his paste came empty, 04/11/2026).
export const faqFest: { q: string; a: string }[] = [
  { q: 'Quando e onde?', a: `Sexta, sábado e domingo, ${FEST.dias[0]}, ${FEST.dias[1]} e ${FEST.dias[2]} de ${FEST.mes} de ${FEST.ano}, no Trapézio Voador (R. Alvarenga, 150, Jardim Guedala), perto da Estação Butantã do metrô, em São Paulo.` },
  { q: 'Como é um dia do festival?', a: 'Yoga e mobilidade com todo mundo junto, aquecimento de punhos e ombros já na sua turma, parada de mão de manhã, almoço, uma aula de tema à tarde e, no fim do dia, parada de mão de novo ou jam com os professores circulando. Cada dia tem um fio: sexta é base, sábado é construção, domingo é integração, e termina mais cedo. A grade ainda está sendo ajustada com os professores.' },
  { q: 'Preciso já ficar em pé de mão?', a: 'Não. A turma de básico é para quem treina na parede e ainda não segura o livre. A turma de intermediário e avançado pede handstand livre por uns 10 segundos de forma consistente (30 é o ideal); é lá que entram press, one arm e formas.' },
  { q: 'Qual turma é a minha?', a: 'Se você ainda não segura o livre, básico. Se segura 10 segundos no livre com consistência, intermediário e avançado. Na dúvida, manda um vídeo curto quando se inscrever e a gente te ajuda a escolher.' },
  { q: 'Quanto custa?', a: `Passe completo para os 3 dias em três lotes: as primeiras 10 vagas a R$ ${VENDA.preco}, as 35 seguintes a R$ ${LOTES[1].price} e as últimas 15 a R$ ${LOTES[2].price}. São 60 vagas no total. Por enquanto só vendemos o passe completo. A venda é pelo Sympla, com taxa de serviço de 10% à parte (R$ ${LOTES[0].fee}, R$ ${LOTES[1].fee} e R$ ${LOTES[2].fee}, respectivamente) e parcela em até 12 vezes.` },
  { q: 'Como compro?', a: 'Pelo botão "Garanta sua vaga". Quando um lote esgota, o próximo abre sozinho.' },
  { q: 'Venho do yoga, do acroyoga ou da calistenia. É para mim?', a: 'Sim. O festival é para quem quer ampliar o repertório a partir da parada de mão, de qualquer prática: yoga, acroyoga, calistenia, circo, dança ou movimento.' },
  { q: 'Quem dá aula?', a: 'Gabriel Agustin, Louisse Aldrigues e Dany García. Cada turma tem também professores assistentes. Mais nomes em breve.' },
];
export const faqHandstand: { q: string; a: string }[] = [
  { q: 'Handstand ou parada de mão?', a: 'A mesma coisa. Usamos as duas palavras de propósito: quem pesquisa na internet procura mais por "handstand", e quem treina no Brasil fala "parada de mão".' },
  { q: 'Como começar?', a: 'Na parede, com pouco tempo e muita frequência: punhos e ombros aquecidos, barriga para a parede, segurar a linha por alguns segundos e descer com controle. Dez minutos por dia valem mais que uma hora por semana. No festival, a turma de básico começa exatamente daí.' },
  { q: 'Vou sair do festival fazendo parada de mão?', a: 'Depois de três dias, não. Ninguém aprende a segurar o livre num fim de semana. O que você leva: ferramentas para treinar, direção para os próximos meses e um ganho real no equilíbrio na parede e com assistência. E gente para treinar junto.' },
];

// "Sobre o evento": the organizers' text (Gabriel + Paulo, 04/11/2026), reworded for the page.
// Tabs are drawn as Instagram-style profile highlights (the social-media cue Paulo asked to keep exploring).
export const objetivos = [
  'Colocar a parada de mão no centro: como disciplina corporal, artística e expressiva.',
  'Abrir acesso a professores de especialidades diferentes, no mesmo fim de semana.',
  'Integrar o que sustenta o equilíbrio invertido: força, mobilidade, flexibilidade e movimento consciente.',
  'Explorar o handstand em dupla: mão a mão, acrobacia e invertidas sobre outros corpos.',
  'Misturar iniciantes, praticantes avançados, artistas e professores na mesma sala.',
  'Fazer as pessoas se conhecerem, criarem amizades e descobrirem interesses em comum.',
  'Estimular a criatividade, a pesquisa corporal e transições novas.',
  'Fortalecer a comunidade e abrir caminho para colaborações entre professores e artistas.',
];
export const publico = [
  { t: 'Começando', d: 'Quem está dando os primeiros passos na parada de mão, na parede ou perto dela.' },
  { t: 'Intermediário', d: 'Quem quer alinhamento, mais tempo no livre, flexibilidade e shapes.' },
  { t: 'Avançado', d: 'Press, one arm handstand e outras modalidades.' },
  { t: 'Circo', d: 'Artistas circenses e acrobatas.' },
  { t: 'Professores', d: 'Professores e profissionais do movimento.' },
  { t: 'Yoga, acro e cali', d: 'Praticantes de yoga, acroyoga, calistenia, força e mobilidade que querem ampliar o repertório.' },
];

// More photos for /festival/handstand: the ones the Balance Atlas home (/principal) shows, minus repeats.
export const atlasPhotos: BentoItem[] = [
  { src: `${R2}/thailand-2026/38.webp`, alt: 'Koh Phangan, 2026', span: 'large' },
  { src: `${R2}/greece-2025/01.webp`, alt: 'Paros, 2025', span: 'tall', pb: true },
  { src: `${R2}/saopaulo-2024/35.webp`, alt: 'São Paulo, 2024' },
  { src: `${R2}/thailand-2026/28.webp`, alt: 'Koh Phangan, 2026', pb: true },
  { src: `${R2}/saopaulo-2024/95.webp`, alt: 'São Paulo, 2024', span: 'wide' },
  { src: `${R2}/greece-2025/10.webp`, alt: 'Paros, 2025' },
  { src: `${R2}/saopaulo-2024/100.webp`, alt: 'São Paulo, 2024', span: 'wide' },
  { src: `${R2}/greece-2025/05.webp`, alt: 'Paros, 2025', pb: true },
  { src: `${R2}/thailand-2026/14.webp`, alt: 'Koh Phangan, 2026' },
  { src: `${R2}/greece-2025/19.webp`, alt: 'Paros, 2025', span: 'wide' },
  { src: `${R2}/thailand-2026/53.webp`, alt: 'Koh Phangan, 2026', span: 'wide', pb: true },
];

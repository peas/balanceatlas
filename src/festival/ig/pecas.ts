import { QUANDO, VENDA } from '../data';
// The ten Instagram pieces: what each one is, why, and the draft caption. No React here (the page reads it at build
// time); the compositions live in pNN-*.tsx and are wired in registro.ts.
export type Formato = 'reel' | 'carrossel-video' | 'carrossel-foto' | 'story';
export type Peca = {
  id: string;
  formato: Formato;
  titulo: string;
  ideia: string; // what it is and what it is for
  som: string; // what the piece carries and what goes in at upload
  legenda: string; // draft caption for the post
  material: string[]; // catalogue ids (acervo/catalogo.yaml)
};

export const ROTULO: Record<Formato, string> = {
  reel: 'Reel',
  'carrossel-video': 'Carrossel de vídeo',
  'carrossel-foto': 'Carrossel de foto',
  story: 'Stories',
};

export const PECAS: Peca[] = [
  {
    id: 'p01-convite',
    formato: 'reel',
    titulo: 'O convite',
    ideia: 'Os dois organizadores convidam, olhando para a câmera, com legenda queimada palavra por palavra. O quê, quando e onde aparecem antes dos 8 s. É a peça para fixar no topo do perfil.',
    som: 'Voz dos dois, sem música por baixo.',
    legenda: 'Queremos convidar vocês para o 1º festival de handstand do Brasil. De 16 a 18 de abril, no Trapézio Voador, em São Paulo, pertinho do metrô Butantã. Para quem vem do acroyoga, do yoga, da calistenia, do circo. Vagas no link da bio.',
    material: ['img-3161', 'img-3166-def713', 'img-3170', 'img-3171', 'img-3176'],
  },
  {
    id: 'p02-palmeiras',
    formato: 'reel',
    titulo: "1º HandstandFest Brasil",
    ideia: "Convite ao festival com duas câmeras do mesmo treino no Trapézio Voador. Data, local e convite aparecem entre os cortes.",
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: `${QUANDO} · 1º HandstandFest Brasil. Três dias para praticar com quem gosta de parada de mão, no Trapézio Voador, em São Paulo. Conheça o encontro no link da bio. #handstandfest`,
    material: ['img-3174', 'pxl-20261104_192358456', 'img-3173'],
  },
  {
    id: 'p03-lugar',
    formato: 'reel',
    titulo: 'O lugar',
    ideia: "Onde vai acontecer o HandstandFest? Um tour pela fachada, sala de vidro, palco e arena do Trapézio Voador, em São Paulo. A versão sem fechamento também aparece no site.",
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: "Onde vai acontecer o HandstandFest? No Trapézio Voador, em São Paulo, perto do metrô Butantã. Conheça o espaço onde vamos praticar juntos. #handstandfest",
    material: ['pxl-20261104_192057904', 'img-3138', 'pxl-20261104_184654046', 'img-3141'],
  },
  {
    id: 'p04-linha',
    formato: 'reel',
    titulo: 'A linha',
    ideia: "Um plano contínuo do palito para observar pequenos ajustes de equilíbrio. Não é mais anúncio de nível ou recorde; o encerramento é sobre a prática.",
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: "Você percebe os ajustes enquanto mantém o palito? A parada está sempre em balanço. Filme uma tentativa e observe as pequenas mudanças ao longo dela. #handstandlife",
    material: ['img-3177'],
  },
  {
    id: 'p05-dupla',
    formato: 'reel',
    titulo: 'Treinar junto',
    ideia: 'A dupla sincronizada no palco: primeiro com os dois esqueletos, depois o mesmo momento trocando entre o celular da frente e o de trás (que mostra o outro celular no tripé), e termina no cumprimento.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'Gente para treinar junto. Três dias de parada de mão no Trapézio Voador, de 16 a 18 de abril, com turma de básico e de intermediário e avançado. Link na bio.',
    material: ['pxl-20261104_183102030', 'img-3152', 'pxl-20261104_183943647'],
  },
  {
    id: 'p06-jornada',
    formato: "reel",
    titulo: "Tem turma para você",
    ideia: "Um único Reel de convite ao festival, com cortes de parede, entradas, press e reta. Reaproveita os vídeos da antiga jornada; não é carrossel de vídeos nem escala de recordes.",
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: "Ainda está na parede? Tem turma para você. Já explora outras formas? Também. O 1º HandstandFest reúne diferentes níveis para três dias de prática e troca. #handstandfest",
    material: ['img-3174', 'img-2389', 'img-3177', 'pxl-20261104_183102030'],
  },
  {
    id: 'p07-turma',
    formato: 'carrossel-foto',
    titulo: 'Qual é a sua turma?',
    ideia: "Cinco imagens estáticas: a parede como porta de entrada, a pergunta dos dez segundos, básico, intermediário/avançado e como escolher sua turma.",
    som: 'Sem som (carrossel de foto). Música escolhida no app na hora de postar.',
    legenda: "Ainda está na parede? Tem turma para você. O HandstandFest é para todos os níveis: básico para quem ainda treina com apoio; intermediário e avançado para quem sustenta o livre com consistência. Veja os critérios no site. #handstandfest",
    material: ['pxl-20261104_183102030', 'pxl_20261104_184620743', 'pxl_20261104_184633596'],
  },
  {
    id: 'p08-tres-dias',
    formato: 'carrossel-foto',
    titulo: '3 dias',
    ideia: 'A programação em seis lâminas sobre as nossas fotos do Trapézio Voador: os 4 blocos do dia e depois sexta (base), sábado (construção) e domingo (integração). Marcada como grade provisória.',
    som: 'Sem som (carrossel de foto). Música escolhida no app na hora de postar.',
    legenda: 'Três dias, quatro blocos por dia. Sexta é base, sábado é construção, domingo é integração. A grade ainda está sendo ajustada com os professores. De 16 a 18 de abril, no Trapézio Voador.',
    material: ['pxl_20261104_192125754', 'pxl_20261104_184620743', 'pxl_20261104_184633596', 'pxl_20261104_173348522'],
  },
  {
    id: 'p09-lote',
    formato: 'story',
    titulo: '1º lote',
    ideia: "Quatro Stories de pré-abertura: treino real em dupla, abertura em 18/11, preço/quantidades, programação e espaço para link nativo. Atualizar a versão explicitamente quando as vendas abrirem; não anuncia venda aberta antes da hora.",
    som: 'Mudo. Figurinha de link e música entram no app.',
    legenda: `Pré-abertura: ${VENDA.dia}. Primeiro lote R$ ${VENDA.preco} + R$ ${VENDA.taxa} de taxa. Inserir o link nativo no último Story; revisar condições antes de publicar.`,
    material: ["pxl-20261104_183102030", "pxl_20261104_184633596"],
  },
  {
    id: 'p10-pergunta',
    formato: 'reel',
    titulo: 'Vou sair fazendo parada de mão?',
    ideia: "A pergunta sobre sair fazendo parada de mão abre uma resposta sobre prática, ferramentas e continuidade, sem prometer um prazo para conquistar o livre.",
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: "Vou sair do festival fazendo parada de mão? Cada pessoa chega de um ponto. São três dias para praticar, trocar e levar ferramentas para continuar. O trabalho segue depois do encontro. #handstandfest",
    material: ['pxl-20261104_183102030', 'img-3147'],
  },
];

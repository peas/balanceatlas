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
    titulo: 'Duas câmeras nas palmeiras',
    ideia: 'O mesmo momento filmado por dois celulares, em cortes curtos e só com as figuras já montadas. Abre com um jogo: achar as duas pessoas de ponta-cabeça embaixo das palmeiras.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'Tem duas pessoas de ponta-cabeça nesta imagem. Achou? A arena do Trapézio Voador recebe o 1º HandstandFest de 16 a 18 de abril. Link na bio.',
    material: ['img-3174', 'pxl-20261104_192358456', 'img-3173'],
  },
  {
    id: 'p03-lugar',
    formato: 'reel',
    titulo: 'O lugar',
    ideia: 'Tour de 17 s pelo Trapézio Voador em quatro planos: fachada, sala de vidro, palco e arena. Responde "onde?" antes de qualquer pergunta e serve de Collab com o perfil do local. O mesmo tour, sem o cartão final, está na seção "Onde" do site.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'É aqui. O 1º HandstandFest acontece no Trapézio Voador, no Butantã, pertinho do metrô. Três dias de parada de mão, de 16 a 18 de abril. Vagas no link da bio.',
    material: ['pxl-20261104_192057904', 'img-3138', 'pxl-20261104_184654046', 'img-3141'],
  },
  {
    id: 'p04-linha',
    formato: 'reel',
    titulo: 'A linha',
    ideia: 'Uma parada de mão reta de 10,8 s em frente ao mural, com cronômetro, esqueleto e a linha de prumo. O texto é do Paulo ("Parece difícil? É muito mais do que parece.") e o fecho liga os 10 segundos à régua das turmas.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'Parece difícil? É muito mais do que parece. Dez segundos no livre é a régua da turma de intermediário e avançado do 1º HandstandFest. Ainda não segura? A turma de básico começa na parede. De 16 a 18 de abril, em São Paulo.',
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
    formato: 'carrossel-video',
    titulo: 'A jornada em cinco passos',
    ideia: 'Os cinco passos da página "Sobre handstand", um por lâmina, cada um com um trecho em loop: chão e parede, entradas, 10 segundos, formas e press, uma mão. A 2ª lâmina funciona sozinha, como segunda capa.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'A jornada em cinco passos. Os dois primeiros são a turma de básico do 1º HandstandFest; do terceiro em diante, intermediário e avançado. Em qual você está?',
    material: ['img-3174', 'img-2389', 'img-3177', 'pxl-20261104_183102030'],
  },
  {
    id: 'p07-turma',
    formato: 'carrossel-foto',
    titulo: 'Qual é a sua turma?',
    ideia: 'A régua de nível em cinco lâminas: a pergunta dos 10 segundos, básico, intermediário e avançado, e o que fazer na dúvida. Texto igual ao do site.',
    som: 'Sem som (carrossel de foto). Música escolhida no app na hora de postar.',
    legenda: 'Qual é a sua turma? Se você ainda não segura o livre, básico. Se segura 10 segundos longe da parede com consistência, intermediário e avançado. Na dúvida, manda um vídeo curto na inscrição.',
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
    ideia: 'Sequência de quatro stories para o dia em que a venda abrir: "Abriu.", preço com as 60 vagas desenhadas, o que tem, e o lugar da figurinha de link. Serve de molde para a virada de cada lote.',
    som: 'Mudo. Figurinha de link e música entram no app.',
    legenda: '(stories não têm legenda; a figurinha de link vai no 4º quadro)',
    material: ['pxl-20261104_192057904', 'pxl_20261104_184633596'],
  },
  {
    id: 'p10-pergunta',
    formato: 'reel',
    titulo: 'Vou sair fazendo parada de mão?',
    ideia: 'A pergunta mais honesta do FAQ, com a resposta do site, palavra por palavra: depois de três dias, não. E a lista do que a pessoa leva.',
    som: 'Mudo. Música escolhida no app na hora de postar.',
    legenda: 'Vou sair do festival fazendo parada de mão? Depois de três dias, não. Ninguém aprende a segurar o livre num fim de semana. O que você leva: ferramentas para treinar, direção para os próximos meses, um ganho real no equilíbrio na parede e com assistência. E gente para treinar junto.',
    material: ['pxl-20261104_183102030', 'img-3147'],
  },
];

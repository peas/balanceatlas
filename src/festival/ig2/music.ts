export type MusicSuggestion = {
  artist: string;
  track: string;
  url: string;
  note: string;
};

// Listening references only. Select the available recording in Instagram at upload.
// No audio file is downloaded, bundled or represented as already synchronized.
export const suggestedMusic: Record<string, MusicSuggestion> = {
  futebol: {
    artist: 'Jorge Ben Jor',
    track: 'Ponta de Lança Africano (Umbabarauma)',
    url: 'https://www.youtube.com/watch?v=J_92IfciSy0',
    note: 'Groove e futebol: testar a entrada da bola em um acento da música, preservando o tempo real do treino.',
  },
  junto: {
    artist: 'BaianaSystem',
    track: 'Lucro (Descomprimindo)',
    url: 'https://www.youtube.com/watch?v=y7NJN0MFnTw',
    note: 'Primeiro teste para energia coletiva. Usar a pulsação para as trocas de frase, sem cortar a sustentação do corpo.',
  },
  formas: {
    artist: 'Duda Beat',
    track: 'Meu Pisêro',
    url: 'https://www.youtube.com/watch?v=hkv-w5QJPC0',
    note: 'Pop dançante para o jogo de formas. Texto acompanha os acentos; o movimento continua em velocidade real.',
  },
  'arte-freeze-ocre': {
    artist: 'Luedji Luna + Maz',
    track: 'Banho de Folhas (Maz Remix)',
    url: 'https://www.youtube.com/watch?v=pgtH_FYNve8',
    note: 'Testar o congelamento em uma virada e deixar a batida continuar enquanto a tinta aparece.',
  },
  'arte-freeze-amarelo': {
    artist: 'Chico Science & Nação Zumbi',
    track: 'Maracatu Atômico',
    url: 'https://www.youtube.com/watch?v=sU69vV4gkUw',
    note: 'Teste de maior impacto no fundo verde. A pincelada pode entrar em um acento da percussão, sem tremor artificial.',
  },
  'fotos-ocre-motion': {
    artist: 'Gilsons',
    track: 'Várias Queixas',
    url: 'https://www.youtube.com/watch?v=bBHPq3UQFsw',
    note: 'Alternativa mais solar para as três fotos. Escolher um trecho já em movimento e alinhar as trocas de imagem no app.',
  },
};

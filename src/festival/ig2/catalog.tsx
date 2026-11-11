// Every Instagram piece of the festival on one page: the first ten (ig/) and the second study (ig2/), grouped by
// named visual style so Paulo and Gabriel can compare and pick. A new piece needs one entry in STYLE_OF.
import { PIECES, type Piece } from './pieces';
import { PECAS, ROTULO } from '../ig/pecas';
import { REGISTRO } from '../ig/registro';
import { FPS } from '../ig/kit';

export type StyleId = 'tela-cheia' | 'janela' | 'gravura' | 'congela' | 'foto-ocre';
export const STYLES: { id: StyleId; name: string; what: string }[] = [
  { id: 'tela-cheia', name: 'Tela cheia', what: 'O vídeo ocupa o quadro inteiro. O texto vai por cima, em tarjas e com uma palavra pincelada; barras e blocos marcam o ritmo.' },
  { id: 'janela', name: 'Janela no papel', what: 'Fundo creme. O texto tem um espaço só dele, em letras grandes, e o vídeo ou a foto aparece numa janela, sem nada por cima do corpo.' },
  { id: 'gravura', name: 'Gravura e mancha', what: 'Figura desenhada em traço de gravura sobre uma mancha de pincel, no creme ou no verde. Imagem parada, para carrossel e capa.' },
  { id: 'congela', name: 'Congela e pinta', what: 'O vídeo real roda, congela num quadro, vira preto e branco e recebe a pincelada com a mensagem.' },
  { id: 'foto-ocre', name: 'Foto P&B com ocre', what: 'Foto de verdade em preto e branco, com a pincelada ocre nas bordas e no fundo, fora dos corpos.' },
];

const STYLE_OF: Record<string, StyleId> = {
  'gravuras-aprovadas': 'gravura', 'arte-gravura': 'gravura',
  'arte-freeze-ocre': 'congela', 'arte-freeze-amarelo': 'congela',
  'fotos-ocre': 'foto-ocre', 'fotos-ocre-motion': 'foto-ocre',
};

export type CatalogPiece = Piece & { style: StyleId; caption?: string; material?: string };

const first: CatalogPiece[] = PECAS.map((p) => ({
  id: p.id, title: p.titulo, format: ROTULO[p.formato], description: p.ideia, look: 'Som', movement: p.som,
  style: 'tela-cheia', caption: p.legenda, material: p.material.join(' · '),
  slides: (REGISTRO[p.id] ?? []).map((s, i) => ({ name: s.nome ?? (i ? `Quadro ${i + 1}` : p.titulo), component: s.comp, seconds: s.frames / FPS, height: s.h, cover: s.capa ?? 0, cues: [] })),
})).filter((p) => p.slides.length);

const second: CatalogPiece[] = PIECES.map((p) => ({ ...p, style: STYLE_OF[p.id] ?? 'janela' }));

export const CATALOG: CatalogPiece[] = STYLES.flatMap((s) => [...first, ...second].filter((p) => p.style === s.id));

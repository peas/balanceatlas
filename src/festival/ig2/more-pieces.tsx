// Observation-led drafts from catalogued, owned footage. No exercise prescription.
import { Freeze, Sequence } from 'remotion';
import type { Piece, Slide } from './pieces';
import { Canvas, Facts, Headline, Label, Media, ACCENT, CHALK, f, type PieceProps } from './kit';
import { Selo } from '../ig/kit';

function Signoff({ guides, title, question }: PieceProps & { title: string[]; question: string }) {
  return <Canvas guides={guides} dark>
    <div style={{ position: 'absolute', left: 65, top: 280 }}><Selo size={240} giro={24} /></div>
    <Headline lines={title} y={620} size={94} dark />
    <Label y={1020} size={44} color={CHALK} style={{ width: 850 }}>{question}</Label>
    <Label y={1260} size={36} color={ACCENT}>HANDSTANDFEST · ALÉM DO FESTIVAL</Label>
  </Canvas>;
}

function Shapes(p: PieceProps) {
  return <>
    <Sequence durationInFrames={f(13)}>
      <Canvas {...p}>
        <Sequence durationInFrames={f(6.5)} layout="none"><Headline lines={['Parada?', 'Só no nome.']} size={98} accentLine={1} /></Sequence>
        <Sequence from={f(6.5)} layout="none"><Headline lines={['Muda a', 'forma.']} size={108} accentLine={1} /></Sequence>
        <Label y={550} size={40}>FIGURAS EM DUPLA · SALA DE VIDRO</Label>
        <Media src="ig2-formas" x={65} y={645} w={885} h={950} contain {...p} />
      </Canvas>
    </Sequence>
    <Sequence from={f(13)} durationInFrames={f(3.5)}><Signoff {...p} title={['Um apoio.', 'Muitas', 'formas.']} question="Qual mudança você percebeu primeiro?" /></Sequence>
  </>;
}

function Legs(p: PieceProps) {
  return <>
    <Sequence durationInFrames={f(12)}><Canvas {...p} dark>
      <Sequence durationInFrames={f(6)} layout="none"><Headline lines={['No mesmo', 'ritmo.']} size={104} dark /></Sequence>
      <Sequence from={f(6)} layout="none"><Headline lines={['Olha as', 'pernas.']} size={112} dark /></Sequence>
      <Label y={555} size={40} color={ACCENT}>DOIS CORPOS · UMA SEQUÊNCIA</Label>
      <Media src="ig2-pernas-l" x={65} y={645} w={885} h={950} contain look="pb" {...p} />
    </Canvas></Sequence>
    <Sequence from={f(12)} durationInFrames={f(3.5)}><Signoff {...p} title={['Treino', 'também', 'é jogo.']} question="Com quem você gostaria de treinar?" /></Sequence>
  </>;
}

function Press(p: PieceProps) {
  return <>
    <Sequence durationInFrames={f(12)}><Canvas {...p}>
      <Sequence durationInFrames={f(6)} layout="none"><Headline lines={['Antes de', 'ficar no ar.']} size={99} accentLine={1} /></Sequence>
      <Sequence from={f(6)} layout="none"><Headline lines={['Subir', 'faz parte.']} size={108} /></Sequence>
      <Label y={550} size={40}>PRESS EM DUPLA · TEMPO REAL</Label>
      <Media src="ig2-press-parque" x={65} y={645} w={885} h={950} contain {...p} />
    </Canvas></Sequence>
    <Sequence from={f(12)} durationInFrames={f(3.5)}><Signoff {...p} title={['Do chão.', 'Para o alto.']} question="Que parte da subida você quer ver mais de perto?" /></Sequence>
  </>;
}

function Door(p: PieceProps) {
  return <Canvas {...p} format="story">
    <Headline lines={['Pode', 'entrar.']} size={116} accentLine={1} />
    <Facts y={575} />
    <Media src="ig2-porta" x={65} y={685} w={800} h={800} contain {...p} />
    <Label y={1510} size={40}>TRAPÉZIO VOADOR · BUTANTÃ</Label>
  </Canvas>;
}
function Inside(p: PieceProps) {
  return <Canvas {...p} format="story" dark>
    <Headline lines={['Do outro', 'lado da porta.']} size={84} dark />
    <Facts y={555} dark />
    <Media src="ig2-porta" from={5.5} x={65} y={665} w={800} h={800} contain {...p} />
    <Label y={1500} size={40} color={CHALK}>UM DOS ESPAÇOS DO FESTIVAL</Label>
  </Canvas>;
}

const photos = [
  { name: 'A pergunta', title: ['Uma parada.', 'Quantas', 'formas?'], src: 'ig2-estrela-aberta.webp', size: 82, note: 'UM TREINO, VÁRIOS INSTANTES', caption: 'O que muda quando as pernas se afastam?', look: 'cor' },
  { name: 'Segunda capa', title: ['Você olha', 'para onde?'], src: 'ig2-estrela-reta.webp', size: 96, note: 'OLHAR PARA O MOVIMENTO', caption: 'Mãos, pernas, linha do corpo. Escolha um detalhe para observar.', look: 'pb' },
  { name: 'Aberta', title: ['Pernas', 'afastadas.'], src: 'ig2-estrela-aberta.webp', size: 104, note: '01 · UMA FORMA', caption: 'Uma abertura registrada durante a sequência em dupla.', look: 'cor' },
  { name: 'Juntas', title: ['Pernas', 'juntas.'], src: 'ig2-estrela-reta.webp', size: 112, note: '02 · OUTRA FORMA', caption: 'O mesmo treino, em outro instante.', look: 'pb' },
  { name: 'A conversa', title: ['E entre', 'uma e outra?'], src: 'ig2-estrela-transicao.webp', size: 96, note: '03 · A TRANSIÇÃO', caption: 'Qual forma você quer conhecer melhor? Conta para a gente.', look: 'cor' },
] as const;
function PhotoCard({ index, ...p }: PieceProps & { index: number }) {
  const item = photos[index];
  return <Canvas {...p} format="card">
    <Label x={60} y={65} size={36}>{item.note}</Label>
    <Headline lines={[...item.title]} x={60} y={155} size={item.size} accentLine={index === 0 ? 1 : -1} />
    <Media photo contain src={item.src} x={60} y={450} w={960} h={650} look={item.look} {...p} />
    <Label x={60} y={1150} size={44} style={{ width: 950 }}>{item.caption}</Label>
    <Label x={60} y={1330} size={28}>{String(index + 1).padStart(2, '0')} / 05</Label>
    {index === 4 ? <div style={{ position: 'absolute', right: 60, top: 1305 }}><Selo size={78} giro={16} /></div> : <Label x={750} y={1330} size={28}>ARRASTA →</Label>}
  </Canvas>;
}
const stillSlides: Slide[] = photos.map((item, index) => ({ name: item.name, component: (p: PieceProps) => <Freeze frame={30}><PhotoCard {...p} index={index} /></Freeze>, seconds: 5, height: 1440, cover: 30, cues: [] }));
const reel = (name: string, component: Slide['component'], seconds: number, middle: number): Slide => ({ name, component, seconds, height: 1920, cover: 24, cues: [{ label: 'Abertura', frame: 24 }, { label: 'Movimento', frame: f(middle) }, { label: 'Fecho', frame: f(seconds - 1.5) }] });

export const MORE_PIECES: Piece[] = [
  { id: 'formas', title: 'Parada? Só no nome.', format: 'Reel', description: 'As figuras mudam num plano contínuo. Um novo corte do jogo de formas na sala de vidro.', look: 'Cor natural', movement: 'Troca de frase, sem interromper o movimento. Sem data no fecho: conteúdo sobre a prática.', slides: [reel('Jogo de formas', Shapes, 16.5, 8)] },
  { id: 'ritmo', title: 'No mesmo ritmo', format: 'Reel', description: 'Uma sequência de pernas em L no parque, em tempo real. Preto e branco para concentrar o olhar nos dois corpos.', look: 'Preto e branco', movement: 'Plano contínuo e duas chamadas curtas. Nenhum desenho sobre mãos, pés ou pernas.', slides: [reel('Pernas em L', Legs, 15.5, 7)] },
  { id: 'subida', title: 'Antes de ficar no ar', format: 'Reel', description: 'A subida em press faz parte da peça. Observação de um treino real, sem transformar o vídeo em uma prescrição de exercício.', look: 'Cor natural', movement: 'Entrada e sustentação sem acelerar. A pincelada marca o gancho e sai com ele.', slides: [reel('Press no parque', Press, 15.5, 7)] },
  { id: 'porta', title: 'Pode entrar', format: 'Stories', description: 'Gabriel abre a porta e apresenta o palco em dois trechos contínuos de bastidor.', look: 'Cor natural sobre papel → verde', movement: 'O movimento vem da câmera e da entrada no espaço. Sem fingir botões ou stickers interativos.', slides: [{name:'A porta',component:Door,seconds:5.5,height:1920,cover:24,cues:[{label:'Entrada',frame:24},{label:'Porta aberta',frame:f(4)}]},{name:'Lá dentro',component:Inside,seconds:5.5,height:1920,cover:24,cues:[{label:'A sala',frame:24},{label:'O gesto',frame:f(3)}]}] },
  { id: 'olhar', title: 'Uma parada. Quantas formas?', format: 'Carrossel', description: 'Cinco imagens estáticas com texto. Quadros extraídos de outro vídeo do parque, sem reprodução de vídeo ou animação nas lâminas.', look: 'Cor alternada com P&B', movement: 'Sem movimento. A segunda lâmina funciona sozinha como outra capa.', slides: stillSlides },
];

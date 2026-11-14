// Observation-led drafts from catalogued, owned footage. No exercise prescription.
import { Freeze, Sequence, useCurrentFrame } from 'remotion';
import type { Piece, Slide } from './pieces';
import { Canvas, EndCard, VideoScene, BrandSeal, Facts, Headline, Label, Media, ACCENT, CHALK, f, type PieceProps } from './kit';
import { Selo } from '../ig/kit';

function Signoff({ guides, palette, title, question }: PieceProps & { title: string[]; question: string }) {
  return <Canvas guides={guides} palette={palette} dark signature={false}>
    <div style={{ position: 'absolute', left: 65, top: 280 }}><Selo size={300} giro={24} /></div>
    <Headline lines={title} y={620} size={94} dark />
    <Label y={1020} size={44} color={CHALK} style={{ width: 850 }}>{question}</Label>
    <Label y={1260} size={36} color={ACCENT}>HANDSTANDFEST · ALÉM DO FESTIVAL</Label>
  </Canvas>;
}

function Shapes(p:PieceProps){const frame=useCurrentFrame();return <><Sequence durationInFrames={f(18)}><VideoScene {...p} src="ig2-formas" wide lines={frame<f(6.5)?['PARADA?','SÓ NO NOME.']:['BALANCING:','AJUSTES CONTÍNUOS.']}/></Sequence><Sequence from={f(18)} durationInFrames={f(3.5)}><Signoff {...p} title={['Um apoio.','Muitas formas.']} question="As figuras mudam. Os ajustes continuam, mesmo quando a forma parece parada."/></Sequence></>;}
function Legs(p:PieceProps){const frame=useCurrentFrame();return <><Sequence durationInFrames={f(12)}><VideoScene {...p} src="ig2-pernas-l" wide look="pb" lines={frame<f(6)?['VAMOS TREINAR','JUNTOS?']:['3 DIAS.','UMA COMUNIDADE.']}/></Sequence><Sequence from={f(12)} durationInFrames={f(3.5)}><EndCard {...p} cta="Todos os níveis. Vem junto."/></Sequence></>;}
function Press(p:PieceProps){const frame=useCurrentFrame();return <><Sequence durationInFrames={f(12)}><VideoScene {...p} src="ig2-press-parque" wide lines={frame<f(6)?['DA PAREDE','ÀS NOVAS FORMAS.']:['TEM ESPAÇO','PARA VOCÊ.']}/></Sequence><Sequence from={f(12)} durationInFrames={f(3.5)}><EndCard {...p} cta="Treinar, trocar e aprender juntos."/></Sequence></>;}
function Door(p:PieceProps){return <VideoScene {...p} src="ig2-porta" lines={['CONHEÇA O','HANDSTANDFEST.']} note="TRAPÉZIO VOADOR · BUTANTÃ"/>;}
function Inside(p:PieceProps){return <VideoScene {...p} src="ig2-porta" from={5.5} lines={['GABRIEL ABRE','A PORTA.']} note="UM DOS ESPAÇOS DO FESTIVAL"/>;}

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
    <Label x={60} y={1150} size={44} style={{ width: index === 4 ? 710 : 950 }}>{item.caption}</Label>
    <Label x={60} y={1330} size={36}>{String(index + 1).padStart(2, '0')} / 05</Label>
    {index === 4 ? <BrandSeal x={805} y={1190} size={200} still/> : <Label x={710} y={1330} size={36}>ARRASTA →</Label>}
  </Canvas>;
}
const stillSlides: Slide[] = photos.map((item, index) => ({ name: item.name, component: (p: PieceProps) => <Freeze frame={30}><PhotoCard {...p} index={index} /></Freeze>, seconds: 5, height: 1440, cover: 30, cues: [] }));
const reel = (name: string, component: Slide['component'], seconds: number, middle: number): Slide => ({ name, component, seconds, height: 1920, cover: 24, cues: [{ label: 'Abertura', frame: 24 }, { label: 'Movimento', frame: f(middle) }, { label: 'Fecho', frame: f(seconds - 1.5) }] });

export const MORE_PIECES: Piece[] = [
  { id: 'formas', title: 'Parada? Só no nome.', format: 'Reel', description: 'As figuras mudam num plano contínuo. Um novo corte do jogo de formas na sala de vidro.', look: 'Cor natural', movement: 'Troca de frase, sem interromper o movimento. Sem data no fecho: conteúdo sobre a prática.', slides: [reel('Jogo de formas', Shapes, 21.5, 10)] },
  { id: 'ritmo', title: 'No mesmo ritmo', format: 'Reel', description: 'Uma sequência de pernas em L no parque, em tempo real. Preto e branco para concentrar o olhar nos dois corpos.', look: 'Preto e branco', movement: 'Plano contínuo e duas chamadas curtas. Nenhum desenho sobre mãos, pés ou pernas.', slides: [reel('Pernas em L', Legs, 15.5, 7)] },
  { id: 'subida', title: 'Antes de ficar no ar', format: 'Reel', description: 'A subida em press faz parte da peça. Observação de um treino real, sem transformar o vídeo em uma prescrição de exercício.', look: 'Cor natural', movement: 'Entrada e sustentação sem acelerar. A pincelada marca o gancho e sai com ele.', slides: [reel('Press no parque', Press, 15.5, 7)] },
  { id: 'porta', title: 'Pode entrar', format: 'Stories', description: 'Gabriel abre a porta e apresenta o palco em dois trechos contínuos de bastidor.', look: 'Cor natural sobre papel → verde', movement: 'O movimento vem da câmera e da entrada no espaço. Sem fingir botões ou stickers interativos.', slides: [{name:'A porta',component:Door,seconds:5.5,height:1920,cover:24,cues:[{label:'Entrada',frame:24},{label:'Porta aberta',frame:f(4)}]},{name:'Lá dentro',component:Inside,seconds:5.5,height:1920,cover:24,cues:[{label:'A sala',frame:24},{label:'O gesto',frame:f(3)}]}] },
  { id: 'olhar', title: 'Uma parada. Quantas formas?', format: 'Carrossel', description: 'Cinco imagens estáticas com texto. Quadros extraídos de outro vídeo do parque, sem reprodução de vídeo ou animação nas lâminas.', look: 'Cor alternada com P&B', movement: 'Sem movimento. A segunda lâmina funciona sozinha como outra capa.', slides: stillSlides },
];

// Copy and footage from ig/PECAS.md and the existing festival pages. No new event claims.
import type { ComponentType } from 'react';
import { Freeze, Sequence } from 'remotion';
import { MORE_PIECES } from './more-pieces';
import { Canvas, EndCard, Facts, Headline, Label, Media, ACCENT, CHALK, STAGE, f, type PieceProps } from './kit';
import { QUANDO } from '../data';

export type Slide = { name: string; component: ComponentType<PieceProps>; seconds: number; height: number; cover: number; cues: { label: string; frame: number }[] };
export type Piece = { id: string; title: string; format: string; description: string; look: string; movement: string; slides: Slide[] };

function Together(p: PieceProps) {
  return <>
    <Sequence durationInFrames={f(5)}><Canvas {...p}>
      <Headline lines={['Gente para', 'treinar', 'junto.']} size={92} accentLine={2} />
      <Facts y={635} /><Media src="dupla-reta" x={65} y={730} w={800} h={820} from={.4} {...p} />
    </Canvas></Sequence>
    <Sequence from={f(5)} durationInFrames={f(4.5)}><Canvas {...p} dark>
      <Headline lines={['Treinar', 'junto.']} size={96} dark />
      <Facts y={530} dark /><Media src="dupla-a" from={2} look="pb" {...p} />
    </Canvas></Sequence>
    <Sequence from={f(9.5)} durationInFrames={f(4.5)}><Canvas {...p}>
      <Headline lines={['Vem junto.']} size={105} y={335} accentLine={0} />
      <Facts /><Media src="dupla-b" from={15} {...p} />
    </Canvas></Sequence>
    <Sequence from={f(14)} durationInFrames={f(3.5)}><EndCard {...p} /></Sequence>
  </>;
}
const rooms = [
  { src: 'tour-fachada', title: ['É aqui.'], note: 'TRAPÉZIO VOADOR · BUTANTÃ', duration: 3.8, look: 'cor' },
  { src: 'tour-vidro', title: ['Sala de vidro'], note: 'PISO DE MADEIRA, LUZ NATURAL', duration: 3.6, look: 'cor' },
  { src: 'tour-palco', title: ['Palco'], note: 'PÉ-DIREITO DE 10 M', duration: 3.6, look: 'pb' },
] as const;
function Venue(p: PieceProps) {
  return <>
    {rooms.map((room, i) => <Sequence key={room.src} from={f(i === 0 ? 0 : i === 1 ? 3.8 : 7.4)} durationInFrames={f(room.duration)}>
      <Canvas {...p}>
        <Headline lines={room.title.slice()} size={i === 1 ? 75 : 117} y={300} accentLine={i === 0 ? 0 : -1} />
        <Label y={455} size={40}>{room.note}</Label><Facts y={525} />
        <Media src={room.src} y={605} h={945} look={room.look} {...p} />
      </Canvas>
    </Sequence>)}
    <Sequence from={f(11)} durationInFrames={f(3.5)}><EndCard {...p} cta="3 dias no Trapézio Voador." /></Sequence>
  </>;
}
function Line(p: PieceProps) {
  // Full uncropped portrait; headline gets the entire safe width for phone legibility.
  return <>
    <Sequence durationInFrames={f(11)}><Canvas {...p}>
      <Media src="mural-reta" x={65} y={640} w={885} h={1000} contain look="pb" {...p} />
      <Sequence durationInFrames={f(5)} layout="none">
        <Headline lines={['Parece', 'difícil?']} size={100} />
      </Sequence>
      <Sequence from={f(5)} layout="none">
        <Headline lines={['É muito mais', 'do que parece.']} size={80} />
      </Sequence>
      <Facts y={540} />
    </Canvas></Sequence>
    <Sequence from={f(11)} durationInFrames={f(3.5)}><EndCard {...p} cta="Básico · intermediário · avançado" /></Sequence>
  </>;
}
// Same reviewed crop as Line: img-3177, child outside the frame; the ball enters near source 9 s.
function Football(p: PieceProps) {
  return <>
    <Sequence durationInFrames={f(10)}><Canvas {...p}>
      <Sequence durationInFrames={f(5.5)} layout="none">
        <Headline lines={['Gosta de', 'futebol?']} size={105} accentLine={1} />
      </Sequence>
      <Sequence from={f(5.5)} layout="none">
        <Headline lines={['Aqui a mão', 'não é falta.']} size={89} accentLine={1} />
      </Sequence>
      <Media src="mural-reta" from={3.4} x={65} y={610} w={885} h={960} contain {...p} />
    </Canvas></Sequence>
    <Sequence from={f(10)} durationInFrames={f(3.5)}><EndCard {...p} cta="Vem fazer handstand!" /></Sequence>
  </>;
}
function ClassCover(p: PieceProps) {
  return <Canvas {...p} format="card"><Headline lines={['Qual é', 'a sua turma?']} y={105} size={91} accentLine={1} />
    <Label y={340} size={40}>{QUANDO.toUpperCase()} · SÃO PAULO</Label>
    <Media src="still-dupla.webp" photo x={60} y={430} w={960} h={870} {...p} />
    <Label x={60} y={1330} size={26}>01 / 05 <span style={{ marginLeft: 560 }}>ARRASTA →</span></Label>
  </Canvas>;
}
function ClassQuestion(p: PieceProps) {
  return <Canvas {...p} format="card" dark>
    <Label x={60} y={80} size={36} color={CHALK}>HANDSTANDFEST · {QUANDO.toUpperCase()}</Label>
    <Headline lines={['Você segura', '10 segundos', 'longe da', 'parede?']} x={60} y={305} size={93} dark />
    <Label x={60} y={1010} size={42} color={ACCENT}>QUAL É A SUA TURMA?</Label>
    <Label x={60} y={1330} size={26} color={CHALK}>02 / 05</Label>
  </Canvas>;
}
function Basic(p: PieceProps) {
  return <Canvas {...p} format="card">
    <Label x={60} y={75} size={40}>AINDA NÃO</Label>
    <Headline lines={['Básico']} x={60} y={170} size={125} accentLine={0} />
    <Label x={60} y={380} size={44} style={{ width: 925 }}>Você treina na parede e ainda não segura o livre.</Label>
    <Media photo src="tv-sala-vidro.webp" x={60} y={595} w={960} h={520} {...p} />
    <Label x={60} y={1160} size={40} style={{ width: 930 }}>Linha, chute, saída segura e os primeiros segundos sem a parede.</Label>
    <Label x={60} y={1330} size={26}>03 / 05</Label>
  </Canvas>;
}
function Advanced(p: PieceProps) {
  return <Canvas {...p} format="card">
    <Label x={60} y={75} size={40}>SIM, COM CONSISTÊNCIA</Label>
    <Headline lines={['Intermediário', 'e avançado']} x={60} y={165} size={80} />
    <Label x={60} y={380} size={44} style={{ width: 925 }}>Você segura uns 10 segundos no livre, de forma consistente (30 é o ideal).</Label>
    <Media photo src="tv-palco-luzes.webp" x={60} y={595} w={960} h={520} look="pb" {...p} />
    <Label x={60} y={1160} size={40} style={{ width: 930 }}>Equilíbrio, formas, entradas, press e one arm.</Label>
    <Label x={60} y={1330} size={26}>04 / 05</Label>
  </Canvas>;
}
const ClassEnd = (p: PieceProps) => <EndCard {...p} format="card" cta="Na dúvida, manda um vídeo na inscrição." />;
function StoryDate(p: PieceProps) {
  return <Canvas {...p} format="story"><Headline lines={['3 dias de', 'parada', 'de mão.']} size={100} accentLine={0} /><Facts y={650} />
    <Media photo src="still-dupla.webp" x={65} y={765} w={800} h={740} {...p} />
    <Label y={1515} size={42}>TRAPÉZIO VOADOR · BUTANTÃ</Label>
  </Canvas>;
}
function StoryPlace(p: PieceProps) {
  return <Canvas {...p} format="story"><Headline lines={['Trapézio', 'Voador']} size={102} /><Facts y={545} />
    <Media src="tour-vidro" y={640} h={840} {...p} />
    <Label y={1515} size={42}>PISO DE MADEIRA, LUZ NATURAL</Label>
  </Canvas>;
}
const StoryEnd = (p: PieceProps) => <EndCard {...p} format="story" cta="Vem junto." />;
const slide = (name: string, component: ComponentType<PieceProps>, seconds: number, height = 1920, cues = [{ label: 'Abertura', frame: 0 }, { label: 'Composição', frame: f(1) }]): Slide => {
  const Card = component;
  return { name, component: height === 1440 ? (p: PieceProps) => <Freeze frame={30}><Card {...p} /></Freeze> : component, seconds, height, cover: 24, cues: height === 1440 ? [] : cues };
};
export const PIECES: Piece[] = [
  { id: 'junto', title: 'Gente para treinar junto', format: 'Reel', description: 'O treino ocupa a imagem. As frases têm um espaço próprio, acima do corpo.', look: 'Cor → P&B → cor', movement: 'Uma pincelada revela a palavra. Cortes entre câmeras e selo no encerramento.', slides: [slide('Treinar junto', Together, 17.5, 1920, [{label:'Abertura',frame:0},{label:'P&B',frame:f(6)},{label:'Encontro',frame:f(11)},{label:'Selo',frame:f(15.5)}])] },
  { id: 'lugar', title: 'É aqui', format: 'Reel', description: 'Um passeio pelo Trapézio Voador com espaço para olhar a arquitetura.', look: 'Cor → cor → P&B', movement: 'Títulos assentados na mesma linha. O pincel aparece na abertura e no selo final.', slides: [slide('O lugar', Venue, 14.5, 1920, [{label:'Fachada',frame:24},{label:'Vidro',frame:f(5)},{label:'Palco',frame:f(8.5)},{label:'Selo',frame:f(12.5)}])] },
  { id: 'linha', title: 'É muito mais do que parece', format: 'Reel', description: 'Um plano sem corte para acompanhar o equilíbrio. Título grande acima, corpo inteiro abaixo.', look: 'Preto e branco', movement: 'O gesto da pessoa faz o movimento. As frases ocupam a largura de leitura, sempre fora da imagem.', slides: [slide('A linha', Line, 14.5, 1920, [{label:'Pergunta',frame:24},{label:'Resposta',frame:f(6)},{label:'Selo',frame:f(12.5)}])] },
  { id: 'futebol', title: 'Gosta de futebol?', format: 'Reel', description: 'A bola entra no treino e vira a piada: “Aqui a mão não é falta.” Uma versão bem-humorada do vídeo do mural.', look: 'Cor natural', movement: 'O plano segue sem corte até a descida. A resposta acompanha a entrada da bola; convite no fecho.', slides: [slide('Aqui a mão não é falta', Football, 13.5, 1920, [{label:'Pergunta',frame:0},{label:'A bola',frame:f(6.3)},{label:'Convite',frame:f(11)}])] },
  { id: 'turma', title: 'Qual é a sua turma?', format: 'Carrossel', description: 'Cinco lâminas. A segunda também funciona como capa e a informação fica fora da foto.', look: 'Cor com P&B pontual', movement: 'Leitura calma, uma palavra marcada e fechamento com o círculo de pincel.', slides: [slide('Capa',ClassCover,4,1440),slide('A pergunta',ClassQuestion,4,1440),slide('Básico',Basic,5,1440),slide('Inter e avançado',Advanced,5,1440),slide('Encontro',ClassEnd,4,1440)] },
  { id: 'encontro', title: 'Três dias em São Paulo', format: 'Stories', description: 'Data, lugar e convite em três quadros. Sem barras falsas de story nem música embutida.', look: 'Cor natural suavizada', movement: 'A pintura entra uma vez. O selo resolve o último quadro.', slides: [slide('A data',StoryDate,4),slide('O lugar',StoryPlace,4),slide('O convite',StoryEnd,4)] },
  ...MORE_PIECES,
];

// 09 · Stories "1º lote": 4 frames (REEL size, formato story). No BarrasStory: the app draws its own.
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import {
  ACCENT, CHALK, Etiqueta, Foto, Gancho, MONO, Quadro, Selo, QUANDO_CURTO, REEL, STAGE, f, useIn, type PecaProps,
} from './kit';
import { FEST, VENDA, LOTES as TICKET_LOTS } from '../data';
import type { Slide } from './tipos';

// Prices and quantities share the site's source of truth.
const LOTES = TICKET_LOTS.map(lot => ({ preco: lot.price, vagas: lot.vagas }));
const brl = (n: number) => `R$ ${n}`;

// ---------- local pieces ----------
/** 60 seats, 10 × 6, 78 px with 12 px gap; the first lote pops in one by one. */
const Assentos = ({ x, y }: { x: number; y: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [a, b] = [LOTES[0].vagas, LOTES[0].vagas + LOTES[1].vagas];
  const total = LOTES.reduce((s, l) => s + l.vagas, 0);
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'grid', gridTemplateColumns: 'repeat(10, 78px)', gap: 12 }}>
      {Array.from({ length: total }, (_, i) => {
        const pop = i < a ? spring({ frame: frame - 8 - i * 2, fps, config: { damping: 12, mass: 0.5 } }) : 1;
        return (
          <div key={i} style={{
            width: 78, height: 78, background: i < a ? ACCENT : CHALK, opacity: i < a ? 1 : i < b ? 0.35 : 0.15,
            transform: `scale(${pop})`,
          }} />
        );
      })}
    </div>
  );
};

const Mono = ({ children, y, size }: { children: string; y: number; size: number }) => (
  <div style={{ position: 'absolute', left: 65, top: y, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: size, lineHeight: 1.2 }}>{children}</div>
);

/** Accent arrow (26 × 110 bar ending in a triangle), bobbing 14 px every second. */
const Seta = ({ cx, bottom }: { cx: number; bottom: number }) => {
  const frame = useCurrentFrame();
  const bob = 7 - 7 * Math.cos((2 * Math.PI * frame) / f(1)); // 0 → 14 → 0 each second
  const tri = 44;
  return (
    <div style={{ position: 'absolute', left: cx - tri, top: bottom - 110 - tri + bob, width: tri * 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 26, height: 110, background: ACCENT }} />
      <div style={{ width: 0, height: 0, borderLeft: `${tri}px solid transparent`, borderRight: `${tri}px solid transparent`, borderTop: `${tri}px solid ${ACCENT}` }} />
    </div>
  );
};

// ---------- frames ----------
// Pre-opening edition: deliberately deterministic; regenerate copy when sales actually open.
const Abriu = ({ guides }: PecaProps) => (
  <Quadro formato="story" guides={guides}>
    <Foto src="still-dupla.webp" zoom={[1,1]} filter="brightness(.72)" />
    <Etiqueta text="1º lote" x={65} y={300} tom="chalk" size={40}/>
    <Gancho lines={['Abre', VENDA.dia]} y={400} size={130} tom="accent" />
    <Etiqueta text={`1º HandstandFest · ${QUANDO_CURTO}`} x={65} y={700} tom="chalk" size={34} delay={10} />
  <div style={{position:"absolute",left:770,top:1450}}><Selo size={230}/></div>
  </Quadro>
);

const Preco = ({ guides }: PecaProps) => (
  <Quadro formato="story" guides={guides}>
    <div style={{ position: 'absolute', inset: 0, background: STAGE }} />
    <Gancho lines={[brl(LOTES[0].preco)]} y={300} size={190} tom="accent" />
    <Etiqueta text={`primeiras ${LOTES[0].vagas} vagas`} x={65} y={560} tom="chalk" size={40} />
    <Assentos x={65} y={700} />
    <Mono y={1260} size={32}>{LOTES.map((l) => `${l.vagas} a ${brl(l.preco)}`).join(' · ')}</Mono>
    <Mono y={1330} size={32}>{`+ R$ ${VENDA.taxa} de taxa · passe de ${FEST.dias.length} dias`}</Mono>
  <div style={{position:"absolute",left:770,top:1450}}><Selo size={230}/></div>
  </Quadro>
);

const ITENS = [
  `${FEST.dias.length} dias · ${FEST.dias[0]} a ${FEST.dias[FEST.dias.length - 1]} de ${FEST.mes}`,
  '4 blocos por dia',
  'turmas: básico · inter e avançado',
  'professor e assistentes em cada turma',
  'Trapézio Voador · metrô Butantã',
];
const OQueTem = ({ guides }: PecaProps) => (
  <Quadro formato="story" guides={guides}>
    <Foto src="tv-palco-luzes.webp" look="pb" filter="brightness(.45)" />
    <Etiqueta text="o que tem" x={65} y={290} tom="accent" size={40} />
    {ITENS.map((t, n) => <Etiqueta key={t} text={t} x={65} y={400 + 86 * n} tom="chalk" size={36} delay={6 + 8 * n} />)}
  <div style={{position:"absolute",left:770,top:1450}}><Selo size={230}/></div>
  </Quadro>
);

// Hook shrunk from 150 to 128: at 150 "GARANTA" is 1050 px and "SUA VAGA" 1092 px wide, past x 1015.
const Link = ({ guides }: PecaProps) => (
  <Quadro formato="story" guides={guides}>
    <div style={{ position: 'absolute', inset: 0, background: STAGE }} />
    <Gancho lines={['Prepare-se', 'para vir.']} y={320} size={105} tons={['chalk', 'accent']} />
    <Etiqueta text={`1º lote · ${brl(LOTES[0].preco)} + taxa`} x={65} y={740} tom="chalk" size={38} />
    <Seta cx={540} bottom={985} />
    <div style={{
      position: 'absolute', left: 190, top: 1000, width: 700, height: 160, boxSizing: 'border-box', border: `4px dashed ${CHALK}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 30,
    }}>figurinha de link aqui</div>
  <div style={{position:"absolute",left:770,top:1450}}><Selo size={230}/></div>
  </Quadro>
);

export const slides: Slide[] = [
  { comp: Abriu, frames: f(4), ...REEL, capa: 30, nome: 'abre em '+VENDA.dia },
  { comp: Preco, frames: f(5), ...REEL, capa: 50, nome: 'preço e vagas' },
  { comp: OQueTem, frames: f(5), ...REEL, capa: 60, nome: 'o que tem' },
  { comp: Link, frames: f(5), ...REEL, capa: 30, nome: 'link' },
];

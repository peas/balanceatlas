// 07 · Carrossel de foto "Qual é a sua turma?": 5 slides (CARD), f(3) each, exported as stills (capa 45).
import type { ReactNode } from 'react';
import {
  ACCENT, CARD, CHALK, Etiqueta, Fecho, Foto, Gancho, INK, Lamina, MONO, QUANDO_CURTO, STAGE, f, useIn, type PecaProps,
} from './kit';
import type { Slide } from './tipos';

const TOTAL = 5;
const DUR = f(3);
const CAPA = 45;

/** Body text: mono 700, size 36, chalk on an ink box, max width 920. */
const Texto = ({ children, y, delay = 6 }: { children: ReactNode; y: number; delay?: number }) => {
  const e = useIn(delay);
  return (
    <div style={{
      position: 'absolute', left: 60, top: y, maxWidth: 920, boxSizing: 'border-box', background: INK, color: CHALK,
      fontFamily: MONO, fontWeight: 700, fontSize: 36, lineHeight: 1.25, padding: '12px 18px',
      opacity: e, transform: `translateY(${(1 - e) * 30}px)`,
    }}>{children}</div>
  );
};

const Capa = ({ guides }: PecaProps) => (
  <Lamina n={1} total={TOTAL} guides={guides}>
    <Foto src="still-dupla.webp" />
    <Gancho lines={['Ainda está', 'na parede?']} x={60} y={70} size={84} tom="accent" />
    <Texto y={1080}>Tem turma para você.</Texto>
  </Lamina>
);

// Hook shrunk from 116 to 92: at 116 "VOCÊ SEGURA" is 1169 px wide, wider than the card.
const Pergunta = ({ guides }: PecaProps) => (
  <Lamina n={2} total={TOTAL} guides={guides}>
    <div style={{ position: 'absolute', inset: 0, background: STAGE }} />
    <div style={{ position: 'absolute', left: 60, top: 70, color: CHALK, fontFamily: MONO, fontWeight: 700, fontSize: 28, lineHeight: 1.2 }}>
      1º HandstandFest · {QUANDO_CURTO}
    </div>
    <Gancho lines={['Você segura', '10 segundos', 'longe da', 'parede?']} x={60} y={300} size={92} tons={['chalk', 'accent', 'chalk', 'chalk']} />
  </Lamina>
);

const Basico = ({ guides }: PecaProps) => (
  <Lamina n={3} total={TOTAL} guides={guides}>
    <Foto src="tv-sala-vidro.webp" look="pb" filter="brightness(.5)" />
    <Etiqueta text="ainda não" x={60} y={150} tom="accent" size={40} />
    <Gancho lines={['Básico']} x={60} y={250} size={150} tom="chalk" />
    <Texto y={520}>Você treina na parede e ainda não segura o livre.</Texto>
    <Texto y={760} delay={10}>Linha, chute, saída segura e os primeiros segundos sem a parede.</Texto>
  </Lamina>
);

// Hook shrunk from 88 to 82: at 88 "INTERMEDIÁRIO" is 985 px wide, past x 1020.
const InterAvancado = ({ guides }: PecaProps) => (
  <Lamina n={4} total={TOTAL} guides={guides}>
    <Foto src="tv-palco-luzes.webp" look="pb" filter="brightness(.5)" />
    <Etiqueta text="sim" x={60} y={150} tom="accent" size={40} />
    <Gancho lines={['Intermediário', 'e avançado']} x={60} y={250} size={82} tom="chalk" />
    <Texto y={520}>Você segura uns 10 segundos no livre, de forma consistente (30 é o ideal).</Texto>
    <Texto y={800} delay={10}>Equilíbrio, formas, entradas, press e one arm.</Texto>
  </Lamina>
);

// The kit's Fecho assumes a one-line `sub`; this one wraps at 46 px and would run into the CTA. So the Fecho gets no
// sub and the line is drawn here, under the CTA, in the kit's sub style.
const SUB = 'Na dúvida, manda um vídeo curto na inscrição';
const Chamada = ({ guides }: PecaProps) => {
  const b = useIn(6, 16);
  return (
    <Lamina n={5} total={TOTAL} guides={guides}>
      <Fecho formato="card" cta="Link na bio" sub="" />
      <div style={{
        position: 'absolute', left: 65, top: 1130, maxWidth: 900, color: ACCENT, fontFamily: MONO, fontWeight: 700, fontSize: 36,
        lineHeight: 1.3, textTransform: 'uppercase', transform: `translateX(${(1 - b) * -600}px)`,
      }}>{SUB}</div>
    </Lamina>
  );
};

export const slides: Slide[] = [
  { comp: Capa, frames: DUR, ...CARD, capa: CAPA, nome: 'capa' },
  { comp: Pergunta, frames: DUR, ...CARD, capa: CAPA, nome: 'a pergunta' },
  { comp: Basico, frames: DUR, ...CARD, capa: CAPA, nome: 'básico' },
  { comp: InterAvancado, frames: DUR, ...CARD, capa: CAPA, nome: 'inter e avançado' },
  { comp: Chamada, frames: DUR, ...CARD, capa: CAPA, nome: 'chamada' },
];

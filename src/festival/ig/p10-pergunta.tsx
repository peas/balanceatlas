// 10 · Reel "Vou sair fazendo parada de mão?": the site's FAQ answer, word for word, muted. Spec in PECAS.md.
import { AbsoluteFill, Sequence } from 'remotion';
import { Clip, Cortina, Etiqueta, Fecho, Gancho, Quadro, REEL, STAGE, f, type PecaProps } from './kit';
import type { Slide } from './tipos';

const TOTAL = f(16.6);
const LEVA = ['ferramentas para treinar', 'direção para os próximos meses', 'equilíbrio na parede e com assistência', 'gente para treinar junto'];
const LEVA_DELAYS = [0.8, 2.0, 3.2, 4.4];

const Pergunta = ({ guides }: PecaProps) => (
  <Quadro formato="reel" guides={guides}>
    <Sequence from={0} durationInFrames={f(3.8)}>
      <Clip src="p-desce" from={0.3} />
      {/* size 72 (spec 82): "PARADA DE MÃO?" would pass x 950 */}
      <Gancho lines={['Vou sair', 'do festival', 'fazendo', 'parada de mão?']} size={72} y={290} tom="chalk" outAt={f(3.3)} />
    </Sequence>
    <Sequence from={f(3.8)} durationInFrames={f(2.4)}>
      <AbsoluteFill style={{ background: STAGE }} />
      {/* size 112 (spec 128): "TRÊS DIAS," would pass x 950 */}
      <Gancho lines={['Depois de', 'três dias,', 'não.']} size={112} y={420} tons={['chalk', 'chalk', 'accent']} delay={6} />
      <Etiqueta text="ninguém aprende o livre num fim de semana" tom="ink" size={30} x={65} y={990} delay={20} />
      <Cortina tom="accent" len={8} />
    </Sequence>
    <Sequence from={f(6.2)} durationInFrames={f(7.0)}>
      <Clip src="p-espelho" from={0.5} look="pb" filter="brightness(.7)" />
      <Etiqueta text="o que você leva" tom="accent" size={40} x={65} y={290} delay={2} />
      {LEVA.map((t, i) => (
        <Etiqueta key={t} text={t} tom="chalk" size={34} x={65} y={385 + 70 * i} delay={f(LEVA_DELAYS[i])} />
      ))}
    </Sequence>
    <Sequence from={f(13.2)} durationInFrames={TOTAL - f(13.2)}>
      <Fecho cta="Link na bio" />
    </Sequence>
  </Quadro>
);

export const slides: Slide[] = [{ comp: Pergunta, frames: TOTAL, ...REEL, capa: 20 }];

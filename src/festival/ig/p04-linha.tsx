// 04 · Reel "A linha": one straight handstand in front of a mural, 10.8 s hold, skeleton, muted. Spec in PECAS.md.
// Body at x 45–70%: every graphic lives in the left column, x 65–430.
import { Sequence } from 'remotion';
import { Barras, Clip, Cronometro, Esqueleto, Gancho, Quadro, REEL, Selo, STAGE, f, type PecaProps } from './kit';
import type { Slide } from './tipos';

const CENA = f(13.4);
const TOTAL = f(16.8);

const Cena = () => (
  <>
    <Clip src="mural-reta" from={0} zoom={[1, 1.04]} focus={[58, 50]}>
      <Sequence from={f(2.2)} layout="none">
        <Esqueleto pose="mural-reta" from={2.2} prumo glow />
      </Sequence>
    </Clip>
    <Gancho lines={['Repare nos', 'ajustes do', 'palito.']} size={40} x={65} y={300} tom="accent" outAt={f(3.0)} />
    <Cronometro from={0} to={f(10.8)} x={65} y={1010} size={84} label="livre" />
    {/* size 37 (spec 54): "É MUITO MAIS" would pass the x 430 column and reach the body */}
    <Gancho lines={['A parada', 'está sempre', 'em balanço.']} size={37} x={65} y={300} tom="chalk" delay={f(6.0)} outAt={f(10.4)} />
    <Barras side="left" v={300} h={0} outAt={f(12.6)} />
  </>
);

const Linha = ({ guides }: PecaProps) => (
  <Quadro formato="reel" guides={guides}>
    <Sequence from={0} durationInFrames={CENA}>
      <Cena />
    </Sequence>
    <Sequence from={CENA} durationInFrames={TOTAL - CENA}>
      <div style={{position:"absolute",inset:0,background:STAGE}}><Gancho lines={["Equilíbrio é", "ajuste contínuo."]} y={420} size={76} tom="chalk"/><div style={{position:"absolute",left:770,top:1400}}><Selo size={230}/></div></div>
    </Sequence>
  </Quadro>
);

export const slides: Slide[] = [{ comp: Linha, frames: TOTAL, ...REEL, capa: 30 }];

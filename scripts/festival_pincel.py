#!/usr/bin/env python3
"""Draws the brush shapes of the HandstandFest identity as vector paths and writes src/festival/pincel.ts.

Gabriel proposed (10/11/2026) the HF letters on a circle painted with a brush: the straight letters keep the
handstand, the ink brings the turn. His image was a raster mock-up, so the shapes are redrawn here, deterministic
(fixed seed), in two pieces each: a solid body and loose bristle strokes around it.

  circulo  viewBox 0 0 200 200: `corpo` (filled blob) + `cerdas` (dry arcs, stroked, each with its own width)
  traco    viewBox 0 0 400 100: a horizontal stroke to sit behind a word (stretch with preserveAspectRatio="none")

Examples
  scripts/festival_pincel.py                 # rewrite src/festival/pincel.ts, public/festival/traco.svg and
                                             # favicon.svg, design/handstandfest-selo-06/avatar.svg
  scripts/festival_pincel.py --previa x.svg  # also write a preview SVG to look at
  scripts/festival_pincel.py --semente 7     # another hand
"""
import argparse, math, random
from pathlib import Path

HF_D = 'M0 0 H18 V30 H38 V0 H56 V30 H72 V0 H132 V18 H90 V30 H120 V48 H90 V80 H72 V48 H56 V80 H38 V48 H18 V80 H0 Z'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'festival' / 'pincel.ts'


def ruido(rng, n, amp):
    """Smooth periodic noise: a few low harmonics with random phase."""
    hs = [(k, rng.uniform(0, math.tau), amp / k * rng.uniform(.5, 1)) for k in range(1, n + 1)]
    return lambda a: sum(m * math.sin(k * a + ph) for k, ph, m in hs)


def blob(rng, cx, cy, r):
    f = ruido(rng, 5, 0.022)
    pts = []
    for i in range(96):
        a = math.tau * i / 96
        rr = r * (1 + f(a)) + rng.uniform(-.35, .35)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + ' Z'


def arco(cx, cy, r, a0, a1, f):
    n = max(8, int(abs(a1 - a0) / 0.09))
    pts = []
    for i in range(n + 1):
        a = a0 + (a1 - a0) * i / n
        rr = r * (1 + f(a))
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)


def circulo(rng):
    cx = cy = 100
    corpo = blob(rng, cx, cy, 80)
    cerdas = []
    # the brush leaves the body at four places and drags dry bristles along the edge (clockwise, like the turn)
    for base in (-2.5, -0.75, 0.55, 2.2):
        for k in range(rng.randint(4, 6)):
            r = 80 + rng.uniform(.5, 7.5)
            a0 = base + rng.uniform(-.25, .25)
            comp = rng.uniform(.55, 1.3) * (1.15 - (r - 80) / 11)
            w = rng.uniform(1.6, 4.2) * (1.12 - (r - 80) / 9)
            f = ruido(rng, 3, 0.006)
            cerdas.append({'d': arco(cx, cy, r, a0, a0 + comp, f), 'w': round(max(.7, w), 2)})
    # a few light scratches inside the edge, where the paint ran thin
    riscos = []
    for _ in range(5):
        r = 80 - rng.uniform(2.5, 6)
        a0 = rng.uniform(0, math.tau)
        riscos.append({'d': arco(cx, cy, r, a0, a0 + rng.uniform(.25, .6), ruido(rng, 2, 0.004)), 'w': round(rng.uniform(.5, 1.1), 2)})
    return corpo, cerdas, riscos


def traco(rng):
    top = ruido(rng, 4, 3.0); bot = ruido(rng, 4, 3.0)
    pts = []
    for i in range(41):  # top edge, left to right
        x = 8 + 372 * i / 40
        pts.append((x, 16 + top(i / 6.5) + rng.uniform(-.6, .6)))
    for j in range(9):   # ragged right end
        y = 16 + 68 * j / 8
        pts.append((380 + rng.uniform(-6, 12) * (1 if j % 2 else .3), y))
    for i in range(40, -1, -1):
        x = 8 + 372 * i / 40
        pts.append((x, 84 + bot(i / 6.5) + rng.uniform(-.6, .6)))
    for j in range(5, -1, -1):  # the start of the stroke is fuller and rounder
        y = 16 + 68 * j / 5
        pts.append((8 - 5 * math.sin(math.pi * j / 5) + rng.uniform(-1, 1), y))
    corpo = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + ' Z'
    cerdas = []
    for k in range(12):  # dry bristles running past the end, spread over the height of the stroke
        y = 20 + 60 * (k + rng.uniform(.1, .9)) / 12; x0 = rng.uniform(330, 372); x1 = rng.uniform(384, 399)
        cerdas.append({'d': f'M{x0:.1f} {y:.1f} L{x1:.1f} {y + rng.uniform(-1.2, 1.2):.1f}', 'w': round(rng.uniform(1.8, 4.5), 2)})
    return corpo, cerdas


def ts(v):
    if isinstance(v, list):
        return '[\n' + ''.join(f"    {{ d: '{c['d']}', w: {c['w']} }},\n" for c in v) + '  ]'
    return f"'{v}'"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--semente', type=int, default=16, help='random seed (default 16; the committed shapes use it)')
    ap.add_argument('--previa', help='also write a preview SVG to this path')
    args = ap.parse_args()
    rng = random.Random(args.semente)
    corpo, cerdas, riscos = circulo(rng)
    tcorpo, tcerdas = traco(rng)
    OUT.write_text(f"""// Brush shapes of the identity (Gabriel's idea, 10/11/2026). GENERATED by scripts/festival_pincel.py
// (seed {args.semente}): edit the script, not this file.
export type Cerda = {{ d: string; w: number }};
/** Painted circle, viewBox 0 0 200 200. `corpo` is filled; `cerdas` are stroked outside it; `riscos` are thin
 *  strokes in the background colour just inside the edge. */
export const CIRCULO = {{
  corpo: {ts(corpo)},
  cerdas: {ts(cerdas)} as Cerda[],
  riscos: {ts(riscos)} as Cerda[],
}};
/** Horizontal brush stroke, viewBox 0 0 400 100, meant to be stretched behind a word. */
export const TRACO = {{
  corpo: {ts(tcorpo)},
  cerdas: {ts(tcerdas)} as Cerda[],
}};
/** The HF letters (design/handstandfest-logo-05), 132 x 80 units. */
export const HF = 'M0 0 H18 V30 H38 V0 H56 V30 H72 V0 H132 V18 H90 V30 H120 V48 H90 V80 H72 V48 H56 V80 H38 V48 H18 V80 H0 Z';
""")
    st = lambda cs, cor: ''.join(f'<path d="{c["d"]}" fill="none" stroke="{cor}" stroke-width="{c["w"]}"/>' for c in cs)
    pub = ROOT / 'public' / 'festival'
    # mask for the stroke behind a word (CSS paints it with the accent colour)
    (pub / 'traco.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" preserveAspectRatio="none"><path d="{tcorpo}"/>{st(tcerdas, "#000")}</svg>\n')
    # favicon: the circle without bristles, which turn to dirt at 16 px
    (pub / 'favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="{corpo}" fill="#0f3d33" transform="translate(-12,-12) scale(1.12)"/><path d="{HF_D}" fill="#ffd23f" transform="translate(41,64) scale(.9)"/></svg>\n')
    # Instagram avatar source (render with rsvg-convert -w 1080): green circle on paper, room for the round crop
    (ROOT / 'design' / 'handstandfest-selo-06').mkdir(parents=True, exist_ok=True)
    (ROOT / 'design' / 'handstandfest-selo-06' / 'avatar.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f6f1e4"/><g transform="translate(15,15) scale(.85)"><path d="{corpo}" fill="#0f3d33"/>{st(cerdas, "#0f3d33")}{st(riscos, "#f6f1e4")}<path d="{HF_D}" fill="#ffd23f" transform="translate(50.5,70) scale(.75)"/></g></svg>\n')
    print(f'{OUT.relative_to(ROOT)}: círculo com {len(cerdas)} cerdas e {len(riscos)} riscos, traço com {len(tcerdas)} cerdas')
    if args.previa:
        st = lambda cs, cor: ''.join(f'<path d="{c["d"]}" fill="none" stroke="{cor}" stroke-width="{c["w"]}" stroke-linecap="butt"/>' for c in cs)
        hf = 'M0 0 H18 V30 H38 V0 H56 V30 H72 V0 H132 V18 H90 V30 H120 V48 H90 V80 H72 V48 H56 V80 H38 V48 H18 V80 H0 Z'
        def selo(x, bg, fg):
            return f'<g transform="translate({x},0)"><path d="{corpo}" fill="{bg}"/>{st(cerdas, bg)}{st(riscos, "#f6f1e4")}<path d="{hf}" fill="{fg}" transform="translate(50.5,69) scale(.75)"/></g>'
        Path(args.previa).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="1200" height="960"><rect width="400" height="320" fill="#f6f1e4"/>{selo(0, "#0f3d33", "#ffd23f")}{selo(200, "#ffd23f", "#0f3d33")}<g transform="translate(40,210) scale(.8,.9)"><path d="{tcorpo}" fill="#ffd23f"/>{st(tcerdas, "#ffd23f")}</g></svg>')


if __name__ == '__main__':
    main()

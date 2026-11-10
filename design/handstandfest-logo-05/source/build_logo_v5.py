#!/usr/bin/env python3
"""Build the round 05 logo kit: connected HF in original C and E palettes."""
import argparse, base64, html, json, shutil
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--assets',type=Path,required=True,help='Round 01 assets directory, with Archivo, Space Mono and training.webp')
p.add_argument('--output',type=Path,required=True,help='New directory for the round 05 logo kit')
a=p.parse_args(); out=a.output; out.mkdir(parents=True,exist_ok=True)
(out/'assets').mkdir(exist_ok=True)
for f in a.assets.iterdir():
    if f.suffix == '.ttf' or 'license' in f.name.lower() or 'ofl' in f.name.lower():
        shutil.copy2(f,out/'assets'/f.name)
fonts={k:TTFont(a.assets/f'{n}.ttf') for k,n in [('display','archivo'),('mono','space-mono')]}
photo='' # This kit contains no photographs.
palettes={
 'e':{'name':'Verde + amarelo','paper':'#f6f1e4','ink':'#0f2a24','stage':'#0f3d33','accent':'#ffd23f','accent-ink':'#0f2a24','muted':'#ffb86b','live':'#ffd23f'},
 'c':{'name':'Verde + rosa','paper':'#f4f1ea','ink':'#0f2a24','stage':'#0f3d33','accent':'#ff8fb8','accent-ink':'#0f2a24','muted':'#8ed8e8','live':'#ff8fb8'}
}
names={'f':'F invertido','hf':'HF em pé'}
manifest=[]; originals={}

def lum(s):
    cs=[int(s[i:i+2],16)/255 for i in (1,3,5)]
    return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(cs,[.2126,.7152,.0722]))
def cr(x,y):
    lo,hi=sorted([lum(x),lum(y)]); return (hi+.05)/(lo+.05)
for k,c in palettes.items():
    c['ratios']={pair:cr(c[pair.split('/')[0]],c[pair.split('/')[1]]) for pair in ['accent/stage','ink/paper','accent-ink/accent','stage/paper']}
    (out/f'tokens-{k}.css').write_text(':root {\n'+''.join(f'  --{n}: {v};\n' for n,v in c.items() if n not in ['name','ratios'])+'}\n')
(out/'palettes.json').write_text(json.dumps(palettes,indent=2))

def rect(x,y,w,h,fill,extra=''): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {extra}/>'
def text(t,x,y,size,color,font='display',maxwidth=None):
    f=fonts[font]; gs=f.getGlyphSet(); cmap=f.getBestCmap(); scale=size/f['head'].unitsPerEm
    width=sum(f['hmtx'][cmap.get(ord(c),'space')][0] for c in t)*scale
    # Scale the font uniformly when fitting a line; preserve the actual 125% width.
    scale*=min(1,maxwidth/width) if maxwidth else 1
    pos=0; paths=[]
    for c in t:
        n=cmap.get(ord(c),'space'); pen=SVGPathPen(gs);gs[n].draw(pen)
        paths.append(f'<path d="{pen.getCommands()}" transform="translate({pos},0)"/>');pos+=f['hmtx'][n][0]
    return f'<g aria-label="{html.escape(t)}" fill="{color}" transform="translate({x},{y}) scale({scale},{-scale})">'+''.join(paths)+'</g>'

def symbol(kind,x,y,w,h,color):
    # Original F preserved exactly. Upright H and F share a 20-unit stroke,
    # 80-unit height and square terminals; no rotation or decorative ligature.
    if kind=='f':
        shape='<path d="M64 10 H84 V90 H16 V70 H64 V54 H28 V35 H64 Z"/>'
        box=(16,10,68,80)
    else:
        shape='<path d="M0 0 H20 V30 H44 V0 H64 V80 H44 V50 H20 V80 H0 Z M80 0 H144 V20 H100 V35 H132 V55 H100 V80 H80 Z"/>'
        box=(0,0,144,80)
    bx,by,bw,bh=box;s=min(w/bw,h/bh);tx=x+(w-bw*s)/2;ty=y+(h-bh*s)/2
    return f'<g fill="{color}" transform="translate({tx},{ty}) scale({s}) translate({-bx},{-by})">{shape}</g>'

def image(x,y,w,h):
    return f'<image href="{photo}" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet"/>'
def framed_photo(x,y,w,h,photo_y,photo_h,id):
    return f'<defs><clipPath id="{id}">'+rect(x,y,w,h,'#fff')+'</clipPath></defs>'+f'<g clip-path="url(#{id})">'+image(x,photo_y,w,photo_h)+'</g>'
def svg(w,h,body,title,mm=False):
    dim='width="297mm" height="420mm"' if mm else f'width="{w}" height="{h}"'
    return f'<svg xmlns="http://www.w3.org/2000/svg" {dim} viewBox="0 0 {w} {h}" role="img"><title>{html.escape(title)}</title>{body}</svg>'
def save(file,w,h,body,mm=False,render=True):
    s=svg(w,h,body,file,mm); (out/file).parent.mkdir(exist_ok=True,parents=True);(out/file).write_text(s);originals[file]=s
    if render:manifest.append({'file':file,'width':w,'height':h})
    return s
def embed(file,x,y,w,h):
    url='data:image/svg+xml;base64,'+base64.b64encode(originals[file].encode()).decode()
    return f'<image href="{url}" x="{x}" y="{y}" width="{w}" height="{h}"/>'

def badge(kind,x,y,w,h,fg,bg=None):
    # A consistent enclosure is part of the mark, including its small uses.
    shape=rect(x,y,w,h,bg if bg else 'none',f'stroke="{fg}" stroke-width="{w*.025}"' if not bg else '')
    return shape+symbol(kind,x+w*.17,y+h*.22,w*.66,h*.56,fg)


# Shared crossbar preserves three vertical stems and the legibility of both initials.
# Geometry in a 192x144 frame: 18-unit stems, 80-unit cap, 132-unit glyph width.
# Optical centering: outer margins 30 horizontal / 32 vertical.
REFINED='M0 0 H18 V30 H38 V0 H56 V30 H72 V0 H132 V18 H90 V30 H120 V48 H90 V80 H72 V48 H56 V80 H38 V48 H18 V80 H0 Z'
ORIGINAL='M0 0 H20 V30 H44 V0 H64 V80 H44 V50 H20 V80 H0 Z M80 0 H144 V20 H100 V35 H132 V55 H100 V80 H80 Z'

def mark(x,y,w,fg,bg=None,outline=False,old=False):
    h=w*.75
    if old:
        return rect(x,y,w,h,bg or 'none')+symbol('hf',x+w*.17,y+h*.22,w*.66,h*.56,fg)
    s=w/192
    shape=rect(0,0,192,144,bg) if bg else ''
    if outline:
        # Inset stroke: all exports keep the same external 4:3 box.
        shape+=rect(3,3,186,138,'none',f'stroke="{fg}" stroke-width="6"')
    shape+=f'<path d="{REFINED}" fill="{fg}" transform="translate(30,32)"/>'
    return f'<g transform="translate({x},{y}) scale({s})">{shape}</g>'

def knockout(color):
    # True transparency through the letters, rather than a white painted glyph.
    from fontTools.pens.transformPen import TransformPen
    from fontTools.svgLib.path import parse_path
    pen=SVGPathPen(None)
    parse_path(REFINED,TransformPen(pen,(1,0,0,1,30,32)))
    return f'<g transform="scale(4)"><path fill="{color}" fill-rule="evenodd" d="M0 0 H192 V144 H0 Z {pen.getCommands()}"/></g>'

def lockup(c,negative=False):
    fg=c['paper'] if negative else c['stage']
    bg=c['accent'] if negative else c['stage']
    mf=c['stage'] if negative else c['accent']
    return mark(40,56,384,mf,bg)+text('HANDSTAND',480,185,108,fg,maxwidth=1080)+text('FEST',480,299,108,fg)

for key,c in palettes.items():
    save(f'logos/hf-{key}.svg',768,576,mark(0,0,768,c['accent'],c['stage']))
    save(f'logos/hf-{key}-inverso.svg',768,576,mark(0,0,768,c['stage'],c['accent']))
    save(f'logos/assinatura-{key}.svg',1600,400,lockup(c))
    save(f'logos/assinatura-{key}-negativa.svg',1600,400,lockup(c,True))
    for size in [32,48,96]:
        save(f'logos/reducao-{key}-{size}.svg',size,size*.75,mark(0,0,size,c['accent'],c['stage']))

save('logos/hf-contorno.svg',768,576,mark(0,0,768,'#0f3d33',outline=True))
save('logos/hf-mono-preto.svg',768,576,knockout('#000000'))
save('logos/hf-mono-branco.svg',768,576,knockout('#ffffff'))

# Side-by-side review sheet, scoped to the logo, with original palette tokens.
W,H=2200,1710;paper='#f4f1ea';green='#0f3d33'
body=rect(0,0,W,H,paper)+text('HANDSTANDFEST',70,110,57,green)
body+=text('REFINAMENTO DO HF / CORES ORIGINAIS E + C',70,161,23,green,'mono')
for idx,(key,c) in enumerate(palettes.items()):
    x=70+idx*1100
    body+=text(f'{key.upper()} / '+c['name'].upper(),x,246,29,green,'mono')
    body+=rect(x,282,960,580,green)
    body+=mark(x+240,340,480,c['accent'],green)
    body+=text(c['stage']+' + '+c['accent'],x+40,823,22,c['paper'],'mono')
    body+=rect(x,902,960,240,c['paper'])
    body+=embed(f'logos/assinatura-{key}.svg',x+24,914,912,228)
    body+=text('ASSINATURA / FUNDO CLARO',x,1184,20,green,'mono')
    body+=mark(x,1235,192,green,c['accent'])
    body+=mark(x+260,1235,192,green,outline=True)
    body+=text('INVERSO',x,1420,18,green,'mono')+text('CONTORNO',x+260,1420,18,green,'mono')
    for j,size in enumerate([32,48,96]):
        xx=x+580+j*110
        body+=mark(xx,1260,size,c['accent'],green)
        body+=text(str(size)+' PX',xx,1420,14,green,'mono')
body+=text('TRAVESSA CONTÍNUA / LETRAS EM PÉ / MOLDURA 4:3 / EDIÇÃO FORA DA MARCA',70,1600,22,green,'mono')
body+=text('PALETAS FAVORITAS DO GABRIEL · DESENHO REFINADO PARA AVALIAÇÃO',70,1647,19,green,'mono')
save('pranchas/01-logo-verde-amarelo-e-verde-rosa.svg',W,H,body)

# Before/after proof. The selected colors stay constant, isolating the shape change.
body=rect(0,0,1600,970,paper)+text('O QUE MUDOU NO HF',60,105,48,green)
body+=text('ANTES / LETRAS SEPARADAS',60,201,22,green,'mono')
body+=text('AGORA / TRAVESSA CONTÍNUA',850,201,22,green,'mono')
body+=mark(60,246,630,'#ff8fb8',green,old=True)+mark(850,246,630,'#ff8fb8',green)
body+=text('H E F COMPARTILHAM A LINHA CENTRAL.',60,811,24,green,'mono')
body+=text('MESMA ALTURA, PESO UNIFORME E MOLDURA DE PROPORÇÃO FIXA.',60,860,24,green,'mono')
save('pranchas/02-antes-e-depois.svg',1600,970,body)
(out/'render-manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'Created {len(manifest)} logo exports')

#!/usr/bin/env python3
"""Generate timeless shirt studies and outlined print art. Requires fonttools + ImageMagick.

Illustrated garment mockups, not official Insider product photography or production proofs.
Run with a Python environment containing fonttools; no dependencies added to the website.
"""
from pathlib import Path
import argparse
import base64
import copy
import tempfile
import subprocess
import xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--trace-front', action='store_true', help='Retrace the three front-view figures from the saved generated source PNG (requires Potrace).')
args = parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/festival/camisetas'
OUT.mkdir(parents=True, exist_ok=True)
NS = '{http://www.w3.org/2000/svg}'
GREEN, CREAM, YELLOW = '#34463c', '#f3eedf', '#eac74f'
font = TTFont(ROOT / 'design/fonts/archivo.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
cap = font['OS/2'].sCapHeight

# Normalize all three figures to the same scale and palm baseline, preserving proportions.
if args.trace_front:
    with tempfile.TemporaryDirectory() as temp:
        for name, left, width in [('straight',0,350),('straddle',350,700)]:
            pbm, traced = Path(temp)/'pose.pbm', Path(temp)/'pose.svg'
            source_name = 'silhouettes-front-source.png'
            subprocess.run(['magick',str(ROOT/'design/handstandfest-camisetas'/source_name),'-crop',f'{width}x887+{left}+0','+repage','-alpha','extract','-negate','-threshold','50%',str(pbm)],check=True)
            subprocess.run(['potrace',str(pbm),'-s','-o',str(traced),'--turdsize','5','--opttolerance','0.3'],check=True)
            tree = ET.parse(traced).getroot()
            group = tree.find(NS+'g')
            scale = 400/887
            body = ET.tostring(group,encoding='unicode')
            (ROOT/f'design/handstandfest-camisetas/{name}-master.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width*scale:.6f} 400"><g transform="scale({scale})">{body}</g></svg>')

        # Final one-arm comes from a real pose reference, not the rejected sheet versions.
        subprocess.run(['magick',str(ROOT/'design/handstandfest-camisetas/one-arm-reference-source.png'),'-alpha','extract','-negate','-threshold','50%','-trim','+repage','-bordercolor','white','-border','8',str(pbm)],check=True)
        subprocess.run(['potrace',str(pbm),'-s','-o',str(traced),'--turdsize','5','--opttolerance','0.3'],check=True)
        tree = ET.parse(traced).getroot()
        _,_,width,height = map(float,tree.get('viewBox').split())
        scale = 285/height
        body = ET.tostring(tree.find(NS+'g'),encoding='unicode')
        (ROOT/'design/handstandfest-camisetas/one-arm-master.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width*scale+12:.6f} 400"><g transform="translate(6 97) scale({scale})">{body}</g></svg>')

# AI-generated illustration, reviewed then traced; master retains real transparency.
PROFILE = ET.parse(ROOT / 'design/handstandfest-camisetas/handstand-profile-master.svg').getroot()

def silhouette(x, y, height, color=CREAM):
    group = copy.deepcopy(PROFILE.find(NS + 'g'))
    for el in group.iter():
        if 'fill' in el.attrib: el.set('fill', color)
    group.set('fill', color)
    return f'<g transform="translate({x} {y}) scale({height/400})">'+ET.tostring(group,encoding='unicode')+'</g>'

def trio(x, y, width, color=CREAM):
    # The wider poses retain the same anatomical scale as the straight handstand.
    content, cursor = [], 0
    for name in ['straight','straddle','one-arm']:
        root = ET.parse(ROOT/f'design/handstandfest-camisetas/{name}-master.svg').getroot()
        group = copy.deepcopy(root.find(NS+'g'))
        for el in group.iter():
            if 'fill' in el.attrib: el.set('fill', color)
        group.set('fill', color)
        content.append(f'<g transform="translate({cursor} 0)">'+ET.tostring(group,encoding='unicode')+'</g>')
        cursor += float(root.get('viewBox').split()[2]) + 14
    return f'<g transform="translate({x} {y}) scale({width/(cursor-14)})">'+''.join(content)+'</g>'

def advance(text):
    return sum(glyphs[cmap[ord(c)]].width for c in text)

def domain_stack(x, y, width):
    scale = width/advance('STAND')
    result = stack(x,y,width)
    suffix_x = x + advance('FEST')*scale + 7
    suffix_scale = (x + width - suffix_x)/advance('.com.br')
    baseline = y + 2*cap*scale*1.12 + cap*scale
    return result + word('.com.br',suffix_x,baseline-cap*suffix_scale,suffix_scale,YELLOW)

def domain(x,y,width):
    return word('handstandfest.com.br',x,y,width/advance('handstandfest.com.br'),YELLOW)

def word(word, x, y, scale, color):
    paths, pos = [], 0
    for char in word:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        paths.append(f'<path transform="translate({pos} 0)" d="{pen.getCommands()}"/>')
        pos += glyphs[name].width
    return f'<g fill="{color}" transform="translate({x} {y+cap*scale}) scale({scale} {-scale})">'+''.join(paths)+'</g>'

def stack(x, y, width, colors=(CREAM, CREAM, CREAM)):
    advance = sum(glyphs[cmap[ord(c)]].width for c in 'STAND')
    s = width / advance
    return ''.join(word(w, x, y+i*cap*s*1.12, s, colors[i]) for i,w in enumerate(['HAND','STAND','FEST']))

master = ET.parse(ROOT / 'design/handstandfest-selo-07/hf-brush.svg').getroot()
def seal(x, y, size):
    brush = copy.deepcopy(master.find(f"{NS}g[@id='brush']"))
    letters = copy.deepcopy(master.find(f"{NS}path[@id='hf']"))
    brush.set('fill', YELLOW)
    letters.set('fill', GREEN)
    for el in (brush, letters): el.attrib.pop('id', None)
    return f'<g transform="translate({x} {y}) scale({size/1040})">'+ET.tostring(brush,encoding='unicode')+ET.tostring(letters,encoding='unicode')+'</g>'

def svg(body, box='0 0 400 500', title='HandstandFest — print study'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}" role="img"><title>{title}</title>{body}</svg>'

art = {
    ('04','front'): trio(0, 50, 290) + seal(313, 99, 78),
    ('04','back'): domain_stack(20, 55, 360),
    ('05','front'): seal(270, 40, 86),
    ('05','back'): trio(0, 40, 400) + domain(22, 255, 356),
    ('01','front'): seal(270, 40, 86),
    ('01','back'): stack(20, 80, 265) + silhouette(305, 48, 295, YELLOW),
    ('02','front'): silhouette(120, 15, 365) + stack(215, 255, 155, (YELLOW, YELLOW, YELLOW)),
    ('02','back'): seal(158, 18, 84) + stack(120, 125, 160),
    ('03','front'): silhouette(0, 60, 320, YELLOW) + stack(100, 70, 280, (YELLOW, CREAM, CREAM)) + seal(100, 285, 50),
    ('03','back'): stack(115, 35, 170),
}

def engraving(name, color, dark=False):
    """Mixed raster engraving + actual vector bristles; not a production separation."""
    body = base64.b64encode((ROOT/f'public/festival/ig/arte/{name}.webp').read_bytes()).decode()
    brush = copy.deepcopy(master.find(f"{NS}g[@id='brush']"))
    brush.set('fill', color)
    ink = CREAM if dark else '#202d26'
    return (f'<g transform="translate(65 82) scale(.27)">{ET.tostring(brush,encoding="unicode")}</g>'
        + f'<path d="M47 236 C28 88 216 40 321 124 M354 204 C393 349 243 422 110 354" fill="none" stroke="{ink}" stroke-width="1.1"/>'
        + f'<path d="M192 39 L193 111 M194 361 L194 403" stroke="{ink}" stroke-width=".65"/>'
        + f'<image href="data:image/webp;base64,{body}" x="16" y="15" width="368" height="370" preserveAspectRatio="xMidYMid meet"/>'
        + word('handstandfest.com.br',37,411,326/advance('handstandfest.com.br'),ink))

art.update({
    ('06','front'): engraving('straddle','#ffd23f'),
    ('06','back'): seal(165,25,70) + stack(100,130,200,('#202d26',)*3),
    ('07','front'): engraving('stag','#cb8b34'),
    ('07','back'): seal(165,25,70) + stack(100,130,200,('#202d26',)*3),
    ('08','front'): seal(270,40,86),
    ('08','back'): engraving('straddle','#eac74f',True),
})

def shirt(body, back=False, light=False):
    neck = 'C235 92 365 92 390 70' if back else 'C232 116 368 116 390 70'
    shape = f'M210 70 {neck} L440 85 L560 160 L518 260 L450 228 L455 640 Q300 670 145 640 L150 228 L82 260 L40 160 L160 85 Z'
    result = svg(f'''<defs>
      <linearGradient id="fabric" x1="0" x2="1"><stop stop-color="#25352c"/><stop offset=".25" stop-color="{GREEN}"/><stop offset=".6" stop-color="#3c5044"/><stop offset="1" stop-color="#293a30"/></linearGradient>
      <linearGradient id="fold"><stop stop-color="#16261c" stop-opacity=".24"/><stop offset=".5" stop-color="#68806b" stop-opacity=".12"/><stop offset="1" stop-color="#19291e" stop-opacity="0"/></linearGradient>
    </defs>
    <ellipse cx="300" cy="670" rx="177" ry="13" fill="#203527" opacity=".09"/>
    <path d="{shape}" fill="url(#fabric)" stroke="#26392c" stroke-width="1.5"/>
    <path d="M210 70 {neck}" fill="none" stroke="#213328" stroke-width="11"/>
    <path d="M210 77 {neck}" fill="none" stroke="#526551" stroke-opacity=".35" stroke-width="1.5"/>
    <path d="M160 85 Q174 147 150 228 M440 85 Q426 147 450 228 M49 162 L86 248 M551 162 L514 248 M148 630 Q300 653 452 630" fill="none" stroke="#71816b" stroke-opacity=".22" stroke-width="2"/>
    <path d="M154 232 Q199 359 172 622 L149 634 Q164 424 154 232 M448 232 Q406 394 432 633 L451 638 Q437 407 448 232" fill="url(#fold)"/>
    <g transform="translate(175 150) scale(.625)" opacity=".97">{body}</g>
    ''', '0 0 600 720', 'HandstandFest — '+('costas' if back else 'frente'))
    if light:
        for old,new in {'#25352c':'#ded8c6','stop-color="#34463c"':'stop-color="#f0ebdd"','#3c5044':'#f8f3e7','#293a30':'#e0d9c8','#26392c':'#c6beac','#213328':'#d3ccb9','#526551':'#fffaf0'}.items():
            result=result.replace(old,new)
    return result

for (number, side), body in art.items():
    (OUT/f'{number}-{side}-art.svg').write_text(svg(body))
    path = OUT/f'{number}-{side}.svg'
    path.write_text(shirt(body, side=='back',number in ('06','07')))
    rendered = subprocess.run(['rsvg-convert','-w','1200','-h','1440',str(path)], capture_output=True, check=True)
    subprocess.run(['magick','png:-','-quality','88',str(path.with_suffix('.webp'))], input=rendered.stdout, check=True)
(OUT/'handstand-profile.svg').write_text(svg(silhouette(0,0,400), '0 0 110 400', 'Handstand — perfil'))
(OUT/'handstand-trio.svg').write_text(svg(trio(0,0,800), '0 0 800 400', 'Handstand — reta, straddle e one arm'))
print(f'Generated {len(art)//2} front/back studies, print-art SVGs, profile and trio silhouettes.')

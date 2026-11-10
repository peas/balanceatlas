#!/usr/bin/env python3
"""Trace the supplied brush seal. Requires ImageMagick and Potrace; no raster in SVGs.

Run from any directory: python3 scripts/festival_trace_seal.py
The source reference is archived with the design. Does not replace the site's seal.
"""
from pathlib import Path
import subprocess
import tempfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'design/handstandfest-selo-07'
NS = '{http://www.w3.org/2000/svg}'
ET.register_namespace('', NS[1:-1])

# Original reference coordinates; preserve its joined crossbar and upright letters.
HF = 'M491 520 H585 V686 H690 V520 H783 V686 H865 V520 H1174 V618 H958 V686 H1109 V785 H958 V965 H865 V785 H783 V965 H690 V785 H585 V965 H491 Z'

with tempfile.TemporaryDirectory() as scratch:
    mask = Path(scratch) / 'ink.pbm'
    traced = Path(scratch) / 'ink.svg'
    # Dark green + yellow become one silhouette. Paper fibers remain background.
    subprocess.run(['magick', str(OUT / 'reference.png'), '-crop', '1040x1040+280+200',
                    '+repage', '-fx', '(r<0.55 && g<0.65 && b<0.55) || (r>0.7 && g>0.5 && b<0.45) ? 0 : 1',
                    '-threshold', '50%', str(mask)], check=True)
    subprocess.run(['potrace', str(mask), '--svg', '--turdsize', '3', '--alphamax', '0.8',
                    '--opttolerance', '0.15', '--output', str(traced)], check=True)
    ink = ET.parse(traced).getroot().find(NS + 'g')
    ink.set('id', 'brush')
    ink.set('fill', '#0f3d33')
    for name, paper in [('hf-brush.svg', False), ('hf-brush-paper.svg', True)]:
        svg = ET.Element(NS + 'svg', {'viewBox': '0 0 1040 1040', 'width': '1080', 'height': '1080',
                                     'role': 'img', 'aria-labelledby': 'title desc'})
        ET.SubElement(svg, NS + 'title', {'id': 'title'}).text = 'HandstandFest — HF brush seal'
        ET.SubElement(svg, NS + 'desc', {'id': 'desc'}).text = 'Upright yellow HF over a dark green brush circle with irregular bristles and transparent dry-paint gaps.'
        if paper:
            ET.SubElement(svg, NS + 'path', {'fill': '#f6f1e4', 'd': 'M0 0H1040V1040H0Z'})
        svg.append(ink)
        ET.SubElement(svg, NS + 'path', {'id': 'hf', 'fill': '#ffd23f', 'transform': 'translate(-280 -200)', 'd': HF})
        ET.ElementTree(svg).write(OUT / name, encoding='unicode', xml_declaration=True)
        print(name, (OUT / name).stat().st_size, 'bytes')

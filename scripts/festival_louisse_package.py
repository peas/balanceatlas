#!/usr/bin/env python3
"""Export the reviewed Louisse mixed carousel, then package silent/music masters."""
import argparse
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--reuse-renders', action='store_true', help='Package existing reviewed Remotion outputs without rerendering')
args = parser.parse_args()
out = ROOT/'local/festival/publicacao/2026-11-25-louisse'
out.mkdir(parents=True, exist_ok=True)
def run(command):
    subprocess.run(command, cwd=ROOT, check=True)
if not args.reuse_renders:
    run(['python3', 'scripts/festival_render.py', *[f'louisse-confirmada-{i}' for i in [1,3,5,6]], '--still', '--frame', '60', '--output-dir', str(out)])
    run(['python3', 'scripts/festival_render.py', 'louisse-confirmada-2', 'louisse-confirmada-4', '--output-dir', str(out)])
music = ROOT/'local/festival/music/mixkit/1168-coffee-or-tea.mp3'
files=[]
for n in range(1,7):
    stem=f'louisse-confirmada-{n}'
    if n in [2,4]:
        duration=9 if n==2 else 12.4
        final=out/f'{n:02}-louisse.mp4'
        run(['ffmpeg','-nostdin','-v','error','-y','-i',str(out/f'{stem}.mp4'),'-ss','12','-i',str(music),'-map','0:v:0','-map','1:a:0','-t',str(duration),'-c:v','copy','-af',f'loudnorm=I=-18:TP=-2:LRA=9,afade=t=in:d=0.25,afade=t=out:st={duration-1}:d=1','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',str(final)])
    else:
        final=out/f'{n:02}-louisse.jpg'
        run(['ffmpeg','-nostdin','-v','error','-y','-i',str(out/f'{stem}.png'),'-frames:v','1','-q:v','2',str(final)])
    files.append(final.name)
caption='''Olha o que a professora Louisse Aldrigues faz na parada de mão!

Ela está confirmada no 1º HandstandFest, um festival de parada de mão com aulas e encontros para praticar e trocar experiências.

Nascida em Brasília, começou no circo em 2011 e se especializou em parada de mão na Escola Nacional de Circo. É professora de parada de mão desde 2015.

Vamos praticar com ela de 16 a 18 de abril de 2027, no Trapézio Voador, em São Paulo.

Interessou? Envie este post para quem também quer praticar handstand!

Conheça o trabalho dela em @lou.handstand. Informações e inscrições no link da bio.

Fotos: Louisse Aldrigues (@lou.handstand).
Música nos vídeos: Coffee or Tea, de Michael Ramir C., via Mixkit.

#handstand #handstandfest'''
(out/'legenda.txt').write_text(caption+'\n')
manifest={'status':'rendered-not-published','composition':'louisse-confirmada','canvas':[1080,1440],'files':files,'source_ids':['louisse-20261120-foto-01','louisse-20261120-foto-04','louisse-20261124-video-01','louisse-20261124-video-02'],'cuts':{'slide2':[3,12],'slide4':[6,17],'freeze_source_seconds':10,'freeze_duration':1.4},'music':{'track':'Coffee or Tea','author':'Michael Ramir C.','provider':'Mixkit','id':1168,'source_start':12,'license_record':'local/festival/music/mixkit/license-2026-11-23.html'},'note':'Audio only in video slides. Silent masters retained. Photo caption credit confirmed by Paulo. P&B freeze is photographic, not generated engraving.'}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
# Explicit posters and dimensions avoid blank/collapsed local browser previews.
for n in [2,4]:
    run(['ffmpeg','-nostdin','-v','error','-y','-ss','0.5','-i',str(out/f'{n:02}-louisse.mp4'),'-frames:v','1','-q:v','2',str(out/f'{n:02}-poster.jpg')])
labels=['A prática da Louisse','Mudanças de forma','Do circo à parada de mão','Um braço, pausa e retomada','Professora confirmada no festival','Envie para quem quer praticar']
cards=''.join(f'<article><h2>{i+1:02} · {labels[i]}</h2>'+ (f'<video width="1080" height="1440" controls playsinline preload="auto" poster="{i+1:02}-poster.jpg"><source src="{name}?v=2" type="video/mp4"></video><p class="status">Use o play para assistir com música.</p>' if name.endswith('.mp4') else f'<img src="{name}?v=2" alt="Lâmina {i+1}">')+f'<a href="{name}">Abrir arquivo</a> · <a href="{name}" download>Baixar</a></article>' for i,name in enumerate(files))
(out/'index.html').write_text('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Louisse · Parada de mão</title><style>body{margin:0;padding:28px;background:#f3eddf;color:#123d33;font:18px system-ui}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}article{min-width:0}h2{font-size:20px;min-height:48px}img,video{width:100%;height:auto;aspect-ratio:3/4;object-fit:contain;display:block;border-radius:16px;background:#123d33}a{display:inline-block;padding:14px 0;color:inherit}pre{white-space:pre-wrap;max-width:800px;line-height:1.6;font:inherit}.status{font-size:14px}</style><h1>Conheça a prática da professora Louisse</h1><p>Carrossel de 6 lâminas. Música nos vídeos 2 e 4. Revisão 2, ainda não publicada.</p><main>'+cards+'</main><h2>Legenda</h2><pre>'+caption+'</pre><script>document.querySelectorAll("video").forEach(v=>{v.addEventListener("error",()=>{v.nextElementSibling.textContent="O navegador não carregou este vídeo. Use Abrir arquivo abaixo."});});</script></html>')
print(out/'index.html')

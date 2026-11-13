#!/usr/bin/env python3
"""Materialize a reviewed batch: preserve originals, trim SDR masters, and make a local gallery.

Classification and original-timeline cuts live in acervo/catalogo.yaml. A batch JSON supplies
source-relative filenames and review decisions. No network, publishing or original deletion.
Requires ffmpeg-full (zscale), Pillow and the repository's Ruby YAML reader.
"""
import argparse, hashlib, html, json, shutil, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps
from festival_vocabulario import yaml_para_json
ROOT = Path(__file__).resolve().parents[1]
FF = shutil.which('ffmpeg')
FULL = Path('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
if FULL.exists(): FF = str(FULL)

def digest(path):
    with path.open('rb') as f: return hashlib.file_digest(f, 'sha256').hexdigest()

def call(args):
    result = subprocess.run([str(x) for x in args], capture_output=True, text=True)
    if result.returncode: raise RuntimeError(result.stderr[-4000:])
    return result.stdout

def materialize(spec, catalog, source_root, base):
    row = catalog[spec['catalog_id']]
    original = base/'originals'/Path(spec['source']).name
    original.parent.mkdir(parents=True, exist_ok=True)
    if not original.exists():
        source = source_root/spec['source']
        if digest(source) != spec['sha256']: raise ValueError(f'Source hash mismatch: {source}')
        shutil.copy2(source, original)
    if digest(original) != spec['sha256']: raise ValueError(f'Archived hash mismatch: {original}')
    result = {'catalog_id':row['id'], 'source':spec['source'], 'original':str(original.relative_to(ROOT)), 'sha256':spec['sha256'], 'outputs':[]}
    if row.get('midia') == 'imagem':
        with Image.open(original) as src:
            im = ImageOps.exif_transpose(src).convert('RGB')
            im.thumbnail((1800,1800))
            dest = base/'selecionados'/f"{row['id']}.webp"
            im.save(dest, quality=90, method=6)
        result['outputs'].append({'path':str(dest.relative_to(base)), 'kind':'image','title':row['resumo'], 'sha256':digest(dest)})
    else:
        for cut in row['cortes']:
            start, end = cut['de'], cut['ate']
            if not 0 <= start < end <= row['duracao']+.01: raise ValueError(f'Invalid cut: {row["id"]}')
            dest = ROOT/cut['arquivo_local']
            dest.parent.mkdir(parents=True, exist_ok=True)
            hdr = row.get('transfer_original') in ['arib-std-b67','smpte2084']
            recipe = {'source_sha256':spec['sha256'],'start':start,'end':end,'preset':'sdr-1080-h264-crf20-30fps-aac128-v1' if hdr else 'sdr-limited-1080-h264-crf20-30fps-aac128-v2'}
            sidecar = dest.with_suffix('.json')
            saved = json.loads(sidecar.read_text()) if sidecar.exists() else {}
            if not (dest.exists() and saved.get('recipe') == recipe and saved.get('sha256') == digest(dest)):
                # Autorotation occurs before filtering. Keep source aspect and all body pixels.
                vf = "scale=w='min(1080,iw)':h=-2"
                if hdr:
                    vf += ',zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv'
                else:
                    vf += ',scale=in_range=auto:out_range=tv'
                vf += ',fps=30,format=yuv420p'
                call([FF,'-v','error','-y','-ss',start,'-i',original,'-t',round(end-start,3),'-map','0:v:0','-map','0:a:?', '-vf',vf,'-c:v','libx264','-preset','fast','-crf','20','-threads','2','-c:a','aac','-b:a','128k','-map_metadata','-1','-metadata:s:v:0','rotate=0','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-movflags','+faststart',dest])
                sidecar.write_text(json.dumps({'recipe':recipe,'sha256':digest(dest)},indent=2)+'\n')
            freeze = cut.get('freeze', (start+end)/2)
            poster = dest.with_suffix('.jpg')
            call([FF,'-v','error','-y','-ss',round(freeze-start,3),'-i',dest,'-vf','scale=540:-2','-frames:v','1',poster])
            q=json.loads(call(['ffprobe','-v','error','-show_streams','-show_format','-of','json',dest]))
            video=next(v for v in q['streams'] if v['codec_type']=='video')
            duration=float(q['format']['duration'])
            if abs(duration-(end-start)) > .15: raise ValueError(f'Unexpected duration: {dest}')
            if video['codec_name']!='h264' or video['pix_fmt']!='yuv420p': raise ValueError(f'Unexpected format: {dest}')
            result['outputs'].append({'path':str(dest.relative_to(base)),'poster':str(poster.relative_to(base)), 'kind':'video','title':cut['titulo'],'from_original':start,'to_original':end,'duration':duration,'freeze_original':freeze,'freeze_cut':round(freeze-start,3),'width':video['width'],'height':video['height'],'sha256':digest(dest)})
    print(row['id'],flush=True)
    return result

def gallery(base, results, catalog):
    cards=[]
    for r in results:
        row=catalog[r['catalog_id']]
        for out in r['outputs']:
            src=html.escape(out['path'],quote=True)
            media=f'<video controls preload="none" poster="{html.escape(out["poster"])}" src="{src}"></video>' if out['kind']=='video' else f'<img loading="lazy" src="{src}">'
            detail=f'{out["from_original"]}–{out["to_original"]} s no original · {out["duration"]:.1f} s' if out['kind']=='video' else 'Foto selecionada / original preservado'
            cards.append(f'<article>{media}<h2>{html.escape(out["title"])}</h2><p>{html.escape(detail)}</p><p>{html.escape(row["resumo"])}</p><a href="{src}" download>Baixar arquivo</a><small>{html.escape(row["id"])}</small></article>')
    (base/'index.html').write_text('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Acervo · natureza e piscina</title><style>body{margin:32px;background:#f3eddf;color:#123d33;font:17px system-ui}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}article{background:white;padding:16px;border-radius:16px}img,video{width:100%;height:430px;object-fit:contain;background:#123d33}h2{font-size:21px}small{display:block;margin-top:12px}a{color:#123d33}</style><h1>Natureza e piscina · seleção</h1><p>Cortes de trabalho, sem texto ou marca. Originais intactos. Áudio preservado quando presente, ainda não revisado.</p><main>'+''.join(cards)+'</main></html>')

if __name__=='__main__':
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('batch',type=Path)
    ap.add_argument('--source-root',type=Path,default=Path.home()/'Downloads')
    ap.add_argument('--workers',type=int,default=2)
    args=ap.parse_args()
    spec=json.loads(args.batch.read_text());base=ROOT/spec['output_dir'];(base/'selecionados').mkdir(parents=True,exist_ok=True)
    catalog={r['id']:r for r in yaml_para_json(ROOT/'acervo/catalogo.yaml')}
    selected=[r for r in spec['files'] if r.get('catalog_id') and r['decision'] in ['keep','existing-original']]
    with ThreadPoolExecutor(max_workers=args.workers) as pool: results=list(pool.map(lambda r:materialize(r,catalog,args.source_root,base), selected))
    (base/'manifest.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
    priority = spec.get('priority', [])
    gallery(base, sorted(results, key=lambda r: priority.index(r['catalog_id']) if r['catalog_id'] in priority else len(priority)), catalog)
    print('Local gallery:',base/'index.html')

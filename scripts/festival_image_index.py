#!/usr/bin/env python3
"""Inventory retreat image references and prepare labelled sheets for visual cataloguing.

No pose detection or automatic semantic classification. Downloads are cached under local/image-index.
The reviewed annotations belong in acervo/catalogo.yaml, not in a second source of truth.
"""
import argparse, hashlib, json, re, urllib.request
from collections import Counter
from festival_vocabulario import yaml_para_json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageOps, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
CACHE=ROOT/'local/image-index'

def prepare():
    refs={}
    for p in sorted((ROOT/'src/content/retreats').glob('*.md')):
        for path in re.findall(r'"(/images/retreats/[^"\s]+)"',p.read_text()):
            refs.setdefault(path,[])
            if str(p.relative_to(ROOT)) not in refs[path]: refs[path].append(str(p.relative_to(ROOT)))
    rows=[{'id':'photo-'+Path(p).with_suffix('').as_posix().removeprefix('/images/retreats/').replace('/','-'), 'path':p, 'url':'https://media.balanceatlas.com'+p,'references':refs[p]} for p in sorted(refs)]
    CACHE.mkdir(parents=True,exist_ok=True)
    def fetch(row):
        dest=CACHE/'photos'/row['path'].removeprefix('/images/retreats/')
        dest.parent.mkdir(parents=True,exist_ok=True)
        if not dest.exists():
            req=urllib.request.Request(row['url'],headers={'User-Agent':'BalanceAtlas image inventory'})
            dest.write_bytes(urllib.request.urlopen(req,timeout=40).read())
        with Image.open(dest) as im:row.update(width=im.width,height=im.height)
        row['sha256']=hashlib.sha256(dest.read_bytes()).hexdigest()
        row['cached']=str(dest.relative_to(ROOT))
        return row
    with ThreadPoolExecutor(6) as pool:
        jobs={pool.submit(fetch,r):r for r in rows}
        for n,f in enumerate(as_completed(jobs),1):
            try:f.result()
            except Exception as e:jobs[f]['error']=str(e)
            if n%25==0 or n==len(rows):print(f'{n}/{len(rows)} checked',flush=True)
    (CACHE/'inventory.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
    for start in range(0,len(rows),15):
        sheet=Image.new('RGB',(1200,1450),'#eee9df');d=ImageDraw.Draw(sheet)
        for i,row in enumerate(rows[start:start+15]):
            x=(i%3)*400;y=(i//3)*290
            if 'cached' in row:
                with Image.open(ROOT/row['cached']) as im:
                    thumb=ImageOps.contain(im.convert('RGB'),(390,255));sheet.paste(thumb,(x+(400-thumb.width)//2,y+(255-thumb.height)//2))
            d.text((x+5,y+257),f"{start+i:03} {row['id'].removeprefix('photo-')}",fill='#111')
        sheet.save(CACHE/f'sheet-{start//15+1:02}.jpg',quality=91)
    errors=[r for r in rows if 'error' in r];print(f'{len(rows)} references; {len(errors)} errors; sheets in {CACHE}')
    if errors:print(json.dumps(errors,ensure_ascii=False,indent=2))

def photos():
    return [r for r in yaml_para_json(ROOT/'acervo/catalogo.yaml') if r.get('midia')=='imagem']

def validate(rows):
    ids=[r['id'] for r in yaml_para_json(ROOT/'acervo/catalogo.yaml')]
    assert len(ids)==len(set(ids)), 'Duplicate catalogue ids'
    for row in rows:
        assert row.get('resumo') and isinstance(row.get('forma'),list), row['id']
        assert row.get('revisao_visual',{}).get('estado') in ['revisado','indisponivel'], row['id']
        if row['revisao_visual']['estado']=='indisponivel':
            assert row['handstand'] is None and row['pessoas'] is None, row['id']
            continue
        assert type(row['handstand']) is bool, row['id']
        assert type(row['pessoas']) is int and type(row['pessoas_em_handstand']) is int, row['id']
        assert 0<=row['pessoas_em_handstand']<=row['pessoas'], row['id']
        assert row['handstand']==(row['pessoas_em_handstand']>0), row['id']
        assert row['grupo_em_handstand']==(row['pessoas_em_handstand']>=2), row['id']
        assert row['todos_em_handstand']==bool(row['handstand'] and row['pessoas']==row['pessoas_em_handstand']), row['id']
        assert row['largura']>0 and row['altura']>0, row['id']
    print(f'Valid: {len(rows)} image entries; unique ids and consistent discovery fields.')

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--prepare',action='store_true',help='Download referenced photos and make 15-image review sheets; does not overwrite annotations')
    parser.add_argument('--validate',action='store_true',help='Check image schema and count/boolean consistency')
    parser.add_argument('--summary',action='store_true',help='Show catalogue coverage and shape counts')
    parser.add_argument('--list',action='store_true',help='List matching images from the canonical YAML')
    parser.add_argument('--handstand',choices=['true','false'],help='Filter whether at least one handstand is visible')
    parser.add_argument('--people',type=int,help='Approximate total number of visible people')
    parser.add_argument('--shape',help='Shape label, e.g. reta, straddle, tuck, uma-mao, apoio-cabeca')
    parser.add_argument('--group',action='store_true',help='At least two people in handstand')
    parser.add_argument('--all-in-handstand',action='store_true',help='All visible people in handstand; combine with --group')
    parser.add_argument('--whole-body',action='store_true',help='Main subject has full body inside the frame')
    parser.add_argument('--use',help='Suggested use, e.g. recorte-gravura or treino-coletivo')
    parser.add_argument('--json',action='store_true',help='Emit matching entries as JSON (derived, never edit this export)')
    args=parser.parse_args()
    if args.prepare:prepare();return
    rows=photos()
    if args.validate:validate(rows)
    if args.summary:
        stats={'images':len(rows),'reviewed':sum(r['revisao_visual']['estado']=='revisado' for r in rows),'unavailable':sum(r['revisao_visual']['estado']=='indisponivel' for r in rows),'handstand':sum(r['handstand'] is True for r in rows),'single_person_handstand':sum(r['handstand'] is True and r['pessoas']==1 for r in rows),'single_person_full_body_handstand':sum(r['handstand'] is True and r['pessoas']==1 and r.get('corpo')=='inteiro' for r in rows),'groups_in_handstand':sum(r['grupo_em_handstand'] is True for r in rows),'all_group_in_handstand':sum(r['grupo_em_handstand'] is True and r['todos_em_handstand'] is True for r in rows),'shapes':dict(Counter(shape for r in rows for shape in r['forma']))}
        print(json.dumps(stats,ensure_ascii=False,indent=2))
    filtered=rows
    if args.handstand is not None:filtered=[r for r in filtered if r['handstand'] is (args.handstand=='true')]
    if args.people is not None:filtered=[r for r in filtered if r['pessoas']==args.people]
    if args.shape:filtered=[r for r in filtered if args.shape in r['forma']]
    if args.group:filtered=[r for r in filtered if r['grupo_em_handstand'] is True]
    if args.all_in_handstand:filtered=[r for r in filtered if r['todos_em_handstand'] is True]
    if args.whole_body:filtered=[r for r in filtered if r.get('corpo')=='inteiro']
    if args.use:filtered=[r for r in filtered if args.use in r.get('uso_sugerido',[])]
    if args.json:print(json.dumps(filtered,ensure_ascii=False,indent=2))
    elif args.list:
        for r in filtered:print(f"{r['id']} | pessoas={r['pessoas']} | handstand={r['handstand']} | {','.join(r['forma']) or '—'} | {r.get('url',r['arquivo'])}")
        print(f'{len(filtered)} matches')
    elif not args.validate and not args.summary:parser.print_help()

if __name__=='__main__':main()

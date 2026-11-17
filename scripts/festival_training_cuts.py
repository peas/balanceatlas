# Rebuild this intake batch; see acervo/lotes/gabriel-training-2026-11-17.md
from pathlib import Path
import json,subprocess,concurrent.futures
b=Path(__file__).resolve().parents[1];base=b/'local/festival/gabriel-2026-11-17';r=json.loads((base/'manifest.json').read_text());out=b/'public/festival/ig/gabriel-training-v1';out.mkdir(parents=True,exist_ok=True)
# Original source intervals, no speed change. Short recordings retained in full where useful.
spec=[(11,'gato-vaca','gato-vaca',0,13.43,['GATO-VACA.','COLUNA EM AÇÃO.'],'Duas posições. Uma passagem contínua.'),(12,'escapulas','escapulas',0,11.35,['EMPURRE','O CHÃO.'],'Observe o movimento das escápulas.'),(13,'ombros-apoio','ombros-cadeira',2,19,['OMBROS','COM APOIO.'],'Observe braços e tronco de perfil.'),(14,'chute-parede','chute-parede',0,40.5,['COMO CHEGA','O PRIMEIRO PÉ?'],'A entrada e o retorno fazem parte.'),(16,'saida-parede','saida-estrela',0,22.3,['SAIR TAMBÉM','É PRATICAR.'],'Observe a saída para o lado.')]
ff='/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg';sdr='scale=720:-2,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p'
def make(s):
 i,id,exercise,start,end,hook,note=s;src=r[i];seconds=end-start;target=out/f'{id}.mp4'
 subprocess.run([ff,'-v','error','-y','-ss',str(start),'-i',str(base/'originals'/src['file']),'-t',str(seconds),'-vf',sdr,'-r','30','-c:v','libx264','-preset','fast','-crf','23','-an','-movflags','+faststart',str(target)],check=True)
 freeze=seconds-1/30
 subprocess.run([ff,'-v','error','-y','-ss',str(freeze),'-i',str(target),'-frames:v','1',str(out/f'{id}-freeze.webp')],check=True)
 return dict(id=id,title={'gato-vaca':'Gato-vaca','escapulas':'Escápulas em prancha','ombros-apoio':'Abertura de ombros com apoio','chute-parede':'Entrada na parede','saida-parede':'Saída lateral da parede'}[id],exercise_id=exercise,source_id=src['id'],source_start=start,source_end=end,seconds=seconds,freeze=freeze,cover=min(4,seconds/2),hook=hook,note=note,src=f'/festival/ig/gabriel-training-v1/{id}.mp4',poster=f'/festival/ig/gabriel-training-v1/{id}-freeze.webp',review='pending_technical_review')
with concurrent.futures.ThreadPoolExecutor(2) as ex:rows=list(ex.map(make,spec))
(b/'src/festival/ig2/gabriel-training-2026-11-17.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Prepared',len(rows),'clean cuts')

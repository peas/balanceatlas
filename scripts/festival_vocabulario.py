#!/usr/bin/env python3
"""Local page where Paulo names handstand positions and movements on the catalogued footage.

It serves acervo/vocabulario.html on http://localhost:4331 with one card per catalogued scene that has a position
(acervo/catalogo.yaml, read through the system ruby: there is no PyYAML here). Each card loops the excerpt from the
local proxy (local/festival/proxies), zoomed on the body when there is pose data, and lets him mark instants and
name what he sees. Every change is saved at once to acervo/vocabulario.yaml:

  termos:      [{nome, tipo, outros_nomes, definicao}]            the vocabulary itself
  marcacoes:   [{item, clip, t, nome, quem, nota}]                where each term was seen (t in seconds of the clip)

Nothing leaves this machine: the server binds to 127.0.0.1 and the footage stays in local/.

Examples
  scripts/festival_vocabulario.py              # start and open the browser
  scripts/festival_vocabulario.py --sem-abrir  # just serve (used by .claude/launch.json)
  scripts/festival_vocabulario.py --porta 4400
"""
import argparse, json, os, re, subprocess, webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCAL = ROOT / 'local' / 'festival'
CATALOGO = ROOT / 'acervo' / 'catalogo.yaml'
VOCAB = ROOT / 'acervo' / 'vocabulario.yaml'
PAGINA = ROOT / 'acervo' / 'vocabulario.html'
FORA = {'ambiente', 'fala', 'andando', 'aquecimento'}  # scenes with only these have nothing to name
ORDEM = ['reta', 'chute', 'press', 'straddle', 'tuck', 'pike', 'stag', 'uma-mao', 'troca-de-peso', 'parede', 'saida', 'queda', 'acro']
CABECALHO = """# Vocabulário de handstand do Paulo: os nomes que ele usa para posições e movimentos.
# Escrito pela página local (scripts/festival_vocabulario.py); editar à mão também vale, a página relê ao abrir.
# `marcacoes[].t` está em segundos do clipe do acervo (acervo/catalogo.yaml); sem `t` vale para o trecho inteiro.
"""


def yaml_para_json(path: Path):
    # works on the system ruby 2.6 (old Psych, dates allowed) and on newer ones (unsafe_load_file for the dates)
    r = subprocess.run(['ruby', '-ryaml', '-rjson', '-rdate', '-e',
                        'd = YAML.respond_to?(:unsafe_load_file) ? YAML.unsafe_load_file(ARGV[0]) : YAML.load_file(ARGV[0]); puts JSON.generate(d)',
                        str(path)], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(f'não consegui ler {path}:\n{r.stderr[-400:]}')
    return json.loads(r.stdout)


def json_para_yaml(data) -> str:
    r = subprocess.run(['ruby', '-ryaml', '-rjson', '-e', 'puts JSON.parse(STDIN.read).to_yaml(line_width: 110)'],
                       input=json.dumps(data, ensure_ascii=False), capture_output=True, text=True)
    if r.returncode:
        raise RuntimeError(r.stderr[-400:])
    return r.stdout.split('\n', 1)[1] if r.stdout.startswith('---') else r.stdout


def zoom(clip: str, de: float, ate: float):
    """Where the body is during the scene, from the pose file: centre (% of the frame) and a scale that fills the
    card with it. None when the pose is missing or too sparse (the card then shows the whole frame)."""
    p = LOCAL / 'pose' / f'{clip}.json'
    if not p.exists():
        return None
    xs, ys = [], []
    for q in json.loads(p.read_text())['quadros']:
        if de <= q['t'] <= ate and 'pose' in q:
            for j in (11, 12, 15, 16, 23, 24, 27, 28):  # shoulders, wrists, hips, ankles
                x, y, _, vis = q['pose'][j]
                if vis > 0.5:
                    xs.append(x); ys.append(y)
    if len(xs) < 40:
        return None
    xs.sort(); ys.sort()
    lo = lambda v: v[int(len(v) * 0.03)]
    hi = lambda v: v[int(len(v) * 0.97)]
    w, h = hi(xs) - lo(xs), hi(ys) - lo(ys)
    escala = max(1.0, min(3.0, 1 / (w + 0.35), 1 / (h + 0.25)))
    return {'x': round(100 * (lo(xs) + hi(xs)) / 2, 1), 'y': round(100 * (lo(ys) + hi(ys)) / 2, 1), 'escala': round(escala, 2)}


def itens():
    out = []
    for c in yaml_para_json(CATALOGO):
        if c.get('tipo') == 'edicao' or not (LOCAL / 'proxies' / f"{c['id']}.mp4").exists():
            continue
        for k, s in enumerate(c.get('cenas') or []):
            pos = [str(p) for p in (s.get('posicao') if isinstance(s.get('posicao'), list) else [s.get('posicao')]) if p]
            if not set(pos) - FORA:
                continue
            chave = next((ORDEM.index(p) for p in pos if p in ORDEM), len(ORDEM))
            out.append({'id': f"{c['id']}@{s['de']}", 'clip': c['id'], 'de': float(s['de']), 'ate': float(s['ate']),
                        'posicao': pos, 'o_que': s.get('o_que', ''), 'quadro': s.get('quadro', ''),
                        'quem': s.get('quem') or c.get('quem') or [], 'nota': s.get('nota') or 0,
                        'local': c.get('local', ''), 'data': str(c.get('data', '')),
                        'zoom': zoom(c['id'], float(s['de']), float(s['ate'])), '_k': (chave, -(s.get('nota') or 0), k)})
    out.sort(key=lambda i: i.pop('_k'))
    return out


class Handler(BaseHTTPRequestHandler):
    itens: list = []

    def log_message(self, *a):  # quiet: the footage requests would flood the terminal
        pass

    def enviar(self, code, body: bytes, tipo='application/json; charset=utf-8', extra=None):
        self.send_response(code)
        self.send_header('Content-Type', tipo)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/':
            return self.enviar(200, PAGINA.read_bytes(), 'text/html; charset=utf-8')
        if path == '/dados':
            estado = yaml_para_json(VOCAB) if VOCAB.exists() else {}
            estado = {'termos': (estado or {}).get('termos') or [], 'marcacoes': (estado or {}).get('marcacoes') or []}
            return self.enviar(200, json.dumps({'itens': Handler.itens, 'estado': estado}, ensure_ascii=False).encode())
        m = re.fullmatch(r'/midia/([\w.@-]+)\.mp4', path)
        if m:
            return self.video(LOCAL / 'proxies' / f'{m[1]}.mp4')
        self.enviar(404, b'{}')

    def video(self, f: Path):
        """Byte ranges by hand: the stdlib server has none, and without them the browser cannot seek."""
        if not f.exists():
            return self.enviar(404, b'{}')
        size = f.stat().st_size
        m = re.match(r'bytes=(\d*)-(\d*)', self.headers.get('Range', ''))
        ini, fim = (int(m[1] or 0), int(m[2] or size - 1)) if m else (0, size - 1)
        fim = min(fim, size - 1)
        self.send_response(206 if m else 200)
        self.send_header('Content-Type', 'video/mp4')
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Length', str(fim - ini + 1))
        if m:
            self.send_header('Content-Range', f'bytes {ini}-{fim}/{size}')
        self.end_headers()
        with open(f, 'rb') as fh:
            fh.seek(ini)
            resto = fim - ini + 1
            try:
                while resto > 0:
                    chunk = fh.read(min(1 << 18, resto))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    resto -= len(chunk)
            except (BrokenPipeError, ConnectionResetError):
                pass  # the browser dropped the request while seeking

    def do_POST(self):
        if self.path != '/salvar':
            return self.enviar(404, b'{}')
        try:
            d = json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))))
            limpo = {'termos': [{k: v for k, v in t.items() if v not in ('', None, [])} for t in d.get('termos', []) if t.get('nome')],
                     'marcacoes': [{k: v for k, v in m.items() if v not in ('', None)} for m in d.get('marcacoes', []) if m.get('nome') or m.get('nota')]}
            tmp = VOCAB.with_suffix('.yaml.tmp')
            tmp.write_text(CABECALHO + json_para_yaml(limpo))
            os.replace(tmp, VOCAB)
            self.enviar(200, json.dumps({'ok': True, 'termos': len(limpo['termos']), 'marcacoes': len(limpo['marcacoes'])}).encode())
        except Exception as e:  # the page shows the message and keeps the text in the browser
            self.enviar(500, json.dumps({'ok': False, 'erro': str(e)}).encode())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--porta', type=int, default=4331, help='port (default 4331)')
    ap.add_argument('--sem-abrir', action='store_true', help='do not open the browser')
    args = ap.parse_args()
    Handler.itens = itens()
    url = f'http://localhost:{args.porta}/'
    print(f'{len(Handler.itens)} trechos do catálogo · {url} · salva em {VOCAB.relative_to(ROOT)}', flush=True)
    srv = ThreadingHTTPServer(('127.0.0.1', args.porta), Handler)
    if not args.sem_abrir:
        webbrowser.open(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()

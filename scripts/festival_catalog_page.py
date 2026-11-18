#!/usr/bin/env python3
"""Build a numbered contact page of the HandstandFest media archive, so a photo or video can be
cited by number ("use T-56 here").

Reads acervo/catalogo.yaml (never writes it) and src/festival/data.ts (to flag what the site
already uses). Retreat photos and videos are hot-linked from media.balanceatlas.com; photos that
only exist locally (Gabriel, nature batch, venue) are resized into <out>/img/.

Numbers:
  T-NN / G-NN / SP-NNN   retreat photos, NN = the file number on R2 (thailand-2026/56.webp = T-56)
  O-NN                   other photos, in catalogue order (append-only, so numbers stay stable)
  V-T10 / V-G07 / V-SP04 retreat videos referenced by the site (videos/retreats/<slug>/NN.mp4)

Usage:
  python3 scripts/festival_catalog_page.py --out ~/paulo-lab/public/rascunhos/acervo-handstandfest
"""
import argparse, html, json, re
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MEDIA = "https://media.balanceatlas.com"
RETREATS = [  # catalogue `local`, number prefix, section title
    ("thailand-2026", "T", "Tailândia · Koh Phangan, 2026"),
    ("greece-2025", "G", "Grécia · Paros, 2025"),
    ("saopaulo-2024", "SP", "São Paulo, 2024"),
]
# Local-only photos worth citing: where each catalogue `arquivo` prefix lives on disk.
OTHER_ROOTS = [
    ("gabriel-2026-11-12/", "local/festival/gabriel-2026-11-12/originals/", "Gabriel"),
    ("natureza-2026-11-12/", "local/festival/natureza-2026-11-12/originals/", "Natureza"),
    ("fotos/trapezio-voador/", "local/festival/fotos/trapezio-voador/", "Trapézio Voador"),
]


def records():
    text = (ROOT / "acervo/catalogo.yaml").read_text(encoding="utf-8")
    for block in re.split(r"\n(?=- id: )", text):
        m = re.match(r'- id: "?([^"\n]+)"?', block)
        if not m:
            continue
        def field(key, block=block):
            f = re.search(rf"\n  {key}: (.*)", block)
            return f.group(1).strip().strip('"') if f else ""
        yield m.group(1), field


def site_use():
    """{'thailand-2026/56': 'bento da home', ...} for photos; same keys for bento videos."""
    data = (ROOT / "src/festival/data.ts").read_text(encoding="utf-8")
    photos, videos = {}, set()
    for name, label in (("community", "bento da home"), ("atlasPhotos", "página /handstand")):
        body = re.search(rf"export const {name}: BentoItem\[\] = \[(.*?)\n\];", data, re.S).group(1)
        for key in re.findall(r"\$\{R2\}/([a-z0-9-]+/\d+)\.webp", body):
            photos.setdefault(key, label)
        videos.update(re.findall(r"\$\{R2V\}/([a-z0-9-]+/\d+)\.mp4", body))
    return photos, videos


def site_videos():
    found = set()
    for p in (ROOT / "src").rglob("*"):
        if p.suffix in {".astro", ".ts", ".tsx", ".md"}:
            found.update(re.findall(r"(?:videos/retreats|\$\{R2V\})/([a-z0-9-]+/\d+)\.mp4", p.read_text(encoding="utf-8")))
    return sorted(found)


def card(num, src, full, caption, badge="", meta=""):
    b = f'<span class="badge">{html.escape(badge)}</span>' if badge else ""
    return (f'<figure id="{num}" data-used="{1 if badge else 0}"><a href="{full}" target="_blank" rel="noopener">'
            f'<img src="{src}" alt="{html.escape(caption)}" loading="lazy"></a>'
            f'<figcaption><a class="num" href="#{num}">{num}</a>{b}<span class="cap">{html.escape(caption)}</span>'
            f'<span class="meta">{html.escape(meta)}</span></figcaption></figure>')


def build(out: Path):
    out.mkdir(parents=True, exist_ok=True)
    (out / "img").mkdir(exist_ok=True)
    used_photos, bento_videos = site_use()
    recs = list(records())
    sections, index = [], {}

    for local, prefix, title in RETREATS:
        cards = []
        for rid, f in recs:
            m = re.match(rf"photo-{local}-(\d+)$", rid)
            if not m or f("midia") != "imagem":
                continue
            n = m.group(1)
            num = f"{prefix}-{n}"
            url = f("url") or f"{MEDIA}/{f('arquivo')}"
            index[num] = url
            cards.append(card(num, url, url, f("resumo"), used_photos.get(f"{local}/{n}", ""),
                              f"{f('largura')}×{f('altura')}"))
        sections.append((prefix, title, cards))

    cards, n = [], 0
    for rid, f in recs:
        if f("midia") != "imagem":
            continue
        for cat_prefix, disk, who in OTHER_ROOTS:
            if not f("arquivo").startswith(cat_prefix):
                continue
            n += 1
            num = f"O-{n:02d}"
            src = ROOT / disk / Path(f("arquivo")).name
            if not src.exists():
                print(f"  missing on disk, skipped: {num} {src}")
                continue
            dest = out / "img" / f"{num}.webp"
            if not dest.exists():
                with Image.open(src) as im:
                    im = ImageOps.exif_transpose(im).convert("RGB")
                    im.thumbnail((1600, 1600))
                    im.save(dest, "WEBP", quality=82)
            index[num] = f"{rid} ({f('arquivo')})"
            cards.append(card(num, f"img/{num}.webp", f"img/{num}.webp", f("resumo"), "", f"{who} · {rid}"))
    sections.append(("O", "Outras fotos · Gabriel, natureza e Trapézio Voador", cards))

    vcards = []
    short = {local: prefix for local, prefix, _ in RETREATS}
    for key in site_videos():
        local, n = key.split("/")
        if local not in short:
            continue
        num = f"V-{short[local]}{n}"
        url = f"{MEDIA}/videos/retreats/{key}.mp4"
        index[num] = url
        poster = ROOT / f"public/festival/posters/{local}-{n}.webp"
        poster_attr = ""
        if poster.exists():
            (out / "img" / poster.name).write_bytes(poster.read_bytes())
            poster_attr = f' poster="img/{poster.name}"'
        badge = '<span class="badge">bento da home</span>' if key in bento_videos else ""
        vcards.append(f'<figure id="{num}" data-used="{1 if badge else 0}"><video controls muted playsinline '
                      f'preload="{"none" if poster_attr else "metadata"}"{poster_attr} src="{url}"></video>'
                      f'<figcaption><a class="num" href="#{num}">{num}</a>{badge}'
                      f'<span class="meta">videos/retreats/{key}.mp4</span></figcaption></figure>')
    sections.append(("V", "Vídeos dos retiros usados no site", vcards))

    nav = " ".join(f'<a href="#sec-{p}">{html.escape(t.split(" · ")[0])} <b>{len(c)}</b></a>' for p, t, c in sections)
    body = "\n".join(f'<section id="sec-{p}"><h2>{html.escape(t)} <small>{len(c)}</small></h2>'
                     f'<div class="grid">{"".join(c)}</div></section>' for p, t, c in sections)
    (out / "index.html").write_text(PAGE.replace("{{nav}}", nav).replace("{{body}}", body), encoding="utf-8")
    (out / "numeros.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")
    for p, t, c in sections:
        print(f"  {p}: {len(c)}  {t}")
    print(f"wrote {out/'index.html'}")


PAGE = """<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Acervo HandstandFest</title>
<style>
:root{--bg:#f6f1e7;--fg:#22201b;--mut:#6f6a5e;--card:#fffdf8;--line:#ddd5c4;--acc:#a8641c;--ok:#35603f}
@media (prefers-color-scheme:dark){:root{--bg:#191713;--fg:#ece6d8;--mut:#a39c8c;--card:#221f1a;--line:#3a352c;--acc:#e0a050;--ok:#8fc49b}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);padding:10px 16px}
h1{font-size:18px;margin:0 0 6px}header p{margin:0 0 8px;color:var(--mut);font-size:13px}
nav{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;font-size:14px}nav a{color:var(--acc);text-decoration:none}
nav b{color:var(--mut);font-weight:500}label{margin-left:auto;font-size:13px;color:var(--mut);cursor:pointer}
main{padding:0 16px 60px}h2{font-size:17px;margin:28px 0 12px;scroll-margin-top:110px}h2 small{color:var(--mut);font-weight:400}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;align-items:start}
figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:8px;overflow:hidden;scroll-margin-top:120px}
figure:target{outline:3px solid var(--acc)}img,video{display:block;width:100%;height:auto;background:var(--line)}
figcaption{padding:8px 10px 10px;display:flex;flex-wrap:wrap;gap:4px 8px;align-items:baseline}
.num{font:700 18px ui-monospace,monospace;color:var(--fg);text-decoration:none}
.badge{font-size:11px;color:var(--ok);border:1px solid var(--ok);border-radius:99px;padding:0 7px}
.cap{flex-basis:100%;font-size:12.5px}.meta{flex-basis:100%;font-size:11px;color:var(--mut);word-break:break-all}
body.used figure[data-used="0"]{display:none}
</style></head><body>
<header><h1>Acervo HandstandFest</h1>
<p>Cite pelo número (ex.: T-56). Clique na foto para abrir no tamanho cheio; o número é um link direto.</p>
<nav>{{nav}}<label><input type="checkbox" onchange="document.body.classList.toggle('used',this.checked)"> só o que o site já usa</label></nav></header>
<main>{{body}}</main></body></html>
"""

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", required=True, type=Path, help="output folder (index.html, numeros.json, img/)")
    build(ap.parse_args().out.expanduser())

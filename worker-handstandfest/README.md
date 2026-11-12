# handstandfest.com.br

Cloudflare Worker that serves the festival on its own domain without a second build: it proxies
`handstandfest.com.br/<page>` to `balanceatlas.com/hf/<page>` (GitHub Pages; `scripts/festival_hide.mjs` moves the built pages there so `/festival/` is a 404 on Balance Atlas) and strips `/festival/`
from the page links in the HTML. Assets keep their `/festival/...` and `/_astro/...` paths.

- Deploy: `npx wrangler deploy` in this folder (Paulo's Cloudflare account, zone `handstandfest.com.br`).
- A normal site deploy (push to `main`) needs nothing here: the Worker always reads the live pages.
- The zone has proxied placeholder A records (apex and `www`); the Worker route answers before them.
- If the festival ever gets its own build at the domain root, delete the Worker and point DNS at that host.

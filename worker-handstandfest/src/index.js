// Reverse proxy: handstandfest.com.br/<page> -> balanceatlas.com/hf/<page>.
// The site keeps root-relative links under /festival/ (it is still built for balanceatlas.com), so:
//   pages   /sobre/            -> origin /hf/sobre/, with /festival/ stripped from the links in the HTML
//   assets  /festival/x.webp, /_astro/x.js -> origin, same path
//   old page URLs /festival/sobre/ -> 301 to /sobre/
const ORIGIN = 'https://balanceatlas.com';
const PREFIX = '/festival'; // how the site writes its own links and assets
const PAGES = '/hf'; // where the built pages live on the origin (scripts/festival_hide.mjs); /festival/ is a 404 there
const APEX = 'handstandfest.com.br';

const isAsset = (path) => path.startsWith('/_astro/') || /\.[a-z0-9]+$/i.test(path);
const strip = (path) => path.slice(PREFIX.length) || '/';
const underPrefix = (path) => path === PREFIX || path.startsWith(PREFIX + '/');

// href as written in the HTML -> href on this domain
function localHref(href) {
  if (href.startsWith(ORIGIN + PREFIX)) href = href.slice(ORIGIN.length);
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const path = href.split(/[?#]/)[0];
  if (underPrefix(path)) return isAsset(path) ? href : strip(path) + href.slice(path.length);
  return isAsset(path) ? href : ORIGIN + href; // the rest of Balance Atlas lives on its own domain
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname !== APEX || url.protocol !== 'https:') return Response.redirect(`https://${APEX}${url.pathname}${url.search}`, 301);
    const path = url.pathname;
    const asset = isAsset(path);
    if (!asset && underPrefix(path)) return Response.redirect(`https://${APEX}${strip(path)}${url.search}`, 301);

    // Root discovery files belong to this festival, not to the Balance Atlas site.
    const discovery = path === '/robots.txt' || path === '/sitemap.xml';
    const target = ORIGIN + (discovery ? PREFIX + path : asset ? path : PAGES + path) + url.search;
    const headers = new Headers(request.headers);
    headers.delete('host');
    let res = await fetch(target, { method: request.method, headers, redirect: 'manual' });
    // a build from before the pages moved to /hf/ (or a rollback) still has them under /festival/
    if (!asset && res.status === 404) res = await fetch(ORIGIN + PREFIX + path + url.search, { method: request.method, headers, redirect: 'manual' });

    if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
      const to = new URL(res.headers.get('location'), target);
      const out = new Headers(res.headers);
      const back = to.pathname.startsWith(PAGES + '/') ? to.pathname.slice(PAGES.length) : to.pathname;
      out.set('location', to.origin === ORIGIN ? localHref(back + to.search) : to.href);
      return new Response(null, { status: res.status, headers: out });
    }
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;

    return new HTMLRewriter()
      .on('a[href]', { element(el) { el.setAttribute('href', localHref(el.getAttribute('href'))); } })
      .transform(res);
  },
};

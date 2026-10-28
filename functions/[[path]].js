export const SECURITY_HEADERS = Object.freeze({
  'Content-Security-Policy': "base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'",
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-Permitted-Cross-Domain-Policies': 'none'
});

function withSecurityHeaders(response, url) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
  if (url.hostname.endsWith('.pages.dev') || /^\/test(?:\/|$)/.test(url.pathname)) {
    headers.set('X-Robots-Tag', 'noindex, follow');
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function secureRedirect(url) {
  return withSecurityHeaders(Response.redirect(url.href, 301), url);
}

/** Canonical host and retirement of the former energy-service site. */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();
  let publicPath;
  try {
    const decoded = decodeURIComponent(url.pathname).replaceAll('\\', '/').replace(/^\/+/, '/');
    publicPath = new URL(`https://route.invalid${decoded}`).pathname;
  } catch {
    return withSecurityHeaders(new Response('Ongeldig adres', { status: 400 }), url);
  }
  // Development briefs and asset provenance stay in source control, not public pages.
  if (/^\/(?:\.|(?:scripts|scratch)(?:\/|$))/.test(publicPath) ||
      /^\/(?:PRODUCT|DESIGN|README)\.md$/i.test(publicPath) ||
      publicPath.endsWith('.webp.json')) {
    return withSecurityHeaders(new Response('Pagina niet gevonden', { status: 404 }), url);
  }
  const formerBrands = new Set([
    'klimaatplus', 'klimaat', 'airco', 'warmtepomp',
    'batteryplus', 'chargeplus', 'batterij', 'thuisbatterij', 'thuisbatterijen',
    'laadplus', 'laadpaal', 'laadpalen', 'serviceplus', 'service', 'storing',
    'storingen', 'spoed', 'solarplus', 'solar', 'zonnepanelen'
  ]);
  const retiredPaths = new Set([
    'elektrische-installaties', 'over-ons', 'klimaatplus', 'batteryplus',
    'laadplus', 'serviceplus', 'solarplus', 'laadpalen', 'thuisbatterijen', 'zonnepanelen'
  ]);
  const brand = hostname.endsWith('.bentechsolutions.be') && formerBrands.has(hostname.split('.')[0]);
  const retired = retiredPaths.has(url.pathname.split('/')[1]);
  if (brand || retired) {
    url.protocol = 'https:';
    url.host = 'bentechsolutions.be';
    url.pathname = '/';
    url.hash = 'diensten';
    return secureRedirect(url);
  }
  if (hostname === 'www.bentechsolutions.be') {
    url.hostname = 'bentechsolutions.be';
    return secureRedirect(url);
  }
  if (url.pathname === '/test' || url.pathname === '/test/index.html') {
    url.pathname = '/test/';
    return secureRedirect(url);
  }
  if (url.pathname === '/robots.txt') {
    return withSecurityHeaders(new Response('User-agent: *\nAllow: /\nSitemap: https://bentechsolutions.be/sitemap.xml\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    }), url);
  }
  if (url.pathname === '/sitemap.xml') {
    const paths = ['/', '/privacy/', '/fotocredits/'];
    const urls = paths.map(path => `<url><loc>https://bentechsolutions.be${path}</loc><lastmod>2026-10-24</lastmod></url>`).join('');
    return withSecurityHeaders(new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    }), url);
  }
  return withSecurityHeaders(await context.next(), url);
}

/**
 * Cloudflare Pages Functions Edge Router
 * Routes subdomains (e.g. klimaatplus.bentechsolutions.be) to their dedicated division folder (/klimaatplus/)
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // Keep one canonical public host. Query and path survive this redirect.
  if (hostname === 'www.bentechsolutions.be') {
    url.hostname = 'bentechsolutions.be';
    return Response.redirect(url.href, 301);
  }

  // Subdomain to folder mapping
  const brandSubdomainMap = {
    // 1. KlimaatPlus (Airco & Warmtepompen)
    'klimaatplus': '/klimaatplus',
    'klimaat': '/klimaatplus',
    'airco': '/klimaatplus',
    'warmtepomp': '/klimaatplus',

    // 2. BatteryPlus (Thuisbatterijen)
    'batteryplus': '/batteryplus',
    'chargeplus': '/batteryplus',
    'batterij': '/batteryplus',
    'thuisbatterij': '/batteryplus',
    'thuisbatterijen': '/batteryplus',

    // 3. LaadPlus (Laadpalen)
    'laadplus': '/laadplus',
    'laadpaal': '/laadplus',
    'laadpalen': '/laadplus',

    // 4. ServicePlus (24/7 Depannage & Storingen)
    'serviceplus': '/serviceplus',
    'service': '/serviceplus',
    'storing': '/serviceplus',
    'storingen': '/serviceplus',
    'spoed': '/serviceplus',

    // 5. SolarPlus (Zonnepanelen)
    'solarplus': '/solarplus',
    'solar': '/solarplus',
    'zonnepanelen': '/solarplus'
  };

  // Every sitemap contains only this host's canonical URLs. A cross-host
  // sitemap otherwise needs separate Search Console ownership evidence.
  const publicBrand = hostname.endsWith('.bentechsolutions.be')
    ? brandSubdomainMap[hostname.split('.')[0]]?.slice(1) : null;
  if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt') {
    const canonicalHost = publicBrand ? `${publicBrand}.bentechsolutions.be` : 'bentechsolutions.be';
    if (url.pathname === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\nSitemap: https://${canonicalHost}/sitemap.xml\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
    const paths = publicBrand ? ['/'] : ['/', '/elektrische-installaties/', '/over-ons/'];
    const urls = paths.map(path => `<url><loc>https://${canonicalHost}${path}</loc><lastmod>2026-10-13</lastmod></url>`).join('');
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
  }

  // Skip asset files and existing static files
  const isAsset = url.pathname.startsWith('/assets/') ||
                  url.pathname === '/favicon.ico' ||
                  url.pathname === '/site.webmanifest' ||
                  url.pathname === '/style.css' ||
                  url.pathname === '/service-pages.css' ||
                  url.pathname === '/brand-themes.css' ||
                  url.pathname === '/consent.js' ||
                  url.pathname === '/main.js' ||
                  url.pathname === '/brand-vanta.js' ||
                  url.pathname.endsWith('.js') ||
                  url.pathname.endsWith('.css') ||
                  url.pathname.endsWith('.svg') ||
                  url.pathname.endsWith('.png') ||
                  url.pathname.endsWith('.webp') ||
                  url.pathname.endsWith('.jpg') ||
                  url.pathname.endsWith('.jpeg') ||
                  url.pathname.endsWith('.woff2') ||
                  url.pathname === '/robots.txt' ||
                  url.pathname === '/sitemap.xml' ||
                  url.pathname === '/_headers';

  if (isAsset) {
    return context.next();
  }

  // Detect subdomain prefix
  const parts = hostname.split('.');
  let subdomain = null;

  // e.g. klimaatplus.bentechsolutions.be (parts: ['klimaatplus', 'bentechsolutions', 'be'])
  // or klimaatplus.bentech-solutions.pages.dev
  if (parts.length >= 3) {
    // Exclude 'www' and apex
    if (parts[0] !== 'www') {
      subdomain = parts[0];
    }
  }

  // Handle apex & www legacy redirects to dedicated subdomains
  if (!subdomain) {
    const cleanPath = url.pathname.replace(/\/+$/, '') || '/';
    const legacyRedirects = {
      '/laadpalen': 'https://laadplus.bentechsolutions.be/',
      '/thuisbatterijen': 'https://batteryplus.bentechsolutions.be/',
      '/zonnepanelen': 'https://solarplus.bentechsolutions.be/',
      '/klimaatplus': 'https://klimaatplus.bentechsolutions.be/',
      '/batteryplus': 'https://batteryplus.bentechsolutions.be/',
      '/laadplus': 'https://laadplus.bentechsolutions.be/',
      '/serviceplus': 'https://serviceplus.bentechsolutions.be/',
      '/solarplus': 'https://solarplus.bentechsolutions.be/'
    };

    for (const [prefix, dest] of Object.entries(legacyRedirects)) {
      if (cleanPath === prefix || cleanPath.startsWith(prefix + '/')) {
        return Response.redirect(dest, 301);
      }
    }
  }

  // Handle subdomain routing
  if (subdomain && brandSubdomainMap[subdomain]) {
    const targetFolder = brandSubdomainMap[subdomain];

    // If root request or nested page inside subdomain
    if (url.pathname === '/' || url.pathname === '') {
      const rewrittenUrl = new URL(`${targetFolder}/index.html`, url);
      return context.env.ASSETS.fetch(rewrittenUrl);
    }

    if (!url.pathname.startsWith(targetFolder)) {
      const rewrittenUrl = new URL(`${targetFolder}${url.pathname}`, url);
      return context.env.ASSETS.fetch(rewrittenUrl);
    }
  }

  return context.next();
}

/**
 * Cloudflare Pages Functions Edge Router
 * Routes subdomains (e.g. klimaatplus.bentechsolutions.be) to their dedicated division folder (/klimaatplus/)
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

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

  // Skip asset files and existing static files
  const isAsset = url.pathname.startsWith('/assets/') ||
                  url.pathname === '/favicon.ico' ||
                  url.pathname === '/site.webmanifest' ||
                  url.pathname === '/style.css' ||
                  url.pathname === '/service-pages.css' ||
                  url.pathname === '/brand-themes.css' ||
                  url.pathname === '/consent.js' ||
                  url.pathname === '/main.js' ||
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

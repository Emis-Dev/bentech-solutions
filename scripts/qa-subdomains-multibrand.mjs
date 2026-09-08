import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const brands = [
  {
    name: 'KlimaatPlus',
    subdomain: 'klimaatplus',
    path: 'klimaatplus/index.html',
    expectedUrl: 'https://klimaatplus.bentechsolutions.be/',
    themeClass: 'theme-klimaatplus',
    h1Keyphrase: 'binnenklimaat',
    schemaType: 'HVACBusiness'
  },
  {
    name: 'BatteryPlus',
    subdomain: 'batteryplus',
    path: 'batteryplus/index.html',
    expectedUrl: 'https://batteryplus.bentechsolutions.be/',
    themeClass: 'theme-batteryplus',
    h1Keyphrase: 'energie, slim opgeslagen',
    schemaType: 'Electrician'
  },
  {
    name: 'LaadPlus',
    subdomain: 'laadplus',
    path: 'laadplus/index.html',
    expectedUrl: 'https://laadplus.bentechsolutions.be/',
    themeClass: 'theme-laadplus',
    h1Keyphrase: 'Elektrisch rijden',
    schemaType: 'Electrician'
  },
  {
    name: 'ServicePlus',
    subdomain: 'serviceplus',
    path: 'serviceplus/index.html',
    expectedUrl: 'https://serviceplus.bentechsolutions.be/',
    themeClass: 'theme-serviceplus',
    h1Keyphrase: 'Storingen opgelost',
    schemaType: 'EmergencyService'
  },
  {
    name: 'SolarPlus',
    subdomain: 'solarplus',
    path: 'solarplus/index.html',
    expectedUrl: 'https://solarplus.bentechsolutions.be/',
    themeClass: 'theme-solarplus',
    h1Keyphrase: 'begint bij de zon',
    schemaType: 'Electrician'
  }
];

// 1. Verify Brand Landing Pages
for (const brand of brands) {
  const html = read(brand.path);
  
  // Canonical URL
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegex(brand.expectedUrl)}">`), `${brand.name}: canonical URL incorrect`);
  assert.match(html, new RegExp(`property="og:url" content="${escapeRegex(brand.expectedUrl)}"`), `${brand.name}: og:url incorrect`);
  
  // Theme class
  assert.match(html, new RegExp(`class="[^"]*${brand.themeClass}[^"]*"`), `${brand.name}: missing theme class ${brand.themeClass}`);
  
  // Brand logo asset
  const logoPath = `assets/brands/${brand.subdomain}/logo.png`;
  assert.ok(existsSync(resolve(repoRoot, logoPath)), `${brand.name}: logo missing at ${logoPath}`);
  assert.match(html, new RegExp(`src="/assets/brands/${brand.subdomain}/logo\\.png"`), `${brand.name}: html missing brand logo reference`);

  // Schema type
  assert.match(html, new RegExp(`"@type":\\s*"${brand.schemaType}"`), `${brand.name}: schema.org missing type ${brand.schemaType}`);

  // Navigation strip to all brands
  assert.match(html, /class="divisions-nav-strip"/, `${brand.name}: missing cross-division navigation strip`);
  for (const b of brands) {
    assert.match(html, new RegExp(`href="https://${b.subdomain}\\.bentechsolutions\\.be"`), `${brand.name}: missing link to sibling division ${b.name}`);
  }
  
  // Form presence with brand tag and WhatsApp handler
  assert.match(html, new RegExp(`name="brand" value="${brand.name}`), `${brand.name}: form missing brand identification input`);
  assert.doesNotMatch(html, /formspree\.io/, `${brand.name}: must NOT contain dummy formspree.io endpoint`);
  assert.match(html, /onsubmit="handleBrandFormSubmit\(event,/, `${brand.name}: missing handleBrandFormSubmit handler`);

  // Mobile Sticky Bar
  assert.match(html, /class="mobile-sticky-bar"/, `${brand.name}: missing mobile-sticky-bar`);
  assert.match(html, /href="tel:\+32486328645"/, `${brand.name}: mobile-sticky-bar missing telephone link`);
  assert.match(html, /href="https:\/\/wa\.me\/32486328645/, `${brand.name}: mobile-sticky-bar missing WhatsApp link`);

  // Google Consent Mode v2 elements
  assert.match(html, /id="marketingConsentBanner"/, `${brand.name}: missing marketingConsentBanner element`);
  assert.match(html, /id="acceptMarketingConsent"/, `${brand.name}: missing acceptMarketingConsent button`);
  assert.match(html, /id="rejectMarketingConsent"/, `${brand.name}: missing rejectMarketingConsent button`);
  assert.match(html, /id="manageMarketingConsent"/, `${brand.name}: missing manageMarketingConsent footer button`);

  // Legal & Web Credit
  assert.match(html, /1025\.714\.523/, `${brand.name}: missing VAT number in footer`);
  assert.match(html, /web\.tom\.cool/, `${brand.name}: missing web.tom.cool credit in footer`);

  // Mobile hamburger animation class
  assert.match(html, /is-active/, `${brand.name}: script missing is-active toggle for hamburger animation`);

  // Zero broken nav anchors
  const navMatch = html.match(/<nav class="main-nav"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(navMatch, `${brand.name}: missing main-nav`);
  const navAnchors = [...navMatch[1].matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  for (const anchor of navAnchors) {
    assert.ok(html.includes(`id="${anchor}"`), `${brand.name}: broken anchor #${anchor} has no matching id in DOM`);
  }
}

// 2. Verify Cloudflare Edge Router
const router = read('functions/[[path]].js');
for (const brand of brands) {
  assert.match(router, new RegExp(`'${brand.subdomain}':\\s*'/(${brand.subdomain})'`), `functions/[[path]].js missing mapping for ${brand.subdomain}`);
}

// 3. Verify Design Themes Stylesheet
const themesCss = read('brand-themes.css');
for (const brand of brands) {
  assert.match(themesCss, new RegExp(`\\.${brand.themeClass}`), `brand-themes.css missing styles for ${brand.themeClass}`);
}

// 4. Verify Sitemap
const sitemap = read('sitemap.xml');
for (const brand of brands) {
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(brand.expectedUrl)}</loc>`), `sitemap.xml missing ${brand.expectedUrl}`);
}

console.log('Subdomains & Multi-Brand contract OK: all 5 divisions verified with exact brand subdomains, logos, themes and edge router.');

function read(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  assert.ok(existsSync(absolutePath), `Missing file: ${relativePath}`);
  return readFileSync(absolutePath, 'utf8');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
  
  // Form presence with brand tag
  assert.match(html, new RegExp(`name="brand" value="${brand.name}`), `${brand.name}: form missing brand identification input`);
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

import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const homepage = read('index.html');
const routes = [
  {
    path: 'laadpalen/index.html',
    route: '/laadpalen/',
    canonicalUrl: 'https://laadplus.bentechsolutions.be/',
    subdomain: 'laadplus',
    title: 'Laadpaal installeren in Antwerpen | BenTech Solutions',
    h1: 'Laadpalen voor thuis en op het werk',
    service: 'Laadpaal'
  },
  {
    path: 'thuisbatterijen/index.html',
    route: '/thuisbatterijen/',
    canonicalUrl: 'https://batteryplus.bentechsolutions.be/',
    subdomain: 'batteryplus',
    title: 'Thuisbatterij in Antwerpen | BenTech Solutions',
    h1: 'Een thuisbatterij afgestemd op uw verbruik',
    service: 'Thuisbatterij'
  },
  {
    path: 'zonnepanelen/index.html',
    route: '/zonnepanelen/',
    canonicalUrl: 'https://solarplus.bentechsolutions.be/',
    subdomain: 'solarplus',
    title: 'Zonnepanelen in Antwerpen | BenTech Solutions',
    h1: 'Zonnepanelen voor uw woning of onderneming',
    service: 'Zonnepanelen'
  }
];

const titles = new Set();
const canonicals = new Set();
const headings = new Set();

for (const page of routes) {
  const html = read(page.path);
  const title = capture(html, /<title>([^<]+)<\/title>/, `${page.path}: title`);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/, `${page.path}: meta description`);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/, `${page.path}: canonical`);
  const ogUrl = capture(html, /<meta\s+property="og:url"\s+content="([^"]+)"/, `${page.path}: og:url`);
  const h1 = stripTags(capture(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, `${page.path}: h1`));

  assert.equal(title, page.title, `${page.path}: unexpected title`);
  assert.ok(description.length >= 90 && description.length <= 165, `${page.path}: description should be concise and useful`);
  assert.equal(canonical, page.canonicalUrl, `${page.path}: canonical must redirect to subdomain`);
  assert.equal(ogUrl, page.canonicalUrl, `${page.path}: og:url must redirect to subdomain`);
  assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0; url=${escapeRegex(page.canonicalUrl)}">`), `${page.path}: missing instant refresh`);
  assert.match(html, new RegExp(`window\\.location\\.replace\\("${escapeRegex(page.canonicalUrl)}"\\);`), `${page.path}: missing JS redirect fallback`);
  assert.equal(h1, page.h1, `${page.path}: unexpected H1`);
  assert.doesNotMatch(html, /id="home"/, `${page.path}: service pages must not activate the Vanta homepage runtime`);
  assert.doesNotMatch(html, /(?:src|href)="(?:assets|style\.css|service-pages\.css|main\.js|consent\.js)/, `${page.path}: nested routes need root-relative local assets`);

  // Verify that destination subdomain contains the merged rich content & FAQ
  const subHtml = read(`${page.subdomain}/index.html`);
  assert.match(subHtml, /id="faq"/, `${page.subdomain}: missing merged FAQ accordion`);
  assert.match(subHtml, /id="werkwijze"|id="werking"/, `${page.subdomain}: missing process steps`);

  titles.add(title);
  canonicals.add(canonical);
  headings.add(h1);
}

// Check Cloudflare Edge Router redirects
const router = read('functions/[[path]].js');
for (const page of routes) {
  assert.match(router, new RegExp(`'${page.route.replace(/\/$/, '')}':\\s*'${escapeRegex(page.canonicalUrl)}'`), `router missing 301 redirect for ${page.route}`);
}

// Homepage navigation checks: no parentheses in brand names, no duplicate links
assert.doesNotMatch(homepage, /KlimaatPlus\s*\([^)]+\)|BatteryPlus\s*\([^)]+\)|LaadPlus\s*\([^)]+\)|ServicePlus\s*\([^)]+\)|SolarPlus\s*\([^)]+\)/, 'homepage must NOT have parentheses in brand links');
assert.doesNotMatch(homepage, /Laadpalen Gids|Thuisbatterijen Gids|Zonnepanelen Gids/, 'homepage must NOT have redundant guide links in dropdown');
assert.match(homepage, /style\.css\?v=site-clarity-20260905/, 'homepage must use the current base stylesheet version');
assert.match(homepage, /main\.js\?v=site-clarity-20260905/, 'homepage must use the current shared JavaScript version');
assert.match(homepage, /Antwerpen en omgeving/, 'homepage must communicate the current work area');

const robots = read('robots.txt');
assert.match(robots, /^User-agent: \*$/m);
assert.match(robots, /^Allow: \/$/m);
assert.match(robots, /^Sitemap: https:\/\/bentechsolutions\.be\/sitemap\.xml$/m);

const sitemap = read('sitemap.xml');
assert.match(sitemap, /<loc>https:\/\/bentechsolutions\.be\/<\/loc>/);
for (const page of routes) {
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(page.canonicalUrl)}</loc>`), `sitemap missing ${page.canonicalUrl}`);
  assert.doesNotMatch(sitemap, new RegExp(`<loc>https://bentechsolutions\\.be${escapeRegex(page.route)}</loc>`), `sitemap must NOT contain redirected legacy URL ${page.route}`);
}

console.log('Service route & subdomain consolidation contract OK: 301 edge redirects, canonical subdomains, zero parentheses, and merged content.');

function read(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  assert.ok(existsSync(absolutePath), `Missing file: ${relativePath}`);
  return readFileSync(absolutePath, 'utf8');
}

function capture(value, pattern, label) {
  const match = value.match(pattern);
  assert.ok(match, `Missing ${label}`);
  return match[1].trim();
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertLocalReferencesExist(html, sourcePath) {
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(match => match[1]);
  for (const reference of refs) {
    const pathname = reference.split(/[?#]/, 1)[0];
    if (!pathname) continue;

    const relativePath = pathname.replace(/^\//, '');
    const resolvedTarget = pathname === '/'
      ? resolve(repoRoot, 'index.html')
      : pathname.endsWith('/')
        ? resolve(repoRoot, relativePath, 'index.html')
        : resolve(repoRoot, relativePath);
    assert.ok(existsSync(resolvedTarget), `${sourcePath}: broken local reference ${reference}`);
    assert.ok(statSync(resolvedTarget).isFile(), `${sourcePath}: local reference is not a file ${reference}`);
  }
}

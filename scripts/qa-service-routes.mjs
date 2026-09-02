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
    title: 'Laadpaal installeren in Antwerpen | BenTech Solutions',
    h1: 'Laadpalen voor thuis en op het werk',
    service: 'Laadpaal'
  },
  {
    path: 'thuisbatterijen/index.html',
    route: '/thuisbatterijen/',
    title: 'Thuisbatterij in Antwerpen | BenTech Solutions',
    h1: 'Een thuisbatterij afgestemd op uw verbruik',
    service: 'Thuisbatterij'
  },
  {
    path: 'zonnepanelen/index.html',
    route: '/zonnepanelen/',
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
  const expectedUrl = `https://bentechsolutions.be${page.route}`;
  const title = capture(html, /<title>([^<]+)<\/title>/, `${page.path}: title`);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/, `${page.path}: meta description`);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/, `${page.path}: canonical`);
  const ogUrl = capture(html, /<meta\s+property="og:url"\s+content="([^"]+)"/, `${page.path}: og:url`);
  const h1 = stripTags(capture(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, `${page.path}: h1`));

  assert.equal(title, page.title, `${page.path}: unexpected title`);
  assert.ok(description.length >= 90 && description.length <= 165, `${page.path}: description should be concise and useful`);
  assert.equal(canonical, expectedUrl, `${page.path}: canonical must match the route`);
  assert.equal(ogUrl, expectedUrl, `${page.path}: og:url must match the route`);
  assert.equal(h1, page.h1, `${page.path}: unexpected H1`);
  assert.doesNotMatch(html, /id="home"/, `${page.path}: service pages must not activate the Vanta homepage runtime`);
  assert.doesNotMatch(html, /(?:src|href)="(?:assets|style\.css|service-pages\.css|main\.js|consent\.js)/, `${page.path}: nested routes need root-relative local assets`);
  assert.match(html, /<script src="\/consent\.js\?v=googleads-call-20260819"><\/script>/, `${page.path}: consent loader missing`);
  assert.match(html, /<link rel="stylesheet" href="\/style\.css\?v=review-hero-20260902">/, `${page.path}: current base stylesheet missing`);
  assert.match(html, /<link rel="stylesheet" href="\/service-pages\.css\?v=energy-pages-20260902">/, `${page.path}: service stylesheet missing`);
  assert.match(html, /<script src="\/main\.js\?v=review-hero-20260902"><\/script>/, `${page.path}: current shared JavaScript missing`);
  assert.match(html, /href="tel:\+32486328645"/, `${page.path}: telephone CTA missing`);
  assert.match(html, /id="marketingConsentBanner"/, `${page.path}: consent banner missing`);
  assert.match(html, /id="acceptMarketingConsent"/, `${page.path}: consent accept action missing`);
  assert.match(html, /id="rejectMarketingConsent"/, `${page.path}: consent reject action missing`);
  assert.match(html, /id="manageMarketingConsent"/, `${page.path}: consent settings action missing`);
  assert.match(html, /onsubmit="handleFormSubmit\(event, 'offerte'\)"/, `${page.path}: WhatsApp quote handler missing`);
  for (const id of ['q-name', 'q-phone', 'q-email', 'q-service', 'q-details']) {
    assert.match(html, new RegExp(`id="${id}"`), `${page.path}: form field #${id} missing`);
  }
  assert.match(html, new RegExp(`<option value="${page.service}" selected>`), `${page.path}: service selection is not preselected`);
  assert.match(html, /Antwerpen en omgeving binnen 60 km/, `${page.path}: current work area missing`);
  assertLocalReferencesExist(html, page.path);

  titles.add(title);
  canonicals.add(canonical);
  headings.add(h1);
}

assert.equal(titles.size, routes.length, 'service-page titles must be unique');
assert.equal(canonicals.size, routes.length, 'service-page canonicals must be unique');
assert.equal(headings.size, routes.length, 'service-page H1 headings must be unique');

for (const page of routes) {
  assert.match(homepage, new RegExp(`href="${escapeRegex(page.route)}"`), `homepage must link to ${page.route}`);
}
assert.doesNotMatch(homepage, /id="dienst-(?:laadpalen|thuisbatterijen|zonnepanelen)"[^>]+data-service-link/, 'energy cards must navigate to dedicated pages');
assert.match(homepage, /style\.css\?v=review-hero-20260902/, 'homepage must use the current base stylesheet version');
assert.match(homepage, /main\.js\?v=review-hero-20260902/, 'homepage must use the current shared JavaScript version');
assert.match(homepage, /Antwerpen en omgeving/, 'homepage must communicate the current work area');

const robots = read('robots.txt');
assert.match(robots, /^User-agent: \*$/m);
assert.match(robots, /^Allow: \/$/m);
assert.match(robots, /^Sitemap: https:\/\/bentechsolutions\.be\/sitemap\.xml$/m);

const sitemap = read('sitemap.xml');
for (const route of ['/', ...routes.map(page => page.route)]) {
  assert.match(sitemap, new RegExp(`<loc>https://bentechsolutions\\.be${escapeRegex(route)}</loc>`), `sitemap missing ${route}`);
}

console.log('Service route contract OK: three distinct pages, valid internal assets, forms, consent, SEO and discovery files.');

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

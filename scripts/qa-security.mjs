import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { onRequest } from '../functions/[[path]].js';

const expected = {
  'Content-Security-Policy': "base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'",
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-Permitted-Cross-Domain-Policies': 'none'
};
const request = url => onRequest({
  request: new Request(url),
  env: { ASSETS: { fetch: url => new Response(`asset:${new URL(url).pathname}`) } },
  next: () => new Response('static')
});
const headers = await readFile(new URL('../_headers', import.meta.url), 'utf8');
for (const [name, value] of Object.entries(expected)) assert.ok(headers.includes(`  ${name}: ${value}`), name);

for (const host of ['bentechsolutions.be', 'www.bentechsolutions.be', 'bentech-solutions.pages.dev', 'restore.bentech-solutions.pages.dev', ...['klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus'].map(brand => `${brand}.bentechsolutions.be`)]) {
  for (const path of ['/', '/style.css', '/robots.txt', '/sitemap.xml', '/zonnepanelen/', '/scripts/qa-security.mjs', '/%ZZ', '/test/']) {
    const response = await request(`https://${host}${path}`);
    for (const [name, value] of Object.entries(expected)) assert.equal(response.headers.get(name), value, `${host}${path}: ${name}`);
    const noindex = host.endsWith('.pages.dev') || path === '/test/';
    assert.equal(response.headers.get('X-Robots-Tag'), noindex ? 'noindex, follow' : null, `${host}${path}: indexing`);
  }
}
for (const path of ['/.git/config', '/%2eimpeccable/config.json', '/x%2f..%2f.impeccable/config.json', '/README.md', '/PRODUCT.md', '/DESIGN.md', '/scripts/qa-security.mjs', '/scratch/build_logos.py', '/assets/automation/hero.webp.json', '/test/', '/test/index.html', '/fotocredits/', '/privacy/']) {
  assert.equal((await request(`https://bentechsolutions.be${path}`)).status, 404, path);
}
assert.equal((await request('https://bentechsolutions.be/%ZZ')).status, 400);
for (const brand of ['klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus']) {
  assert.equal(await (await request(`https://${brand}.bentechsolutions.be/`)).text(), `asset:/${brand}/index.html`);
}
console.log('PASS: restored brand routes keep response hardening; development paths and retired automation pages stay blocked; Pages origins stay noindex.');

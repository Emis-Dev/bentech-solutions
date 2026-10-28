import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SECURITY_HEADERS, onRequest } from '../functions/[[path]].js';

const expectedSecurityHeaders = {
  'Content-Security-Policy': "base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'",
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-Permitted-Cross-Domain-Policies': 'none'
};

assert.deepEqual(SECURITY_HEADERS, expectedSecurityHeaders);
const headerFile = await readFile(new URL('../_headers', import.meta.url), 'utf8');
for (const [name, value] of Object.entries(expectedSecurityHeaders)) {
  assert.ok(headerFile.split(/\r?\n/).includes(`  ${name}: ${value}`), name);
}

const request = url => onRequest({ request: new Request(url), env: { ASSETS: { fetch: () => new Response('old division') } }, next: () => new Response('static') });
const assertSecurityHeaders = (response, noindex = false) => {
  for (const [name, value] of Object.entries(expectedSecurityHeaders)) {
    assert.equal(response.headers.get(name), value, name);
  }
  assert.equal(response.headers.get('X-Robots-Tag'), noindex ? 'noindex, follow' : null, 'X-Robots-Tag');
};
const aliases = ['klimaatplus', 'klimaat', 'airco', 'warmtepomp', 'batteryplus', 'chargeplus', 'batterij', 'thuisbatterij', 'thuisbatterijen', 'laadplus', 'laadpaal', 'laadpalen', 'serviceplus', 'service', 'storing', 'storingen', 'spoed', 'solarplus', 'solar', 'zonnepanelen'];
for (const name of aliases) {
  const r = await request(`https://${name}.bentechsolutions.be/oud?bron=google`);
  assert.equal(r.status, 301, name);
  assert.equal(r.headers.get('location'), 'https://bentechsolutions.be/?bron=google#diensten', name);
  assertSecurityHeaders(r);
}
for (const path of ['elektrische-installaties', 'over-ons', 'klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus', 'laadpalen', 'thuisbatterijen', 'zonnepanelen']) {
  for (const suffix of ['', '/', '/index.html', '/oud']) {
    const r = await request(`https://bentechsolutions.be/${path}${suffix}?bron=old`);
    assert.equal(r.status, 301);
    assert.equal(r.headers.get('location'), 'https://bentechsolutions.be/?bron=old#diensten');
    assertSecurityHeaders(r);
  }
}
const www = await request('https://www.bentechsolutions.be/privacy/?a=1');
assert.equal(www.headers.get('location'), 'https://bentechsolutions.be/privacy/?a=1');
assertSecurityHeaders(www);
const malformed = await request('https://bentechsolutions.be/%ZZ');
assert.equal(malformed.status, 400);
assertSecurityHeaders(malformed);
for (const path of ['/.impeccable/surfaces/automation.md', '/%2eimpeccable/surfaces/automation.md', '//.impeccable/config.json', '/x%2f..%2f.impeccable/config.json', '/.git/config', '/PRODUCT.md', '/DESIGN.md', '/README.md', '/scripts/qa-content.mjs', '/scratch/build_logos.py', '/assets/automation/hero.webp.json']) {
  const blocked = await request(`https://bentechsolutions.be${path}`);
  assert.equal(blocked.status, 404, path);
  assertSecurityHeaders(blocked);
}
for (const host of ['bentechsolutions.be', 'bentech-solutions.pages.dev', 'feature.bentech-solutions.pages.dev', 'localhost']) {
  const noindex = host.endsWith('.pages.dev');
  for (const path of ['/', '/automation.css', '/assets/automation/hero.webp', '/privacy/', '/unknown/']) {
    const response = await request(`https://${host}${path}`);
    assert.equal(await response.text(), 'static');
    assertSecurityHeaders(response, noindex);
  }
  const sitemapResponse = await request(`https://${host}/sitemap.xml`);
  assertSecurityHeaders(sitemapResponse, noindex);
  const xml = await sitemapResponse.text();
  assert.match(xml, /https:\/\/bentechsolutions.be\/privacy\//);
  assert.doesNotMatch(xml, /solarplus|elektrische-installaties|pages.dev/);
  const robotsResponse = await request(`https://${host}/robots.txt`);
  assertSecurityHeaders(robotsResponse, noindex);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/bentechsolutions.be\/sitemap.xml/);
}
const testPage = await request('https://bentechsolutions.be/test/');
assertSecurityHeaders(testPage, true);
console.log('PASS: 60 retired entry points redirect, www canonical, previews/assets/404 pass through, sitemap current and all responses hardened.');

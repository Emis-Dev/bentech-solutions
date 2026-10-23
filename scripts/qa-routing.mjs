import assert from 'node:assert/strict';
import { onRequest } from '../functions/[[path]].js';

const request = url => onRequest({ request: new Request(url), env: { ASSETS: { fetch: () => new Response('old division') } }, next: () => new Response('static') });
const aliases = ['klimaatplus', 'klimaat', 'airco', 'warmtepomp', 'batteryplus', 'chargeplus', 'batterij', 'thuisbatterij', 'thuisbatterijen', 'laadplus', 'laadpaal', 'laadpalen', 'serviceplus', 'service', 'storing', 'storingen', 'spoed', 'solarplus', 'solar', 'zonnepanelen'];
for (const name of aliases) {
  const r = await request(`https://${name}.bentechsolutions.be/oud?bron=google`);
  assert.equal(r.status, 301, name);
  assert.equal(r.headers.get('location'), 'https://bentechsolutions.be/?bron=google#diensten', name);
}
for (const path of ['elektrische-installaties', 'over-ons', 'klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus', 'laadpalen', 'thuisbatterijen', 'zonnepanelen']) {
  for (const suffix of ['', '/', '/index.html', '/oud']) {
    const r = await request(`https://bentechsolutions.be/${path}${suffix}?bron=old`);
    assert.equal(r.status, 301);
    assert.equal(r.headers.get('location'), 'https://bentechsolutions.be/?bron=old#diensten');
  }
}
const www = await request('https://www.bentechsolutions.be/privacy/?a=1');
assert.equal(www.headers.get('location'), 'https://bentechsolutions.be/privacy/?a=1');
for (const path of ['/.impeccable/surfaces/automation.md', '/%2eimpeccable/surfaces/automation.md', '//.impeccable/config.json', '/x%2f..%2f.impeccable/config.json', '/.git/config', '/PRODUCT.md', '/DESIGN.md', '/README.md', '/scripts/qa-content.mjs', '/scratch/build_logos.py', '/assets/automation/hero.webp.json']) {
  assert.equal((await request(`https://bentechsolutions.be${path}`)).status, 404, path);
}
for (const host of ['bentechsolutions.be', 'bentech-solutions.pages.dev', 'feature.bentech-solutions.pages.dev', 'localhost']) {
  for (const path of ['/', '/automation.css', '/assets/automation/hero.webp', '/privacy/', '/unknown/']) {
    assert.equal(await (await request(`https://${host}${path}`)).text(), 'static');
  }
  const xml = await (await request(`https://${host}/sitemap.xml`)).text();
  assert.match(xml, /https:\/\/bentechsolutions.be\/privacy\//);
  assert.doesNotMatch(xml, /solarplus|elektrische-installaties|pages.dev/);
  assert.match(await (await request(`https://${host}/robots.txt`)).text(), /Sitemap: https:\/\/bentechsolutions.be\/sitemap.xml/);
}
console.log('PASS: 60 retired entry points redirect, www canonical, previews/assets/404 pass through, sitemap current.');

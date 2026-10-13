import assert from 'node:assert/strict';
import { onRequest } from '../functions/[[path]].js';

const request = (url) => onRequest({
  request: new Request(url),
  env: { ASSETS: { fetch: url => new Response(String(url)) } },
  next: () => new Response('next')
});

const redirect = await request('https://www.bentechsolutions.be/over-ons/?bron=google');
assert.equal(redirect.status, 301);
assert.equal(redirect.headers.get('Location'), 'https://bentechsolutions.be/over-ons/?bron=google');
for (const host of ['bentechsolutions.be', ...['klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus'].map(b => `${b}.bentechsolutions.be`)]) {
  const response = await request(`https://${host}/sitemap.xml`);
  assert.match(response.headers.get('Content-Type'), /application\/xml/);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, host === 'bentechsolutions.be' ? 3 : 1);
  assert.ok(urls.every(url => new URL(url).hostname === host));
  const robots = await request(`https://${host}/robots.txt`);
  assert.match(await robots.text(), new RegExp(`Sitemap: https://${host.replaceAll('.', '\\.')}/sitemap.xml`));
  if (host !== 'bentechsolutions.be') {
    const routed = await request(`https://${host}/`);
    assert.equal(new URL(await routed.text()).pathname, `/${host.split('.')[0]}/index.html`);
  }
}
const legacy = await request('https://bentechsolutions.be/zonnepanelen/');
assert.equal(legacy.status, 301);
assert.equal(legacy.headers.get('Location'), 'https://solarplus.bentechsolutions.be/');
console.log('Canonical hosts OK: www preserves path/query, six host-scoped sitemaps and five division rewrites.');

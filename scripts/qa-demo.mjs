import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {pumpDecision, lightDecision} from '../test/logic.js';
import {onRequest} from '../functions/[[path]].js';
for (const previous of [false, true]) {
  assert.equal(pumpDecision(24, previous, false), true);
  assert.equal(pumpDecision(76, previous, false), false);
  for (const level of [25, 50, 75]) assert.equal(pumpDecision(level, previous, false), previous);
  for (const level of [0, 25, 50, 75, 100]) assert.equal(pumpDecision(level, previous, true), false);
}
assert.equal(pumpDecision(20, false, false), true, 'recovery at low level restarts the illustrative pump');
for (const [hour,on] of [[0,false],[17,false],[18,true],[22,true],[23,false]]) {
  assert.equal(lightDecision(hour, false), on);
  assert.equal(lightDecision(hour, true), true);
}
const html = await readFile('test/index.html','utf8');
assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
assert.match(html, /noindex,follow/);
assert.match(html, /canonical" href="https:\/\/bentechsolutions.be\/test\//);
assert.match(html, /niet verbonden met een PLC/);
assert.match(html, /id="demo-controls" disabled/);
assert.match(html, /id="mainNav"/);
assert.match(html, /id="marketingConsentBanner"/);
assert.doesNotMatch(html, /chatgpt.site|Tijdelijke proefpagina|Concept om de richting|Zara|factuur/);
for (const [,url] of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
  assert.ok((await stat('.'+url+(url.endsWith('/')?'index.html':''))).isFile(),url);
}
const request = url => onRequest({request:new Request(url), next:()=>new Response('static')});
for (const path of ['/test','/test/index.html']) {
  const res = await request('https://bentechsolutions.be'+path+'?voorbeeld=pomp');
  assert.equal(res.status,301);
  assert.equal(res.headers.get('location'),'https://bentechsolutions.be/test/?voorbeeld=pomp');
}
assert.equal(await (await request('https://bentechsolutions.be/test/')).text(),'static');
assert.doesNotMatch(await (await request('https://bentechsolutions.be/sitemap.xml')).text(), /\/test\//);
assert.match(await readFile('_headers','utf8'),/\/test\/\*\s+Cache-Control: no-cache\s+X-Robots-Tag: noindex, follow/);
console.log('PASS: pump hysteresis/boundaries/fault/recovery, light schedule/manual, first-party assets, native shell, noindex and canonical test routes.');

import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const html=await readFile('index.html','utf8');
for(const service of ['PLC-automatisering','Siemens LOGO!','Troubleshooting','Simulatie &amp; test','Oplevering']) assert.ok(html.includes(service),service);
assert.doesNotMatch(html,/met AI|24\/7|laadpaal|zonnepaneel|thuisbatterij|airco|klimaatplus|solarplus|hero-profile/i);
assert.match(html,/13 reviews op Google/);
assert.match(html,/4,9/);
assert.match(html,/Eduardo Bilterijst/);
assert.match(html,/niet specifiek over PLC- of LOGO!-programmering/);
for(const path of ['index.html','privacy/index.html','404.html']){
 const body=await readFile(path,'utf8');
 assert.equal([...body.matchAll(/<h1[ >]/g)].length,1,path);
 for(const [,url] of body.matchAll(/(?:src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
  if(url==='/'||url==='/privacy/') continue;
  assert.ok((await stat('.'+url)).isFile(),`${path}: ${url}`);
 }
 assert.ok(body.includes('manageMarketingConsent'));
 assert.ok(body.includes('marketingConsentBanner'));
 assert.ok(body.includes('lang="nl-BE"'));
}
const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(schema.telephone,'+32486328645');assert.equal(schema.hasOfferCatalog.itemListElement.length,3);
assert.equal(schema.aggregateRating,undefined,'No self-serving review rich-result claim');
assert.ok(html.includes('beelden tonen geen uitgevoerde klantprojecten'));
console.log('PASS: authorised services, sourced historical reviews, no former offers/AI claims, current schema and complete local references.');

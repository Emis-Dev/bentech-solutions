import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
assert.match(html, /class="portal-brands-section"\s+id="merken"/, 'index.html missing portal-brands-section');
assert.match(html, /bentech-solutions-gestapeld\.svg/, 'index.html missing bentech gestapeld logo');
assert.match(html, /klimaatplus-gestapeld\.svg/, 'index.html missing klimaatplus gestapeld logo');
assert.match(html, /batteryplus-gestapeld\.svg/, 'index.html missing batteryplus gestapeld logo');
assert.match(html, /laadplus-gestapeld\.svg/, 'index.html missing laadplus gestapeld logo');
assert.match(html, /serviceplus-gestapeld\.svg/, 'index.html missing serviceplus gestapeld logo');
assert.match(html, /solarplus-gestapeld\.svg/, 'index.html missing solarplus gestapeld logo');

for (const sub of ['klimaatplus', 'batteryplus', 'laadplus', 'serviceplus', 'solarplus']) {
  const subHtml = readFileSync(`${sub}/index.html`, 'utf8');
  assert.match(subHtml, /brand-vanta\.js/, `${sub} must include brand-vanta.js`);
}

const serviceHtml = readFileSync('serviceplus/index.html', 'utf8');
assert.match(serviceHtml, /id="diensten"/, 'ServicePlus must have diensten section');
assert.match(serviceHtml, /Zekeringkasten &amp; AREI-Keuring/, 'ServicePlus must cover zekeringkasten & AREI');

console.log('Brand Portal & Subdomain Vanta contract OK: all portal cards, migrated services, and Vanta scripts verified.');

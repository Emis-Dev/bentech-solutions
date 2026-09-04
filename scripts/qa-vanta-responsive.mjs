import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const javascript = readFileSync(new URL('../main.js', import.meta.url), 'utf8');

assert.doesNotMatch(html, /window\.THREE|vanta@latest|p5\.min\.js|vanta\.topology\.min\.js/);
assert.match(html, /<section class="lamp-hero-section" id="home">/);
assert.match(html, /<aside class="hero-review-showcase"\s+aria-labelledby="hero-review-title">/);
assert.doesNotMatch(html, /lamp-portrait-wrapper|lamp-portrait-circle|floating-badge|yassir-head-crop/);
assert.match(html, /main\.js\?v=site-clarity-20260905/);

assert.match(javascript, /VANTA_DESKTOP_QUERY = '\(min-width: 769px\) and \(hover: hover\) and \(pointer: fine\)'/);
assert.match(javascript, /p5\.js\/1\.1\.9\/p5\.min\.js/);
assert.match(javascript, /vanta@0\.5\.24\/dist\/vanta\.topology\.min\.js/);
assert.match(javascript, /if \(vantaEffect \|\| loadPromise \|\| !shouldRun\(\)\) return/);
assert.match(javascript, /desktopMedia\.matches && !reducedMotionMedia\.matches/);
assert.match(javascript, /vantaBasePrototype\.initThree = function\(\) \{\}/);
assert.doesNotMatch(javascript, /window\.THREE\s*=/);
assert.match(javascript, /mouseControls: true/);
assert.match(javascript, /touchControls: true/);
assert.match(javascript, /scaleMobile: 1\.00/);
assert.match(javascript, /color: 0x00c875/);
assert.match(javascript, /backgroundColor: 0x050a15/);

console.log('Vanta responsive contract OK: review hero keeps the pinned desktop effect and excludes the mobile runtime.');

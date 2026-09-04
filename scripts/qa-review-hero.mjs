import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const homepage = read('index.html');
const stylesheet = read('style.css');
const javascript = read('main.js');
const header = capture(
  homepage,
  /<header class="site-header">([\s\S]*?)<\/header>/,
  'homepage header'
);
const hero = capture(
  homepage,
  /<section class="lamp-hero-section" id="home">([\s\S]*?)<\/section>/,
  'homepage review hero'
);
const about = capture(
  homepage,
  /<section class="about-section" id="over">([\s\S]*?)<\/section>/,
  'homepage about section'
);
const visibleText = stripMarkup(homepage);
const mapsUrl = 'https://www.google.com/maps?cid=5783644159230400203';
const cacheVersion = 'site-clarity-20260905';
const carouselJavascript = capture(
  javascript,
  /function initReviewCarousel\(\) \{([\s\S]*?)\n\}\n\n\/\/ Scroll Reveal/,
  'review carousel JavaScript'
);

assert.match(header, /<a href="\/" class="brand-logo">\s*<img src="assets\/logo-horizontal\.svg"\s+alt="BenTech Solutions Logo"\s+class="logo-img">/, 'homepage header logo must remain the existing horizontal SVG');

// Snapshot verified against the official Google listing on 2 September 2026.
assert.match(hero, /<strong id="hero-review-title">4,9\/5 op Google<\/strong>/, 'hero must show the official 4,9 rating');
assert.match(hero, /12 van 13 zijn vijf sterren/, 'hero must show the official count and five-star distribution');
assert.match(homepage, /<span class="google-rating-score">4,9\/5<\/span>/, 'review section must use the official rating');
assert.match(homepage, /<span class="google-review-count">13 Google-reviews<\/span>/, 'review section must use the official count');

const mapsLinks = [...homepage.matchAll(/href="(https:\/\/www\.google\.com\/maps[^"]*)"/g)].map(match => match[1]);
assert.ok(mapsLinks.length >= 7, 'homepage must link every review proof point to the official Google listing');
assert.ok(mapsLinks.every(link => link === mapsUrl), 'all Google Maps review links must use the stable Maps CID URL');

for (const obsoleteReviewer of ['Youssef B.', 'Kevin De Smedt', 'Nathalie M.', 'Ahmed K.']) {
  assert.doesNotMatch(visibleText, new RegExp(escapeRegex(obsoleteReviewer), 'i'), `obsolete reviewer must be absent: ${obsoleteReviewer}`);
}
assert.doesNotMatch(visibleText, /\b5[.,]0(?:\s*\/\s*5)?\b/, 'homepage must not claim a 5.0 rating');

assert.match(hero, /<aside class="hero-review-showcase"\s+aria-labelledby="hero-review-title">/, 'hero review proof must be an aside');
assert.doesNotMatch(hero, /<img\b|hero-profile\.jpeg/, 'hero must not contain a profile photo or other raster image');
assert.match(about, /<img\s+[^>]*src="assets\/installateur-sfeerbeeld-20260904\.webp"[^>]*>/, 'About section must use the illustrative company image');

assert.match(hero, /data-review-carousel[^>]*role="region"[^>]*aria-roledescription="carrousel"/, 'hero proof rail must expose carousel region semantics');
assert.match(hero, /data-review-viewport[^>]*tabindex="0"/, 'review rail must be keyboard focusable');
assert.match(hero, /data-review-prev[^>]*aria-label="Vorige review"/, 'review rail needs an accessible previous action');
assert.match(hero, /data-review-next[^>]*aria-label="Volgende review"/, 'review rail needs an accessible next action');
assert.match(hero, /data-review-position[^>]*aria-live="polite">1 \/ 5<\/span>/, 'review rail must announce its position');

const reviewSlides = [...hero.matchAll(/<figure class="hero-review-slide" data-review-slide>[\s\S]*?<\/figure>/g)];
assert.equal(reviewSlides.length, 5, 'hero proof rail must contain exactly five real Google reviews');
const expectedSlideAuthors = ['Bouchra Abali', 'Eduardo Bilterijst', 'Ikram Ikram', 'Walid Milad', 'Jeanine Servaes'];
for (const [index, slide] of reviewSlides.entries()) {
  assert.match(slide[0], /<blockquote>[^<]+<\/blockquote>/, `review slide ${index + 1} must use blockquote semantics`);
  assert.match(slide[0], new RegExp(`<cite>${escapeRegex(expectedSlideAuthors[index])}<\\/cite>`), `review slide ${index + 1} must cite ${expectedSlideAuthors[index]}`);
}

assert.match(stylesheet, /\.hero-review-viewport\s*\{[\s\S]*?overflow-x:\s*auto;[\s\S]*?scroll-snap-type:\s*x mandatory;[\s\S]*?touch-action:\s*pan-x pan-y;[\s\S]*?\}/, 'review rail must support native horizontal swipe and snapping');
assert.match(stylesheet, /\.hero-review-slide\s*\{[\s\S]*?scroll-snap-align:\s*start;[\s\S]*?scroll-snap-stop:\s*always;[\s\S]*?\}/, 'each review slide must be a stable snap target');
assert.match(javascript, /initReviewCarousel\(\);/, 'review carousel must initialize');
assert.match(javascript, /function initReviewCarousel\(\)/, 'review carousel initializer must exist');
assert.match(javascript, /querySelectorAll\('\[data-review-carousel\]'\)/, 'carousel initializer must target the review rail');
assert.match(javascript, /previous\.addEventListener\('click',[\s\S]*?next\.addEventListener\('click'/, 'carousel buttons must move in both directions');
assert.match(javascript, /viewport\.addEventListener\('keydown',[\s\S]*?ArrowLeft[\s\S]*?ArrowRight/, 'carousel must support left and right arrow keys');
assert.match(javascript, /viewport\.addEventListener\('scroll',[\s\S]*?requestAnimationFrame\(updatePosition\)/, 'carousel must update its announced position after touch or pointer scrolling');
assert.doesNotMatch(carouselJavascript, /setInterval|setTimeout|autoplay/i, 'review carousel must not auto-advance');

const reviewCards = [...homepage.matchAll(/<a[^>]+class="review-card google-card-link"[\s\S]*?<\/a>/g)];
assert.equal(reviewCards.length, 4, 'homepage must feature exactly four attributed Google review cards');
for (const [index, card] of reviewCards.entries()) {
  assert.match(card[0], /<blockquote class="review-text">[\s\S]*?<\/blockquote>/, `review card ${index + 1} must use blockquote semantics`);
  assert.match(card[0], /<cite>[^<]+<\/cite>/, `review card ${index + 1} must identify its author with cite`);
}

const ogImage = capture(
  homepage,
  /<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/,
  'og:image'
);
assert.equal(ogImage, 'https://bentechsolutions.be/assets/og-bentech-reviews.png', 'homepage must reference the review-led OG image');
assert.match(homepage, /<meta\s+property="og:image:width"\s+content="1200"\s*\/?>/, 'OG width metadata must be 1200');
assert.match(homepage, /<meta\s+property="og:image:height"\s+content="630"\s*\/?>/, 'OG height metadata must be 630');
assert.match(homepage, /<meta\s+property="og:image:alt"\s+content="[^"]*4,9[^"]*13 Google-reviews[^"]*"\s*\/?>/, 'OG image needs an evidence-based accessible description');
assertPngDimensions('assets/og-bentech-reviews.png', 1200, 630);

for (const htmlPath of ['index.html', 'laadpalen/index.html', 'thuisbatterijen/index.html', 'zonnepanelen/index.html']) {
  const html = read(htmlPath);
  const prefix = htmlPath === 'index.html' ? '' : '/';
  assert.match(html, new RegExp(`href="${escapeRegex(prefix)}style\\.css\\?v=${cacheVersion}"`), `${htmlPath}: current stylesheet cache marker missing`);
  assert.match(html, new RegExp(`src="${escapeRegex(prefix)}main\\.js\\?v=${cacheVersion}"`), `${htmlPath}: current JavaScript cache marker missing`);
}

console.log('Review hero contract OK: official Google proof, attribution, semantics, profile-photo boundary, OG asset and cache markers verified.');

function read(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  assert.ok(existsSync(absolutePath), `Missing file: ${relativePath}`);
  return readFileSync(absolutePath, 'utf8');
}

function capture(value, pattern, label) {
  const match = value.match(pattern);
  assert.ok(match, `Missing ${label}`);
  return match[1];
}

function stripMarkup(value) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertPngDimensions(relativePath, expectedWidth, expectedHeight) {
  const absolutePath = resolve(repoRoot, relativePath);
  assert.ok(existsSync(absolutePath), `Missing file: ${relativePath}`);
  assert.ok(statSync(absolutePath).isFile(), `Not a file: ${relativePath}`);

  const png = readFileSync(absolutePath);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.ok(png.length >= 24 && png.subarray(0, 8).equals(signature), `${relativePath}: invalid PNG signature`);
  assert.equal(png.readUInt32BE(16), expectedWidth, `${relativePath}: unexpected width`);
  assert.equal(png.readUInt32BE(20), expectedHeight, `${relativePath}: unexpected height`);
}

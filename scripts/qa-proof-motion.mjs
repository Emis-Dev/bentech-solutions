import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BENTECH_QA_URL || 'http://127.0.0.1:8788';
const out = process.env.BENTECH_QA_OUT || '.impeccable/review/proof-motion';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const report = { base, checked: new Date().toISOString(), layouts: [], errors: [] };
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const google = [];
  await context.route(/googletagmanager\.com|google-analytics\.com|googleadservices\.com/, route => {
    google.push(route.request().url());
    return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
  });
  page.on('pageerror', error => report.errors.push(String(error)));
  for (const width of [3440, 1920, 1440, 1024, 768, 601, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    if (await page.locator('#rejectMarketingConsent').isVisible()) await page.click('#rejectMarketingConsent');
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => {
      const rect = selector => {
        const r = document.querySelector(selector).getBoundingClientRect();
        return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width };
      };
      return { width: innerWidth, scroll: document.documentElement.scrollWidth, container: rect('.hero-inner'), copy: rect('.hero-copy'), diagram: rect('.signal-console'), imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0) };
    });
    assert.ok(layout.scroll <= width, `Horizontal overflow at ${width}`);
    assert.ok(layout.imagesLoaded, `Broken image at ${width}`);
    assert.ok(Math.abs(layout.container.left - (width - layout.container.right)) < 1, `Off-centre content at ${width}`);
    const overlapX = Math.min(layout.copy.right, layout.diagram.right) - Math.max(layout.copy.left, layout.diagram.left);
    const overlapY = Math.min(layout.copy.bottom, layout.diagram.bottom) - Math.max(layout.copy.top, layout.diagram.top);
    assert.ok(overlapX <= 0 || overlapY <= 0, `Hero diagram overlaps copy at ${width}`);
    assert.equal(await page.locator('.reviews figure').count(), 3);
    for (const [name, id] of [['Eduardo Bilterijst', '100553341232241657035'], ['Ikram Ikram', '107903386264918098350'], ['Walid Milad', '113687130773219930831']]) {
      const figure = page.locator('.reviews figure').filter({ hasText: name });
      assert.equal(await figure.count(), 1);
      assert.ok((await figure.locator('a').getAttribute('href')).includes(id));
    }
    if ([1920, 1440, 768, 390, 320].includes(width)) {
      await page.screenshot({ path: `${out}/hero-${width}.png` });
      await page.locator('#ervaringen').screenshot({ path: `${out}/reviews-${width}.png` });
    }
    report.layouts.push(layout);
  }
  assert.equal(google.length, 0, 'Reviews must not embed Google or load marketing without consent');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'running');
  const picture = page.locator('.hero-picture');
  const transform = () => picture.evaluate(e => getComputedStyle(e).transform);
  const first = await transform();
  await page.waitForTimeout(500);
  assert.notEqual(await transform(), first, 'Hero photo must actually move');
  const flow = page.locator('.signal-input');
  const signal = () => flow.evaluate(e => getComputedStyle(e).strokeDashoffset);
  const signalBefore = await signal();
  await page.waitForTimeout(500);
  assert.notEqual(await signal(), signalBefore, 'Signal sequence must actually advance');
  const toggle = page.locator('#heroMotionToggle');
  await toggle.focus();
  await page.keyboard.press('Space');
  assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
  assert.match(await toggle.innerText(), /hervatten/);
  assert.equal(await picture.evaluate(e => getComputedStyle(e).animationPlayState), 'paused');
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const frozen = await transform();
  await page.waitForTimeout(300);
  assert.equal(await transform(), frozen, 'Pause freezes the photo');
  await page.locator('.hero-proof').click();
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'paused');
  assert.equal(new URL(page.url()).hash, '#ervaringen');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(200);
  assert.equal(await page.locator('#hero').getAttribute('data-motion'), 'paused', 'User pause survives scrolling');
  await toggle.click();
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'running');
  await page.locator('#ervaringen').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'paused');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'paused');
  assert.equal(await toggle.isVisible(), false);
  assert.equal(await picture.evaluate(e => getComputedStyle(e).animationName), 'none');
  assert.equal(await flow.evaluate(e => getComputedStyle(e).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => document.querySelector('#hero').dataset.motion === 'running');
  report.motion = { photoMoves: true, signalAdvances: true, keyboardPause: true, pauseSurvivesScrolling: true, offscreenPaused: true, reducedMotionAndChanges: true };
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage();
  await fallback.goto(base);
  assert.equal(await fallback.locator('#heroMotionToggle').isVisible(), false);
  assert.equal(await fallback.locator('.hero-picture').evaluate(e => getComputedStyle(e).animationName), 'none');
  assert.equal(await fallback.locator('.reviews figure').count(), 3);
  report.noScript = { staticHero: true, reviewsPresent: true, noDeadMotionControl: true };
  assert.deepEqual(report.errors, []);
  await writeFile(`${out}/proof-motion-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ base, layouts: report.layouts.length, motion: report.motion, noScript: report.noScript, errors: report.errors }));
} finally { await browser.close(); }

import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true, channel:'chrome'});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('http://127.0.0.1:8788/');
 await page.click('#rejectMarketingConsent');
 await page.locator('.service-grid [data-service-choice="LOGO!-domotica"]').click();
 assert.equal(await page.locator('#offerte').getAttribute('open'), '');
 assert.equal(await page.locator('#q-service').inputValue(),'LOGO!-domotica');
 console.log('PASS: service link opens quote form with the chosen service.');
} finally {await browser.close();}

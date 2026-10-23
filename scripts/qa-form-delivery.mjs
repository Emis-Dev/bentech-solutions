import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BENTECH_QA_URL||'http://127.0.0.1:8788';
const out=process.env.BENTECH_QA_OUT||'.impeccable/review/form-delivery';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const report={scope:'Mocked provider transport only. No activation or actual emails sent.',cases:[]};
try{
 for(const js of [true,false]){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width:390,height:844}});
  const page=await context.newPage();await page.emulateMedia({reducedMotion:'reduce'});const requests=[];
  await context.route('https://formsubmit.co/**',async route=>{
   requests.push({url:route.request().url(),method:route.request().method(),body:route.request().postData(),headers:route.request().headers()});
   await route.fulfill({status:200,contentType:'text/html',body:'<h1>MOCK — provider request intercepted; no email sent</h1>'});
  });
  await page.goto(base);
  if(js)await page.click('#rejectMarketingConsent');
  await page.locator('#offerte summary').click();
  assert.equal(await page.locator('#quoteForm').getAttribute('action'),'https://formsubmit.co/info@bentechsolutions.be');
  assert.equal(await page.locator('#quoteForm').getAttribute('method'),'post');
  assert.equal(await page.locator('#q-name').isEnabled(),true);
  await page.click('button[data-channel="server"]');assert.equal(requests.length,0,'Invalid forms cannot reach provider');
  await page.selectOption('#q-service','LOGO!-domotica');
  await page.fill('#q-name','QA <naam> & é');await page.fill('#q-email','qa@example.invalid');
  await page.fill('#q-details','TEST: niveau > 5 & pomp aan. Geen echte verzending.');
  assert.equal(await page.locator('[name="_captcha"][value="false"]').count(),0);
  assert.equal(await page.locator('[name="_autoresponse"]').count(),1);
  await page.locator('#offerte').screenshot({path:`${out}/form-${js?'js':'no-js'}-mobile.png`});
  await page.click('button[data-channel="server"]');await page.waitForURL('https://formsubmit.co/**');
  assert.equal(requests.length,1);assert.equal(requests[0].method,'POST');
  assert.equal(new URL(requests[0].url).search,'','No personal data in URL');
  const data=new URLSearchParams(requests[0].body);
  assert.equal(data.get('name'),'QA <naam> & é');assert.equal(data.get('email'),'qa@example.invalid');
  assert.ok(data.get('_autoresponse').includes('kopie'));assert.equal(data.get('_next'),'https://bentechsolutions.be/bedankt/');
  assert.equal(data.get('_honey'),'');assert.notEqual(data.get('_captcha'),'false');
  assert.ok(!requests[0].headers['x-requested-with'],'Native transport, not AJAX');
  if(js){await page.goBack({waitUntil:'domcontentloaded'});assert.equal(await page.locator('button[data-channel="server"]').isEnabled(),true,'Back restores retry');}
  report.cases.push({javascript:js,nativePost:true,validates:true,confirmationConfigured:true,captchaEnabled:true,unicodePreserved:true,externalCalls:0});
  await context.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto(base+'/bedankt/');
 assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex');
 assert.match(await page.locator('main').innerText(),/Deze pagina alleen bewijst geen ontvangst/);
 await page.screenshot({path:`${out}/confirmation-mobile.png`,fullPage:true});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await writeFile(`${out}/form-delivery-qa.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}

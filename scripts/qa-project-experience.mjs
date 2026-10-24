import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BENTECH_QA_URL||'http://127.0.0.1:8788';
const out=process.env.BENTECH_QA_OUT||'.impeccable/review/project-local';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const report={base,checked:new Date().toISOString(),layouts:[],errors:[]};
try{
 const context=await browser.newContext();const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(String(e)));
 const dataRequests=[];
 page.on('request',r=>{if(/qa@example.invalid|Geheime QA/.test(r.url()+(r.postData()||'')))dataRequests.push(r.url());});
 for(const width of [1920,1440,1024,768,601,600,390,320]){
  await page.setViewportSize({width,height:1000});await page.goto(base,{waitUntil:'networkidle'});
  if(await page.locator('#rejectMarketingConsent').isVisible())await page.click('#rejectMarketingConsent');
  await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
  assert.equal(await page.locator('#vragen details').count(),8);
  assert.equal(await page.locator('.fit-list>div').count(),3);
  for(const id of ['voor-wie','oplevering','projectstart','vragen']){
   const box=await page.locator('#'+id+' h2').boundingBox();
   assert.ok(box.x>=0&&box.x+box.width<=width+1,`heading ${id} ${width}`);
  }
  await page.locator('.starter-examples details').first().locator('summary').click();
  assert.equal(await page.locator('.starter-examples details').first().getAttribute('open'),'');
  await page.locator('.faq-list summary').first().focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('.faq-list details').first().getAttribute('open'),'');
  if([1440,390].includes(width)){
   for(const id of ['voor-wie','oplevering','projectstart','vragen'])await page.locator('#'+id).screenshot({path:`${out}/${id}-${width}.png`});
  }
  report.layouts.push({width,noOverflow:true,sectionsReadable:true,keyboardDetails:true});
 }
 for(const [key,service,phrase] of [['plc','PLC-automatisering','Gewenste werking'],['logo','LOGO!-domotica','Gewenste functies'],['troubleshooting','Troubleshooting PLC / LOGO!','Verwacht gedrag']]){
  await page.goto(base,{waitUntil:'networkidle'});
  const link=page.locator(`[data-project-example="${key}"]`);
  await link.locator('..').locator('..').locator('summary').click();
  await link.click();
  assert.equal(await page.locator('#offerte').getAttribute('open'),'');
  assert.equal(await page.locator('#q-service').inputValue(),service);
  assert.ok((await page.locator('#q-details').inputValue()).includes(phrase));
  assert.equal(await page.locator('#q-details').evaluate(e=>e===document.activeElement),true);
 }
 const draft='Geheime QA <script>voorbeeld</script> '+ 'x'.repeat(1950);
 await page.locator('#q-details').fill(draft);
 await page.locator('.starter-examples details').first().locator('summary').click();
 await page.locator('[data-project-example="plc"]').click();
 assert.equal(await page.locator('#q-details').inputValue(),draft,'Existing draft must never be overwritten or appended past its limit');
 assert.match(await page.locator('#starterFeedback').innerText(),/behouden/);
 await page.locator('#q-name').fill('QA <voorbeeld>');await page.locator('#q-email').fill('qa@example.invalid');
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 assert.equal(await page.locator('#q-name').inputValue(),'QA <voorbeeld>','Delayed autofocus must not steal typed name');
 assert.equal(await page.locator('#q-email').inputValue(),'qa@example.invalid');
 assert.equal(await page.locator('#q-details').inputValue(),draft,'Rapid field entry must not end up in the project description');
 await page.evaluate(()=>{window.__copied='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{await new Promise(resolve=>setTimeout(resolve,80));window.__copied=t;}}});});
 await page.click('#copyRequest');
 await page.waitForFunction(()=>window.__copied.length>0);
 await page.locator('.form-handoff-status').filter({hasText:'Aanvraag gekopieerd'}).waitFor();
 const text=await page.evaluate(()=>window.__copied);
 assert.ok(text.includes(draft)&&text.includes('PLC-automatisering'));
 assert.match(await page.locator('.form-handoff-status').innerText(),/nog niet ontvangen/);
 await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('denied');};});
 await page.click('#copyRequest');
 await page.locator('.copy-fallback').waitFor();
 assert.equal(await page.locator('.copy-fallback').inputValue(),text);
 assert.equal(await page.locator('.copy-fallback').getAttribute('readonly'),'');
 assert.equal(await page.locator('.form-handoff-status script').count(),0,'User text must not become markup');
 assert.deepEqual(dataRequests,[],'Copy/preparation must never transmit enquiry data');
 report.intake={threeExamples:true,servicePreselected:true,existingDraftPreserved:true,rapidFieldEntryPreserved:true,copy:true,clipboardDeniedFallback:true,noTransmission:true};
 const fiche=await context.request.get(base+'/assets/automation/projectfiche-bentech.txt');
 assert.equal(fiche.status(),200);assert.match(await fiche.text(),/info@bentechsolutions.be/);
 report.download={projectFiche:true};
 const nojs=await browser.newContext({javaScriptEnabled:false});const np=await nojs.newPage();
 await np.goto(base,{waitUntil:'networkidle'});await np.locator('.faq-list summary').first().click();
 assert.equal(await np.locator('.faq-list details').first().getAttribute('open'),'');
 assert.equal(await np.locator('#quoteForm fieldset').getAttribute('disabled'),'');
 assert.equal(await np.locator('a[download]').count(),1);
 report.noScript={faqWorks:true,downloadWorks:true,noAccidentalFormSubmit:true};
 assert.deepEqual(report.errors,[]);
 await writeFile(out+'/project-experience-qa.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}

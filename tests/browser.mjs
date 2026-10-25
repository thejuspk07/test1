import {chromium,expect} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={checks:[],errors:[],requests:[]};
const check=name=>{report.checks.push(name);console.log('PASS',name);};
await fs.mkdir('test-results',{recursive:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)report.requests.push(`${r.status()} ${r.url()}`);});
async function jump(id){await page.evaluate(id=>document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'}),id);await page.waitForTimeout(1300);}
async function capture(name){await page.screenshot({path:`docs/screenshots/${name}.png`,animations:'disabled'});}
try {
 await page.goto('http://127.0.0.1:4173');
 await expect(page.locator('h1')).toHaveText('THEJUS P K.');
 await page.waitForFunction(()=>document.querySelector('[data-name=city]').videoWidth>0);
 await page.waitForTimeout(700);
 expect(await page.locator('[data-name=city]').evaluate(v=>!v.paused&&v.currentTime>0)).toBe(true);
 expect(await page.locator('[data-name=rain]').getAttribute('src')).toBe(null);
 check('hero plays actual video; second scene not eagerly downloaded');await capture('desktop-hero');
 const heightBefore=await page.locator('#hero').evaluate(e=>e.offsetHeight);
 await page.locator('#motion-toggle').click();
 expect(await page.locator('video').evaluateAll(vs=>vs.every(v=>v.paused))).toBe(true);
 expect(await page.locator('#hero').evaluate(e=>e.offsetHeight)).toBe(heightBefore);
 check('pause stops playback without changing hero height');await page.locator('#motion-toggle').click();
 await page.evaluate(()=>scrollTo({top:innerHeight*.3,behavior:'instant'}));await page.waitForTimeout(100);
 const opacity=await page.locator('.hero-content').evaluate(e=>Number(getComputedStyle(e).opacity));expect(opacity).toBeLessThan(.8);check('native-scroll hero timeline responds');
 await jump('about');await page.waitForFunction(()=>document.querySelector('[data-name=rain]').videoWidth>0);
 expect(await page.locator('[data-name=city]').evaluate(v=>v.paused)).toBe(true);expect(await page.locator('[data-name=rain]').evaluate(v=>!v.paused)).toBe(true);check('scroll crossfades to rain and pauses outgoing video');await capture('desktop-about');
 await jump('skills');expect(await page.locator('video').evaluateAll(vs=>vs.every(v=>v.paused))).toBe(true);check('solid content pauses all decorative videos');
 await page.locator('#theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');check('light theme persists across reload');await jump('skills');await capture('desktop-light');await page.locator('#theme-toggle').click();
 await jump('projects');await capture('desktop-projects');
 await page.locator('.project-1 summary').click();await expect(page.locator('.project-1 .details-copy')).toBeVisible();check('project details open with original factual copy');
 await jump('contact');await page.locator('#copy-email').click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('thejuspkwork@gmail.com');check('copy email writes correct address');await capture('desktop-contact');
 for(const width of [1440,1024,768,390,320]){
   await page.setViewportSize({width,height:844});
   for(const id of ['hero','about','skills','experience','projects','education','certifications','contact']){await jump(id);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
   check(`no horizontal overflow across all sections at ${width}px`);
 }
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173');await page.waitForTimeout(900);await capture('mobile-hero');
 expect(await page.locator('#hero').evaluate(e=>e.offsetHeight)).toBe(844);check('mobile hero is unpinned');
 await page.locator('#menu-toggle').click();await expect(page.locator('#navigation')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#menu-toggle')).toBeFocused();await expect(page.locator('#navigation')).toBeHidden();
 await page.locator('#menu-toggle').click();await page.locator('#navigation a[href="#projects"]').click();await expect(page.locator('#navigation')).toBeHidden();await page.waitForTimeout(900);check('mobile navigation, anchors and Escape focus work');await capture('mobile-projects');
 await jump('contact');await capture('mobile-contact');
 await page.setViewportSize({width:768,height:1024});await jump('skills');await capture('tablet-skills');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4173');
 expect(await page.locator('video').evaluateAll(vs=>vs.every(v=>v.paused&&!v.getAttribute('src')))).toBe(true);
 expect(await page.locator('.hero-stage').evaluate(e=>getComputedStyle(e).position)).not.toBe('sticky');check('reduced motion uses posters, no video requests, no pin');await capture('reduced-motion');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.route('**/*.mp4',r=>r.abort());await page.goto('http://127.0.0.1:4173');await page.waitForTimeout(1000);
 expect(await page.locator('.scene.is-active img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);await expect(page.locator('h1')).toBeVisible();check('blocked video preserves poster and content');
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await noJS.newPage();await plain.goto('http://127.0.0.1:4173');await expect(plain.locator('h1')).toBeVisible();await expect(plain.locator('#navigation a[href="#projects"]')).toBeVisible();check('no-JavaScript content and mobile navigation remain usable');await noJS.close();
 const saver=await browser.newContext();await saver.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));const saved=await saver.newPage();await saved.goto('http://127.0.0.1:4173');expect(await saved.locator('video').evaluateAll(vs=>vs.every(v=>!v.getAttribute('src')))).toBe(true);check('data saver requests no decorative video');await saver.close();
 expect(report.errors).toEqual([]);expect(report.requests).toEqual([]);check('no JavaScript errors or failed HTTP responses');
} catch(error){report.failure=error.stack;console.error(error);process.exitCode=1;}
finally{await fs.writeFile('test-results/browser.json',JSON.stringify(report,null,2));await browser.close();}

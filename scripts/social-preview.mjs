import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1200,height:630},reducedMotion:'reduce'});
const page=await context.newPage();await page.goto('http://127.0.0.1:4173');await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'assets/social-preview.jpg',type:'jpeg',quality:85});await browser.close();

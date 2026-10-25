import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const results=[];
for(const theme of ['dark','light']){
 await page.goto('http://127.0.0.1:4173');
 if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme-toggle').click();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  const {violations}=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  results.push({theme,width,violations});console.log(theme,width,violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
 }
}
await fs.writeFile('test-results/accessibility.json',JSON.stringify(results,null,2));await browser.close();
if(results.some(r=>r.violations.length))process.exitCode=1;

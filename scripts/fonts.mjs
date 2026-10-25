import fs from 'node:fs/promises';
await fs.mkdir('assets/fonts',{recursive:true});
for(const [family,name] of [['Manrope','manrope'],['Space+Grotesk','space-grotesk']]){
 const css=await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@400..700&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}}).then(r=>r.text());
 const urls=[...css.matchAll(/url\((.*?)\)/g)].map(m=>m[1]);const url=urls.at(-1);
 if(!url?.endsWith('.woff2'))throw Error(css);
 const data=Buffer.from(await fetch(url).then(r=>r.arrayBuffer()));await fs.writeFile(`assets/fonts/${name}-latin.woff2`,data);console.log(name,url,data.length);
}

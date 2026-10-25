import fs from 'node:fs/promises';
// Explicit allowlist: research, raw stock footage, tests and baseline assets never ship.
await fs.mkdir('dist',{recursive:true});
for(const file of ['index.html','web.html'])await fs.copyFile(file,`dist/${file}`);
await fs.cp('assets','dist/assets',{recursive:true});
console.log('Static site built in dist/');

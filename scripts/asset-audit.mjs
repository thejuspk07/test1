import fs from 'node:fs/promises';
import path from 'node:path';
const roots=['frames_720','frames_hd','frames_1440p','frames_4k','frames2_720','frames2_hd','frames2_1440p','frames2_4k','Cyber_samurai_720p.mp4','Cyber_samurai_hero_animation_1080p_202607170940.mp4','Katana_720p.mp4','Katana_rotate_in_loop_1080p_202607171238.mp4','samurai.mp3','media'];
const entries=[];
const runtime=(await Promise.all(['index.html','web.html','assets/styles.css','assets/app.js','scripts/build.mjs'].map(p=>fs.readFile(p,'utf8')))).join('\n');
async function visit(file,root){const info=await fs.stat(file);if(info.isDirectory()){for(const child of await fs.readdir(file))await visit(path.join(file,child),root);}else entries.push({path:file.replaceAll('\\','/'),bytes:info.size,reason:root==='media'?'Superseded decorative/mockup imagery; no runtime reference': 'Superseded samurai/katana/music experience',evidence:'No reference in final HTML, CSS, JavaScript or explicit build allowlist; replacement media and content verified in browser'});}
for(const root of roots){if(root==='media'?/["'(]media\//.test(runtime):runtime.includes(root))throw Error('Still referenced: '+root);await visit(root,root);}
await fs.writeFile('docs/deletion-manifest.json',JSON.stringify({baselineCommit:'5ea3a45',created:'2026-10-25',entries},null,2));
const total=entries.reduce((n,e)=>n+e.bytes,0);
console.log(entries.length,'files',total,'bytes');
await fs.writeFile('docs/deletion-manifest.md',`# Superseded assets\n\nBaseline commit: 5ea3a45. Every file and exact byte size is recorded in deletion-manifest.json.\n\n${entries.length} files; ${total.toLocaleString('en-US')} bytes (${(total/1048576).toFixed(2)} MiB).\n\nThe final runtime and deployment allowlist do not reference these assets. Real replacement video playback, section transitions, content integrity and responsive layouts were tested before cleanup. Original assets remain recoverable from Git history.\n\n`+roots.map(root=>{const files=entries.filter(e=>e.path===root||e.path.startsWith(root+'/'));return `- ${root}: ${files.length} files, ${files.reduce((n,e)=>n+e.bytes,0).toLocaleString('en-US')} bytes.`;}).join('\n'));

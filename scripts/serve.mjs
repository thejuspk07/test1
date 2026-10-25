import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.mp4':'video/mp4', '.woff2':'font/woff2'};
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) {res.writeHead(403).end(); return;}
    const info = await stat(file);
    const data = await readFile(file);
    const range = req.headers.range?.match(/bytes=(\d+)-(\d*)/);
    res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Accept-Ranges','bytes');
    if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1}).end(data.subarray(start,end+1));}
    else res.writeHead(200,{'Content-Length':info.size}).end(data);
  } catch {res.writeHead(404).end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));

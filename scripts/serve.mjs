import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { onRequest } from '../functions/[[path]].js';
const root = resolve(import.meta.dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.ttf':'font/ttf','.xml':'application/xml','.txt':'text/plain'};
createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1:8788');
    const r = await onRequest({ request:new Request(url), next:async () => {
      let file = resolve(root, '.' + decodeURIComponent(url.pathname));
      if((file !== root && !file.startsWith(root+sep)) || url.pathname.includes('/.')) return new Response('Not found',{status:404});
      if(!extname(file)) file = resolve(file,'index.html');
      try {return new Response(await readFile(file),{headers:{'Content-Type':mime[extname(file)]||'application/octet-stream'}});}
      catch {return new Response(await readFile(resolve(root,'404.html')),{status:404,headers:{'Content-Type':'text/html'}});}
    }});
    res.writeHead(r.status,Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer()));
  } catch {res.writeHead(500);res.end('Local server error');}
}).listen(8788,'127.0.0.1',()=>console.log('BenTech preview: http://127.0.0.1:8788'));

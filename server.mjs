import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png' };
// Serve only public site assets, never repository or configuration files.
const allowed = new Set(['/index.html', '/assets/style.css', '/assets/app.js', '/assets/config.js', '/assets/favicon.svg', '/assets/Элегантный деловой портрет в офисе.png']);
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  if (pathname === '/') pathname = '/index.html';
  if (!allowed.has(pathname)) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const content = await readFile(path.join(root, pathname));
    res.writeHead(200, { 'Content-Type': types[path.extname(pathname)], 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '0.0.0.0', () => console.log(`Website: http://localhost:${port}`));

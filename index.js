const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

async function handler(req, res) {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Preview proxy for embedded live app showcase (bypasses SAMEORIGIN frame restrictions)
  if (reqPath === '/api/preview/mimate') {
    try {
      const upstream = await fetch('https://mimate-nails-spa.vercel.app/');
      let html = await upstream.text();
      html = html.replace(/<head>/i, '<head><base href="https://mimate-nails-spa.vercel.app/">');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': "frame-ancestors * 'self'"
      });
      res.end(html);
      return;
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Error loading Mimate preview: ' + err.message);
      return;
    }
  }

  if (reqPath === '/api/preview/arabela') {
    try {
      const upstream = await fetch('https://inventario-arabela-espectaculos.vercel.app/');
      let html = await upstream.text();
      html = html.replace(/<head>/i, '<head><base href="https://inventario-arabela-espectaculos.vercel.app/">');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': "frame-ancestors * 'self'"
      });
      res.end(html);
      return;
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Error loading Arabela preview: ' + err.message);
      return;
    }
  }

  if (reqPath === '/' || !reqPath) reqPath = '/index.html';

  const filePath = path.join(ROOT_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        if (!reqPath.startsWith('/assets/')) {
          fs.readFile(path.join(ROOT_DIR, 'index.html'), (err2, indexContent) => {
            if (!err2) {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(indexContent);
              return;
            }
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Not Found: ' + reqPath);
          });
          return;
        }
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 - Not Found: ' + reqPath);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 - Internal Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable'
      });
      res.end(content);
    }
  });
}

const server = http.createServer(handler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  DevMaK3 Server Online`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

module.exports = handler;

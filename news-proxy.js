const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');

const PORT    = 3001;
const RSS_URL = 'https://www.franceinfo.fr/titres.rss';

http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/news') {
    https.get(RSS_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.writeHead(200);
        res.end(data);
      });
    }).on('error', (e) => {
      res.writeHead(500);
      res.end(e.message);
    });
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    const file = path.join(__dirname, 'index.html');
    fs.readFile(file, (err, content) => {
      if (err) { res.writeHead(500); res.end(); return; }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(200);
      res.end(content);
    });
    return;
  }

  res.writeHead(404);
  res.end();

}).listen(PORT, '0.0.0.0', () => {
  const ip = Object.values(os.networkInterfaces())
    .flat()
    .find(i => i.family === 'IPv4' && !i.internal)?.address || 'localhost';

  console.log(`App        → http://localhost:${PORT}`);
  console.log(`Mobile     → http://${ip}:${PORT}`);
  console.log(`News API   → http://${ip}:${PORT}/news`);
});

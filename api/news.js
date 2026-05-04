const https = require('https');

const RSS_URL = 'https://www.franceinfo.fr/titres.rss';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  https.get(RSS_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.status(200).send(data);
    });
  }).on('error', (e) => {
    res.status(500).send(e.message);
  });
};

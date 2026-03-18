const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // --- API Proxy ---
  if (req.method === 'POST' && req.url === '/api/analyse') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsed = JSON.parse(body);

      const postData = JSON.stringify(parsed);

      const options = {
        hostname: 'ai.hackclub.com',
        port: 443,
        path: '/proxy/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': parsed._apiKey ? `Bearer ${parsed._apiKey}` : '',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify({
            model: parsed.model,
            messages: parsed.messages,
            max_tokens: parsed.max_tokens,
            temperature: parsed.temperature,
          })),
        },
      };

      // Remove internal _apiKey before forwarding
      const forwardBody = JSON.stringify({
        model: parsed.model,
        messages: parsed.messages,
        max_tokens: parsed.max_tokens,
        temperature: parsed.temperature,
      });

      const apiReq = https.request(options, apiRes => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
          res.writeHead(apiRes.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(data);
        });
      });

      apiReq.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });

      // Fix: send the cleaned body
      options.headers['Content-Length'] = Buffer.byteLength(forwardBody);
      apiReq.write(forwardBody);
      apiReq.end();
    });
    return;
  }

  // --- Static File Serving ---
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n  ✨ Magic is running at http://localhost:${PORT}\n`);
});

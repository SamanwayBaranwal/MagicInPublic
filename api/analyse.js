const https = require('https');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const API_KEY = process.env.API_KEY;
  const MODEL = process.env.MODEL || 'qwen/qwen3-vl-235b-a22b-instruct';

  if (!API_KEY) {
    res.status(500).json({ error: 'Server misconfigured — missing API_KEY' });
    return;
  }

  const { messages, max_tokens, temperature } = req.body;

  const forwardBody = JSON.stringify({
    model: MODEL,
    messages,
    max_tokens: max_tokens || 1500,
    temperature: temperature || 0.9,
  });

  const options = {
    hostname: 'ai.hackclub.com',
    port: 443,
    path: '/proxy/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(forwardBody),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => (data += chunk));
    apiRes.on('end', () => {
      res.status(apiRes.statusCode).json(JSON.parse(data));
    });
  });

  apiReq.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  apiReq.write(forwardBody);
  apiReq.end();
};

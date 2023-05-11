const http = require("http");

function createServer(routing) {
  const server = http.createServer(async (req, res) => {
    const url = req.url.split('?')[0];
    const route = routing[url]?.[req.method];
    const params = await extractParams(req);
    const result = route ? await route(params) : 'Not found';

    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(result));
  });

  server.listen(8001);
  console.log('Server is listening on: 8001');
}

async function extractParams(req) {
  const methods = ['POST', 'PUT', 'PATCH'];
  const query = new URL(req.url, `https://${req.headers.host}`).searchParams

  if (methods.some(method => method === req.method)) {
    const body = await extractBodyParams(req);
    return { body, query };
  }

  return { body: null, query };
}

function extractBodyParams(req) {
  const buffer = []

  return new Promise((resolve, reject) => {
    req.on('data', chunk => buffer.push(chunk));
    req.on('error', (error) => reject(error));
    req.on('end', () => {
      try {
        const data = Buffer.concat(buffer).toString();
        resolve(JSON.parse(data));
      } catch(error) {
        console.error(error);
        reject(error);
      }
    });
  });
}

module.exports = { createServer };

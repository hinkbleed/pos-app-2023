const http = require('node:http');

const poli2301Inv = require('./db/uevents/poli23-1.json');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/storage/poli':
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(poli2301Inv));
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }
    case 'POST':
      switch (url) {
        case '/storage/poli': {
          let body = '';

          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', () => {
            const data = JSON.parse(body);

            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end('404 not found :(');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('serverlistening on port http://localhost:1234');
});

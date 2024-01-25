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
          res.setHeader('Content-Type', 'text/html; utf-8');
          return res.end('<h1>404</h1>');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('serverlistening on port http://localhost:1234');
});

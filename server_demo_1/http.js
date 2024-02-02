//  Función para montar el servidor

const http = require('node:http');

//  Solicitamos la variable de entorno para el puerto, si no se define se quedará en 3000
const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200; //  OK
    res.end('<h1>Inicio</h1>');
  } else if (req.url === '/contacto') {
    res.statusCode = 200; //  OK
    res.end('<h1>Contacto</h1>');
  } else {
    res.statusCode = 404; //  Error
    res.end('<h1>404</h1>');
  }
};

//  Creamos el servidor http y enviamos la información
const server = http.createServer(processRequest);

//    llamamos a la función para encontrar un puerto disponible

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});

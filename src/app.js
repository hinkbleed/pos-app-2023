import express, { json } from 'express';
import { createProductRouter } from './routes/products.js';
import { createProvidorRouter } from './routes/data/providors/providors.js';
import { createEditorialRouter } from './routes/data/editorials/editorials.js';
import { corsMiddleware } from './middlewares/cors.js';
import { appStarter } from './routes/app.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPasswordRouter } from './routes/login/login.js';

/*  function isAuthenticated (req) {
  // Simulamos la autenticación verificando si existe un campo en el cuerpo de la solicitud
  // Aquí podrías implementar la lógica real para verificar la autenticación
  return req.body.password === 'silicio';
}

// Middleware para verificar la autenticación
function authPassword (req, res, next) {
  // Verificar si el usuario está autenticado
  if (isAuthenticated(req)) {
    // Si el usuario está autenticado, permite el acceso a la ruta solicitada
    return next();
  } else {
    // Si el usuario no está autenticado, devuelve un mensaje de error
    res.status(401).json({ message: '¡Autenticación fallida! Contraseña incorrecta.' });
  }
}
*/

export const createApp = ({ productModel, providorModel, editorialModel, passwordModel }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(json());
  app.use(corsMiddleware());
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use('/', appStarter());
  app.use(express.static(join(__dirname, 'public')));

  app.use('/data/storage', /* authPassword , */createProductRouter({ productModel }));

  app.use('/data/providors', /* authPassword , */createProvidorRouter({ providorModel }));

  app.use('/data/editorials', /* authPassword , */createEditorialRouter({ editorialModel }));

  app.use('/login', /* authPassword , */createPasswordRouter({ passwordModel }));

  const PORT = process.env.PORT ?? 1234;

  //  Run server
  app.listen(PORT, () => {
    console.log(`serving in http://localhost:${PORT}`);
  });
};

import express, { json } from 'express';
import session from 'express-session';
import { createProductRouter } from './routes/products.js';
import { createProvidorRouter } from './routes/data/providors/providors.js';
import { createEditorialRouter } from './routes/data/editorials/editorials.js';
import { corsMiddleware } from './middlewares/cors.js';
import { appStarter, checkAuthentication } from './routes/app.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPasswordRouter } from './routes/login/login.js';

export const createApp = ({ productModel, providorModel, editorialModel, passwordModel }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(json());
  app.use(corsMiddleware());
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(join(__dirname, 'public')));

  app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
  }));

  app.use('/', appStarter());
  app.use('/login', createPasswordRouter({ passwordModel }));

  app.use('/data/storage', createProductRouter({ productModel }));

  app.use('/data/providors', createProvidorRouter({ providorModel }));

  app.use('/data/editorials', createEditorialRouter({ editorialModel }));

  app.use(checkAuthentication, (req, res) => {
    res.redirect('/home');
  });

  const PORT = process.env.PORT ?? 1234;

  //  Run server
  app.listen(PORT, () => {
    console.log(`serving in http://localhost:${PORT}`);
  });
};

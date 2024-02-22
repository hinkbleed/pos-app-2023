import express, { json } from 'express';
import { createProductRouter } from './routes/products.js';
import { corsMiddleware } from './middlewares/cors.js';
import { appStarter } from './routes/app.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const createApp = ({ productModel }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(json());
  app.use(corsMiddleware());
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use('/', appStarter());
  app.use(express.static(join(__dirname, 'public')));

  app.use('/data/products', createProductRouter({ productModel }));

  const PORT = process.env.PORT ?? 1234;

  //  Run server
  app.listen(PORT, () => {
    console.log(`serving in http://localhost:${PORT}`);
  });
};

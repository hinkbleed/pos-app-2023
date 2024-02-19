import express, { json } from 'express';
import { createProductRouter } from './routes/products.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ productModel }) => {
  const app = express();

  app.disable('x-powered-by');

  app.use(json());

  app.use(corsMiddleware());

  app.use('/products', createProductRouter({ productModel }));

  const PORT = process.env.PORT ?? 1234;

  //  Run server
  app.listen(PORT, () => {
    console.log(`serving in http://localhost:${PORT}`);
  });
};

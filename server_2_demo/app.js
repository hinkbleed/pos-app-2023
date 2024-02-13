import express, { json } from 'express';
import { productsRouter } from './routes/products.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.disable('x-powered-by');

app.use(json());

app.use(corsMiddleware());

app.use('/products', productsRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`serving in http://localhost:${PORT}`);
});

import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.disable('x-powered-by');

app.use(json());

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:1234',
      'http://127.0.0.1:5500'
    ];
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

app.get('/products', to do);

app.get('/products/:category', to do);

app.get('/products/:category/:id', to do);

app.post('/products/:category', to do);

app.patch('/products/:category/:id', to do);

app.delete('/products/:category/:id', to do);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`serving in http://localhost:${PORT}`);
});

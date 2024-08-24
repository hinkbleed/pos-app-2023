import express, { json } from 'express';
import session from 'express-session';
import { corsMiddleware } from './middlewares/cors.js';
import { appStarter, checkAuthentication } from './routes/app.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { createPasswordRouter } from './routes/login/login.js';
import { createFullstorageRouter } from './routes/fullstorage/index/fullstorage.js';
import { createDataconfigRouter } from './routes/dataconfig/index/dataconfig.js';
import { createPartyconfigRouter } from './routes/partyconfig/partyconfig.js';
import { createShopRouter } from './routes/shop/shop.js';

export const createApp = ({ productModel, providorModel, editorialModel, passwordModel, partyModel, genreModel, subgenreModel, employeeModel, fullproductsModel, shopModel }) => {
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
    cookie: {
      maxAge: 15 * 60 * 60 * 1000
    }
  }));

  app.use('/', appStarter());
  app.use('/login', createPasswordRouter({ passwordModel }));

  app.use('/home', createPartyconfigRouter({ partyModel }));

  app.use('/fullstorage', createFullstorageRouter({ fullproductsModel }));

  app.use('/partyconfig', createPartyconfigRouter({ partyModel }));

  app.use('/dataconfig', createDataconfigRouter({ productModel, providorModel, editorialModel, genreModel, subgenreModel, employeeModel }));

  app.use('/shop', createShopRouter({ partyModel, shopModel }));

  /*
  app.use('/data/editorials', createEditorialRouter({ editorialModel }));

  app.use('/dataconfig', createDataRouter({ dataModel }));
  */

  app.use(checkAuthentication, (req, res) => {
    res.redirect('/home');
  });

  const PORT = process.env.PORT ?? 1234;

  //  Run server
  app.listen(PORT, () => {
    console.log(`serving in http://localhost:${PORT}`);
  });
};

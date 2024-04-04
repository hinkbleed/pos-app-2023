import express, { json } from 'express';
import session from 'express-session';
import { corsMiddleware } from './middlewares/cors.js';
import { appStarter, checkAuthentication } from './routes/app.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { createProductRouter } from './routes/products.js';
/*
import { createProvidorRouter } from './routes/data/providors/providors.js';
import { createEditorialRouter } from './routes/data/editorials/editorials.js';
*/
import { createPasswordRouter } from './routes/login/login.js';
import { createPartyRouter } from './routes/publicdata/parties/parties.js';
import { createConfigprovidorRouter } from './routes/dataconfig/providors/providors.js';
import { createConfigeditorialRouter } from './routes/dataconfig/editorials/editorials.js';
import { createConfiggenreRouter } from './routes/dataconfig/genres/genres.js';
import { createConfigsubgenreRouter } from './routes/dataconfig/subgenres/subgenres.js';
import { createDataconfigRouter } from './routes/dataconfig/index/dataconfig.js';
import { createPublicdataRouter } from './routes/publicdata/index/publicdata.js';
import { createConfigpartyRouter } from './routes/dataconfig/parties/parties.js';
import { createConfigproductRouter } from './routes/dataconfig/products/products.js';
import { createConfigemployeeRouter } from './routes/dataconfig/employees/employees.js';

export const createApp = ({ productModel, providorModel, editorialModel, passwordModel, partyModel, genreModel, subgenreModel, employeeModel }) => {
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

  app.use('/home', createPartyRouter({ partyModel }));

  app.use('/dataconfig', createDataconfigRouter());

  app.use('/dataconfig/providors', createConfigprovidorRouter({ providorModel }));

  app.use('/dataconfig/editorials', createConfigeditorialRouter({ editorialModel }));

  app.use('/dataconfig/genres', createConfiggenreRouter({ genreModel }));

  app.use('/dataconfig/subgenres', createConfigsubgenreRouter({ subgenreModel }));

  app.use('/dataconfig/employees', createConfigemployeeRouter({ employeeModel }));

  app.use('/dataconfig/parties', createConfigpartyRouter({ partyModel }));

  app.use('/dataconfig/products', createConfigproductRouter({ productModel }));

  app.use('/publicdata', createPublicdataRouter());

  app.use('/publicdata/parties', createPartyRouter({ partyModel }));

  app.use('/data/storage', createProductRouter({ productModel }));

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

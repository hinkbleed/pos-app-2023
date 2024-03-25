
import { Router } from 'express';
import { ConfigsubgenreController } from '../../../controllers/dataconfig/subgenres/subgenres.js';

export const createConfigsubgenreRouter = ({ subgenreModel }) => {
  const subgenresRouter = Router();

  const subgenreController = new ConfigsubgenreController({ subgenreModel });

  subgenresRouter.get('/all', subgenreController.getAll);
  subgenresRouter.post('/add', subgenreController.create);
  subgenresRouter.delete('/delete/:id', subgenreController.delete);

  subgenresRouter.get('/alltoproducts', subgenreController.getAllToProducts);

  return subgenresRouter;
};

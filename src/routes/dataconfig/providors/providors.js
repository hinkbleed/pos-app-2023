
import { Router } from 'express';
import { ConfigprovidorController } from '../../../controllers/dataconfig/providors/providors.js';

export const createConfigprovidorRouter = ({ providorModel }) => {
  const providorsRouter = Router();

  const providorController = new ConfigprovidorController({ providorModel });

  providorsRouter.get('/all', providorController.getAll);
  providorsRouter.post('/add', providorController.create);
  providorsRouter.patch('/update/:id', providorController.update);
  providorsRouter.delete('/delete/:id', providorController.delete);

  return providorsRouter;
};

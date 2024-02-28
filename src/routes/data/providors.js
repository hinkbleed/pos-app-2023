import { Router } from 'express';
import { ProvidorController } from '../../controllers/data/providors.js';

export const createProvidorRouter = ({ providorModel }) => {
  const providorsRouter = Router();

  const providorController = new ProvidorController({ providorModel });

  providorsRouter.get('/', providorController.getAll);
  providorsRouter.post('/add', providorController.create);
  providorsRouter.patch('/add/idact', providorController.updateID);

  return providorsRouter;
};

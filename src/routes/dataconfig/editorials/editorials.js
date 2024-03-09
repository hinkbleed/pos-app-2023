
import { Router } from 'express';
import { ConfigeditorialController } from '../../../controllers/dataconfig/editorials/editorials.js';

export const createConfigeditorialRouter = ({ editorialModel }) => {
  const editorialsRouter = Router();

  const editorialController = new ConfigeditorialController({ editorialModel });

  editorialsRouter.get('/all', editorialController.getAll);
  editorialsRouter.post('/add', editorialController.create);
  /*
  providorsRouter.patch('/add/idact', providorController.updateID);
  */

  return editorialsRouter;
};

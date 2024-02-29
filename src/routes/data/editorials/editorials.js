import { Router } from 'express';
import { EditorialController } from '../../../controllers/data/editorials/editorials.js';

export const createEditorialRouter = ({ editorialModel }) => {
  const editorialsRouter = Router();

  const editorialController = new EditorialController({ editorialModel });

  editorialsRouter.get('/', editorialController.getAll);
  editorialsRouter.post('/add', editorialController.create);

  return editorialsRouter;
};

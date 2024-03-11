
import { Router } from 'express';
import { ConfiggenreController } from '../../../controllers/dataconfig/genres/genres.js';

export const createConfiggenreRouter = ({ genreModel }) => {
  const genresRouter = Router();

  const genreController = new ConfiggenreController({ genreModel });

  genresRouter.get('/all', genreController.getAll);
  genresRouter.post('/add', genreController.create);
  /*
  providorsRouter.patch('/add/idact', providorController.updateID);
  */

  return genresRouter;
};
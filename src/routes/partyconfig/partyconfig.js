import { Router } from 'express';
import { PartyconfigController } from '../../controllers/partyconfig/partyconfig.js';

export const createPartyconfigRouter = ({ partyModel }) => {
  const partyconfigRouter = Router();

  const partyconfigController = new PartyconfigController({ partyModel });

  partyconfigRouter.get('/all', partyconfigController.getAll);
  partyconfigRouter.post('/createparty', partyconfigController.createParty);
  partyconfigRouter.patch('/updateparty/:id', partyconfigController.updateParty);

  partyconfigRouter.get('/addparty', (req, res) => res.render('addparty', { title: 'EDQ | Add Party' }));
  /*
  partyconfigRouter.use('/providors', createConfigprovidorRouter({ partyconfigModel }));
  */

  return partyconfigRouter;
};

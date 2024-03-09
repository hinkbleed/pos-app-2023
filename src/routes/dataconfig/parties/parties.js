import { Router } from 'express';
import { ConfigpartyController } from '../../../controllers/dataconfig/parties/parties.js';

export const createConfigpartyRouter = ({ partyModel }) => {
  const partiesRouter = Router();

  const partyController = new ConfigpartyController({ partyModel });

  partiesRouter.get('/all', partyController.getAll);

  return partiesRouter;
};

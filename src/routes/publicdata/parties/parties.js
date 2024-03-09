import { Router } from 'express';
import { PartyController } from '../../../controllers/home/parties/parties.js';

export const createPartyRouter = ({ partyModel }) => {
  const partiesRouter = Router();

  const partyController = new PartyController({ partyModel });

  partiesRouter.get('/parties', partyController.getAll);

  return partiesRouter;
};

import { Router } from 'express';
import { ShopController } from '../../controllers/shop/shop.js';

export const createShopRouter = ({ partyModel, shopModel }) => {
  const shopRouter = Router();

  const shopController = new ShopController({ partyModel, shopModel });

  shopRouter.get('/partybyid/:id', shopController.getPartyById);

  shopRouter.get('/getpartystorage/books/all/:partyid', shopController.getPartyBooks);

  shopRouter.get('/getpartystorage/separs/all/:partyid', shopController.getPartySeparators);

  shopRouter.get('/getpartystorage/mags/all/:partyid', shopController.getPartyMagazines);

  shopRouter.post('/data/storage/addbook', shopController.saveBookToParty);

  /*
  partyconfigRouter.use('/providors', createConfigprovidorRouter({ partyconfigModel }));
  */

  return shopRouter;
};

import { Router } from 'express';
import { ShopController } from '../../controllers/shop/shop.js';

export const createShopRouter = ({ partyModel, shopModel, fullproductsModel, discountModel }) => {
  const shopRouter = Router();

  const shopController = new ShopController({ partyModel, shopModel, fullproductsModel, discountModel });

  shopRouter.get('/partybyid/:id', shopController.getPartyById);

  shopRouter.get('/getpartystorage/books/all/:partyid', shopController.getPartyBooks);
  shopRouter.get('/getpartystorage/separs/all/:partyid', shopController.getPartySeparators);
  shopRouter.get('/getpartystorage/mags/all/:partyid', shopController.getPartyMagazines);

  shopRouter.post('/data/storage/addbook', shopController.saveBookToParty);
  shopRouter.post('/data/storage/addsepar', shopController.saveSeparatorToParty);
  shopRouter.post('/data/storage/addmagazine', shopController.saveMagazineToParty);

  shopRouter.post('/data/storage/updatebook', shopController.updateBookToParty);
  shopRouter.post('/data/storage/updatesepar', shopController.updateSeparatorToParty);
  shopRouter.post('/data/storage/updatemag', shopController.updateMagazineToParty);

  shopRouter.get('/search/fullstorage/:input', shopController.getFullproductsByQuerySearch);
  shopRouter.get('/search/partystorage/:id/:input', shopController.getPartyproductsByQuerySearch);

  shopRouter.post('/discounts/add', shopController.saveDiscount);
  shopRouter.get('/discounts/getall', shopController.getAllDiscounts);
  shopRouter.delete('/discounts/delete/:id', shopController.deleteDiscount);

  shopRouter.get('/pos/search/:id/:input', shopController.getPosProducts);

  /*
  partyconfigRouter.use('/providors', createConfigprovidorRouter({ partyconfigModel }));
  */

  return shopRouter;
};

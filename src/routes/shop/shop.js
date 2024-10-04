import { Router } from 'express';
import { ShopController } from '../../controllers/shop/shop.js';

export const createShopRouter = ({ partyModel, shopModel, fullproductsModel, discountModel, ticketsModel }) => {
  const shopRouter = Router();

  const shopController = new ShopController({ partyModel, shopModel, fullproductsModel, discountModel, ticketsModel });

  shopRouter.get('/partybyid/:id', shopController.getPartyById);

  shopRouter.get('/getpartystorage/books/all/:partyid', shopController.getPartyBooks);
  shopRouter.get('/getpartystorage/separs/all/:partyid', shopController.getPartySeparators);
  shopRouter.get('/getpartystorage/mags/all/:partyid', shopController.getPartyMagazines);

  shopRouter.post('/data/storage/addbook', shopController.saveBookToParty);
  shopRouter.post('/data/storage/addsepar', shopController.saveSeparatorToParty);
  shopRouter.post('/data/storage/addmagazine', shopController.saveMagazineToParty);
  shopRouter.get('/data/partyconfig/partybyid/:id', shopController.getPartyById);

  shopRouter.post('/data/storage/updatebook', shopController.updateBookToParty);
  shopRouter.post('/data/storage/updatesepar', shopController.updateSeparatorToParty);
  shopRouter.post('/data/storage/updatemag', shopController.updateMagazineToParty);

  shopRouter.post('/discounts/add', shopController.saveDiscount);
  shopRouter.get('/discounts/getall', shopController.getAllDiscounts);
  shopRouter.delete('/discounts/delete/:id', shopController.deleteDiscount);

  shopRouter.get('/search/fullstorage/:input', shopController.getFullproductsByQuerySearch);
  shopRouter.get('/search/partystorage/:id/:input', shopController.getPartyproductsByQuerySearch);

  shopRouter.get('/pos/search/:id/:input', shopController.getPosProducts);
  shopRouter.get('/pos/discounts/alltorows', shopController.getPosDiscounts);
  shopRouter.post('/pos/ticket/savenew/:id', shopController.saveNewTicket);
  shopRouter.post('/pos/payment/savenew/:id', shopController.saveNewPayment);

  shopRouter.get('/report/tickets/all/:id', shopController.getAllTicketsToParty);
  shopRouter.get('/report/payments/all/:id', shopController.getAllPaymentsToParty);
  shopRouter.get('/report/balance/:id', shopController.getBalanceToParty);

  return shopRouter;
};

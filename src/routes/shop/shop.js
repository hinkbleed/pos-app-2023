import { Router } from 'express';
import { ShopController } from '../../controllers/shop/shop.js';

export const createShopRouter = ({ partyModel, productModel, fullproductsModel, providorModel, editorialModel, genreModel, subgenreModel, employeeModel }) => {
  const shopRouter = Router();

  const shopController = new ShopController({ partyModel, productModel, fullproductsModel, providorModel, editorialModel, genreModel, subgenreModel, employeeModel });

  shopRouter.get('/partybyid/:id', shopController.getPartyById);

  /*
  partyconfigRouter.use('/providors', createConfigprovidorRouter({ partyconfigModel }));
  */

  return shopRouter;
};

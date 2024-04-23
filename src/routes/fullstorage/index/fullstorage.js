import { Router } from 'express';
import { createFullproductsRouter } from '../products/fullproducts.js';

export const createFullstorageRouter = ({ fullproductsModel }) => {
  const fullstorageRouter = Router();

  fullstorageRouter.use('/products', createFullproductsRouter({ fullproductsModel }));
  return fullstorageRouter;
};

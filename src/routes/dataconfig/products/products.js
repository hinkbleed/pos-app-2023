
import { Router } from 'express';
import { ConfigproductController } from '../../../controllers/dataconfig/products/products.js';

export const createConfigproductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ConfigproductController({ productModel });

  productsRouter.get('/all', productController.getAll);
  //  productsRouter.post('/add', providorController.create);
  /*
  providorsRouter.patch('/add/idact', providorController.updateID);
  */

  return productsRouter;
};

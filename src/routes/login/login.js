import { Router } from 'express';
import { PasswordController } from '../../controllers/login/login.js';

export const createPasswordRouter = ({ passwordModel }) => {
  const passwordsRouter = Router();

  const passwordController = new PasswordController({ passwordModel });

  passwordsRouter.post('/verifypassword', passwordController.verify);

  return passwordsRouter;
};

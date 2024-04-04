
import { Router } from 'express';
import { ConfigemployeesController } from '../../../controllers/dataconfig/employees/employees.js';

export const createConfigemployeeRouter = ({ employeeModel }) => {
  const employeesRouter = Router();

  const employeeController = new ConfigemployeesController({ employeeModel });

  employeesRouter.get('/all', employeeController.getAll);
  employeesRouter.post('/add', employeeController.create);
  employeesRouter.get('/get/:id', employeeController.getById);
  employeesRouter.patch('/update/:id', employeeController.update);
  /*
  employeesRouter.delete('/delete/:id', employeeController.delete);
  */

  return employeesRouter;
};

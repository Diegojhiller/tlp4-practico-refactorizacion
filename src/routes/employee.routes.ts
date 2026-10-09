import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

export function createEmployeeRoutes(controller: EmployeeController): Router {
  const router = Router();

  router.post('/', controller.create);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findById);

  return router;
}

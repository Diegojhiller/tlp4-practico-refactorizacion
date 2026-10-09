import express from 'express';
import { MongoEmployeeRepository } from './repositories/employee.repository';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { createEmployeeRoutes } from './routes/employee.routes';
import { errorHandler } from './middlewares/errorHandler';

// Armado de dependencias: repository -> service -> controller
const employeeRepository = new MongoEmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

export const app = express();

app.use(express.json());
app.use('/employees', createEmployeeRoutes(employeeController));

// Siempre al final, después de las rutas
app.use(errorHandler);

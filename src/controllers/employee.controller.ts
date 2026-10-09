import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';

// El controller solo traduce HTTP <-> service. No tiene lógica de negocio.
// No usa try/catch: Express 5 manda los errores de funciones async al errorHandler.
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  create = async (req: Request, res: Response) => {
    const employee = await this.service.create(req.body);
    res.status(201).json(employee);
  };

  findAll = async (_req: Request, res: Response) => {
    const employees = await this.service.findAll();
    res.json(employees);
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {
    const employee = await this.service.findById(req.params.id);
    res.json(employee);
  };
}

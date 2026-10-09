import { Employee, EmployeeDocument, EmployeeModel } from '../models/employee.model';

// Contrato: lo que cualquier repositorio de empleados tiene que saber hacer
export interface EmployeeRepository {
  create(data: Employee): Promise<EmployeeDocument>;
  findAll(): Promise<EmployeeDocument[]>;
  findById(id: string): Promise<EmployeeDocument | null>;
}

// Implementación con MongoDB. Es la única clase que usa Mongoose.
export class MongoEmployeeRepository implements EmployeeRepository {
  async create(data: Employee): Promise<EmployeeDocument> {
    return EmployeeModel.create(data);
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return EmployeeModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<EmployeeDocument | null> {
    return EmployeeModel.findById(id);
  }
}

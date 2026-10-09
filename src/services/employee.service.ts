import { AppError } from '../errors/AppError';
import { EmployeeRepository } from '../repositories/employee.repository';
import { calculateFinalSalary } from './salary.calculator';

// Datos que llegan del cliente para crear un empleado
export interface CreateEmployeeDTO {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
}

export class EmployeeService {
  // El repositorio se recibe desde afuera (inyección de dependencias)
  constructor(private readonly repository: EmployeeRepository) {}

  async create(data: CreateEmployeeDTO) {
    this.validate(data);

    const finalSalary = calculateFinalSalary(data.baseSalary, data.yearsOfService);

    const employee = await this.repository.create({
      name: data.name,
      position: data.position,
      baseSalary: data.baseSalary,
      yearsOfService: data.yearsOfService,
      finalSalary
    });

    console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
    return employee;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new AppError(404, 'Empleado no encontrado');
    }

    return employee;
  }

  private validate(data: CreateEmployeeDTO) {
    const { name, position, baseSalary, yearsOfService } = data ?? {};

    if (!name || !position) {
      throw new AppError(400, 'Nombre y puesto son obligatorios');
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      throw new AppError(400, 'El salario base debe ser mayor a 0');
    }

    if (
      typeof yearsOfService !== 'number' ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      throw new AppError(400, 'La antigüedad debe ser un entero mayor o igual a 0');
    }
  }
}

import { Schema, model, HydratedDocument } from 'mongoose';

// Forma de los datos de un empleado (sin depender de Mongoose)
export interface Employee {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
}

// Documento tal como lo devuelve Mongo (con _id, createdAt, etc.)
export type EmployeeDocument = HydratedDocument<Employee>;

const employeeSchema = new Schema<Employee>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true }
  },
  { timestamps: true }
);

export const EmployeeModel = model<Employee>('Employee', employeeSchema);

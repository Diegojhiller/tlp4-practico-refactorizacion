// Regla de negocio: salario base + 2% del salario base por cada año de antigüedad
const BONUS_PER_YEAR = 0.02;

export function calculateFinalSalary(baseSalary: number, yearsOfService: number): number {
  const bonus = baseSalary * BONUS_PER_YEAR * yearsOfService;
  return baseSalary + bonus;
}

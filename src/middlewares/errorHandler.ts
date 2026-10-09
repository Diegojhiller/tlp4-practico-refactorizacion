import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

// Middleware de errores: Express lo reconoce porque tiene 4 parámetros
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
}

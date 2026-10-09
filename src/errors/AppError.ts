// Error "esperado" de la aplicación, que sabe qué código HTTP devolver
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

# Práctica SOLID - Empleados y Salarios

Esta versión funciona, pero está deliberadamente mal estructurada.

## Objetivo

Refactorizar el servidor aplicando una separación clara de responsabilidades:

- controllers
- routes
- services
- repository
- models
- errorHandler

## Regla de negocio

El salario final se calcula así:

**salario final = salario base + 2% del salario base por cada año de antigüedad**

Ejemplo:

- Salario base: 1.000.000
- Antigüedad: 5 años
- Adicional: 10%
- Salario final: 1.100.000

## Endpoints requeridos

- POST /employees
- GET /employees
- GET /employees/:id

## Cómo ejecutar

```bash
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

## Consigna

Identificar los problemas del diseño actual y refactorizarlo.
El comportamiento observable de la API debe mantenerse.

## Resolución

### Problemas identificados en el diseño original

Todo el servidor estaba en `src/server.ts`, que se encargaba de:

- configurar Express y conectarse a MongoDB
- definir el schema del modelo
- definir las rutas
- validar los datos de entrada
- calcular el salario final (regla de negocio)
- acceder a la base de datos
- manejar los errores, con el mismo `try/catch` repetido en cada endpoint

Esto rompe el **principio de responsabilidad única (S)**: el archivo tenía muchos motivos para cambiar.
También rompe la **inversión de dependencias (D)**, porque la lógica de negocio dependía directamente de Mongoose.

### Estructura después del refactor

```
src/
├── server.ts                          # inicia la conexión y el servidor
├── app.ts                             # configura Express y arma las dependencias
├── config/database.ts                 # conexión a MongoDB
├── models/employee.model.ts           # schema y tipos del empleado
├── repositories/employee.repository.ts # acceso a datos (interfaz + implementación Mongo)
├── services/employee.service.ts       # validaciones y casos de uso
├── services/salary.calculator.ts      # regla de negocio del salario
├── controllers/employee.controller.ts # traduce HTTP <-> servicio
├── routes/employee.routes.ts          # define los endpoints
├── errors/AppError.ts                 # error con código HTTP
└── middlewares/errorHandler.ts        # manejo centralizado de errores
```

Flujo de una petición:

```
request → routes → controller → service → repository → MongoDB
                        ↓ (si hay un error)
                   errorHandler → response
```

### Principios SOLID aplicados

- **S**: cada archivo tiene una única responsabilidad.
- **O**: la regla del salario está aislada y se puede cambiar sin tocar el resto.
- **L**: cualquier clase que implemente `EmployeeRepository` puede reemplazar a la de Mongo.
- **I**: la interfaz del repositorio solo tiene los métodos que se usan.
- **D**: el servicio recibe el repositorio por constructor y depende de la interfaz, no de Mongoose.

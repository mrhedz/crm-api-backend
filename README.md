# CRM API Backend (Node.js + TypeScript)

Backend REST API desarrollado con Node.js, TypeScript y PostgreSQL, enfocado en gestión de clientes (CRM básico) con autenticación JWT y arquitectura escalable.

---

## Descripción

API backend tipo CRM lista para producción, diseñada con buenas prácticas de arquitectura, validación de datos y manejo de errores. Puede integrarse fácilmente con dashboards, sistemas SaaS, aplicaciones móviles o servicios externos.

---

## Features

- Autenticación con JWT  
- CRUD completo de clientes  
- Validación robusta con Zod  
- Manejo estructurado de errores  
- Base de datos PostgreSQL  
- Contenerización con Docker  
- Arquitectura modular (controllers, services, routes)  
- Health checks para API y base de datos  

---

## Tecnologías

- Node.js  
- TypeScript  
- Express  
- PostgreSQL  
- Docker  
- Zod  
- JSON Web Tokens (JWT)  

---

## Instalación

~~~bash
git clone https://github.com/mrhedz/-crm-api-backend.git
cd api-backend
npm install
~~~

---

## Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

~~~env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_crm
JWT_SECRET=supersecret
~~~

---

## Ejecutar con Docker

~~~bash
docker compose up -d
~~~

---

## Ejecutar API

~~~bash
npm run dev
~~~

---

## Autenticación

POST /api/auth/login

~~~json
{
  "email": "admin@test.com",
  "password": "123456"
}
~~~

---

## Endpoints

Health

- GET /health  
- GET /health/db  

Clients

- GET /api/clients  
- GET /api/clients/:id  
- POST /api/clients  
- PUT /api/clients/:id  
- DELETE /api/clients/:id  

---

## Seguridad

- Autenticación basada en JWT  
- Rutas protegidas mediante middleware  
- Validación estricta de inputs  
- Manejo de errores controlado  

---

## Testing

El proyecto incluye pruebas manuales mediante Insomnia o Postman.

Se recomienda:

- Probar endpoints con y sin token  
- Validar errores (400, 401, 404, 409)  
- Verificar integridad de datos en base de datos  

---

## Estructura del proyecto

src/  
  controllers/  
  routes/  
  services/  
  middlewares/  
  utils/  
  config/  

---

## Notas

- Todas las rutas (excepto login) requieren autenticación JWT  
- El sistema está preparado para escalar a nuevas entidades  
- La arquitectura permite fácil integración con frontend o microservicios  

---

## Autor

Martin Hernandez  
Backend Developer especializado en APIs, microservicios e integraciones

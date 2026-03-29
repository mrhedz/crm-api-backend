# Chatbot IA para Ventas - API Backend (Node.js + TypeScript)

Backend API desarrollado con Node.js y TypeScript, enfocado en asistentes conversacionales con inteligencia artificial para recomendaciones de productos y automatización de ventas.

---

## Descripción

API backend diseñada para generar respuestas inteligentes en lenguaje natural a partir de mensajes del usuario, simulando un asistente de ventas.

Permite integrarse fácilmente con aplicaciones web, e-commerce, dashboards o plataformas SaaS para mejorar la experiencia de usuario mediante interacción conversacional.

---

## Features

- Respuestas generadas con inteligencia artificial  
- Recomendaciones dinámicas de productos  
- Sugerencias rápidas para mejorar la UX  
- Endpoint de chat listo para integración  
- Manejo estructurado de respuestas  
- Arquitectura modular escalable  
- Health check para monitoreo  

---

## Tecnologías

- Node.js  
- TypeScript  
- Express  
- OpenAI API  
- dotenv  
- cors  

---

## Instalación

~~~bash
git clone https://github.com/mrhedz/chatbot-ai-sales-api.git
cd chatbot-ai-sales-api
npm install
~~~

---

## Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

~~~env
OPENAI_API_KEY=openai_api_key
PORT=3000
~~~

---

## Ejecutar API

~~~bash
npm run dev
~~~

---

## Endpoints

Health

- GET /health

Chat

- POST /api/chat

---

## Ejemplo de uso

POST /api/chat

~~~json
{
  "message": "Quiero una bebida refrescante"
}
~~~

Respuesta:

~~~json
{
  "success": true,
  "botReply": "Te recomiendo una bebida fría con notas cítricas.",
  "suggestedReplies": [
    "Quiero algo sin azúcar",
    "Muéstrame opciones refrescantes"
  ]
}
~~~

---

## Casos de uso

- Chatbots para e-commerce  
- Asistentes de ventas con IA  
- Automatización de atención al cliente  
- Interfaces conversacionales en productos SaaS  

---

## Estructura del proyecto

src/
  controllers/
  routes/
  services/
  config/
  types/

---

## Notas

- Requiere una API Key válida de OpenAI  
- Diseñado para integrarse fácilmente con frontend conversacional  
- Puede escalarse para múltiples flujos de negocio  

---

## Autor

Martin Hernandez  
Backend Developer especializado en APIs, microservicios e integraciones

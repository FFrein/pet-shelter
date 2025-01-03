import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Опции для генерации Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Документация API для вашего приложения",
    },
    servers: [
      {
        url: "http://localhost:8001/api", // URL вашего API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Опционально, для указания формата токена
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Указывает, что все эндпоинты используют Bearer Token
      },
    ],
  },
  apis: ["./src/**/*.js"], // Это рекурсивный путь для всех JS файлов в src
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Функция для подключения Swagger UI
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;

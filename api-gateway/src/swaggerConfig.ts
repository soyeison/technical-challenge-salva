import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway - Documentación",
      version: "1.0.0",
      description:
        "API Gateway que maneja la comunicacion entre los miscroservicios",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
      {
        url: "http://ec2-3-145-20-78.us-east-2.compute.amazonaws.com:80",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Asegúrate de apuntar a tus archivos de rutas
};

export default swaggerOptions;

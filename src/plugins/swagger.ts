import fp from 'fastify-plugin';
import { config } from '../config';

export default fp(async function swaggerPlugin(app) {
  await app.register(import('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });
  await app.register(import('@fastify/swagger-ui'), {
    routePrefix: config.app.swaggerPath,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});

import Fastify from 'fastify';
import { disconnectDatabase } from './libs/db/connect';

const PORT = process.env.PORT || 3000;

// FASTIFY INSTANCE
const app = Fastify({
  logger: {
    level: 'info',
  },
});

// SWAGGER-UI
app.register(import('@fastify/swagger'));
app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/api/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.setErrorHandler(async (err, _, reply) => {
  reply.code(500).send({ message: 'Internal server error', err: err });
});

// API ROUTES
app.register(import('./apps/accounts/account-routes'), {
  prefix: '/api',
});
app.get('/healthcheck', (_, res) => {
  res.send({ message: 'Success' });
});

async function main() {
  app.listen({ port: +PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

// SYSTEM SHUTDOWN
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

/* START */
main()
  .then(async () => {
    await disconnectDatabase();
  })
  .catch(async (e) => {
    console.error(e);
    await disconnectDatabase();
    process.exit(1);
  });

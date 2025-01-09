import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT, { JWT } from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { disconnectDatabase } from './utils/db/connect';
import { config } from './config';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    jwt: JWT;
  }
}

const app = Fastify({
  logger: {
    level: 'info',
  },
});

// authentication
app.register(fastifyJWT, { secret: config.jwt.secret }); // todo: move to key file
app.register(fastifyCookie);
app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    // Authorization: Bearer <token>
    await request.jwtVerify();
  } catch (err) {
    console.error(err);
    return reply.code(401).send({ message: 'Unauthorized' });
  }
});
app.addHook('preHandler', (request: FastifyRequest, _, next) => {
  request.jwt = app.jwt;
  return next();
});

// swagger
app.register(import('@fastify/swagger'));
app.register(import('@fastify/swagger-ui'), {
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

app.setErrorHandler(async (err, _, reply) => {
  reply.code(500).send({ message: 'Internal server error', err: err });
});

// api routes
app.register(import('./apps/accounts/account.routes'), {
  prefix: config.app.apiPrefix,
});
app.register(import('./apps/auth/auth.routes'), {
  prefix: config.app.apiPrefix,
});
app.get('/healthcheck', (_, res) => {
  res.send({ message: 'Success' });
});

async function main() {
  app.listen({ port: +config.app.port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

// shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    await disconnectDatabase();
    process.exit(0);
  });
});

main()
  .then(async () => {
    await disconnectDatabase();
  })
  .catch(async (e) => {
    console.error(e);
    await disconnectDatabase();
    process.exit(1);
  });

import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT, { JWT } from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { config } from './config';
import { logger } from './logger';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    jwt: JWT;
  }
}

const app = Fastify({
  loggerInstance: logger,
});

// authentication
app.register(fastifyJWT, { secret: config.jwt.access.secret }); // todo: move to key file
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
app.register(import('./modules/accounts/account.routes'), {
  prefix: config.app.apiPrefix,
});
app.register(import('./modules/auth/auth.routes'), {
  prefix: config.app.apiPrefix,
});

app.get('/healthcheck', (_, res) => {
  res.send({ message: 'Success' });
});

export default app;

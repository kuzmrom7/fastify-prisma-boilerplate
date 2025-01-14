import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import gracefulShutdown from 'fastify-graceful-shutdown';

import swaggerPlugin from './plugins/swagger';
import prismaPlusin from './plugins/prisma';
import { config } from './config';
import { logger } from './logger';

const app = Fastify({
  loggerInstance: logger,
});

// plugins
app.register(swaggerPlugin);
app.register(prismaPlusin);
app.register(fastifyJWT, { secret: config.jwt.access.secret });
app.register(fastifyCookie);
app.register(gracefulShutdown);

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

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify(); // Authorization: Bearer <token>
  } catch (err) {
    console.error(err);
    return reply.code(401).send({ message: 'Unauthorized' });
  }
});
app.addHook('preHandler', (request: FastifyRequest, _, next) => {
  request.jwt = app.jwt;
  return next();
});

app.after((error) => {
  if (error) {
    app.log.error(error);
  }
  app.gracefulShutdown((signal) => {
    app.prisma.$disconnect(); // disconnect from prisma
    app.log.info('Received signal to shutdown: %s', signal);
  });
});

export default app;

import Fastify from 'fastify';
import fastifyJWT from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import gracefulShutdown from 'fastify-graceful-shutdown';
import autoload from '@fastify/autoload';
import path from 'node:path';

import config from './config';
import logger from './logger';

const app = Fastify({
  loggerInstance: logger,
});

app.register(fastifyJWT, { secret: config.jwt.access.secret });
app.register(fastifyCookie);
app.register(gracefulShutdown);

// auto-load custom-plugins from the '/plugins' directory
app.register(autoload, {
  dir: path.join(__dirname, 'plugins'),
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

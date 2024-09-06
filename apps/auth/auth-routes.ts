import { FastifyInstance } from 'fastify';
import { refreshAccessToken } from './auth-controller';

async function routes(app: FastifyInstance) {
  const prefix = '/auth';

  app.register(
    async (accountRoutes) => {
      accountRoutes.post('/refresh-token', refreshAccessToken);
    },
    { prefix }
  );
}

export default routes;

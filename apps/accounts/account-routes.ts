import { FastifyInstance } from 'fastify';
import { getProfile } from './account-controller';

async function routes(app: FastifyInstance) {
  const prefix = '/account';
  app.register(
    async (accountRoutes) => {
      accountRoutes.get('/profile', { preHandler: [app.authenticate] }, getProfile);
    },
    { prefix }
  );
}

export default routes;

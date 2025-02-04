import { FastifyInstance } from 'fastify';
import accountController from './account.controller';
import { GetAccountSchema } from './schemas/account.schema';

async function routes(app: FastifyInstance) {
  const prefix = '/account';
  app.register(
    async (accountRoutes) => {
      accountRoutes.get(
        '/',
        { preHandler: [app.authenticate], schema: GetAccountSchema },
        accountController.getSelfAccount
      );
    },
    { prefix }
  );
}

export default routes;

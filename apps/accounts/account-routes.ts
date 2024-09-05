import { FastifyInstance } from 'fastify';
import { AccountLoginEmailValidateCodeSchema } from './schemas/account.schema';
import {
  getProfile,
  loginEmail,
  loginEmailValidateCode,
} from './account-controller';

async function routes(app: FastifyInstance) {
  app.register(
    async (accountRoutes) => {
      accountRoutes.get('/profile', getProfile);
      accountRoutes.post(
        '/login/email',
        { schema: AccountLoginEmailValidateCodeSchema },
        loginEmail
      );
      accountRoutes.post(
        '/login/email/validate-code',
        { schema: AccountLoginEmailValidateCodeSchema },
        loginEmailValidateCode
      );
    },
    { prefix: '/account' }
  );
}

export default routes;

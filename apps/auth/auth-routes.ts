import { FastifyInstance } from 'fastify';
import { loginEmail, loginEmailValidateCode, refreshAccessToken } from './auth-controller';
import { LoginEmailValidateCodeSchema } from './schemas/account-schema';

async function routes(app: FastifyInstance) {
  const prefix = '/auth';

  app.register(
    async (route) => {
      route.post('/refresh-token', refreshAccessToken);
      route.post('/login/email', { schema: LoginEmailValidateCodeSchema }, loginEmail);
      route.post('/login/email/validate-code', { schema: LoginEmailValidateCodeSchema }, loginEmailValidateCode);
    },
    { prefix }
  );
}

export default routes;

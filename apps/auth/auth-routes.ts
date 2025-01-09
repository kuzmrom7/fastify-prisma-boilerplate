import { FastifyInstance } from 'fastify';
import { loginEmail, loginEmailValidateCode, refreshAccessToken } from './auth-controller';
import { LoginEmailValidateCodeSchema, LoginEmailValidateSchema, RefreshTokenSchema } from './schemas/auth-schemas';

async function routes(app: FastifyInstance) {
  const prefix = '/auth';

  app.register(
    async (route) => {
      route.post('/login/email', { schema: LoginEmailValidateSchema }, loginEmail);
      route.post('/validate-email-code', { schema: LoginEmailValidateCodeSchema }, loginEmailValidateCode);
      route.post('/refresh-token', { schema: RefreshTokenSchema }, refreshAccessToken);
    },
    { prefix }
  );
}

export default routes;

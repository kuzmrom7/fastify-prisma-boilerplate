import { FastifyInstance } from 'fastify';
import authContoller from './auth.controller';
import { LoginEmailValidateCodeSchema, LoginEmailValidateSchema, RefreshTokenSchema } from './schemas/auth.schemas';

async function routes(app: FastifyInstance) {
  const prefix = '/auth';

  app.register(
    async (route) => {
      route.post('/login/email', { schema: LoginEmailValidateSchema }, authContoller.loginEmail);
      route.post(
        '/validate-email-code',
        { schema: LoginEmailValidateCodeSchema },
        authContoller.loginEmailValidateCode
      );
      route.post('/refresh-token', { schema: RefreshTokenSchema }, authContoller.refreshAccessToken);
    },
    { prefix }
  );
}

export default routes;

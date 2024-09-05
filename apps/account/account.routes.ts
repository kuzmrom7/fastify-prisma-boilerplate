import { FastifyInstance } from 'fastify';
import { loginEmailSchema } from './account.schema';
import {
  createAccount,
  deleteEmailCode,
  getAccountProfile,
  getEmailCode,
  saveEmailCode,
} from './account.controller';
import { sendEmailCode } from '../../libs/mailer/send-mail';

type LoginEmailAccountBody = {
  email: string;
};

async function routes(app: FastifyInstance) {
  app.get('/profile', async (_, reply) => {
    // TODO: id from session
    const profile = await getAccountProfile(1);

    if (!profile) {
      reply.code(404).send({ message: 'profile not found' });
    }
    reply.send({
      profile,
    });
  });

  app.post<{ Body: LoginEmailAccountBody }>(
    '/login/email',
    { schema: loginEmailSchema },
    async (req, reply) => {
      const { email } = req.body;
      const generatedCode = Math.floor(Math.random() * 100000);
      // 2. save code
      await saveEmailCode(email, generatedCode);
      try {
        sendEmailCode(email, generatedCode);
      } catch (e) {
        console.log(e);
        return reply.code(400).send({ message: JSON.stringify(e) });
      }

      reply.code(200).send('ok');
    }
  );

  app.post<{
    Body: {
      code: string;
      email: string;
    };
  }>(
    '/login/email/validate-code',
    { schema: loginEmailSchema },
    async (req, reply) => {
      const { email, code } = req.body;

      // 1. verify code
      const emailCode = await getEmailCode(email);
      if (!emailCode) {
        return reply.code(400).send({ message: 'code not found' });
      }

      if (emailCode !== Number(code)) {
        return reply.code(400).send({ message: 'code not match' });
      }

      // 2. if ok create or get profile
      const account = await createAccount({ email });
      // 3. delete code
      await deleteEmailCode(email);

      if (!account) {
        return reply.code(409).send();
      }

      reply.code(200).send({
        profile: {
          id: account?.id,
          email: account?.email,
          phone: account?.phone,
        },
      });
    }
  );
}

export default routes;

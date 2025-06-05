import { FastifyReply, FastifyRequest } from 'fastify';
import { decodeToken, generatedAccessToken, generatedRefreshToken } from '../../utils/jwt/jwt';
import { deleteEmailCode, getEmailCode, saveEmailCode } from '../email-codes/email-code.service';
import { sendEmailCode } from '../../utils/mailer/send-mail';
import { createAccount } from '../accounts/services/account.service';

import config from '../../config';

type LoginEmailAccountBody = {
  email: string;
};
type LoginEmailAccountValidateCodeBody = {
  code: string;
  email: string;
};

export default {
  async refreshAccessToken(req: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return reply.code(401).send({ message: 'Refresh token not found' });

    const decoded = await decodeToken(req.jwt, refreshToken);
    const newAccessToken = await generatedAccessToken(req.jwt, decoded.id, decoded.email);

    reply.send({ token: newAccessToken });
  },
  async loginEmail(req: FastifyRequest<{ Body: LoginEmailAccountBody }>, reply: FastifyReply) {
    const { email } = req.body;
    const generatedCode =
      config.nodeEnv === 'development' ? Number(config.dev.authCode) : Math.floor(Math.random() * 100000);
    await saveEmailCode(email, generatedCode);

    if (config.nodeEnv !== 'development') {
      await sendEmailCode(email, generatedCode);
    }

    reply.code(200).send('ok');
  },
  async loginEmailValidateCode(req: FastifyRequest<{ Body: LoginEmailAccountValidateCodeBody }>, reply: FastifyReply) {
    const { email, code } = req.body;

    const emailCode = await getEmailCode(email);
    if (!emailCode) {
      return reply.code(400).send({ message: 'Code not found' });
    }

    if (emailCode !== Number(code)) {
      return reply.code(400).send({ message: 'Code not match' });
    }

    const account = await createAccount({ email });
    await deleteEmailCode(email);

    if (!account) {
      return reply.code(409).send();
    }

    const accessToken = await generatedAccessToken(req.jwt, account.id, account.email);
    const refreshToken = await generatedRefreshToken(req.jwt, account.id, account.email);

    reply
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        maxAge: 604800, // 7 days
      })
      .code(200)
      .send({
        token: accessToken,
        account: {
          id: account?.id,
          email: account?.email,
          phone: account?.phone,
        },
      });
  },
};

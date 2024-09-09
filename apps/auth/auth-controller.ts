import { FastifyReply, FastifyRequest } from 'fastify';
import { decodeToken, generatedAccessToken, generatedRefreshToken } from '../../libs/jwt/jwt';
import { deleteEmailCode, getEmailCode, saveEmailCode } from '../email-codes/email-code-service';
import { sendEmailCode } from '../../libs/mailer/send-mail';
import { createAccount } from '../accounts/services/account-service';

type LoginEmailAccountBody = {
  email: string;
};
type LoginEmailAccountValidateCodeBody = {
  code: string;
  email: string;
};

export async function refreshAccessToken(req: FastifyRequest, reply: FastifyReply) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return reply.code(401).send({ message: 'Refresh token not found' });

  try {
    const decoded = await decodeToken(req.jwt, refreshToken);
    const newAccessToken = await generatedAccessToken(req.jwt, decoded.id, decoded.email);

    reply.send({ accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    reply.code(401).send({ message: 'Invalid refresh token' });
  }
}

export async function loginEmail(req: FastifyRequest<{ Body: LoginEmailAccountBody }>, reply: FastifyReply) {
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

export async function loginEmailValidateCode(
  req: FastifyRequest<{ Body: LoginEmailAccountValidateCodeBody }>,
  reply: FastifyReply
) {
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
      profile: {
        id: account?.id,
        email: account?.email,
        phone: account?.phone,
      },
    });
}

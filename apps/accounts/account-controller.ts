import { FastifyReply, FastifyRequest } from 'fastify';
import { createAccount, getAccountProfile } from './services/account-service';
import { sendEmailCode } from '../../libs/mailer/send-mail';
import {
  saveEmailCode,
  getEmailCode,
  deleteEmailCode,
} from './services/email-code-service';

type LoginEmailAccountBody = {
  email: string;
};

type LoginEmailAccountValidateCodeBody = {
  code: string;
  email: string;
};

export async function getProfile(_: FastifyRequest, reply: FastifyReply) {
  // TODO: id from session (например, вытаскиваем ID из сессии)
  const profile = await getAccountProfile(1); // Типизируйте возвращаемые данные

  if (!profile) {
    reply.code(404).send({ message: 'profile not found' });
    return;
  }

  reply.send({ profile });
}

export async function loginEmail(
  req: FastifyRequest<{ Body: LoginEmailAccountBody }>,
  reply: FastifyReply
) {
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

  reply.code(200).send({
    profile: {
      id: account?.id,
      email: account?.email,
      phone: account?.phone,
    },
  });
}

import { prismaClient } from '../../../libs/db/prisma-client';

export async function saveEmailCode(email: string, code: number) {
  await prismaClient.emailCode.upsert({
    where: { email: email },
    update: { code: code },
    create: { email: email, code: code },
  });
}

export async function getEmailCode(email: string) {
  const emailCode = await prismaClient.emailCode.findUnique({
    where: { email: email },
  });
  return emailCode?.code;
}

export async function deleteEmailCode(email: string) {
  await prismaClient.emailCode.delete({
    where: { email: email },
  });
}

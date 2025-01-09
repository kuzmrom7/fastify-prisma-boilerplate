import { prismaClient } from '../../../utils/db/prisma-client';

export async function getAccountProfile(id: number) {
  const account = await prismaClient.account.findUnique({
    where: {
      id: Number(id),
    },
  });

  return account;
}

export async function createAccount({ email }: { email?: string }) {
  const account = await prismaClient.account.upsert({
    where: { email: email },
    update: { email: email },
    create: { email: email },
  });

  return account;
}

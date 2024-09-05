import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function getAccountProfile(id: number) {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: Number(id),
      },
    });

    return account;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    }
  }
}

async function createAccount({ email }: { email?: string }) {
  try {
    const account = await prisma.account.upsert({
      where: { email: email },
      update: { email: email },
      create: { email: email },
    });

    return account;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return null;
    }
  }
}

async function saveEmailCode(email: string, code: number) {
  try {
    await prisma.emailCode.upsert({
      where: { email: email },
      update: { code: code },
      create: { email: email, code: code },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return null;
    }
  }
}

async function getEmailCode(email: string) {
  try {
    const emailCode = await prisma.emailCode.findUnique({
      where: { email: email },
    });
    return emailCode?.code;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return null;
    }
  }
}

async function deleteEmailCode(email: string) {
  try {
    await prisma.emailCode.delete({
      where: { email: email },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return null;
    }
  }
}

export {
  getAccountProfile,
  createAccount,
  saveEmailCode,
  getEmailCode,
  deleteEmailCode,
};

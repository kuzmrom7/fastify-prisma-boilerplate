import fp from 'fastify-plugin';
import prismaClient from '../utils/db/prisma-client';

export default fp(async function prismaPlugin(app) {
  const prisma = prismaClient;

  await prismaClient.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  app.decorate('prisma', prisma);

  app.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
});

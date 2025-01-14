import { PrismaClient } from '@prisma/client';
import { JWT } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    prisma: PrismaClient;
  }
  interface FastifyRequest {
    jwt: JWT;
  }
}

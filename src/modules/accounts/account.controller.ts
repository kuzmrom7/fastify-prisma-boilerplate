import { FastifyReply, FastifyRequest } from 'fastify';
import { getAccountById } from './services/account.service';

export default {
  async getSelfAccount(req: FastifyRequest, reply: FastifyReply) {
    const acc = await getAccountById(Number((req.user as { id: number }).id));

    if (!acc) {
      return reply.code(404).send({ message: 'profile not found' });
    }

    reply.send({ account: acc });
  },
};

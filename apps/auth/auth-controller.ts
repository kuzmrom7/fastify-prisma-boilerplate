import { FastifyReply, FastifyRequest } from 'fastify';
import { decodeToken, generatedAccessToken } from '../../libs/jwt/jwt';

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

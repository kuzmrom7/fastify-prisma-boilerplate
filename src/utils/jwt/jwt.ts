import { JWT } from '@fastify/jwt';
import config from '../../config';

export type TokenPayload = {
  id: string;
  email: string;
};

const AccessTokenExpiration = config.jwt.access.expiresIn;
const RefreshTokenExpiration = config.jwt.refresh.expiresIn;

export async function generatedAccessToken(ctx: JWT, id: number, email: string | null) {
  return ctx.sign({ id: id, email: email }, { expiresIn: AccessTokenExpiration });
}
export async function generatedRefreshToken(ctx: JWT, id: number, email: string | null) {
  return ctx.sign({ id: id, email: email }, { expiresIn: RefreshTokenExpiration });
}
export async function decodeToken(ctx: JWT, token: string): Promise<{ id: number; email: string | null }> {
  return ctx.verify(token);
}

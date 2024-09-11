import { prismaClient } from './prisma-client';

export function connectDatabse() {
  return prismaClient.$connect();
}
export function disconnectDatabase() {
  return prismaClient.$disconnect();
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function connectDatabse() {
  return prisma.$connect();
}
export function disconnectDatabase() {
  return prisma.$disconnect();
}

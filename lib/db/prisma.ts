import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

let _prisma: PrismaClient | undefined;

function getPrisma(): PrismaClient {
  if (!_prisma) {
    _prisma = globalForPrisma.prisma ?? createPrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;
  }
  return _prisma;
}

function buildTimeNoop() {
  return new Proxy({} as PrismaClient, {
    get(_, prop) {
      if (prop === "then") return undefined;
      const noop = () => Promise.resolve(undefined as never);
      return noop;
    },
  });
}

export const prisma =
  process.env.NEXT_PHASE === "phase-production-build"
    ? buildTimeNoop()
    : getPrisma();

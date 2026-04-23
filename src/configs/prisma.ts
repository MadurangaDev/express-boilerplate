import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { env } from "./env.js"; // didn't use @configs because of circular dependency issues

const adapter = new PrismaMariaDb(env.DATABASE_URL);
export const prisma = new PrismaClient({ adapter });

import dotenv from "dotenv";
import pino from "pino";
import { z } from "zod";

dotenv.config();

const startupLogger = pino({
  level: "error",
});

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CORS_ORIGINS: z.string().optional(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  startupLogger.error(
    { errors: parsed.error.flatten().fieldErrors },
    "Invalid environment variables",
  );
  process.exit(1);
}

export const env = parsed.data;

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test", "local"]),
  LOG_LEVEL: z.enum(["debug", "info", "verbose"]).default("debug"),
  PORT: z.coerce.number().default(3333),
  CORS_ORIGIN: z.string().default("*"),
  DATABASE_URL: z.string().optional(),
  DATABASE_DRIVER: z.enum(["memory", "postgres", "mongodb"]),
  JWT_SECRET: z.string().optional(),
  API_PREFIX: z.string().default("/api"),
  REDIS_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(_env.error.format(), null, 2)
  );
  process.exit(1);
}

export const env = _env.data;
export type Env = z.infer<typeof envSchema>;

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  cors: {
    origin: env.CORS_ORIGIN,
  },
  swagger: {
    title: "API Products",
    version: "1.0.0",
    routePrefix: "/docs",
  },
  api: {
    prefix: env.API_PREFIX || "/api",
  },
  cache: {
    redis: env.REDIS_URL,
  },
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  log_level: env.LOG_LEVEL,
} as const;

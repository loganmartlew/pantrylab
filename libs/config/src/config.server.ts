import { z } from 'zod';

const serverEnvSchema = z.object({
  PORT: z.number().int().positive().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  API_URL: z.string().min(1),
});

export const config = (() => {
  const env = serverEnvSchema.parse(process.env);

  return {
    port: env.PORT || 3000,
    environment: env.NODE_ENV,
    databaseUrl: env.DATABASE_URL,
    accessTokenSecret: env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    apiUrl: env.API_URL,
  };
})();

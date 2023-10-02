import { z } from 'zod';

const clientEnvSchema = z.object({
  API_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_API_URL: z.string().min(1),
});

export const clientConfig = (() => {
  const env = clientEnvSchema.parse({
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  return {
    apiUrl: env.API_URL ?? env.NEXT_PUBLIC_API_URL,
  };
})();

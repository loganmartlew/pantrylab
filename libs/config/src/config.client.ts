import { z } from 'zod';

const clientEnvSchema = z.object({
  API_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_API_URL: z.string().min(1),
});

export const config = (() => {
  const env = clientEnvSchema.parse(process.env);

  return {
    apiUrl: env.API_URL ?? env.NEXT_PUBLIC_API_URL,
  };
})();

import { z } from 'zod';

export const credentialsSchema = z.object({
  accessToken: z.string(),
});

export type Credentials = z.infer<typeof credentialsSchema>;

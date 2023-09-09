import { z } from 'zod';

export const itemUpdateSchema = z
  .object({
    name: z.string().min(3).max(255).optional(),
  })
  .partial();

export type ItemUpdate = z.infer<typeof itemUpdateSchema>;

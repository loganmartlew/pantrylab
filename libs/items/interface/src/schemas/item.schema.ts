import { z } from 'zod';
import { toZod } from 'tozod';
import { Item as ItemPrisma } from '@prisma/client';

export const itemSchema: toZod<ItemPrisma> = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  name: z.string().min(3).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Item = z.infer<typeof itemSchema>;

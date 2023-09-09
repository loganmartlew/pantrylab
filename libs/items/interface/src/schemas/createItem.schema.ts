import { z } from 'zod';
import { toZod } from 'tozod';
import { Item as ItemPrisma } from '@prisma/client';

type ItemCreatePrisma = Omit<ItemPrisma, 'id' | 'createdAt' | 'updatedAt'>;

export const itemCreateSchema: toZod<ItemCreatePrisma> = z.object({
  householdId: z.string().uuid(),
  name: z.string().min(3).max(255),
});

export type ItemCreate = z.infer<typeof itemCreateSchema>;

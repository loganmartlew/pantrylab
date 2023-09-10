import { Item as ItemPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type ItemCreatePrisma = Omit<ItemPrisma, 'id' | 'createdAt' | 'updatedAt'>;

export const itemCreateSchema: toZod<ItemCreatePrisma> = z.object({
  householdId: z.string().uuid(),
  name: z.string().min(3).max(255),
});

export type ItemCreate = z.infer<typeof itemCreateSchema>;

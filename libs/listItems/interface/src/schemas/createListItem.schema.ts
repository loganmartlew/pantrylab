import { ListItem as ListItemPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type ListItemCreatePrisma = Omit<
  ListItemPrisma,
  'id' | 'completedAt' | 'createdAt' | 'updatedAt'
>;

export const listItemCreateSchema: toZod<ListItemCreatePrisma> = z.object({
  householdId: z.string().uuid(),
  itemId: z.string().uuid(),
  details: z.string(),
});

export type ListItemCreate = z.infer<typeof listItemCreateSchema>;

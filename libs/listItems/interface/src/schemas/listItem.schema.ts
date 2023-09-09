import { z } from 'zod';
import { toZod } from 'tozod';
import { ListItem as ListItemPrisma } from '@prisma/client';

export const listItemSchema: toZod<ListItemPrisma> = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  itemId: z.string().uuid(),
  details: z.string(),
  completedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ListItem = z.infer<typeof listItemSchema>;

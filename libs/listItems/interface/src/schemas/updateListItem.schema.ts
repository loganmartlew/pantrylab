import { ListItem as ListItemPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type ListItemUpdatePrisma = Omit<
  ListItemPrisma,
  'id' | 'householdId' | 'itemId' | 'createdAt' | 'updatedAt'
>;

export const listItemUpdateSchema: toZod<Partial<ListItemUpdatePrisma>> = z
  .object({
    details: z.string(),
    completedAt: z.date(),
  })
  .partial();

export type ListItemUpdate = z.infer<typeof listItemUpdateSchema>;

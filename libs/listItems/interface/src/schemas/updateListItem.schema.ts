import { z } from 'zod';
import { toZod } from 'tozod';
import { ListItem as ListItemPrisma } from '@prisma/client';

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

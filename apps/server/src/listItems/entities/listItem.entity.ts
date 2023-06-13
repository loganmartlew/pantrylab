import { ListItem } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { ItemSchema } from '../../items/entities/item.entity';

export const ListItemSchema = z.object({
  id: z.string().uuid(),
  completedAt: z.date().nullable(),
  details: z.string().min(1).max(255),
  householdId: z.string().uuid(),
  itemId: z.string().uuid(),
  item: ItemSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class ListItemEntity
  extends createZodDto(ListItemSchema)
  implements ListItem {}

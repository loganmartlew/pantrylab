import { Item } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const ItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class ItemEntity extends createZodDto(ItemSchema) implements Item {}

import { Meal } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { ItemSchema } from '../../items/entities/item.entity';

export const MealSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MealWithItemsSchema = MealSchema.extend({
  items: z.array(ItemSchema),
});

export class MealEntity extends createZodDto(MealSchema) implements Meal {}

export class MealWithItemsEntity
  extends createZodDto(MealWithItemsSchema)
  implements Meal {}

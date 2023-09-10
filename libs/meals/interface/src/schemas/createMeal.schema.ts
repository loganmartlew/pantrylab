import { Meal as MealPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type MealCreatePrisma = Omit<MealPrisma, 'id' | 'createdAt' | 'updatedAt'>;

export const mealCreateSchema: toZod<
  MealCreatePrisma & { itemIds?: string[] }
> = z.object({
  householdId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  itemIds: z.array(z.string().uuid()).optional(),
});

export type MealCreate = z.infer<typeof mealCreateSchema>;

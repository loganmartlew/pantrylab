import { z } from 'zod';
import { toZod } from 'tozod';
import { Meal as MealPrisma } from '@prisma/client';

type MealUpdatePrisma = Omit<
  MealPrisma,
  'id' | 'householdId' | 'createdAt' | 'updatedAt'
>;

export const mealUpdateSchema: toZod<
  Partial<MealUpdatePrisma & { itemIds?: string[] }>
> = z
  .object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    itemIds: z.array(z.string().uuid()),
  })
  .partial();

export type MealUpdate = z.infer<typeof mealUpdateSchema>;

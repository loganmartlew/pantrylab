import { z } from 'zod';
import { toZod } from 'tozod';
import { Meal as MealPrisma } from '@prisma/client';

export const mealSchema: toZod<MealPrisma> = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Meal = z.infer<typeof mealSchema>;

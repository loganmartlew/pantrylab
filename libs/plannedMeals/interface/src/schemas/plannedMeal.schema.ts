import { PlannedMeal as PlannedMealPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

export const plannedMealSchema: toZod<PlannedMealPrisma> = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  mealId: z.string().uuid(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PlannedMeal = z.infer<typeof plannedMealSchema>;

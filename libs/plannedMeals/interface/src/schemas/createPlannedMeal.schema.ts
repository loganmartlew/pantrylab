import { z } from 'zod';
import { toZod } from 'tozod';
import { PlannedMeal as PlannedMealPrisma } from '@prisma/client';

type PlannedMealCreatePrisma = Omit<
  PlannedMealPrisma,
  'id' | 'createdAt' | 'updatedAt'
>;

export const plannedMealCreateSchema: toZod<PlannedMealCreatePrisma> = z.object(
  {
    householdId: z.string().uuid(),
    mealId: z.string().uuid(),
    date: z.date(),
  }
);

export type PlannedMealCreate = z.infer<typeof plannedMealCreateSchema>;

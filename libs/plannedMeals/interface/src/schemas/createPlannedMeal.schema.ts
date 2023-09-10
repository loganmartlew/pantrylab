import { PlannedMeal as PlannedMealPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

type PlannedMealCreatePrisma = Omit<
  PlannedMealPrisma,
  'id' | 'createdAt' | 'updatedAt'
>;

export const plannedMealCreateSchema: toZod<PlannedMealCreatePrisma> = z.object(
  {
    householdId: z.string().uuid(),
    mealId: z.string().uuid(),
    date: z.date(),
  },
);

export type PlannedMealCreate = z.infer<typeof plannedMealCreateSchema>;

import { PlannedMeal } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { MealSchema } from '@pantrylab/meals';

export const PlannedMealSchema = z.object({
  id: z.string().uuid(),
  householdId: z.string().uuid(),
  mealId: z.string().uuid(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PlannedMealWithMealSchema = PlannedMealSchema.extend({
  meal: MealSchema,
});

export class PlannedMealEntity
  extends createZodDto(PlannedMealSchema)
  implements PlannedMeal {}

export class PlannedMealWithMealEntity
  extends createZodDto(PlannedMealWithMealSchema)
  implements PlannedMeal {}

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const PlannedMealDtoSchema = z.object({
  householdId: z.string().uuid(),
  mealId: z.string().uuid(),
  date: z.date(),
});

export const PlannedMealUpdateSchema = z.object({}).partial();

export class PlannedMealDto extends createZodDto(PlannedMealDtoSchema) {}
export class PlannedMealUpdateDto extends createZodDto(
  PlannedMealUpdateSchema
) {}

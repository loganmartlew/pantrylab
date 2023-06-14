import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const MealDtoSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  householdId: z.string().uuid(),
  itemIds: z.array(z.string().uuid()),
});

export const MealUpdateSchema = z
  .object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(500),
    itemIds: z.array(z.string().uuid()),
  })
  .partial();

export class MealDto extends createZodDto(MealDtoSchema) {}
export class MealUpdateDto extends createZodDto(MealUpdateSchema) {}

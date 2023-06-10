import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const HouseholdDtoSchema = z.object({
  name: z.string().min(1).max(50),
});

export class HouseholdDto extends createZodDto(HouseholdDtoSchema) {}

export class HouseholdUpdateDto extends createZodDto(
  HouseholdDtoSchema.partial()
) {}

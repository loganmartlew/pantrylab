import { Household } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const HouseholdSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class HouseholdEntity
  extends createZodDto(HouseholdSchema)
  implements Household {}

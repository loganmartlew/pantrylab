import { Household as HouseholdPrisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

export const householdSchema: toZod<HouseholdPrisma> = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Household = z.infer<typeof householdSchema>;

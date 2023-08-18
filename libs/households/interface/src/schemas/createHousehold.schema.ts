import { z } from 'zod';
import { toZod } from 'tozod';
import { Household as HouseholdPrisma } from '@prisma/client';

type HouseholdCreatePrisma = Omit<
  HouseholdPrisma,
  'id' | 'createdAt' | 'updatedAt'
>;

export const householdCreateSchema: toZod<HouseholdCreatePrisma> = z.object({
  name: z.string().min(1).max(50),
});

export type HouseholdCreate = z.infer<typeof householdCreateSchema>;

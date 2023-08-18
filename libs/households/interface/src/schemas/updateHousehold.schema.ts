import { z } from 'zod';
import { householdCreateSchema } from './createHousehold.schema';

export const householdUpdateSchema = householdCreateSchema.partial();

export type HouseholdUpdate = z.infer<typeof householdUpdateSchema>;
